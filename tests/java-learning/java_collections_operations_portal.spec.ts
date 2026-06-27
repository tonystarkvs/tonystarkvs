import { test, expect } from '@playwright/test';

const url: string = process.env.TEST_ENV === 'prod' ? '' : '/';
console.log(`Active Environment URL is Working and details are: ${url}`);

test('test cases for Java Learning @Smoke', async ({ page }) => {

  await page.goto(url);
  await expect(page).toHaveTitle("Master Automation Hub");

  
  await page.getByRole('button', { name: '☕ Java Learning ▼' }).click();
  await page.getByRole('button', { name: '📄 Java Collections Operations Portal' }).click();
  await page.getByText('Java Learning > Java').click();
  await page.locator('iframe[title="Java Collections Operations Portal"]').contentFrame().getByTestId('h3-1').click();
  await page.getByRole('button', { name: '📄 Java Collections Portal' }).click();
  await page.getByText('Java Learning > Java').click();
  await page.locator('iframe[title="Java Collections Portal"]').contentFrame().getByTestId('h3-1').click();
  await page.getByRole('button', { name: '📄 Java Learning Hub:' }).click();
  await page.getByText('Java Learning > Java Learning').click();
  await page.locator('iframe[title="Java Learning Hub: Sessions 11 to 16"]').contentFrame().getByRole('heading', { name: 'Session 11: List vs Set vs Map' }).click();
  await page.getByRole('button', { name: '📄 Java Learning Hub', exact: true }).click();
  await page.getByText('Java Learning > Java Learning').click();
  await page.locator('iframe[title="Java Learning Hub"]').contentFrame().getByRole('heading', { name: 'Java Learning Hub' }).click();
  await page.getByRole('button', { name: '📄 Java Learning Portal (' }).click();
  await page.getByText('Java Learning > Java Learning').click();
  await page.locator('iframe[title="Java Learning Portal (Fixed)"]').contentFrame().getByTestId('h3-1').click();
  await page.getByRole('button', { name: '📄 Java Learning Portal', exact: true }).click();
  await page.getByText('Java Learning > Java Learning').click();
  await page.locator('iframe[title="Java Learning Portal"]').contentFrame().getByTestId('h3-1').click();
  await page.getByRole('button', { name: '📄 Java 8 Lambdas Learning Hub' }).click();
  await page.getByText('Java Learning > Java 8').click();
  await page.locator('iframe[title="Java 8 Lambdas Learning Hub"]').contentFrame().getByRole('heading', { name: 'Session 1 — What is a Lambda' }).click();
  await page.getByRole('button', { name: '📄 Maven Java POM Project' }).click();
  await page.getByText('Java Learning > Maven Java').click();
  await page.locator('iframe[title="Maven Java POM Project Learning"]').contentFrame().getByTestId('div-sec-title-14').click();
  await page.getByRole('button', { name: '📄 Maven Java SDET Course' }).click();
  await page.getByText('Java Learning > Maven Java').click();
  await page.locator('iframe[title="Maven Java SDET Course"]').contentFrame().getByText('What is Maven?').click();
  await page.getByRole('button', { name: '📄 SOLID Selenium Java:' }).click();
  await page.getByText('Java Learning > SOLID').click();
  await page.getByRole('button', { name: '📄 Selenium Java: ThreadLocal' }).click();
  await page.getByText('Java Learning > Selenium Java').click();
  
});
