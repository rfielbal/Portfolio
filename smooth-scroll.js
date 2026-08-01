(function () {
    "use strict";

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const interruptKeys = new Set([
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "End",
        "Home",
        "PageDown",
        "PageUp",
        " ",
        "Spacebar"
    ]);

    let animationFrame = null;
    let activeAnimation = null;

    const syncCurrentYear = () => {
        const year = String(new Date().getFullYear());

        document.querySelectorAll("[data-current-year]").forEach((element) => {
            element.textContent = year;

            if (element instanceof HTMLTimeElement) {
                element.dateTime = year;
            }
        });
    };

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

    const easeInOutCubic = (progress) => (
        progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2
    );

    const cancel = () => {
        const interruptedAnimation = activeAnimation;

        if (animationFrame !== null) {
            cancelAnimationFrame(animationFrame);
        }

        animationFrame = null;
        activeAnimation = null;
        interruptedAnimation?.resolve(false);
    };

    const getDuration = (distance) => clamp(980 + distance * 0.12, 1050, 1650);

    const toY = (targetY, options = {}) => {
        cancel();

        const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        const startY = window.scrollY;
        const endY = clamp(Math.round(targetY), 0, maxScroll);
        const distance = Math.abs(endY - startY);
        const finish = typeof options.onComplete === "function" ? options.onComplete : null;

        if (distance < 3 || reducedMotion.matches) {
            window.scrollTo(0, endY);
            finish?.();
            return Promise.resolve(true);
        }

        const duration = options.duration ?? getDuration(distance);

        return new Promise((resolve) => {
            const startedAt = performance.now();
            activeAnimation = { duration, endY, resolve };

            const step = (now) => {
                if (!activeAnimation) {
                    resolve(false);
                    return;
                }

                const progress = clamp((now - startedAt) / duration, 0, 1);
                const eased = easeInOutCubic(progress);
                window.scrollTo(0, startY + (endY - startY) * eased);

                if (progress < 1) {
                    animationFrame = requestAnimationFrame(step);
                    return;
                }

                window.scrollTo(0, endY);
                animationFrame = null;
                activeAnimation = null;
                finish?.();
                resolve(true);
            };

            animationFrame = requestAnimationFrame(step);
        });
    };

    const getNavigationOffset = () => {
        const navigation = document.querySelector("#navbar, #watch-nav");
        if (!navigation) return window.innerWidth > 980 ? 88 : 72;

        return Math.max(20, Math.ceil(navigation.getBoundingClientRect().bottom + 12));
    };

    const getElementY = (element, hash = "") => {
        if (hash === "#home" || hash === "#top") return 0;
        return element.getBoundingClientRect().top + window.scrollY - getNavigationOffset();
    };

    const updateHash = (hash) => {
        if (!hash || window.location.hash === hash) return;
        window.history.pushState(null, "", hash);
    };

    const toElement = (element, options = {}) => {
        if (!element) return Promise.resolve(false);

        const hash = options.hash || "";
        if (options.updateHistory !== false) updateHash(hash);

        return toY(getElementY(element, hash), {
            duration: options.duration,
            onComplete: () => {
                if (options.focusTarget) {
                    if (!element.hasAttribute("tabindex")) element.setAttribute("tabindex", "-1");
                    element.focus({ preventScroll: true });
                }

                options.onComplete?.();
            }
        });
    };

    const findHashTarget = (hash) => {
        if (!hash || hash === "#") return null;

        try {
            return document.getElementById(decodeURIComponent(hash.slice(1)));
        } catch (_error) {
            return null;
        }
    };

    document.addEventListener("click", (event) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        const anchor = event.target.closest("a[href]");
        if (!anchor || anchor.classList.contains("skip-link") || anchor.hasAttribute("download") || anchor.target === "_blank" || anchor.dataset.noSmoothScroll !== undefined) return;

        const url = new URL(anchor.href, window.location.href);
        const isSameDocument = url.origin === window.location.origin
            && url.pathname === window.location.pathname
            && url.search === window.location.search;

        if (!isSameDocument) return;

        const target = findHashTarget(url.hash);
        if (!target) return;

        event.preventDefault();
        toElement(target, {
            hash: url.hash
        });
    });

    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("pointerdown", cancel, { passive: true });
    window.addEventListener("keydown", (event) => {
        if (interruptKeys.has(event.key)) cancel();
    });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", syncCurrentYear, { once: true });
    } else {
        syncCurrentYear();
    }

    window.SiteSmoothScroll = Object.freeze({
        cancel,
        getState: () => activeAnimation ? {
            duration: activeAnimation.duration,
            endY: activeAnimation.endY
        } : null,
        toElement,
        toY
    });
})();
