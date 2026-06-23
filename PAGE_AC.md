# Learning Portal Page Acceptance Criteria (AC)

This document lists the user-facing functional, visual, and design requirements for all topic learning pages in a sequential checklist format. All new pages and updates must satisfy these criteria.

> [!IMPORTANT]
> - If there are any doubts or ambiguities regarding how an Acceptance Criterion (AC) should look, feel, or behave, **always refer to the ideal reference page template**:
>   [selenium_s17_s19_cookies_broken_links.html](file:///c:/Users/viksingh44/Pictures/my-learning-portal/src/sdet-topics/selenium-java/selenium_s17_s19_cookies_broken_links.html).
> - **AGENT EXECUTION RULES**:
>   1. **NO LOCALHOST RUNS**: Do not run local servers or open localhost at the start, during, or end of execution under any circumstances.
>   2. **ALWAYS FOLLOW AC'S FIRST**: Prioritize satisfying all ACs before declaring a task complete.
>   3. **ONE-TIME PERMISSION REQUEST**: Request all required file/command permissions in a single prompt at startup. Do not continuously block or prompt throughout execution.
>   4. **ALL-IN-ONE FIX**: Deliver all requested refactoring and bug fixes in a single turn without intermediate approval loops.

For developer-specific implementation details, see [PAGE_STRUCTURE.md](file:///c:/Users/viksingh44/Pictures/my-learning-portal/PAGE_STRUCTURE.md).

---

### **AC 1: Switching Topics (Session Tabs & Progress Indicators)**
* **Detail 1**: Only one session topic is visible on the screen at any time.
* **Detail 2**: Clicking a session tab button at the top must hide the current session and show the selected one.
* **Detail 3**: Topics must never stack on top of each other or load simultaneously.
* **Detail 4**: The session switching tabs must be fully clickable and functional. Clicking a tab must instantly activate and display its corresponding session topic.
* **Detail 5**: Below the session tabs, a visual progress dot row and session counter text must display:
  * Dots representing completed/previous sessions must be colored **green**.
  * The dot representing the active/current session must be colored **purple/blue**.
  * Dots representing remaining/future sessions must be colored **light gray / white**.
* **Detail 6**: The active session tab button itself must be colored **purple/blue** with white text, and inactive tab buttons must have a light gray/white background with dark text.
* **Detail 7**: Every lesson topic section inside the page must be mapped to its corresponding session tab button in the navigation bar at the top.

### **AC 2: Searching the Content (Search Highlights)**
* **Detail 1**: Typing inside the top search bar must instantly highlight all matching text on the active page in yellow.
* **Detail 2**: If the match is inside a closed question, it must automatically open the question to reveal the highlighted text.
* **Detail 3**: If the match is inside an inactive code tab, it must automatically select that tab to show the highlighted code.
* **Detail 4**: If the match is in a hidden topic section, it must switch to that section and scroll the highlighted match smoothly to the center of the screen.

### **AC 3: Expanding Questions and Answers (Accordions)**
* **Detail 1**: Questions and answers must behave like expandable dropdown boxes, with questions styled in **dark red** and answers styled in **dark blue**.
* **Detail 2**: Clicking a question must reveal its answer.
* **Detail 3**: Clicking the question again must collapse and hide the answer.
* **Detail 4**: The dropdown arrow next to the question must rotate dynamically when the answer is expanded.
* **Detail 5**: The dropdown accordion toggle action must be fully functional and interactive.

### **AC 4: Code Examples & Filename Copying**
* **Detail 1**: Code examples must be framed inside a mock editor window with a top title bar showing exit/minimize window buttons.
* **Detail 2**: Tabs containing filenames must let users click to switch between different code files.
* **Detail 3**: Each file panel must display a copy button. Clicking it must copy only the active file's code to the clipboard.
* **Detail 4**: Code blocks must feature vibrant, colorful syntax highlighting (e.g., distinct colors for keywords, strings, classes, and numbers). In configuration and key-value files (such as YAML, JSON, or properties files), key names must be displayed in a different color from value names.
* **Detail 5**: Code blocks must be responsive, allowing users to scroll horizontally for long lines of code without stretching or breaking the page layout.
* **Detail 6**: Code must contain clear, descriptive inline comments explaining the logic step-by-step.
* **Detail 7**: Line numbers must be displayed on the left of each code block for clean layout references.
* **Detail 8**: The code file tabs must be fully clickable and functional. Clicking a code tab must instantly switch the active panel to show that file's code.
* **Detail 9**: All practical code examples must be showcased in separate tabs inside the mock editor, each presenting fully copyable code snippets with a dedicated copy button.

### **AC 5: Visual Card Separation and Colored Borders**
* **Detail 1**: Every single section, session panel, card, and block must be outlined with a **thick, colored border visible at all times** on all four sides so they are easily differentiated.
* **Detail 2**: Information cards, error callouts, and tip boxes must be enclosed in borders matching their theme colors.
* **Detail 3**: Section titles must feature a colored vertical bar on their left side.
* **Detail 4**: Headings nested inside cards, code sections, or accordion items must have no left-side border.
* **Detail 5**: Sections, boxes, and cards must use matching background and text colors according to their visual theme:
  * **Purple/Indigo Theme**: Soft light purple background with dark purple-blue text.
  * **Blue Theme**: Soft light blue background with dark blue text.
  * **Orange/Amber Theme**: Soft light cream/amber background with dark brown-orange text.

### **AC 6: Smooth Lift Transitions (Micro-Animations)**
* **Detail 1**: Hovering over cards, blocks, or panels must make them lift upwards slightly with a soft drop shadow.
* **Detail 2**: Hovering over navigation tabs, file tabs, or buttons must cause them to rise slightly.

### **AC 7: Readability & Visual Helpers**
* **Detail 1**: Regular text must use a modern sans-serif font, and code snippets must use a clean monospaced font.
* **Detail 2**: Code tabs must display tiny color-coded labels specifying the file type (like `.java`, `.py`, or `.json`).
* **Detail 3**: Complex diagrams or flowcharts must be scrollable horizontally to prevent breaking layouts on mobile screens.
* **Detail 4**: In all text paragraphs, lists, and glossaries (excluding the code blocks), all technical keywords, method calls, tool names, and syntax terms (such as Java, Selenium, Playwright, Python, TypeScript, and CI/CD commands) must be displayed in a **bold, colorful inline highlight style**.
* **Detail 5**: All text elements across all pages and sections must maintain maximum contrast against their background colors to ensure clean legibility and reading comfort (e.g. no light text on light backgrounds).

### **AC 8: Page Titles & Breadcrumbs**
* **Detail 1**: The page must have a descriptive document title.
* **Detail 2**: The main portal's breadcrumb bar must update to display the correct path based on this title when the page is loaded.

### **AC 9: Full Screen Responsiveness (All Platforms)**
* **Detail 1**: Every page, section, text content, table, block, and diagram must be fully responsive.
* **Detail 2**: Layouts must dynamically adapt to fit all viewport sizes, including mobile phones, tablets, laptops, desktop monitors, and TV screens.
* **Detail 3**: Text must never overflow. Any image must be styled in a colorful, premium manner (with a `2.5px solid var(--pc, #6C5CE7)` border, `border-radius: 6px`, subtle box shadow, and centered horizontally) and auto-scale to fit within its block, and horizontal scrolling must only activate on code snippets and wide diagrams to prevent horizontal site scrolling on mobile.

### **AC 10: Standard Lesson Page Sections**
* **Detail 1**: Every lesson topic section must include an **Overview Banner** at the top summarizing the session's concepts.
* **Detail 2**: Every lesson topic section must include a **What / Why / When / Where / How** analysis table block to map out core usage.
* **Detail 3**: Every lesson topic section must include a **Keyword Glossary** defining technical terms and phrases.
* **Detail 4**: Every lesson topic section must include a series of **Interview One-Liners** summarizing quick reference facts.
* **Detail 5**: Every lesson topic section must include a **Visual Lifecycle Flow Diagram** showing execution steps. These diagrams (under "Concepts - Flow Visuals" sections) must be presented in a colorful manner (cycling through HSL-tailored background colors `ns1` to `ns5` / `n1` to `n5` with matching high-contrast text and border colors) and be fully responsive for all platforms, stacking vertically in a single-column layout on mobile viewports without regression or layout breaks.
* **Detail 6**: Every lesson topic section must include a **Mock Code Editor** showcasing practical, copyable code examples.
* **Detail 7**: Every lesson topic section must include a **Best Practices Checklist** with checkmark list items.
* **Detail 8**: Every lesson topic section must end with an **Interview Prep Q&A** accordion list of expanding dropdown questions.
* **Detail 9**: If a page has extra sections or flows with valid educational/technical details, do not delete them. Instead, preserve them by refactoring or merging the content into the 8 standard layout components (e.g., adding tabs in the Mock Code Editor, items in the Q&A accordion, keywords in the Glossary, etc.). Only delete redundant, duplicated, or completely irrelevant placeholder/out-of-scope content.


### **AC 11: User Interaction Feedback & Visual Helpers**
* **Detail 1**: Clicking the "Copy" button on a code snippet must instantly change the button label to "Copied!" for a few seconds to confirm the clipboard action.
* **Detail 2**: If the user dynamically reveals new content (such as expanding dropdowns or changing tabs), all code formatting, highlights, and line numbers must adjust instantly without requiring a page refresh.
* **Detail 3**: Visual icons (like checkmarks, warning flags, or bullets) must load and display correctly next to lists, tips, and steps.
* **Detail 4**: Lifecycle flow diagrams must show steps in sequence connected by clear arrow guides to represent the correct execution order.
* **Detail 5**: There must be no double vertical scrollbars, ensuring the user can scroll down the entire module contents using a single vertical scroll gesture.
