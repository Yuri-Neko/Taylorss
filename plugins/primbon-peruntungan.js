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
  const ramalanPeruntungan = await primbon.ramalan_peruntungan(text.split("|")[0], text.split("|")[1], text.split("|")[2], text.split("|")[3], text.split("|")[4]);

const caption = `
=== Ramalan Peruntungan ===
Nama: ${ramalanPeruntungan.message.nama}
Tanggal Lahir: ${ramalanPeruntungan.message.tgl_lahir}
Peruntungan Tahun: ${ramalanPeruntungan.message.peruntungan_tahun}
Hasil Ramalan:
${ramalanPeruntungan.message.result}

Catatan:
${ramalanPeruntungan.message.catatan}
`;

await m.reply(caption);

} catch (e) {
  console.error("Error occurred during conversion:", error)
  await m.reply("Terjadi kesalahan!")
}

}
handler.help = ["peruntungan"]
handler.tags = ["primbon"]
handler.command = /^peruntungan$/i
export default handler
