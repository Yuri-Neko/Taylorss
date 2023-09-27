import axios from "axios"

let handler = async (m, { conn, isOwner, usedPrefix, command, text }) => {
if (!text) throw 'Example: .txt2img highly detailed, intricate, 4k, 8k, sharp focus, detailed hair, detailed'
m.reply(wait)
const payloads = {
	prompt: text,
	width: 512,
	height: 768, 
	steps: 30, 
	model_id: "realistic_vision_v51", 
	sampler: "DPMS++", 
	seed: null, 
	cfg: 7, 
	image_num: 1, 
	negative_prompt: "(worst quality, low quality:1.3), extra hands, extra limbs, bad anatomy", 
	safety_checker: "no",
	enhance_prompt: "no", 
	multi_lingual: "no", 
	panorama: "no", 
	lora_model: "freyajkt48,shirtlift", // Cek Di Play Ground Rest Api Rose Jika Model Ini Error Ganti Ke Model Lain
	hiresFix: "yes", 
	lora_strength: 0.5, 
	webhook: null, 
};
const { data } = await axios
	.request({
		baseURL: "https://api.itsrose.life",
		url: "/image/diffusion/txt2img",
		method: "POST",
		params: {
			apikey: global.rose,
		},
		data: payloads,
	})
	.catch((e) => e?.["response"]);
const { status, message } = data; 

if (!status) {
	return m.reply(message);
}
const { result } = data;
console.log(result);
await conn.sendFile(m.chat, result.images[0], 'conco.jpg', `Prompt: ${text}`, m)
}
handler.help = ['txt2img']
handler.tags = ['ai']
handler.command = /^(txt2img)$/i
handler.premium = true

export default handler