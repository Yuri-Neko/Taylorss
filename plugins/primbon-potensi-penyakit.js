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
  const potensiPenyakit = await primbon.cek_potensi_penyakit(text.split("|")[0], text.split("|")[1], text.split("|")[2]);

const caption = `
=== Cek Potensi Penyakit (Metode Pitagoras) ===
Analisa: ${potensiPenyakit.message.analisa}
Sektor yang dianalisa: ${potensiPenyakit.message.sektor}
Elemen: ${potensiPenyakit.message.elemen}
Catatan: ${potensiPenyakit.message.catatan}
`;

await m.reply(caption);

} catch (e) {
  console.error("Error occurred during conversion:", error)
  await m.reply("Terjadi kesalahan!")
}

}
handler.help = ["cekpenyakit"]
handler.tags = ["primbon"]
handler.command = /^cekpenyakit$/i
export default handler
