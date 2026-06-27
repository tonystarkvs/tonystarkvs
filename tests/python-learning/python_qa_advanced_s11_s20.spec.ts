import { test, expect } from '@playwright/test';

const url: string = process.env.TEST_ENV === 'prod' ? '' : '/';
console.log(`Active Environment URL is Working and details are: ${url}`);


test('test cases for Python Learning @Smoke', async ({ page }) => {

    await page.goto(url);
    await expect(page).toHaveTitle("Master Automation Hub");



    await page.getByRole('button', { name: '🐍 Python Learning ▼' }).click();
    await page.getByRole('button', { name: '📄 Python for QA Beginners:' }).click();
    await page.getByTestId('div-top-bar-4').click();
    await page.getByRole('button', { name: '📄 Python for QA Advanced:' }).click();
    await page.getByText('Python Learning > Python for').click();
    await page.getByRole('button', { name: '📄 Python QA Hub: Sessions 21 to' }).click();
    await page.getByText('Python Learning > Python QA').click();
    await page.getByRole('button', { name: '📄 Python QA Learning Hub (Condensed Edition)' }).click();
    await page.getByText('Python Learning > Python QA').click();
    await page.getByRole('button', { name: '📄 Python QA Learning Hub (Full Edition)' }).click();
    await page.getByText('Python Learning > Python QA').click();
    
});
