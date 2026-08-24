(() => {
    "use strict";

    const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

    const initCinematicPortfolio = () => {
        const root = document.documentElement;
        const motionEngine = window.portfolioMotionEngine;
        const hero = document.getElementById("home");
        const canvas = document.getElementById("cinematic-canvas");
        const projectCinema = document.getElementById("project-cinema");
        const cinemaSection = document.getElementById("projects");
        const cinemaHeading = projectCinema?.querySelector(".cinema-heading");
        const cinemaProgressFill = projectCinema?.querySelector(".cinema-progress i");
        const cinemaCards = Array.from(document.querySelectorAll("[data-cinema-card]"));
        const cinemaButtons = Array.from(document.querySelectorAll("[data-cinema-open]"));
        const cinemaCurrent = document.getElementById("cinema-current");
        const cinemaStatus = document.getElementById("cinema-status");
        const cinemaDirectOpen = document.getElementById("cinema-direct-open");
        const watchPortal = document.querySelector(".watch-portal");
        const watchArrowLink = document.querySelector("[data-watch-arrow]");
        const terminalStage = hero?.querySelector(".profile-stage");

        if (!motionEngine || !hero || !projectCinema) {
            if (canvas) canvas.hidden = true;
            root.classList.remove("cinematic-ready");
            return;
        }

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)");
        const desktopCinema = window.matchMedia("(min-width: 1181px) and (hover: hover) and (pointer: fine)");
        const compactCinema = window.matchMedia("(max-width: 1180px), (hover: none), (pointer: coarse)");
        const saveData = Boolean(navigator.connection?.saveData);
        const renderTier = root.dataset.renderTier || "high";
        const cardStatus = [
            "WHEELLO / CLIENT SYSTEM",
            "JESSICA DEW / CLIENT EXPERIENCE",
            "STREAMCORNER / FULL-STACK COMMERCE",
            "REVALOOP / PRODUCT SYSTEM"
        ];

        const cards = cinemaCards.map((element) => ({
            element,
            button: element.querySelector("[data-cinema-open]"),
            image: element.querySelector(".cinema-card-media img"),
            copy: element.querySelector(".cinema-card-copy"),
            title: element.querySelector("h3")?.textContent.trim() || "ce projet",
            rendered: Object.create(null)
        }));

        let cinemaMediaPrepared = false;
        let cinemaMediaObserver = null;

        const configureCinemaMediaBudget = () => {
            if (renderTier === "high") return;

            cards.forEach(({ image }) => {
                const fullSource = image?.getAttribute("src");
                if (!image || !fullSource || image.dataset.cinemaFullSource) return;

                image.dataset.cinemaFullSource = fullSource;
                image.loading = "lazy";
                image.fetchPriority = "low";
                image.setAttribute(
                    "src",
                    fullSource.replace(/cover\.webp(?=([?#]|$))/, "thumb.webp")
                );
            });
        };

        configureCinemaMediaBudget();

        const prepareCinemaMedia = () => {
            if (cinemaMediaPrepared || saveData || renderTier !== "high") return;
            cinemaMediaPrepared = true;
            cinemaMediaObserver?.disconnect();
            cinemaMediaObserver = null;

            const images = cards.map(({ image }) => image).filter(Boolean);
            const prepareNextImage = async (index = 0) => {
                const image = images[index];
                if (!image) return;

                image.loading = "eager";
                image.fetchPriority = "low";
                try {
                    await image.decode?.();
                } catch {
                    // The browser can still paint the image through its normal load path.
                }

                if (index + 1 >= images.length) return;
                if ("requestIdleCallback" in window) {
                    window.requestIdleCallback(() => prepareNextImage(index + 1), { timeout: 700 });
                } else {
                    window.setTimeout(() => prepareNextImage(index + 1), 40);
                }
            };

            prepareNextImage();
        };

        const armCinemaMedia = () => {
            if (
                cinemaMediaPrepared ||
                cinemaMediaObserver ||
                saveData ||
                renderTier !== "high" ||
                reducedMotion.matches ||
                (!desktopCinema.matches && !compactCinema.matches)
            ) return;

            if (!("IntersectionObserver" in window)) {
                window.requestIdleCallback?.(prepareCinemaMedia, { timeout: 1800 });
                return;
            }

            cinemaMediaObserver = new IntersectionObserver((entries) => {
                if (entries.some((entry) => entry.isIntersecting)) prepareCinemaMedia();
            }, {
                rootMargin: "90% 0px",
                threshold: 0
            });
            cinemaMediaObserver.observe(cinemaSection || projectCinema);
        };

        let cinemaEnabled = false;
        let cinemaCompact = false;
        let activeCardIndex = -1;
        let cachedLayoutVersion = -1;
        let geometry = null;
        let heroProgress = 0;
        let renderedHeroProgress = -1;
        let renderedCinemaProgress = -1;
        let renderedHeroNear = null;
        let renderedCinemaNear = null;
        let renderedPointerX = null;
        let renderedPointerY = null;

        const setCardAccessibility = (activeIndex, exposeAll = false) => {
            cards.forEach(({ element, button }, index) => {
                const containsFocus = element.contains(document.activeElement);
                const accessible = exposeAll || index === activeIndex || containsFocus;

                element.toggleAttribute("inert", !accessible);
                if (accessible) element.removeAttribute("aria-hidden");
                else element.setAttribute("aria-hidden", "true");
                if (button) button.tabIndex = accessible ? 0 : -1;
                element.style.pointerEvents = accessible ? "auto" : "none";
            });
        };

        const resetCinemaCards = () => {
            cards.forEach(({ element, image, copy, rendered }) => {
                ["transform", "opacity", "z-index", "pointer-events"].forEach((property) => {
                    element.style.removeProperty(property);
                });
                image?.style.removeProperty("transform");
                copy?.style.removeProperty("transform");
                copy?.style.removeProperty("opacity");
                element.classList.remove("is-front", "is-adjacent");
                Object.keys(rendered).forEach((key) => delete rendered[key]);
            });

            cinemaHeading?.style.removeProperty("transform");
            cinemaHeading?.style.removeProperty("opacity");
            cinemaProgressFill?.style.removeProperty("transform");
            setCardAccessibility(0, true);
            activeCardIndex = -1;
            renderedCinemaProgress = -1;
        };

        const syncCinemaMode = () => {
            const nextEnabled = (desktopCinema.matches || compactCinema.matches) && !reducedMotion.matches;
            const nextCompact = nextEnabled && !desktopCinema.matches;
            if (nextEnabled === cinemaEnabled && nextCompact === cinemaCompact) return;

            resetCinemaCards();
            cinemaEnabled = nextEnabled;
            cinemaCompact = nextCompact;
            root.classList.toggle("cinematic-ready", cinemaEnabled);
            root.classList.toggle("cinematic-compact", cinemaCompact);

            if (cinemaEnabled) setCardAccessibility(0);

            cachedLayoutVersion = -1;
            motionEngine.invalidateLayout();
        };

        const measureGeometry = (state) => {
            const box = (element) => {
                const rect = element.getBoundingClientRect();
                const top = rect.top + state.scrollY;
                return {
                    top,
                    bottom: top + rect.height,
                    height: rect.height,
                    left: rect.left,
                    width: rect.width
                };
            };

            geometry = {
                hero: box(hero),
                cinema: box(projectCinema)
            };
            cachedLayoutVersion = state.layoutVersion;
        };

        const computeCardFrame = (position, index, state) => {
            const delta = index - position;

            if (cinemaCompact) {
                const exit = clamp(-delta, 0, 1);
                const depth = clamp(delta, 0, 3);
                const copyDistance = Math.abs(delta);
                const compactTravel = Math.min(state.viewportHeight * 0.13, 112);
                const x = (-state.viewportWidth * 0.1 * exit) + (depth * 2);
                const y = (-compactTravel * exit) + (depth * 18);
                const z = (-120 * exit) - (depth * 70);
                const rotateY = -4 * exit;
                const rotateZ = (-2.5 * exit) + (depth * 0.35);
                const scale = Math.max(0.82, 1 - (exit * 0.06) - (depth * 0.035));
                const opacity = delta < 0
                    ? clamp(1 - (exit * 1.25))
                    : Math.max(0.18, 1 - (depth * 0.28));
                const copyOpacity = 1 - clamp((copyDistance - 0.12) / 0.58);
                const imageScale = 1.03 + (Math.min(copyDistance, 1) * 0.025);

                return {
                    transform: `translate3d(-50%, -50%, 0) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(2)}deg) scale(${scale.toFixed(4)})`,
                    opacity: opacity.toFixed(4),
                    zIndex: String(1000 - index),
                    imageTransform: `scale(${imageScale.toFixed(4)})`,
                    copyOpacity: copyOpacity.toFixed(4),
                    copyTransform: `translate3d(0, ${Math.min(copyDistance, 1) * 10}px, 0)`
                };
            }

            if (renderTier !== "high") {
                const exit = clamp(-delta, 0, 1.15);
                const depth = clamp(delta, 0, 2.2);
                const copyDistance = Math.abs(delta);
                const lite = renderTier === "lite";
                const travel = Math.min(state.viewportWidth * (lite ? 0.2 : 0.34), lite ? 260 : 520);
                const x = (-travel * exit) + (depth * (lite ? 6 : 14));
                const y = (-state.viewportHeight * 0.035 * exit) + (depth * (lite ? 7 : 12));
                const scale = Math.max(lite ? 0.92 : 0.87, 1 - (exit * 0.025) - (depth * (lite ? 0.02 : 0.032)));
                const opacity = delta < 0
                    ? clamp(1 - (exit * 1.5))
                    : Math.max(lite ? 0.06 : 0.16, 1 - (depth * (lite ? 0.52 : 0.34)));
                const copyOpacity = 1 - clamp((copyDistance - 0.1) / (lite ? 0.42 : 0.54));

                return {
                    transform: `translate(-50%, -50%) translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) scale(${scale.toFixed(4)})`,
                    opacity: opacity.toFixed(4),
                    zIndex: String(delta < 0 ? 800 - index : 1000 - index),
                    imageTransform: `scale(${(1.025 + Math.min(copyDistance, 1) * 0.018).toFixed(4)})`,
                    copyOpacity: copyOpacity.toFixed(4),
                    copyTransform: `translateY(${Math.min(copyDistance, 1) * 8}px)`
                };
            }

            const visualDelta = clamp(delta, -1.05, 2.2);
            let x = 0;
            let y = 0;
            let z = 0;
            let rotateX = 0;
            let rotateY = 0;
            let rotateZ = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 1000;

            if (visualDelta < 0) {
                const exit = clamp(-visualDelta);
                const travel = Math.min(state.viewportWidth * 0.78, 1280);
                x = -travel * Math.pow(exit, 0.82);
                y = -state.viewportHeight * 0.12 * exit;
                z = -310 * exit;
                rotateX = 3 * exit;
                rotateY = -24 * exit;
                rotateZ = -4 * exit;
                scale = 1 - (0.08 * exit);
                opacity = clamp(1 - (exit * 1.42));
                zIndex = 800 - index;
            } else {
                const depth = visualDelta;
                x = depth * 34;
                y = depth * 28;
                z = depth * -165;
                rotateX = depth * -0.8;
                rotateY = depth * -4.8;
                rotateZ = depth * 1.1;
                scale = Math.max(0.81, 1 - (depth * 0.052));
                opacity = Math.max(0.24, 1 - (depth * 0.2));
                zIndex = 1000 - index;
            }

            const copyDistance = Math.abs(delta);
            const copyOpacity = 1 - clamp((copyDistance - 0.12) / 0.56);
            const imageScale = 1.06 + (Math.min(Math.abs(delta), 1) * 0.035);
            const imageX = clamp(-delta, -1, 1) * 2.8;

            return {
                transform: `translate3d(-50%, -50%, 0) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(2)}deg) scale(${scale.toFixed(4)})`,
                opacity: opacity.toFixed(4),
                zIndex: String(zIndex),
                imageTransform: `scale(${imageScale.toFixed(4)}) translate3d(${imageX.toFixed(2)}%, 0, 0)`,
                copyOpacity: copyOpacity.toFixed(4),
                copyTransform: `translate3d(0, ${Math.min(copyDistance, 1) * 14}px, 0)`
            };
        };

        const readMotionFrame = (state) => {
            if (!geometry || cachedLayoutVersion !== state.layoutVersion) {
                measureGeometry(state);
            }

            const heroNear = state.scrollY < geometry.hero.bottom + state.viewportHeight
                && state.scrollY + state.viewportHeight > geometry.hero.top;
            const cinemaNear = cinemaEnabled
                && state.scrollY < geometry.cinema.bottom + (state.viewportHeight * 0.9)
                && state.scrollY + (state.viewportHeight * 1.2) > geometry.cinema.top;
            const pointerFrame = state.pointer && heroNear && !reducedMotion.matches
                && renderTier === "high"
                ? {
                    x: clamp((((state.pointerX - geometry.hero.left) / Math.max(1, geometry.hero.width)) * 2) - 1, -1, 1),
                    y: clamp(((state.pointerY / Math.max(1, state.viewportHeight)) * 2) - 1, -1, 1)
                }
                : null;

            if (!(state.scroll || state.layout || state.force)) {
                return { pointerFrame };
            }

            const nextHeroProgress = !desktopCinema.matches || reducedMotion.matches
                ? 0
                : clamp((state.scrollY - geometry.hero.top) / Math.max(1, geometry.hero.height - state.viewportHeight));
            let cinemaFrame = null;

            if (cinemaNear) {
                const rawProgress = clamp((state.scrollY - geometry.cinema.top) / Math.max(1, geometry.cinema.height - state.viewportHeight));
                const directedProgress = clamp((rawProgress - 0.055) / 0.89);
                const position = directedProgress * (cards.length - 1);
                const nextActiveIndex = Math.min(cards.length - 1, Math.max(0, Math.round(position)));

                cinemaFrame = {
                    rawProgress,
                    activeIndex: nextActiveIndex,
                    cards: cards.map((_card, index) => computeCardFrame(position, index, state))
                };
            }

            return {
                pointerFrame,
                heroProgress: nextHeroProgress,
                heroNear,
                cinemaNear,
                cinemaFrame
            };
        };

        const writeCachedStyle = (record, key, target, property, value) => {
            if (!target || record.rendered[key] === value) return;
            record.rendered[key] = value;
            target.style.setProperty(property, value);
        };

        const writeMotionFrame = (_state, frame) => {
            if (!frame) return;

            if (frame.pointerFrame) {
                const pointerX = frame.pointerFrame.x.toFixed(4);
                const pointerY = frame.pointerFrame.y.toFixed(4);
                if (pointerX !== renderedPointerX) {
                    renderedPointerX = pointerX;
                    hero.style.setProperty("--pointer-x", pointerX);
                }
                if (pointerY !== renderedPointerY) {
                    renderedPointerY = pointerY;
                    hero.style.setProperty("--pointer-y", pointerY);
                }
            }

            if (typeof frame.heroProgress !== "number") return;

            if (frame.heroNear !== renderedHeroNear) {
                renderedHeroNear = frame.heroNear;
                hero.classList.toggle("is-motion-near", frame.heroNear);
            }

            if (Math.abs(frame.heroProgress - renderedHeroProgress) > 0.001) {
                renderedHeroProgress = frame.heroProgress;
                heroProgress = frame.heroProgress;
                hero.style.setProperty("--hero-progress", frame.heroProgress.toFixed(4));
            }

            if (frame.cinemaNear !== renderedCinemaNear) {
                renderedCinemaNear = frame.cinemaNear;
                cinemaSection?.classList.toggle("is-motion-near", frame.cinemaNear);
            }

            if (!frame.cinemaFrame) return;

            const { rawProgress, activeIndex, cards: cardFrames } = frame.cinemaFrame;
            if (Math.abs(rawProgress - renderedCinemaProgress) > 0.0005) {
                renderedCinemaProgress = rawProgress;
                if (cinemaHeading) {
                    const headingOpacity = cinemaCompact
                        ? 0.92 - (rawProgress * 0.12)
                        : 0.78 - (rawProgress * 0.38);
                    const headingTravel = cinemaCompact ? -8 : -34;
                    cinemaHeading.style.opacity = headingOpacity.toFixed(4);
                    const headingOffset = (rawProgress * headingTravel).toFixed(2);
                    cinemaHeading.style.transform = renderTier === "high" || cinemaCompact
                        ? `translate3d(0, ${headingOffset}px, 0)`
                        : `translateY(${headingOffset}px)`;
                }
                if (cinemaProgressFill) {
                    cinemaProgressFill.style.transform = `scaleX(${rawProgress.toFixed(4)})`;
                }
            }

            cards.forEach((record, index) => {
                if (renderTier !== "high" && Math.abs(index - activeIndex) > 1) return;
                const cardFrame = cardFrames[index];
                writeCachedStyle(record, "transform", record.element, "transform", cardFrame.transform);
                writeCachedStyle(record, "opacity", record.element, "opacity", cardFrame.opacity);
                writeCachedStyle(record, "zIndex", record.element, "z-index", cardFrame.zIndex);
                writeCachedStyle(record, "imageTransform", record.image, "transform", cardFrame.imageTransform);
                writeCachedStyle(record, "copyOpacity", record.copy, "opacity", cardFrame.copyOpacity);
                writeCachedStyle(record, "copyTransform", record.copy, "transform", cardFrame.copyTransform);
            });

            if (activeIndex !== activeCardIndex) {
                activeCardIndex = activeIndex;
                const activeCard = cards[activeCardIndex]?.element;
                const rgb = activeCard?.style.getPropertyValue("--card-rgb").trim() || "67, 223, 255";

                cinemaSection?.style.setProperty("--cinema-rgb", rgb);
                setCardAccessibility(activeCardIndex);
                cards.forEach(({ element }, index) => {
                    element.classList.toggle("is-front", index === activeCardIndex);
                    element.classList.toggle("is-adjacent", Math.abs(index - activeCardIndex) <= 1);
                });

                if (cinemaCurrent) cinemaCurrent.textContent = String(activeCardIndex + 1).padStart(2, "0");
                if (cinemaStatus) cinemaStatus.textContent = cardStatus[activeCardIndex] || "SELECTED SYSTEM";
                if (cinemaDirectOpen) {
                    const activeRecord = cards[activeCardIndex];
                    cinemaDirectOpen.dataset.cinemaOpen = activeRecord?.element.dataset.projectId || "";
                    cinemaDirectOpen.href = activeRecord?.button?.getAttribute("href") || "#projects-index";
                    cinemaDirectOpen.setAttribute("aria-label", `Voir le projet ${activeRecord?.title || "sélectionné"}`);
                }
            }
        };

        cinemaButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                if (
                    button instanceof HTMLAnchorElement
                    && (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
                ) return;

                event.preventDefault();
                document.dispatchEvent(new CustomEvent("portfolio:open-project", {
                    detail: { id: button.dataset.cinemaOpen, opener: button }
                }));
            });
        });

        cards.forEach(({ element }) => {
            element.addEventListener("focusout", () => {
                window.requestAnimationFrame(() => {
                    if (cinemaEnabled && !element.contains(document.activeElement)) {
                        setCardAccessibility(activeCardIndex);
                    }
                });
            });
        });

        const setupTerminalMotion = () => {
            if (!terminalStage) return;

            let terminalVisible = !("IntersectionObserver" in window);

            const syncTerminalMotion = () => {
                hero.classList.toggle(
                    "is-terminal-visible",
                    terminalVisible && !document.hidden
                );
            };

            if ("IntersectionObserver" in window) {
                const terminalObserver = new IntersectionObserver(([entry]) => {
                    terminalVisible = entry.isIntersecting;
                    syncTerminalMotion();
                }, {
                    rootMargin: "0px",
                    threshold: 0.01
                });
                terminalObserver.observe(terminalStage);
            } else {
                syncTerminalMotion();
            }

            document.addEventListener("visibilitychange", syncTerminalMotion);
        };

        const setupWatchPortalMotion = () => {
            if (!watchPortal) return;

            let radarVisible = !("IntersectionObserver" in window);

            const syncRadarMotion = () => {
                watchPortal.classList.toggle(
                    "is-radar-active",
                    radarVisible && !reducedMotion.matches && !document.hidden
                );
            };

            if ("IntersectionObserver" in window) {
                const radarObserver = new IntersectionObserver(([entry]) => {
                    radarVisible = entry.isIntersecting;
                    syncRadarMotion();
                }, {
                    rootMargin: "0px",
                    threshold: 0.01
                });
                radarObserver.observe(watchPortal);
            } else {
                syncRadarMotion();
            }

            reducedMotion.addEventListener?.("change", syncRadarMotion);
            document.addEventListener("visibilitychange", syncRadarMotion);

            if (!watchArrowLink || renderTier !== "high") return;

            let arrowFrame = 0;
            let arrowRect = null;
            let arrowX = 0;
            let arrowY = 0;

            const renderArrow = () => {
                arrowFrame = 0;
                watchArrowLink.style.setProperty("--watch-arrow-x", `${arrowX.toFixed(2)}px`);
                watchArrowLink.style.setProperty("--watch-arrow-y", `${arrowY.toFixed(2)}px`);
            };

            const scheduleArrow = () => {
                if (!arrowFrame) arrowFrame = window.requestAnimationFrame(renderArrow);
            };

            const resetArrow = () => {
                watchArrowLink.classList.remove("is-arrow-tracking");
                arrowRect = null;
                arrowX = 0;
                arrowY = 0;
                scheduleArrow();
            };

            watchArrowLink.addEventListener("pointerenter", () => {
                if (renderTier !== "high" || reducedMotion.matches || coarsePointer.matches) return;
                arrowRect = watchArrowLink.getBoundingClientRect();
                watchArrowLink.classList.add("is-arrow-tracking");
            }, { passive: true });

            watchArrowLink.addEventListener("pointermove", (event) => {
                if (renderTier !== "high" || reducedMotion.matches || coarsePointer.matches) return;
                arrowRect ||= watchArrowLink.getBoundingClientRect();
                const normalizedX = clamp(((event.clientX - arrowRect.left) / Math.max(1, arrowRect.width)) * 2 - 1, -1, 1);
                const normalizedY = clamp(((event.clientY - arrowRect.top) / Math.max(1, arrowRect.height)) * 2 - 1, -1, 1);
                arrowX = normalizedX * 11;
                arrowY = normalizedY * 7;
                scheduleArrow();
            }, { passive: true });

            watchArrowLink.addEventListener("pointerleave", resetArrow, { passive: true });
            watchArrowLink.addEventListener("blur", resetArrow);
            window.addEventListener("resize", () => {
                arrowRect = null;
            }, { passive: true });
            reducedMotion.addEventListener?.("change", resetArrow);
            coarsePointer.addEventListener?.("change", resetArrow);
        };

        const setupCanvas = () => {
            if (!canvas) return;

            const context = canvas.getContext("2d", { alpha: true });
            if (!context) {
                canvas.hidden = true;
                return;
            }

            const lowPowerDevice = (navigator.hardwareConcurrency || 8) <= 4
                || (navigator.deviceMemory || 8) <= 4;
            const particleCount = lowPowerDevice ? 28 : 42;
            const particles = Array.from({ length: particleCount }, (_, index) => ({
                angle: (index / particleCount) * Math.PI * 2 + (Math.random() * 0.16),
                radius: 0.34 + (Math.random() * 0.62),
                depth: Math.random(),
                speed: 0.14 + (Math.random() * 0.26),
                size: 0.55 + (Math.random() * 1.45),
                cyan: index % 5 !== 0
            }));
            const pointX = new Float32Array(particleCount);
            const pointY = new Float32Array(particleCount);
            let canvasWidth = 0;
            let canvasHeight = 0;
            let canvasVisible = false;
            let canvasFrame = 0;
            let lastDrawTime = 0;

            const canvasAllowed = () => desktopCinema.matches
                && renderTier === "high"
                && !reducedMotion.matches
                && !coarsePointer.matches
                && !saveData
                && !document.body.classList.contains("preloader-active");

            const resizeCanvas = () => {
                if (!canvasAllowed()) return;
                const rect = canvas.getBoundingClientRect();
                const dpr = Math.min(window.devicePixelRatio || 1, lowPowerDevice ? 1 : 1.25);
                const width = Math.max(1, Math.round(rect.width));
                const height = Math.max(1, Math.round(rect.height));
                const pixelWidth = Math.round(width * dpr);
                const pixelHeight = Math.round(height * dpr);

                if (canvas.width === pixelWidth && canvas.height === pixelHeight) return;
                canvasWidth = width;
                canvasHeight = height;
                canvas.width = pixelWidth;
                canvas.height = pixelHeight;
                context.setTransform(dpr, 0, 0, dpr, 0, 0);
            };

            const stopCanvas = () => {
                if (!canvasFrame) return;
                window.cancelAnimationFrame(canvasFrame);
                canvasFrame = 0;
            };

            const drawCanvas = (timestamp) => {
                canvasFrame = 0;
                if (!canvasVisible || document.hidden || !canvasAllowed()) return;

                const minimumFrameTime = motionEngine.isScrolling() ? 50 : 33;
                if (timestamp - lastDrawTime < minimumFrameTime) {
                    canvasFrame = window.requestAnimationFrame(drawCanvas);
                    return;
                }
                lastDrawTime = timestamp;

                context.clearRect(0, 0, canvasWidth, canvasHeight);
                context.save();
                context.globalCompositeOperation = "lighter";

                const time = timestamp * 0.00016;
                const centerX = canvasWidth * (0.72 + Number(renderedPointerX || 0) * 0.018);
                const centerY = canvasHeight * (0.43 + Number(renderedPointerY || 0) * 0.014);
                const baseRadius = Math.min(canvasWidth, canvasHeight) * (0.27 + heroProgress * 0.045);

                for (let index = 0; index < particleCount; index += 1) {
                    const particle = particles[index];
                    const angle = particle.angle + (time * particle.speed);
                    const radius = baseRadius * particle.radius;
                    const wave = Math.sin((angle * 3) + (time * 2.1) + (particle.depth * 4)) * 18;
                    pointX[index] = centerX + (Math.cos(angle) * (radius + wave));
                    pointY[index] = centerY + (Math.sin(angle) * (radius * 0.46)) + ((particle.depth - 0.5) * 90);
                }

                context.beginPath();
                context.moveTo(pointX[0], pointY[0]);
                for (let index = 1; index < particleCount; index += 1) {
                    context.lineTo(pointX[index], pointY[index]);
                }
                context.closePath();
                context.strokeStyle = "rgba(83, 205, 224, 0.075)";
                context.lineWidth = 0.65;
                context.stroke();

                for (let colorPass = 0; colorPass < 2; colorPass += 1) {
                    const cyan = colorPass === 0;
                    context.beginPath();
                    for (let index = 0; index < particleCount; index += 1) {
                        const particle = particles[index];
                        if (particle.cyan !== cyan) continue;
                        context.moveTo(pointX[index] + particle.size, pointY[index]);
                        context.arc(pointX[index], pointY[index], particle.size, 0, Math.PI * 2);
                    }
                    context.fillStyle = cyan
                        ? "rgba(143, 235, 255, 0.54)"
                        : "rgba(204, 255, 0, 0.44)";
                    context.fill();
                }

                context.restore();
                canvasFrame = window.requestAnimationFrame(drawCanvas);
            };

            const startCanvas = () => {
                if (!canvasFrame && canvasVisible && !document.hidden && canvasAllowed()) {
                    canvasFrame = window.requestAnimationFrame(drawCanvas);
                }
            };

            const syncCanvas = () => {
                const allowed = canvasAllowed();
                canvas.hidden = !allowed;
                if (!allowed) {
                    stopCanvas();
                    return;
                }
                resizeCanvas();
                startCanvas();
            };

            const canvasObserver = new IntersectionObserver(([entry]) => {
                canvasVisible = entry.isIntersecting;
                if (canvasVisible) startCanvas();
                else stopCanvas();
            }, { rootMargin: "0px", threshold: 0 });
            canvasObserver.observe(hero);

            if ("ResizeObserver" in window) {
                const canvasResizeObserver = new ResizeObserver(resizeCanvas);
                canvasResizeObserver.observe(canvas);
            } else {
                window.addEventListener("resize", resizeCanvas, { passive: true });
            }

            document.addEventListener("visibilitychange", () => {
                if (document.hidden) stopCanvas();
                else startCanvas();
            });
            window.addEventListener("portfolio:preloader-exit", syncCanvas);
            reducedMotion.addEventListener?.("change", syncCanvas);
            coarsePointer.addEventListener?.("change", syncCanvas);
            desktopCinema.addEventListener?.("change", syncCanvas);
            syncCanvas();
        };

        motionEngine.register({
            read: readMotionFrame,
            write: writeMotionFrame
        });

        reducedMotion.addEventListener?.("change", syncCinemaMode);
        desktopCinema.addEventListener?.("change", syncCinemaMode);
        compactCinema.addEventListener?.("change", syncCinemaMode);
        reducedMotion.addEventListener?.("change", armCinemaMedia);
        desktopCinema.addEventListener?.("change", armCinemaMedia);
        compactCinema.addEventListener?.("change", armCinemaMedia);
        syncCinemaMode();
        armCinemaMedia();
        setupTerminalMotion();
        setupWatchPortalMotion();
        setupCanvas();
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initCinematicPortfolio, { once: true });
    } else {
        initCinematicPortfolio();
    }
})();
