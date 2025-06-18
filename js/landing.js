
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


document.querySelectorAll('.add-to-cart').forEach(button => {
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

  
document.getElementById('cart-icon').addEventListener('click',()=>{
    document.body.classList.add('fade-out')
  
    setTimeout(()=>{
      window.location.href = 'order.html';
    },500)
  });






//////////////// search funtionality /////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchCloseIcon = document.getElementById('searchCloseIcon');
  const navLinks = document.querySelectorAll('.nav-links a');
  const footer = document.querySelector('.fotter');
  const allproductscard = document.querySelector('.all-products');
  const productHeader = document.querySelector('.product-header');
  const banner = document.querySelector('.banner');
  // const clickmore = document.querySelector('.click-more');

  let allProducts = [];

  function updateProductDisplay(productList) {
    const cards = document.querySelectorAll('.product-card');

    productList.forEach((product, index) => {
      const card = cards[index];
      if (card) {
        const imageEl = card.querySelector('.product-image');
        const titleEl = card.querySelector('.product-title');
        const priceEl = card.querySelector('.product-price');

        imageEl.src = product.imageSrc || '';
        imageEl.alt = product.title || '';
        titleEl.textContent = product.title || '';
        priceEl.textContent = product.price || '';

        card.style.display = '';
      }
    });

    cards.forEach((card, index) => {
      if (index >= productList.length) {
        card.style.display = 'none';
      }
    });
  }

  // Fetch product data from products.json
  fetch('./js/products.json')
    .then(response => response.json())
    .then(data => {
      allProducts = data;
      updateProductDisplay(allProducts);

      // Add event listeners here so they execute after data is loaded
      setupEventListeners();
    })
    .catch(error => {
      console.error('Failed to load products:', error);
    });

  function setupEventListeners() {
    searchInput.addEventListener('input', () => {
      const term = searchInput.value.trim().toLowerCase();

      if (term.length >= 5) {
        const filtered = allProducts.filter(product =>
          product.title.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term)
        );

        updateProductDisplay(filtered);
        productHeader.innerHTML = `<p><span>${filtered.length}</span> Products </p>`;
        allproductscard.style.height = 'auto';
        banner.style.display = 'none';
        footer.style.display = '';
        // clickmore.style.display = 'none';
        localStorage.setItem('filteredProducts', JSON.stringify(filtered));
      } else {
        updateProductDisplay(allProducts);
        productHeader.innerHTML = `<p>All Products</p>`;
        banner.style.display = '';
        footer.style.display = '';
        // clickmore.style.display = '';
        localStorage.removeItem('filteredProducts');
      }
    });

    searchCloseIcon.addEventListener('click', () => {
      searchInput.value = '';
      updateProductDisplay(allProducts);
      productHeader.innerHTML = `<p>All Products</p>`;
      banner.style.display = '';
      footer.style.display = '';
      // clickmore.style.display = '';
      localStorage.removeItem('filteredProducts');

      document.body.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 500);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        searchInput.value = '';
        updateProductDisplay(allProducts);
        banner.style.display = '';
        footer.style.display = '';
        // clickmore.style.display = '';
      });
    });
  }
});

  
  /////////////////////////////////////////////////////
  














