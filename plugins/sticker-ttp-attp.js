import { createSticker } from 'wa-sticker-formatter';
import fetch from 'node-fetch';
import {
    ttp,
    attp
} from '../lib/text2picture.js';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        m.reply(wait);
        text = text || m.quoted?.text || m.quoted?.caption || m.quoted?.description || '';
        if (!text) throw `Example: ${usedPrefix + command} Lagi Ruwet`;

        const apiEndpoint = 'https://api.lolhuman.xyz/api';
        const attpRes = await fetch(`${apiEndpoint}/${command}?apikey=${global.lolkey}&text=${encodeURIComponent(text.substring(0, 151))}`);
        const ttp7Res = await (await fetch(global.API('https://salism3api.pythonanywhere.com', '/text2img/', { text: text }))).json();
        const ttp8Res = await (await fetch(global.API('https://salism3api.pythonanywhere.com', '/text2img/', { text: text, outlineColor: '255,0,0,255', textColor: '0,0,0,255' }))).json();

        let stiker;
        if (command === 'attp' || command === 'attp3' || command === 'hartacustom') {
            stiker = await createSticker(await attpRes.buffer(), { pack: packname, author: author });
        } else if (command === 'attp2') {
            const stick = (await (await fetch(global.API('https://salism3api.pythonanywhere.com', '/text2img/', { text: text }))).json()).image;
            stiker = await createSticker(stick, { pack: packname, author: author });
        } else if (command === 'attp5') {
            const stick = await attp(text);
            stiker = await createSticker(stick[0].url, { pack: packname, author: author });
        } else if (command === 'ttp7') {
            const stick = ttp7Res.image;
            stiker = await createSticker(stick, { pack: packname, author: author });
        } else if (command === 'ttp8') {
            const stick = ttp8Res.image;
            stiker = await createSticker(stick, { pack: packname, author: author });
        } else if (command === 'ttp9') {
            const stick = await ttp(text);
            stiker = await createSticker(stick[0].url, { pack: packname, author: author });
        } else {
            stiker = await createSticker(await attpRes.buffer(), { pack: packname, author: author });
        }

        await conn.sendFile(m.chat, stiker, 'atet.webp', '', m);
    } catch (error) {
        console.error(error);
        m.reply(eror);
    }
};

handler.help = ['ttp', 'ttp2 -> ttp9', 'attp', 'attp2 -> attp5', 'hartacustom'];
handler.tags = ['creator'];
handler.command = /^((ttp(2|3|4|5|6|7|8|9)?)|(attp(2|3|4|5)?))|(hartacustom)$/i;
handler.limit = true;

export default handler;