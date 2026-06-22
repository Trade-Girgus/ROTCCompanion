const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}

const searchInput = document.getElementById("feature-search");
const filters = document.querySelectorAll(".filter");
const capabilityCards = document.querySelectorAll(".capability");
const emptyState = document.getElementById("empty-state");
let activeFilter = "all";

function normalize(value) {
  return value.toLowerCase().trim();
}

function updateCapabilities() {
  const query = normalize(searchInput?.value || "");
  let visibleCount = 0;

  capabilityCards.forEach((card) => {
    const categories = normalize(card.dataset.category || "");
    const keywords = normalize(card.dataset.keywords || "");
    const text = normalize(card.textContent || "");
    const matchesFilter = activeFilter === "all" || categories.split(/\s+/).includes(activeFilter);
    const matchesSearch = !query || text.includes(query) || keywords.includes(query);
    const visible = matchesFilter && matchesSearch;

    card.classList.toggle("is-hidden", !visible);
    if (visible) {
      visibleCount += 1;
    }
  });

  emptyState?.classList.toggle("visible", visibleCount === 0);
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter || "all";
    updateCapabilities();
  });
});

searchInput?.addEventListener("input", updateCapabilities);
updateCapabilities();
