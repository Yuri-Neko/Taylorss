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
} else return m.reply("Masukkan pesan!")
await m.reply(wait)
try {
  const wetonJawa = await primbon.weton_jawa(text.split("|")[0], text.split("|")[1], text.split("|")[2]);

const caption = `
=== Weton Jawa ===
Tanggal: ${wetonJawa.message.tanggal}
Jumlah Neptu: ${wetonJawa.message.jumlah_neptu}
Watak Hari (Kamarokam): ${wetonJawa.message.watak_hari}
Naga Hari: ${wetonJawa.message.naga_hari}
Jam Baik (Saptawara & Pancawara): ${wetonJawa.message.jam_baik}
Watak Kelahiran: ${wetonJawa.message.watak_kelahiran}
`;

await m.reply(caption);

} catch (e) {
  console.error("Error occurred during conversion:", error)
  await m.reply("Terjadi kesalahan!")
}

}
handler.help = ["wetonjawa"]
handler.tags = ["primbon"]
handler.command = /^wetonjawa$/i
export default handler
