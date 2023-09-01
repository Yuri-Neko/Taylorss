
import fetch from "node-fetch"
import {
    sticker
} from "../lib/sticker.js"
import wibusoft from "wibusoft"

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let name = await conn.getName(who)
	let query = "input text\nEx. .cooltext hello world\n<command> <tex>"
	let text
	if (args.length >= 1) {
		text = args.slice(0).join(" ")
	} else if (m.quoted && m.quoted.text) {
		text = m.quoted.text
	} else throw query
	let urut = text.split`|`
  let one = urut[0]
  let two = urut[1]
  let three = urut[2]
  if (command == "cooltext") {
  const TEXT_STYLES = [
  {
    id: "780833150",
    name: "Skate",
    emoji: ["🛹", "🛼"],
  },
  {
    id: "732443655",
    name: "Gold",
    emoji: ["🥇", "🪙"],
  },
  {
    id: "732429307",
    name: "Silver",
    emoji: ["🥈", "🍴"],
  },
  {
    id: "1408867449",
    name: "Bronze",
    emoji: ["🥉"],
  },
  {
    id: "17",
    name: "Wood",
    emoji: ["🪵", "🪓"],
  },
  {
    id: "1",
    name: "Alien",
    emoji: ["👽", "👾"],
  },
  {
    id: "13",
    name: "Fire",
    emoji: ["❤️‍🔥", "🔥"],
  },
  {
    id: "4",
    name: "Animated Fire",
    emoji: ["🚒", "🧯", "🧑‍🚒", "👨‍🚒", "👩‍🚒"],
  },
  {
    id: "21",
    name: "Simple",
    emoji: ["🔵"],
  },
  {
    id: "4113131447",
    name: "Car",
    emoji: ["🚗", "🚘"],
  },
  {
    id: "2854656927",
    name: "Miami",
    emoji: ["🏖️", "⛱️", "🩴"],
  },
  {
    id: "789574607",
    name: "Groovy",
    emoji: ["💃", "🕺", "👯", "👯‍♂️", "👯‍♀️", "🎶", "🎵"],
  },
  {
    id: "1783669883",
    name: "Cute",
    emoji: ["💗", "💞", "💓", "💝", "💌"],
  },
  {
    id: "829964308",
    name: "Princess",
    emoji: ["🤴", "👸"],
  },
  {
    id: "4112238638",
    name: "Astronaut",
    emoji: ["🌌", "☄️", "🚀", "🛰️", "🧑‍🚀", "👨‍🚀", "👩‍🚀"],
  },
  {
    id: "1779834160",
    name: "Ice",
    emoji: ["🍦", "🍧", "🍨", "🧊", "❄️", "🏒", "⛸️"],
  },
  {
    id: "https://ct.mob0.com/Previews/2172004512.png",
    name: "Sword",
    emoji: ["🤺", "⚔️", "🔪", "🗡️", "⚔️", "🏹", "🛡️"],
  },
  {
    id: "33",
    name: "Cyber Gay",
    emoji: ["🌈", "🏳️‍🌈"],
  },
  {
    id: "615608693",
    name: "Muddy",
    emoji: ["💩"],
  },
  {
    id: "1408818473",
    name: "Halloween",
    emoji: ["🎃", "🦇"],
  },
  {
    id: "10",
    name: "Bridge",
    emoji: ["🌉"],
  },
  {
    id: "38",
    name: "Fuck Terfs",
    emoji: ["🧙", "🧙‍♂️", "🧙‍♀️", "⚡"],
  },
];

  let listSections = []
	Object.values(TEXT_STYLES).map((v, index) => {
	listSections.push(["Model [ " + ++index + " ]", [
          [v.name, usedPrefix + command + "get " + v.id + "|" + text, "➥ " + (v.emoji).getRandom()]
        ]])
	})
	return conn.sendList(m.chat, htki + " 📺 Models 🔎 " + htka, `⚡ Silakan pilih Model di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ M O D E L ☂️", listSections, m)
  }
  if (command == "cooltextget") {
  await m.reply(wait)
    let result = await getImageUrl(one, two)
    try {
        let out = await wibusoft.tools.makeSticker(result, {
            author: packname,
            pack: name,
            keepScale: true
        })
        await m.reply(out)
    } catch (e) {
        let stick = await sticker(buffer, false, name, packname)
        await conn.sendFile(m.chat, stick, "cooltext.webp", "", m)
    }
  }
}
handler.help = ["cooltext"]
handler.tags = ["misc"]
handler.command = /^(cooltext|cooltextget)$/i
export default handler

const FONT_SIZE = 70;
const URL = "https://cooltext.com/PostChange";

async function getImageUrl(textStyleId, text) {
  try {
    const headers = {
      "Content-Type":
        "application/x-www-form-urlencoded; charset=UTF-8",
    };
    const body = [
      `LogoID=${textStyleId}`,
      `Text=${encodeURIComponent(text)}`,
      `FontSize=${FONT_SIZE}`,
      /*
        just ignore these abritary things here,
        it just works you know
      */
      `FileFormat=6`,
      `Integer5=0`,
      `Integer7=0`,
      `Integer8=0`,
      `Integer6=0`,
      `Integer9=0`,
      `Integer13=on`,
      `Integer12=on`,
    ].join("&");
    const response = await fetch(URL, {
      method: "POST",
      headers,
      body,
    });

    const json = await response.json();
    return json?.renderLocation || null;
  } catch (e) {
    console.error(e);
    throw new Error("Something went wrong getting Word Art");
  }
}
