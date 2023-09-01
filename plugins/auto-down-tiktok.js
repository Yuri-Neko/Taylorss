import axios from "axios"
import fetch from "node-fetch"
import cheerio from "cheerio"
import got from "got"
import fg from "api-dylux"

export async function before(m) {
    const regex = /^https:\/\/vt\.tiktok\.com\/([a-zA-Z0-9]+)\//;
    let spas = "                "
    if (regex.test(m.text)) {
    m.reply(wait)
    try {
                let Scrap = await Tiktokdl(m.text)
                let S = Scrap.result
                let ScrapCap = `${spas}*「 T I K T O K 」*

*📛Author:* ${S.author.nickname}
*📒Title:* ${S.desc}
`
                await conn.sendFile(m.chat, S.download.wm, "", ScrapCap, m)
            } catch (e) {
                try {
                let Fg = await fg.tiktok(m.text)
    let FgCap = `${spas}*[ T I K T O K ]*

*Nickname:* ${Fg.nickname}
*Unique ID:* ${Fg.unique_id}
*Download Count:* ${Fg.download_count}
*Duration:* ${Fg.duration}
*Description:* ${Fg.description}`
                await conn.sendFile(m.chat, Fg.play || Fg.hdplay , "", FgCap, m)
            } catch (e) {
                console.log('Erorr');
            }
            }
    }

}
export const disabled = false


/* New Line */

//@xct007/tiktok-scraper

async function Tiktokdl(url) {
    //async function tiktokdl(url) {
    try {
        function API_URL(aweme) {
            return `https://api16-core-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${aweme}&version_name=1.0.4&version_code=104&build_number=1.0.4&manifest_version_code=104&update_version_code=104&openudid=4dsoq34x808ocz3m&uuid=6320652962800978&_rticket=1671193816600&ts=1671193816&device_brand=POCO&device_type=surya&device_platform=android&resolution=1080*2179&dpi=440&os_version=12&os_api=31&carrier_region=US&sys_region=US%C2%AEion=US&app_name=TikMate%20Downloader&app_language=en&language=en&timezone_name=Western%20Indonesia%20Time&timezone_offset=25200&channel=googleplay&ac=wifi&mcc_mnc=&is_my_cn=0&aid=1180&ssmix=a&as=a1qwert123&cp=cbfhckdckkde1`;
        };
        async function getAwemeId(url) {
            // any :/
            let result;
            const Konto1 = /video\/([\d|\+]+)?\/?/;
            const valid = url.match(Konto1);
            if (valid) {
                return valid[1];
            } else {
                try {
                    const data = await got
                        .get(url, {
                            headers: {
                                "Accept-Encoding": "deflate",
                            },
                            maxRedirects: 0,
                        })
                        .catch((e) => e.response.headers.location);
                    const _url = data;
                    const _valid = _url.match(Konto1);
                    if (_valid) {
                        result = _valid[1];
                    }
                } catch (error) {
                    // console.log(error)
                    result = false;
                }
            }
            return result;
        };
        const valid = await getAwemeId(url);
        //if (!valid) return false // result = false
        const data = await got
            .get(API_URL(valid), {
                headers: {
                    "Accept-Encoding": "deflate",
                    "User-Agent": "okhttp/3.14.9",
                },
            })
            .catch((e) => e.response);
        //if (!data) return false // result = false
        const body = JSON.parse(data.body);
        const obj = body.aweme_list.find((o) => o.aweme_id === valid)
        const results = {
            aweme_id: obj.aweme_id,
            region: obj.region,
            desc: obj.desc,
            create_time: obj.create_time,
            author: {
                uid: obj.author.uid,
                unique_id: obj.author.unique_id,
                nickname: obj.author.nickname,
                birthday: obj.author.birthday,
            },
            duration: obj.music.duration,
            download: {
                nowm: obj.video.play_addr.url_list[0],
                wm: obj.video.download_addr.url_list[0],
                music: obj.music.play_url.url_list[0],
                music_info: {
                    id: obj.music.id,
                    title: obj.music.title,
                    author: obj.music.author,
                    is_original: obj.music.is_original,
                    cover_hd: obj.music.cover_hd.url_list[0],
                    cover_large: obj.music.cover_large.url_list[0],
                    cover_medium: obj.music.cover_medium.url_list[0],
                },
            },
        };
        return {
            status: true,
            result: results //data.body //valid
        }
    } catch (e) {
        return {
            status: false,
            result: e
        }
    }
}