let cartCount = 0;
let totalPrice = 0;

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        cartCount++;
        totalPrice += Number(button.dataset.price);

        document.getElementById("cart-count").innerText = cartCount;
        document.getElementById("total-price").innerText = totalPrice;
    });
});

