// Base de données des produits
const productsData = [
  {
    id: 1,
    title: "Product 1",
    category: "Smart glasses",
    price: 249,
    image: "images/product-1.svg",
    badge: "New",
    description: "Description",
    boughtText: "728 bought this week",
    compatibility: ["iOS", "Android"],
    sensors: ["Heart rate", "GPS"],
    batteryLife: 2
  },
  {
    id: 2,
    title: "Product 2",
    category: "Smart watches",
    price: 329,
    image: "images/product-2.svg",
    badge: "Best seller",
    description: "Description",
    compatibility: ["iOS", "Android"],
    sensors: ["Heart rate", "SpO2", "ECG"],
    batteryLife: 3
  },
  {
    id: 3,
    title: "Product 3",
    category: "Smart rings",
    price: 179,
    image: "images/product-3.svg",
    badge: "New",
    description: "Description",
    compatibility: ["iOS", "Android"],
    sensors: ["Heart rate", "SpO2"],
    batteryLife: 5
  },
  {
    id: 4,
    title: "Product 4",
    category: "Trackers",
    price: 129,
    image: "images/product-4.svg",
    badge: "Popular",
    description: "Description",
    compatibility: ["Android", "PC / Tablet"],
    sensors: ["Heart rate", "GPS"],
    batteryLife: 7
  },
  {
    id: 5,
    title: "Product 5",
    category: "Smart glasses",
    price: 299,
    image: "images/product-5.svg",
    badge: "New",
    description: "Description",
    compatibility: ["iOS", "Android", "PC / Tablet"],
    sensors: ["GPS", "SpO2"],
    batteryLife: 1
  },
  {
    id: 6,
    title: "Product 6",
    category: "Smart watches",
    price: 399,
    image: "images/product-6.svg",
    badge: "Best value",
    description: "Description",
    compatibility: ["iOS", "Android"],
    sensors: ["Heart rate", "GPS", "ECG"],
    batteryLife: 4
  }
];

// État actif des filtres
let activeTab = "All wearables";
let searchQuery = "";
let selectedCompat = [];
let selectedSensors = [];
let maxBattery = 7;

document.addEventListener("DOMContentLoaded", () => {
  renderPricingGrid(productsData);
  bindPricingEvents();
});

function bindPricingEvents() {
  // 1. Onglets du haut & liens de la sidebar
  const tabs = document.querySelectorAll(".pricing-tab, .cat-link");
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      const cat = e.currentTarget.dataset.category;
      
      document.querySelectorAll(".pricing-tab, .cat-link").forEach((t) => t.classList.remove("active"));
      document.querySelectorAll(`[data-category="${cat}"]`).forEach((t) => t.classList.add("active"));
      
      activeTab = cat;
      updateFilterResults();
    });
  });

  // 2. Recherche textuelle
  const searchInput = document.querySelector("#pricing-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase();
      updateFilterResults();
    });
  }

  // 3. Filtre Compatibilité
  const compatBoxes = document.querySelectorAll("input[name='compat-filter']");
  compatBoxes.forEach((box) => {
    box.addEventListener("change", () => {
      selectedCompat = Array.from(compatBoxes)
        .filter((b) => b.checked)
        .map((b) => b.value);
      updateFilterResults();
    });
  });

  // 4. Filtre Capteurs
  const sensorBoxes = document.querySelectorAll("input[name='sensor-filter']");
  sensorBoxes.forEach((box) => {
    box.addEventListener("change", () => {
      selectedSensors = Array.from(sensorBoxes)
        .filter((b) => b.checked)
        .map((b) => b.value);
      updateFilterResults();
    });
  });

  // 5. Slider Batterie
  const batterySlider = document.querySelector("#battery-slider");
  if (batterySlider) {
    batterySlider.addEventListener("input", (e) => {
      maxBattery = parseInt(e.target.value, 10);
      updateFilterResults();
    });
  }

  // 6. Réinitialisation
  const resetBtn = document.querySelector("#reset-filters");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      activeTab = "All wearables";
      searchQuery = "";
      selectedCompat = [];
      selectedSensors = [];
      maxBattery = 7;
      
      if (searchInput) searchInput.value = "";
      if (batterySlider) batterySlider.value = 7;
      document.querySelectorAll("input[type='checkbox']").forEach((b) => b.checked = false);
      
      document.querySelectorAll(".pricing-tab, .cat-link").forEach((t) => t.classList.remove("active"));
      document.querySelectorAll(`[data-category="All wearables"]`).forEach((t) => t.classList.add("active"));
      
      renderPricingGrid(productsData);
    });
  }
}

// Logique de filtrage combinée
function updateFilterResults() {
  const filtered = productsData.filter((item) => {
    const matchTab = activeTab === "All wearables" || item.category === activeTab;
    const matchSearch = item.title.toLowerCase().includes(searchQuery) || item.category.toLowerCase().includes(searchQuery);
    const matchCompat = selectedCompat.length === 0 || selectedCompat.some((c) => item.compatibility.includes(c));
    const matchSensor = selectedSensors.length === 0 || selectedSensors.every((s) => item.sensors.includes(s));
    const matchBattery = item.batteryLife <= maxBattery;

    return matchTab && matchSearch && matchCompat && matchSensor && matchBattery;
  });

  renderPricingGrid(filtered);
}

// Génération dynamique des cartes produits
function renderPricingGrid(items) {
  const grid = document.querySelector("#pricing-grid");
  if (!grid) return;

  if (items.length === 0) {
    grid.innerHTML = `<div class="empty-pricing">Aucun produit ne correspond à ces critères.</div>`;
    return;
  }

  grid.innerHTML = items.map((product) => `
    <article class="pricing-card">
      <div class="card-header">
        <span class="badge">${product.badge}</span>
        <img src="${product.image}" alt="${product.title}" class="product-thumb" />
      </div>
      <div class="card-body">
        <span class="product-category">${product.category.toUpperCase()}</span>
        <h3 class="product-title">${product.title}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="card-footer">
          <span class="price">$${product.price}</span>
          ${product.boughtText ? `<span class="bought-count">${product.boughtText}</span>` : ""}
        </div>
      </div>
    </article>
  `).join("");
}