function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: productName, price: price });
    localStorage.setItem('cart', JSON.stringify(cart));

    // แจ้งเตือนเด้งดึ๋งน่ารักๆ
    showToast(`เพิ่ม <b>${productName}</b> ลงในตะกร้าแล้วน้า 🧸✨`);
}

function showToast(message) {
    let toast = document.createElement("div");
    toast.className = "custom-toast";
    toast.innerHTML = message;
    document.body.appendChild(toast);

    setTimeout(() => { toast.classList.add("show"); }, 100);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

function displayCart() {
    let cartItems = document.getElementById('cart-items');
    let totalEl = document.getElementById('total');
    let discountEl = document.getElementById('discount');
    let finalPriceEl = document.getElementById('final-price');

    if (!cartItems) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>ยังไม่มีสินค้าในตะกร้า</p>';
        if (totalEl) totalEl.innerText = '0';
        if (discountEl) discountEl.innerText = '0';
        if (finalPriceEl) finalPriceEl.innerText = '0';
        return;
    }

    let html = '<ul style="list-style: none; padding: 0;">';
    let total = 0;

    cart.forEach((item, index) => {
        html += `<li style="margin: 10px 0; background: #fff; padding: 10px; border-radius: 8px;">
            ${index + 1}. <b>${item.name}</b> - ${item.price} บาท
        </li>`;
        total += item.price;
    });

    html += '</ul>';
    cartItems.innerHTML = html;

    let discount = 0;
    if (total >= 1000) {
        discount = total * 0.10;
    }

    let finalPrice = total - discount;

    if (totalEl) totalEl.innerText = total;
    if (discountEl) discountEl.innerText = discount;
    if (finalPriceEl) finalPriceEl.innerText = finalPrice;
}

function clearCart() {
    localStorage.removeItem('cart');
    displayCart();
}

window.onload = displayCart;