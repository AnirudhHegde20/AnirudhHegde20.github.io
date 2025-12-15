// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navMobile = document.getElementById("navMobile");

if (navToggle && navMobile) {
  navToggle.addEventListener("click", () => {
    navMobile.classList.toggle("open");
  });

  navMobile.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navMobile.classList.remove("open"));
  });
}

// Case study filter (only runs on pages that have it)
const pills = document.querySelectorAll(".case-pill");
const cards = document.querySelectorAll(".case-card");

if (pills.length && cards.length) {
  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const filter = pill.dataset.filter;
      pills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");

      cards.forEach((card) => {
        if (filter === "all" || card.dataset.type === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// Scroll reveal (works for all pages)
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
