// const puppeteer = require('puppeteer');

// (async () => {
//   // Launch the browser in headful mode
//   const browser = await puppeteer.launch({args:["--disable-setuid-sandbox","--no-sandbox","--single-process","--no-zygote"], executablePath:"/usr/bin/google-chrome-stable", headless: false });
//   const page = await browser.newPage();

//   // Navigate to a website
//   await page.goto('https://www.github.com');

//   // Wait for a few seconds to see the page
//   await page.waitForNavigation(60000);

//   // Close the browser
//   await browser.close();
// })();


const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/start-browser', async (req, res) => {
  try {
    console.log('Starting browser...');
    
    // Launch Puppeteer and perform actions
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://example.com');
    await page.screenshot({ path: 'screenshot.png' });

    await browser.close();
    res.send('Browser started and actions completed.');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Failed to start browser.');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
