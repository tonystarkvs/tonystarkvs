import { Locator, Page } from "@playwright/test";



export class HomePage {
    readonly page: Page;
    readonly homePageHeader: Locator;
    readonly homePageGreetings: Locator;
    readonly homePageHeaderText: Locator;
    readonly homePageHeaderData: Locator;
    readonly homePageHeaderValues: Locator;
    readonly learningPathsCardsTitle: Locator;
    readonly learningPathsCards: Locator;
    readonly homePageHeaderTitle: Locator;
    readonly homePageHeaderTitleText: Locator;
    readonly homePageHeaderSearchInput: Locator;
    readonly homePageHeaderHomeButton: Locator;



    constructor(page: Page) {
        this.page = page;
        this.homePageHeader = page.locator('#moduleTitle');
        this.homePageGreetings = page.getByText('Antigravity Learning Environment');
        this.homePageHeaderText = page.locator('h2.hero-title');
        this.homePageHeaderData = page.getByText('Welcome to your central hub for Automation Engineering and Software Development learning. Track your progress, search lessons, and resume where you left off.');
        this.homePageHeaderValues = page.getByText('🔍 Quick Navigation & Search');
        this.learningPathsCards = page.locator('.category-grid>.category-card');
        this.learningPathsCardsTitle = page.locator('//div[contains(text(), "Quick Navigation & Search")]');

        this.homePageHeaderTitle = page.getByTestId('h1-1');
        this.homePageHeaderTitleText = page.getByTestId('p-1');
        this.homePageHeaderSearchInput = page.getByTestId('input-globalSearchInput');
        this.homePageHeaderHomeButton = page.getByTestId('button-homeBtn');

    }

    // async homePageTitle(): Promise<string | null> {
    //     return await this.page.title();
    // }


    async learningPathsCardsCount(): Promise<number> {
        return await this.learningPathsCards.count();
    }

    async learningPathsCardsText(): Promise<string[]> {
        const cardsText: string[] = [];
        for (const card of await this.learningPathsCards.all()) {
            const text = await card.textContent();
            cardsText.push(text);
        }
        return cardsText;
    }

}