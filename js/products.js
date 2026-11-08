// ===========================================================
// products.js — only for products.html
// Shows the product cards and applies the filters
// ===========================================================

var grid = document.getElementById("grid");
var countLabel = document.getElementById("count");
var searchBox = document.getElementById("search");
var sortBox = document.getElementById("sort");
var priceSlider = document.getElementById("price");
var priceLabel = document.getElementById("price-value");
var tabs = document.querySelectorAll(".tab");

var selectedCategory = "All";   // the filters' current values

// Decide which products to show, then draw them
function showProducts() {
  var text = searchBox.value.toLowerCase();
  var maxPrice = Number(priceSlider.value);
  var results = [];

  for (var i = 0; i < products.length; i++) {
    var p = products[i];
    var matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    var matchesSearch = p.name.toLowerCase().includes(text) || p.tagline.toLowerCase().includes(text);
    var matchesPrice = p.price <= maxPrice;

    if (matchesCategory && matchesSearch && matchesPrice) results.push(p);
  }

  // Sorting
  if (sortBox.value === "low")  results.sort(function (a, b) { return a.price - b.price; });
  if (sortBox.value === "high") results.sort(function (a, b) { return b.price - a.price; });

  // Draw the cards
  var html = "";
  for (var j = 0; j < results.length; j++) html += makeCard(results[j]);
  if (results.length === 0) html = '<div class="empty">No products match your filters.</div>';

  grid.innerHTML = html;
  countLabel.textContent = results.length + " product(s)";
}

// Category buttons
tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    tabs.forEach(function (t) { t.classList.remove("active"); });
    tab.classList.add("active");
    selectedCategory = tab.dataset.category;
    showProducts();
  });
});

// Search box, sort menu and price slider re-run the filter on every change
searchBox.addEventListener("input", showProducts);
sortBox.addEventListener("change", showProducts);
priceSlider.addEventListener("input", function () {
  priceLabel.textContent = "$" + priceSlider.value;
  showProducts();
});

// Reset button puts everything back
document.getElementById("reset").addEventListener("click", function () {
  searchBox.value = "";
  sortBox.value = "default";
  priceSlider.value = 450;
  priceLabel.textContent = "$450";
  selectedCategory = "All";
  tabs.forEach(function (t) { t.classList.remove("active"); });
  tabs[0].classList.add("active");
  showProducts();
});

showProducts();   // draw everything when the page opens
