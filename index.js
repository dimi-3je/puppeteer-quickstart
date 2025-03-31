import puppeteer from 'puppeteer'
import fs from 'fs'

const browser = await puppeteer.launch( { headless: false } )

const page = await browser.newPage()
await page.goto('https://www.maisterpub.net/ostala-ponudba/')

const data = await page.evaluate(() => {

    const titles = document.getElementsByTagName('th')
    const prices = document.getElementsByClassName('av-catalogue-price')
    const descriptions = document.getElementsByClassName('av-catalogue-content')

    const returns = []

    // return titles

    for (let i = 0; i < titles.length; i++) {
        let el = {
            title: titles[i].textContent.replace(/\t/g, ''),
            price: prices[i].textContent,
            description: descriptions[i].textContent.replace(/\n/g, '').replace(/\t/g, '')
        }
        returns.push(el)
    }
    
    return returns
})

await browser.close()

console.log(data);

// fs.writeFile(
//     './data.json',
//     JSON.stringify(data),
//     function (err) {
//         if (err) {
//             console.error(err)
//         }
//     }
// )