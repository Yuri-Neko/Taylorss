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
  const primbonHariNaas = await primbon.primbon_hari_naas(text.split("|")[0], text.split("|")[1], text.split("|")[2]);

const caption = `
=== Primbon Hari Naas ===
Hari Lahir Anda: ${primbonHariNaas.message.hari_lahir}
Tanggal Lahir: ${primbonHariNaas.message.tgl_lahir}
Hari Naas Anda: ${primbonHariNaas.message.hari_naas}

Catatan:
${primbonHariNaas.message.catatan}

Info:
${primbonHariNaas.message.info}
`;

await m.reply(caption);

} catch (e) {
  console.error("Error occurred during conversion:", error)
  await m.reply("Terjadi kesalahan!")
}

}
handler.help = ["harinaas"]
handler.tags = ["primbon"]
handler.command = /^harinaas$/i
export default handler
