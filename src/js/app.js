/**
 * ============================================================
 *  APP.JS — Sidebar menu builder & iframe loader
 *  Reads courseData from config.js and builds the UI
 * ============================================================
 */
(function () {
    "use strict";

    // Grab DOM elements
    var navMenu = document.getElementById("navMenu");
    var mainArea = document.getElementById("mainArea");
    var iframeContainer = document.getElementById("iframeContainer");
    var moduleTitle = document.getElementById("moduleTitle");

    // Theme color index — rotates 0-4 for visual variety
    var themeIndex = 0;

    /**
     * Remove "active" class from all nav buttons
     */
    function clearActiveStates() {
        var buttons = document.querySelectorAll(".nav-item");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("active");
        }
    }

    /**
     * Load a module URL into the iframe area
     * @param {string} url        - path to the HTML file
     * @param {string} category   - category name (for breadcrumb)
     * @param {string} title      - link title (for breadcrumb)
     * @param {HTMLElement} btn   - the clicked button element
     */
    function loadModule(url, category, title, btn) {
        // Update active button
        clearActiveStates();
        if (btn) {
            btn.classList.add("active");
        }

        // Update top bar breadcrumb
        moduleTitle.textContent = category + " > " + title;

        // Show loader
        mainArea.classList.add("loading");

        // Create iframe
        var iframe = document.createElement("iframe");
        iframe.src = url;
        iframe.title = title;

        // Hide loader when content is ready
        iframe.addEventListener("load", function () {
            mainArea.classList.remove("loading");

            // Apply visual enhancements & Prism highlight layers inside the iframe
            try {
                var doc = iframe.contentDocument || iframe.contentWindow.document;
                var replacedCodes = [];

                // Find all plain text code containers across templates
                var codeDivs = doc.querySelectorAll(".code, .cb, .tree, .cblock, .cblk, .cb-body, pre:not([class*=\"language-\"])");
                for (var i = 0; i < codeDivs.length; i++) {
                    var el = codeDivs[i];

                    // Skip if it's already a code element or wrapped in a Prism block
                    if (el.tagName === "CODE" || el.closest("pre[class*=\"language-\"]")) {
                        continue;
                    }
                    if (el.tagName === "PRE" && el.querySelector("code[class*=\"language-\"]")) {
                        continue;
                    }

                    var codeText = el.textContent;
                    var lang = "typescript"; // Default code language

                    // Detect correct syntax language from URL paths/content
                    var pathLower = url.toLowerCase();
                    if (pathLower.indexOf("java") !== -1 || pathLower.indexOf("testng") !== -1) {
                        lang = "java";
                    } else if (pathLower.indexOf("python") !== -1) {
                        lang = "python";
                    } else if (pathLower.indexOf("sql") !== -1) {
                        lang = "sql";
                    } else if (pathLower.indexOf("jmeter") !== -1 || pathLower.indexOf("postman") !== -1 || pathLower.indexOf("ci-cd") !== -1 || pathLower.indexOf("cicd") !== -1) {
                        if (codeText.trim().startsWith("<") || codeText.trim().startsWith("<?xml")) {
                            lang = "markup";
                        } else {
                            lang = "bash";
                        }
                    }

                    // Build the Prism structure
                    var pre = doc.createElement("pre");
                    pre.className = "language-" + lang + " line-numbers";

                    var code = doc.createElement("code");
                    code.className = "language-" + lang;
                    code.textContent = codeText;

                    pre.appendChild(code);

                    // Carry over original ID, class, and attributes to preserve tab behavior & layout
                    if (el.id) {
                        pre.id = el.id;
                    }
                    if (el.className) {
                        var classes = el.className.split(/\s+/);
                        for (var c = 0; c < classes.length; c++) {
                            var clsName = classes[c].trim();
                            if (clsName && !pre.classList.contains(clsName)) {
                                pre.classList.add(clsName);
                            }
                        }
                    }
                    if (el.attributes) {
                        for (var attrIdx = 0; attrIdx < el.attributes.length; attrIdx++) {
                            var attr = el.attributes[attrIdx];
                            if (attr.name !== "id" && attr.name !== "class") {
                                pre.setAttribute(attr.name, attr.value);
                            }
                        }
                    }

                    // Replace original box with formatted block
                    if (el.parentNode) {
                        el.parentNode.replaceChild(pre, el);
                        replacedCodes.push(code);
                    }
                }

                // Fire highlight only on the newly replaced elements
                if (iframe.contentWindow.Prism) {
                    for (var r = 0; r < replacedCodes.length; r++) {
                        iframe.contentWindow.Prism.highlightElement(replacedCodes[r]);
                    }
                } else {
                    // Self-healing: dynamically pull Prism assets if missing
                    var link = doc.createElement("link");
                    link.rel = "stylesheet";
                    link.href = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css";
                    doc.head.appendChild(link);

                    var script = doc.createElement("script");
                    script.src = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js";
                    script.onload = function () {
                        if (iframe.contentWindow.Prism) {
                            for (var r = 0; r < replacedCodes.length; r++) {
                                iframe.contentWindow.Prism.highlightElement(replacedCodes[r]);
                            }
                        }
                    };
                    doc.body.appendChild(script);
                }

                // Highlight active search query text if search matches exist
                if (globalSearchInput) {
                    var query = globalSearchInput.value.toLowerCase().trim();
                    if (query) {
                        var applyHighlight = function(isFinalPass) {
                            try {
                                // STEP 1: Pre-render ALL dynamic sessions so all text is in DOM
                                preRenderAllSessions(iframe.contentWindow);
                                
                                // STEP 2: Clear old highlights and apply fresh ones
                                clearIframeHighlights(doc);
                                highlightIframeText(doc.body, query);
                                
                                // STEP 3: Determine which match index to focus
                                var focusIndex = pendingMatchIndex;
                                
                                if (focusIndex === -1) {
                                    // Derive focus from globalMatches for the current URL
                                    var activeIframe = iframeContainer.querySelector("iframe");
                                    var currentUrl = activeIframe ? activeIframe.getAttribute("src") : "";
                                    focusIndex = 0;
                                    for (var mIdx = 0; mIdx < globalMatches.length; mIdx++) {
                                        if (globalMatches[mIdx].url === currentUrl) {
                                            focusIndex = globalMatches[mIdx].matchIndex;
                                            globalActiveIndex = mIdx;
                                            break;
                                        }
                                    }
                                    if (globalActiveIndex !== -1 && globalMatches.length > 0) {
                                        var pageCount = matchingPages.length;
                                        searchResultCount.textContent = (globalActiveIndex + 1) + " of " + globalMatches.length + " (" + pageCount + " " + (pageCount === 1 ? "page" : "pages") + ")";
                                    }
                                }
                                
                                // STEP 4: Activate that specific highlight (reveals tabs/accordions + scrolls)
                                setActiveHighlight(doc, focusIndex);
                                
                                if (isFinalPass) {
                                    pendingMatchIndex = -1; // Reset after the final pass
                                }
                            } catch(innerErr) {
                                console.warn("applyHighlight pass failed:", innerErr);
                            }
                        };
                        
                        // First pass: immediate (catches pages with static content)
                        applyHighlight(false);
                        // Second pass: after dynamic scripts have settled (200ms is safe for most pages)
                        setTimeout(function() {
                            applyHighlight(true);
                        }, 200);
                    }
                }
            } catch (e) {
                console.error("Iframe code highlight/search failed:", e);
            }
        });

        // Handle load errors gracefully
        iframe.addEventListener("error", function () {
            mainArea.classList.remove("loading");
            iframeContainer.innerHTML =
                '<div class="welcome-screen">' +
                '<h2>⚠️ Could not load module</h2>' +
                "<p>Check that the file exists: " + url + "</p>" +
                "</div>";
        });

        // Track user history and progress in localStorage
        try {
            localStorage.setItem("lastModule", JSON.stringify({ url: url, category: category, title: title }));
            
            var visited = JSON.parse(localStorage.getItem("visitedModules") || "[]");
            if (visited.indexOf(url) === -1) {
                visited.push(url);
                localStorage.setItem("visitedModules", JSON.stringify(visited));
            }
        } catch (e) {
            console.error("Failed to save progress:", e);
        }

        // Replace iframe container content
        iframeContainer.innerHTML = "";
        iframeContainer.appendChild(iframe);
    }

    /**
     * Build the sidebar menu from courseData (defined in config.js)
     */
    function buildMenu() {
        var isFirstCategory = true;

        for (var c = 0; c < courseData.length; c++) {
            var course = courseData[c];

            // Category wrapper
            var catDiv = document.createElement("div");
            catDiv.className = "category";

            // Category title (clickable to expand/collapse)
            var catTitle = document.createElement("div");
            catTitle.className = "category-title";
            catTitle.setAttribute("role", "button");
            catTitle.setAttribute("tabindex", "0");
            catTitle.setAttribute("aria-expanded", isFirstCategory ? "true" : "false");
            catTitle.innerHTML =
                "<span>" + course.icon + " " + course.category + "</span>" +
                '<span class="arrow">▼</span>';

            // Links container
            var linksDiv = document.createElement("div");
            linksDiv.className = "category-links";

            // Build each link button
            for (var l = 0; l < course.links.length; l++) {
                var link = course.links[l];

                var btn = document.createElement("button");
                btn.className = "nav-item theme-" + (themeIndex % 5);
                btn.type = "button";
                btn.setAttribute("data-url", link.url);
                btn.setAttribute("data-category", course.category);
                btn.setAttribute("data-title", link.title);
                btn.innerHTML =
                    '<span class="icon">📄</span>' +
                    "<span>" + link.title + "</span>";

                // Attach click handler (use IIFE to capture correct values)
                (function (url, category, title, button) {
                    button.addEventListener("click", function () {
                        loadModule(url, category, title, button);
                    });
                })(link.url, course.category, link.title, btn);

                linksDiv.appendChild(btn);
                themeIndex++;
            }

            // Toggle expand/collapse on category click
            (function (div, titleEl) {
                function toggle() {
                    div.classList.toggle("open");
                    var isOpen = div.classList.contains("open");
                    titleEl.setAttribute("aria-expanded", isOpen ? "true" : "false");
                }
                titleEl.addEventListener("click", toggle);
                titleEl.addEventListener("keydown", function (e) {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggle();
                    }
                });
            })(catDiv, catTitle);

            // Open the first category by default
            if (isFirstCategory) {
                catDiv.classList.add("open");
                isFirstCategory = false;
            }

            catDiv.appendChild(catTitle);
            catDiv.appendChild(linksDiv);
            navMenu.appendChild(catDiv);
        }
    }

    // Trigger module load programmatically
    function triggerModuleLoad(url, category, title) {
        var btn = document.querySelector('.nav-item[data-url="' + url + '"]');
        if (btn) {
            var categoryDiv = btn.closest(".category");
            if (categoryDiv && !categoryDiv.classList.contains("open")) {
                var catTitle = categoryDiv.querySelector(".category-title");
                if (catTitle) {
                    catTitle.click();
                }
            }
            loadModule(url, category, title, btn);
        } else {
            // Fallback load
            loadModule(url, category, title, null);
        }
    }

    // Get time-of-day greeting
    function getGreeting() {
        var hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    }

    // Render Categories Explorer Grid
    function renderCategoriesGrid() {
        var dynamicContainer = document.getElementById("dashboardDynamicContent");
        if (!dynamicContainer) return;

        var html = '  <div class="section-header" style="margin-top: 10px;">🛠️ Explore Learning Paths</div>';
        html += '  <div class="category-grid" style="margin-top: 12px;">';
        
        for (var c = 0; c < courseData.length; c++) {
            var cat = courseData[c];
            var count = cat.links.length;
            html += '    <div class="category-card" data-category-index="' + c + '">';
            html += '      <div class="category-card-header">';
            html += '        <span class="category-card-icon">' + cat.icon + '</span>';
            html += '        <span class="category-card-count">' + count + ' lessons</span>';
            html += '      </div>';
            html += '      <h3 class="category-card-title">' + cat.category + '</h3>';
            html += '      <div class="category-card-footer">Explore modules <span>→</span></div>';
            html += '    </div>';
        }
        
        html += '  </div>';
        
        dynamicContainer.innerHTML = html;

        // Rebind click events
        var catCards = dynamicContainer.querySelectorAll(".category-card");
        catCards.forEach(function(card) {
            card.addEventListener("click", function() {
                var index = parseInt(this.getAttribute("data-category-index"));
                showCategoryModules(index);
            });
        });

        // Clear search input if it had value
        var searchInput = document.getElementById("dashboardSearch");
        if (searchInput) {
            searchInput.value = "";
        }
    }

    // Show Modules of Selected Category
    function showCategoryModules(catIndex) {
        var cat = courseData[catIndex];
        var dynamicContainer = document.getElementById("dashboardDynamicContent");
        if (!dynamicContainer) return;

        var html = '<div class="section-header" style="margin-top: 10px;">';
        html += '  <button class="back-to-grid-btn" id="backToGridBtn">← Back to Paths</button>';
        html += '  <span style="margin-left: 10px;">' + cat.icon + ' ' + cat.category + '</span>';
        html += '</div>';

        html += '<div class="module-list-container" style="margin-top: 16px;">';
        
        if (cat.links.length === 0) {
            html += '  <div class="no-results">No lessons available in this category yet. Coming soon!</div>';
        } else {
            for (var l = 0; l < cat.links.length; l++) {
                var link = cat.links[l];
                html += '  <div class="module-list-item" data-url="' + link.url + '" data-category="' + cat.category + '" data-title="' + link.title + '">';
                html += '    <span class="module-item-title">' + link.title + '</span>';
                html += '    <div class="module-item-right">';
                html += '      <span class="module-item-meta">Ready</span>';
                html += '      <span class="module-item-arrow">→</span>';
                html += '    </div>';
                html += '  </div>';
            }
        }
        
        html += '</div>';

        dynamicContainer.innerHTML = html;

        // Bind back button
        var backBtn = document.getElementById("backToGridBtn");
        if (backBtn) {
            backBtn.addEventListener("click", function() {
                renderCategoriesGrid();
            });
        }

        // Bind items click
        var items = dynamicContainer.querySelectorAll(".module-list-item");
        items.forEach(function(item) {
            item.addEventListener("click", function() {
                var url = this.getAttribute("data-url");
                var category = this.getAttribute("data-category");
                var title = this.getAttribute("data-title");
                triggerModuleLoad(url, category, title);
            });
        });
    }

    // Handle Dashboard Search
    function handleDashboardSearch(query) {
        var dynamicContainer = document.getElementById("dashboardDynamicContent");
        if (!dynamicContainer) return;

        if (!query) {
            renderCategoriesGrid();
            return;
        }

        query = query.toLowerCase();
        
        var matches = [];
        for (var c = 0; c < courseData.length; c++) {
            var cat = courseData[c];
            for (var l = 0; l < cat.links.length; l++) {
                var link = cat.links[l];
                if (link.title.toLowerCase().indexOf(query) !== -1 || cat.category.toLowerCase().indexOf(query) !== -1) {
                    matches.push({
                        url: link.url,
                        title: link.title,
                        category: cat.category
                    });
                }
            }
        }

        var html = '<div class="section-header" style="margin-top: 10px;">';
        html += '  <span>🔍 Search Results (' + matches.length + ')</span>';
        html += '</div>';

        html += '<div class="module-list-container" style="margin-top: 16px;">';
        
        if (matches.length === 0) {
            html += '  <div class="no-results">No lessons found matching your search. Try another keyword!</div>';
        } else {
            for (var i = 0; i < matches.length; i++) {
                var match = matches[i];
                html += '  <div class="module-list-item" data-url="' + match.url + '" data-category="' + match.category + '" data-title="' + match.title + '">';
                html += '    <span class="module-item-title">' + match.title + '</span>';
                html += '    <div class="module-item-right">';
                html += '      <span class="module-item-meta">' + match.category + '</span>';
                html += '      <span class="module-item-arrow">→</span>';
                html += '    </div>';
                html += '  </div>';
            }
        }
        
        html += '</div>';

        dynamicContainer.innerHTML = html;

        // Bind items click
        var items = dynamicContainer.querySelectorAll(".module-list-item");
        items.forEach(function(item) {
            item.addEventListener("click", function() {
                var url = this.getAttribute("data-url");
                var category = this.getAttribute("data-category");
                var title = this.getAttribute("data-title");
                triggerModuleLoad(url, category, title);
            });
        });
    }

    // Render interactive dashboard
    function renderDashboard() {
        moduleTitle.textContent = "Welcome to the Hub";
        clearActiveStates();

        // Calculate stats
        var totalCategories = courseData.length;
        var totalModules = 0;
        for (var c = 0; c < courseData.length; c++) {
            totalModules += courseData[c].links.length;
        }

        var visited = [];
        try {
            visited = JSON.parse(localStorage.getItem("visitedModules") || "[]");
        } catch(e) {}
        
        var allUrls = [];
        for (var c = 0; c < courseData.length; c++) {
            for (var l = 0; l < courseData[c].links.length; l++) {
                allUrls.push(courseData[c].links[l].url);
            }
        }
        var validVisited = visited.filter(function(url) {
            return allUrls.indexOf(url) !== -1;
        });
        
        var progressPct = totalModules > 0 ? Math.round((validVisited.length / totalModules) * 100) : 0;

        var lastModule = null;
        try {
            lastModule = JSON.parse(localStorage.getItem("lastModule"));
            if (lastModule && allUrls.indexOf(lastModule.url) === -1) {
                lastModule = null;
            }
        } catch(e) {}

        var html = '<div class="welcome-dashboard">';
        
        // Hero Section
        html += '<div class="dashboard-hero">';
        html += '  <div class="hero-badge">Antigravity Learning Environment</div>';
        html += '  <h2 class="hero-title">' + getGreeting() + ', Tester!</h2>';
        html += '  <p class="hero-desc">Welcome to your central hub for Automation Engineering and Software Development learning. Track your progress, search lessons, and resume where you left off.</p>';
        html += '</div>';

        // Stats Grid
        html += '<div class="stats-grid">';
        html += '  <div class="stat-card">';
        html += '    <div class="stat-icon">📚</div>';
        html += '    <div class="stat-info">';
        html += '      <span class="stat-val">' + totalModules + '</span>';
        html += '      <span class="stat-label">Total Lessons</span>';
        html += '    </div>';
        html += '  </div>';

        html += '  <div class="stat-card">';
        html += '    <div class="stat-icon">🗂️</div>';
        html += '    <div class="stat-info">';
        html += '      <span class="stat-val">' + totalCategories + '</span>';
        html += '      <span class="stat-label">Learning Paths</span>';
        html += '    </div>';
        html += '  </div>';

        html += '  <div class="stat-card">';
        html += '    <div class="stat-icon">🎯</div>';
        html += '    <div class="stat-info">';
        html += '      <span class="stat-val">' + progressPct + '%</span>';
        html += '      <span class="stat-label">Completed (' + validVisited.length + '/' + totalModules + ')</span>';
        html += '      <div class="progress-bar-container"><div class="progress-bar-fill" style="width: ' + progressPct + '%"></div></div>';
        html += '    </div>';
        html += '  </div>';
        html += '</div>'; // close stats-grid

        // Resume Learning card
        if (lastModule) {
            html += '<div class="stats-grid" style="margin-top: -12px;">';
            html += '  <div class="stat-card resume-card" id="resumeCard" data-url="' + lastModule.url + '" data-category="' + lastModule.category + '" data-title="' + lastModule.title + '">';
            html += '    <div class="stat-icon">⚡</div>';
            html += '    <div class="stat-info">';
            html += '      <span class="stat-label">RESUME LEARNING</span>';
            html += '      <span class="stat-val" style="font-size: 1.1rem; margin-top: 4px;">' + lastModule.title + '</span>';
            html += '      <span class="stat-label" style="font-size: 0.75rem; color: #818cf8; margin-top: 2px;">Path: ' + lastModule.category + '</span>';
            html += '    </div>';
            html += '    <button class="resume-btn">Resume <span style="font-size:0.95rem;">→</span></button>';
            html += '  </div>';
            html += '</div>';
        }

        // Search Section
        html += '<div class="section-header" style="margin-top: 10px;">🔍 Quick Navigation & Search</div>';
        html += '<div class="search-wrapper">';
        html += '  <span class="search-icon">';
        html += '    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';
        html += '  </span>';
        html += '  <input type="text" id="dashboardSearch" class="search-input" placeholder="Search lessons, categories, frameworks...">';
        html += '</div>';

        // Explorer Area
        html += '<div id="dashboardDynamicContent">';
        html += '  <div class="section-header" style="margin-top: 10px;">🛠️ Explore Learning Paths</div>';
        html += '  <div class="category-grid" style="margin-top: 12px;">';
        
        for (var c = 0; c < courseData.length; c++) {
            var cat = courseData[c];
            var count = cat.links.length;
            html += '    <div class="category-card" data-category-index="' + c + '">';
            html += '      <div class="category-card-header">';
            html += '        <span class="category-card-icon">' + cat.icon + '</span>';
            html += '        <span class="category-card-count">' + count + ' lessons</span>';
            html += '      </div>';
            html += '      <h3 class="category-card-title">' + cat.category + '</h3>';
            html += '      <div class="category-card-footer">Explore modules <span>→</span></div>';
            html += '    </div>';
        }
        
        html += '  </div>';
        html += '</div>'; // close dashboardDynamicContent
        html += '</div>'; // close welcome-dashboard
        
        iframeContainer.innerHTML = html;

        // Events
        var resumeCard = document.getElementById("resumeCard");
        if (resumeCard) {
            resumeCard.addEventListener("click", function() {
                var url = this.getAttribute("data-url");
                var category = this.getAttribute("data-category");
                var title = this.getAttribute("data-title");
                triggerModuleLoad(url, category, title);
            });
        }

        var catCards = iframeContainer.querySelectorAll(".category-card");
        catCards.forEach(function(card) {
            card.addEventListener("click", function() {
                var index = parseInt(this.getAttribute("data-category-index"));
                showCategoryModules(index);
            });
        });

        var searchInput = document.getElementById("dashboardSearch");
        if (searchInput) {
            searchInput.addEventListener("input", function() {
                handleDashboardSearch(this.value.trim());
            });
        }
    }

    // Initialize when DOM is ready
    buildMenu();
    renderDashboard();

    // Bind Home & Logo Events
    var sidebarHeader = document.getElementById("sidebarHeader");
    if (sidebarHeader) {
        sidebarHeader.addEventListener("click", function() {
            renderDashboard();
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        });
    }

    var homeBtn = document.getElementById("homeBtn");
    if (homeBtn) {
        homeBtn.addEventListener("click", function() {
            renderDashboard();
        });
    }

    // ── Mobile sidebar toggle ──────────────────
    var sidebar = document.querySelector(".sidebar");
    var hamburgerBtn = document.getElementById("hamburgerBtn");
    var sidebarOverlay = document.getElementById("sidebarOverlay");

    function openSidebar() {
        sidebar.classList.add("open");
        sidebarOverlay.classList.add("visible");
    }

    function closeSidebar() {
        sidebar.classList.remove("open");
        sidebarOverlay.classList.remove("visible");
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener("click", function () {
            if (sidebar.classList.contains("open")) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", closeSidebar);
    }

    // Close sidebar when a module is selected (on mobile)
    navMenu.addEventListener("click", function (e) {
        if (e.target.closest(".nav-item") && window.innerWidth <= 768) {
            closeSidebar();
        }
    });

    // ── Global Search Functionality & Event Bindings ──────────────────
    var globalSearchInput = document.getElementById("globalSearchInput");
    var clearSearchBtn = document.getElementById("clearSearchBtn");
    var prevSearchBtn = document.getElementById("prevSearchBtn");
    var nextSearchBtn = document.getElementById("nextSearchBtn");
    var searchResultCount = document.getElementById("searchResultCount");
    
    var allPages = [];
    var pageContentsCache = {};
    var matchingPages = [];
    var globalMatches = [];
    var globalActiveIndex = -1;
    var pendingMatchIndex = -1;
    var searchIsLoading = false;

    // Build the flat list of all pages for search indexing
    function initializeSearchIndex() {
        allPages = [];
        for (var c = 0; c < courseData.length; c++) {
            var cat = courseData[c];
            for (var l = 0; l < cat.links.length; l++) {
                allPages.push({
                    url: cat.links[l].url,
                    title: cat.links[l].title,
                    category: cat.category
                });
            }
        }
    }

    initializeSearchIndex();
    
    function getCleanText(html) {
        var clean = html
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
            .replace(/<[^>]*>/g, ' ');
        try {
            var doc = new DOMParser().parseFromString(clean, 'text/html');
            return doc.body.textContent || doc.body.innerText || clean;
        } catch (e) {
            return clean;
        }
    }

    /**
     * Highlight all matching text nodes inside an iframe document.
     * IMPORTANT: uses `ownerDocument` (the iframe's own document) to create mark elements.
     */
    function highlightIframeText(node, query) {
        if (!node) return;
        if (node.nodeType === 3) { // Text Node
            var val = node.nodeValue;
            var idx = val.toLowerCase().indexOf(query);
            if (idx >= 0) {
                var parent = node.parentNode;
                var ownerDoc = node.ownerDocument || document;
                if (parent && parent.tagName !== "MARK" && parent.tagName !== "SCRIPT" &&
                    parent.tagName !== "STYLE" && parent.tagName !== "TEXTAREA" &&
                    parent.tagName !== "CODE" && parent.tagName !== "PRE") {
                    
                    var matchText = val.substring(idx, idx + query.length);
                    var beforeText = val.substring(0, idx);
                    var afterText = val.substring(idx + query.length);
                    
                    // CRITICAL: use ownerDocument so mark lives in iframe's DOM
                    var mark = ownerDoc.createElement("mark");
                    mark.className = "search-highlight";
                    mark.style.cssText = "background-color:yellow;color:black;padding:1px 2px;border-radius:2px;box-shadow:0 1px 3px rgba(0,0,0,0.1);";
                    mark.textContent = matchText;
                    
                    var beforeNode = ownerDoc.createTextNode(beforeText);
                    var afterNode = ownerDoc.createTextNode(afterText);
                    
                    parent.insertBefore(beforeNode, node);
                    parent.insertBefore(mark, node);
                    parent.insertBefore(afterNode, node);
                    parent.removeChild(node);
                    
                    // Recurse on remaining text after the match
                    highlightIframeText(afterNode, query);
                }
            }
        } else if (node.nodeType === 1 && node.childNodes && !/(style|script|iframe)/i.test(node.tagName)) {
            // Traverse children in reverse to avoid issues when siblings are inserted
            var kids = Array.prototype.slice.call(node.childNodes);
            for (var i = kids.length - 1; i >= 0; i--) {
                highlightIframeText(kids[i], query);
            }
        }
    }

    function clearIframeHighlights(doc) {
        if (!doc) return;
        var marks = doc.querySelectorAll("mark.search-highlight");
        for (var m = 0; m < marks.length; m++) {
            var mark = marks[m];
            var parent = mark.parentNode;
            if (parent) {
                var textNode = doc.createTextNode(mark.textContent);
                parent.replaceChild(textNode, mark);
                parent.normalize();
            }
        }
    }

    function getSearchableTextForIndexing(html) {
        var clean = html
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
            .replace(/<[^>]*>/g, ' ');
        return clean;
    }
    
    function countOccurrences(text, query) {
        if (!query) return 0;
        var count = 0;
        var idx = text.indexOf(query);
        while (idx !== -1) {
            count++;
            idx = text.indexOf(query, idx + query.length);
        }
        return count;
    }

    /**
     * Pre-render all dynamic sessions in an iframe's page so search can find them.
     * Supports agile_scrum_learning_hub-style pages with goTo() + sessions array.
     */
    function preRenderAllSessions(iframeWin) {
        if (!iframeWin) return;
        try {
            // Pattern 1: sessions array + renderSession(i) (agile_scrum_learning_hub style)
            if (iframeWin.sessions && iframeWin.renderSession) {
                for (var i = 0; i < iframeWin.sessions.length; i++) {
                    iframeWin.renderSession(i);
                }
            }
            // Pattern 2: buildSessions / buildContent style
            if (iframeWin.buildSessions && typeof iframeWin.buildSessions === 'function') {
                iframeWin.buildSessions();
            }
        } catch(e) {}
    }

    /**
     * Reveal the element containing a match by expanding tabs, accordions, and sessions.
     * Uses a smarter approach: walk ancestors and use class-based visibility detection.
     */
    function makeElementVisible(el, doc) {
        if (!el || !doc) return;
        var iframeWin = doc.defaultView;
        
        var curr = el.parentNode;
        while (curr && curr !== doc.body && curr !== doc.documentElement) {
            var cls = curr.classList;
            
            // 1. Handle QA accordion answers (.qa-a class) – click the question (.qa-q) sibling
            if (cls && cls.contains("qa-a")) {
                if (!cls.contains("open")) {
                    var qaQ = curr.previousElementSibling;
                    if (!qaQ && curr.parentNode) {
                        qaQ = curr.parentNode.querySelector(".qa-q");
                    }
                    if (qaQ) {
                        try { qaQ.click(); } catch(e) {}
                    } else {
                        cls.add("open");
                    }
                }
            }
            
            // 2. Handle session panels that use goTo() – find the index and call goTo
            if (cls && cls.contains("session") && !cls.contains("active")) {
                var sessId = curr.id; // e.g. "sess-3"
                if (sessId && iframeWin && iframeWin.sessions && iframeWin.goTo) {
                    var num = parseInt(sessId.replace(/\D/g, ""), 10);
                    // Find which index in sessions array has this id
                    for (var si = 0; si < iframeWin.sessions.length; si++) {
                        if (iframeWin.sessions[si].id === num) {
                            try { iframeWin.goTo(si); } catch(e) {}
                            break;
                        }
                    }
                }
            }

            // 3. Handle generic tab-content / session-panel hidden by display:none
            var computedDisplay = "";
            try {
                computedDisplay = iframeWin.getComputedStyle(curr).display;
            } catch(e) {}
            
            if (computedDisplay === "none") {
                // Try clicking a button whose aria-controls or data-target references this element
                if (curr.id) {
                    var triggerSel = '[aria-controls="' + curr.id + '"],[data-target="#' + curr.id + '"],[href="#' + curr.id + '"]';
                    var trigger = doc.querySelector(triggerSel);
                    if (trigger) {
                        try { trigger.click(); } catch(e) {}
                    } else {
                        // Last resort: show directly
                        curr.style.display = "block";
                    }
                } else {
                    curr.style.display = "block";
                }
            }
            
            curr = curr.parentNode;
        }
    }

    function setActiveHighlight(doc, index) {
        var marks = doc.querySelectorAll("mark.search-highlight");
        // Reset all highlights
        for (var i = 0; i < marks.length; i++) {
            marks[i].style.cssText = "background-color:yellow;color:black;padding:1px 2px;border-radius:2px;box-shadow:0 1px 3px rgba(0,0,0,0.1);";
        }
        
        if (index >= 0 && marks[index]) {
            var activeMark = marks[index];
            activeMark.style.cssText = "background-color:#ff9800;color:white;padding:2px 4px;border-radius:3px;outline:2px solid #e65100;box-shadow:0 0 12px rgba(255,152,0,0.9);transform:scale(1.08);transition:all 0.2s ease;display:inline-block;";
            
            // Reveal hidden containers before scrolling
            makeElementVisible(activeMark, doc);
            
            // Small delay to allow DOM updates before scrolling
            setTimeout(function() {
                activeMark.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 80);
        }
    }

    function runGlobalSearch(forceNavigate) {
        var query = globalSearchInput.value.toLowerCase().trim();
        
        if (!query) {
            matchingPages = [];
            globalMatches = [];
            globalActiveIndex = -1;
            searchResultCount.textContent = "";
            prevSearchBtn.disabled = true;
            nextSearchBtn.disabled = true;
            
            var activeIframe = iframeContainer.querySelector("iframe");
            if (activeIframe) {
                try {
                    var doc = activeIframe.contentDocument || activeIframe.contentWindow.document;
                    clearIframeHighlights(doc);
                } catch(e) {}
            }
            return;
        }

        searchResultCount.textContent = "Searching...";
        searchIsLoading = true;

        var promises = allPages.map(function(page) {
            if (pageContentsCache[page.url]) {
                return Promise.resolve({ page: page, html: pageContentsCache[page.url] });
            }
            return fetch(page.url)
                .then(function(res) { return res.text(); })
                .then(function(html) {
                    pageContentsCache[page.url] = html;
                    return { page: page, html: html };
                })
                .catch(function() {
                    return { page: page, html: "" };
                });
        });

        Promise.all(promises).then(function(results) {
            searchIsLoading = false;
            matchingPages = [];
            globalMatches = [];

            results.forEach(function(item) {
                if (item.html) {
                    try {
                        var tempDoc = new DOMParser().parseFromString(item.html, 'text/html');
                        clearIframeHighlights(tempDoc);
                        highlightIframeText(tempDoc.body, query);
                        var highlightCount = tempDoc.querySelectorAll("mark.search-highlight").length;
                        
                        // If body has 0 matches (e.g. agile_scrum_learning_hub.html with dynamic sessions),
                        // search the raw text containing script variables
                        if (highlightCount === 0) {
                            var rawText = getSearchableTextForIndexing(item.html).toLowerCase();
                            var rawCount = countOccurrences(rawText, query);
                            if (rawCount > 0) {
                                highlightCount = rawCount;
                            }
                        }
                        
                        if (highlightCount > 0) {
                            matchingPages.push({
                                page: item.page,
                                count: highlightCount
                            });
                        }
                    } catch (e) {
                        var textMatch = getCleanText(item.html).toLowerCase().indexOf(query) !== -1;
                        if (textMatch) {
                            matchingPages.push({
                                page: item.page,
                                count: 1
                            });
                        }
                    }
                }
            });

            matchingPages.forEach(function(m) {
                for (var j = 0; j < m.count; j++) {
                    globalMatches.push({
                        url: m.page.url,
                        title: m.page.title,
                        category: m.page.category,
                        matchIndex: j
                    });
                }
            });

            if (globalMatches.length === 0) {
                searchResultCount.textContent = "0 matches";
                prevSearchBtn.disabled = true;
                nextSearchBtn.disabled = true;
                globalActiveIndex = -1;
                
                var activeIframe = iframeContainer.querySelector("iframe");
                if (activeIframe) {
                    try {
                        var doc = activeIframe.contentDocument || activeIframe.contentWindow.document;
                        clearIframeHighlights(doc);
                    } catch(e) {}
                }
                return;
            }

            prevSearchBtn.disabled = false;
            nextSearchBtn.disabled = false;

            var activeIframe = iframeContainer.querySelector("iframe");
            var currentUrl = activeIframe ? activeIframe.getAttribute("src") : "";
            
            var foundIdx = -1;
            for (var i = 0; i < globalMatches.length; i++) {
                if (globalMatches[i].url === currentUrl) {
                    foundIdx = i;
                    break;
                }
            }

            if (foundIdx !== -1 && !forceNavigate) {
                globalActiveIndex = foundIdx;
                var pageCount = matchingPages.length;
                searchResultCount.textContent = (globalActiveIndex + 1) + " of " + globalMatches.length + " (" + pageCount + " " + (pageCount === 1 ? "page" : "pages") + ")";
                
                try {
                    var doc = activeIframe.contentDocument || activeIframe.contentWindow.document;
                    
                    // Pre-render dynamic sessions inside current page if needed
                    preRenderAllSessions(activeIframe.contentWindow);
                    
                    clearIframeHighlights(doc);
                    highlightIframeText(doc.body, query);
                    setActiveHighlight(doc, globalMatches[globalActiveIndex].matchIndex);
                } catch(e) {}
            } else {
                globalActiveIndex = 0;
                var pageCount = matchingPages.length;
                searchResultCount.textContent = "1 of " + globalMatches.length + " (" + pageCount + " " + (pageCount === 1 ? "page" : "pages") + ")";
                
                var match = globalMatches[0];
                pendingMatchIndex = match.matchIndex;
                triggerModuleLoad(match.url, match.category, match.title);
            }
        }).catch(function(err) {
            console.error("Global search failed:", err);
            searchIsLoading = false;
            searchResultCount.textContent = "Error";
        });
    }

    var searchDebounceTimer;
    if (globalSearchInput) {
        globalSearchInput.addEventListener("input", function() {
            if (clearSearchBtn) {
                clearSearchBtn.style.display = globalSearchInput.value ? "flex" : "none";
            }
            clearTimeout(searchDebounceTimer);
            searchDebounceTimer = setTimeout(function() {
                runGlobalSearch(false);
            }, 400);
        });

        globalSearchInput.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                e.preventDefault();
                if (globalMatches.length > 0) {
                    navigateSearch(1);
                } else {
                    runGlobalSearch(true);
                }
            }
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener("click", function() {
            globalSearchInput.value = "";
            clearSearchBtn.style.display = "none";
            runGlobalSearch(false);
            globalSearchInput.focus();
        });
    }

    function navigateSearch(direction) {
        if (globalMatches.length === 0 || searchIsLoading) return;
        
        globalActiveIndex = (globalActiveIndex + direction + globalMatches.length) % globalMatches.length;
        var pageCount = matchingPages.length;
        searchResultCount.textContent = (globalActiveIndex + 1) + " of " + globalMatches.length + " (" + pageCount + " " + (pageCount === 1 ? "page" : "pages") + ")";
        
        var match = globalMatches[globalActiveIndex];
        var activeIframe = iframeContainer.querySelector("iframe");
        var currentUrl = activeIframe ? activeIframe.getAttribute("src") : "";
        
        if (currentUrl === match.url) {
            // Same page: navigate through live marks
            try {
                var doc = activeIframe.contentDocument || activeIframe.contentWindow.document;
                
                // Pre-render dynamic sessions inside current page if needed
                preRenderAllSessions(activeIframe.contentWindow);
                
                // Re-highlight the live DOM and navigate by matchIndex
                clearIframeHighlights(doc);
                var query = globalSearchInput.value.toLowerCase().trim();
                highlightIframeText(doc.body, query);
                
                // Use match.matchIndex but clamp to actual mark count to prevent out-of-bounds
                var liveMarks = doc.querySelectorAll("mark.search-highlight");
                var safeIndex = Math.min(match.matchIndex, liveMarks.length - 1);
                if (safeIndex < 0) safeIndex = 0;
                setActiveHighlight(doc, safeIndex);
            } catch(e) {
                console.error("Local highlight navigation failed:", e);
            }
        } else {
            // Cross-page: always start at first match on new page (index 0)
            // The actual matchIndex from static analysis may differ from live DOM
            pendingMatchIndex = 0;
            triggerModuleLoad(match.url, match.category, match.title);
        }
    }

    if (prevSearchBtn) {
        prevSearchBtn.addEventListener("click", function() {
            navigateSearch(-1);
        });
    }

    if (nextSearchBtn) {
        nextSearchBtn.addEventListener("click", function() {
            navigateSearch(1);
        });
    }
})();