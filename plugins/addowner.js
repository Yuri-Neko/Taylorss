let handler = async (m, { conn, text }) => {
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
  else who = m.chat;
  if (!who) return conn.reply(m.chat, 'Tag orangnya!', m);

  // Periksa apakah who sudah menjadi owner
  let isOwner = global.owner.some(owner => owner[0] === who.split`@`[0]);
  let nameOwn = await conn.getName(who.split`@`[0])

  if (isOwner) {
    return conn.reply(m.chat, `@${who.split`@`[0]} sudah menjadi owner!`, m, {
    contextInfo: {
      mentionedJid: [who]
    }
  });
  } else if (!who.split`@`[0]) {
    return conn.reply(m.chat, 'Format tag salah atau input tidak valid!', m);
  }

  // Tambahkan who sebagai owner
  global.owner.push([who.split`@`[0], '️𝑶𝒘𝒏𝒆𝒓', true]);

  conn.reply(m.chat, `@${who.split`@`[0]} sekarang owner!`, m, {
    contextInfo: {
      mentionedJid: [who]
    }
  });
}

handler.help = ['addowner [@user]'];
handler.tags = ['owner'];
handler.command = /^(add|tambah|\+)owner$/i;
handler.owner = true;

export default handler;
