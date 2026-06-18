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
        title: "QA BDD Selenium 8 Session Course",
        url: "src/sdet-topics/bdd-cucumber/html_20260613_814c7c.html",
      },
    ],
  },

  // ──────────────────────────────────────────────
  // 2. CI/CD LEARNING (1 HTML file)
  // ──────────────────────────────────────────────
  {
    category: "CI/CD Learning",
    icon: "⚙️",
    links: [
      {
        title: "Playwright CI/CD Complete Course V2",
        url: "src/sdet-topics/ci-cd-learning/html_20260613_cd3856.html",
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
        title: "Java Learning Hub S11-S16",
        url: "src/sdet-topics/java-learning/java_learning_hub_s11_s16.html",
      },
      {
        title: "Java Learning Hub",
        url: "src/sdet-topics/java-learning/java_learning_hub.html",
      },
      {
        title: "Java Learning Portal Fixed",
        url: "src/sdet-topics/java-learning/java_learning_portal_fixed.html",
      },
      {
        title: "Java Learning Portal",
        url: "src/sdet-topics/java-learning/java_learning_portal.html",
      },
      {
        title: "Java 8 Lambda Learning Hub",
        url: "src/sdet-topics/java-learning/java8_lambda_learning_hub.html",
      },
      {
        title: "Maven Java POM Learning",
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
        title: "SOLID Principles Java Learning Platform",
        url: "src/sdet-topics/java-learning/solid_principles_java_learning_platform.html",
      },
      {
        title: "Solid Selenium Java Sessions 11-20",
        url: "src/sdet-topics/java-learning/solid_selenium_java_sessions_11_to_20.html",
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
        title: "JMeter Load Testing Course",
        url: "src/sdet-topics/load-testing/jmeter_load_testing_course.html",
      },
      {
        title: "Postman Load Testing Course",
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
        url: "src/sdet-topics/manual-testing/agile_scrum_learning_hub_fixed.html",
      },
      {
        title: "QA Manual Testing Course",
        url: "src/sdet-topics/manual-testing/qa_manual_testing_course_fixed.html",
      },
      {
        title: "QA Manual Testing S11-S20",
        url: "src/sdet-topics/manual-testing/qa_manual_testing_s11_s20_fixed.html",
      },
      {
        title: "QA Manual Testing S21-S30",
        url: "src/sdet-topics/manual-testing/qa_manual_testing_s21_s30_fixed.html",
      },
      {
        title: "QA S31-S35: Severity & Priority",
        url: "src/sdet-topics/manual-testing/qa_s31_s35_severity_priority_fixed.html",
      },
      {
        title: "QA Training Manual Testing S1-S10",
        url: "src/sdet-topics/manual-testing/qa_training_manual_testing_s1_s10_fixed.html",
      },
      {
        title: "Test Design Techniques S10-S20",
        url: "src/sdet-topics/manual-testing/test_design_techniques_s10_s20_fixed.html",
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
        title: "A1: API Mastery 10 Sessions",
        url: "src/sdet-topics/playwright-ts/A1_playwright_api_mastery_10sessions.html",
      },
      {
        title: "A1: Config Mastery 10 Sessions",
        url: "src/sdet-topics/playwright-ts/A1_playwright_config_mastery_10sessions.html",
      },
      {
        title: "A1: QA Mastery Dashboard",
        url: "src/sdet-topics/playwright-ts/A1_playwright_qa_mastery_dashboard.html",
      },
      {
        title: "A2: TS Learning Hub (Part 1)",
        url: "src/sdet-topics/playwright-ts/A2_playwright_ts_learning_hub (1).html",
      },
      {
        title: "A2: TS Learning Hub (Part 2)",
        url: "src/sdet-topics/playwright-ts/A2_playwright_ts_learning_hub (2).html",
      },
      {
        title: "Chitti S19-S21: Skip Env CLI",
        url: "src/sdet-topics/playwright-ts/chitti_s19_s20_s21_skip_env_cli.html",
      },
      {
        title: "Jarvis: Playwright TS Learning Hub",
        url: "src/sdet-topics/playwright-ts/jarvis_playwright_ts_learning_hub.html",
      },
      {
        title: "Jarvis S2: Pages Tabs Windows",
        url: "src/sdet-topics/playwright-ts/jarvis_s2_pages_tabs_windows.html",
      },
      {
        title: "Jarvis S3: Frames Handling",
        url: "src/sdet-topics/playwright-ts/jarvis_s3_frames_handling.html",
      },
      {
        title: "Jarvis S4: Alerts Dialogs",
        url: "src/sdet-topics/playwright-ts/jarvis_s4_alerts_dialogs.html",
      },
      {
        title: "Jarvis S5-S8: Combined",
        url: "src/sdet-topics/playwright-ts/jarvis_s5_s6_s7_s8_combined.html",
      },
      {
        title: "Jarvis S8-S10: Complete",
        url: "src/sdet-topics/playwright-ts/jarvis_s8_s9_s10_complete.html",
      },
      {
        title: "Jarvis S11-S13: Complete",
        url: "src/sdet-topics/playwright-ts/jarvis_s11_s12_s13_complete.html",
      },
      {
        title: "Jarvis S14-S15: Hooks Describe",
        url: "src/sdet-topics/playwright-ts/jarvis_s14_s15_hooks_describe.html",
      },
      {
        title: "Jarvis S16-S18: Cookies Storage Runner",
        url: "src/sdet-topics/playwright-ts/jarvis_s16_s17_s18_cookies_storage_runner.html",
      },
      {
        title: "Jarvis S22-S25: Fixed",
        url: "src/sdet-topics/playwright-ts/jarvis_s22_to_s25_fixed.html",
      },
      {
        title: "Jarvis S26-S28: Data Driven",
        url: "src/sdet-topics/playwright-ts/jarvis_s26_s27_s28_data_driven.html",
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
        title: "Postman Interview Notes",
        url: "src/sdet-topics/postman-learning/postman_interview_notes.html",
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
        title: "Python QA Beginner S1-S10",
        url: "src/sdet-topics/python-learning/python_qa_beginner_s1_s10_fixed.html",
      },
      {
        title: "Python QA Advanced S11-S20",
        url: "src/sdet-topics/python-learning/python_qa_advanced_s11_s20_fixed.html",
      },
      {
        title: "Python S21-S28 Hub",
        url: "src/sdet-topics/python-learning/python_s21_s28_hub_fixed.html",
      },
      {
        title: "Python QA Learning Hub (Condensed)",
        url: "src/sdet-topics/python-learning/python_qa_learning_hub_1_fixed.html",
      },
      {
        title: "Python QA Learning Hub (Full)",
        url: "src/sdet-topics/python-learning/python_qa_learning_hub_fixed.html",
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
        title: "All New REST Assured Learning Hub",
        url: "src/sdet-topics/restAssure-Java/All_New rest_assured_learning_hub.html",
      },
      {
        title: "REST Assured Session 1 Tabs",
        url: "src/sdet-topics/restAssure-Java/rest_assured_session1_tabs.html",
      },
      {
        title: "REST Assured Testing Tutorial",
        url: "src/sdet-topics/restAssure-Java/rest_assured_testng_tutorial.html",
      },
      {
        title: "S01: REST Assured Complete Learning",
        url: "src/sdet-topics/restAssure-Java/S01rest_assured_complete_learning.html",
      },
      {
        title: "S11-S14: Fixed Serialization",
        url: "src/sdet-topics/restAssure-Java/s11_s14_fixed_serialization_.html",
      },
      {
        title: "S15-S17: Deserialization",
        url: "src/sdet-topics/restAssure-Java/s15_s17 deserialization_.html",
      },
      {
        title: "S18-S20: Parallel OAuth2 Schema",
        url: "src/sdet-topics/restAssure-Java/s18_s20_parallel_oauth2_schema.html",
      },
      {
        title: "S21-S23: Glossary Deep Dive",
        url: "src/sdet-topics/restAssure-Java/s21_s23_glossary_deep_dive.html",
      },
      {
        title: "S24-S29: REST Assured Response Extraction",
        url: "src/sdet-topics/restAssure-Java/S24 to S29 REST Assured Response Extraction — S24 to S29.html",
      },
      {
        title: "S24-S29: Fixed Tabs",
        url: "src/sdet-topics/restAssure-Java/s24_s29_fixed_tabs.html",
      },
      {
        title: "S24-S29: Response Extraction",
        url: "src/sdet-topics/restAssure-Java/s24_s29_response_extraction.html",
      },
      {
        title: "S30-S32: Request Creation",
        url: "src/sdet-topics/restAssure-Java/s30_s32_request_creation.html",
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
        title: "Best 1: Selenium Mastery Framework",
        url: "src/sdet-topics/selenium-java/Best_1_Best_selenium_mastery_framework.html",
      },
      {
        title: "Best 2: Selenium4 Advanced Sessions S11+",
        url: "src/sdet-topics/selenium-java/Best_2_selenium4_advanced_sessions_s11_s23.html",
      },
      {
        title: "Best 3: Selenium Mastery S1-S23 Full",
        url: "src/sdet-topics/selenium-java/Best_3_selenium_mastery_s1_s23_full.html",
      },
      {
        title: "Best 4: Selenium Code Fix",
        url: "src/sdet-topics/selenium-java/Best_4_selenium_code_fix.html",
      },
      {
        title: "Selenium Java Basics Course",
        url: "src/sdet-topics/selenium-java/selenium_java_basics_course.html",
      },
      {
        title: "S1-S6: Selenium Java Colorful Hub",
        url: "src/sdet-topics/selenium-java/selenium_java_colorful_hub.html",
      },
      {
        title: "S1-S6: Selenium Java Learning Hub",
        url: "src/sdet-topics/selenium-java/selenium_java_learning_hub.html",
      },
      {
        title: "S7-S11: Fundamentals",
        url: "src/sdet-topics/selenium-java/selenium_java_s7_s11_hub.html",
      },
      {
        title: "S12-S16: Windows & Nav",
        url: "src/sdet-topics/selenium-java/selenium_java_s12_s16.html",
      },
      {
        title: "S17-S19: Cookies & Broken Links",
        url: "src/sdet-topics/selenium-java/selenium_s17_s19_cookies_brokenlinks.html",
      },
      {
        title: "S20-S22: Popups & File Upload",
        url: "src/sdet-topics/selenium-java/selenium_s20_s22_popups_fileupload.html",
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
        title: "TestNG Framework Hub S9-S17",
        url: "src/sdet-topics/testNg-learning/testng_framework_hub_s9_s17.html",
      },
      {
        title: "TestNG Learning Hub",
        url: "src/sdet-topics/testNg-learning/testng_learning_hub.html",
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
        title: "TypeScript Learning Hub",
        url: "src/sdet-topics/typescript-learning/typescript_learning_hub.html",
      },
      {
        title: "typescript_sessions",
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
