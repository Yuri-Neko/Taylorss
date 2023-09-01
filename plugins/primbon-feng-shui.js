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
  const perhitunganFengShui = await primbon.perhitungan_feng_shui(text.split("|")[0], text.split("|")[1], text.split("|")[2]);

const caption = `
=== Perhitungan Feng Shui ===
Nama: ${perhitunganFengShui.message.nama}
Tahun Lahir: ${perhitunganFengShui.message.tahun_lahir}
Jenis Kelamin: ${perhitunganFengShui.message.jenis_kelamin}
Angka Kua: ${perhitunganFengShui.message.angka_kua}
Kelompok: ${perhitunganFengShui.message.kelompok}
Karakter: ${perhitunganFengShui.message.karakter}
Sektor/Arah Baik: ${perhitunganFengShui.message.sektor_baik}
Sektor/Arah Buruk: ${perhitunganFengShui.message.sektor_buruk}
`;

await m.reply(caption);

} catch (e) {
  console.error("Error occurred during conversion:", error)
  await m.reply("Terjadi kesalahan!")
}

}
handler.help = ["fengshui"]
handler.tags = ["primbon"]
handler.command = /^fengshui$/i
export default handler
