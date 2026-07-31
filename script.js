/* =========================================================
   ROYAL BARBER STUDIO — SCRIPT.JS
   JavaScript puro, nessuna dipendenza esterna.
   Gestisce: header sticky, menu mobile, reveal on scroll,
   galleria con lightbox, anno nel footer.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Anno corrente nel footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Header: diventa opaco dopo lo scroll ---------- */
  var header = document.getElementById('siteHeader');
  function updateHeaderState() {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });

  /* ---------- Menu di navigazione mobile (hamburger) ---------- */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  function closeMobileNav() {
    mainNav.classList.remove('is-open');
    navToggle.classList.remove('is-active');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', function () {
    var isOpen = mainNav.classList.toggle('is-open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  /* ---------- Reveal on scroll (fade/slide leggero) ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Galleria: lightbox ---------- */
  var galleryItems = document.querySelectorAll('.gallery-item');
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxClose = document.getElementById('lightboxClose');
  var lastFocusedEl = null;

  function openLightbox(imgSrc, imgAlt, caption) {
    lastFocusedEl = document.activeElement;
    lightboxImg.src = imgSrc;
    lightboxImg.alt = imgAlt;
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    lightboxClose.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      var img = item.querySelector('img');
      var caption = item.getAttribute('data-caption');
      openLightbox(img.src, img.alt, caption);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });

});
