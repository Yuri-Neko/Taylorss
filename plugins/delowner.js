let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
    else who = m.chat
    if (!who) throw 'Tag orang yang akan diberhentikan sebagai Owner!'
    if (!global.owner.includes(who.split`@`[0])) throw 'Orang ini tidak menjadi owner!'
    let index = global.owner.findIndex(v => (v.replace(/[^0-9]/g, '') + '@s.whatsapp.net') === (who.replace(/[^0-9]/g, '') + '@s.whatsapp.net'))
    global.owner.splice(index, 1)
    const caption = `Sekarang @${who.split`@`[0]} diberhentikan sebagai Owner!`
    await conn.reply(m.chat, caption, m, {
        mentions: conn.parseMention(caption)
    });
}
handler.help = ['delowner [@user]']
handler.tags = ['owner']
handler.command = /^(remove|hapus|-|del)owner$/i

handler.owner = true

export default handler