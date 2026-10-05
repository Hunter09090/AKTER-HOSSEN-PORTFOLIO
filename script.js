(() => {
  "use strict";
  const ready = (fn) => document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fn, { once: true }) : fn();
  ready(() => {
    const $ = (s, root = document) => root.querySelector(s);
    const $$ = (s, root = document) => [...root.querySelectorAll(s)];
    const navbar = $("#navbar"), toggle = $("#menu-toggle"), menu = $("#nav-menu"), top = $("#scroll-top"), loader = $("#page-loader");
    const closeMenu = () => { if (!menu || !toggle) return; menu.classList.remove("open"); toggle.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Open navigation menu"); };
    if (toggle && menu) {
      toggle.addEventListener("click", e => { e.stopPropagation(); const open = menu.classList.toggle("open"); toggle.classList.toggle("open", open); toggle.setAttribute("aria-expanded", String(open)); toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu"); });
      $$(".nav-link", menu).forEach(link => link.addEventListener("click", closeMenu));
      document.addEventListener("click", e => { if (!menu.contains(e.target) && !toggle.contains(e.target)) closeMenu(); });
      document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });
      window.addEventListener("resize", () => { if (window.innerWidth > 980) closeMenu(); }, { passive: true });
    }
    $$("a[href^='#']").forEach(link => link.addEventListener("click", e => { const target = $(link.getAttribute("href")); if (!target) return; e.preventDefault(); target.scrollIntoView({ behavior: "smooth", block: "start" }); history.replaceState(null, "", link.getAttribute("href")); }));
    const update = () => { navbar?.classList.toggle("scrolled", scrollY > 35); top?.classList.toggle("visible", scrollY > 550); };
    update(); window.addEventListener("scroll", update, { passive: true }); top?.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
    const sections = $$("main section[id]"), links = $$(".nav-link");
    if ("IntersectionObserver" in window) { const observer = new IntersectionObserver(entries => { const item = entries.filter(x => x.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0]; if (!item) return; links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${item.target.id}`)); }, { rootMargin: "-25% 0px -60% 0px", threshold: [.05,.2] }); sections.forEach(section => observer.observe(section)); }
    const reveal = $$("[data-reveal]");
    reveal.forEach((el, i) => el.style.setProperty("--delay", `${Math.min(i % 6, 5) * 70}ms`));
    if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) { const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("revealed"); obs.unobserve(entry.target); } }), { threshold: .08, rootMargin: "0px 0px -35px" }); reveal.forEach(el => observer.observe(el)); } else reveal.forEach(el => el.classList.add("revealed"));

    // Featured interactive project: Escape The Website
    const projectGrid = $("#projects .projects-grid");
    if (projectGrid && !$("[data-project='escape-the-website']")) {
      const card = document.createElement("article");
      card.className = "project surface";
      card.dataset.reveal = "";
      card.dataset.project = "escape-the-website";
      card.innerHTML = `<div class="project-image" style="background:radial-gradient(circle at 50% 35%,#30376b,#080a13 72%);display:grid;place-items:center;min-height:220px"><div style="text-align:center;font-size:4rem;line-height:1">🧪<div style="font-size:.78rem;font-weight:800;letter-spacing:.14em;margin-top:10px;color:#5ee7ff">AKTER CRAZY LAB</div></div><a href="https://hunter09090.github.io/Akter-Sir-games/escape-the-website/" target="_blank" rel="noopener">Play live ↗</a></div><div class="project-body"><small>INTERACTIVE WEB GAME</small><h3>Escape The Website</h3><p>A browser escape-room game with timed puzzles, lives, hints, achievements, hidden secrets and multiple endings.</p><b>HTML · CSS · JavaScript · Game Logic</b></div>`;
      projectGrid.appendChild(card);
      card.style.setProperty("--delay", "120ms");
      requestAnimationFrame(() => card.classList.add("revealed"));
    }

    $("#footer-year")?.replaceChildren(String(new Date().getFullYear()));
    $$('a[target="_blank"]').forEach(a => a.rel = "noopener noreferrer");
    if (loader) { window.addEventListener("load", () => { loader.classList.add("hidden"); setTimeout(() => loader.remove(), 700); }, { once: true }); }
  });
})();
