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
  const rejekiHoki = await primbon.rejeki_hoki_weton(text.split("|")[0], text.split("|")[1], text.split("|")[2]);

const caption = `
=== Rejeki & Hoki Berdasarkan Weton ===
Hari Lahir Anda: ${rejekiHoki.message.hari_lahir}
Rejeki: ${rejekiHoki.message.rejeki}
Catatan: ${rejekiHoki.message.catatan}
`;

await m.reply(caption);

} catch (e) {
  console.error("Error occurred during conversion:", error)
  await m.reply("Terjadi kesalahan!")
}

}
handler.help = ["rejekiweton"]
handler.tags = ["primbon"]
handler.command = /^rejekiweton$/i
export default handler
