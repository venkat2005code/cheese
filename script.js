document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // SPA ROUTING
  // ==========================================
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-item, .footer-link, .logo, .hero-actions-container a, .btn-text, .story-text-content a, .partners-section a, .package-footer a');
  const views = document.querySelectorAll('.app-view');

  function handleRoute() {
    let hash = window.location.hash || '#home-1';

    // Safety check for empty or invalid hashes
    if (hash === '#') hash = '#home-1';

    const targetViewId = 'view-' + hash.substring(1);
    const targetView = document.getElementById(targetViewId);

    if (targetView) {
      // Hide all views
      views.forEach(view => view.classList.remove('active'));
      // Show active view
      targetView.classList.add('active');

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Update Nav Active State
      const currentNavLinks = document.querySelectorAll('.nav-link');
      currentNavLinks.forEach(link => {
        if (link.getAttribute('href') === hash) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    // Close mobile drawer on route change
    document.getElementById('nav-menu').classList.remove('active');
    document.getElementById('mobile-toggle').classList.remove('active');
    const dropdownParent = document.querySelector('.nav-item.dropdown');
    if (dropdownParent) dropdownParent.classList.remove('open');

    // Trigger Leaflet map load if route is contact
    if (hash === '#contact') {
      setTimeout(() => {
        if (typeof initLeafletMap === 'function') {
          initLeafletMap();
        }
      }, 150);
    }
  }

  window.addEventListener('hashchange', handleRoute);
  // Initial routing
  handleRoute();


  // ==========================================
  // MOBILE MENU DRAWER
  // ==========================================
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  mobileToggleBtn.addEventListener('click', () => {
    mobileToggleBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu if user clicks outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileToggleBtn.contains(e.target) && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      mobileToggleBtn.classList.remove('active');
      const dropdownParent = document.querySelector('.nav-item.dropdown');
      if (dropdownParent) dropdownParent.classList.remove('open');
    }
  });

  // Mobile Dropdown Toggle Link handler
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  if (dropdownToggle) {
    dropdownToggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        const parent = dropdownToggle.closest('.nav-item.dropdown');
        if (parent) {
          parent.classList.toggle('open');
        }
      }
    });
  }


  // ==========================================
  // DARK / LIGHT THEME TOGGLE
  // ==========================================
  const themeToggleBtns = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
  const body = document.body;

  // Check Local Storage
  const savedTheme = localStorage.getItem('theme') || 'light-theme';
  body.className = savedTheme;

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (body.classList.contains('light-theme')) {
        body.classList.replace('light-theme', 'dark-theme');
        localStorage.setItem('theme', 'dark-theme');
      } else {
        body.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('theme', 'light-theme');
      }
    });
  });


  // ==========================================
  // LTR / RTL TEXT DIRECTION TOGGLE
  // ==========================================
  const rtlToggleBtns = document.querySelectorAll('#rtl-toggle, #rtl-toggle-mobile');
  const htmlElement = document.documentElement;

  // Check Local Storage
  const savedDir = localStorage.getItem('dir') || 'ltr';
  htmlElement.setAttribute('dir', savedDir);

  function updateRtlToggleUI(dir) {
    rtlToggleBtns.forEach(btn => {
      if (dir === 'rtl') {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  updateRtlToggleUI(savedDir);

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = htmlElement.getAttribute('dir');
      if (currentDir === 'ltr') {
        htmlElement.setAttribute('dir', 'rtl');
        updateRtlToggleUI('rtl');
        localStorage.setItem('dir', 'rtl');
      } else {
        htmlElement.setAttribute('dir', 'ltr');
        updateRtlToggleUI('ltr');
        localStorage.setItem('dir', 'ltr');
      }
    });
  });


  // ==========================================
  // INTERACTIVE FLAVOR PAIRINGS LAB (HOME 2)
  // ==========================================
  const pairingBtns = document.querySelectorAll('.pairing-select-btn');
  const pairingTitle = document.getElementById('pairing-title-val');
  const pairingDesc = document.getElementById('pairing-desc-val');
  const pairingMeat = document.getElementById('pairing-meat-val');
  const pairingSweet = document.getElementById('pairing-sweet-val');
  const pairingWine = document.getElementById('pairing-wine-val');

  const pairingData = {
    brie: {
      title: "Double Cream French Brie",
      desc: '"A buttery, decadent, bloomy-rind cheese that melts elegantly in the mouth."',
      meat: "Prosciutto di Parma, Speck, or Spicy Coppa",
      sweet: "Fresh ripe figs, raw local honeycomb, or crisp green grapes",
      wine: "Chardonnay, French Champagne, or a dry sparkling Rosé"
    },
    gouda: {
      title: "24-Month Aged Dutch Gouda",
      desc: '"A firm cheese with sweet butterscotch notes, tyrosine crystals, and deep amber coloring."',
      meat: "Smoked Genoa Salami, Peppered Bresaola, or beef jerky",
      sweet: "Candied walnuts, dried apricots, or dark caramel sauce",
      wine: "Cabernet Sauvignon, Amber Beers, or 10-year Tawny Port"
    },
    gorgonzola: {
      title: "Gorgonzola Dolce",
      desc: '"A soft, creamy blue cheese from Northern Italy, featuring mild, sweet and earthy metallic veins."',
      meat: "Mild Mortadella, Fennel Salumi, or crispy Pancetta shards",
      sweet: "Sliced Bosc pears, wild acacia honey, or sweet black cherries",
      wine: "Sauternes, Moscato d'Asti, or a bold Syrah"
    },
    pecorino: {
      title: "Italian Truffle Pecorino",
      desc: '"A sheep\'s milk cheese from Tuscany infused with black truffle shavings, offering a rich, aromatic bite."',
      meat: "Traditional Prosciutto, dry-cured Coppa, or Wild Boar salami",
      sweet: "Caramelized onion jam, roasted hazelnuts, or balsamic glaze drizzle",
      wine: "Chianti Classico, Brunello di Montalcino, or dry Italian Pinot Grigio"
    }
  };

  pairingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button active state
      pairingBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update content
      const selection = btn.getAttribute('data-pairing');
      const data = pairingData[selection];

      if (data) {
        pairingTitle.textContent = data.title;
        pairingDesc.textContent = data.desc;
        pairingMeat.textContent = data.meat;
        pairingSweet.textContent = data.sweet;
        pairingWine.textContent = data.wine;
      }
    });
  });


  // ==========================================
  // HOME 1 TESTIMONIAL SLIDER
  // ==========================================
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  const testimonialText = document.querySelector('.testimonial-text');
  const clientName = document.querySelector('.client-name');
  const clientRole = document.querySelector('.client-role');

  const testimonials = [
    {
      text: '"L\'Aura Grazing completely wowed our guests at our wedding cocktail hour. The grazing table was an absolute masterpiece—the cheeses were exquisite, the design was jaw-droppingly beautiful, and people still talk about it today!"',
      name: "Eleanor & Julian Vance",
      role: "Wedding Clients | October 2025"
    },
    {
      text: '"For our annual product launch, we wanted something more engaging than conventional appetizers. The corporate gift boxes and custom grazes Marcus designed were visual highlights that kept our team interacting and happy all night."',
      name: "Sabrina Wells",
      role: "Operations VP, TechCorp | December 2025"
    },
    {
      text: '"The styling class was the most fun bridal shower activity ever! We learned about cheese structures, flavor dynamics, and went home with custom boards that looked like high-end restaurant platters. A wonderful memory!"',
      name: "Chloe Abernathy",
      role: "Bridal Shower Organizer | March 2026"
    }
  ];

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      // Toggle active dot
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      // Update content with fade transition
      const cardElement = document.querySelector('.testimonial-card');
      cardElement.style.opacity = '0';

      setTimeout(() => {
        const item = testimonials[index];
        testimonialText.textContent = item.text;
        clientName.textContent = item.name;
        clientRole.textContent = item.role;
        cardElement.style.opacity = '1';
      }, 300);
    });
  });


  // ==========================================
  // HOME 2 FAQ ACCORDION
  // ==========================================
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const isOpen = parent.classList.contains('active');

      // Close all first
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-icon i').className = 'fas fa-plus';
      });

      if (!isOpen) {
        parent.classList.add('active');
        btn.querySelector('.faq-icon i').className = 'fas fa-minus';
      }
    });
  });


  // ==========================================
  // SERVICES INTERACTIVE CUSTOM BOARD BUILDER
  // ==========================================
  const sizeRadios = document.querySelectorAll('input[name="board-size"]');
  const cheeseCheckboxes = document.querySelectorAll('input[name="builder-cheese"]');
  const meatCheckboxes = document.querySelectorAll('input[name="builder-meat"]');
  const extraCheckboxes = document.querySelectorAll('input[name="builder-extra"]');

  // Breakdown values
  const breakdownSize = document.getElementById('breakdown-size');
  const breakdownCheeses = document.getElementById('breakdown-cheeses');
  const breakdownMeats = document.getElementById('breakdown-meats');
  const breakdownExtras = document.getElementById('breakdown-extras');

  // Price variables
  const priceBase = document.getElementById('price-base');
  const priceAddons = document.getElementById('price-addons');
  const priceTotal = document.getElementById('price-total');

  // Wood board graphics elements container
  const boardVisuals = document.getElementById('visual-board-elements');

  // Constraints configuration
  const config = {
    picnic: {
      name: "Picnic Platter (Serves 2-4)",
      basePrice: 75.00,
      freeCheeses: 2,
      freeMeats: 1,
      freeExtras: 2,
      extraFee: 8.00
    },
    gathering: {
      name: "Gathering Board (Serves 6-10)",
      basePrice: 145.00,
      freeCheeses: 3,
      freeMeats: 2,
      freeExtras: 3,
      extraFee: 12.00
    },
    grand: {
      name: "Grand Feast (Serves 12-20)",
      basePrice: 280.00,
      freeCheeses: 4,
      freeMeats: 3,
      freeExtras: 4,
      extraFee: 18.00
    }
  };

  function updateBuilder() {
    // 1. Get selected size
    let selectedSize = 'picnic';
    sizeRadios.forEach(radio => {
      const parentLabel = radio.closest('.builder-option-card');
      if (radio.checked) {
        selectedSize = radio.value;
        parentLabel.classList.add('active');
      } else {
        parentLabel.classList.remove('active');
      }
    });

    const sizeConfig = config[selectedSize];
    breakdownSize.textContent = sizeConfig.name;

    // 2. Gather selections
    const selectedCheeses = [];
    cheeseCheckboxes.forEach(cb => {
      if (cb.checked) selectedCheeses.push(cb.value);
    });

    const selectedMeats = [];
    meatCheckboxes.forEach(cb => {
      if (cb.checked) selectedMeats.push(cb.value);
    });

    const selectedExtras = [];
    extraCheckboxes.forEach(cb => {
      if (cb.checked) selectedExtras.push(cb.value);
    });

    // 3. Update Text Breakdowns
    breakdownCheeses.textContent = selectedCheeses.length > 0 ? selectedCheeses.join(', ') : 'None selected';
    breakdownMeats.textContent = selectedMeats.length > 0 ? selectedMeats.join(', ') : 'None selected';
    breakdownExtras.textContent = selectedExtras.length > 0 ? selectedExtras.join(', ') : 'None selected';

    // 4. Calculate addon fees
    const extraCheesesCount = Math.max(0, selectedCheeses.length - sizeConfig.freeCheeses);
    const extraMeatsCount = Math.max(0, selectedMeats.length - sizeConfig.freeMeats);
    const extraExtrasCount = Math.max(0, selectedExtras.length - sizeConfig.freeExtras);

    const totalExtraAddons = extraCheesesCount + extraMeatsCount + extraExtrasCount;
    const addonPrice = totalExtraAddons * sizeConfig.extraFee;
    const totalPrice = sizeConfig.basePrice + addonPrice;

    // 5. Update Pricing UI
    priceBase.textContent = `$${sizeConfig.basePrice.toFixed(2)}`;
    priceAddons.textContent = `$${addonPrice.toFixed(2)}`;
    priceTotal.textContent = `$${totalPrice.toFixed(2)}`;

    // 6. Draw dynamic preview circles on board
    boardVisuals.innerHTML = '';

    // Add cheeses (orange wedges style)
    selectedCheeses.forEach((ch, i) => {
      const el = document.createElement('span');
      el.className = 'visual-item cheese-item';
      el.style.left = `${15 + (i * 20) + (Math.random() * 5)}%`;
      el.style.top = `${25 + (Math.random() * 20)}%`;
      el.title = ch;
      boardVisuals.appendChild(el);
    });

    // Add meats (crimson rosettes style)
    selectedMeats.forEach((mt, i) => {
      const el = document.createElement('span');
      el.className = 'visual-item meat-item';
      el.style.left = `${45 + (i * 18) + (Math.random() * 5)}%`;
      el.style.top = `${30 + (Math.random() * 30)}%`;
      el.title = mt;
      boardVisuals.appendChild(el);
    });

    // Add extras (green or brown small garnish circles)
    selectedExtras.forEach((ex, i) => {
      const el = document.createElement('span');
      el.className = 'visual-item extra-item';
      el.style.left = `${30 + (i * 15) + (Math.random() * 5)}%`;
      el.style.top = `${60 + (Math.random() * 15)}%`;
      el.title = ex;
      boardVisuals.appendChild(el);
    });
  }

  // Bind change listeners to builder inputs
  sizeRadios.forEach(input => input.addEventListener('change', updateBuilder));
  cheeseCheckboxes.forEach(input => input.addEventListener('change', updateBuilder));
  meatCheckboxes.forEach(input => input.addEventListener('change', updateBuilder));
  extraCheckboxes.forEach(input => input.addEventListener('change', updateBuilder));

  // Initialize Builder Visuals
  updateBuilder();

  // Export Custom Builder selections to Contact Form
  const sendToOrderBtn = document.getElementById('send-to-order-btn');
  const mainBookingForm = document.getElementById('main-booking-form');
  const serviceTypeSelect = document.getElementById('c-service-type');
  const builderNoteGroup = document.getElementById('custom-builder-note-group');
  const builderSpecLabel = document.getElementById('c-builder-spec');
  const contactNotesField = document.getElementById('c-notes');

  sendToOrderBtn.addEventListener('click', () => {
    // 1. Gather specifications string
    let sizeName = "";
    sizeRadios.forEach(radio => { if (radio.checked) sizeName = config[radio.value].name; });

    const cheeses = [];
    cheeseCheckboxes.forEach(cb => { if (cb.checked) cheeses.push(cb.value); });

    const meats = [];
    meatCheckboxes.forEach(cb => { if (cb.checked) meats.push(cb.value); });

    const extras = [];
    extraCheckboxes.forEach(cb => { if (cb.checked) extras.push(cb.value); });

    const specText = `Size: ${sizeName}\nCheeses: ${cheeses.join(', ') || 'None'}\nMeats: ${meats.join(', ') || 'None'}\nAccompaniments: ${extras.join(', ') || 'None'}\nPrice Estimate: ${priceTotal.textContent}`;

    // 2. Populate contact subpage fields
    serviceTypeSelect.value = 'custom-builder';
    builderSpecLabel.innerText = specText;
    builderNoteGroup.style.display = 'block';

    // Append to text area
    contactNotesField.value = `Hello! I have curated my custom charcuterie board:\n\n${specText}\n\nPlease include this setup in my event catering quotation.`;

    // 3. Switch SPA view to Contact
    window.location.hash = '#contact';
  });


  // ==========================================
  // FORM SUBMISSION HANDLERS
  // ==========================================

  // Newsletter Forms
  const newsletterForms = document.querySelectorAll('[id^="newsletter-form"]');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const parent = form.closest('section') || form.closest('.cta-banner-section') || document;
      const success = parent.querySelector('[id^="newsletter-success"]') || document.getElementById('newsletter-success');
      if (success) {
        success.classList.add('active');
        success.style.display = 'block';
      }
      form.reset();
      setTimeout(() => {
        if (success) {
          success.classList.remove('active');
          success.style.display = 'none';
        }
      }, 4000);
    });
  });

  // Quick Quote Form
  const quickQuoteForm = document.getElementById('quick-quote-form');
  const quickQuoteSuccess = document.getElementById('quick-quote-success');

  if (quickQuoteForm) {
    quickQuoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (quickQuoteSuccess) {
        quickQuoteSuccess.classList.add('active');
        quickQuoteSuccess.style.display = 'block';
      }
      quickQuoteForm.reset();
      setTimeout(() => {
        if (quickQuoteSuccess) {
          quickQuoteSuccess.classList.remove('active');
          quickQuoteSuccess.style.display = 'none';
        }
      }, 4000);
    });
  }

  // Main Booking Inquiry Form
  const bookingSuccessAlert = document.getElementById('booking-success-alert');

  mainBookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    bookingSuccessAlert.classList.add('active');
    mainBookingForm.reset();
    builderNoteGroup.style.display = 'none';

    // Smooth scroll to top of form panel
    bookingSuccessAlert.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      bookingSuccessAlert.classList.remove('active');
    }, 5000);
  });

  // Toggle Custom Builder specifications display dynamically if user manually changes service type
  serviceTypeSelect.addEventListener('change', () => {
    if (serviceTypeSelect.value === 'custom-builder') {
      builderNoteGroup.style.display = 'block';
    } else {
      builderNoteGroup.style.display = 'none';
    }
  });

  // ==========================================
  // REAL-TIME LEAFLET MAP INITIALIZATION
  // ==========================================
  let mapInitialized = false;
  let leafletMap = null;

  function initLeafletMap() {
    const mapContainer = document.getElementById('real-leaflet-map');
    if (mapContainer && !mapInitialized) {
      // Latitude and Longitude for 742 Artisanal Way (using sample coord: 37.7749, -122.4194)
      leafletMap = L.map('real-leaflet-map').setView([37.7749, -122.4194], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(leafletMap);

      // Create premium marker
      const marker = L.marker([37.7749, -122.4194]).addTo(leafletMap);
      marker.bindPopup("<div style='font-family: var(--font-sans); text-align: center; font-size: 0.85rem;'><strong>L'Aura Grazing Studio</strong><br><span style='font-size: 0.75rem; color: #65584f;'>742 Artisanal Way, Suite 100</span></div>").openPopup();
      mapInitialized = true;
    } else if (leafletMap) {
      leafletMap.invalidateSize();
    }
  }

  // Contact page checklist interactive logic
  document.querySelectorAll('.checklist-hidden-cb').forEach(cb => {
    cb.addEventListener('change', function () {
      const card = this.closest('.checklist-card');
      if (card) {
        if (this.checked) {
          card.classList.add('completed');
          const marker = card.querySelector('.checklist-marker i');
          if (marker) {
            marker.className = 'fa-solid fa-circle-check text-gold text-lg';
          }
        } else {
          card.classList.remove('completed');
          const marker = card.querySelector('.checklist-marker i');
          if (marker) {
            marker.className = 'fa-regular fa-circle text-gold text-lg';
          }
        }
      }
    });
  });

});
