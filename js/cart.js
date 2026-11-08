// ===========================================================
// cart.js — only for cart.html
// Shows the items in the cart and lets you change them
// ===========================================================

var list = document.getElementById("cart-list");
var totalLabel = document.getElementById("total");
var message = document.getElementById("message");

function showCart() {
  if (cart.length === 0) {
    list.innerHTML = '<div class="empty-cart">Your cart is empty. <a href="products.html" style="color:#007991">Go shopping →</a></div>';
    totalLabel.textContent = "$0";
    return;
  }

  var html = "";
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    var product = findProduct(cart[i].id);
    total += product.price * cart[i].qty;
    html += '<div class="cart-row">' +
      '<img src="' + product.image + '" alt="' + product.name + '">' +
      '<div class="cart-info"><h4>' + product.name + '</h4><small>$' + product.price + '</small></div>' +
      '<div class="qty">' +
        '<button data-action="minus" data-id="' + product.id + '">−</button>' +
        '<span>' + cart[i].qty + '</span>' +
        '<button data-action="plus" data-id="' + product.id + '">+</button>' +
      '</div>' +
      '<button class="remove" data-action="remove" data-id="' + product.id + '">Remove</button>' +
    '</div>';
  }
  list.innerHTML = html;
  totalLabel.textContent = "$" + total;
}

// One click listener handles the −, + and Remove buttons
list.addEventListener("click", function (event) {
  var action = event.target.dataset.action;
  var id = Number(event.target.dataset.id);
  if (!action) return;

  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      if (action === "plus") cart[i].qty++;
      if (action === "minus" && cart[i].qty > 1) cart[i].qty--;
      if (action === "remove") cart.splice(i, 1);   // delete this item from the list
      break;
    }
  }
  saveCart();
  showCart();
});

// Fake checkout (no real payment — this is a student project)
document.getElementById("checkout").addEventListener("click", function () {
  if (cart.length === 0) {
    message.textContent = "Your cart is empty.";
    return;
  }
  cart = [];
  saveCart();
  showCart();
  message.textContent = "Thank you! Order placed (demo only).";
});

showCart();
