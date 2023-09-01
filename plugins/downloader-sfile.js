import cheerio from 'cheerio'
import fetch from 'node-fetch'

let handler = async (m, {
    conn,
    usedPrefix,
    text,
    args,
    command
}) => {
    try {
        if (text.match(/(https:\/\/sfile.mobi\/)/gi)) {
            let res = await sfileDl(text)
            if (!res) throw 'Error :/'
            let caption = `🔍 *[ RESULT ]*\n\n📁 *Filename:* ${res.filename}\n📦 *Filesize:* ${res.filesize}\n📎 *Mimetype:* ${res.mimetype}\n⬇️ *Download:* ${res.download}`
            await m.reply(caption + '\n\n' + wait)
            conn.sendMessage(m.chat, {
                document: {
                    url: res.download
                },
                fileName: res.filename,
                mimetype: res.mimetype
            }, {
                quoted: m
            })
        } else if (text) {
            let [query, page] = text.split`|`
            let res = await sfileSearch(query, page)
            if (!res.length) throw `Query "${text}" not found :/`
            let teks = res.map((v, index) => {
                return `🔍 *[ RESULT ${index + 1} ]*\n\n📚 *Title:* ${v.title}\n📏 *Size:* ${v.size}\n🔗 *Link:* ${v.link}`
            }).filter(v => v).join("\n\n________________________\n\n")
            await m.reply(teks)
        } else throw 'Input Query / Sfile Url!'
    } catch (e) {
        m.reply(eror)
    }
}
handler.help = ['sfile']
handler.tags = ['downloader']
handler.command = /^sfile(d(own(load)?|l))?$/i

export default handler

async function sfileSearch(query, page = 1) {
    let res = await fetch(`https://sfile.mobi/search.php?q=${query}&page=${page}`)
    let $ = cheerio.load(await res.text())
    let result = []
    $('div.list').each(function() {
        let title = $(this).find('a').text()
        let size = $(this).text().trim().split('(')[1]
        let link = $(this).find('a').attr('href')
        if (link) result.push({
            title,
            size: size.replace(')', ''),
            link
        })
    })
    return result
}

async function sfileDl(url) {
    let res = await fetch(url)
    let $ = cheerio.load(await res.text())
    let filename = $('div.w3-row-padding').find('img').attr('alt')
    let mimetype = $('div.list').text().split(' - ')[1].split('\n')[0]
    let filesize = $('#download').text().replace(/Download File/g, '').replace(/\(|\)/g, '').trim()
    let download = $('#download').attr('href') + '&k=' + Math.floor(Math.random() * (15 - 10 + 1) + 10)
    return {
        filename,
        filesize,
        mimetype,
        download
    }
}