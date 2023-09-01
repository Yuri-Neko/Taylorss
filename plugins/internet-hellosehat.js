import puppeteer from "puppeteer"

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "Input Teks"
    try {
            await m.reply(wait)
            let res = await scrape('https://hellosehat.com/search/?s=' +text+ '&page=1')
            await m.reply(res[0].value)
    } catch (e) {
        throw eror
    }
}
handler.help = ["hellosehat"]
handler.tags = ["internet"]
handler.command = /^hellosehat$/i

export default handler

/* New Line */
async function scrape(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // menghapus tag link, style, dan script dari halaman
  await page.evaluate(() => {
    const elements = document.querySelectorAll('link, style, script');
    elements.forEach(el => el.remove());
  });

  // mengambil teks dan gambar dari halaman
  const data = await page.evaluate(() => {
    const elements = document.querySelectorAll('*');
    const results = [];

    elements.forEach(el => {
      if (el.tagName !== 'SCRIPT' && el.tagName !== 'LINK' && el.tagName !== 'STYLE' && el.tagName !== 'FRAME' && el.tagName !== 'META') {
        const obj = {};

        if (el.textContent.trim()) {
          obj.type = 'text';
          obj.value = el.textContent.trim();
          results.push(obj);
        }

        if (el.tagName === 'IMG' && el.src) {
          obj.type = 'image';
          obj.value = el.src;
          results.push(obj);
        }
      }
    });

    return results;
  });

  await browser.close();
  return data;
}
