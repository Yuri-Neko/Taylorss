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
  const kecocokanNama = await primbon.kecocokan_nama(text.split("|")[0], text.split("|")[1], text.split("|")[2], text.split("|")[3]);

const caption = `
=== Kecocokan Nama ===
Nama: ${kecocokanNama.message.nama}
Tanggal Lahir: ${kecocokanNama.message.tgl_lahir}
Life Path Number: ${kecocokanNama.message.life_path}
Destiny Number: ${kecocokanNama.message.destiny}
Heart's Desire Number: ${kecocokanNama.message.destiny_desire}
Personality Number: ${kecocokanNama.message.personality}
Persentase Kecocokan: ${kecocokanNama.message.persentase_kecocokan}
Catatan: ${kecocokanNama.message.catatan}
`;

await m.reply(caption);

} catch (e) {
  console.error("Error occurred during conversion:", error)
  await m.reply("Terjadi kesalahan!")
}

}
handler.help = ["cocoknama"]
handler.tags = ["primbon"]
handler.command = /^cocoknama$/i
export default handler
