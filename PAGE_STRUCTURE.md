# Learning Portal Page Structure Guidelines (Technical Specifications)

This document contains the developer-specific guidelines, class tags, and HTML/CSS rules required to satisfy the page acceptance criteria. All updates must adhere to these technical specifications.

> [!IMPORTANT]
> If there are any doubts or ambiguities regarding how a page's structure, layout, styles, or logic should be implemented, **always refer to the ideal reference page template**:
> [selenium_s17_s19_cookies_broken_links.html](file:///c:/Users/viksingh44/Pictures/my-learning-portal/src/sdet-topics/selenium-java/selenium_s17_s19_cookies_broken_links.html).

---

## 1. Page & Layout Structure & Session Indicators

- **Section Tab Navigator**: Session panels are selected using custom tabs.
- **Section Layout**: Each page section must be wrapped in a `<div class="section" id="s[X]">` container.
- **Active Section Control**: Sections are displayed conditionally. Keep this CSS override in every page to prevent stacking bugs:
  ```css
  html body div.section { display: none !important; }
  html body div.section.active { display: block !important; }
  html body div.section.visible { display: block !important; }
  ```
- **Active Tab Styling**: The active tab button (`.stab.active`) must be colored in the active theme color (`#6C5CE7` or `#7F77DD` / purple-blue) with `#ffffff` text, while inactive buttons (`.stab`) remain light gray/white with dark text.
- **Visual Progress Dots**:
  * Indicator Area: A progress block (`.prow`) containing `#pd` (dots container) and `#pl` (text label e.g., "Session 15 of 16").
  * Dot classes (`.dot`):
    * Previous/completed sessions (`.dot.dn` class): green background (`#1D9E75` or `#16a34a`).
    * Active/current session (`.dot.ac` class): purple/blue background (`#7F77DD` or active theme color).
    * Future/remaining sessions (`.dot.td` class): light gray background (`#D3D1C7` or `#e2e8f0`).

---

## 2. Interactive Q&A (Accordions) Structure

Q&A lists must be structured as nested lists to enable correct dropdown behavior via the enforcer engine (`portal-enhance.js`):

- **List Container**: `<div class="ql">`
- **Question & Answer Wrapper**: `<div class="qi">` (never use flat structures)
- **Question Element**: `<div class="qq">Q[X]. [Question Text]</div>`
  * *Color constraint*: Styled with dark red text color (e.g., `#b91c1c` / `#991b1b`).
- **Answer Element**: `<div class="qa">[Answer content]</div>`
  * *Color constraint*: Styled with dark blue text color (e.g., `#1e3a8a` / `#172554`).

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

## 3. Code Blocks, Tabification & Code Formatting Specifications

- Multiple parallel code examples must be structured as tab groups inside `.cs` containers using `.ctbar` tabs and `.cp` panels.
- Do not use custom inline display styles that conflict with layout classes.
- **Responsiveness**: All code wrappers (`pre`, `.cs`, `code`) must support horizontal scrolling: `overflow-x: auto !important;` to ensure layout consistency on mobile viewports.
- **Line Numbers**: Integrate Prism's line numbers plugin. The `pre` tag must include the `line-numbers` class (e.g., `<pre class="line-numbers">`). Line numbers are rendered using `span:before` inside the `.line-numbers-rows` gutter.
- **High-Contrast Syntax Highlighting (Prism Classes)**:
  * Comments (`.token.comment`): `#334155` (dark slate-gray for highest contrast, italicized). Must write explanatory step-by-step comments.
  * Keywords (`.token.keyword`): `#0969da` (vibrant blue/bold).
  * Strings (`.token.string`): `#1a7f37` (vibrant green).
  * Class names (`.token.class-name` / `.token.class`): `#953800` (bold orange).
  * Functions (`.token.function`): `#cf222e` (bold red/pink).
- **Key-Value Syntax Highlighting**: For configuration files (YAML, JSON, `.properties`), keys must be styled in a different color from values (e.g., keys styled as keywords or attributes in red/blue, and values styled as strings, numbers, or booleans in distinct colors).
- **Mac Terminal Header**:
  ```html
  <div class="csh">
    <div class="dr2">
      <span class="md mr"></span>
      <span class="md my"></span>
      <span class="md mg"></span>
    </div>
    <span>Title here</span>
  </div>
  ```
- **Code Tab Selector Row**:
  ```html
  <div class="ctbar">
    <button class="ct active" onclick="sc(sectionIndex, tabIndex)">
      <span class="lang-pill lang-[lang]">.[lang]</span> Name
    </button>
  </div>
  ```
- **Content Panels**:
  ```html
  <div class="cp active" id="c[sectionIndex]-[tabIndex]">
    <div class="cp-sub-header">
      <span class="file-dot file-dot-[lang]">●</span>
      <span class="file-name">filename.java</span>
      <button class="cpbtn" onclick="copyPreText(this)">Copy</button>
    </div>
    <pre><code class="language-[lang]">Code...</code></pre>
  </div>
  ```

---

## 4. Specific Border & Theme Color Specifications

To ensure high-contrast visual separation, apply these exact border and background-color definitions:

### 4.1 Border Sizes & Outlines
- **Main Sessions & Sections** (`.section`, `.sec`, `.session-panel`):
  * `border: 2.5px solid var(--pc, #6C5CE7) !important;` (on all 4 sides, always visible to clearly differentiate sections).
- **Outer Layout Cards** (`.vr-card`):
  * `border: 2.5px solid var(--pc, #6C5CE7) !important;` (on all 4 sides, always visible). Subclasses override color (`.green`/`.vr-card-green` uses `#10b981`, `.orange` uses `#f59e0b`, `.blue` uses `#3b82f6`, etc.).
- **Sub-Cards / Items** (`.kc-card`, `.oneliner`, `.ol`, `.liner`, `.liner-box`, `.liner-item`, `.vr-ol-item`, `.ol-item`, `.def-box`):
  * `border: 2px solid #534AB7 !important;` (on all 4 sides, always visible).
- **Checklist Boxes** (`.vr-bp-item`, `.checklist li`):
  * `border: 2px solid #16a34a !important;` (on all 4 sides, always visible).
- **Q&A Blocks** (`.qa-item`, `.vr-qa-wrap`, `.qi`, `.qablock`):
  * `border: 2px solid #0d9488 !important;` (on all 4 sides, always visible).
- **Callout boxes** (`.tip-box`, `.tip`, `.err-box`, `.warn`, `.good-box`, `.interview-box`):
  * `border: 2px solid [theme-color] !important;` (on all 4 sides, always visible).
- **Code block mock terminals** (`.cs`, `pre`, `.code-block`, `.cmd-block`):
  * `border: 1.5px solid #cbd5e1 !important;` (on all 4 sides).
  * *Important*: Set `border: none !important;` for nested `pre` elements inside `.cs` to avoid double outlines.
- **Headings Left Borders**:
  * Standard page headings (`h1`, `h2`, `h3`, `.s-title`) must use a 4px left-only border:
    `border-left: 4px solid var(--pc, #6C5CE7) !important; padding-left: 12px !important;`
  * Nested headings inside cards, accordions, or code panels must disable the left border:
    `border: none !important; border-left: none !important; padding-left: 0 !important;`

### 4.2 Theme Color Palettes (Backgrounds & Text)
Sections and cards must match their respective color theme guidelines:
- **Purple / Indigo Theme** (Default):
  * Class hook: `.section`, `.sec`, `.vr-card.purple`
  * Style: `background: #faf5ff !important; color: #3730a3 !important; border-color: #6C5CE7 !important;`
- **Blue Theme**:
  * Class hook: `.section.blue`, `.sec.blue`, `.vr-card.blue`
  * Style: `background: #eff6ff !important; color: #1e3a8a !important; border-color: #3b82f6 !important;`
- **Orange / Amber Theme**:
  * Class hook: `.tip-box`, `.tip`, `.vr-card.orange`, `.vr-card.amber`
  * Style: `background: #fffbeb !important; color: #92400e !important; border-color: #d97706 !important;`

### 4.4 Concepts - Flow Visuals & Image Specifications
To style flow step diagrams and images in a colorful, responsive, and robust manner without breaking existing viewport/desktop layout grids, use the following specifications:
- **Flow Steps (`.fstep.ns1` to `.fstep.ns5` / `.fstep.n1` to `.fstep.n5`)**:
  * `ns1` / `n1`: `background: #EEEDFE !important; color: #3C3489 !important; border-color: #AFA9EC !important;`
  * `ns2` / `n2`: `background: #E1F5EE !important; color: #085041 !important; border-color: #5DCAA5 !important;`
  * `ns3` / `n3`: `background: #E6F1FB !important; color: #0C447C !important; border-color: #85B7EB !important;`
  * `ns4` / `n4`: `background: #FAECE7 !important; color: #712B13 !important; border-color: #F0997B !important;`
  * `ns5` / `n5`: `background: #FAEEDA !important; color: #633806 !important; border-color: #EF9F27 !important;`
  * The inner titles (`.fn`, `.fd`) must inherit the step container's text color.
  * Adding subtle micro-animations (e.g. lift `translateY(-2px)` and shadow on hover) to increase user interaction.
- **Images (`img`)**:
  * Always scale fluidly: `max-width: 100% !important; height: auto !important;`
  * Centered layout: `display: block !important; margin: 12px auto !important;`
  * Styled with a premium border and rounded corners: `border: 2.5px solid var(--pc, #6C5CE7) !important; border-radius: 6px !important; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1) !important;`

### 4.3 Text Contrast Specification (WCAG AA Compliance)
To prevent low-contrast visibility issues (such as light gray text on light backgrounds):
- **Contrast Ratios**: All text elements must achieve a minimum contrast ratio of `4.5:1` against their containing background.
- **Standard Text Color hooks**:
  * Main page text: use `#1e293b` (dark slate) or `#0f172a` (near-black) on white/slate-50 backgrounds.
  * Muted/Metadata text: use `#475569` or `#57606a` (dark gray), never styling with light-gray `#cbd5e1` or `#e2e8f0` for text nodes.
  * Purple elements: use deep `#3730a3` / `#312e81` (indigo-900) on `#faf5ff`.
  * Blue elements: use deep `#1e3a8a` / `#172554` (blue-950) on `#eff6ff`.
  * Orange/Amber elements: use deep `#92400e` / `#78350f` (amber-900) on `#fffbeb`.

---

## 5. Search Indexing & Auto-Expansion Integration

To prevent breaking the global search engine (`app.js`):
- Ensure that session wrappers use the class `.section` or `.content-panel`.
- Ensure accordion answer blocks use the class `.qa-a` or `.qa`.
- Ensure code block tab content wrappers use the class `.cp`.
- Ensure interactive elements are clickable targets so the `makeElementVisible()` helper can programmatically simulate clicks when expanding hidden matches.

---

## 6. Cross-Platform Responsiveness & CSS Layout Specification

To satisfy full responsiveness rules on all devices (mobile, tablet, laptop, desktop, TV):
- **Fluid Layouts**: The wrap container (`.hub`, `.wrap`) must have a relative `max-width` (e.g. `960px`) and percentage-based padding (e.g., `padding: 2rem 1.2rem`) to resize dynamically on smaller screens.
- **Media Queries**: Responsive stylesheets (e.g., `responsive.css`) must define queries for standard breakpoints:
  * Mobile/Tablet Portals: `@media(max-width: 768px)`
  * Mobile lists/grids: `@media(max-width: 640px)`
- **Dynamic Columns**: Multi-column grids (like `.vr-g2` and `.glosgrid`) must drop down to single-column rows on small viewports:
  ```css
  @media(max-width: 640px) {
    .vr-g2, .glosgrid, .igrid {
      grid-template-columns: 1fr !important;
    }
  }
  ```
- **Scale Constraints**: All images (`img`), SVGs, and diagram containers must utilize max-width constraints: `max-width: 100%; height: auto;` to prevent layout overflows.

---

## 7. Inline Keyword Highlighting (.hl-kw) Specification

To highlight inline coding keywords, tool references, and syntax outside of standard code blocks:
- **Class Usage**: Wrap technical terms, class names, method signatures (e.g., `driver.get()`, `expect()`, `pom.xml`), annotation names, and variables inside `.hl-kw` spans or code blocks.
- **Styling Specs**:
  * Font Family: `var(--font-mono)` (monospaced).
  * Font Weight: `700` (bold).
  * Color: Deep magenta-pink (`#c2185b` or `#9f1239`).
  * Background: Soft light pink (`#fce4ec` or `#ffe4e6`).
  * Border: `0.5px solid #f8bbd0` with `3px` border-radius.
  * Sizing: Inline-block, with font-size scale `0.9em`.
- **Scope Restriction**: Inline highlights must only be used in content cards, glossary lists, or text paragraphs, and **never** inside the raw Prism-highlighted pre/code containers (to prevent visual syntax pollution).

---

## 8. Standard Lesson Sections HTML Structure

Every session wrapper must contain the following component elements in sequential order:
1. **Overview Banner**: `<div class="obanner">` containing `<h2>` and `<p>`.
2. **W/W/W/W/H Analysis Grid**: `<div class="sec">` containing `<h3>` and a `<div class="abox">` with rows of `<div class="dr">`.
3. **Keyword Glossary**: `<div class="sec">` containing `<h3>` and `<div class="glosgrid">` with child `.gitem` boxes.
4. **Interview One-Liners**: `<div class="sec">` containing `<h3>` and `<div class="igrid">` with child `.qp` boxes.
5. **Visual Flow Diagram**: `<div class="sec">` containing `<h3>` and `<div class="flowrow">` or `.vr-diagram-scroll` with child `.fstep` columns.
6. **Mock Code Editor (Tabs)**: `<div class="sec">` containing `<h3>` and a `.cs` wrapper enclosing `.csh` (header), `.ctbar` (tab menu), and `.cp` (content blocks).
7. **Best Practices Checklist**: `<div class="sec">` containing `<h3>` and a list `<ul class="bpl">` with child elements containing `<span class="bpc">`.
8. **Interview Prep Q&A**: `<div class="sec" style="border:none">` containing `<h3>` and a Q&A list container `<div class="ql">` enclosing `.qi` wrappers.

- **Preservation of Extra Sections/Flows**: If a page has extra sections or flows with valid educational/technical details, do not delete them. Instead, preserve them by refactoring or merging the content into the 8 standard layout components (e.g., adding tabs in the Mock Code Editor, items in the Q&A accordion, keywords in the Glossary, etc.). Only delete redundant, duplicated, or completely irrelevant placeholder/out-of-scope content.


---

## 9. Agent Execution & File Edit Rules

- **No Local Servers**: Agents must never run background local server processes (e.g. `npm run dev`, `npm start`, Python HTTP servers). All file modifications must be performed statically in the workspace.
- **Allowed Permissions**: The agent is granted full persistent permission to directly write, modify, delete, and create workspace files in order to execute requested updates, without requiring repeated permission queries.

---

## 10. Required Script Libraries & Stylesheet Head Links

Every learning page must include these references to match the reference layout environment:
- **Head Stylesheet Dependencies**:
  * Tabler Icons (for icons):
    `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">`
  * Prism Light Theme Core:
    `<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css" rel="stylesheet" />`
  * Prism Line Numbers Plugin:
    `<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.css" rel="stylesheet" />`
- **Bottom Script Declarations**:
  * Standard Prism files: `prism.min.js`, `prism-java.min.js` (and other languages as needed).
  * Enforcer extension engine: `<script src="../portal-enhance.js"></script>`
- **Bottom Local Script Controller**:
  * Must contain variables `cur`, `cP` (code panel mappings), and `sNums` (session numbers).
  * Must contain the standard controller routines: `sw(n)` for session visibility, `sc(s,t)` for code block tab swapping, and `upP()` for progress dots painting.
  * Must contain the Prism mutation observer for dynamically rendered code:
    ```javascript
    if (window.Prism) {
        document.addEventListener('DOMContentLoaded', () => {
            const observer = new MutationObserver((mutations) => {
                let needsHighlight = false;
                mutations.forEach(m => {
                    if (m.addedNodes.length) {
                        m.addedNodes.forEach(n => {
                            if (n.nodeName === 'PRE' || n.nodeName === 'CODE') needsHighlight = true;
                            if (n.querySelector && n.querySelector('pre')) needsHighlight = true;
                        });
                    }
                });
                if (needsHighlight) { Prism.highlightAll(); }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        });
    }
    ```
