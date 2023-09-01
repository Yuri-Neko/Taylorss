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
  const petungHariBaik = await primbon.petung_hari_baik(text.split("|")[0], text.split("|")[1], text.split("|")[2]);

const caption = `
=== Petung Hari Baik ===
Tanggal Lahir: ${petungHariBaik.message.tgl_lahir}
Kala Tinantang: ${petungHariBaik.message.kala_tinantang}

${petungHariBaik.message.info}

Catatan:
${petungHariBaik.message.catatan}
`;

await m.reply(caption);

} catch (e) {
  console.error("Error occurred during conversion:", error)
  await m.reply("Terjadi kesalahan!")
}

}
handler.help = ["haribaik"]
handler.tags = ["primbon"]
handler.command = /^haribaik$/i
export default handler
