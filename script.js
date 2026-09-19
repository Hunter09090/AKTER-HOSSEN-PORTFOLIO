
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
