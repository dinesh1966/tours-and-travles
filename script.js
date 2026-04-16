/* ============================================
   NEXTRIP HOLIDAYS — script.js
   All working functions
   ============================================ */

function injectFloatingButtons() {
  if (document.querySelector('.floating-contact-wrap')) return;
  const buttonsHtml = `
    <div class="floating-contact-wrap">
      <a href="https://instagram.com/nexttrip_holidays" class="floating-contact-btn instagram" target="_blank" aria-label="Follow us on Instagram">
        <i class="fab fa-instagram"></i>
        <span class="floating-btn-label">Follow Us</span>
      </a>
      <a href="https://wa.me/919976692604" class="floating-contact-btn whatsapp" target="_blank" aria-label="Chat with us on WhatsApp">
        <i class="fab fa-whatsapp"></i>
        <span class="floating-btn-label">Chat with Us</span>
      </a>
    </div>
  `;
  const container = document.body || document.documentElement;
  if (container) {
    container.insertAdjacentHTML('beforeend', buttonsHtml);
    console.log('✅ Floating buttons injected');
  }
}

// Immediate check
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  injectFloatingButtons();
} else {
  document.addEventListener('DOMContentLoaded', injectFloatingButtons);
}

// ===== GLOBAL BOOKING FUNCTIONS (Defined early for availability) =====
window.openBookingModal = function () {
  console.log('✈️ Opening Unified Booking Modal...');
  
  // 1. Close other potential modals first
  if (typeof closeItinerary === 'function') closeItinerary();
  if (typeof closePackageModal === 'function') closePackageModal();
  if (typeof closeLightbox === 'function') closeLightbox();
  if (typeof closeProgram === 'function') closeProgram(); // For South India style

  // 2. Handle localized itinerary modals (specific IDs across different page versions)
  const itinModals = ['itineraryModal', 'siModal', 'packageModal', 'galleryLightbox', 'bookingFormModal'];
  itinModals.forEach(id => {
    const m = document.getElementById(id);
    if (m) {
      if (id === 'siModal' || id === 'itineraryModal' || id === 'bookingFormModal') {
        m.style.display = 'none';
      }
      m.classList.remove('active');
    }
  });

  // 3. Ensure Booking Modal exists and open it
  if (typeof injectBookingModal === 'function') {
    injectBookingModal();
  } else {
      // Fallback if injectBookingModal hasn't been defined yet
      console.warn('injectBookingModal not found, trying again...');
  }
  
  const modal = document.getElementById('bookingModal');
  if (modal) {
    // 4. Pre-fill destination from any open modal title
    const modalTitle = document.getElementById('modalTitle') || document.getElementById('siTitle');
    const destInput = document.querySelector('#quickBookingForm input[name="destination"]');
    if (destInput && modalTitle) {
      destInput.value = modalTitle.textContent.replace('Tour Itinerary', '').trim();
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

// Aliases for all possible legacy function names used in subpages
window.openModal = window.openBookingModal;
window.openBookingForm = window.openBookingModal;
window.openBooking = window.openBookingModal;

window.closeBookingModal = function () {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

function handleModalSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('.modal-submit-btn');
  const originalText = btn.innerHTML;

  btn.disabled = true;
  btn.innerHTML = 'Processing... <i class="fa fa-spinner fa-spin"></i>';

  setTimeout(() => {
    btn.innerHTML = 'Success! <i class="fa fa-check"></i>';
    btn.style.background = '#22c55e';
    form.reset();

    setTimeout(() => {
      if (typeof window.closeBookingModal === 'function') {
        window.closeBookingModal();
      }
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
        btn.style.background = '';
      }, 500);
    }, 1500);
  }, 2000);
}

function injectBookingModal() {
  if (document.getElementById('bookingModal')) return;

  const modalHtml = `
  <div class="booking-modal-overlay" id="bookingModal" style="z-index: 20000;">
    <div class="booking-modal-box">
      <button class="close-modal-btn" onclick="closeBookingModal()"><i class="fa fa-times"></i></button>
      <div class="modal-header-premium">
        <h3>Quick <span>Booking</span></h3>
        <p>Fill in the details below and we'll get back to you shortly.</p>
      </div>
      <form class="modal-booking-form" id="quickBookingForm">
        <div class="modal-form-grid">
          <div class="modal-group">
            <label>Name</label>
            <input type="text" name="name" placeholder="Your Name" required>
          </div>
          <div class="modal-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="Your Email" required>
          </div>
          <div class="modal-group">
            <label>Phone</label>
            <input type="tel" name="phone" placeholder="Your Phone" required>
          </div>
          <div class="modal-group">
            <label>Destination</label>
            <input type="text" name="destination" placeholder="Where to go?" required>
          </div>
          <div class="modal-group full">
            <label>Special Instructions</label>
            <textarea name="message" rows="3" placeholder="Tell us more..."></textarea>
          </div>
        </div>
        <button type="submit" class="modal-submit-btn">Reserve Now <i class="fa fa-paper-plane"></i></button>
      </form>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', modalHtml);

  // Re-attach form listener for the newly injected form
  const quickBookingForm = document.getElementById('quickBookingForm');
  if (quickBookingForm) {
    quickBookingForm.addEventListener('submit', handleModalSubmit);
  }
}

(function () {


  // ===== 1. NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===== 2. MOBILE HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      if (mobileMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  // ===== 3. BOOKING TABS =====
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetEl = document.getElementById('tab-' + target);
      if (targetEl) targetEl.classList.add('active');
    });
  });

  // ===== 4. FLIGHT SWAP BUTTON =====
  const swapBtn = document.getElementById('swapBtn');
  if (swapBtn) {
    swapBtn.addEventListener('click', () => {
      const fromInput = document.querySelector('#tab-flight .form-item:first-child input');
      const toInput = document.querySelector('#tab-flight .swap-item input');
      if (fromInput && toInput) {
        const temp = fromInput.value;
        fromInput.value = toInput.value;
        toInput.value = temp;
      }
    });
  }

  // ===== 5. SCROLL ANIMATIONS =====
  const animEls = document.querySelectorAll(
    '.why-card, .tour-card, .testi-card, .pkg-card, .acc-item'
  );

  animEls.forEach((el, i) => {
    el.classList.add('animate-on-scroll');
    el.style.transitionDelay = (i % 4) * 0.1 + 's';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { threshold: 0.12 }
  );

  animEls.forEach(el => observer.observe(el));

  // ===== 6. FAQ ACCORDION =====
  function toggleAcc(btn) {
    const item = btn.closest('.acc-item');
    const body = item.querySelector('.acc-body');
    const isOpen = btn.classList.contains('active');

    // Close all
    document.querySelectorAll('.acc-trigger').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.acc-body').forEach(b => b.classList.remove('open'));

    // Open clicked (if it was closed)
    if (!isOpen) {
      btn.classList.add('active');
      body.classList.add('open');
    }
  }
  window.toggleAcc = toggleAcc;

  // ===== 7. STAR RATING =====
  let currentRating = 0;
  const starInputs = document.querySelectorAll('.stars-input .star');

  starInputs.forEach(star => {
    // Hover
    star.addEventListener('mouseover', () => {
      const val = parseInt(star.dataset.val);
      highlightStars(val);
    });
    star.addEventListener('mouseleave', () => {
      highlightStars(currentRating);
    });
    // Click
    star.addEventListener('click', () => {
      currentRating = parseInt(star.dataset.val);
      highlightStars(currentRating);
    });
  });

  function highlightStars(n) {
    starInputs.forEach(s => {
      const v = parseInt(s.dataset.val);
      s.classList.toggle('active', v <= n);
    });
  }

  // ===== 8. SUBMIT REVIEW =====
  function previewReviewImage(input) {
    const preview = document.getElementById('photoPreviewArea');
    preview.innerHTML = '';
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.style.width = '80px';
        img.style.height = '80px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '8px';
        img.style.marginTop = '10px';
        preview.appendChild(img);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  function submitReview() {
    const name = document.getElementById('reviewName').value.trim();
    const text = document.getElementById('reviewText').value.trim();
    const fileInput = document.getElementById('reviewPhoto');
    const list = document.getElementById('reviewList');

    if (!name) { shakeInput('reviewName'); return; }
    if (!text) { shakeInput('reviewText'); return; }
    if (!currentRating) {
      const wrap = document.querySelector('.star-rating-wrap');
      if (wrap) { wrap.style.color = 'var(--primary)'; setTimeout(() => wrap.style.color = '', 1000); }
      alert('Please select a star rating!');
      return;
    }

    const handleReview = (imgSrc = '') => {
      const stars = '★'.repeat(currentRating) + '☆'.repeat(5 - currentRating);
      const initials = name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();

      const item = document.createElement('div');
      item.className = 'review-item';
      item.innerHTML = `
      <div class="review-item-header">
        <div class="review-item-avatar">${initials}</div>
        <div>
          <div class="review-item-name">${escapeHtml(name)}</div>
          <div class="review-item-stars">${stars}</div>
        </div>
      </div>
      <div class="review-item-text">${escapeHtml(text)}</div>
      ${imgSrc ? `<div class="review-item-img"><img src="${imgSrc}" style="width: 100%; border-radius: 12px; margin-top: 15px; border: 1px solid #eee;"></div>` : ''}
    `;

      list.insertBefore(item, list.firstChild);

      // Reset form
      document.getElementById('reviewName').value = '';
      document.getElementById('reviewText').value = '';
      document.getElementById('reviewPhoto').value = '';
      document.getElementById('photoPreviewArea').innerHTML = '';
      currentRating = 0;
      highlightStars(0);
    };

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => handleReview(e.target.result);
      reader.readAsDataURL(fileInput.files[0]);
    } else {
      handleReview();
    }
  }

  window.previewReviewImage = previewReviewImage;
  window.submitReview = submitReview;

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function shakeInput(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.borderColor = 'var(--primary)';
    el.style.animation = 'shake 0.3s ease';
    el.focus();
    setTimeout(() => {
      el.style.animation = '';
      el.style.borderColor = '';
    }, 600);
  }

  // Shake animation
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
  }
`;
  document.head.appendChild(shakeStyle);

  // ===== 9. FAVOURITE BUTTON TOGGLE =====
  document.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      this.classList.toggle('liked');
      const icon = this.querySelector('i');
      if (this.classList.contains('liked')) {
        icon.style.color = 'var(--primary)';
      } else {
        icon.style.color = '';
      }
    });
  });

  // ===== 11. GALLERY FILTER =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.dataset.filter;

      // Filter gallery items
      galleryItems.forEach(item => {
        const itemCategory = item.dataset.category;

        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 0);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Add transition to gallery items
  galleryItems.forEach(item => {
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    item.style.opacity = '1';
    item.style.transform = 'scale(1)';
  });

  // ===== GALLERY LIGHTBOX =====
  let lightboxItems = [];
  let lightboxCurrentIndex = 0;

  function buildLightboxItems() {
    lightboxItems = Array.from(document.querySelectorAll('.gallery-item'));
  }

  function openLightbox(el) {
    buildLightboxItems();
    lightboxCurrentIndex = lightboxItems.indexOf(el);
    showLightboxItem(lightboxCurrentIndex);
    document.getElementById('galleryLightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function showLightboxItem(index) {
    const item = lightboxItems[index];
    if (!item) return;
    const img = item.querySelector('img');
    const title = item.dataset.title || img.alt;
    const place = item.dataset.place || '';

    const lightboxImg = document.getElementById('lightboxImg');
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = img.src.replace(/w=\d+/, 'w=1200');
      lightboxImg.alt = title;
      lightboxImg.onload = () => { lightboxImg.style.opacity = '1'; };
    }, 150);

    document.getElementById('lightboxTitle').textContent = title;
    document.getElementById('lightboxPlace').querySelector('span').textContent = place;
  }

  function closeLightbox() {
    const lb = document.getElementById('galleryLightbox');
    if (lb) {
      lb.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => {
        const img = document.getElementById('lightboxImg');
        if (img) img.src = '';
      }, 400);
    }
  }

  function closeLightboxOnBg(e) {
    if (e.target === document.getElementById('galleryLightbox')) {
      closeLightbox();
    }
  }

  function lightboxNav(dir) {
    const visibleItems = lightboxItems.filter(item => item.style.display !== 'none');
    const currentVisible = visibleItems.indexOf(lightboxItems[lightboxCurrentIndex]);
    let nextVisible = currentVisible + dir;
    if (nextVisible < 0) nextVisible = visibleItems.length - 1;
    if (nextVisible >= visibleItems.length) nextVisible = 0;
    lightboxCurrentIndex = lightboxItems.indexOf(visibleItems[nextVisible]);
    showLightboxItem(lightboxCurrentIndex);
  }

  window.openLightbox = openLightbox;
  window.closeLightbox = closeLightbox;
  window.lightboxNav = lightboxNav;
  window.closeLightboxOnBg = closeLightboxOnBg;

  // ===== 12. PACKAGE MODAL =====
  const packageData = {
    india: {
      title: 'India Tour Packages',
      description: 'Explore the rich culture, ancient temples, and diverse landscapes of India. From the Taj Mahal to Kerala backwaters, experience the magic of incredible India.',
      duration: '5-7 Days',
      tours: '98 Tours',
      price: 'From ₹ 25,000',
      season: 'Oct - Mar',
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/India-taj-mahal.jpg/1280px-India-taj-mahal.jpg',
        'https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=600',
        'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600',
        'https://images.unsplash.com/photo-1516105348601-1b3d51d0af9f?w=600'
      ],
      highlights: ['Taj Mahal Visit', 'Temple Tours', 'Cultural Experiences', 'Local Cuisine']
    },
    international: {
      title: 'International Packages',
      description: 'Discover world destinations including Europe, Asia, and Middle East. Experience iconic attractions, pristine beaches, and unforgettable adventures across the globe.',
      duration: '7-14 Days',
      tours: '362 Tours',
      price: 'From ₹ 45,000',
      season: 'Oct - Apr',
      images: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
        'https://images.unsplash.com/photo-1456516643941-e90de1f80a72?w=600',
        'https://images.unsplash.com/photo-1437395390328-c0fc13a91652?w=600',
        'https://images.unsplash.com/photo-1488299435215-e1b8f3e40c85?w=600'
      ],
      highlights: ['Visa Assistance', 'Flight Included', 'Hotel Stay', 'Guided Tours']
    },
    popular: {
      title: 'Popular Packages',
      description: 'Best-selling tour packages handpicked by our experts. These are the most loved destinations by our travelers with exceptional reviews and unforgettable experiences.',
      duration: '5-10 Days',
      tours: '144 Tours',
      price: 'From ₹ 35,000',
      season: 'Year Round',
      images: [
        'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600',
        'https://images.unsplash.com/photo-1491889556014-85f30f4b1c4b?w=600',
        'https://images.unsplash.com/photo-1488422682702-ee894fbb93b1?w=600'
      ],
      highlights: ['Best Value', 'Popular Routes', 'Expert Itineraries', 'Great Reviews']
    },
    boathouses: {
      title: 'Boat Houses',
      description: 'Experience luxurious houseboat stays in Kerala backwaters and other scenic locations. Enjoy tranquil waters, sunset views, and authentic local experiences.',
      duration: '3-5 Days',
      tours: '17 Tours',
      price: 'From ₹ 15,000',
      season: 'Sep - May',
      images: [
        'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=600',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600'
      ],
      highlights: ['Luxury Houseboat', 'Backwater Cruise', 'Sunset Views', 'Local Food']
    },
    properties: {
      title: 'Properties',
      description: 'Book premium vacation villas, beach resorts, and luxury properties at stunning destinations. Perfect for family holidays and group getaways.',
      duration: '7 Days +',
      tours: '144 Tours',
      price: 'From ₹ 30,000',
      season: 'Year Round',
      images: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600',
        'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=600',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
        'https://images.unsplash.com/photo-1566643537521-14f1dc19b9db?w=600'
      ],
      highlights: ['Luxury Villas', 'Beach Access', 'Private Pools', 'Premium Amenities']
    }
  };

  function openPackageModal(type) {
    const data = packageData[type];
    if (!data) return;

    const modal = document.getElementById('packageModal');
    if (!modal) return;

    const titleEl = document.getElementById('modalTitle');
    if (titleEl) titleEl.textContent = data.title;

    const descEl = document.getElementById('modalDescription');
    if (descEl) descEl.textContent = data.description;

    const durEl = document.getElementById('duration');
    if (durEl) durEl.textContent = data.duration;

    const toursEl = document.getElementById('toursAvailable');
    if (toursEl) toursEl.textContent = data.tours;

    const priceEl = document.getElementById('price');
    if (priceEl) priceEl.textContent = data.price;

    const seasonEl = document.getElementById('season');
    if (seasonEl) seasonEl.textContent = data.season;

    // Update images
    const mainImg = document.getElementById('mainImage');
    if (mainImg) mainImg.src = data.images[0];

    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, idx) => {
      thumb.src = data.images[idx] || '';
      thumb.classList.toggle('active', idx === 0);
    });

    // Update highlights
    const highlights = document.getElementById('packageHighlights');
    if (highlights) {
      highlights.innerHTML = data.highlights.map(h => `<li>${h}</li>`).join('');
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePackageModal() {
    const modal = document.getElementById('packageModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function changeMainImage(thumbnail) {
    const mainImg = document.getElementById('mainImage');
    mainImg.src = thumbnail.src;

    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    thumbnail.classList.add('active');
  }

  window.bookPackage = function () {
    const titleEl = document.getElementById('modalTitle');
    const title = titleEl ? titleEl.textContent : '';

    // Pre-fill destination if field exists in the modal
    const destInput = document.querySelector('#quickBookingForm input[name="destination"]');
    if (destInput) destInput.value = title;

    openBookingModal();
  }

  // Close modals on escape key / lightbox arrow navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePackageModal();
      closeLightbox();
    }
    if (document.getElementById('galleryLightbox')?.classList.contains('active')) {
      if (e.key === 'ArrowLeft') lightboxNav(-1);
      if (e.key === 'ArrowRight') lightboxNav(1);
    }
  });

  // ===== 13. NEWSLETTER SUBMIT ===== 
  document.querySelectorAll('.nl-input-wrap button').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (input && input.value.includes('@')) {
        btn.textContent = '✓ Subscribed!';
        btn.style.background = '#22c55e';
        input.value = '';
        setTimeout(() => {
          btn.textContent = 'Subscribe';
          btn.style.background = '';
        }, 3000);
      } else if (input) {
        input.style.borderColor = 'var(--primary)';
        input.placeholder = 'Enter a valid email!';
        setTimeout(() => {
          input.style.borderColor = '';
          input.placeholder = 'Enter your email address';
        }, 2000);
      }
    });
  });

  // ===== 13. ACTIVE NAV LINK on SCROLL =====
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });

  // ===== 14. HERO SLIDER =====
  const heroSlider = document.getElementById('heroSlider');
  if (heroSlider) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const nextBtn = document.getElementById('sliderNext');
    const prevBtn = document.getElementById('sliderPrev');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
      if (!slides.length) return;
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));

      currentSlide = (index + slides.length) % slides.length;
      if (slides[currentSlide]) slides[currentSlide].classList.add('active');
      if (dots && dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
      }
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    function startSlideShow() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        startSlideShow();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
        startSlideShow();
      });
    }

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        showSlide(parseInt(dot.dataset.index));
        startSlideShow();
      });
    });

    // Initial start
    startSlideShow();
  }



  // ===== 15. TOUR PAGE RIPPLE EFFECT =====
  $(document).ready(function () {
    const rippleTargets = '.dt-image-area, .package-hero, .dt-main-img';
    if ($(rippleTargets).length) {
      try {
        $(rippleTargets).ripples({
          resolution: 512,
          dropRadius: 20,
          perturbance: 0.04,
          interactive: true
        });
      } catch (e) {
        console.error('Ripple effect failed to load:', e);
      }
    }
  });

  // ===== 15. QUICK BOOKING MODAL LOGIC =====
  // Global Close function
  window.closeBookingModal = window.closeBookingModal;

  // Global submission logic moved above IIFE

  // Global Modal Event Listeners
  document.addEventListener('click', (e) => {
    const modal = document.getElementById('bookingModal');
    if (e.target === modal) closeBookingModal();
  });

  // ===== 16. GLOBAL BOOK NOW TRIGGER =====
  // This will catch ALL buttons with 'Book Now', 'Book This Tour' text or relevant classes
  document.addEventListener('click', (e) => {
    const target = e.target.closest('button, a');
    if (!target) return;

    const text = target.textContent.trim().toLowerCase().replace(/\s+/g, ' ');

    // Check if it's a book button
    const isBookBtn = target.classList.contains('tour-btn') ||
      target.classList.contains('pkg-btn') ||
      target.classList.contains('btn-primary') ||
      text === 'book now' ||
      text === 'book this tour' ||
      text.includes('book now') ||
      text.includes('book this tour');

    if (isBookBtn) {
      // Basic validation to avoid false positives on navigation links that might happen to have these words
      // but usually in this site they are meant to be booking buttons.
      e.preventDefault();
      openBookingModal();
    }
  });

  // ===== 17. CONTACT FORM SUBMISSION =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.submit-booking-btn');
      const originalText = btn.innerHTML;

      btn.disabled = true;
      btn.innerHTML = 'Sending... <i class="fa fa-spinner fa-spin"></i>';

      setTimeout(() => {
        btn.innerHTML = 'Enquiry Sent! <i class="fa fa-check"></i>';
        btn.style.background = '#22c55e';
        contactForm.reset();

        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = originalText;
          btn.style.background = '';
        }, 3000);
      }, 1500);
    });
  }

  // ===== INIT =====
  document.addEventListener('DOMContentLoaded', () => {
    // Trigger first FAQ open
    const firstTrigger = document.querySelector('.acc-trigger.active');
    if (firstTrigger) {
      const body = firstTrigger.closest('.acc-item').querySelector('.acc-body');
      if (body) body.classList.add('open');
    }

    // Mobile Nav Link Auto Close
    document.querySelectorAll('.mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        document.getElementById('mobileMenu').classList.remove('open');
        const spans = document.querySelectorAll('.hamburger span');
        if (spans.length > 0) {
          spans[0].style.transform = '';
          spans[1].style.opacity = '';
          spans[2].style.transform = '';
        }
      });
    });

    console.log('✈️ NextTrip Holidays — Script Loaded');
    if (typeof injectFloatingButtons === 'function') {
      injectFloatingButtons();
    }
  });

  // ===== 18. AUTO MODAL POPUP (4 seconds) =====
  window.addEventListener('load', () => {
    setTimeout(() => {
      // Check if various modal types are already open
      const itinModal = document.getElementById('itineraryModal');
      const packModal = document.getElementById('packageModal');
      const lbModal = document.getElementById('galleryLightbox');
      const bookingModal = document.getElementById('bookingModal');

      const anyModalOpen = (itinModal && itinModal.style.display === 'flex') ||
        (packModal && packModal.classList.contains('active')) ||
        (lbModal && lbModal.classList.contains('active')) ||
        (bookingModal && bookingModal.classList.contains('active'));

      if (!anyModalOpen) {
        console.log('Triggering auto-popup after 4s...');
        if (typeof openBookingModal === 'function') {
          openBookingModal();
        }
      }
    }, 4000);
  });

  // ===== 19. FLOATING CONTACT BUTTONS INJECTION =====
  function injectFloatingButtons() {
    if (document.querySelector('.floating-contact-wrap')) return;

    const buttonsHtml = `
    <div class="floating-contact-wrap">
      <a href="https://instagram.com/nexttrip_holidays" class="floating-contact-btn instagram" target="_blank" aria-label="Follow us on Instagram">
        <i class="fab fa-instagram"></i>
        <span class="floating-btn-label">Follow Us</span>
      </a>
      <a href="https://wa.me/919976692604" class="floating-contact-btn whatsapp" target="_blank" aria-label="Chat with us on WhatsApp">
        <i class="fab fa-whatsapp"></i>
        <span class="floating-btn-label">Chat with Us</span>
      </a>
    </div>
  `;
    const container = document.body || document.documentElement;
    container.insertAdjacentHTML('beforeend', buttonsHtml);
  }

})();