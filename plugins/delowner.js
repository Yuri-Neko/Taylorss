let handler = async (m, { conn, text }) => {
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
  else who = m.chat;

  if (!who) {
    throw 'Tag orangnya!';
  }

  const ownerIndex = global.owner.findIndex(owner => owner[0] === who.split`@`[0]);

  if (ownerIndex === -1) {
    throw 'Dia bukan owner!';
  }

  global.owner.splice(ownerIndex, 1);

  conn.reply(m.chat, `@${who.split('@')[0]} Sekarang bukan owner!`, m, {
    contextInfo: {
      mentionedJid: [who]
    }
  });
}

handler.help = ['delowner [@user]'];
handler.tags = ['owner'];
handler.command = /^(remove|hapus|-|del)owner$/i;
handler.owner = true;

export default handler;
