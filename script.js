document.addEventListener("DOMContentLoaded", () => {
    const STORAGE_KEYS = {
        lang: "lang",
        theme: "theme"
    };

    const elements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("visible");
        });
    });
    elements.forEach(el => observer.observe(el));

    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu-items");
    if (toggle && menu) {
        toggle.addEventListener("click", () => {
            menu.classList.toggle("open");
            toggle.setAttribute("aria-expanded", String(menu.classList.contains("open")));
        });

        menu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                menu.classList.remove("open");
                toggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".menu-items a").forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPage) {
            link.classList.add("active-link");
            link.setAttribute("aria-current", "page");
        }
    });

    const btn = document.getElementById("infoBtn");
    const text = document.getElementById("infoText");
    if (btn && text) {
        btn.addEventListener("click", () => text.classList.toggle("show"));
    }

    const lightbox = document.getElementById("lightbox");
    const imgBox = document.getElementById("lightbox-img");
    const close = document.getElementById("close");

    if (lightbox && imgBox) {
        document.querySelectorAll(".clickable").forEach(img => {
            img.addEventListener("click", () => {
                lightbox.classList.add("show");
                imgBox.src = img.src;
            });
        });

        if (close) close.addEventListener("click", () => lightbox.classList.remove("show"));
        lightbox.addEventListener("click", e => {
            if (e.target === lightbox) lightbox.classList.remove("show");
        });
        document.addEventListener("keydown", e => {
            if (e.key === "Escape") lightbox.classList.remove("show");
        });
    }

    const themeBtn = document.querySelector(".theme-toggle");
    const icon = themeBtn?.querySelector(".icon");

    const applyTheme = theme => {
        const isLight = theme === "light";
        document.body.classList.toggle("light", isLight);
        if (icon) icon.textContent = isLight ? "☀️" : "🌙";
        localStorage.setItem(STORAGE_KEYS.theme, isLight ? "light" : "dark");
    };

    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) || "dark";
    applyTheme(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const nextTheme = document.body.classList.contains("light") ? "dark" : "light";
            applyTheme(nextTheme);
        });
    }

    const langSelect = document.getElementById("langSelect");
    const applyLanguage = lang => {
        if (typeof translations === "undefined") return;
        const pack = translations[lang] || translations.cs;
        document.documentElement.lang = lang;
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.dataset.i18n;
            if (pack[key]) el.textContent = pack[key];
        });
        document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (pack[key]) el.setAttribute("placeholder", pack[key]);
        });
        localStorage.setItem(STORAGE_KEYS.lang, lang);
    };

    if (langSelect) {
        const saved = localStorage.getItem(STORAGE_KEYS.lang) || "cs";
        langSelect.value = saved;
        applyLanguage(saved);
        langSelect.addEventListener("change", e => applyLanguage(e.target.value));
    }
});
