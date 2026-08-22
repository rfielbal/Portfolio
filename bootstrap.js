(() => {
    const root = document.documentElement;
    root.classList.add("js");

    const navigation = performance.getEntriesByType?.("navigation")?.[0];
    const legacyNavigationType = performance.navigation?.type;
    const navigationType = navigation?.type
        || (legacyNavigationType === 1
            ? "reload"
            : legacyNavigationType === 2
                ? "back_forward"
                : "navigate");
    const isReload = navigationType === "reload";
    const isHistoryRestore = navigationType === "back_forward";
    const oneShotSkipKey = "rfielbal:skip-next-preloader:v1";
    let shouldSkipOnce = false;
    let referrerUrl = null;

    try {
        shouldSkipOnce = window.sessionStorage.getItem(oneShotSkipKey) === "1";
        if (shouldSkipOnce) window.sessionStorage.removeItem(oneShotSkipKey);
    } catch {
        shouldSkipOnce = false;
    }

    try {
        referrerUrl = document.referrer ? new URL(document.referrer) : null;
    } catch {
        referrerUrl = null;
    }

    const isWatchReturn = Boolean(
        window.location.hash
        && referrerUrl?.origin === window.location.origin
        && /\/veille(?:\.html)?\/?$/i.test(referrerUrl.pathname)
    );
    const shouldPlayPreloader = isReload || (!isHistoryRestore && !shouldSkipOnce && !isWatchReturn);

    window.__portfolioShouldPlayPreloader = shouldPlayPreloader;
    window.__portfolioPreloaderReason = isReload
        ? "reload"
        : isHistoryRestore
            ? "history"
            : shouldSkipOnce
                ? "one-shot-skip"
                : isWatchReturn
                    ? "watch-return"
                    : "entry";
    root.classList.toggle("preloader-skip", !shouldPlayPreloader);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasProjectDestination = new URLSearchParams(window.location.search).has("projet");
    const isHeroDestination = !hasProjectDestination && (!window.location.hash || window.location.hash === "#home");
    const shouldPlayHeroIntro = shouldPlayPreloader && isHeroDestination && !reducedMotion;

    window.__portfolioShouldPlayHeroIntro = shouldPlayHeroIntro;
    root.classList.toggle("hero-intro-pending", shouldPlayHeroIntro);
    root.dataset.preloaderMode = window.__portfolioPreloaderReason;

    /*
     * Choose a safe rendering budget before the styles are parsed. The desktop
     * experience is paint-heavy; Windows and Linux often expose enough CPU/RAM
     * while still relying on a constrained integrated GPU or compositor.
     */
    const renderTierKey = "rfielbal:render-tier:v1";
    const platform = String(
        navigator.userAgentData?.platform
        || navigator.platform
        || ""
    ).toLowerCase();
    const isWindows = platform.includes("win");
    const isLinux = platform.includes("linux");
    const conservativeDesktopPlatform = isWindows || isLinux;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const hardwareConcurrency = navigator.hardwareConcurrency || 8;
    const deviceMemory = navigator.deviceMemory || 8;
    const desktopPointer = window.matchMedia("(min-width: 981px) and (hover: hover) and (pointer: fine)").matches;
    const constrainedDevice = reducedMotion
        || Boolean(connection?.saveData)
        || hardwareConcurrency <= 4
        || deviceMemory <= 4;
    let rememberedTier = "";

    try {
        rememberedTier = window.sessionStorage.getItem(renderTierKey) || "";
    } catch {
        rememberedTier = "";
    }

    let renderTier = !desktopPointer
        ? "high"
        : constrainedDevice
            ? "lite"
            : conservativeDesktopPlatform
                ? "balanced"
                : "high";

    if (desktopPointer && (rememberedTier === "lite" || (rememberedTier === "balanced" && renderTier === "high"))) {
        renderTier = rememberedTier;
    }

    root.dataset.renderTier = renderTier;
    root.dataset.renderPlatform = isWindows
        ? "windows"
        : isLinux
            ? "linux"
            : "other";
    window.__portfolioRenderTier = renderTier;
})();

window.setTimeout(() => {
    if (!document.documentElement.classList.contains("portfolio-ready")) {
        document.documentElement.classList.add("js-failed-open");
        document.documentElement.classList.remove("hero-intro-pending", "hero-intro-running");
    }
}, 4000);
