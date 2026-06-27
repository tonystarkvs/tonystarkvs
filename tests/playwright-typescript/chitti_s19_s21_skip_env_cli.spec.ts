import { test, expect } from '@playwright/test';

const url: string = process.env.TEST_ENV === 'prod' ? '' : '/';
console.log(`Active Environment URL is Working and details are: ${url}`);


test('test cases for Playwright TypeScript @Smoke', async ({ page }) => {

    await page.goto(url);
    await expect(page).toHaveTitle("Master Automation Hub");

    await page.getByRole('button', { name: '🎭 Playwright TypeScript ▼' }).click();
    await page.getByRole('button', { name: '📄 Playwright API Mastery: 10' }).click();
    await page.getByText('Playwright TypeScript >').click();
    await page.getByRole('button', { name: '📄 Playwright Config Mastery' }).click();
    await page.getByText('Playwright TypeScript >').click();
    await page.getByRole('button', { name: '📄 Playwright QA Mastery' }).click();
    await page.getByText('Playwright TypeScript >').click();
    await page.getByRole('button', { name: '📄 Playwright TypeScript Learning Hub: Part 1' }).click();
    await page.getByText('Playwright TypeScript >').click();
    await page.getByRole('button', { name: '📄 Playwright TypeScript Learning Hub: Part 2' }).click();
    await page.getByText('Playwright TypeScript >').click();
    await page.getByRole('button', { name: '📄 Chitti Sessions 19 to 21:' }).click();
    await page.getByText('Playwright TypeScript >').click();
    await page.getByRole('button', { name: '📄 Jarvis: Playwright' }).click();
    await page.getByRole('button', { name: '📄 Jarvis Session 2: Pages,' }).click();
    await page.getByRole('button', { name: '📄 Jarvis Session 3: Frames' }).click();
    await page.getByText('Playwright TypeScript >').click();
    await page.getByRole('button', { name: '📄 Jarvis Session 4: Alerts,' }).click();
    await page.getByText('Playwright TypeScript >').click();
    await page.getByRole('button', { name: '📄 Jarvis Sessions 5 to 8:' }).click();
    await page.getByText('Playwright TypeScript >').click();
    await page.getByRole('button', { name: '📄 Jarvis Sessions 8 to 10:' }).click();
    await page.getByText('Playwright TypeScript >').click();
    await page.getByRole('button', { name: '📄 Jarvis Sessions 11 to 13:' }).click();
    await page.getByText('Playwright TypeScript >').click();
    await page.getByRole('button', { name: '📄 Jarvis Sessions 14 & 15:' }).click();
    await page.getByText('Playwright TypeScript >').click();
    await page.getByRole('button', { name: '📄 Jarvis Sessions 16 to 18:' }).click();
    await page.getByText('Playwright TypeScript >').click();
    await page.getByRole('button', { name: '📄 Jarvis Sessions 22 to 25:' }).click();
    await page.getByText('Playwright TypeScript >').click();
    await page.getByRole('button', { name: '📄 Jarvis Sessions 26 to 28:' }).click();
    await page.getByText('Playwright TypeScript >').click();
    
});
