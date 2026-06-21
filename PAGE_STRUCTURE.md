# Learning Portal Page Structure Guidelines

All topic learning pages inside `src/sdet-topics/` must adhere to a standardized layout structure and CSS rule set. 

**Reference Template:** [selenium_s17_s19_cookies_broken_links.html](file:///c:/Users/Vikra/my-learning-portal-Step-by-step/src/sdet-topics/selenium-java/selenium_s17_s19_cookies_broken_links.html)

---

## 1. Page & Layout Structure

- **Section Tab Navigator**: Session panels are selected using custom tabs.
- **Section Layout**: Each page section must be wrapped in a `<div class="section" id="s[X]">` container.
- **Active Section Control**: Sections are displayed conditionally. Keep this CSS override in every page to prevent stacking bugs:
  ```css
  html body div.section { display: none !important; }
  html body div.section.active { display: block !important; }
  html body div.section.visible { display: block !important; }
  ```

---

## 2. Interactive Q&A (Accordions) Structure

Q&A prep lists must be structured as nested lists to enable correct dropdown behavior via the enforcer engine (`portal-enhance.js`):

- **List Container**: `<div class="ql">`
- **Question & Answer Wrapper**: `<div class="qi">` (never use flat structures)
- **Question Element**: `<div class="qq">Q[X]. [Question Text]</div>`
- **Answer Element**: `<div class="qa">[Answer content]</div>`

### Interaction Logic:
- The enforcer binds a click listener to `.qq` (converted to `.vr-qa-q`).
- On click, it toggles `.open` on the parent `.qi` (converted to `.vr-qa-wrap`).
- CSS rules in `responsive.css` toggle target display:
  ```css
  .qi.open > .qa {
    display: block !important;
  }
  ```

---

## 3. Code Blocks & Tabification

- Multiple parallel code examples must be structured as tab groups inside `.cs` containers using `.ctbar` tabs and `.cp` panels.
- Do not use custom inline display styles that conflict with layout classes.
