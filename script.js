/* =========================================================
   AKTER HOSSEN PORTFOLIO
   PREMIUM INTERACTION SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
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
       03 — MOBILE MENU
    ===================================================== */

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");
            menuToggle.classList.toggle("open", isOpen);
            menuToggle.setAttribute("aria-expanded", isOpen);
        });

        // Close menu after clicking a link
        navMenu.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                menuToggle.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }


    /* =====================================================
       04 — SMOOTH INTERNAL NAVIGATION
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

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

    let lastScrollY = window.scrollY;

    function updateNavbar() {
        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        lastScrollY = window.scrollY;
    }

    updateNavbar();


    /* =====================================================
       06 — SCROLL TO TOP
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
       07 — ACTIVE NAVIGATION SECTION
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

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
                if (!entry.isIntersecting) {
                    return;
                }

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
       10 — SCROLL EVENTS OPTIMIZATION
    ===================================================== */

    let ticking = false;

    function handleScroll() {
        if (ticking) return;

        window.requestAnimationFrame(() => {
            updateNavbar();
            updateScrollTop();
            ticking = false;
        });

        ticking = true;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });


    /* =====================================================
       11 — EXTERNAL LINKS SECURITY
    ===================================================== */

    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
        link.setAttribute("rel", "noopener noreferrer");
    });


    /* =====================================================
       12 — IMAGE LAZY LOADING
    ===================================================== */

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
   13 — PAGE ENTRY ANIMATION
========================================================= */

window.addEventListener("load", () => {
    const loader = document.getElementById("page-loader");

    if (!loader) return;

    setTimeout(() => {
        loader.classList.add("loader-hidden");
    }, 1700);
});
