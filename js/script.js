/// to send to data to landing page to product page 
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('product.html')) {
    const productData = localStorage.getItem('selectedProduct');
    if (productData) {
      const { image, title, description } = JSON.parse(productData);

      const imageEl = document.getElementById('product-page-image');
      const titleEl = document.getElementById('product-page-title');
      const descEl = document.getElementById('product-page-description');

      if (imageEl) imageEl.src = image || '';
      if (titleEl) titleEl.textContent = title || '';
      if (descEl) descEl.textContent = description || '';
    } else {
      console.error('No product data found.');
    }
  } else {
    document.querySelectorAll('.product-card').forEach((productCard) => {
      productCard.addEventListener('click', (event) => {
        // Prevent click if it happened inside a button, link, or quantity control
        if (
          event.target.closest('button') ||
          event.target.closest('a') ||
          event.target.closest('.quantity-control') // Add a class to your quantity control container
        ) {
          return;
        }

        const image = productCard.querySelector('.product-image')?.src;
        const title = productCard.querySelector('.product-title')?.textContent;
        const description = productCard.querySelector('.product-description')?.textContent;

        const productData = { image, title, description };
        localStorage.setItem('selectedProduct', JSON.stringify(productData));

        document.body.classList.add('fade-out');

        setTimeout(() => {
          window.location.href = 'product.html';
        }, 500);
      });
    });
  }
});





document.querySelectorAll('.back-button, #back').forEach((backBtn) => {
  backBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior

    document.body.classList.add('fade-out');

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 500); // Match with your CSS transition duration
  });
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






