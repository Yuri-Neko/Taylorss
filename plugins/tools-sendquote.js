let handler = async (m, { conn, text, command, usedPrefix, isAdmin, isOwner }) => {
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
            dfail('admin', m, conn)
            throw false
        }
    }
    if (!m.quoted) throw 'balas pesannya!'
    try {
		var q = this.serializeM(await (this.serializeM(await m.getQuotedObj())).getQuotedObj())
		if (!q) throw 'pesan yang anda reply tidak mengandung reply!'
		await q.copyNForward(m.chat, true)
	} catch (e) {
		throw 'pesan yang anda reply tidak mengandung reply!'
	}
}
handler.help = ['q']
handler.tags = ['tools']
handler.command = /^q$/i

export default handler 