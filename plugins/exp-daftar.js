import canvafy from "canvafy";
import { promises as fsPromises } from 'fs';
import { createHash } from "crypto";
import fetch from "node-fetch";

let Reg = /\|?(.*)([^\w\s])([0-9]*)$/i;

const handler = async (m, {
    conn, text, usedPrefix, command
}) => {
    conn.registrasi = conn.registrasi ? conn.registrasi : {};

    if (conn.registrasi[m.chat]?.[m.sender]) return m.reply('Kamu sedang meminta verifikasi!');
    let user = global.db.data.users[m.sender];
    if (user.registered === true) throw `[💬] Kamu sudah terdaftar\nMau daftar ulang? *${usedPrefix}unreg <SERIAL NUMBER>*`;
    const umurRandom = Math.floor(Math.random() * 100) + 1;
    const formatSalah = `⚠️ Format salah\n\n✳️ Penggunaan perintah : *${usedPrefix + command} nama.umur*\n📌Contoh : *${usedPrefix + command}* ${m.sender.split('@')[0]}.${umurRandom}`;
    if (!Reg.test(text)) throw formatSalah;
    let [_, name, splitter, age] = text.match(Reg);
    if (!name) throw "Nama tidak boleh kosong (Alphanumeric)";
    if (!age) throw "Umur tidak boleh kosong (Angka)";
    age = parseInt(age);
    if (age > 30) throw "*Gak boleh!*,\nTua amat dah 🗿";
    if (age < 5) throw "*Gak boleh!*,\nBanyak pedo 🗿";
    if (user.name && user.name.trim() === name.trim()) throw "Nama sudah dipakai";

    let sn = createHash("md5").update(m.sender).digest("hex");
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.fromMe ? conn.user.jid : m.sender;
    let pp = await conn.profilePictureUrl(who, "image").catch(_ => logo);

    let cap = `
*VERIFIKASI BERHASIL*

• *Nama:* ${name}
• *Umur:* ${age} tahun
• *Serial Number (SN):* ${sn}

Terima kasih telah melakukan verifikasi. Data pengguna telah disimpan dengan aman di database bot. Data kamu sekarang sudah terverifikasi.

🚀 Sekarang kamu dapat menggunakan fitur-fitur khusus yang hanya tersedia untuk pengguna terverifikasi.
`;

    const json = await createOtpCanvas(pp);

    let confirm = "💡 Reply pesan ini dengan mengetik kode OTP yang ada pada gambar!";
    let { key } = await conn.sendFile(m.chat, json.image, '', confirm, m);

    conn.registrasi[m.chat] = {
        ...conn.registrasi[m.chat],
        [m.sender]: {
            message: m,
            sender: m.sender,
            otp: json.otp,
            verified: json.verified,
            caption: cap,
            pesan: conn,
            age,
            user,
            name,
            key,
            timeout: setTimeout(() => {
                conn.sendMessage(m.chat, { delete: key });
                delete conn.registrasi[m.chat][m.sender];
            }, 60 * 1000)
        }
    };
}

handler.before = async (m, { conn }) => {
    conn.registrasi = conn.registrasi ? conn.registrasi : {};
    if (m.isBaileys) return;
    if (!conn.registrasi[m.chat]?.[m.sender]) return;
    if (!m.text) return;
    let { timeout, otp, verified, message, sender, pesan, caption, user, name, age, key } = conn.registrasi[m.chat]?.[m.sender];
    if (m.id === message.id) return;
    if (m.id === key.id) return;
    if (m.text == otp) {
        user.name = name.trim();
        user.age = age;
        user.regTime = +new Date;
        user.registered = true;
        let benar = `✨ OTP Benar!\n${m.sender.split('@')[0]} telah di verifikasi!\n\n`;
        pesan.sendFile(m.chat, verified, '', benar + caption, m);
        clearTimeout(timeout);
        pesan.sendMessage(m.chat, { delete: key });
        delete conn.registrasi[m.chat]?.[m.sender];
    } else {
        m.reply(`✖️ OTP Salah!\n${m.sender.split('@')[0]} tidak di verifikasi!`);
        clearTimeout(timeout);
        pesan.sendMessage(m.chat, { delete: key });
        delete conn.registrasi[m.chat]?.[m.sender];
    }
}

handler.help = ["daftar", "register"].map(v => v + " <nama>.<umur>");
handler.tags = ["xp"];
handler.command = /^(register|verify|daftar|reg(is)?|verif)$/i;

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function isNumber(x) {
    return !isNaN(x);
}

function generateRandomCharacter() {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return characters[Math.floor(Math.random() * characters.length)];
}

async function createOtpCanvas(avatar) {
    const codetext = Array.from({ length: 4 }, generateRandomCharacter).join('');
    const captchaBuffer = await new canvafy.Captcha()
        .setBackground("image", "https://cdn.discordapp.com/attachments/1087030211813593190/1110243947311288530/beeautiful-sunset-illustration-1212023.webp")
        .setCaptchaKey(codetext.toString())
        .setBorder("#f0f0f0")
        .setOverlayOpacity(0.7)
        .build();
    const securityBuffer = await new canvafy.Security()
        .setAvatar(avatar)
        .setBackground("image", "https://cdn.discordapp.com/attachments/1087030211813593190/1110243947311288530/beeautiful-sunset-illustration-1212023.webp")
        .setCreatedTimestamp(Date.now())
        .setSuspectTimestamp(1)
        .setBorder("#f0f0f0")
        .setLocale("id") // country short code - default "en"
        .setAvatarBorder("#f0f0f0")
        .setOverlayOpacity(0.9)
        .build();
    return {
        image: captchaBuffer,
        otp: codetext,
        verified: securityBuffer
    };
}
