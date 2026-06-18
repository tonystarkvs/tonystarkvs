# Master Automation Hub 🚀

A clean, static-site learning portal for Selenium, Playwright, Rest Assured, Python, Java, TestNG, and more.

## 📁 Folder Structure

```
my-learning-portal/
├── index.html                      ← Main entry page
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
│       ├── playwright-ts/          ← Playwright lesson HTML files
│       ├── postman-learning/       ← Postman interview notes
│       ├── python-learning/        ← Python lesson files
│       ├── restAssure-Java/        ← REST Assured lesson files
│       ├── selenium-java/          ← Selenium lesson HTML files
│       ├── testNg-learning/        ← TestNG framework lessons
│       ├── typescript-learning/    ← TypeScript lesson files
│       └── sql-learning/           ← SQL lessons (coming soon)
│
├── flow-diagram/                   ← Architecture diagrams
└── README.md                       ← This file
```

## ➕ How to Add a New Module

1. Create your `.html` file inside the correct folder under `src/sdet-topics/` (e.g., `src/sdet-topics/selenium-java/my_new_lesson.html`)
2. Open `src/js/config.js`
3. Add your entry to the `links` array inside the matching category, making sure the URL starts with `src/sdet-topics/`
4. Push to GitHub — done!

## 🌐 Deployed on GitHub Pages

Visit: `https://vikrantps.github.io/my-learning-portal/`