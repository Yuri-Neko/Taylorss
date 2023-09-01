import midjourney from "midjourney-client"
import fetch from "node-fetch"

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
    if (!text) throw "input text"
    try {
            await m.reply(wait)
            let res = await midjourney(text)
            let rdm = res[Math.floor(Math.random() * res.length)];
        await conn.sendFile(m.chat, rdm, text, "*[ Result ]*\n" + text, m)
            
    } catch (e) {
        throw eror
    }
}
handler.help = ["midjourney"]
handler.tags = ["internet"]
handler.command = /^midjourney$/i

export default handler
