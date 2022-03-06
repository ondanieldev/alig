import path from 'path';
import puppeteer from 'puppeteer';

import IProduct from '../DTOs/IProduct';
import pathsConfig from '../config/paths.config';
import delay from '../helpers/delay';

class PostProduct {
  public async execute(product: IProduct): Promise<void> {
    // open browser
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: {
        width: 320,
        height: 570,
      },
    });

    // open instagram
    const page = await browser.newPage();
    page.setUserAgent(
      'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36',
    );
    await page.goto('https://www.instagram.com');
    await delay(2500);

    // go to login
    await page.waitForXPath("//button[contains(text(),'Log In')]");
    const loginButton = await page.$x("//button[contains(text(),'Log In')]");
    await loginButton[0].click();

    // log into instagram account
    await page.waitForSelector('input[name=username]');
    await page.type('input[name=username]', process.env.IG_USERNAME, {
      delay: 50,
    });
    await page.type('input[name=password]', process.env.IG_PASSWORD, {
      delay: 50,
    });
    await page.click('button[type=submit]');
    await page.waitForNavigation();

    // skip 'save your login info'
    await page.waitForXPath("//button[contains(text(),'Not Now')]");
    const notNowButton = await page.$x("//button[contains(text(),'Not Now')]");
    await notNowButton[0].click();

    // post product - image
    const productImage = path.resolve(pathsConfig.imagesDir, product.image);
    await page.waitForSelector('input[type=file]');
    const fileInputs = await page.$$('input[type="file"]');
    const fileInput = fileInputs[fileInputs.length - 1];
    const futureFileChooser = page.waitForFileChooser();
    await page.click("[aria-label='New Post']");
    const fileChooser = await futureFileChooser;
    await fileChooser.accept([productImage]);
    await delay(2500);
    await fileInput.uploadFile(productImage);
    await delay(2500);

    // post product - caption
    await page.waitForXPath("//button[contains(text(),'Next')]");
    const nextButton = await page.$x("//button[contains(text(),'Next')]");
    await nextButton[0].click();
    await page.waitForSelector("textarea[aria-label='Write a caption…']");
    await page.click("textarea[aria-label='Write a caption…']");
    await page.keyboard.type(product.caption, { delay: 50 });

    // post product - submit
    await page.waitForXPath("//button[contains(text(),'Share')]");
    const shareButton = await page.$x("//button[contains(text(),'Share')]");
    await shareButton[0].click();

    // close browser
    await delay(6000);
    await browser.close();
  }
}

export default PostProduct;
