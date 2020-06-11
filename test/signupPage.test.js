const puppeteer = require("puppeteer")

let browser, page;
jest.setTimeout(300000);

beforeEach(async () => {
  browser = await puppeteer.launch({
      headless : false,
      args: [
        '--disable-web-security',
      ]
  })
  page = await browser.newPage()
  await page.goto("http://localhost:3000/")
  await page.click(".Header__link--signup")
})


test("Submiting no fields triggers firstName error message", async () => {
    await page.click(".SignUpForm__input--sbtBtn");
    await page.waitFor("h4")
    const message = await page.$eval(".Alert", e => e.innerHTML)
    expect(message).toEqual("The first name is required")
})


test("Submiting only entering firstName field triggers lastName error message", async () => {
    // FOCUSING ON THE INPUT ELEMENT AND TYPING IN A NAME
    await page.focus("input[name=firstName]")
    await page.keyboard.type("Laith")
    // SUBMITING THE FORM
    await page.click(".SignUpForm__input--sbtBtn");
    // CHECK IF THE RIGHT ERROR MESSAGE POPS UP
    await page.waitFor("h4")
    const message = await page.$eval(".Alert", e => e.innerHTML)
    expect(message).toEqual("The last name is required")
})

test("Submiting only firstName & lastName field triggers email error message", async () => {
    // FOCUSING ON THE INPUT ELEMENT AND TYPING IN A NAME
    await page.focus("input[name=firstName]")
    await page.keyboard.type("Laith")
    await page.focus("input[name=lastName]")
    await page.keyboard.type("Harb")
    // SUBMITING THE FORM
    await page.click(".SignUpForm__input--sbtBtn");
    // CHECK IF THE RIGHT ERROR MESSAGE POPS UP
    await page.waitFor("h4")
    const message = await page.$eval(".Alert", e => e.innerHTML)
    expect(message).toEqual("Provide a valid email")
})

test("Testing if invalid email triggers email error message", async () => {
    // FOCUSING ON THE INPUT ELEMENT AND TYPING IN A NAME
    await page.focus("input[name=firstName]")
    await page.keyboard.type("Laith")
    await page.focus("input[name=lastName]")
    await page.keyboard.type("Harb")
    await page.focus("input[name=firstName]")
    await page.keyboard.type("Laith")
    await page.focus("input[name=email]")
    await page.keyboard.type("harblaithgmail.com")
    // SUBMITING THE FORM
    await page.click(".SignUpForm__input--sbtBtn");
    // CHECK IF THE RIGHT ERROR MESSAGE POPS UP
    await page.waitFor("h4")
    const message = await page.$eval(".Alert", e => e.innerHTML)
    expect(message).toEqual("Provide a valid email")
})

test("Submiting email, firstName and lastName fields only triggers password error message", async () => {
    // FOCUSING ON THE INPUT ELEMENT AND TYPING IN A NAME
    await page.focus("input[name=firstName]")
    await page.keyboard.type("Laith")
    await page.focus("input[name=lastName]")
    await page.keyboard.type("Harb")
    await page.focus("input[name=firstName]")
    await page.keyboard.type("Laith")
    await page.focus("input[name=email]")
    await page.keyboard.type("harblaith@gmail.com")
    // SUBMITING THE FORM
    await page.click(".SignUpForm__input--sbtBtn");
    // CHECK IF THE RIGHT ERROR MESSAGE POPS UP
    await page.waitFor("h4")
    const message = await page.$eval(".Alert", e => e.innerHTML)
    expect(message).toEqual("Provide a password that is greater than 6 characters")
})


test("Submiting non-matching password triggers password error message", async () => {
    // FOCUSING ON THE INPUT ELEMENT AND TYPING IN A NAME
    await page.focus("input[name=firstName]")
    await page.keyboard.type("Laith")
    await page.focus("input[name=lastName]")
    await page.keyboard.type("Harb")
    await page.focus("input[name=firstName]")
    await page.keyboard.type("Laith")
    await page.focus("input[name=email]")
    await page.keyboard.type("harblaith@gmail.com")
    await page.focus("input[name=password]")
    await page.keyboard.type("icecream")
    await page.focus("input[name=confirmPassword]")
    await page.keyboard.type("icekream")
    // SUBMITING THE FORM
    await page.click(".SignUpForm__input--sbtBtn");
    // CHECK IF THE RIGHT ERROR MESSAGE POPS UP
    await page.waitFor("h4")
    const message = await page.$eval(".Alert", e => e.innerHTML)
    expect(message).toEqual("The Password does not match")
})


// test("Redirect user to dashboard page upon successful signup", async () => {
//     // FOCUSING ON THE INPUT ELEMENT AND TYPING IN A NAME
//     await page.focus("input[name=firstName]")
//     await page.keyboard.type("Laith")
//     await page.focus("input[name=lastName]")
//     await page.keyboard.type("Harb")
//     await page.focus("input[name=firstName]")
//     await page.keyboard.type("Laith")
//     await page.focus("input[name=email]")
//     await page.keyboard.type("harrbbbbblaith@gmail.com")
//     await page.focus("input[name=password]")
//     await page.keyboard.type("icecream")
//     await page.focus("input[name=confirmPassword]")
//     await page.keyboard.type("icecream")
//     // SUBMITING THE FORM
//     await page.click(".SignUpForm__input--sbtBtn");
//     // CHECK IF THE RIGHT ERROR MESSAGE POPS UP;
//     setTimeout(() => {
//         const url = await page.url();
//         expect(url).toMatch(/dashboard/)
//     }, 2000)
    

// })