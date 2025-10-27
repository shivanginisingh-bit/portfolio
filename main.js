/* ===================================
   Main Site JavaScript
   - Smooth scroll for same-page anchors
   - Section-aware navigation
   - Scroll-to-top button
   =================================== */

/* ----- smooth scroll for same-page anchors ----- */
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href');
  const target = document.querySelector(id);
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* ----- set active nav item based on page + scroll ----- */
const nav = document.querySelector('.site-nav');
const links = document.querySelectorAll('.site-nav .nav-link');

function setActive(name) {
  links.forEach(l => l.removeAttribute('aria-current'));
  const el = document.querySelector(`.site-nav .nav-link[data-link="${name}"]`);
  if (el) el.setAttribute('aria-current', 'page');
}

/* Set active nav item based on page */
if (nav?.dataset.page) {
  setActive(nav.dataset.page);
}

/* Dark pages use white nav by default */
if (nav?.dataset.page === 'about' || nav?.dataset.page === 'contact') {
  nav.classList.add('nav--invert');
}

/* ----- invert nav when black case-studies section is in view ----- */
const cs = document.querySelector('#case-studies');
if (cs && nav) {
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) nav.classList.add('nav--invert');
      else nav.classList.remove('nav--invert');
    },
    { root: null, threshold: 0.2 }
  );
  io.observe(cs);
}

/* ----- scroll-to-top button behavior ----- */
const toTop = document.getElementById('toTop');
if (toTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) toTop.classList.add('show');
    else toTop.classList.remove('show');
  });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  
  // Keyboard accessibility for scroll-to-top
  toTop.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

/* ----- Other works: gallery build (auto-load) ----- */
const grid = document.getElementById('otherWorksGrid');

// Set the correct base folder RELATIVE to index.html (no leading slash on file://)
const BASE_IMG_PATH = "images/work/"; // <-- change this if your folder differs
const OTHER_WORKS = [
  "1.png","2.png","3.gif","4.png","5.gif",
  "6.png","7.gif","8.png","9.png","10.png",
  "11.gif","12.png","13.png","14.png","15.gif",
  "16.png","17.gif","18.png","19.png","20.png",
  "21.png","22.png","23.png","24.png","25.png","26.png"
].map(name => BASE_IMG_PATH + name);

function buildOtherWorks() {
  if (!grid || grid.dataset.built) return;
  OTHER_WORKS.forEach(src => {
    const ext = src.split('.').pop().toLowerCase();
    const item = document.createElement('figure');
    item.className = 'other-works-item';
    if (/(mp4|webm)/.test(ext)) {
      const v = document.createElement('video');
      v.src = src; v.autoplay = true; v.loop = true; v.muted = true; v.playsInline = true;
      item.appendChild(v);
    } else {
      const img = document.createElement('img');
      img.src = src; img.alt = "";
      item.appendChild(img);
    }
    grid.appendChild(item);
  });
  grid.dataset.built = '1';
}

// Auto-load gallery on page load
document.addEventListener('DOMContentLoaded', () => {
  buildOtherWorks();
});

/* ----- Keyboard Accessibility ----- */

// Global Escape key handler for close buttons
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Find and trigger close buttons on all case studies
    const closeBtn = document.querySelector('.close-button, .rc-close, .cs-close, .sustainability-close, .close-btn, [data-id="close-btn"]');
    if (closeBtn && closeBtn.offsetParent !== null) { // Check if visible
      closeBtn.click();
    }
  }
});

// Enhanced Tab navigation for all interactive elements
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    // Ensure all interactive elements are focusable
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    interactiveElements.forEach(el => {
      if (!el.hasAttribute('tabindex') && el.tagName !== 'A' && el.tagName !== 'BUTTON') {
        el.setAttribute('tabindex', '0');
      }
    });
  }
});

// Focus management for better keyboard navigation
function manageFocus() {
  const focusableElements = document.querySelectorAll(
    'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  
  focusableElements.forEach(el => {
    el.addEventListener('focus', () => {
      el.style.outline = '2px solid #C29314';
      el.style.outlineOffset = '2px';
    });
    
    el.addEventListener('blur', () => {
      el.style.outline = '';
      el.style.outlineOffset = '';
    });
  });
}

// Initialize focus management
document.addEventListener('DOMContentLoaded', manageFocus);

/* ----- If landing with a hash, scroll to section and set nav state ----- */
document.addEventListener('DOMContentLoaded', () => {
  if (location.hash) {
    const t = document.querySelector(location.hash);
    if (t) t.scrollIntoView({ behavior: 'instant', block: 'start' });
  }
});

// CONTACT FORM HANDLER (safe to drop at the bottom of main.js)
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;

  const $ = (sel) => form.querySelector(sel);
  const inputs = {
    name: $('#name'),
    email: $('#email'),
    message: $('#message'),
  };
  const errors = {
    name: $('#nameError'),
    email: $('#emailError'),
    message: $('#messageError'),
  };
  const toast = document.getElementById('toast');

  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  function setError(el, errEl, hasError){
    el.setAttribute('aria-invalid', hasError ? 'true' : 'false');
    errEl.hidden = !hasError;
  }

  function validate(){
    let bad = false;

    // name
    const nameEmpty = !inputs.name.value.trim();
    setError(inputs.name, errors.name, nameEmpty);
    bad = bad || nameEmpty;

    // email (must have @ and domain)
    const emailEmpty = !inputs.email.value.trim();
    const emailBad = emailEmpty ? true : !emailOk(inputs.email.value.trim());
    setError(inputs.email, errors.email, emailBad);
    bad = bad || emailBad;

    // message
    const msgEmpty = !inputs.message.value.trim();
    setError(inputs.message, errors.message, msgEmpty);
    bad = bad || msgEmpty;

    return !bad;
  }

  // validate on blur for immediate feedback
  Object.values(inputs).forEach((el)=>{
    el.addEventListener('blur', validate);
    el.addEventListener('input', updateButtonState);
  });

  function updateButtonState() {
    const sendButton = form.querySelector('.btn-send');
    const allFilled = Object.values(inputs).every(input => input.value.trim() !== '');
    sendButton.disabled = !allFilled;
  }

  // Initialize button state
  updateButtonState();

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(!validate()) return;

    // TODO: integrate real send (email API) later
    // For now, show toast and reset form
    if (toast){
      toast.textContent = `message sent — thank you!`;
      toast.hidden = false;
      requestAnimationFrame(()=> toast.classList.add('show'));
      setTimeout(()=>{
        toast.classList.remove('show');
        setTimeout(()=> toast.hidden = true, 300);
      }, 2500);
    }
    form.reset();
    // clear aria-invalid
    Object.values(inputs).forEach(el => el.setAttribute('aria-invalid','false'));
  });
})();

// Unified Header Navigation
(function () {
  const header   = document.querySelector('.site-header');
  if (!header) return;

  // Hide header on case-study pages
  if (document.body.classList.contains('case-study')) {
    header.style.display = 'none';
    return;
  }

  // Guard: if unified nav is managing things, skip any menu-button logic here
  if (window.__NAV_MANAGED__) return; // Don't interfere with nav-unified.js

  const btn      = header.querySelector('#navBtn');
  const sheet    = header.querySelector('#navSheet');
  const scrim    = header.querySelector('#navScrim');
  const labelEl  = btn?.querySelector('.nav-pill__label');
  const labelMenu = labelEl?.dataset.labelMenu || 'menu';
  const labelClose= labelEl?.dataset.labelClose || 'close';

  const linksInline = header.querySelectorAll('.nav-inline a');
  const linksSheet  = header.querySelectorAll('.nav-list a');

  // 1) Active link (desktop + mobile)
  const path = location.pathname.split('/').pop().toLowerCase() || 'index.html';
  const detectKey = (() => {
    if (path.includes('work')) return 'work';
    if (path.includes('about')) return 'about';
    if (path.includes('contact')) return 'contact';
    if (path.includes('blog')) return 'blog';
    return 'work'; // default highlight on home
  })();
  [...linksInline, ...linksSheet].forEach(a => {
    a.classList.toggle('is-active', a.dataset.nav === detectKey);
  });

  // 2) Toggle sheet
  function openSheet() {
    btn.setAttribute('aria-expanded','true');
    sheet.hidden = false; scrim.hidden = false;
    labelEl.textContent = labelClose;
    document.documentElement.style.overflow = 'hidden';
  }
  function closeSheet() {
    btn.setAttribute('aria-expanded','false');
    sheet.hidden = true; scrim.hidden = true;
    labelEl.textContent = labelMenu;
    document.documentElement.style.overflow = '';
  }
  if (btn && !btn.dataset.navManaged) {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      expanded ? closeSheet() : openSheet();
    });
  }
  scrim?.addEventListener('click', closeSheet);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSheet();
  });

  // 3) Navigate & close on click (mobile)
  linksSheet.forEach(a => {
    a.addEventListener('click', () => {
      closeSheet();
      // Allow default navigation to proceed (hrefs are real links)
    });
  });

  // 4) Make sure only one is highlighted at a time if DOM changes
  function setActive(key){
    [...linksInline, ...linksSheet].forEach(a => {
      a.classList.toggle('is-active', a.dataset.nav === key);
    });
  }
  setActive(detectKey);
})();
