window.__AETHERCORE_BOOTED__ = false;

if (window.location.protocol === "file:") {
    document.documentElement.classList.add("is-direct-file");
}

window.addEventListener("DOMContentLoaded", () => {
    window.setTimeout(() => {
        if (!window.__AETHERCORE_BOOTED__) {
            document.documentElement.classList.add("is-boot-failed");
        }
    }, 4000);
});
