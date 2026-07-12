(() => {
  "use strict";

  const root = document.documentElement;
  const year = document.getElementById("year");
  const themeToggle = document.getElementById("themeToggle");
  const menuButton = document.getElementById("menuButton");
  const navLinks = document.getElementById("navLinks");
  const typedRole = document.getElementById("typedRole");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Theme
  const savedTheme = localStorage.getItem("portfolio-theme");
  const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = savedTheme || (preferredDark ? "dark" : "light");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem("portfolio-theme", root.dataset.theme);
    });
  }

  // Mobile navigation
  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("nav-open", open);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      });
    });
  }

  // Typing roles
  const roles = [
    "Data Analyst",
    "Business Intelligence Analyst",
    "Product Analytics Specialist",
    "Analytics Engineer"
  ];
  let roleIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function typeRole() {
    if (!typedRole) return;

    const role = roles[roleIndex];

    if (!deleting) {
      characterIndex += 1;
      typedRole.textContent = role.slice(0, characterIndex);

      if (characterIndex === role.length) {
        deleting = true;
        window.setTimeout(typeRole, 1600);
        return;
      }

      window.setTimeout(typeRole, 75);
      return;
    }

    characterIndex -= 1;
    typedRole.textContent = role.slice(0, characterIndex);

    if (characterIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      window.setTimeout(typeRole, 350);
      return;
    }

    window.setTimeout(typeRole, 38);
  }

  window.setTimeout(typeRole, 500);

  // Scroll reveal
  const revealElements = [...document.querySelectorAll(".reveal")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14 }
    );

    revealElements.forEach((element) => {
      if (!element.classList.contains("visible")) {
        revealObserver.observe(element);
      }
    });
  }

  // Number counters
  const counters = [...document.querySelectorAll("[data-count]")];

  function animateCounter(element) {
    const target = Number(element.dataset.count || 0);
    const suffix = element.dataset.suffix || "";
    const duration = 1150;
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      element.textContent = `${value}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    }

    requestAnimationFrame(frame);
  }

  if (!reduceMotion && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  // Active navigation state
  const sections = [...document.querySelectorAll("main section[id]")];
  const navigationLinks = [...document.querySelectorAll(".nav-links a")];

  function updateActiveNavigation() {
    const position = window.scrollY + 120;
    let currentSection = "";

    sections.forEach((section) => {
      if (position >= section.offsetTop) {
        currentSection = section.id;
      }
    });

    navigationLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        currentSection !== "" &&
        link.getAttribute("href") === `#${currentSection}`
      );
    });
  }

  updateActiveNavigation();
  window.addEventListener("scroll", updateActiveNavigation, { passive: true });
})();
