let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
const features = ["antiCall", "antiDelete", "antiLink", "antiLinkFb", "antiLinkHttp", "antiLinkIg", "antiLinkTel", "antiLinkTik", "antiLinkWa", "antiLinkYt", "antiSatir", "antiSticker", "antiVirtex", "antiToxic", "antibule", "autoBio", "autoChat", "autoGpt", "autoJoin", "autoPresence", "autoReply", "autoSticker", "autoVn", "viewStory", "bcjoin", "detect", "getmsg", "nsfw", "antiSpam", "simi", "updateAnime", "updateAnimeNews", "viewonce", "welcome", "autoread", "gconly", "nyimak", "pconly", "self", "swonly", "lastAnime", "latestNews"];
const activeFeatures = ["antiDelete", "detect", "getmsg", "lastAnime", "latestNews", "welcome"];
const result = features.map((f, i) => {
  const isActive = activeFeatures.includes(f) ? !global.db.data.chats[m.chat][f] : global.db.data.chats[m.chat][f];
  return `*${(i + 1).toString().padEnd(2)}.* ${f.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).padEnd(18)} ${isActive ? "✅ On" : "❌ Off"}`;
}).join('\n');

const  featureStatus = `*# Feature*            *Mode*\n${"-".repeat(33)}\n${result}`;
  const listEnab = `🛠️ *DAFTAR FITUR*

${featureStatus}

*📝 CARA MENGGUNAKAN:*
→ ${usedPrefix + command} [nomor]`;

  let isEnable = !/false|disable|(turn)?off|0/i.test(command);
  let chat = global.db.data.chats[m.chat];
  let user = global.db.data.users[m.sender];
  let index = parseInt(args[0]) - 1;

  if (isNaN(index) || index < 0 || index >= features.length) {
    return await conn.reply(m.chat, listEnab, m);
  }

  let type = features[index];

  if (!m.isGroup && !isOwner) {
    conn.reply(m.chat, "Maaf, fitur ini hanya bisa digunakan di dalam grup oleh pemilik bot.", m);
    throw false;
  }

  if (m.isGroup && !isAdmin) {
    conn.reply(m.chat, "Maaf, fitur ini hanya bisa digunakan oleh admin grup.", m);
    throw false;
  }
if (["antiDelete", "detect", "getmsg", "lastAnime", "latestNews", "welcome"].includes(type)) {
  chat[type] = !isEnable;
  conn.reply(m.chat, `Feature *${type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}* mode *${isEnable ? 'ON ✅' : 'OFF ❌'}*`, m);
  } else {
  if (["autoChat"].includes(type)) {
  conn.autochat = conn.autochat ? conn.autochat : {}
  conn.autochat.status = isEnable;
  conn.reply(m.chat, `Feature *${type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}* mode *${isEnable ? 'ON ✅' : 'OFF ❌'}*`, m);
  } else if (["autoGpt"].includes(type)) {
  conn.autogpt = conn.autogpt ? conn.autogpt : {}
  conn.autogpt.status = isEnable;
  conn.reply(m.chat, `Feature *${type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}* mode *${isEnable ? 'ON ✅' : 'OFF ❌'}*`, m);
  } else {
  chat[type] = isEnable;
  conn.reply(m.chat, `Feature *${type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}* mode *${isEnable ? 'ON ✅' : 'OFF ❌'}*`, m);
  }
  }
};
handler.help = ["en", "dis"].map(v => v + "able <nomor>");
handler.tags = ["group", "owner"];
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i;

export default handler;