// ===========================================================
// main.js — code shared by every page: the shopping cart
// ===========================================================

// The cart is a list like [{ id: 3, qty: 2 }, ...].
// localStorage keeps it saved in the browser when you change pages.
var cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Find a product in the products list by its id
function findProduct(id) {
  for (var i = 0; i < products.length; i++) {
    if (products[i].id === id) return products[i];
  }
}

// Add one item to the cart (or increase its quantity)
function addToCart(id) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].qty++;
      saveCart();
      return;
    }
  }
  cart.push({ id: id, qty: 1 });
  saveCart();
}

// Show the total number of items next to "Cart" in the navigation bar
function updateCartCount() {
  var total = 0;
  for (var i = 0; i < cart.length; i++) total += cart[i].qty;
  var label = document.getElementById("cart-count");
  if (label) label.textContent = total;
}

// Build the HTML for one product card (used on Home and Products pages)
function makeCard(product) {
  return '<div class="card">' +
    '<span class="badge">' + product.badge + '</span>' +
    '<div class="card-image"><img src="' + product.image + '" alt="' + product.name + '"></div>' +
    '<div class="card-body">' +
      '<div class="card-category">' + product.category + '</div>' +
      '<h3>' + product.name + '</h3>' +
      '<p>' + product.tagline + '</p>' +
      '<div class="card-footer">' +
        '<span class="price">$' + product.price + '</span>' +
        '<button class="btn" data-id="' + product.id + '">Add to cart</button>' +
      '</div>' +
    '</div></div>';
}

// Listen for clicks on any "Add to cart" button
document.addEventListener("click", function (event) {
  var button = event.target;
  if (button.tagName === "BUTTON" && button.dataset.id && button.classList.contains("btn")) {
    addToCart(Number(button.dataset.id));
    button.textContent = "Added ✓";                       // quick feedback
    setTimeout(function () { button.textContent = "Add to cart"; }, 1000);
  }
});

updateCartCount();   // show the right number when the page loads
