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
  const rahasiaNagaHari = await primbon.rahasia_naga_hari(text.split("|")[0], text.split("|")[1], text.split("|")[2]);

const caption = `
=== Rahasia Naga Hari ===
Hari Lahir Anda: ${rahasiaNagaHari.message.hari_lahir}
Tanggal Lahir: ${rahasiaNagaHari.message.tgl_lahir}
Arah Naga Hari: ${rahasiaNagaHari.message.arah_naga_hari}

Catatan:
${rahasiaNagaHari.message.catatan}
`;

await m.reply(caption);

} catch (e) {
  console.error("Error occurred during conversion:", error)
  await m.reply("Terjadi kesalahan!")
}

}
handler.help = ["nagahari"]
handler.tags = ["primbon"]
handler.command = /^nagahari$/i
export default handler
