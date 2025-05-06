// scrape.js
const puppeteer = require('puppeteer');

async function getEuroPrice() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.eghtesadnews.com/markets/euro', { waitUntil: 'networkidle2' });

  const euroPrice = await page.evaluate(() => {
    const rows = document.querySelectorAll('table tbody tr');
    if (rows.length >= 3) {
      const priceCell = rows[2].querySelector('td');
      if (priceCell && priceCell.innerText.match(/[0-9,]+/)) {
        return priceCell.innerText.trim();
      }
    }
    return null;
  });

  await browser.close();
  return euroPrice;
}

// Export it so index.js can import it
module.exports = { getEuroPrice };
