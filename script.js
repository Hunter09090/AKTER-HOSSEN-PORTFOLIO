/* =========================================================
   AKTER HOSSEN PORTFOLIO — STABLE SCRIPT SYSTEM
========================================================= */

(() => {
    "use strict";

    const init = () => {
        const navbar = document.getElementById("navbar");
        const menuToggle = document.getElementById("menu-toggle");
        const navMenu = document.getElementById("nav-menu");
        const scrollTop = document.getElementById("scroll-top");
        const footerYear = document.getElementById("footer-year");

        if (footerYear) {
            footerYear.textContent = String(new Date().getFullYear());
        }

        const closeMenu = () => {
            if (!navMenu || !menuToggle) return;
            navMenu.classList.remove("open");
            menuToggle.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        };

        if (menuToggle && navMenu) {
            menuToggle.addEventListener("click", (event) => {
                event.stopPropagation();
                const isOpen = navMenu.classList.toggle("open");
                menuToggle.classList.toggle("open", isOpen);
                menuToggle.setAttribute("aria-expanded", String(isOpen));
                menuToggle.setAttribute(
                    "aria-label",
                    isOpen ? "Close navigation menu" : "Open navigation menu"
                );
            });

            navMenu.querySelectorAll(".nav-link").forEach((link) => {
                link.addEventListener("click", closeMenu);
            });

            document.addEventListener("click", (event) => {
                if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                    closeMenu();
                }
            });

            document.addEventListener("keydown", (event) => {
                if (event.key === "Escape") closeMenu();
            });

            window.addEventListener("resize", () => {
                if (window.innerWidth > 950) closeMenu();
            }, { passive: true });
        }

        document.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener("click", (event) => {
                const targetId = link.getAttribute("href");
                if (!targetId || targetId === "#") return;

                const target = document.querySelector(targetId);
                if (!target) return;

                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                window.history.replaceState(null, "", targetId);
            });
        });

        const updateScrollState = () => {
            const scrolled = window.scrollY > 40;
            if (navbar) navbar.classList.toggle("scrolled", scrolled);
            if (scrollTop) scrollTop.classList.toggle("visible", window.scrollY > 600);
        };

        updateScrollState();
        window.addEventListener("scroll", updateScrollState, { passive: true });

        if (scrollTop) {
            scrollTop.addEventListener("click", () => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }

        const navLinks = [...document.querySelectorAll(".nav-link")];
        const sections = [...document.querySelectorAll("main section[id]")];

        if ("IntersectionObserver" in window && sections.length) {
            const sectionObserver = new IntersectionObserver((entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (!visible) return;
                navLinks.forEach((link) => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${visible.target.id}`
                    );
                });
            }, { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.1, 0.25] });

            sections.forEach((section) => sectionObserver.observe(section));
        }

        const revealElements = [
            ...document.querySelectorAll(
                ".section-heading, .about-text, .about-card, .timeline-item, " +
                ".experience-card, .skill-card, .project-card, .achievement-card, " +
                ".contact-intro, .contact-card, .contact-item, .certificate-intro, " +
                ".certificate-placeholder"
            )
        ];

        revealElements.forEach((element, index) => {
            element.setAttribute("data-reveal", "up");
            element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
        });

        if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                });
            }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

            revealElements.forEach((element) => revealObserver.observe(element));
        } else {
            revealElements.forEach((element) => element.classList.add("revealed"));
        }

        document.querySelectorAll('a[target="_blank"]').forEach((link) => {
            link.setAttribute("rel", "noopener noreferrer");
        });

        document.querySelectorAll("img").forEach((image) => {
            if (!image.hasAttribute("loading")) image.loading = "lazy";
            image.addEventListener("error", () => image.classList.add("image-error"), { once: true });
        });

        const heroImage = document.querySelector(".profile-photo");
        if (heroImage) heroImage.loading = "eager";
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }

    window.addEventListener("load", () => {
        const loader = document.getElementById("page-loader");
        if (!loader) return;
        loader.classList.add("loader-hidden");
        window.setTimeout(() => loader.remove(), 700);
    }, { once: true });
})();
