let cart = JSON.parse(localStorage.getItem("cart")) || [];
let user = localStorage.getItem("userEmail");

// LOGIN
function login(){
  let email = document.getElementById("email").value;
  localStorage.setItem("userEmail", email);
  alert("Login Successful!");
  window.location.href = "index.html";
}

// NAVBAR CART COUNT
document.getElementById("nav-cart-count").innerText = cart.length;

// ADD TO CART
function addToCart(name, price){
  cart.push({name, price});
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("nav-cart-count").innerText = cart.length;
  alert("Added to cart!");
}

// SHOW CART ITEMS
if(window.location.pathname.includes("cart.html")){
  let container = document.getElementById("cart-items");
  cart.forEach(item=>{
    container.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
  });
}

// CHECKOUT → MOVES TO ORDERS PAGE
function checkout(){
  localStorage.setItem("orders", JSON.stringify(cart));
  localStorage.removeItem("cart");
  alert("Order Placed Successfully!");
  window.location.href = "orders.html";
}

// SHOW ORDERS
if(window.location.pathname.includes("orders.html")){
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let container = document.getElementById("orders-list");
  orders.forEach(order=>{
    container.innerHTML += `<p>${order.name} - ₹${order.price}</p>`;
  });
}
