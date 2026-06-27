import { test, expect } from '@playwright/test';

const url: string = process.env.TEST_ENV === 'prod' ? '' : '/';
console.log(`Active Environment URL is Working and details are: ${url}`);


test('test cases for Load Testing @Smoke', async ({ page }) => {

  await page.goto(url);
  await expect(page).toHaveTitle("Master Automation Hub");

  
  
  await page.getByRole('button', { name: '⚡ Load Testing ▼' }).click();
  await page.getByRole('button', { name: '📄 Apache JMeter: Load' }).click();
  await page.getByText('Load Testing > Apache JMeter').click();
  await page.getByRole('button', { name: '📄 Postman: Load Testing' }).click();
  await page.getByText('Load Testing > Postman: Load').click();
  
});
