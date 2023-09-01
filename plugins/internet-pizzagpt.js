import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
if (!text) return m.reply("Input query\nExample: .pizzagpt hello")
await m.reply(wait)
try {
// Contoh penggunaan
let outs = await pizzaGpt(text)
let result = JSON.parse(outs).answer.content
await m.reply(result)
} catch (e) {
await m.reply(eror)
}
}
handler.help = ["pizzagpt"]
handler.tags = ["internet"]
handler.command = /^(pizzagpt)$/i
export default handler

/* New Line */
async function pizzaKey() {
  const sourceResponse = await fetch("https://www.pizzagpt.it/", {
    method: "GET",
    headers: {
      "Referer": "www.pizzagpt.it"
    }
  });
  const sourceText = await sourceResponse.text();
  const reqJS = sourceText.match("index.*?\.js")[0];

  const response = await fetch("https://www.pizzagpt.it/_nuxt/" + reqJS.trim(), {
    method: "GET",
    headers: {
      "Referer": "www.pizzagpt.it"
    }
  });
  const respText = await response.text();
  const pizzaSecret = respText.match("x=\"(.*?)\"")[1];

  return pizzaSecret;
}

async function pizzaGpt(query) {
  const url = "https://www.pizzagpt.it/api/chat-completion";
  const headers = {
    "Content-Type": "text/plain;charset=UTF-8",
    "Referer": "https://www.pizzagpt.it/"
  };
  const data = JSON.stringify({
    question: query,
    secret: await pizzaKey()
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: data,
    });

    const responseText = await response.text();
    return responseText;
  } catch (error) {
    // Handle errors here
    console.error(error);
    return null;
  }
}
