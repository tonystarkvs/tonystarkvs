import { test, expect } from '@playwright/test';

const url: string = process.env.TEST_ENV === 'prod' ? '' : '/';
console.log(`Active Environment URL is Working and details are: ${url}`);


test('test cases for Rest Assured Java @Smoke', async ({ page }) => {

    await page.goto(url);
    await expect(page).toHaveTitle("Master Automation Hub");


    await page.getByRole('button', { name: '🌐 Rest Assured Java ▼' }).click();
    await page.getByRole('button', { name: '📄 REST Assured Learning Hub' }).click();
    await page.getByText('Rest Assured Java > REST').click();
    await page.getByRole('button', { name: '📄 REST Assured Session 1:' }).click();
    await page.getByText('Rest Assured Java > REST').click();
    await page.getByRole('button', { name: '📄 REST Assured Complete' }).click();
    await page.getByText('Rest Assured Java > REST').click();
    await page.getByRole('button', { name: '📄 REST Assured: Serialization Concepts (Sessions 11 to 14)' }).click();
    await page.getByTestId('div-top-bar-4').click();
    await page.getByRole('button', { name: '📄 REST Assured: Deserialization Concepts (Sessions 15 to 17)' }).click();
    await page.getByText('Rest Assured Java > REST').click();
    await page.getByRole('button', { name: '📄 REST Assured: Parallel' }).click();
    await page.getByText('Rest Assured Java > REST').click();
    await page.getByRole('button', { name: '📄 REST Assured: Glossary &' }).click();
    await page.getByText('Rest Assured Java > REST').click();
    await page.getByRole('button', { name: '📄 REST Assured: Response Extraction (Sessions 24 to 29)' }).click();
    await page.getByText('Rest Assured Java > REST').click();
    await page.getByRole('button', { name: '📄 REST Assured: Response Extraction Tabs (Sessions 24 to 29)' }).click();
    await page.getByText('Rest Assured Java > REST').click();
    await page.getByText('Rest Assured Java > REST').click();
    await page.getByRole('button', { name: '📄 REST Assured: Response Extraction Technical Details (Sessions 24 to 29)' }).click();
    await page.getByRole('button', { name: '📄 REST Assured: Glossary &' }).click();
});
