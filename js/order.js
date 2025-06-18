
///////////////////////// Search Functionaity  ///////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchCloseIcon = document.getElementById('searchCloseIcon');
    const navLinks = document.querySelectorAll('.nav-links a');
    const footer = document.getElementById('footer');
    const productHeader = document.querySelector('.product-header');
    const allproductscard = document.querySelector('.all-products');
    const productSection = document.querySelector('.product-section');
    const backtick = document.querySelector('.back-tick');
    const cartH2 = document.getElementById('cart-h2');
    const cartItemContainer = document.getElementById('cartItemContainer');
    const summary = document.querySelector('.summary');
    const descriptions = document.querySelectorAll('.product-description');

    let allProducts = [];

    fetch('./js/products.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            updateProductDisplay(allProducts);
        })
        .catch(error => console.error('Error loading the products:', error));

    // Update product display based on filtered list
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

        // Hide extra cards
        cards.forEach((card, index) => {
            if (index >= productList.length) {
                card.style.display = 'none';
            }
        });
    }

    updateProductDisplay(allProducts);

    // Search functionality
    searchInput.addEventListener('input', () => {
        const term = searchInput.value.trim().toLowerCase();

        if (term.length < 5) {
            updateProductDisplay(allProducts);
            productHeader.innerHTML = `<p>All Products</p>`;
            productSection.style.display = 'none';
            productHeader.style.display = 'none';
            cartItemContainer.style.display = 'block';
            allproductscard.style.height = 'auto';
            summary.style.display = 'block';
            cartH2.style.display = 'block';
            footer.style.display = 'block';
            backtick.style.display = 'block';
            descriptions.forEach(desc => desc.style.display = 'none');
            return;
        }

        const filtered = allProducts.filter(product =>
            product.title.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term)
        );

        updateProductDisplay(filtered);
        productHeader.innerHTML = `<p><span>${filtered.length}</span> Products Found</p>`;
        productSection.style.display = 'block';
        productHeader.style.display = 'block';
        cartItemContainer.style.display = 'none';
        summary.style.display = 'none';
        cartH2.style.display = 'none';
        footer.style.display = 'block';
        backtick.style.display = 'none';
        descriptions.forEach(desc => desc.style.display = 'none');

        // Apply margin-top ONLY after search is triggered
        document.querySelector('.img-contact-details')?.style.setProperty('margin-top', '20px');
        document.querySelector('.footer-icons')?.style.setProperty('margin-top', '20px');
    });

    // Close search functionality
    searchCloseIcon.addEventListener('click', () => {
        searchInput.value = '';
        updateProductDisplay(allProducts);
        productHeader.innerHTML = `<p>All Products</p>`;
        productSection.style.display = 'none';
        cartH2.style.display = 'block';
        cartItemContainer.style.display = 'block';
        footer.style.display = 'block';
        backtick.style.display = 'block';
        descriptions.forEach(desc => desc.style.display = 'none');

        document.body.classList.add('fade-out');

        setTimeout(() => {
            window.location.href = 'order.html';
        }, 500);
    });

    // Navigation links event handling
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            searchInput.value = '';
            updateProductDisplay(allProducts);
            productHeader.innerHTML = `<p>All Products</p>`;
            productSection.style.display = 'none';
            cartH2.style.display = 'block';
            cartItemContainer.style.display = 'block';
            footer.style.display = 'block';
            backtick.style.display = 'block';
            descriptions.forEach(desc => desc.style.display = 'none');
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



// popup the demo.html file 
document.addEventListener('DOMContentLoaded', () => {
  const confirmBtn = document.getElementById('confirm-btn');
  const popupContainer = document.getElementById('popup-container');

  confirmBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('component/demo.html');
      const html = await response.text();
      popupContainer.innerHTML = html;
      popupContainer.style.display = 'block';

      // Wait for popup HTML to be fully inserted before attaching listeners
      setTimeout(() => {
        const closeBtn = popupContainer.querySelector('.close-btn');
        const cancelBtn = popupContainer.querySelector('.btn-2');
        const getInTouchBtn = popupContainer.querySelector('.btn-1');

        closeBtn?.addEventListener('click', () => {
          popupContainer.style.display = 'none';
        });

        cancelBtn?.addEventListener('click', () => {
          popupContainer.style.display = 'none';
        });

        getInTouchBtn?.addEventListener('click', () => {
          window.location.href = 'index.html';
        });
      }, 10); // Small delay to ensure elements exist
    } catch (error) {
      console.error('Failed to load popup:', error);
    }
  });
});

/// logic of card item
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

  cartItemContainer.innerHTML = "";

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





////// Popup Fuctionality ///////////

// document.addEventListener("DOMContentLoaded", function () {

//   const confirmBtn = document.getElementById("confirm-btn");
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

//   const shippingCharge = 50;  
//   let existingPhoneNumber = "9876543210"; 

//   function updateSummary() {
//     let total = 0;
//     const cartItems = document.querySelectorAll(".cart-item");

//     cartItems.forEach(function (itemEl) {
//       const itemPrice = parseFloat(itemEl.querySelector(".item-price").textContent);
//       total += itemPrice;
//     });

//     const paymentAmount = total + shippingCharge;

//     localStorage.setItem("cartSubtotal", total.toFixed(2));
//     localStorage.setItem("cartTotalAmount", paymentAmount.toFixed(2));

//     if (subtotalElement) subtotalElement.textContent = "₹ " + total.toFixed(2);
//     if (shippingElement) shippingElement.textContent = "₹ " + shippingCharge.toFixed(2);
//     if (totalPaymentElement) totalPaymentElement.textContent = "₹ " + paymentAmount.toFixed(2);
//   }


//   function loadFromLocalStorage() {
//     const storedSubtotal = localStorage.getItem("cartSubtotal");
//     const storedTotalAmount = localStorage.getItem("cartTotalAmount");

//     if (storedSubtotal && subtotalElement) {
//       subtotalElement.textContent = "₹ " + storedSubtotal;
//     }
//     if (storedTotalAmount && totalPaymentElement) {
//       totalPaymentElement.textContent = "₹ " + storedTotalAmount;
//     }
//   }

//   // Send OTP for new user
//   if (sendOtpBtn) {
//     sendOtpBtn.addEventListener("click", function () {
//       const number = phoneInputNew.value.replace(/\s+/g, "");
//       if (number === "1234567890") {
//         otpModalNew.classList.add("hidden");
//         otpVerifyModal.classList.remove("hidden");
//       } else {
//         alert("Invalid mobile number.");
//       }
//     });
//   }

//   // Confirm button for existing user
//   if (confirmBtn) {
//     confirmBtn.addEventListener("click", function () {
//       phoneInputExisting.value = existingPhoneNumber;
//       otpModalExisting.classList.remove("hidden");
//     });
//   }

//   // Proceed after OTP verification (existing user)
//   if (proceedBtn) {
//     proceedBtn.addEventListener("click", function () {
//       updateSummary(); // ✅ Ensure subtotal and total are updated

//       otpModalExisting.classList.add("hidden");

//       console.log('Subtotal Element:', subtotalElement ? subtotalElement.textContent : 'Not Found');
//       console.log('Shipping Element:', shippingElement ? shippingElement.textContent : 'Not Found');
//       console.log('Total Payment Element:', totalPaymentElement ? totalPaymentElement.textContent : 'Not Found');

//       if (four) {
//         if (subtotalElement) {
//           four.textContent = subtotalElement.textContent;
//         } else {
//           four.textContent = "₹400.00";
//         }
//       }

//       if (five) {
//         if (shippingElement) {
//           five.textContent = shippingElement.textContent;
//         } else {
//           five.textContent = "₹50.00";
//         }
//       }

//       if (fourFive) {
//         if (totalPaymentElement) {
//           fourFive.textContent = totalPaymentElement.textContent;
//         } else {
//           fourFive.textContent = "₹450.00";
//         }
//       }

//       orderConfirmation.classList.remove("hidden");
//     });
//   }

//   // Edit button click - switch to new user modal
//   if (editBtn) {
//     editBtn.addEventListener("click", function () {
//       otpModalExisting.classList.add("hidden");
//       otpModalNew.classList.remove("hidden");
//     });
//   }

//   // Verify OTP button click (new user)
//   if (verifyOtpBtn) {
//     verifyOtpBtn.addEventListener("click", function () {
//       const otp = otpInput.value.trim();
//       if (otp === "1234") {
//         updateSummary();
//         otpVerifyModal.classList.add("hidden");

//         if (phoneInputNew.value.trim()) {
//           existingPhoneNumber = phoneInputNew.value.trim();
//         }

//         if (four) {
//           if (subtotalElement) {
//             four.textContent = subtotalElement.textContent;
//           } else {
//             four.textContent = "₹400.00";
//           }
//         }

//         if (five) {
//           if (shippingElement) {
//             five.textContent = shippingElement.textContent;
//           } else {
//             five.textContent = "₹50.00";
//           }
//         }

//         if (fourFive) {
//           if (totalPaymentElement) {
//             fourFive.textContent = totalPaymentElement.textContent;
//           } else {
//             fourFive.textContent = "₹450.00";
//           }
//         }

//         orderConfirmation.classList.remove("hidden");

//         const phoneDisplay = orderConfirmation.querySelector(".phone-display");
//         if (phoneDisplay) {
//           phoneDisplay.textContent = "Phone Number: " + existingPhoneNumber;
//         }
//       } else {
//         alert("Incorrect OTP.");
//       }
//     });
//   } else {
//     console.error("verifyOtpBtn not found!");
//   }

//   // OK button to go back to homepage
//   if (okBtn) {
//     okBtn.addEventListener("click", function (e) {
//       e.preventDefault();
//         // Save latest values before leaving
//         updateSummary();
//       document.body.classList.add('fade-out');
//       setTimeout(() => {
//         window.location.href = "index.html";
//       }, 500);
//     });
//   }

//   // Function to close all modals
//   window.closeModal = function () {
//     if (otpModalExisting) otpModalExisting.classList.add("hidden");
//     if (otpModalNew) otpModalNew.classList.add("hidden");
//     if (otpVerifyModal) otpVerifyModal.classList.add("hidden");
//     if (orderConfirmation) orderConfirmation.classList.add("hidden");
//   };
//  // ✅ Update totals and load them in UI when page loads
//  updateSummary();
//  loadFromLocalStorage();
// });





//// End of Popup Fuctionality ///////



