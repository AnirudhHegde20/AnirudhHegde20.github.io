// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navMobile = document.getElementById("navMobile");

if (navToggle && navMobile) {
  navToggle.addEventListener("click", () => navMobile.classList.toggle("open"));
  navMobile.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navMobile.classList.remove("open"));
  });
}

// Case study filter + search
const pills = document.querySelectorAll(".case-pill");
const cards = document.querySelectorAll(".case-card");
const searchInput = document.getElementById("projectSearch");
const searchClear = document.getElementById("searchClear");

let activeFilter = "all";

function applyFilters() {
  const q = (searchInput?.value || "").trim().toLowerCase();

  cards.forEach((card) => {
    const type = card.dataset.type;
    const hay = (card.dataset.search || "").toLowerCase();

    const matchFilter = (activeFilter === "all") || (type === activeFilter);
    const matchSearch = !q || hay.includes(q);

    card.style.display = (matchFilter && matchSearch) ? "flex" : "none";
  });
}

pills.forEach((pill) => {
  pill.addEventListener("click", () => {
    activeFilter = pill.dataset.filter || "all";
    pills.forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
    applyFilters();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", applyFilters);
}
if (searchClear && searchInput) {
  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    applyFilters();
    searchInput.focus();
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
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

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Case study page helpers (copy link)
const copyBtn = document.getElementById("copyLinkBtn");
const toast = document.getElementById("toast");

function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1600);
}

if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Link copied ✅");
    } catch {
      showToast("Copy failed. You can copy from the address bar.");
    }
  });
}
