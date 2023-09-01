/* Recode Wudysoft */
import {
    generateWAMessageFromContent
} from "@adiwajshing/baileys"

let handler = async (m, {
    conn,
    groupMetadata,
    usedPrefix,
    command
}) => {
    const loadingEmojis = ["🕛", "🕑", "🕓", "🕕", "🕗", "🕙"]; // Emojis jam

await conn.sendMessage(m.chat, {
    react: {
        text: loadingEmojis[0],
        key: m.key,
    }
});

// Animasi loading dengan emoji jam
let currentIndex = 0;
const loadingInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % loadingEmojis.length;
    conn.sendMessage(m.chat, {
    react: {
        text: loadingEmojis[currentIndex],
        key: m.key,
    }
});
}, 500); // Ganti angka ini untuk mengatur kecepatan animasi

// Simulasi waktu tunda (misalnya, 3 detik) sebelum menghentikan animasi
await new Promise(resolve => setTimeout(resolve, 3000));

// Menghentikan animasi dan mengganti emoji dengan emoji sukses
clearInterval(loadingInterval);
const successEmoji = "✅";
await conn.sendMessage(m.chat, {
    react: {
        text: successEmoji,
        key: m.key,
    }
});
    var soun = ["aku-ngakak",
        "anjay",
        "ara-ara2",
        "ara-ara-cowok",
        "ara-ara",
        "arigatou",
        "assalamualaikum",
        "asu",
        "ayank",
        "bacot",
        "bahagia-aku",
        "baka",
        "bansos",
        "beat-box2",
        "beat-box",
        "biasalah",
        "bidadari",
        "bot",
        "buka-pintu",
        "canda-anjing",
        "cepetan",
        "china",
        "cuekin-terus",
        "daisuki-dayo",
        "daisuki",
        "dengan-mu",
        "Donasiku",
        "gaboleh-gitu",
        "gak-lucu",
        "gamau",
        "gay",
        "gelay",
        "gitar",
        "gomenasai",
        "hai-bot",
        "hampa",
        "hayo",
        "hp-iphone",
        "ih-wibu",
        "i-like-you",
        "india",
        "karna-lo-wibu",
        "kiss",
        "kontol",
        "ku-coba",
        "maju-wibu",
        "makasih",
        "mastah",
        "menuasli",
        "menuku",
        "menu",
        "MenuYuki",
        "nande-nande",
        "nani",
        "ngadi-ngadi",
        "nikah",
        "nuina",
        "onichan",
        "ownerku",
        "owner-sange",
        "pak-sapardi",
        "pale",
        "pantek",
        "pasi-pasi",
        "punten",
        "sayang",
        "siapa-sih",
        "sudah-biasa",
        "summertime",
        "tanya-bapak-lu",
        "to-the-bone",
        "wajib",
        "waku",
        "woi",
        "yamete",
        "yowaimo",
        "yoyowaimo"
    ].getRandom()
    var vn = "https://raw.githubusercontent.com/AyGemuy/HAORI-API/main/audio/" + soun + ".mp3"
    var gamb = [
        thumb,
        logo
    ].getRandom()

    const cap = `👋 Selamat datang di dashboard bot kami!\n\n- Kami berharap Anda akan menikmati pengalaman berinteraksi dengan bot kami yang ramah dan intuitif.${readMore}\n\n- Kami telah menyertakan berbagai fitur yang dapat membantu Anda mengelola dan meningkatkan kinerja bot Anda.\n\n- Kami berharap Anda akan menikmati menggunakan dashboard bot kami dan semoga Anda mendapatkan manfaat dari fitur-fitur yang kami tawarkan.\n\n[ LIST MENU ]\n${usedPrefix}menulist\n${usedPrefix}allmenu\n\n`.trim().replace(/\n\s*/g, '\n');

        let mthumb = await (await conn.getFile(logo)).data
        let msg = await generateWAMessageFromContent(m.chat, { scheduledCallCreationMessage: {
	callType: 2,
	scheduledTimestampMs: 0,
	title: cap }
	}, {})
        await conn.relayMessage(m.chat, msg.message, {})
        await conn.sendPresenceUpdate('recording', m.chat)
        await conn.sendFile(m.chat, vn, '', null, m, true, { ptt: true })
    
}
handler.help = ["menu", "help", "?"]
handler.tags = ["main"]
handler.command = /^(menu|help|\?)$/i

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)