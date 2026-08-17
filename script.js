function addToCart(name, price, sizeSelectId, colorSelectId) {
  const selectedSize = document.getElementById(sizeSelectId).value;
  const selectedColor = document.getElementById(colorSelectId).value;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  cart.push({ 
    name: name, 
    price: price, 
    size: selectedSize, 
    color: selectedColor 
  });

  localStorage.setItem('cart', JSON.stringify(cart));

  showToast(`เพิ่ม <b>${name}</b> (${selectedSize}, ${selectedColor}) ลงในตะกร้าแล้วน้า 🧸✨`);
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
    let details = (item.size || item.color) ? ` (${[item.size, item.color].filter(Boolean).join(', ')})` : '';
    html += `<li style="margin: 10px 0; background: #fff; padding: 10px; border-radius: 8px;">
      ${index + 1}. <b>${item.name}</b>${details} - ${item.price} บาท
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
function checkout() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    showToast('🛒 ตะกร้าสินค้าของคุณยังว่างอยู่ครับ!');
    return;
  }

  let finalPrice = document.getElementById('final-price') ? document.getElementById('final-price').innerText : '0';

  let modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.5); display: flex; align-items: center;
    justify-content: center; z-index: 9999;
  `;

  modal.innerHTML = `
    <div style="background: white; padding: 30px; border-radius: 16px; text-align: center; max-width: 350px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
      <div style="font-size: 50px; margin-bottom: 10px;">🎉</div>
      <h3 style="margin: 0 0 10px 0; color: #333;">สั่งซื้อสำเร็จ!</h3>
      <p style="color: #666; margin-bottom: 15px;">ยอดชำระเงินทั้งหมด: <b style="color: #e74c3c; font-size: 18px;">${finalPrice} บาท</b></p>
      <p style="font-size: 14px; color: #888; margin-bottom: 20px;">ขอบคุณที่อุดหนุนสินค้า ToyLand 🧸✨</p>
      <button id="close-modal-btn" style="background: #4CAF50; color: white; border: none; padding: 10px 25px; border-radius: 20px; font-size: 16px; cursor: pointer; font-weight: bold;">ตกลง</button>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('close-modal-btn').onclick = function() {
    modal.remove();
    clearCart();
  };
}