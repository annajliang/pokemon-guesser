const fs = require('fs');
const puppeteer = require('puppeteer-extra');

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const axios = require('axios');

const URL = 'https://bulbapedia.bulbagarden.net/wiki/Camerupt_(Pok%C3%A9mon)';

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
  // try {
  //   // Initialize Puppeteer
  //   const browser = await puppeteer.launch({
  //     headless: false,
  //   });
  //   await delay();
  //   const page = (await browser.pages())[0];
  //   // const page = await browser.newPage();

  //   await delay();

  //   page.setDefaultNavigationTimeout(0);

  //   const numOfPokemon = 905;

  //   await delay();

  //   await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 0 });

  //   await delay();

  //   await page.keyboard.press(getRandomKeyboardEvent());

  //   for (let i = 1; i <= numOfPokemon; i++) {
  //     console.log('page has been loaded!');

  //     await delay();

  //     // await page.waitForSelector('a.image', {
  //     //   waitUntil: 'domcontentloaded',
  //     //   timeout: 0,
  //     //   visible: true,
  //     // });

  //     await page.keyboard.press(getRandomKeyboardEvent());
  //     await delay();
  //     await page.keyboard.press('ArrowDown');
  //     await delay();
  //     await page.keyboard.press('ArrowDown');

  //     // await Promise.all([page.click('a'), page.waitForNavigation()]);

  //     await delay();

  //     // await page.goBack();

  //     await page.keyboard.press(getRandomKeyboardEvent());
  //     await delay();
  //     await page.keyboard.press('Tab');
  //     await delay();
  //     await page.keyboard.press('ArrowUp');

  //     await delay();

  //     await page.waitForSelector('body', {
  //       waitUntil: 'domcontentloaded',
  //       timeout: 0,
  //     });

  //     const hrefs = await page.$$eval('a', (as) => as.map((a) => a.href));

  //     const randomLink = getRandomLink(hrefs);

  //     console.log('randomLink', randomLink);

  //     console.log('1');

  //     await page.goto(randomLink, {
  //       waitUntil: 'domcontentloaded',
  //       timeout: 0,
  //     });

  //     await page.keyboard.press(getRandomKeyboardEvent());
  //     await delay();
  //     await page.keyboard.press('Tab');

  //     console.log('2');

  //     await delay();

  //     await page.goBack();

  //     await delay();

  //     await page.keyboard.press(getRandomKeyboardEvent());

  //     const element = await page.waitForSelector('a[href*="Generation"]', {
  //       waitUntil: 'domcontentloaded',
  //       timeout: 0,
  //     }); // select the element

  //     const pokemonGen = await element.evaluate((el) => el.textContent); // grab the textContent from the element, by evaluating this function in the browser context

  //     const romanNumeral = pokemonGen.replace(/^.*?\s/, '');

  //     await delay();

  //     await Promise.all([page.click('a.image'), page.waitForNavigation()]);

  //     await delay();

  //     await page.keyboard.press(getRandomKeyboardEvent());

  //     await page.waitForSelector(
  //       '.fullImageLink a[href*="bulbagarden.net/media/upload"]',
  //       { waitUntil: 'domcontentloaded', timeout: 0, visible: true }
  //     );

  //     await delay();

  //     await Promise.all([
  //       page.click('.fullImageLink a[href*="bulbagarden.net/media/upload"]'),
  //       page.waitForNavigation(),
  //     ]);

  //     //  let is503 = (await page.$eval('h1', (el) => el.textContent)) || '';
  //     const is503 = await page.$eval('h1', () => true).catch(() => false);
  //     console.log('is503', is503);

  //     if (is503) {
  //       await page.reload({
  //         waitUntil: ['networkidle0', 'domcontentloaded'],
  //         timeout: 0,
  //       });
  //     }

  //     const imageUrl = await page.$eval('img', (img) => img.src);

  //     // const otherSiteLink = getRandomLink(otherSites);

  //     // await page.goto(otherSiteLink, {
  //     //   waitUntil: 'domcontentloaded',
  //     //   timeout: 0,
  //     // });

  //     // await delay();
  //     // await delay();
  //     // await page.goBack();

  //     const splitImageUrls = imageUrl.split('/');
  //     const imageFileName = splitImageUrls[splitImageUrls.length - 1].replace(
  //       /\D/g,
  //       ''
  //     );
  //     console.log('imageFileName', imageFileName);
  //     await delay();

  //     await page.keyboard.press(getRandomKeyboardEvent());

  //     // https://stackoverflow.com/questions/12740659/downloading-images-with-node-js
  //     const downloadImage = (url, imagePath) =>
  //       axios({
  //         url,
  //         responseType: 'stream',
  //       }).then(
  //         (response) =>
  //           new Promise((resolve, reject) => {
  //             response.data
  //               .pipe(fs.createWriteStream(imagePath))
  //               .on('finish', () => resolve())
  //               .on('error', (e) => reject(e));
  //           })
  //       );

  //     await delay();

  //     await downloadImage(
  //       imageUrl,
  //       `./public/pokemon/gen${romanToInt(romanNumeral)}/${imageFileName}.png`
  //     );

  //     await delay();

  //     await page.goBack();

  //     await page.keyboard.press(getRandomKeyboardEvent());
  //     await delay();
  //     await page.keyboard.press('ArrowDown');
  //     await delay();
  //     await page.keyboard.press('ArrowUp');

  //     await delay();

  //     await page.goBack();

  //     await page.waitForSelector('body', {
  //       waitUntil: 'domcontentloaded',
  //       timeout: 0,
  //     });

  //     const secondHrefs = await page.$$eval('a', (as) => as.map((a) => a.href));

  //     const secondRandomLink = getRandomLink(secondHrefs);

  //     await page.goto(secondRandomLink, {
  //       waitUntil: 'domcontentloaded',
  //       timeout: 0,
  //     });

  //     await page.keyboard.press(getRandomKeyboardEvent());
  //     await delay();
  //     await page.keyboard.press('Tab');

  //     await delay();

  //     await page.goBack();

  //     await page.keyboard.press(getRandomKeyboardEvent());
  //     await delay();
  //     await page.keyboard.press('ArrowDown');
  //     await delay();
  //     await page.keyboard.press('ArrowUp');
  //     await delay();
  //     await page.keyboard.press(getRandomKeyboardEvent());

  //     await page.waitForSelector(
  //       'td[style*="45%"] td[style*="left"] a[href*="(Pok%C3%A9mon)"]',
  //       { waitUntil: 'domcontentloaded', timeout: 0 }
  //     );

  //     await delay();

  //     await Promise.all([
  //       page.click(
  //         'td[style*="45%"] td[style*="left"] a[href*="(Pok%C3%A9mon)"]'
  //       ),
  //       // page.waitForNavigation(),
  //     ]);
  //   }

  //   await browser.close();
  // } catch (error) {
  //   console.log('catch', error);
  //   const page = (await browser.pages())[0];
  //   const is503 = await page.$eval('h1', () => true).catch(() => false);
  //   console.log('is503', is503);

  //   if (is503) {
  //     await page.reload({
  //       waitUntil: ['networkidle0', 'domcontentloaded'],
  //       timeout: 0,
  //     });
  //   }
  // }

  // Initialize Puppeteer
  const browser = await puppeteer.launch({
    headless: false,
  });
  await delay();
  const page = (await browser.pages())[0];
  // const page = await browser.newPage();

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

    // await page.waitForSelector('a.image', {
    //   waitUntil: 'domcontentloaded',
    //   timeout: 0,
    //   visible: true,
    // });

    await page.keyboard.press(getRandomKeyboardEvent());
    await delay();
    await page.keyboard.press('ArrowDown');
    await delay();
    await page.keyboard.press('ArrowDown');

    // await Promise.all([page.click('a'), page.waitForNavigation()]);

    await delay();

    // await page.goBack();

    await page.keyboard.press(getRandomKeyboardEvent());
    await delay();
    await page.keyboard.press('Tab');
    await delay();
    await page.keyboard.press('ArrowUp');

    await delay();

    await page.waitForSelector('body', {
      waitUntil: 'domcontentloaded',
      timeout: 0,
    });

    const hrefs = await page.$$eval('a', (as) => as.map((a) => a.href));

    const randomLink = getRandomLink(hrefs);

    console.log('randomLink', randomLink);

    console.log('1');

    await page.goto(randomLink, {
      waitUntil: 'domcontentloaded',
      timeout: 0,
    });

    await page.keyboard.press(getRandomKeyboardEvent());
    await delay();
    await page.keyboard.press('Tab');

    console.log('2');

    await delay();

    await page.goBack();

    await delay();

    await page.keyboard.press(getRandomKeyboardEvent());

    // const element = await page.waitForSelector('p a[href*="Generation"]', {
    //   waitUntil: 'domcontentloaded',
    //   timeout: 0,
    // }); // select the element

    const element =
      (await page.waitForSelector('a[href*="Generation"]', {
        waitUntil: 'domcontentloaded',
        timeout: 0,
      })) ||
      (await page.waitForSelector('p a[href*="Generation"]', {
        waitUntil: 'domcontentloaded',
        timeout: 0,
      })); // select the element

    console.log('element', element);

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

    //  let is503 = (await page.$eval('h1', (el) => el.textContent)) || '';
    const is503 = await page.$eval('h1', () => true).catch(() => false);
    console.log('is503', is503);

    while (true) {
      if (is503) {
        await page.reload({
          waitUntil: ['networkidle0', 'domcontentloaded'],
          timeout: 0,
        });
        console.log('a');
      }

      const test = await page.$eval('h1', () => true).catch(() => false);

      if (!test) {
        console.log('c');
        break;
      }
    }

    // if (is503) {
    //   await page.reload({
    //     waitUntil: ['networkidle0', 'domcontentloaded'],
    //     timeout: 0,
    //   });
    // }

    const imageUrl = await page.$eval('img', (img) => img.src);

    // const otherSiteLink = getRandomLink(otherSites);

    // await page.goto(otherSiteLink, {
    //   waitUntil: 'domcontentloaded',
    //   timeout: 0,
    // });

    // await delay();
    // await delay();
    // await page.goBack();

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
      }).then((response) =>
        new Promise((resolve, reject) => {
          response.data
            .pipe(fs.createWriteStream(imagePath))
            .on('finish', () => resolve())
            .on('error', (e) => {
              reject(e);
            });
        }).catch((e) => {
          console.log(e);
          const retry = async () => {
            await page.reload({
              waitUntil: ['networkidle0', 'domcontentloaded'],
              timeout: 0,
            });
          };

          retry();
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

    await page.goBack();

    await page.waitForSelector('body', {
      waitUntil: 'domcontentloaded',
      timeout: 0,
    });

    const secondHrefs = await page.$$eval('a', (as) => as.map((a) => a.href));

    const secondRandomLink = getRandomLink(secondHrefs);

    await page.goto(secondRandomLink, {
      waitUntil: 'domcontentloaded',
      timeout: 0,
    });

    await page.keyboard.press(getRandomKeyboardEvent());
    await delay();
    await page.keyboard.press('Tab');

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
      // page.waitForNavigation(),
    ]);
  }

  await browser.close();
})();
