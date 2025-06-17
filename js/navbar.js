const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon-h');
const navLinks = document.getElementById('navLinks');

menuIcon.addEventListener('click', () => {
  navLinks.classList.add('active');
  menuIcon.style.display = 'none';
  closeIcon.style.display = 'block';
});

closeIcon.addEventListener('click', () => {
  navLinks.classList.remove('active');
  menuIcon.style.display = 'block';
  closeIcon.style.display = 'none';
});


document.addEventListener("DOMContentLoaded", () => {
  // Search Bar Logic
  const searchTrigger = document.getElementById("searchTrigger");
  const searchCloseIcon = document.getElementById("searchCloseIcon");
  const logo = document.getElementById("logo-img");
  const cartNotification = document.querySelector('.cart-notification');
  const searchIcon = document.getElementById('searchIcon');
  const searchBox = document.getElementById("searchBox");

  searchBox.style.display = "none";

  searchTrigger.addEventListener("click", (e) => {
    e.preventDefault();
    searchBox.style.display = "flex";

    if (window.innerWidth < 1024) {
      logo.style.display = "none";
    }

    cartNotification.style.display = "none";
    searchIcon.style.display = "none";
  });

  searchCloseIcon.addEventListener("click", (e) => {
    e.preventDefault();
    searchBox.style.display = "none";

    logo.style.display = "block";
    cartNotification.style.display = "flex";
    searchIcon.style.display = "block";

    setTimeout(() => {
      location.reload();
    }, 100);
  });

  // Popup Logic
  const spicesBtn = document.getElementById("spices");
  const masalasBtn = document.getElementById("masalas");
  const popupContainer = document.getElementById("popupContainer");
  const navLinks = document.getElementById("navLinks");

  async function openPopup() {
    try {
      const res = await fetch("component/demo.html");
      const html = await res.text();
      popupContainer.innerHTML = html;

      const overlay = popupContainer.querySelector(".model-overlay");
      const closeBtn = popupContainer.querySelector(".close-btn");
      const cancelBtn = popupContainer.querySelector(".btn-2");
      const getInTouchBtn = popupContainer.querySelector(".btn-1");

      overlay.style.display = "block";

      function closeModal() {
        overlay.style.display = "none";
        popupContainer.innerHTML = "";
        setTimeout(() => {
          location.reload(); 
        }, 300); 
      }

      closeBtn.addEventListener("click", closeModal);
      cancelBtn.addEventListener("click", closeModal);
      getInTouchBtn.addEventListener("click", () => {
        window.location.href = "index.html"; // Redirect to contact page
      });
    } catch (err) {
      console.error("Failed to load popup:", err);
    }
  }

  function handleClickNavItem(e, type) {
    e.preventDefault();

    if (window.innerWidth >= 1024) {
      openPopup();
    } else {
      // Mobile / Tablet
      navLinks.classList.remove("active");      
      navLinks.style.top = "-100%";             
      openPopup();                              
    }
  }

  if (spicesBtn) {
  spicesBtn.addEventListener("click", (e) => handleClickNavItem(e, "spices"));
}
if (masalasBtn) {
  masalasBtn.addEventListener("click", (e) => handleClickNavItem(e, "masalas"));
}

});