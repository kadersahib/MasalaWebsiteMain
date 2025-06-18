//// product page js code

const prices = {
    "1000g": 600,
    "500g": 400,
    "400g": 300,
    "300g": 200,
    "200g": 150,
    "100g": 100,
    "50g": 50
  };
  
  const dropdown = document.querySelector('.product-custom-dropdown');
  const selectedOption = document.querySelector('.product-selected');
  const dropdownOptions = document.querySelector('.product-dropdown-options');
  const priceElement = document.getElementById('product-page-price');
  
  let selectedWeight;
  if (selectedOption) {
  selectedWeight = selectedOption.textContent.trim();
} else {
  selectedWeight = "100g"; // Default value
}

let selectedQuantity = 1;
  
  function toggleDropdown() {
    const isVisible = dropdownOptions.style.display === 'block';
    dropdownOptions.style.display = isVisible ? 'none' : 'block';
  }
  
  function updatePrice(weight, quantity = 1) {
    const pricePerUnit = prices[weight];
    if (pricePerUnit !== undefined) {
      const totalPrice = pricePerUnit * quantity;
      priceElement.innerHTML = `₹ ${totalPrice}.00 <span>(Inclusive of all taxes)</span>`;
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    // Attach event listeners to dropdown items
    const dropdownItems = dropdownOptions.querySelectorAll('li');
    dropdownItems.forEach(option => {
      option.addEventListener('click', function () {
        selectedWeight = this.textContent.trim();
        selectedOption.textContent = selectedWeight;
        updatePrice(selectedWeight, selectedQuantity);
        dropdownOptions.style.display = 'none';
      });
    });
  
    // // Quantity controls
    const quantityControls = document.querySelectorAll('.product-quantity-control');
    quantityControls.forEach(control => {
      const decreaseBtn = control.querySelector('.decrease');
      const increaseBtn = control.querySelector('.increase');
      const quantitySpan = control.querySelector('.quantity');
  
      if (increaseBtn && decreaseBtn && quantitySpan) {
        increaseBtn.addEventListener('click', () => {
          let currentValue = parseInt(quantitySpan.textContent);
          selectedQuantity = currentValue + 1;
          quantitySpan.textContent = selectedQuantity;
          updatePrice(selectedWeight, selectedQuantity);
        });
  
        decreaseBtn.addEventListener('click', () => {
          let currentValue = parseInt(quantitySpan.textContent);
          if (currentValue > 1) {
            selectedQuantity = currentValue - 1;
            quantitySpan.textContent = selectedQuantity;
            updatePrice(selectedWeight, selectedQuantity);
          }
        });
      } else {
        console.warn('Missing quantity-control buttons or span in this control:', control);
      }
    });
  
    // Initial price update (in case default weight and quantity are pre-selected)
    updatePrice(selectedWeight, selectedQuantity);
  });
  

document.addEventListener("DOMContentLoaded", () => {
  const totalStock = 50;
  let quantity = 1;

  let currentStock = totalStock; // Always start with 50 on reload
  localStorage.setItem("currentStock", currentStock); // Optional

  const quantityControl = document.querySelector(".product-quantity-control");
  const quantityDisplay = quantityControl.querySelector(".quantity");
  const stockDisplay = document.querySelector(".stock");
  const progressBar = document.querySelector(".progress");
  const addToCartBtn = document.querySelector(".add-to-cart");

  const updateUI = () => {
    quantityDisplay.textContent = quantity;
    stockDisplay.textContent = `${currentStock} units available, ready to ship!`;
    let progressPercent = (currentStock / totalStock) * 100;
    progressBar.style.width = `${Math.max(progressPercent, 0)}%`;
  };

  const checkAndRestock = () => {
    if (currentStock < 40) {
      currentStock = totalStock;
      alert("Stock was below 40 and has been automatically restocked.");
    }
    localStorage.setItem("currentStock", currentStock);
  };

  quantityControl.querySelector(".increase").addEventListener("click", () => {
    if (quantity < currentStock) {
      quantity++;
      currentStock--;
      localStorage.setItem("quantity", quantity);
      checkAndRestock();
      updateUI();
    }
  });

  quantityControl.querySelector(".decrease").addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      currentStock++;
      localStorage.setItem("quantity", quantity);
      localStorage.setItem("currentStock", currentStock);
      updateUI();
    }
  });

  addToCartBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const image = document.getElementById("product-page-image")?.src || "";
    const priceText = document.getElementById("product-page-price")?.textContent || "₹0";
    const price = parseFloat(priceText.replace(/[^\d.]/g, ""));
    const size = document.querySelector(".product-selected")?.textContent.trim() || "";

    const orderData = {
      image,
      title: "Product",
      price,
      size,
      quantity,
    };

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.push(orderData);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    quantity = 1;
    localStorage.setItem("quantity", quantity);

    checkAndRestock();

    setTimeout(() => {
      location.reload();
    }, 300);
  });

  updateUI();
});



document.getElementById('cart-icon').addEventListener('click',()=>{
  document.body.classList.add('fade-out')

  setTimeout(()=>{
    window.location.href = 'order.html';
  },500)
})


///////////////////////// Search Functionaity  ///////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchCloseIcon = document.getElementById('searchCloseIcon');
  const navLinks = document.querySelectorAll('.nav-links a');
  const footer = document.getElementById('footer');
  const allproductscard = document.querySelector('.all-products');
  const productHeader = document.querySelector('.product-header');
  const productSection = document.querySelector('.product-section');
  const backtick = document.querySelector('.back-tick');
  const container = document.querySelector('.container');
  const descriptions = document.querySelectorAll('.product-description');

  let allProducts = [];

  fetch('./js/products.json')
    .then(response => response.json())
    .then(data => {
      allProducts = data;
      updateProductDisplay(allProducts);
    })
    .catch(error => console.error('Error loading the products:', error));

  // Function to update the product display
  function updateProductDisplay(productList) {
    const cards = document.querySelectorAll('.product-card');

    productList.forEach((product, index) => {
      const card = cards[index];
      if (card) {
        card.querySelector('.product-image').src = product.imageSrc;
        card.querySelector('.product-title').textContent = product.title;
        card.querySelector('.product-price').textContent = product.price;
        card.querySelector('.product-description').textContent = product.description;
        card.style.display = 'flex';
      }
    });

    // Hide extra cards if the product list is shorter than the number of cards
    cards.forEach((card, index) => {
      if (index >= productList.length) {
        card.style.display = 'none';
      }
    });
  }

  // Handle the search input event
  searchInput.addEventListener('input', () => {
    const term = searchInput.value.trim().toLowerCase();

    // If input is cleared, reload the page after 100ms
    if (term.length === 0) {
      setTimeout(() => {
        location.reload();
      }, 100);
      return; // Exit early to avoid running other logic
    }

    if (term.length >= 5) {
      const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
      );

      updateProductDisplay(filtered);
      productHeader.innerHTML = `<p><span>${filtered.length}</span> Products</p>`;
      allproductscard.style.height = 'auto';
      footer.style.display = 'block';
      productSection.style.display = 'block';
      backtick.style.display = 'none';
      container.style.display = 'none';

      // Hide descriptions during search
      descriptions.forEach(desc => desc.style.display = 'none');
    } else {
      updateProductDisplay(allProducts);
      productHeader.innerHTML = `<p>All Products</p>`;
      footer.style.display = 'block';
      productSection.style.display = 'none';
      backtick.style.display = 'block';
      container.style.display = 'block';

      // Hide descriptions during search
      descriptions.forEach(desc => desc.style.display = 'none');
    }
  });

  // Handle the close icon event
  searchCloseIcon.addEventListener('click', () => {
    searchInput.value = '';
    updateProductDisplay(allProducts);
    productHeader.innerHTML = `<p>All Products</p>`;
    productSection.style.display = 'none';
    backtick.style.display = 'block';
    container.style.display = 'block';

    document.body.classList.add('fade-out');

    setTimeout(() => {
      window.location.href = 'product.html';
    }, 500);
  });

  // Handle navigation link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      searchInput.value = '';
      updateProductDisplay(allProducts);
      footer.style.display = 'block';
      productSection.style.display = 'none';
      backtick.style.display = 'block';
      container.style.display = 'block';
    });
  });
});


document.querySelectorAll('.add-to-cart-1').forEach(button => {
  button.addEventListener('click', () => {
    const productCard = button.closest('.product-card'); // Get parent .product-card

    const image = productCard.querySelector('.product-image').src;
    const title = productCard.querySelector('.product-title').textContent.trim();
    const priceText = productCard.querySelector('.product-price').textContent || "₹0";
    const selectedSize = productCard.querySelector('.selected-option #selected').textContent.trim();
    const price = parseFloat(priceText.replace(/[^\d.]/g, ""));

    const orderData = { image, title, price, size: selectedSize };

    const existing = JSON.parse(localStorage.getItem("cartItems")) || [];
    existing.push(orderData);
    localStorage.setItem("cartItems", JSON.stringify(existing));


    setTimeout(() => {
        location.reload(); // This will reload the page
    }, 100); 
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Prices object with weights and corresponding prices
  const prices = {
      "1000g": 600,
      "500g": 400,
      "400g": 300,
      "300g": 200,
      "200g": 150,
      "100g": 100,
      "50g": 50
  };

  // Get all product cards
  const products = document.querySelectorAll('.product-card');

  products.forEach(product => {
      const selectedOption = product.querySelector('#selected');
      const customdropdown = product.querySelector('.custom-dropdown');
      const dropdownOptions = product.querySelector('.dropdown-option');
      const priceElement = product.querySelector('#product-price');
      const quantitySpan = product.querySelector('.quantity');
      const increaseBtn = product.querySelector('.increase');
      const decreaseBtn = product.querySelector('.decrease');

      let selectedWeight = selectedOption ? selectedOption.textContent.trim() : "100g";
      let selectedQuantity = parseInt(quantitySpan.textContent);

      // Toggle dropdown visibility
      if (customdropdown && dropdownOptions) {
          customdropdown.addEventListener('click', (event) => {
              event.stopPropagation(); // prevent closing immediately
              const isVisible = dropdownOptions.style.display === 'block';
              dropdownOptions.style.display = isVisible ? 'none' : 'block';
          });

          dropdownOptions.querySelectorAll('li').forEach(option => {
              option.addEventListener('click', () => {
                  selectedWeight = option.textContent.trim();
                  selectedOption.textContent = selectedWeight;
                  dropdownOptions.style.display = 'none';
                  updatePrice();
              });
          });

          // Close dropdown if clicked outside
          document.addEventListener('click', () => {
              dropdownOptions.style.display = 'none';
          });
      }

      // Quantity controls
      if (increaseBtn && decreaseBtn && quantitySpan) {
          increaseBtn.addEventListener('click', () => {
              selectedQuantity++;
              quantitySpan.textContent = selectedQuantity;
              updatePrice();
          });

          decreaseBtn.addEventListener('click', () => {
              if (selectedQuantity > 1) {
                  selectedQuantity--;
                  quantitySpan.textContent = selectedQuantity;
                  updatePrice();
              }
          });
      }

      // Update price function
      function updatePrice() {
          const unitPrice = prices[selectedWeight];
          if (unitPrice !== undefined && priceElement) {
              const total = unitPrice * selectedQuantity;
              priceElement.innerHTML = `₹ ${total}.00`;
          }
      }

      // Initialize price
      updatePrice();
  });
});



document.addEventListener('DOMContentLoaded', () => {
  const buyNowBtn = document.getElementById('buy-now');
  const popupContainer = document.getElementById('popup-container');

  buyNowBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('component/demo.html');
      const html = await response.text();
      popupContainer.innerHTML = html;
      popupContainer.style.display = 'block';

      const closeBtn = popupContainer.querySelector('.close-btn');
      const cancelBtn = popupContainer.querySelector('.btn-2');
      const getInTouchBtn = popupContainer.querySelector('.btn-1');

      closeBtn.addEventListener('click', () => {
        popupContainer.style.display = 'none';
      });

      cancelBtn.addEventListener('click', () => {
        popupContainer.style.display = 'none';
      });

      getInTouchBtn?.addEventListener('click', () => {
        window.location.href = 'index.html';
      });

    } catch (error) {
      console.error('Failed to load popup:', error);
    }
  });
});








//////////////////////////////////////////////////////////////////////////

// Product page JavaScript for Buy Now functionality


// document.addEventListener("DOMContentLoaded", function () {
//   const buynow = document.getElementById("buy-now");
//   const otpModalExisting = document.getElementById("otpModalExisting");
//   const otpModalNew = document.getElementById("otpModalNew");
//   const otpVerifyModal = document.getElementById("Otp-Verify");
//   const orderConfirmation = document.querySelector(".order-confirmation");

//   const phoneInputExisting = otpModalExisting.querySelector(".phone-number-exitsing-user");
//   const phoneInputNew = otpModalNew.querySelector(".phone-number");
//   const otpInput = document.querySelector(".enter");

//   const proceedBtn = document.getElementById("proceed");
//   const editBtn = document.getElementById("edit");
//   const sendOtpBtn = document.getElementById("sendOtpBtn");
//   const verifyOtpBtn = otpVerifyModal.querySelector(".send-otp-btn");
//   const okBtn = document.querySelector(".ok-btn");

//   const subtotalElement = document.getElementById("subtotal");
//   const shippingElement = document.getElementById("shipping");
//   const totalPaymentElement = document.getElementById("total-payment");
//   const four = orderConfirmation.querySelector(".four");
//   const five = orderConfirmation.querySelector(".five");
//   const fourFive = orderConfirmation.querySelector(".four-five");
//   const productPriceElement = document.getElementById("product-page-price");

//   const quantityElement = document.querySelector(".quantity");

//   const stockKey = "currentStock";
//   const defaultStock = 50;
//   let currentStock = parseInt(localStorage.getItem(stockKey)) || defaultStock;
//   let existingPhoneNumber = "9876543210";

//   function updateSummaryFromProductPage() {
//     if (!productPriceElement) return;

//     const priceText = productPriceElement.textContent;
//     const priceMatch = priceText.match(/₹\s?([\d.]+)/);
//     if (!priceMatch) return;

//     const productPrice = parseFloat(priceMatch[1]); // product-page-price
//     const shippingCharge = 50;
//     const totalPayment = productPrice + shippingCharge;

//     localStorage.setItem("subtotal", productPrice.toFixed(2));
//     localStorage.setItem("shipping", shippingCharge.toFixed(2));
//     localStorage.setItem("totalPayment", totalPayment.toFixed(2));

//     if (subtotalElement) subtotalElement.textContent = "₹ " + productPrice.toFixed(2);
//     if (shippingElement) shippingElement.textContent = "₹ " + shippingCharge.toFixed(2);
//     if (totalPaymentElement) totalPaymentElement.textContent = "₹ " + totalPayment.toFixed(2);
//   }

//   function finalizeOrder() {
//     const savedQuantity = parseInt(localStorage.getItem("quantity")) || 1;
//     const orderSource = localStorage.getItem("orderSource") || "buyNow";

//     if (orderSource === "buyNow") {
//       if (savedQuantity > currentStock) {
//         alert(`Only ${currentStock} units left. Please reduce quantity.`);
//         return;
//       }
//       const newStock = currentStock - savedQuantity;
//       currentStock = newStock;
//       localStorage.setItem(stockKey, newStock);
//     }

//     localStorage.setItem("quantity", 1);
//     localStorage.setItem("orderSource", ""); // clear for next order

//     updateSummaryFromProductPage();

//     if (four) four.textContent = subtotalElement.textContent || "₹400.00";
//     if (five) five.textContent = shippingElement.textContent || "₹50.00";
//     if (fourFive) fourFive.textContent = totalPaymentElement.textContent || "₹450.00";

//     orderConfirmation.classList.remove("hidden");

//     const phoneDisplay = orderConfirmation.querySelector(".phone-display");
//     if (phoneDisplay) {
//       phoneDisplay.textContent = "Phone Number: " + existingPhoneNumber;
//     }

//     document.querySelector('.quantity').textContent = "1";
//   }

//   if (buynow) {
//     buynow.addEventListener("click", function () {
//       updateSummaryFromProductPage();
//       phoneInputExisting.value = existingPhoneNumber;
//       otpModalExisting.classList.remove("hidden");

//       localStorage.setItem("orderSource", "buyNow");
//     });
//   }

//   if (proceedBtn) {
//     proceedBtn.addEventListener("click", function () {
//       otpModalExisting.classList.add("hidden");
//       finalizeOrder();
//     });
//   }

//   if (editBtn) {
//     editBtn.addEventListener("click", function () {
//       otpModalExisting.classList.add("hidden");
//       otpModalNew.classList.remove("hidden");
//     });
//   }

//   if (sendOtpBtn) {
//     sendOtpBtn.addEventListener("click", function () {
//       phoneInputNew.value = "1234567890";
//       otpModalNew.classList.add("hidden");
//       otpVerifyModal.classList.remove("hidden");
//     });
//   }

//   if (verifyOtpBtn) {
//     verifyOtpBtn.addEventListener("click", function () {
//       const otp = otpInput.value.trim();
//       if (otp === "1234") {
//         if (phoneInputNew.value.trim()) {
//           existingPhoneNumber = phoneInputNew.value.trim();
//         }
//         otpVerifyModal.classList.add("hidden");
//         finalizeOrder();
//       } else {
//         alert("Incorrect OTP.");
//       }
//     });
//   }

//   if (okBtn) {
//     okBtn.addEventListener("click", function (e) {
//       e.preventDefault();
//       document.body.classList.add('fade-out');
//       setTimeout(() => {
//         window.location.href = "index.html";
//       }, 500);
//     });
//   }

//   window.closeModal = function () {
//     otpModalExisting.classList.add("hidden");
//     otpModalNew.classList.add("hidden");
//     otpVerifyModal.classList.add("hidden");
//     orderConfirmation.classList.add("hidden");
//   };
// });

//////////////////////////////////////////////////////////





