const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const {
  getRandomKeyboardEvent,
  getIntFromRoman,
  delay,
  saveImage,
  handle503Error,
  goToNextPokemonPage,
  getImagePath,
  getRomanNumeral,
  extractHrefFromOuterHTML,
} = require('./lib/scraper');

puppeteer.use(StealthPlugin());

const numOfPokemon = 1010;
const startingUrl =
  'https://bulbapedia.bulbagarden.net/wiki/Chi-Yu_(Pok%C3%A9mon)';

async function scrapePokemonImages() {
  try {
    const browser = await puppeteer.launch({
      headless: false,
    });

    const page = (await browser.pages())[0];

    page.setDefaultNavigationTimeout(20000);

    await page.goto(startingUrl, {
      waitUntil: 'domcontentloaded',
    });

    for (let i = 1; i <= numOfPokemon; i++) {
      console.log('page has been loaded!');

      const genEl =
        (await page.waitForSelector('a[href*="Generation"]')) ||
        (await page.waitForSelector('p a[href*="Generation"]'));

      // grab the textContent from the element, by evaluating this function in the browser context
      const generation = await genEl.evaluate((el) => el.textContent);

      await delay();

      const imageLinkSelector = 'td[colspan="4"] a[href*="/wiki/File:"].image';
      const options = {
        visible: true,
      };

      await page.waitForSelector(imageLinkSelector, options);

      const imageLinkEl = await page.evaluate(() => {
        const el = document.querySelector(
          'td[colspan="4"] a[href*="/wiki/File:"].image'
        );
        return el ? el.outerHTML : null;
      });

      const imageLink = extractHrefFromOuterHTML(imageLinkEl);

      await page.goto(`https://bulbapedia.bulbagarden.net${imageLink}`, {
        waitUntil: 'domcontentloaded',
      });

      await delay();

      await page.waitForSelector(
        '.fullImageLink a[href*="bulbagarden.net/media/upload"]',
        { visible: true }
      );

      await delay();

      await page.click(
        '.fullImageLink a[href*="bulbagarden.net/media/upload"]'
      );

      await handle503Error(page);

      const imageUrl = await page.$eval('img', (img) => img.src);

      await delay();

      await page.keyboard.press(getRandomKeyboardEvent());

      await delay();

      await saveImage(
        imageUrl,
        getImagePath(imageUrl, getIntFromRoman(getRomanNumeral(generation)))
      );

      await delay();

      await page.goBack();

      await delay();

      page.goBack();

      await page.keyboard.press(getRandomKeyboardEvent());

      await goToNextPokemonPage(page, delay);
    }

    await browser.close();
  } catch (e) {
    console.log('error', e);

    if (e.response.status === 503) {
      const is503 = await page.$eval('h1', () => true).catch(() => false);
      console.log('is503', is503);

      await page.reload({
        waitUntil: 'domcontentloaded',
      });
    }
  }
}

scrapePokemonImages();
