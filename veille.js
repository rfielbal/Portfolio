document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const nav = document.getElementById("watch-nav");
    const menu = document.getElementById("watch-mobile-menu");
    const menuButton = document.getElementById("watch-menu-button");
    const menuClose = document.getElementById("watch-menu-close");
    const filterButtons = Array.from(document.querySelectorAll("[data-signal-filter]"));
    const signalCards = Array.from(document.querySelectorAll("[data-signal-card]"));
    const signalCount = document.getElementById("signal-count");
    const methodTrack = document.getElementById("method-track");
    const methodProgress = document.getElementById("method-progress");
    const methodSteps = Array.from(document.querySelectorAll("[data-method-step]"));
    const pageMain = document.querySelector("main");
    const pageFooter = document.querySelector(".watch-footer");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let previousFocus = null;
    let scrollFrame = null;

    const getMenuFocusable = () => {
        if (!menu) return [];
        return Array.from(menu.querySelectorAll("a[href], button:not([disabled])"));
    };

    const setBackgroundInert = (isInert) => {
        [nav, pageMain, pageFooter].forEach((element) => {
            if (element) element.inert = isInert;
        });
    };

    const openMenu = () => {
        if (!menu || !menuButton) return;
        previousFocus = document.activeElement;
        menu.classList.add("is-open");
        menu.setAttribute("aria-hidden", "false");
        menuButton.setAttribute("aria-expanded", "true");
        body.classList.add("menu-open");
        setBackgroundInert(true);
        window.setTimeout(() => getMenuFocusable()[0]?.focus({ preventScroll: true }), 0);
    };

    const closeMenu = () => {
        if (!menu || !menuButton) return;
        menu.classList.remove("is-open");
        menu.setAttribute("aria-hidden", "true");
        menuButton.setAttribute("aria-expanded", "false");
        body.classList.remove("menu-open");
        setBackgroundInert(false);
        previousFocus?.focus();
        previousFocus = null;
    };

    menuButton?.addEventListener("click", openMenu);
    menuClose?.addEventListener("click", closeMenu);

    menu?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (!menu?.classList.contains("is-open")) return;

        if (event.key === "Escape") {
            closeMenu();
            return;
        }

        if (event.key !== "Tab") return;

        const focusable = getMenuFocusable();
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });

    const setFilter = (filter) => {
        let visibleCount = 0;

        filterButtons.forEach((button) => {
            const active = button.dataset.signalFilter === filter;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", String(active));
        });

        signalCards.forEach((card) => {
            const topics = (card.dataset.topics || "").split(/\s+/);
            const visible = filter === "all" || topics.includes(filter);
            card.hidden = !visible;
            if (visible) visibleCount += 1;
        });

        if (signalCount) {
            signalCount.textContent = `${visibleCount} ${visibleCount > 1 ? "signaux affichés" : "signal affiché"}`;
        }
    };

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            setFilter(button.dataset.signalFilter || "all");
        });
    });

    const revealElements = Array.from(document.querySelectorAll("[data-reveal]"));

    if (reducedMotion || !("IntersectionObserver" in window)) {
        revealElements.forEach((element) => element.classList.add("is-visible"));
    } else {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -7% 0px"
            }
        );

        revealElements.forEach((element) => revealObserver.observe(element));
    }

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

    const updateScrollEffects = () => {
        scrollFrame = null;
        nav?.classList.toggle("is-scrolled", window.scrollY > 20);

        if (!methodTrack || !methodProgress) return;

        const rect = methodTrack.getBoundingClientRect();
        const start = window.innerHeight * 0.72;
        const end = window.innerHeight * 0.3;
        const travel = Math.max(1, rect.height + start - end);
        const progress = clamp((start - rect.top) / travel, 0, 1);
        methodProgress.style.transform = `scaleY(${progress.toFixed(4)})`;

        methodSteps.forEach((step) => {
            const stepRect = step.getBoundingClientRect();
            step.classList.toggle("is-active", stepRect.top < window.innerHeight * 0.64);
        });
    };

    const scheduleScrollEffects = () => {
        if (scrollFrame) return;
        scrollFrame = requestAnimationFrame(updateScrollEffects);
    };

    window.addEventListener("scroll", scheduleScrollEffects, { passive: true });
    window.addEventListener("resize", scheduleScrollEffects, { passive: true });

    setFilter("all");
    updateScrollEffects();
});
