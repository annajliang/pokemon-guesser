const fs = require('fs');
const puppeteer = require('puppeteer-extra');

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const axios = require('axios');

const URL = 'https://bulbapedia.bulbagarden.net/wiki/Tropius_(Pok%C3%A9mon)';

const getRandomKeyboardEvent = () => {
  const events = [
    'Enter',
    'ShiftLeft',
    'KeyC',
    'Space',
    'KeyR',
    'KeyE',
    'ArrowLeft',
    'ArrowDown',
    'ArrowRight',
  ];
  return events[Math.floor(Math.random() * events.length)];
};

const getRandomLink = (links) => {
  // const filteredLinks = filterLinks(links);
  const randomLink = links[Math.floor(Math.random() * links.length)];
  console.log('full link', randomLink);

  // return randomLink.split('/')[randomLink.split('/').length - 1];
  return randomLink;
};

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
function delay() {
  const num = Math.random() * (4000 - 1000 + 1000) + 1000;
  console.log('secs', num);
  return new Promise(function (resolve) {
    setTimeout(resolve, num);
  });
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  await delay();
  const page = (await browser.pages())[0];

  try {
    await delay();

    page.setDefaultNavigationTimeout(0);

    const numOfPokemon = 905;

    await delay();

    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 0 });

    await delay();

    await page.keyboard.press(getRandomKeyboardEvent());

    for (let i = 1; i <= numOfPokemon; i++) {
      console.log('page has been loaded!');

      await delay();
      await page.keyboard.press(getRandomKeyboardEvent());
      await delay();
      await page.keyboard.press('ArrowDown');
      await delay();
      await page.keyboard.press('ArrowDown');
      await delay();

      const element =
        (await page.waitForSelector('a[href*="Generation"]', {
          waitUntil: 'domcontentloaded',
          timeout: 0,
        })) ||
        (await page.waitForSelector('p a[href*="Generation"]', {
          waitUntil: 'domcontentloaded',
          timeout: 0,
        })); // select the element

      const pokemonGen = await element.evaluate((el) => el.textContent); // grab the textContent from the element, by evaluating this function in the browser context

      console.log('pokemonGen', pokemonGen);

      const romanNumeral = pokemonGen.replace(/^.*?\s/, '');

      await delay();

      await Promise.all([page.click('a.image'), page.waitForNavigation()]);

      await delay();

      await page.keyboard.press(getRandomKeyboardEvent());

      await page.waitForSelector(
        '.fullImageLink a[href*="bulbagarden.net/media/upload"]',
        { waitUntil: 'domcontentloaded', timeout: 0, visible: true }
      );

      await delay();

      await Promise.all([
        page.click('.fullImageLink a[href*="bulbagarden.net/media/upload"]'),
        page.waitForNavigation(),
      ]);

      const is503 = await page.$eval('h1', () => true).catch(() => false);
      console.log('is503', is503);

      while (true) {
        if (is503) {
          await page.reload({
            waitUntil: ['networkidle0', 'domcontentloaded'],
            timeout: 0,
          });
        }

        const h1El = await page.$eval('h1', () => true).catch(() => false);

        if (!h1El) {
          break;
        }
      }

      const imageUrl = await page.$eval('img', (img) => img.src);

      const splitImageUrls = imageUrl.split('/');
      const imageFileName = splitImageUrls[splitImageUrls.length - 1].replace(
        /\D/g,
        ''
      );
      console.log('imageFileName', imageFileName);
      await delay();

      await page.keyboard.press(getRandomKeyboardEvent());

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
                .on('error', (e) => {
                  reject(e);
                });
            })
        );

      await delay();

      await downloadImage(
        imageUrl,
        `./public/pokemon/gen${romanToInt(romanNumeral)}/${imageFileName}.png`
      );

      await delay();

      await page.goBack();

      await page.keyboard.press(getRandomKeyboardEvent());
      await delay();
      await page.keyboard.press('ArrowDown');
      await delay();
      await page.keyboard.press('ArrowUp');
      await delay();
      await page.keyboard.press(getRandomKeyboardEvent());

      await page.waitForSelector(
        'td[style*="45%"] td[style*="left"] a[href*="(Pok%C3%A9mon)"]',
        { waitUntil: 'domcontentloaded', timeout: 0 }
      );

      await delay();

      await Promise.all([
        page.click(
          'td[style*="45%"] td[style*="left"] a[href*="(Pok%C3%A9mon)"]'
        ),
      ]);
    }

    await browser.close();
  } catch (e) {
    console.log('error', e);

    if (e.response.status === 503) {
      const is503 = await page.$eval('h1', () => true).catch(() => false);
      console.log('is503', is503);

      await page.reload({
        waitUntil: ['networkidle0', 'domcontentloaded'],
        timeout: 0,
      });

      console.log('refresh');
    }
  }
})();
