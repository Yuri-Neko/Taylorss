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
  const hariSangarTaliwangke = await primbon.hari_sangar_taliwangke(text.split("|")[0], text.split("|")[1], text.split("|")[2]);

const caption = `
=== Primbon Hari Sangar Taliwangke ===
Tanggal Lahir: ${hariSangarTaliwangke.message.tgl_lahir}
Result: ${hariSangarTaliwangke.message.result}

Info:
${hariSangarTaliwangke.message.info}

Catatan:
${hariSangarTaliwangke.message.catatan}
`;

await m.reply(caption);

} catch (e) {
  console.error("Error occurred during conversion:", error)
  await m.reply("Terjadi kesalahan!")
}

}
handler.help = ["harisangar"]
handler.tags = ["primbon"]
handler.command = /^harisangar$/i
export default handler
