
document.querySelectorAll('.back-button, #back').forEach((backBtn) => {
  backBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior

    document.body.classList.add('fade-out');

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 500); // Match with your CSS transition duration
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const cartItemContainer = document.getElementById("cartItemContainer");
  const subtotalEl = document.getElementById("subtotal");
  const totalPaymentEl = document.getElementById("total-payment");
  const shippingCharge = 50;

  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (!cartItems.length) {
    cartItemContainer.innerHTML = "<p>No items in the cart.</p>";
    subtotalEl.textContent = "₹ 0.00";
    totalPaymentEl.textContent = "₹ 0.00";
    return;
  }

  // cartItemContainer.innerHTML = "";

  cartItems.forEach((item) => {
    let quantity = item.quantity || 1;

    // Ensure item has an ID
    if (!item.id) {
      item.id = Date.now() + Math.random(); // simple unique id
    }

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <div class="image-wrapper">
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="item-details">
        <h4>${item.title}</h4>
        <p>₹ <span class="unit-price">${item.price}</span></p>
        <p>Size: <span class="size">${item.size}</span></p>
      </div>
      <div class="quantity-control-image">
        <div class="quantity-control">
          <button class="decrease"><img src="./assets/minus vector.svg" alt="minus" id="minus"></button>
          <span class="quantity">${quantity}</span>
          <button class="increase"><img src="./assets/ plus vector.svg" alt="plus" id="plus"></button>
        </div>
        <img src="./assets/delete.svg" alt="Delete" class="delete-btn" data-id="${item.id}">
      </div>
      <div class="price">₹ <span class="item-price">${(item.price * quantity).toFixed(2)}</span></div>
    `;

    cartItemContainer.appendChild(itemDiv);

    const quantitySpan = itemDiv.querySelector(".quantity");
    const itemPriceSpan = itemDiv.querySelector(".item-price");
    const decreaseBtn = itemDiv.querySelector(".decrease");
    const increaseBtn = itemDiv.querySelector(".increase");
    const deleteBtn = itemDiv.querySelector(".delete-btn");

    decreaseBtn.addEventListener("click", function () {
      if (quantity > 1) {
        quantity--;
        quantitySpan.textContent = quantity;
        itemPriceSpan.textContent = (item.price * quantity).toFixed(2);

        item.quantity = quantity;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        updateSummary();
        updateNavbarCart();
      }
    });

    increaseBtn.addEventListener("click", function () {
      quantity++;
      quantitySpan.textContent = quantity;
      itemPriceSpan.textContent = (item.price * quantity).toFixed(2);

      item.quantity = quantity;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      updateSummary();
      updateNavbarCart();
    });

    deleteBtn.addEventListener("click", function () {
      const itemId = parseFloat(deleteBtn.getAttribute("data-id"));
      cartItems = cartItems.filter(cartItem => cartItem.id !== itemId);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      cartItemContainer.removeChild(itemDiv);

      updateSummary();
      updateNavbarCart();
    });
  });

  // Save updated items with ids
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateSummary();

  function updateSummary() {
    let total = 0;
    document.querySelectorAll(".cart-item").forEach(itemEl => {
      const itemPrice = parseFloat(itemEl.querySelector(".item-price").textContent);
      total += itemPrice;
    });

    const paymentAmount = total + shippingCharge;
    subtotalEl.textContent = `₹ ${total.toFixed(2)}`;
    totalPaymentEl.textContent = `₹ ${paymentAmount.toFixed(2)}`;
    localStorage.setItem("cartTotalAmount", paymentAmount.toFixed(2));
  }
});


function updateNavbarCart() {
  const itemCountEl = document.querySelector(".item-count");
  const priceEl = document.getElementById("price-navbar-data");

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const shippingCharge = 50;

  let totalItems = 0;
  let totalPrice = 0;

  cartItems.forEach(item => {
      const quantity = item.quantity || 1;
      totalItems += quantity;
      totalPrice += item.price * quantity;
  });

  if (totalItems > 0) {
      totalPrice += shippingCharge;
  }

  if (itemCountEl) itemCountEl.textContent = totalItems;
  if (priceEl) priceEl.textContent = totalPrice.toFixed(2);
}

// Call this once when the script loads
updateNavbarCart();




const backImage = document.getElementById('back');

if (backImage) {
  backImage.addEventListener('click', (e) => {
      e.preventDefault(); 

      document.body.classList.add('fade-out');

      setTimeout(() => {
          window.location.href = 'index.html';
      }, 500); // Delay must match CSS transition
  });
}


////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const cartIcon = document.getElementById('cart-icon-cartPage');
  
  if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      document.body.classList.add('fade-out');

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 500);
    });
  }
});

function closeModal() {
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.style.display = 'none';
  }
}





