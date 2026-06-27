import { test, expect } from '@playwright/test';

const url: string = process.env.TEST_ENV === 'prod' ? '' : '/';
console.log(`Active Environment URL is Working and details are: ${url}`);


test('test cases for CI/CD Learning @Smoke', async ({ page }) => {

  await page.goto(url);
  await expect(page).toHaveTitle("Master Automation Hub");

  await page.getByRole('button', { name: '⚙️ CI/CD Learning ▼' }).hover();
  await page.getByRole('button', { name: '⚙️ CI/CD Learning ▼' }).click();
  await page.getByRole('button', { name: '📄 Playwright CI/CD: Complete' }).click();
  await page.getByText('CI/CD Learning > Playwright').click();
  await page.locator('iframe[title="Playwright CI/CD: Complete Course V2"]').contentFrame().getByTestId('h2-1').click();
  await page.getByRole('button', { name: '📄 GitHub Actions + Selenium' }).click();
  await page.getByText('CI/CD Learning > GitHub').click();
  await page.locator('iframe[title="GitHub Actions + Selenium Mastery (Sessions 1 to 10)"]').contentFrame().getByTestId('h2-1').click();
  await page.getByRole('button', { name: '📄 GitHub Actions + Playwright TS Mastery (Sessions 1 to 10)' }).click();
  await page.getByText('CI/CD Learning > GitHub').click();
  await page.locator('iframe[title="GitHub Actions + Playwright TS Mastery (Sessions 1 to 10)"]').contentFrame().getByTestId('h2-1').click();
  await page.getByRole('button', { name: '📄 Jenkins + Playwright TS' }).click();
  await page.getByText('CI/CD Learning > Jenkins +').click();
  await page.locator('iframe[title="Jenkins + Playwright TS Mastery (Sessions 1 to 6)"]').contentFrame().getByTestId('h2-1').click();
  await page.getByRole('button', { name: '📄 Jenkins + Selenium Java CI' }).click();
  await page.getByText('CI/CD Learning > Jenkins +').click();
  await page.locator('iframe[title="Jenkins + Selenium Java CI/CD Mastery (Sessions 1 to 6)"]').contentFrame().getByTestId('h2-1').click();
  await page.getByRole('button', { name: '📄 Jenkins + RestAssured CI/' }).click();
  await page.getByText('CI/CD Learning > Jenkins +').click();
  await page.locator('iframe[title="Jenkins + RestAssured CI/CD Mastery (Sessions 1 to 4)"]').contentFrame().getByTestId('h2-1').click();
  
});
