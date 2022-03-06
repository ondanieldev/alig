import puppeteer from 'puppeteer';

import IRequest from '../DTOs/IRequest';
import IProduct from '../DTOs/IProduct';
import downloadImage from '../helpers/downloadImage';

class GetProductInfo {
  public async execute({ aliexpressProductUrl }: IRequest): Promise<IProduct> {
    // open browser
    const browser = await puppeteer.launch({
      headless: false,
    });

    // open page
    const aliexpress = await browser.newPage();
    await aliexpress.goto(aliexpressProductUrl);

    // get image
    await aliexpress.waitForSelector('img.magnifier-image');
    const imageUrl = await aliexpress.$eval('img.magnifier-image', el => {
      if (el.hasAttribute('src')) {
        return el.getAttribute('src');
      }
      return null;
    });
    if (!imageUrl) {
      await browser.close();
      throw new Error('Cannot get product image');
    }
    const image = await downloadImage(imageUrl);

    // get title
    await aliexpress.waitForSelector('h1.product-title-text');
    const caption = await aliexpress.$eval(
      'h1.product-title-text',
      el => el.innerHTML,
    );

    // close browser
    await browser.close();

    // return info
    return {
      caption,
      image,
    };
  }
}

export default GetProductInfo;
