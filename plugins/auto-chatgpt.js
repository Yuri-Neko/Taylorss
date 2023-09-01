import fetch from 'node-fetch';

export async function before(m) {
  this.autogpt = this.autogpt ? this.autogpt : {};
  if (m.isBaileys || !this.autogpt.status || !m.text) return false;
  let text = m.text;
  if (text) {
    try {
      if (text.includes('gpt') || text.includes('chatgpt')) {
        const startIdx = Math.max(text.indexOf('gpt'), text.indexOf('chatgpt')) + 2;
        const inputText = text.substring(startIdx).trim();
        const result = await gptGo(inputText)
            if (result) {
                await this.reply(m.chat, result, m);
            }
      } else if (text.startsWith('off')) {
        this.autogpt.status = false;
        await this.reply(m.chat, `*Chatgpt OFF*`, m);
      }
    } catch {
      await this.reply(m.chat, 'Error occurred.', m);
    }
  }
}

async function gptGo(query) {
    const encodeQuery = encodeURIComponent(query)
    const tokenResponse = await fetch(`https://gptgo.ai/action_get_token.php?q=${encodeQuery}&hlgpt=id`, {
        method: "GET",
        headers: {
            "Referer": "https://gptgo.ai/?hl=id",
            "origin": "https://gptgo.ai/"
        }
    });

    const {
        token
    } = await tokenResponse.json();

    const response = await fetch(`https://gptgo.ai/action_ai_gpt.php?token=${token}`, {
        method: "GET",
        headers: {
            "Referer": "https://gptgo.ai/?hl=id",
            "origin": "https://gptgo.ai/",
            "accept": "text/event-stream"
        }
    });

    const inputString = await response.text();
    const chunks = inputString.split("data:");
    let result = "";
    const doneKeyword = "[DONE]";

    for (let i = 1; i < chunks.length; i++) {
        const chunk = chunks[i].trim();
        const doneIndex = chunk.indexOf(doneKeyword);

        if (doneIndex !== -1) {
            // Exclude the part after [DONE]
            result += chunk.slice(0, doneIndex);
            break; // Stop processing further chunks
        }

        const contentIndex = chunk.indexOf('"content":"');
        if (contentIndex !== -1) {
            const startIndex = contentIndex + '"content":"'.length;
            const endIndex = chunk.indexOf('"', startIndex);
            if (endIndex !== -1) {
                const content = chunk.slice(startIndex, endIndex);
                result += content;
            }
        }
    }

    return result.replace(/\\n/g, '\n');
}
