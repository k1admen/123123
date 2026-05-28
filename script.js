document.addEventListener("DOMContentLoaded", () => {

    /* FADE */
    const elements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("visible");
        });
    });
    elements.forEach(el => observer.observe(el));

    /* MENU */
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu-items");
    toggle.addEventListener("click", () => menu.classList.toggle("open"));

    /* INFO */
    const btn = document.getElementById("infoBtn");
    const text = document.getElementById("infoText");
    btn.addEventListener("click", () => text.classList.toggle("show"));

    /* LIGHTBOX */
    const lightbox = document.getElementById("lightbox");
    const imgBox = document.getElementById("lightbox-img");
    const close = document.getElementById("close");

    document.querySelectorAll(".clickable").forEach(img => {
        img.addEventListener("click", () => {
            lightbox.classList.add("show");
            imgBox.src = img.src;
        });
    });

    close.addEventListener("click", () => {
        lightbox.classList.remove("show");
    });

    lightbox.addEventListener("click", e => {
        if (e.target === lightbox) {
            lightbox.classList.remove("show");
        }
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            lightbox.classList.remove("show");
        }
    });

    /* THEME */
    const themeBtn = document.querySelector(".theme-toggle");
    const icon = themeBtn.querySelector(".icon");

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light");

        if (document.body.classList.contains("light")) {
            icon.textContent = "☀️";
        } else {
            icon.textContent = "🌙";
        }
    });

});