/* ==========================================================================
   Miguel Oliveira - Personal Website
   main.js - small, dependency-free enhancements.
   The site works without JavaScript; this file only adds:
   1. Online profiles (GitHub, ORCID, Google Scholar, ...) - edit them HERE
   2. Mobile navigation toggle
   3. Automatic copyright year
   4. Project category filter (projetos.html / en/projects.html)
   5. CV PDF availability check (cv.html / en/cv.html)
   6. Subtle reveal-on-scroll animation
   7. Light / dark mode button
   8. Email address (spam protection)
   ========================================================================== */

(function () {
  "use strict";

  /* 1. ONLINE PROFILES -----------------------------------------------------
     Paste the full URL of each profile. Empty ("") = not shown anywhere.
     Each filled profile appears automatically, in both languages, on:
     Home (contact links), CV (Contact) and the Contact page; research
     profiles also appear next to the Scientific Publications.
     research: true  → shown under "Research profiles"
     research: false → shown under "Professional profiles"
     The order below is the order in which they are displayed. */
  var PROFILES = [
    { id: "github",       label: "GitHub",         research: false,
      url: "https://github.com/bitwisemiguel" },
    { id: "orcid",        label: "ORCID",          research: true,
      url: "https://orcid.org/0000-0002-1061-8491" },
    { id: "scholar",      label: "Google Scholar", research: true,
      url: "https://scholar.google.com/citations?user=OSNWaLYAAAAJ" },
    { id: "cienciavitae", label: "Ciência Vitae",  research: true,
      url: "https://www.cienciavitae.pt/AF1C-0D88-48BD" },
    { id: "zbmath",       label: "zbMATH Open",    research: true,
      url: "" },  // e.g. https://zbmath.org/authors/oliveira.miguel  (check your author ID)
    { id: "researchgate", label: "ResearchGate",   research: true,
      url: "" },  // e.g. https://www.researchgate.net/profile/Miguel-Oliveira-XX
    { id: "scopus",       label: "Scopus",         research: true,
      url: "https://www.scopus.com/authid/detail.uri?authorId=57676194400" }
  ];

  /* Small inline icons for the profile links */
  var ICONS = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9v2.81c0 .27.18.6.69.49A10.24 10.24 0 0 0 22 12.23C22 6.58 17.52 2 12 2z"/></svg>',
    orcid: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor"/><text x="12" y="15.6" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="700" style="fill:var(--color-surface)">iD</text></svg>',
    scholar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9 12 4l9 5-9 5-9-5z"/><path d="M7 11.2V16c0 1.4 2.2 3 5 3s5-1.6 5-3v-4.8"/></svg>',
    "default": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M8 7h7"/><path d="M8 11h5"/></svg>'
  };

  /* Interface strings in both languages (language read from <html lang>) */
  var LANG = (document.documentElement.lang || "en").slice(0, 2) === "pt" ? "pt" : "en";
  var STRINGS = {
    pt: { openMenu: "Abrir menu", closeMenu: "Fechar menu", newTab: " (abre num novo separador)",
          pdfSoon: "PDF brevemente", pdfEn: "Descarregar CV (EN)" },
    en: { openMenu: "Open menu", closeMenu: "Close menu", newTab: " (opens in a new tab)",
          pdfSoon: "PDF coming soon", pdfEn: "Download CV" }
  }[LANG];

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* Renders configured profiles into every element with [data-profiles]:
     data-profiles="all"          → every filled profile
     data-profiles="research"     → only research profiles
     data-profiles="professional" → only non-research profiles */
  function renderProfiles() {
    var active = PROFILES.filter(function (p) { return p.url && p.url.trim(); });

    document.querySelectorAll("[data-profiles]").forEach(function (container) {
      var type = container.getAttribute("data-profiles");
      var list = active.filter(function (p) {
        return type === "all" || (type === "research" ? p.research : !p.research);
      });

      list.forEach(function (p) {
        var li = document.createElement("li");
        li.innerHTML =
          '<a href="' + escapeHtml(p.url.trim()) + '" target="_blank" rel="noopener noreferrer">' +
          (ICONS[p.id] || ICONS["default"]) + escapeHtml(p.label) +
          '<span class="visually-hidden">' + STRINGS.newTab + "</span></a>";
        container.appendChild(li);
      });

      // Reveal wrappers (e.g. "Research profiles" block) only when they have content
      var wrap = container.closest("[data-profiles-wrap]");
      if (wrap && list.length) wrap.hidden = false;
    });
  }

  /* 2. MOBILE NAVIGATION ---------------------------------------------------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? STRINGS.closeMenu : STRINGS.openMenu);
      nav.classList.toggle("is-open", open);
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close with Escape and return focus to the button
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Close when clicking outside the menu
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("is-open") && !nav.contains(e.target) && !toggle.contains(e.target)) {
        setOpen(false);
      }
    });

    // Reset state when resizing to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) setOpen(false);
    });
  }

  /* 3. COPYRIGHT YEAR ------------------------------------------------------- */
  function setYear() {
    var year = String(new Date().getFullYear());
    document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = year; });
  }

  /* 4. PROJECT FILTER --------------------------------------------------------
     Each project card has data-category="..." with one or more
     space-separated categories: mathematics statistics python cpp research igaming */
  function initProjectFilter() {
    var buttons = document.querySelectorAll(".filter-btn");
    var cards = document.querySelectorAll(".project-card");
    var empty = document.querySelector(".filters-empty");
    var bar = document.querySelector(".filters");
    if (!buttons.length || !cards.length) return;

    // Filtering only makes sense with several projects: show the bar from 3 onwards
    var MIN_PROJECTS_FOR_FILTER = 3;
    if (cards.length < MIN_PROJECTS_FOR_FILTER) return;
    if (bar) bar.hidden = false;

    // Hide category buttons that have no project yet (they reappear automatically
    // as soon as a card uses that category in data-category)
    buttons.forEach(function (btn) {
      var f = btn.getAttribute("data-filter");
      if (f === "all") return;
      var used = Array.prototype.some.call(cards, function (card) {
        return (card.getAttribute("data-category") || "").split(/\s+/).indexOf(f) !== -1;
      });
      if (!used) btn.parentElement.hidden = true;
    });

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter");
        var visible = 0;

        buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });

        cards.forEach(function (card) {
          var cats = (card.getAttribute("data-category") || "").split(/\s+/);
          var show = filter === "all" || cats.indexOf(filter) !== -1;
          card.setAttribute("data-hidden", show ? "false" : "true");
          if (show) visible++;
        });

        if (empty) empty.hidden = visible !== 0;
      });
    });
  }

  /* 5. CV PDF CHECK -----------------------------------------------------------
     If the PDF has not been uploaded yet, the "Download CV" button is
     disabled instead of leading to a 404 page. On the Portuguese page, if
     the PT PDF is missing, the English PDF (data-cv-fallback) is used.
     (On file:// the check cannot run, so the button is left untouched.) */
  function checkCvPdf() {
    var link = document.querySelector("[data-cv-pdf]");
    if (!link || !window.fetch || location.protocol === "file:") return;

    var label = link.querySelector("[data-cv-label]");

    function exists(url) {
      return fetch(url, { method: "HEAD", cache: "no-store" })
        .then(function (res) { return res.ok; })
        .catch(function () { return null; }); // network error: unknown
    }

    function disable() {
      link.setAttribute("aria-disabled", "true");
      link.removeAttribute("href");
      link.classList.add("is-disabled");
      if (label) label.textContent = STRINGS.pdfSoon;
    }

    exists(link.getAttribute("href")).then(function (ok) {
      if (ok !== false) return;
      var fallback = link.getAttribute("data-cv-fallback");
      if (!fallback) return disable();
      exists(fallback).then(function (ok2) {
        if (ok2) {
          link.setAttribute("href", fallback);
          if (label) label.textContent = STRINGS.pdfEn;
        } else if (ok2 === false) {
          disable();
        }
      });
    });
  }

  /* 6. REVEAL ON SCROLL ----------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -40px 0px", threshold: 0.08 });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* 7. LIGHT / DARK MODE -----------------------------------------------------
     By default the site follows the operating system setting. Clicking the
     button switches to the opposite of what is shown and remembers the choice
     (localStorage). The saved choice is applied by a small script in <head>. */
  function initTheme() {
    var btn = document.querySelector(".theme-toggle");
    if (!btn) return;
    var root = document.documentElement;
    var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

    function isDark() {
      var t = root.getAttribute("data-theme");
      if (t) return t === "dark";
      return !!(media && media.matches);
    }
    function sync() { btn.setAttribute("aria-pressed", String(isDark())); }

    btn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      sync();
    });
    if (media && media.addEventListener) media.addEventListener("change", sync);
    sync();
  }

  /* 8. EMAIL (spam protection) ----------------------------------------------
     The address is never written in full in the HTML. Each email link has
     data-u (user) and data-d (domain), both written backwards, e.g.
       <a data-email data-u="19.gim.arievilo" data-d="moc.liamg">
     This function joins them, turns the link into a mailto: link and fills
     any [data-email-text] inside it with the readable address.
     To change the email, replace data-u / data-d in every HTML page
     (see README). Without JavaScript, a readable "user [at] domain" text is shown. */
  function initEmail() {
    function rev(s) { return (s || "").split("").reverse().join(""); }
    document.querySelectorAll("[data-email]").forEach(function (a) {
      var addr = rev(a.getAttribute("data-u")) + "@" + rev(a.getAttribute("data-d"));
      a.setAttribute("href", "mailto:" + addr);
      a.querySelectorAll("[data-email-text]").forEach(function (t) { t.textContent = addr; });
      a.hidden = false;
    });
  }

  /* INIT -------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    renderProfiles();
    initNav();
    setYear();
    initProjectFilter();
    checkCvPdf();
    initReveal();
    initTheme();
    initEmail();
  });
})();
