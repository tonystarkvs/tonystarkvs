import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page/homepage';

const url: string = process.env.TEST_ENV === 'prod' ? '' : '/';
console.log(`Active Environment URL is Working and details are: ${url}`);

test("validate heading and sections of BDD_Cucumber_Learning_6_Sessions @Smoke", async ({ page }) => {

    await page.goto(url);
    await expect(page).toHaveTitle("Master Automation Hub");
    const homePage = new HomePage(page);

    await expect(homePage.homePageHeader).toBeVisible();
    await expect(homePage.homePageGreetings).toBeVisible();
    await expect(homePage.homePageHeaderData).toBeVisible();
    await expect(homePage.homePageHeaderText).toBeVisible();
    await expect(homePage.homePageHeaderValues).toBeVisible();
    await expect(homePage.learningPathsCardsTitle).toBeVisible();

    await homePage.homePageHeaderTitle.click();
    await homePage.homePageHeaderTitleText.click();
    await homePage.homePageHeaderSearchInput.click();
    await homePage.homePageHeaderHomeButton.click();

    await expect(await homePage.learningPathsCards).toHaveCount(13);
    await expect(await homePage.learningPathsCards.count()).toBeGreaterThan(0);


});

test('test front Page category cards @Smoke @regression', async ({ page }) => {
    await page.goto('');
    await expect(page).toHaveTitle("Master Automation Hub");
    const homePage = new HomePage(page);

    await homePage.learningPathsCardsTitle.hover();

    const learningPathsCards = await page.locator('.category-grid>.category-card').all();
    console.log("Total Learning Paths Cards: " + learningPathsCards.length);

    for (const crd of learningPathsCards) {
        const cardTitle = await crd.textContent();
        console.log(`Card Title: ${cardTitle}`);
        await expect(crd).toBeVisible();
        await crd.hover();
    }
});

