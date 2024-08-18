const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.connect({
    browserURL: 'http://localhost:9222', // Use the remote debugging port
  });

  const page = await browser.newPage();
  await page.goto('https://example.com');
  // Continue with your existing script to capture selectors or interact with the page
})();
