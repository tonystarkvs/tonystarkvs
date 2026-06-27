import { test, expect } from '@playwright/test';

const url: string = process.env.TEST_ENV === 'prod' ? '' : '/';
console.log(`Active Environment URL is Working and details are: ${url}`);


test('test cases for Postman Learning @Smoke', async ({ page }) => {

    await page.goto(url);
    await expect(page).toHaveTitle("Master Automation Hub");

    
    await page.getByRole('button', { name: '📮 Postman Learning ▼' }).click();
    await page.getByRole('button', { name: '📄 Postman: Technical' }).click();
    await page.getByRole('button', { name: '📄 Postman API Testing' }).click();
    await page.getByText('Postman Learning > Postman').click();
    
});
