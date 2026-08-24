(() => {
    "use strict";

    if (window.portfolioMotionEngine) return;

    /* Rendering quality is selected once in bootstrap.js. This scheduler does
       not infer GPU performance from the cadence of scroll events. */
    const taskRecords = new Set();
    const root = document.documentElement;
    const finePointer = window.matchMedia("(pointer: fine)");
    let frame = null;
    let layoutVersion = 0;
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    let documentHeight = document.documentElement.scrollHeight;
    let pointerX = viewportWidth * 0.5;
    let pointerY = viewportHeight * 0.5;
    let scrollingUntil = 0;
    let scrollEndTimer = null;
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
        }, 180);
        mark("scroll");
    }, { passive: true });

    window.addEventListener("resize", invalidateLayout, { passive: true });
    window.addEventListener("pointermove", (event) => {
        /* Premium light, tilt and magnetic effects remain high-tier only. The
           lightweight visual cursor has its own isolated animation loop. */
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
        isScrolling() {
            return performance.now() < scrollingUntil;
        }
    };
})();
