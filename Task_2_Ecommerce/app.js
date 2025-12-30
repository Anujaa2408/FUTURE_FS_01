// Products data
const products = [
  {
    id: 1,
    name: "Handwoven Cotton Kurta",
    price: 1499,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop",
    category: "Clothing"
  },
  {
    id: 2,
    name: "Brass Diya Set",
    price: 899,
    image: "https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?w=400&h=400&fit=crop",
    category: "Home Decor"
  },
  {
    id: 3,
    name: "Terracotta Plant Pot",
    price: 349,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
    category: "Garden"
  },
  {
    id: 4,
    name: "Jute Shoulder Bag",
    price: 799,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop",
    category: "Accessories"
  },
  {
    id: 5,
    name: "Wooden Spice Box",
    price: 649,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop",
    category: "Kitchen"
  },
  {
    id: 6,
    name: "Block Print Cushion Cover",
    price: 449,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    category: "Home Decor"
  },
  {
    id: 7,
    name: "Copper Water Bottle",
    price: 599,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    category: "Kitchen"
  },
  {
    id: 8,
    name: "Embroidered Clutch",
    price: 1199,
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=400&fit=crop",
    category: "Accessories"
  }
];

// Storage functions
function getUserEmail() {
  return localStorage.getItem('userEmail');
}

function setUserEmail(email) {
  localStorage.setItem('userEmail', email);
}

function clearUserEmail() {
  localStorage.removeItem('userEmail');
}

function isLoggedIn() {
  return !!getUserEmail();
}

function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function addToCart(product) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showToast(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.find(item => item.id === productId);
  
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
    }
  }
}

function clearCart() {
  localStorage.removeItem('cart');
  updateCartCount();
}

function getCartCount() {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}

function getCartTotal() {
  return getCart().reduce((total, item) => total + (item.price * item.quantity), 0);
}

function getOrders() {
  const orders = localStorage.getItem('orders');
  return orders ? JSON.parse(orders) : [];
}

function placeOrder() {
  const cart = getCart();
  if (cart.length === 0) return null;
  
  const order = {
    id: Date.now().toString(),
    items: cart,
    total: getCartTotal(),
    date: new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
  
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem('orders', JSON.stringify(orders));
  clearCart();
  
  return order;
}

// UI functions
function updateCartCount() {
  const cartCountEl = document.getElementById('cart-count');
  if (cartCountEl) {
    cartCountEl.textContent = getCartCount();
  }
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

function formatPrice(price) {
  return `₹${price.toLocaleString('en-IN')}`;
}

// Auth check for protected pages
function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
});

