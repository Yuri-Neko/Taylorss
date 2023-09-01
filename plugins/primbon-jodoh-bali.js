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
  const jodohBali = await primbon.ramalan_jodoh_bali(text.split("|")[0], text.split("|")[1], text.split("|")[2], text.split("|")[3], text.split("|")[4], text.split("|")[5], text.split("|")[6], text.split("|")[7]);

const caption = `
=== Ramalan Jodoh Bali ===
Nama Anda: ${jodohBali.message.nama_anda.nama}
Hari Lahir Anda: ${jodohBali.message.nama_anda.tgl_lahir}
Nama Pasangan: ${jodohBali.message.nama_pasangan.nama}
Hari Lahir Pasangan: ${jodohBali.message.nama_pasangan.tgl_lahir}
Hasil Ramalan: ${jodohBali.message.result}
Catatan: ${jodohBali.message.catatan}
`;

await m.reply(caption);

} catch (e) {
  console.error("Error occurred during conversion:", error)
  await m.reply("Terjadi kesalahan!")
}

}
handler.help = ["jodohbali"]
handler.tags = ["primbon"]
handler.command = /^jodohbali$/i
export default handler
