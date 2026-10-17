import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function capture() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const sites = [
    {
      url: 'https://garba-eve2k26-bwpe.vercel.app/',
      output: path.join(__dirname, '../public/projects/garba.png'),
      name: 'Garba Event',
    },
    {
      url: 'https://mmil.club',
      output: path.join(__dirname, '../public/projects/mmil.png'),
      name: 'MMIL Club',
    },
  ];

  for (const site of sites) {
    console.log(`Navigating to ${site.url}...`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

    try {
      await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 30000 });
      // Wait extra 3 seconds for animations/fonts to settle
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Capture above the fold (1440x900)
      await page.screenshot({
        path: site.output,
        clip: { x: 0, y: 0, width: 1440, height: 900 },
      });
      console.log(`Saved screenshot for ${site.name} to ${site.output}`);
    } catch (err) {
      console.error(`Error capturing ${site.name}:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('Done capturing screenshots!');
}

capture().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
