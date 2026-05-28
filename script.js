document.addEventListener("DOMContentLoaded", () => {
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
    }

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
    if (themeBtn && icon) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("light");
            icon.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
        });
    }

    const langSelect = document.getElementById("langSelect");
    const applyLanguage = lang => {
        const pack = translations?.[lang] || translations.cs;
        document.documentElement.lang = lang;
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.dataset.i18n;
            if (pack[key]) el.textContent = pack[key];
        });
        document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (pack[key]) el.setAttribute("placeholder", pack[key]);
        });
        localStorage.setItem("lang", lang);
    };

    if (langSelect) {
        const saved = localStorage.getItem("lang") || "cs";
        langSelect.value = saved;
        applyLanguage(saved);
        langSelect.addEventListener("change", e => applyLanguage(e.target.value));
    }
});
