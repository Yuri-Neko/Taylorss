import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    let lister = [
        "search",
        "mirror"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.happymod search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .happymod search|vpn")
            await m.reply(wait)
            try {
                let res = await searchHappymod(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*

📢 *title:* ${item.title}
🌐 *url:* ${item.link}
🖼️ *image:* ${item.image}
🔖 *star:* ${item.star}
`

                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "mirror") {
            if (!inputs) return m.reply("Input query link\nExample: .happymod mirror|link")
            await m.reply(wait)
            try {
                let res = await mirrorHappymod(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*

📢 *title:* ${item.title}
🌐 *url:* ${item.link}
🔖 *source:* ${item.source}
`

                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }
        
    }
}
handler.help = ["happymod"]
handler.tags = ["internet"]
handler.command = /^(happymod)$/i
export default handler

/* New Line */
async function searchHappymod(q) {
  const response = await fetch(`https://example.com/search?q=${q}`);
  const body = await response.text();

  const $ = cheerio.load(body);
  const sections = [];

  $('.container-row.clearfix.container-wrap .container-left section.section-page-white').each((index, element) => {
    const title = $('h3.pdt-app-h3 a', element).text().trim();
    const link = 'https://example.com' + $('h3.pdt-app-h3 a', element).attr('href');
    const image = $('img.lazy', element).attr('data-original');
    const star = $('.a-search-num', element).text().trim();

    if (title && link && image && star) {
      sections.push({ title, link, image, star });
    }
  });

  return sections;
}

async function mirrorHappymod(url) {
  try {
    const response = await fetch(url + (url.endsWith('download.html') ? '' : 'download.html'));
    const html = await response.text();
    const $ = cheerio.load(html);
    const results = $('.cbox.mirror ul a').map((index, element) => ({
      link: $(element).attr('href'),
      title: $(element).find('h3').text(),
      source: $(element).find('h4').text(),
    })).get();
    return results;
  } catch (error) {
    console.error('Error:', error);
  }
}
