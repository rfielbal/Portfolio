(() => {
    "use strict";

    document.documentElement.classList.add("js");
    const menu = document.getElementById("fs-menu");
    const openButton = document.getElementById("btn-open-menu");
    const closeButton = document.getElementById("btn-close-menu");
    const main = document.getElementById("main-content");
    const footer = document.querySelector(".cyber-project-footer");
    const navbar = document.getElementById("navbar");

    const toggleMenu = (open) => {
        menu.inert = !open;
        menu.setAttribute("aria-hidden", String(!open));
        menu.classList.toggle("active", open);
        openButton.setAttribute("aria-expanded", String(open));
        document.body.style.overflow = open ? "hidden" : "";
        main.inert = open;
        footer.inert = open;
        if (open) {
            // Wait for the hidden-to-visible transition before moving focus.
            window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
                if (!menu.inert && !menu.contains(document.activeElement)) {
                    closeButton.focus({ preventScroll: true });
                }
            }));
        } else {
            openButton.focus({ preventScroll: true });
        }
    };

    openButton.addEventListener("click", () => toggleMenu(true));
    closeButton.addEventListener("click", () => toggleMenu(false));
    menu.addEventListener("click", (event) => {
        if (event.target.closest("a")) toggleMenu(false);
    });

    document.addEventListener("keydown", (event) => {
        if (menu.inert) return;
        if (event.key === "Escape") {
            event.preventDefault();
            toggleMenu(false);
        }
        if (event.key !== "Tab") return;
        const controls = Array.from(menu.querySelectorAll("a[href], button"));
        const first = controls[0];
        const last = controls.at(-1);
        if (!menu.contains(document.activeElement)) {
            event.preventDefault();
            (event.shiftKey ? last : first).focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        } else if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        }
    });

    let framePending = false;
    const updateNavbar = () => {
        navbar.classList.toggle("sticky", window.scrollY > 20);
        framePending = false;
    };
    window.addEventListener("scroll", () => {
        if (framePending) return;
        framePending = true;
        window.requestAnimationFrame(updateNavbar);
    }, { passive: true });
    window.addEventListener("pageshow", () => {
        if (!menu.inert) toggleMenu(false);
        updateNavbar();
    });
    updateNavbar();
})();
