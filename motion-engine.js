(() => {
    "use strict";

    if (window.portfolioMotionEngine) return;

    const taskRecords = new Set();
    const root = document.documentElement;
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopEffects = window.matchMedia("(min-width: 1181px) and (hover: hover) and (pointer: fine)");
    const renderTierKey = "rfielbal:render-tier:v1";
    let frame = null;
    let layoutVersion = 0;
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    let documentHeight = document.documentElement.scrollHeight;
    let pointerX = viewportWidth * 0.5;
    let pointerY = viewportHeight * 0.5;
    let scrollingUntil = 0;
    let scrollEndTimer = null;
    let lastScrollFrame = 0;
    let slowFrameWindows = 0;
    let scrollFrameDeltas = [];
    const dirty = {
        scroll: true,
        layout: true,
        pointer: true,
        force: true
    };
    const state = {
        timestamp: 0,
        scrollY: 0,
        viewportWidth,
        viewportHeight,
        documentHeight,
        pointerX,
        pointerY,
        layoutVersion,
        scrolling: false,
        scroll: true,
        layout: true,
        pointer: true,
        force: true
    };

    const hasDirtyWork = () => dirty.scroll || dirty.layout || dirty.pointer || dirty.force;

    const setRenderTier = (nextTier, reason = "runtime") => {
        const currentTier = root.dataset.renderTier || "high";
        const rank = { high: 2, balanced: 1, lite: 0 };
        if (!(nextTier in rank) || rank[nextTier] >= rank[currentTier]) return;

        root.dataset.renderTier = nextTier;
        root.dataset.renderReason = reason;
        window.__portfolioRenderTier = nextTier;

        try {
            window.sessionStorage.setItem(renderTierKey, nextTier);
        } catch {
            // The adaptive tier still works when storage is unavailable.
        }

        window.dispatchEvent(new CustomEvent("portfolio:render-tier-change", {
            detail: { tier: nextTier, previousTier: currentTier, reason }
        }));
        invalidateLayout();
    };

    const evaluateFrameBudget = () => {
        if (scrollFrameDeltas.length < 24 || reducedMotion.matches) {
            scrollFrameDeltas = [];
            return;
        }

        const sorted = [...scrollFrameDeltas].sort((first, second) => first - second);
        const average = scrollFrameDeltas.reduce((sum, value) => sum + value, 0) / scrollFrameDeltas.length;
        const p95 = sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95))];
        const slowWindow = average > 22 || p95 > 34;

        slowFrameWindows = slowWindow ? slowFrameWindows + 1 : Math.max(0, slowFrameWindows - 1);
        scrollFrameDeltas = [];

        if (slowFrameWindows < 2) return;
        slowFrameWindows = 0;
        const currentTier = root.dataset.renderTier || "high";
        setRenderTier(currentTier === "high" ? "balanced" : "lite", "frame-budget");
    };

    const recordScrollFrame = (timestamp) => {
        if (lastScrollFrame > 0) {
            const delta = timestamp - lastScrollFrame;
            if (delta >= 5 && delta < 180) scrollFrameDeltas.push(delta);
        }
        lastScrollFrame = timestamp;

        if (scrollFrameDeltas.length >= 48) evaluateFrameBudget();
    };

    const schedule = () => {
        if (!frame && !document.hidden) {
            frame = window.requestAnimationFrame(flush);
        }
    };

    const mark = (type) => {
        dirty[type] = true;
        schedule();
    };

    const flush = (timestamp) => {
        frame = null;

        const layoutDirty = dirty.layout;
        state.scroll = dirty.scroll;
        state.layout = layoutDirty;
        state.pointer = dirty.pointer;
        state.force = dirty.force;
        dirty.scroll = false;
        dirty.layout = false;
        dirty.pointer = false;
        dirty.force = false;

        if (layoutDirty) {
            viewportWidth = window.innerWidth;
            viewportHeight = window.innerHeight;
            documentHeight = document.documentElement.scrollHeight;
            layoutVersion += 1;
        }

        state.timestamp = timestamp;
        state.scrollY = window.scrollY;
        state.viewportWidth = viewportWidth;
        state.viewportHeight = viewportHeight;
        state.documentHeight = documentHeight;
        state.pointerX = pointerX;
        state.pointerY = pointerY;
        state.layoutVersion = layoutVersion;
        state.scrolling = timestamp < scrollingUntil;

        if (state.scroll && desktopEffects.matches && root.dataset.renderTier !== "lite") {
            recordScrollFrame(timestamp);
        }

        for (const record of taskRecords) {
            record.value = record.task.read?.(state);
        }

        for (const record of taskRecords) {
            record.task.write?.(state, record.value);
        }

        if (hasDirtyWork()) schedule();
    };

    const invalidateLayout = () => mark("layout");

    window.addEventListener("scroll", () => {
        scrollingUntil = performance.now() + 140;
        root.classList.add("is-scrolling");
        window.clearTimeout(scrollEndTimer);
        scrollEndTimer = window.setTimeout(() => {
            root.classList.remove("is-scrolling");
            lastScrollFrame = 0;
            evaluateFrameBudget();
        }, 180);
        mark("scroll");
    }, { passive: true });

    window.addEventListener("resize", invalidateLayout, { passive: true });
    window.addEventListener("pointermove", (event) => {
        /*
         * The custom pointer layers are part of the premium desktop tier only.
         * On balanced/lite machines the operating-system cursor stays outside
         * the main thread, so a busy frame can never make the pointer feel late.
         */
        if (!finePointer.matches || root.dataset.renderTier !== "high") return;
        pointerX = event.clientX;
        pointerY = event.clientY;
        mark("pointer");
    }, { passive: true });

    if ("ResizeObserver" in window && document.body) {
        const pageResizeObserver = new ResizeObserver(invalidateLayout);
        pageResizeObserver.observe(document.body);
    }

    window.addEventListener("load", invalidateLayout, { once: true });
    document.fonts?.ready.then(invalidateLayout);
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden && hasDirtyWork()) schedule();
    });

    window.portfolioMotionEngine = {
        register(task) {
            const record = { task, value: undefined };
            taskRecords.add(record);
            mark("force");
            return () => taskRecords.delete(record);
        },
        request() {
            mark("force");
        },
        invalidateLayout,
        setRenderTier,
        isScrolling() {
            return performance.now() < scrollingUntil;
        }
    };
})();
