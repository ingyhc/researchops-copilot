/**
 * Captures the demo screenshots used for design review.
 *
 *   npm run dev                              # in one terminal
 *   npx playwright@1.55.0 ...                # or: npm i --no-save playwright
 *   node demo/capture-screenshots.mjs        # in another
 *
 * Drives the real app in Chrome, so the captures always match the current build.
 * Output lands in demo/screenshots/.
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const BASE_URL = process.env.DEMO_URL ?? 'http://localhost:5173';
// fileURLToPath, not .pathname — the repo path may contain spaces.
const OUT_DIR = fileURLToPath(new URL('./screenshots/', import.meta.url));

const settle = (page, ms = 700) => page.waitForTimeout(ms);

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  const shot = async (name, options = {}) => {
    await page.screenshot({ path: `${OUT_DIR}${name}.png`, ...options });
    console.log(`  ✓ ${name}.png`);
  };

  console.log(`Capturing ${BASE_URL}`);
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await settle(page, 900);

  await shot('01-project-intake', { fullPage: true });

  // Page 1 → analysis overlay. Caught mid-run so the agent stages are visible.
  await page.getByRole('button', { name: 'Analyze Brief' }).click();
  await settle(page, 2600);
  await shot('02-analysis-running');

  // Page 2 → dashboard.
  await page.getByText('Analysis Complete').waitFor({ timeout: 30_000 });
  await settle(page, 1200);
  await shot('03-tab1-brief-understanding', { fullPage: true });

  await page.getByRole('tab', { name: /Industry Intelligence/ }).click();
  await settle(page, 1600);
  await shot('04-tab2-industry-map', { fullPage: true });

  // Hover state: isolates one node's upstream/downstream relationships.
  const ckd = page.getByRole('button', { name: /CKD Export/ });
  await ckd.scrollIntoViewIfNeeded();
  await ckd.hover();
  await settle(page, 800);
  await shot('05-tab2-node-inspected');

  await page.getByRole('tab', { name: /Knowledge Owners/ }).click();
  await settle(page, 1600);
  await shot('06-tab3-knowledge-owners', { fullPage: true });

  await browser.close();
  console.log(`\nScreenshots written to demo/screenshots/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
