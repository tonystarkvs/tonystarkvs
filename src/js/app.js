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
        btn.classList.add("active");

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

    // Initialize when DOM is ready
    buildMenu();

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
})();