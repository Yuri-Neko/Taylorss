const { Primbon } = await(await import('../lib/scraped-primbon.js'))
const primbon = new Primbon()
let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
let text
if (args.length >= 1) {
  text = args.slice(0).join(" ")
} else if (m.quoted && m.quoted.text) {
  text = m.quoted.text
} else return m.reply("Apa mimpi mu?")
await m.reply(wait)
try {
  const pekerjaanWeton = await primbon.pekerjaan_weton_lahir(text.split("|")[0], text.split("|")[1], text.split("|")[2]);

const caption = `
=== Pekerjaan Berdasarkan Weton Lahir ===
Hari Lahir Anda: ${pekerjaanWeton.message.hari_lahir}
Pekerjaan: ${pekerjaanWeton.message.pekerjaan}
Catatan: ${pekerjaanWeton.message.catatan}
`;

await m.reply(caption);

} catch (e) {
  console.error("Error occurred during conversion:", error)
  await m.reply("Terjadi kesalahan!")
}

}
handler.help = ["kerjaweton"]
handler.tags = ["primbon"]
handler.command = /^kerjaweton$/i
export default handler
