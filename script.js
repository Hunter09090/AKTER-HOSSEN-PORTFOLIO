/* =========================================================
   AKTER HOSSEN PORTFOLIO — COMPLETE SCRIPT SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01 — ELEMENTS & VARIABLES
    ===================================================== */
    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const scrollTop = document.getElementById("scroll-top");
    const footerYear = document.getElementById("footer-year");


    /* =====================================================
       02 — FOOTER YEAR
    ===================================================== */
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       03 — MOBILE MENU BULLETPROOF TOGGLE
    ===================================================== */
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.toggle("open");
            menuToggle.classList.toggle("open", isOpen);
            menuToggle.setAttribute("aria-expanded", isOpen);
        });

        // Close menu after clicking a link inside mobile menu
        navMenu.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                menuToggle.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove("open");
                menuToggle.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }


    /* =====================================================
       04 — SMOOTH INTERNAL NAVIGATION
    ===================================================== */
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });


    /* =====================================================
       05 — NAVBAR SCROLL EFFECT
    ===================================================== */
    function updateNavbar() {
        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    updateNavbar();


    /* =====================================================
       06 — SCROLL TO TOP VISIBILITY
    ===================================================== */
    function updateScrollTop() {
        if (!scrollTop) return;

        if (window.scrollY > 600) {
            scrollTop.classList.add("visible");
        } else {
            scrollTop.classList.remove("visible");
        }
    }

    if (scrollTop) {
        scrollTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    /* =====================================================
       07 — ACTIVE NAVIGATION SECTION OBSERVER
    ===================================================== */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const currentId = entry.target.id;

                navLinks.forEach((link) => {
                    const href = link.getAttribute("href");
                    link.classList.toggle("active", href === `#${currentId}`);
                });
            });
        },
        {
            rootMargin: "-30% 0px -55% 0px",
            threshold: 0
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });


    /* =====================================================
       08 — SCROLL REVEAL SYSTEM SETUP
    ===================================================== */
    const revealElements = [];

    document.querySelectorAll(".section-heading").forEach((element) => {
        element.setAttribute("data-reveal", "up");
        revealElements.push(element);
    });

    document.querySelectorAll(".about-content, .contact-intro, .contact-card").forEach((element) => {
        element.setAttribute("data-reveal", "up");
        revealElements.push(element);
    });

    document.querySelectorAll(".skill-card").forEach((element, index) => {
        element.setAttribute("data-reveal", "up");
        element.setAttribute("data-reveal-delay", (index % 6) + 1);
        revealElements.push(element);
    });

    document.querySelectorAll(".project-card").forEach((element, index) => {
        element.setAttribute("data-reveal", "scale");
        element.setAttribute("data-reveal-delay", (index % 6) + 1);
        revealElements.push(element);
    });

    document.querySelectorAll(".achievement-card").forEach((element, index) => {
        element.setAttribute("data-reveal", "up");
        element.setAttribute("data-reveal-delay", (index % 6) + 1);
        revealElements.push(element);
    });

    document.querySelectorAll(".contact-item").forEach((element, index) => {
        element.setAttribute("data-reveal", "left");
        element.setAttribute("data-reveal-delay", (index % 4) + 1);
        revealElements.push(element);
    });


    /* =====================================================
       09 — INTERSECTION OBSERVER FOR REVEAL
    ===================================================== */
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -60px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =====================================================
       10 — OPTIMIZED SCROLL EVENT LISTENER
    ===================================================== */
    let ticking = false;

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNavbar();
                updateScrollTop();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });


    /* =====================================================
       11 — EXTERNAL LINKS SECURITY & LAZY LOADING
    ===================================================== */
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
        link.setAttribute("rel", "noopener noreferrer");
    });

    document.querySelectorAll("img").forEach((image) => {
        if (!image.hasAttribute("loading")) {
            image.setAttribute("loading", "lazy");
        }
    });

    const heroImage = document.querySelector(".profile-photo");
    if (heroImage) {
        heroImage.removeAttribute("loading");
    }

});


/* =========================================================
   12 — PAGE ENTRY LOADER ANIMATION
========================================================= */
window.addEventListener("load", () => {
    const loader = document.getElementById("page-loader");

    if (!loader) return;

    setTimeout(() => {
        loader.classList.add("loader-hidden");
    }, 1700);
});
/* =========================================================
   ABSOLUTE MOBILE MENU OVERRIDE STYLE
========================================================= */
@media (max-width: 950px) {
    .nav-container {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        position: relative !important;
    }

    .menu-toggle {
        display: flex !important;
        margin-left: auto !important;
        z-index: 99999 !important;
        cursor: pointer !important;
        position: relative !important;
    }

    .nav-menu {
        display: none !important;
        position: absolute !important;
        top: calc(100% + 10px) !important;
        right: 0 !important;
        width: 260px !important;
        background: #ffffff !important;
        border: 1px solid rgba(11, 18, 32, 0.12) !important;
        border-radius: 16px !important;
        box-shadow: 0 25px 50px rgba(11, 18, 32, 0.2) !important;
        padding: 16px !important;
        flex-direction: column !important;
        gap: 6px !important;
        z-index: 99998 !important;
    }

    .nav-menu.open {
        display: flex !important;
    }
           }
