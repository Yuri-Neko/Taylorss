import axios from "axios";
import jimp from "jimp";
import FormData from "form-data";
import { Sticker, createSticker, StickerTypes } from "wa-sticker-formatter";

let handler = async (m, { conn, usedPrefix, command }) => {
	conn.cartoon = conn.cartoon ? conn.cartoon : {};
	if (m.sender in conn.cartoon)
		throw "Masih ada proses yang belum selesai sobat. Harap tunggu hingga selesai >//<";
	let q = m.quoted ? m.quoted : m;
	let mime = (q.msg || q).mimetype || q.mediaType || "";
	if (!mime) throw `Di mana gambar yang ingin Anda jadikan kartun?`;
	if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`;
	else conn.cartoon[m.sender] = true;
	m.reply("Mengubah gambar menjadi kartun...");
	let img = await q.download?.();
	try {
		await Cartoon(img).then((response) => {
			if (response.message == "success") {
				await conn.sendFile(
					m.chat,
					response.download.full,
					"",
					"Operasi berhasil diselesaikan♥>//<",
					m
				);
				let name = await conn.getName(m.sender),
					sticker = new Sticker(response.download.head, {
						pack: global.packname,
						author: name,
						type: StickerTypes.FULL,
						categories: ["🤩", "🎉"],
						id: randomId(),
						quality: 100,
						background: "#00000000",
					});
				conn.sendMessage(m.chat, await sticker.toMessage(), { quoted: m });
			} else {
				m.reply(
					"Maaf, temanku, gambarnya tidak memperlihatkan wajah. Silakan kirim gambar yang wajahnya terbuka dan terlihat."
				);
			}
		});
	} catch {
		m.reply("Proses gagal :(");
	} finally {
		conn.cartoon[m.sender] ? delete conn.cartoon[m.sender] : false;
	}
};
handler.help = ["cartoon"];
handler.tags = ["ai"];
handler.command = ["cartoon"];
handler.premium = false

export default handler;

async function GetBuffer(url) {
  return new Promise(async (resolve, reject) => {
    let buffer;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      buffer = await response.arrayBuffer();
    } catch (error) {
      reject(error);
      return;
    }
    resolve(Buffer.from(buffer));
  });
}

function GetType(Data) {
  return new Promise((resolve, reject) => {
    let Result, Status;
    if (Buffer.isBuffer(Data)) {
      Result = Buffer.from(Data).toString("base64");
      Status = 0;
    } else {
      Status = 1;
    }
    resolve({
      status: Status,
      result: Result,
    });
  });
}

async function Cartoon(url) {
  return new Promise(async (resolve, reject) => {
    let Data;
    try {
      const buffer = await GetBuffer(url);
      const Base64 = await GetType(buffer);

      const uploadUrl = "https://access1.imglarger.com/PhoAi/Upload";
      const uploadOptions = {
        method: "POST",
        headers: {
          connection: "keep-alive",
          accept: "application/json, text/plain, */*",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          type: 11,
          base64Image: Base64.result,
        }),
      };

      const { data } = await fetch(uploadUrl, uploadOptions).then((res) =>
        res.json()
      );
      const code = data.code;
      const type = data.type;

      while (true) {
        const checkStatusUrl = "https://access1.imglarger.com/PhoAi/CheckStatus";
        const checkStatusOptions = {
          method: "POST",
          headers: {
            connection: "keep-alive",
            accept: "application/json, text/plain, */*",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            code: code,
            isMember: 0,
            type: type,
          }),
        };

        const { data: { status, downloadUrls } } = await fetch(checkStatusUrl, checkStatusOptions).then((res) => res.json());

        if (status == "success") {
          Data = {
            message: "success",
            download: {
              full: downloadUrls[0],
              head: downloadUrls[1],
            },
          };
          break;
        } else if (status == "noface") {
          Data = {
            message: "noface",
          };
          break;
        }
      }
    } catch (error) {
      Data = false;
    } finally {
      if (Data == false) {
        reject(false);
      }
      resolve(Data);
    }
  });
}

function randomId() {
  return Math.floor(100000 + Math.random() * 900000);
}
