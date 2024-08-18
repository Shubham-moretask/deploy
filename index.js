const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser in headful mode
  const browser = await puppeteer.launch({args:["--disable-setuid-sandbox","--no-sandbox","--single-process","--no-zygote"], executablePath:"/usr/bin/google-chrome-stable", headless: false });
  const page = await browser.newPage();

  // Navigate to a website
  await page.goto('https://www.github.com');

  // Wait for a few seconds to see the page
  await page.waitForNavigation(60000);

  // Close the browser
  await browser.close();
})();
