import fs from 'fs';
import puppeteer from 'puppeteer';

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
        let res = await ChatGpt(text)
        await m.reply(res)
    } catch (e) {
        throw eror
    }
}
handler.help = ["fastgpt"]
handler.tags = ["internet"]
handler.command = /^fastgpt$/i

export default handler

/* New Line */
async function ChatGpt(input) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://fastgpt.app/")
    await page.waitForSelector("textarea");
    await page.type("textarea", input);
    await page.keyboard.press("Enter");
    await page.waitForSelector(".h-4.w-4.mr-1");
    const response = await page.$eval("div.flex.flex-grow.flex-col.gap-3 > div > div", (response) => {
        return response.innerText;
    })
    await browser.close();
    return response;
}