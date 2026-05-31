(() => {
    const revealNodes = [...document.querySelectorAll("[data-reveal]")];

    if (revealNodes.length === 0) {
        return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const assignRevealOrder = () => {
        const groupCounts = new WeakMap();

        revealNodes.forEach((node) => {
            const group = node.closest("[data-reveal-group]") ?? document.body;
            const order = groupCounts.get(group) ?? 0;

            node.style.setProperty("--reveal-order", String(order));
            groupCounts.set(group, order + 1);
        });
    };

    const revealAll = () => {
        revealNodes.forEach((node) => node.classList.add("reveal-in"));
    };

    const setupParallax = () => {
        const parallaxNodes = [...document.querySelectorAll("[data-parallax]")];

        if (parallaxNodes.length === 0) {
            return;
        }

        let frameId = 0;

        const update = () => {
            const viewportCenter = window.innerHeight / 2;

            parallaxNodes.forEach((node) => {
                const rect = node.getBoundingClientRect();

                if (rect.bottom < -120 || rect.top > window.innerHeight + 120) {
                    return;
                }

                const strength = Number(node.dataset.parallax || "0.06");
                const nodeCenter = rect.top + rect.height / 2;
                const distanceFromCenter = nodeCenter - viewportCenter;
                const offset = distanceFromCenter * strength * -0.18;

                node.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
            });

            frameId = 0;
        };

        const requestTick = () => {
            if (frameId !== 0) {
                return;
            }

            frameId = window.requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", requestTick, { passive: true });
        window.addEventListener("resize", requestTick);
    };

    assignRevealOrder();

    if (prefersReducedMotion.matches) {
        revealAll();
        return;
    }

    document.documentElement.classList.add("motion-ready");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("reveal-in");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.18,
                rootMargin: "0px 0px -10% 0px",
            },
        );

        revealNodes.forEach((node) => observer.observe(node));
    } else {
        revealAll();
    }

    setupParallax();

    prefersReducedMotion.addEventListener("change", (event) => {
        if (event.matches) {
            revealAll();
        }
    });
})();
