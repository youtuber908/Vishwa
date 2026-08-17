import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  await page.waitForLoadState('networkidle');
  const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  console.log('Theme:', theme);
  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
})();