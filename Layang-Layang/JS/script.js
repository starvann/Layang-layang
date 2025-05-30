// Variabel untuk menyimpan informasi menu yang sedang dibuka
let currentPopup = {
  name: '',
  reviews: [],
  baseRating: 0
};

// Fungsi untuk membuka popup detail menu
function openDetail(name, desc, rating, reviews = [], location = '', otherMenus = []) {
  currentPopup = {
    name,
    reviews: [...reviews],
    baseRating: parseFloat(rating)
  };

  const popup = document.getElementById('popup');
  document.getElementById('popup-title').textContent = name;
  document.getElementById('popup-rating').textContent = `⭐ ${rating}`;
  document.getElementById('popup-desc').textContent = desc;

  const reviewTable = popup.querySelector('.review-table');
  reviewTable.innerHTML = '<tr><th>Nama</th><th>Ulasan</th></tr>';
  reviews.forEach(([nama, ulasan]) => {
    reviewTable.innerHTML += `<tr><td>${nama}</td><td>${ulasan}</td></tr>`;
  });

  popup.querySelector('#popup-location').textContent = location;

  const menuList = popup.querySelector('#popup-other-menu');
  menuList.innerHTML = '';
  otherMenus.forEach(menu => {
    menuList.innerHTML += `<li>${menu}</li>`;
  });

  popup.classList.remove('hidden');
  setTimeout(() => popup.classList.add('show'), 10);

  // ✅ FIXED BUTTON ACTION
  const orderButton = document.getElementById('order-button');
  if (orderButton) {
    orderButton.onclick = function () {
      const encodedMenus = encodeURIComponent(JSON.stringify(otherMenus));
      window.location.href = `order.html?menu=${encodedMenus}`;
    };
  }
}

// Fungsi untuk menyembunyikan popup
function hidePopup() {
  const popup = document.getElementById('popup');
  popup.classList.remove('show');
  setTimeout(() => popup.classList.add('hidden'), 300);
}

// Fungsi untuk menggeser slider menu rekomendasi
function scrollSlider(direction) {
  const slider = document.getElementById('menu-slider');
  const scrollAmount = 220;
  slider.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

// Fungsi untuk menambahkan review baru
function submitReview(event) {
  event.preventDefault();
  const name = document.getElementById('reviewer-name').value.trim();
  const comment = document.getElementById('reviewer-comment').value.trim();
  const rating = parseFloat(document.getElementById('reviewer-rating').value);
  if (!name || !comment || isNaN(rating)) {
    alert("Mohon isi semua kolom.");
    return;
  }

  currentPopup.reviews.push([name, comment]);
  const table = document.querySelector('.review-table');
  table.innerHTML += `<tr><td>${name}</td><td>${comment}</td></tr>`;

  const totalRating = currentPopup.baseRating * (currentPopup.reviews.length - 1) + rating;
  const avgRating = (totalRating / currentPopup.reviews.length).toFixed(1);
  document.getElementById('popup-rating').textContent = `⭐ ${avgRating}`;
  event.target.reset();
}

// Nama Pengguna
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("nameModal");
  const nameInput = document.getElementById("nameInput");
  const submitBtn = document.getElementById("submitName");

  modal.style.display = "flex";

  submitBtn.addEventListener("click", function () {
    const userName = nameInput.value.trim() || "Guest";
    document.getElementById("username").innerText = userName;
    modal.style.display = "none";
  });
});

// Toggle navbar menu di mobile
function toggleMenu() {
  const navMenu = document.querySelector(".navbar nav ul");
  if (navMenu.style.display === "flex") {
    navMenu.style.display = "none";
  } else {
    navMenu.style.display = "flex";
  }
}
