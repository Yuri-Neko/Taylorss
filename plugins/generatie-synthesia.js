import cheerio from 'cheerio';
import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, text, command }) => {
    const API_KEYS = ["2bb47c8a263cacd1a6cc100e1317fcd1", "1a1c4a0edaa7b8cbc82eb52a6baf4c8d", "1617249c979543caaef58e3c726b7ff3"];
    const voiceMap = { en: "70ded880-ad19-4673-956c-20aeaa5d1695", fr: "b4962a67-ce24-4a3e-935b-e695b860d9cf", de: "58a9cbbd-ab42-4560-9c4f-e801a34e92a1", it: "b605a26e-14ab-46ff-b3ba-e440199f3cd4" };
    const apiKey = API_KEYS[Math.floor(Math.random() * API_KEYS.length)];
    const voice = voiceMap["en"];
    const lister = ["create", "download", "delete"];
    const url = "https://api.synthesia.io/v2/videos";
    const [feature, inputs] = text.split("|");

    if (!lister.includes(feature)) return m.reply(`Gunakan perintah dengan format yang benar:\n\nUntuk membuat video:\n.${command} create|tautan|teks|contoh\nContoh:\n.${command} create|vpn|Ini adalah teks contoh|Ini adalah contoh yang ditampilkan`);

    if (feature === "create") {
        if (!inputs) return m.reply(`Anda harus menyediakan tautan, teks, dan contoh. Contoh penggunaan:\n\n.${command} create|teks`);
        await m.reply("Sedang membuat video, harap tunggu...");

        try {
            const headers = { "accept": "application/json", "authorization": apiKey, "Content-Type": "application/json" };
            const json_data = { test: false, title: 'RobotBulls News', description: 'Crypto and economic News!', visibility: 'public', ctaSettings: { label: 'More News!', url: 'https://www.robotbulls.com' }, callbackId: 'support@robotbulls.com', input: [ { scriptText: inputs, avatar: '6784e07c-9f71-428f-a43d-a27df9965833', avatarSettings: { voice: voice, horizontalAlign: 'center', scale: 0.8, style: 'rectangular' }, background: 'off_white' } ] };

            const videoData = await makeRequest(url, 'POST', json_data, headers);
            const videoId = videoData.id;

            conn.synthesia = conn.synthesia || {};
            conn.synthesia[m.chat] = { videoId: videoId };

            await m.reply('Video berhasil dibuat! Gunakan .synthesia download untuk mengunduhnya.');
        } catch (error) {
            console.error(error);
            await m.reply('Terjadi kesalahan saat membuat video. Silakan coba lagi nanti.');
        }
    }

    if (feature === "download") {
        if (!conn.synthesia || !conn.synthesia[m.chat] || !conn.synthesia[m.chat].videoId) return m.reply('Anda harus membuat video terlebih dahulu dengan menggunakan perintah \`.synthesia create\`.');

        await m.reply("Sedang mengunduh video, harap tunggu...");

        try {
            const videoId = conn.synthesia[m.chat].videoId;
            const headers = { "accept": "application/json", "authorization": apiKey, "Content-Type": "application/json" };

            while (true) {
                const videoUrl = `${url}/${videoId}`;
                const videoResponse = await makeRequest(videoUrl, 'GET', null, headers);

                if (videoResponse.status === 'complete') {
                    await conn.sendFile(m.chat, videoResponse.download, '', 'Synthesia', m, false, { mentions: [m.sender] });
                    await m.reply('Video berhasil diunduh!');
                    delete conn.synthesia[m.chat]; // Hapus sesi setelah video berhasil diunduh
                    break;
                } else if (videoResponse.status === 'in_progress') {
                    await m.reply('Video masih dalam proses pembuatan. Mohon tunggu sebentar...');
                    await new Promise(resolve => setTimeout(resolve, 5000)); // Menunggu 5 detik sebelum memeriksa status lagi
                } else {
                    await m.reply('Terjadi kesalahan saat mengunduh video. Silakan coba lagi nanti.');
                    break;
                }
            }
        } catch (error) {
            console.error(error);
            await m.reply('Terjadi kesalahan saat mengunduh video. Silakan coba lagi nanti.');
        }
    }

    if (feature === "delete") {
        if (conn.synthesia && conn.synthesia[m.chat]) {
            delete conn.synthesia[m.chat]; // Hapus sesi jika ada
            return m.reply('Sesi berhasil dihapus.');
        } else {
            return m.reply('Tidak ada sesi yang aktif.');
        }
    }
};

handler.help = ["synthesia"];
handler.tags = ["internet"];
handler.command = /^(synthesia)$/i;
export default handler;

const makeRequest = async (url, method, data = null, headers) => {
    const options = { method, headers, body: data ? JSON.stringify(data) : null };
    const response = await fetch(url, options);
    return await response.json();
};
