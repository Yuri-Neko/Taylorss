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
  const ramalanSuamiIstri = await primbon.suami_istri(text.split("|")[0], text.split("|")[1], text.split("|")[2], text.split("|")[3], text.split("|")[4], text.split("|")[5], text.split("|")[6], text.split("|")[7]);

const caption = `
=== Ramalan Suami Istri ===
Suami: ${ramalanSuamiIstri.message.suami.nama}
Tgl. Lahir Suami: ${ramalanSuamiIstri.message.suami.tgl_lahir}
Istri: ${ramalanSuamiIstri.message.istri.nama}
Tgl. Lahir Istri: ${ramalanSuamiIstri.message.istri.tgl_lahir}
Hasil Ramalan: ${ramalanSuamiIstri.message.result}
Catatan: ${ramalanSuamiIstri.message.catatan}
`;

await m.reply(caption);

} catch (e) {
  console.error("Error occurred during conversion:", error)
  await m.reply("Terjadi kesalahan!")
}

}
handler.help = ["suamiistri"]
handler.tags = ["primbon"]
handler.command = /^suamiistri$/i
export default handler
