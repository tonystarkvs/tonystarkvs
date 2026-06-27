# Master Automation Hub 🚀

A clean, static-site learning portal for Selenium, Playwright, Rest Assured, Python, Java, TestNG, and more.

## 📁 Folder Structure

```
my-learning-portal/
├── index.html                      ← Main entry page
├── PAGE_AC.md                      ← Page Acceptance Criteria (plain English checklist)
├── PAGE_STRUCTURE.md               ← Developer-facing Technical Specifications
├── command_instructions.txt        ← Agent constraints & commands instructions
├── src/
│   ├── css/style.css               ← All styles
│   ├── js/config.js                ← Course data (edit this to add modules)
│   ├── js/app.js                   ← Menu builder + iframe loader logic
│   └── sdet-topics/                ← All learning topics
│       ├── bdd-cucumber/           ← BDD Cucumber lesson files
│       ├── ci-cd-learning/         ← CI/CD pipeline lesson files
│       ├── java-learning/          ← Core Java lesson files
│       ├── load-testing/           ← JMeter & Postman load testing
│       ├── manual-testing/         ← Manual QA testing lessons
│       ├── playwright-typescript/  ← Playwright lesson HTML files
│       ├── postman-learning/       ← Postman interview notes
│       ├── python-learning/        ← Python lesson files
│       ├── rest-assured-java/      ← REST Assured lesson files
│       ├── selenium-java/          ← Selenium lesson HTML files
│       ├── testng-learning/        ← TestNG framework lessons
│       ├── typescript-learning/    ← TypeScript lesson files
│       └── sql-learning/           ← SQL lessons (coming soon)
│
├── flow-diagram/                   ← Architecture diagrams
└── README.md                       ← This file
```

## 📋 Page Guidelines & Standards

All learning pages inside `src/sdet-topics/` must strictly follow the visual, functional, and structural standards defined in this repository:

1. **Acceptance Criteria (Plain English)**: Refer to [PAGE_AC.md](file:///c:/Users/viksingh44/Pictures/my-learning-portal/PAGE_AC.md) for the functional checklist (tabs, search highlights, accordions, border themes, etc.).
2. **Technical Specifications**: Refer to [PAGE_STRUCTURE.md](file:///c:/Users/viksingh44/Pictures/my-learning-portal/PAGE_STRUCTURE.md) for the specific classes, CSS styling rules, script controller routines, and Prism code observer details.
3. **Ideal Reference Template**: When in doubt about styling, behavior, or responsiveness, always refer to the master template page:  
   [selenium_s17_s19_cookies_broken_links.html](file:///c:/Users/viksingh44/Pictures/my-learning-portal/src/sdet-topics/selenium-java/selenium_s17_s19_cookies_broken_links.html)

---

## ➕ How to Add a New Module

1. Create your `.html` file inside the correct folder under `src/sdet-topics/` (e.g., `src/sdet-topics/selenium-java/my_new_lesson.html`)
2. Make sure it adheres to all specifications in [PAGE_AC.md](file:///c:/Users/viksingh44/Pictures/my-learning-portal/PAGE_AC.md) and [PAGE_STRUCTURE.md](file:///c:/Users/viksingh44/Pictures/my-learning-portal/PAGE_STRUCTURE.md).
3. Open `src/js/config.js`
4. Add your entry to the `links` array inside the matching category, making sure the URL starts with `src/sdet-topics/`
5. Push to GitHub — done!

## 🌐 Deployed on GitHub Pages

Visit: `https://vikrantps.github.io/my-learning-portal/`

npx cross-env TEST_ENV=qa npx playwright test --project=chromium --reporter=html
npx cross-env TEST_ENV=prod playwright test --project=chromium --reporter=html