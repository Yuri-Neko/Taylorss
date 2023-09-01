import fetch from 'node-fetch'
let handler = async(m, { conn, text }) => {
  if (!text) throw "Input text"
  let res = await (await fetch('https://coolerapi.hopto.org/utility/reddit?subreddit=' + text)).json()
  let { name, title, active_users, total_members, description, icon, banner, allow_videos, allow_images, over_18, url } = res
  let cap = `*Name:* ${name}
*Title:* ${title}
*Active:* ${active_users}
*Members:* ${total_members}
*Description:* ${description}
*Over 18:* ${over_18}`
  await conn.sendFile(m.chat, icon ? icon : banner, '', cap + "\nUrl:\n" + url, m)
}
handler.help = ['subreddit']
handler.tags = ['search']
handler.command = /^(subreddit)$/i
export default handler 