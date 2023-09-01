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
  const sifatKarakter = await primbon.sifat_karakter_tanggal_lahir(text.split("|")[0], text.split("|")[1], text.split("|")[2], text.split("|")[3]);

const caption = `
=== Sifat Karakter Tanggal Lahir ===
Nama: ${sifatKarakter.message.nama}
Tanggal Lahir: ${sifatKarakter.message.tgl_lahir}
Garis Hidup: ${sifatKarakter.message.garis_hidup}
`;

await m.reply(caption);

} catch (e) {
  console.error("Error occurred during conversion:", error)
  await m.reply("Terjadi kesalahan!")
}

}
handler.help = ["sifatlahir"]
handler.tags = ["primbon"]
handler.command = /^sifatlahir$/i
export default handler
