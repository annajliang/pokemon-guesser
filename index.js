const fs = require('fs');
const puppeteer = require('puppeteer');
const axios = require('axios');

// https://stackoverflow.com/questions/49659711/roman-to-integer-in-js-why-it-only-convert-the-first-character
const values = new Map([
  ['I', 1],
  ['V', 5],
  ['X', 10],
  /*....*/
]);

function romanToInt(string) {
  let result = 0,
    current,
    previous = 0;
  for (const char of string.split('').reverse()) {
    current = values.get(char);
    if (current >= previous) {
      result += current;
    } else {
      result -= current;
    }
    previous = current;
  }
  return result;
}

// https://stackoverflow.com/questions/46919013/puppeteer-wait-n-seconds-before-continuing-to-the-next-line
function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

(async () => {
  try {
    // Initialize Puppeteer
    const browser = await puppeteer.launch({ headless: false });
    const page = (await browser.pages())[0];
    // const page = await browser.newPage();

    const numOfPokemon = 905;

    await page.goto(
      'https://bulbapedia.bulbagarden.net/wiki/Weedle_(Pok%C3%A9mon)',
      { waitUntil: 'load', timeout: 0 }
    );

    for (let i = 1; i <= numOfPokemon; i++) {
      console.log('page has been loaded!');

      await delay(2000);

      await page.waitForSelector('a.image');

      const element = await page.waitForSelector('a[href*="Generation"'); // select the element
      const pokemonGen = await element.evaluate((el) => el.textContent); // grab the textContent from the element, by evaluating this function in the browser context

      const romanNumeral = pokemonGen.replace(/^.*?\s/, '');

      console.log('romanNumerals', romanToInt(romanNumeral));

      await delay(2000);

      await page.click('a.image');

      await delay(2000);

      await page.waitForSelector(
        '.fullImageLink a[href*="bulbagarden.net/media/upload"]'
      );

      await delay(2000);

      await page.click(
        '.fullImageLink a[href*="bulbagarden.net/media/upload"]'
      );

      await delay(2000);

      const imageUrl = await page.$eval('img', (img) => img.src);
      const splitImageUrls = imageUrl.split('/');
      const imageFileName = splitImageUrls[splitImageUrls.length - 1].replace(
        /\D/g,
        ''
      );
      console.log('imageFileName', imageFileName);
      await delay(2000);

      // https://stackoverflow.com/questions/12740659/downloading-images-with-node-js
      const downloadImage = (url, imagePath) =>
        axios({
          url,
          responseType: 'stream',
        }).then(
          (response) =>
            new Promise((resolve, reject) => {
              response.data
                .pipe(fs.createWriteStream(imagePath))
                .on('finish', () => resolve())
                .on('error', (e) => reject(e));
            })
        );

      await delay(2000);

      await downloadImage(
        imageUrl,
        `./public/pokemon/gen${romanToInt(romanNumeral)}/${imageFileName}.png`
      );

      await delay(2000);

      await page.goBack();

      await delay(2000);

      await page.goBack();

      await page.waitForSelector(
        'td[style*="45%"] td[style*="left"] a[href*="(Pok%C3%A9mon)"]'
      );

      await delay(2000);

      await page.click(
        'td[style*="45%"] td[style*="left"] a[href*="(Pok%C3%A9mon)"]',
        { waitUntil: 'load', timeout: 0 }
      );
    }

    await browser.close();
  } catch (error) {
    console.log(error);
  }
})();
