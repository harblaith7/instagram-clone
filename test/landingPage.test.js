const puppeteer = require("puppeteer")

let browser, page;
jest.setTimeout(300000);

beforeEach(async () => {
    browser = await puppeteer.launch({
        headless: false
    })
    page = await browser.newPage();
    await page.goto("http://localhost:3000/")
    
})

afterEach(async () => {
    await browser.close()
})


test("Appropriate text appears on landing page", async () => {
    const html = await page.$eval(".Header__link--login", e => e.innerHTML)
    expect(html).toEqual("Log in")
})

test("Clicking login takes us to login page", async () => {
    await page.click(".Header__link--login")
    const url = await page.url();
    expect(url).toMatch(/login/)
})

test("Clicking on signup button takes user to sign up page", async () => {
    await page.click(".Header__link--signup")
    const url = await page.url();
    expect(url).toMatch(/signup/)
})