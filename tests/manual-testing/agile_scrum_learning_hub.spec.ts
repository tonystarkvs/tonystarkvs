import { test, expect } from '@playwright/test';

const url: string = process.env.TEST_ENV === 'prod' ? '' : '/';
console.log(`Active Environment URL is Working and details are: ${url}`);

test('test cases for Manual Testing @Smoke', async ({ page }) => {

    await page.goto(url);
    await expect(page).toHaveTitle("Master Automation Hub");




    await page.getByRole('button', { name: '📋 Manual Testing ▼' }).hover();
    await page.getByRole('button', { name: '📋 Manual Testing ▼' }).click();
    await page.getByRole('button', { name: '📄 Agile & Scrum Learning Hub' }).click();
    await page.getByText('Manual Testing > Agile &').click();
    await page.locator('iframe[title="Agile & Scrum Learning Hub"]').contentFrame().getByText('What is Agile? The Mindset').click();
    await page.getByRole('button', { name: '📄 QA Manual Testing Course' }).click();
    await page.getByText('Manual Testing > QA Manual').click();
    await page.locator('iframe[title="QA Manual Testing Course"]').contentFrame().getByText('Overview — What / Why / When').first().click();
    await page.getByRole('button', { name: '📄 QA Manual Testing: Sessions 11 to' }).click();
    await page.getByText('Manual Testing > QA Manual').click();
    await page.locator('iframe[title="QA Manual Testing: Sessions 11 to 20"]').contentFrame().getByText('Manual vs Automation Testing').click();
    await page.getByRole('button', { name: '📄 QA Manual Testing: Sessions 21 to' }).click();
    await page.getByText('Manual Testing > QA Manual').click();
    await page.locator('iframe[title="QA Manual Testing: Sessions 21 to 30"]').contentFrame().getByText('SDLC — Software Development').click();
    await page.getByRole('button', { name: '📄 QA Manual Testing Sessions' }).click();
    await page.getByText('Manual Testing > QA Manual').click();
    await page.getByRole('button', { name: '📄 QA Manual Testing: Sessions 1 to' }).click();
    await page.getByText('Manual Testing > QA Manual').click();
    await page.getByRole('button', { name: '📄 Test Design Techniques:' }).click();
    await page.getByText('Manual Testing > Test Design').click();
    
});
