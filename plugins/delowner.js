let handler = async (m, { conn, text }) => {

    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
    else who = m.chat
    if (!who) throw `tag orangnya!`
    if (!global.owner.includes(who.split`@`[0])) throw 'dia bukan Owner !'
    let index = global.owner.findIndex(v => (v.replace(/[^0-9]/g, '') + '@s.whatsapp.net') === (who.replace(/[^0-9]/g, '') + '@s.whatsapp.net'))
    global.owner.splice(index, 1)
    const caption = `Sekarang @${who.split`@`[0]} bukan owner !`
    await conn.reply(m.chat, caption, m, {
        mentions: conn.parseMention(caption)
    });

}
handler.help = ['delowner [@user]']
handler.tags = ['owner']
handler.command = /^(remove|hapus|-|del)owner$/i

handler.owner = true

export default handler