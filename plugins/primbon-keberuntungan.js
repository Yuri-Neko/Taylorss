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
  const potensiKeberuntungan = await primbon.potensi_keberuntungan(text.split("|")[0], text.split("|")[1], text.split("|")[2], text.split("|")[3]);

const caption = `
=== Potensi Keberuntungan ===
Nama: ${potensiKeberuntungan.message.nama}
Tanggal Lahir: ${potensiKeberuntungan.message.tgl_lahir}
Potensi Keberuntungan: ${potensiKeberuntungan.message.result}
`;

await m.reply(caption);

} catch (e) {
  console.error("Error occurred during conversion:", error)
  await m.reply("Terjadi kesalahan!")
}

}
handler.help = ["keberuntungan"]
handler.tags = ["primbon"]
handler.command = /^keberuntungan$/i
export default handler
