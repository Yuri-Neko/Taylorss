import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
if (!text) return m.reply("Input query\nExample: .gptd4 hello")
await m.reply(wait)
try {
// Contoh penggunaan
let result = await chatGptD4(text)
await m.reply(result)
} catch (e) {
await m.reply(eror)
}
}
handler.help = ["gptd4"]
handler.tags = ["internet"]
handler.command = /^(gptd4)$/i
export default handler

/* New Line */
async function chatGptD4(prompt) {
	let messageChain7 = []
    let baseURL = "https://chatgptdddd.com/";
  const data = JSON.stringify({
    messages: messageChain7,
    model: {
      id: "gpt-3.5-turbo",
      name: "GPT-3.5",
      maxLength: 12000,
      tokenLimit: 4000
    },
    temperature: 1,
    prompt: prompt,
    key: null
  });

  const headers = {
    "Content-Type": "application/json",
    "Referer": baseURL
  };

  try {
    const response = await fetch(baseURL + "api/chat", {
      method: "POST",
      headers: headers,
      body: data,
      responseType: "stream"
    });

    const result = await response.text();
    return result;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
}