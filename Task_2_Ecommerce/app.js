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

// Storage & Cart Logic
function getUserEmail() { return localStorage.getItem('userEmail'); }
function setUserEmail(email) { localStorage.setItem('userEmail', email); }
function clearUserEmail() { localStorage.removeItem('userEmail'); }
function isLoggedIn() { return !!getUserEmail(); }
function getCart() { return JSON.parse(localStorage.getItem('cart')) || []; }

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  existing ? existing.quantity++ : cart.push({...product, quantity:1});
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart`);
}

function getCartCount(){ return getCart().reduce((t,i)=>t+i.quantity,0); }
function updateCartCount(){
  const el=document.getElementById("nav-cart-count");
  if(el) el.textContent=getCartCount();
}

document.addEventListener("DOMContentLoaded", updateCartCount);
