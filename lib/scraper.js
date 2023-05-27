const fs = require('fs');
const axios = require('axios');

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

// https://stackoverflow.com/questions/49659711/roman-to-integer-in-js-why-it-only-convert-the-first-character
const values = new Map([
  ['I', 1],
  ['V', 5],
  ['X', 10],
  /*....*/
]);

const getIntFromRoman = (string) => {
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
};

// https://stackoverflow.com/questions/46919013/puppeteer-wait-n-seconds-before-continuing-to-the-next-line
const delay = () => {
  const num = Math.random() * (4000 - 1000 + 1000) + 1000;
  console.log('secs', num);
  return new Promise(function (resolve) {
    setTimeout(resolve, num);
  });
};

// https://stackoverflow.com/questions/12740659/downloading-images-with-node-js
const saveImage = async (url, imagePath) => {
  try {
    const response = await axios({
      url,
      responseType: 'stream',
    });

    await new Promise((resolve, reject) => {
      response.data
        .pipe(fs.createWriteStream(imagePath))
        .on('finish', () => resolve())
        .on('error', (e) => {
          reject(e);
        });
    });
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error('Error saving image:', error);
    throw error;
  }
};

async function handle503Error(page) {
  const is503 = await page.$eval('h1', () => true).catch(() => false);
  console.log('is503', is503);

  while (true) {
    if (is503) {
      await page.reload({
        waitUntil: ['networkidle0', 'domcontentloaded'],
      });
    }

    const h1El = await page.$eval('h1', () => true).catch(() => false);

    if (!h1El) {
      break;
    }
  }
}

async function goToNextPokemonPage(page) {
  const selector =
    'table[style*="width: 100%"] td[style*="45%"] td[style*="left"] a[href*="(Pok%C3%A9mon)"';

  await page.waitForSelector(selector);

  await page.click(selector);
}

const getImagePath = (imageUrl, genNum) => {
  const splitImageUrls = imageUrl.split('/');
  const imageFileName = splitImageUrls[splitImageUrls.length - 1].replace(
    /\D/g,
    ''
  );
  const imageFileNameWithoutLeadingZero = parseInt(
    imageFileName,
    10
  ).toString();

  return `./public/pokemon/gen${genNum}/${imageFileNameWithoutLeadingZero}.png`;
};

const getRomanNumeral = (pokemonGen) => {
  return pokemonGen.replace(/^.*?\s/, '');
};

const extractHrefFromOuterHTML = (outerHTML) => {
  const hrefRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/;
  const match = outerHTML.match(hrefRegex);

  if (match) {
    const href = match[2];
    return href;
  }

  return null;
};
module.exports = {
  getRandomKeyboardEvent,
  getIntFromRoman,
  delay,
  saveImage,
  handle503Error,
  goToNextPokemonPage,
  getImagePath,
  getRomanNumeral,
  extractHrefFromOuterHTML,
};
