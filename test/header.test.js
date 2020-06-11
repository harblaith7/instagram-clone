const puppeteer = require("puppeteer")


test("We can launch a browser", async () => {
    const browser = await puppeteer.launch({
        headless: false
    })

    const page = await browser.newPage()
    await page.goto("localhost:3000")

    const html = await page.$eval(".Header__link--login", e => e.innerHTML)
    expect(html).toEqual("Log in")
})