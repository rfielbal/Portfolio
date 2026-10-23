(() => {
    "use strict";

    const switchers = Array.from(document.querySelectorAll("[data-watch-switcher]"));
    if (!switchers.length) return;

    const closeDelay = 140;

    switchers.forEach((switcher) => {
        const trigger = switcher.querySelector(".watch-switcher-trigger");
        const panel = switcher.querySelector(".watch-switcher-panel");
        const options = Array.from(panel?.querySelectorAll("a[href]") || []);
        let closeTimer = 0;

        if (!trigger || !panel || !options.length) return;

        const cancelClose = () => {
            if (!closeTimer) return;
            window.clearTimeout(closeTimer);
            closeTimer = 0;
        };

        const open = ({ focus = false, last = false } = {}) => {
            cancelClose();
            switchers.forEach((other) => {
                if (other === switcher) return;
                other.classList.remove("is-open");
                other.querySelector(".watch-switcher-trigger")?.setAttribute("aria-expanded", "false");
                const otherPanel = other.querySelector(".watch-switcher-panel");
                if (otherPanel) {
                    otherPanel.setAttribute("aria-hidden", "true");
                    otherPanel.inert = true;
                }
            });

            switcher.classList.add("is-open");
            trigger.setAttribute("aria-expanded", "true");
            panel.setAttribute("aria-hidden", "false");
            panel.inert = false;

            if (focus) {
                (last ? options.at(-1) : options[0])?.focus({ preventScroll: true });
            }
        };

        const close = ({ restoreFocus = false } = {}) => {
            cancelClose();
            switcher.classList.remove("is-open");
            trigger.setAttribute("aria-expanded", "false");
            panel.setAttribute("aria-hidden", "true");
            panel.inert = true;
            if (restoreFocus) trigger.focus({ preventScroll: true });
        };

        const scheduleClose = () => {
            cancelClose();
            closeTimer = window.setTimeout(() => close(), closeDelay);
        };

        trigger.addEventListener("click", () => {
            if (switcher.classList.contains("is-open")) {
                close();
            } else {
                open();
            }
        });

        trigger.addEventListener("keydown", (event) => {
            if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
            event.preventDefault();
            open({ focus: true, last: event.key === "ArrowUp" });
        });

        switcher.addEventListener("pointerenter", (event) => {
            if (event.pointerType === "touch") return;
            open();
        });

        switcher.addEventListener("pointerleave", (event) => {
            if (event.pointerType === "touch") return;
            scheduleClose();
        });

        switcher.addEventListener("focusin", cancelClose);
        switcher.addEventListener("focusout", (event) => {
            if (!switcher.contains(event.relatedTarget)) scheduleClose();
        });

        switcher.addEventListener("keydown", (event) => {
            if (event.key !== "Escape") return;
            event.preventDefault();
            close({ restoreFocus: true });
        });

        document.addEventListener("pointerdown", (event) => {
            if (!switcher.contains(event.target)) close();
        }, { passive: true });

        window.addEventListener("resize", () => {
            if (window.matchMedia("(max-width: 980px)").matches) close();
        }, { passive: true });

        panel.inert = true;
    });
})();
