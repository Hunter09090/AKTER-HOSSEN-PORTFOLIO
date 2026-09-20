
// ===============================
// MOBILE MENU
// ===============================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});


// Close mobile menu after clicking a link

const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });

});


// ===============================
// CURRENT YEAR
// ===============================

const year = document.getElementById("year");

year.textContent = new Date().getFullYear();


// ===============================
// NAVBAR SHADOW ON SCROLL
// ===============================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 20) {

        navbar.style.boxShadow =
            "0 5px 25px rgba(0,0,0,0.06)";

    } else {

        navbar.style.boxShadow = "none";

    }

});
// ========================================
// HERO PROFILE PARALLAX EFFECT
// ========================================

const profileWrapper =
    document.querySelector(".profile-wrapper");

if (profileWrapper) {

    profileWrapper.addEventListener("mousemove", (event) => {

        const rect =
            profileWrapper.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX =
            (x - centerX) / 25;

        const moveY =
            (y - centerY) / 25;

        profileWrapper.style.transform =
            `translate(${moveX}px, ${moveY}px)`;

    });


    profileWrapper.addEventListener("mouseleave", () => {

        profileWrapper.style.transform =
            "translate(0, 0)";

    });

}
/* =========================================================
   PREMIUM PAGE ENTRY + SCROLL REVEAL
========================================================= */


/* ---------------------------------------------------------
   PAGE ENTRY ANIMATION
--------------------------------------------------------- */

window.addEventListener("load", () => {

    const loader = document.getElementById("page-loader");

    if (!loader) return;

    setTimeout(() => {

        loader.classList.add("loader-hidden");

    }, 1700);

});


/* ---------------------------------------------------------
   SCROLL REVEAL
--------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {

    const revealElements = [];


    /* Main sections */

    document
        .querySelectorAll(
            "section:not(#home), .contact-section, .site-footer"
        )
        .forEach((element) => {

            element.setAttribute("data-reveal", "fade");

            revealElements.push(element);

        });


    /* Section headings */

    document
        .querySelectorAll(
            ".section-heading, .contact-intro, .contact-card"
        )
        .forEach((element) => {

            element.setAttribute("data-reveal", "up");

            revealElements.push(element);

        });


    /* Cards */

    const cardSelectors = [
        ".skill-card",
        ".project-card",
        ".achievement-card",
        ".contact-item"
    ];


    cardSelectors.forEach((selector) => {

        document
            .querySelectorAll(selector)
            .forEach((card, index) => {

                card.setAttribute("data-reveal", "up");

                const delay =
                    (index % 6) + 1;

                card.setAttribute(
                    "data-reveal-delay",
                    delay
                );

                revealElements.push(card);

            });

    });


    /* -----------------------------------------------------
       Intersection Observer
    ----------------------------------------------------- */

    const observer =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;


                    entry.target.classList.add(
                        "revealed"
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -60px 0px"
            }
        );


    revealElements.forEach((element) => {

        observer.observe(element);

    });

});
