import { Chess } from 'chess.js';

const handler = async (m, { conn, args }) => {
conn.chess = conn.chess ? conn.chess : {}
  const key = m.chat;
  let chessData = conn.chess?.[key] || {
    gameData: null,
    fen: null,
    currentTurn: null,
    hasJoined: []
  };
  conn.chess[key] = chessData;
  const { gameData, fen, currentTurn, hasJoined } = chessData;
  const feature = args[0]?.toLowerCase();
  if (feature === 'delete') {
    delete conn.chess[key];
    return conn.reply(m.chat, '🏳️ *Permainan catur dihentikan.*', m);
  }
  if (feature === 'create') {
    if (!gameData) {
      chessData.gameData = { status: 'waiting', players: [] };
      return conn.reply(m.chat, '🎮 *Permainan catur dimulai.*\nMenunggu pemain lain untuk bergabung.', m);
    } else {
      return conn.reply(m.chat, '⚠️ *Permainan sudah dimulai.*', m);
    }
  } else if (feature === 'join') {
    const senderId = m.sender;
    const joinedPlayers = gameData?.players || [];
    if (joinedPlayers.includes(senderId)) {
      return conn.reply(m.chat, '🙅‍♂️ *Anda sudah bergabung dalam permainan ini.*', m);
    }
    if (!gameData || gameData.status !== 'waiting') {
      return conn.reply(m.chat, '⚠️ *Tidak ada permainan catur yang sedang menunggu.*', m);
    }
    if (gameData.players.length >= 2) {
      return conn.reply(m.chat, '👥 *Pemain sudah mencukupi.*\nPermainan otomatis dimulai.', m);
    }
    gameData.players.push(senderId);
    hasJoined.push(senderId);
    if (gameData.players.length === 2) {
      gameData.status = 'ready';
      const joinedPlayersList = hasJoined.map(playerId => `@${playerId.split('@')[0]}`).join('\n');
      return conn.reply(m.chat, `🙌 *Pemain yang telah bergabung:*\n${joinedPlayersList}\n\nSilakan gunakan *'chess start'* untuk memulai permainan.`, m, { mentions: hasJoined })
    } else {
      return conn.reply(m.chat, '🙋‍♂️ *Anda telah bergabung dalam permainan catur.*\nMenunggu pemain lain untuk bergabung.', m);
    }
  } else if (feature === 'start') {
    if (gameData.status !== 'ready') {
      return conn.reply(m.chat, '⚠️ *Tidak dapat memulai permainan. Tunggu hingga dua pemain bergabung.*', m);
    }
    gameData.status = 'playing';
    const senderId = m.sender;
    if (gameData.players.length === 2) {
      const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      chessData.fen = fen;
      chessData.currentTurn = gameData.players[0];
      const encodedFen = encodeURIComponent(fen);
      const giliran = `🎲 *Giliran:* @${chessData.currentTurn.split('@')[0]}`;
      const flipParam = senderId === gameData.players[0] ? '' : '&flip=true';
      const boardUrl = `https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside${flipParam}`;
      await conn.sendFile(m.chat, boardUrl, '', giliran, m, false, { mentions: [chessData.currentTurn] });
      return;
    } else {
      return conn.reply(m.chat, '🙋‍♂️ *Anda telah bergabung dalam permainan catur.*\nMenunggu pemain lain untuk bergabung.', m);
    }
  } else if (args[0] && args[1]) {
    const senderId = m.sender;
    if (!gameData || gameData.status !== 'playing') {
      return conn.reply(m.chat, '⚠️ *Permainan belum dimulai.*', m);
    }
    if (currentTurn !== senderId) {
      return conn.reply(m.chat, '⏳ *Sekarang bukan giliran Anda untuk bergerak.*', m);
    }
    const chess = new Chess(fen);
    if (chess.isCheckmate()) {
    return conn.reply(m.chat, '⚠️ *Checkmate.*', m);
    }
    if (chess.isDraw()) {
    return conn.reply(m.chat, '⚠️ *Draw.*', m);
    }
    if (chess.isGameOver()) {
    return conn.reply(m.chat, '⚠️ *Game Over.*', m);
    }
    const [from, to] = args;
    try {
      chess.move({ from, to, promotion: 'q' });
    } catch (e) {
      return conn.reply(m.chat, '❌ *Langkah tidak valid.*', m);
    }
    chessData.fen = chess.fen();
    const currentTurnIndex = gameData.players.indexOf(currentTurn);
    const nextTurnIndex = (currentTurnIndex + 1) % 2;
    chessData.currentTurn = gameData.players[nextTurnIndex];
    const encodedFen = encodeURIComponent(chess.fen());
    const giliran = `🎲 *Giliran:* @${chessData.currentTurn.split('@')[0]}\n\n${chess.getComment() || ''}`;
    const flipParam = senderId !== gameData.players[0] ? '' : '&flip=true';
    const boardUrl = `https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside${flipParam}`;
    await conn.sendFile(m.chat, boardUrl, '', giliran, m, false, { mentions: [chessData.currentTurn] });
    chess.deleteComment();
    return;
  } else if (feature === 'help') {
    return conn.reply(m.chat, `
      🌟 *Perintah Permainan Catur:*

*chess create* - Mulai permainan catur
*chess join* - Bergabung dalam permainan catur yang sedang menunggu
*chess start* - Memulai permainan catur jika ada dua pemain yang sudah bergabung
*chess delete* - Menghentikan permainan catur
*chess [dari] [ke]* - Melakukan langkah dalam permainan catur

*Contoh:*
      Ketik *chess create* untuk memulai permainan catur.
      Ketik *chess join* untuk bergabung dalam permainan catur yang sedang menunggu.
    `, m);
  } else {
    return conn.reply(m.chat, '❓ Perintah tidak valid. Gunakan *"chess help"* untuk melihat bantuan.', m);
  }
};

handler.help = ['chess [dari ke]', 'chess delete', 'chess join', 'chess start'];
handler.tags = ['game'];
handler.command = /^(chess|catur)$/i;

export default handler;