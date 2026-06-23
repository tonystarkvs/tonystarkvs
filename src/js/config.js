/**
 *  COURSE DATA CONFIG
 * ============================================================
 *  To add a new module:
 *    1. Create your .html file inside the correct folder
 *       (e.g., selenium-java/my_new_lesson.html)
 *    2. Add a new object to the "links" array below
 *    3. Save — the sidebar updates automatically!
 *
 *  To add a whole new category:
 *    1. Create a new folder (e.g., cypress-js/)
 *    2. Add a new object to this array with category, icon, links
 * ============================================================
 */
const courseData = [
  // ──────────────────────────────────────────────
  // 1. BDD CUCUMBER (1 HTML file)
  // ──────────────────────────────────────────────
  {
    category: "BDD Cucumber",
    icon: "🥒",
    links: [
      {
        title: "Selenium BDD Cucumber: 8 Sessions Course",
        url: "src/sdet-topics/bdd-cucumber/selenium_bdd_cucumber_8_sessions.html",
      },
      {
        title: "BDD with Cucumber + Gherkin — 6 Session Learning",
        url: "src/sdet-topics/bdd-cucumber/BDD_Cucumber_Learning_6_Sessions.html",
      },
      {
        title: "BDD with Playwright TS + Cucumber — 6 Session Learning",
        url: "src/sdet-topics/bdd-cucumber/BDD_Playwright_TS_Learning_6_Sessions.html",
      },
      {
        title: "BDD with Selenium Java + Cucumber — 5 Session Learning",
        url: "src/sdet-topics/bdd-cucumber/BDD_Selenium_Java_Learning_5_Sessions.html",
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 2. CI/CD LEARNING (6 HTML files)
  // ──────────────────────────────────────────────
  {
    category: "CI/CD Learning",
    icon: "⚙️",
    links: [
      {
        title: "Playwright CI/CD: Complete Course V2",
        url: "src/sdet-topics/ci-cd-learning/playwright_cicd_complete_course_v2.html",
      },
      {
        title: "GitHub Actions + Selenium Mastery (Sessions 1 to 10)",
        url: "src/sdet-topics/ci-cd-learning/GitHub_Actions_Selenium_Mastery.html",
      },
      {
        title: "GitHub Actions + Playwright TS Mastery (Sessions 1 to 10)",
        url: "src/sdet-topics/ci-cd-learning/GitHub_Actions_Playwright_TS_Mastery.html",
      },
      {
        title: "Jenkins + Playwright TS Mastery (Sessions 1 to 6)",
        url: "src/sdet-topics/ci-cd-learning/Jenkins_Playwright_TS_CICD_6_Sessions.html",
      },
      {
        title: "Jenkins + Selenium Java CI/CD Mastery (Sessions 1 to 6)",
        url: "src/sdet-topics/ci-cd-learning/Jenkins_Selenium_Java_CICD_6_Sessions.html",
      },
      {
        title: "Jenkins + RestAssured CI/CD Mastery (Sessions 1 to 4)",
        url: "src/sdet-topics/ci-cd-learning/Jenkins_RestAssured_CICD_4_Sessions.html",
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 3. JAVA LEARNING (12 HTML files)
  // ──────────────────────────────────────────────
  {
    category: "Java Learning",
    icon: "☕",
    links: [
      {
        title: "Java Collections Operations Portal",
        url: "src/sdet-topics/java-learning/java_collections_operations_portal.html",
      },
      {
        title: "Java Collections Portal",
        url: "src/sdet-topics/java-learning/java_collections_portal.html",
      },
      {
        title: "Java Learning Hub: Sessions 11 to 16",
        url: "src/sdet-topics/java-learning/java_learning_hub_s11_s16.html",
      },
      {
        title: "Java Learning Hub",
        url: "src/sdet-topics/java-learning/java_learning_hub.html",
      },
      {
        title: "Java Learning Portal (Fixed)",
        url: "src/sdet-topics/java-learning/java_learning_portal_fixed.html",
      },
      {
        title: "Java Learning Portal",
        url: "src/sdet-topics/java-learning/java_learning_portal.html",
      },
      {
        title: "Java 8 Lambdas Learning Hub",
        url: "src/sdet-topics/java-learning/java8_lambda_learning_hub.html",
      },
      {
        title: "Maven Java POM Project Learning",
        url: "src/sdet-topics/java-learning/maven_java_pom_learning.html",
      },
      {
        title: "Maven Java SDET Course",
        url: "src/sdet-topics/java-learning/maven_java_sdet_course.html",
      },
      {
        title: "OOP Learning Hub",
        url: "src/sdet-topics/java-learning/oop_learning_hub.html",
      },
      {
        title: "SOLID Principles in Java Learning Platform",
        url: "src/sdet-topics/java-learning/solid_principles_java_learning_platform.html",
      },
      {
        title: "SOLID Selenium Java: Sessions 11 to 20",
        url: "src/sdet-topics/java-learning/solid_selenium_java_sessions_11_20.html",
      },
      {
        title: "Selenium Java: ThreadLocal Mastery (Sessions 1 to 5)",
        url: "src/sdet-topics/java-learning/threadlocal_selenium.html",
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 4. LOAD TESTING (2 HTML files)
  // ──────────────────────────────────────────────
  {
    category: "Load Testing",
    icon: "⚡",
    links: [
      {
        title: "Apache JMeter: Load Testing Course",
        url: "src/sdet-topics/load-testing/jmeter_load_testing_course.html",
      },
      {
        title: "Postman: Load Testing Course",
        url: "src/sdet-topics/load-testing/postman_load_testing_course.html",
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 5. MANUAL TESTING (7 HTML files)
  // ──────────────────────────────────────────────
  {
    category: "Manual Testing",
    icon: "📋",
    links: [
      {
        title: "Agile & Scrum Learning Hub",
        url: "src/sdet-topics/manual-testing/agile_scrum_learning_hub.html",
      },
      {
        title: "QA Manual Testing Course",
        url: "src/sdet-topics/manual-testing/qa_manual_testing_course.html",
      },
      {
        title: "QA Manual Testing: Sessions 11 to 20",
        url: "src/sdet-topics/manual-testing/qa_manual_testing_s11_s20.html",
      },
      {
        title: "QA Manual Testing: Sessions 21 to 30",
        url: "src/sdet-topics/manual-testing/qa_manual_testing_s21_s30.html",
      },
      {
        title: "QA Manual Testing Sessions 31 to 35: Severity & Priority",
        url: "src/sdet-topics/manual-testing/qa_s31_s35_severity_priority.html",
      },
      {
        title: "QA Manual Testing: Sessions 1 to 10",
        url: "src/sdet-topics/manual-testing/qa_training_manual_testing_s1_s10.html",
      },
      {
        title: "Test Design Techniques: Sessions 10 to 20",
        url: "src/sdet-topics/manual-testing/test_design_techniques_s10_s20.html",
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 6. PLAYWRIGHT TYPESCRIPT (17 HTML files)
  // ──────────────────────────────────────────────
  {
    category: "Playwright TypeScript",
    icon: "🎭",
    links: [
      {
        title: "Playwright API Mastery: 10 Sessions Course",
        url: "src/sdet-topics/playwright-typescript/playwright_api_mastery_10_sessions.html",
      },
      {
        title: "Playwright Config Mastery: 10 Sessions Course",
        url: "src/sdet-topics/playwright-typescript/playwright_config_mastery_10_sessions.html",
      },
      {
        title: "Playwright QA Mastery Dashboard",
        url: "src/sdet-topics/playwright-typescript/playwright_qa_mastery_dashboard.html",
      },
      {
        title: "Playwright TypeScript Learning Hub: Part 1",
        url: "src/sdet-topics/playwright-typescript/playwright_typescript_learning_hub_part1.html",
      },
      {
        title: "Playwright TypeScript Learning Hub: Part 2",
        url: "src/sdet-topics/playwright-typescript/playwright_typescript_learning_hub_part2.html",
      },
      {
        title: "Chitti Sessions 19 to 21: Skip, Environment & CLI Options",
        url: "src/sdet-topics/playwright-typescript/chitti_s19_s21_skip_env_cli.html",
      },
      {
        title: "Jarvis: Playwright TypeScript Learning Hub",
        url: "src/sdet-topics/playwright-typescript/jarvis_playwright_typescript_learning_hub.html",
      },
      {
        title: "Jarvis Session 2: Pages, Tabs & Windows Handling",
        url: "src/sdet-topics/playwright-typescript/jarvis_s2_pages_tabs_windows.html",
      },
      {
        title: "Jarvis Session 3: Frames & Iframes Handling",
        url: "src/sdet-topics/playwright-typescript/jarvis_s3_frames_handling.html",
      },
      {
        title: "Jarvis Session 4: Alerts, Dialogs & Popups Handling",
        url: "src/sdet-topics/playwright-typescript/jarvis_s4_alerts_dialogs.html",
      },
      {
        title: "Jarvis Sessions 5 to 8: Combined Topics",
        url: "src/sdet-topics/playwright-typescript/jarvis_s5_s8_combined.html",
      },
      {
        title: "Jarvis Sessions 8 to 10: Complete Topics",
        url: "src/sdet-topics/playwright-typescript/jarvis_s8_s10_complete.html",
      },
      {
        title: "Jarvis Sessions 11 to 13: Complete Topics",
        url: "src/sdet-topics/playwright-typescript/jarvis_s11_s13_complete.html",
      },
      {
        title: "Jarvis Sessions 14 & 15: Hooks & Describe Blocks",
        url: "src/sdet-topics/playwright-typescript/jarvis_s14_s15_hooks_describe.html",
      },
      {
        title: "Jarvis Sessions 16 to 18: Cookies, Storage State & Test Runner",
        url: "src/sdet-topics/playwright-typescript/jarvis_s16_s18_cookies_storage_runner.html",
      },
      {
        title: "Jarvis Sessions 22 to 25: Advanced Concepts",
        url: "src/sdet-topics/playwright-typescript/jarvis_s22_s25.html",
      },
      {
        title: "Jarvis Sessions 26 to 28: Data Driven Testing",
        url: "src/sdet-topics/playwright-typescript/jarvis_s26_s28_data_driven.html",
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 7. POSTMAN LEARNING (1 HTML file)
  // ──────────────────────────────────────────────
  {
    category: "Postman Learning",
    icon: "📮",
    links: [
      {
        title: "Postman: Technical Interview Questions & Notes",
        url: "src/sdet-topics/postman-learning/postman_interview_notes.html",
      },
      {
        title: "Postman API Testing Mastery (Sessions 1 to 10)",
        url: "src/sdet-topics/postman-learning/Postman_API_Testing_Mastery.html",
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 8. PYTHON LEARNING (5 HTML files)
  // ──────────────────────────────────────────────
  {
    category: "Python Learning",
    icon: "🐍",
    links: [
      {
        title: "Python for QA Beginners: Sessions 1 to 10",
        url: "src/sdet-topics/python-learning/python_qa_beginner_s1_s10.html",
      },
      {
        title: "Python for QA Advanced: Sessions 11 to 20",
        url: "src/sdet-topics/python-learning/python_qa_advanced_s11_s20.html",
      },
      {
        title: "Python QA Hub: Sessions 21 to 28",
        url: "src/sdet-topics/python-learning/python_s21_s28_hub.html",
      },
      {
        title: "Python QA Learning Hub (Condensed Edition)",
        url: "src/sdet-topics/python-learning/python_qa_learning_hub_condensed.html",
      },
      {
        title: "Python QA Learning Hub (Full Edition)",
        url: "src/sdet-topics/python-learning/python_qa_learning_hub_full.html",
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 9. REST ASSURED JAVA (12 HTML files)
  // ──────────────────────────────────────────────
  {
    category: "Rest Assured Java",
    icon: "🌐",
    links: [
      {
        title: "REST Assured Learning Hub",
        url: "src/sdet-topics/rest-assured-java/rest_assured_learning_hub.html",
      },
      {
        title: "REST Assured Session 1: Basic Setup & Tabs",
        url: "src/sdet-topics/rest-assured-java/rest_assured_session1_tabs.html",
      },
      {
        title: "REST Assured: Integration with TestNG Tutorial",
        url: "src/sdet-topics/rest-assured-java/rest_assured_testng_tutorial.html",
      },
      {
        title: "REST Assured Complete Learning: Session 1",
        url: "src/sdet-topics/rest-assured-java/rest_assured_complete_learning.html",
      },
      {
        title: "REST Assured: Serialization Concepts (Sessions 11 to 14)",
        url: "src/sdet-topics/rest-assured-java/rest_assured_serialization_s11_s14.html",
      },
      {
        title: "REST Assured: Deserialization Concepts (Sessions 15 to 17)",
        url: "src/sdet-topics/rest-assured-java/rest_assured_deserialization_s15_s17.html",
      },
      {
        title: "REST Assured: Parallel Runs, OAuth2 & Schema Validation (Sessions 18 to 20)",
        url: "src/sdet-topics/rest-assured-java/rest_assured_parallel_oauth2_schema_s18_s20.html",
      },
      {
        title: "REST Assured: Glossary & Terminology Deep Dive (Sessions 21 to 23)",
        url: "src/sdet-topics/rest-assured-java/rest_assured_glossary_deep_dive_s21_s23.html",
      },
      {
        title: "REST Assured: Response Extraction (Sessions 24 to 29)",
        url: "src/sdet-topics/rest-assured-java/rest_assured_response_extraction_s24_s29.html",
      },
      {
        title: "REST Assured: Response Extraction Tabs (Sessions 24 to 29)",
        url: "src/sdet-topics/rest-assured-java/rest_assured_response_extraction_tabs_s24_s29.html",
      },
      {
        title: "REST Assured: Response Extraction Technical Details (Sessions 24 to 29)",
        url: "src/sdet-topics/rest-assured-java/rest_assured_response_extraction_details_s24_s29.html",
      },
      {
        title: "REST Assured: Dynamic Request Creation (Sessions 30 to 32)",
        url: "src/sdet-topics/rest-assured-java/rest_assured_request_creation_s30_s32.html",
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 10. SELENIUM JAVA (11 HTML files)
  // ──────────────────────────────────────────────
  {
    category: "Selenium Java",
    icon: "🚀",
    links: [
      {
        title: "Selenium Java Mastery: Hybrid Test Automation Framework",
        url: "src/sdet-topics/selenium-java/selenium_mastery_framework.html",
      },
      {
        title: "Selenium 4 Advanced Concepts: Sessions 11 to 23",
        url: "src/sdet-topics/selenium-java/selenium4_advanced_sessions_s11_s23.html",
      },
      {
        title: "Selenium Java Complete Course: Sessions 1 to 23",
        url: "src/sdet-topics/selenium-java/selenium_mastery_s1_s23_full.html",
      },
      {
        title: "Selenium Java Framework: Code Fixes & Optimizations",
        url: "src/sdet-topics/selenium-java/selenium_code_fix.html",
      },
      {
        title: "Selenium Java: Core Basics Course",
        url: "src/sdet-topics/selenium-java/selenium_java_basics_course.html",
      },
      {
        title: "Selenium Java Learning Hub: Basic Topics",
        url: "src/sdet-topics/selenium-java/selenium_java_colorful_hub.html",
      },
      {
        title: "Selenium Java: Complete Learning Hub",
        url: "src/sdet-topics/selenium-java/selenium_java_learning_hub.html",
      },
      {
        title: "Selenium Java: Fundamentals & Wait Strategies (Sessions 7 to 11)",
        url: "src/sdet-topics/selenium-java/selenium_java_s7_s11.html",
      },
      {
        title: "Selenium Java: Multiple Windows & Navigation (Sessions 12 to 16)",
        url: "src/sdet-topics/selenium-java/selenium_java_s12_s16.html",
      },
      {
        title: "Selenium Java: Cookies & Broken Link Identification (Sessions 17 to 19)",
        url: "src/sdet-topics/selenium-java/selenium_s17_s19_cookies_broken_links.html",
      },
      {
        title: "Selenium Java: Alerts, Popups & File Upload Handling (Sessions 20 to 22)",
        url: "src/sdet-topics/selenium-java/selenium_s20_s22_popups_file_upload.html",
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 11. TESTNG LEARNING (2 HTML files)
  // ──────────────────────────────────────────────
  {
    category: "TestNG Learning",
    icon: "🧪",
    links: [
      {
        title: "TestNG Framework Hub: Sessions 9 to 17",
        url: "src/sdet-topics/testng-learning/testng_framework_hub_s9_s17.html",
      },
      {
        title: "TestNG: Standard Learning Hub",
        url: "src/sdet-topics/testng-learning/testng_learning_hub.html",
      },
      {
        title: "TestNG + Selenium Java Mastery (Sessions 1 to 15)",
        url: "src/sdet-topics/testng-learning/TestNG_Selenium_Mastery.html",
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 12. TYPESCRIPT LEARNING (1 HTML file)
  // ──────────────────────────────────────────────
  {
    category: "TypeScript Learning",
    icon: "📘",
    links: [
      {
        title: "TypeScript Core Concepts Learning Hub",
        url: "src/sdet-topics/typescript-learning/typescript_learning_hub.html",
      },
      {
        title: "TypeScript Practical Programming Sessions",
        url: "src/sdet-topics/typescript-learning/typescript_sessions.html",
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 13. SQL LEARNING (Coming Soon — add HTML files here)
  // ──────────────────────────────────────────────
  {
    category: "SQL Learning (Coming Soon)",
    icon: "🗄️",
    links: [],
  },
];
