import fetch from "node-fetch"

export async function all(m) {
if (m.isBaileys) return
    let MengSkak = /^(napa|halah|cih|cuih|yaha|erorr|kasian|dek|gajelas|bokep)$/i.test(m.text)
        if (MengSkak && m.isGroup) {
            //Teks Skak
            try {
let f = await fetch('https://api.kanye.rest/')
let x = await f.json()
return m.reply(x.quote)
} catch (e) {
const url = 'https://openai37.p.rapidapi.com/text-completion';
const options = {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '35c9046f7cmshd2db25369e25f75p1cf84ejsn4d95e7ba9240',
    'X-RapidAPI-Host': 'openai37.p.rapidapi.com'
  },
  body: '{"prompt":' + m.text + ',"temperature":0}'
};

var res = await fetch(url, options)
var json = await res.json()
return m.reply(json.data)
}
        }
 }
