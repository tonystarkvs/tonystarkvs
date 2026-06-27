import { test, expect } from '@playwright/test';

const url: string = process.env.TEST_ENV === 'prod' ? '' : '/';
console.log(`Active Environment URL is Working and details are: ${url}`);

test('test cases for BDD Cucumber front Page category cards @Smoke12 @regression', async ({ page }) => {

  await page.goto(url);
  await expect(page).toHaveTitle("Master Automation Hub");


  await page.getByRole('button', { name: '🥒 BDD Cucumber ▼' }).click();
  await page.getByRole('button', { name: '🥒 BDD Cucumber ▼' }).click();
  await page.getByRole('button', { name: '📄 Selenium BDD Cucumber: 8' }).click();
  await page.locator('iframe[title="Selenium BDD Cucumber: 8 Sessions Course"]').contentFrame().getByTestId('h1-1').click();
  await page.locator('iframe[title="Selenium BDD Cucumber: 8 Sessions Course"]').contentFrame().getByTestId('p-1').click();
  await page.getByRole('button', { name: '📄 BDD with Cucumber +' }).click();
  await page.getByText('BDD Cucumber > BDD with').click();
  await page.getByRole('button', { name: '📄 BDD with Playwright TS +' }).click();
  await page.getByText('BDD Cucumber > BDD with').click();
  await page.locator('iframe[title="BDD with Playwright TS + Cucumber — 6 Session Learning"]').contentFrame().getByTestId('h2-1').click();
  await page.getByRole('button', { name: '📄 BDD with Selenium Java +' }).click();
  await page.getByText('BDD Cucumber > BDD with').click();
  await page.locator('iframe[title="BDD with Selenium Java + Cucumber — 5 Session Learning"]').contentFrame().getByTestId('h2-1').click();
  await page.getByRole('button', { name: '🥒 BDD Cucumber ▼' }).click();

});


