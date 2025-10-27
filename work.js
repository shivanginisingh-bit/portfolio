/* ===================================
   Work Page Script
   - Gallery builder with proper file detection
   - Card click handling
   - Back-to-top button
   =================================== */

/* --- Card Click Handling (whole card clickable) --- */
document.addEventListener('click', (e) => {
  const a = e.target.closest('.work-card__link');
  if (!a) return;
  // Let the link work naturally - no preventDefault needed
});

/* --- Gallery Data: Files 1-26 (GIFs at 3, 5, 7, 11, 15, 17) --- */
const galleryItems = [];
for (let i = 1; i <= 26; i++) {
  const isGif = [3, 5, 7, 11, 15, 17].includes(i);
  galleryItems.push({
    src: `images/work/${i}.${isGif ? 'gif' : 'png'}`,
    type: isGif ? 'gif' : 'image',
    alt: `work ${i}`
  });
}

// Build the gallery with all 26 items
function buildGallery(){
  const container = document.getElementById('masonry');
  if (!container) return;
  
  container.innerHTML = '';

  // Render all items
  const fragment = document.createDocumentFragment();
  
  galleryItems.forEach(item => {
    const fig = document.createElement('figure');
    fig.className = 'media';
    fig.dataset.type = item.type;

    const img = document.createElement('img');
    img.loading = 'lazy';
    img.alt = item.alt;
    img.src = item.src;
    
    // Handle row spanning after image loads
    img.onload = () => spanFigure(fig, img);
    
    fig.appendChild(img);
    fragment.appendChild(fig);
  });

  container.appendChild(fragment);

  // Setup ResizeObserver for dynamic spanning
  const observer = new ResizeObserver(entries => {
    entries.forEach(entry => {
      const fig = entry.target.closest('.media');
      if (fig) spanFigure(fig, entry.target);
    });
  });

  container.querySelectorAll('.media img').forEach(img => {
    if (img.complete) spanFigure(img.closest('.media'), img);
    observer.observe(img);
  });
}

/* --- Row Span Calculation (perfect masonry) --- */
function spanFigure(figure, mediaEl){
  const container = document.getElementById('masonry');
  if (!container) return;
  
  const base = parseInt(getComputedStyle(container).gridAutoRows, 10) || 10;
  const gap = parseInt(getComputedStyle(container).gap, 10) || 16;
  const height = mediaEl.getBoundingClientRect().height;
  const rows = Math.ceil((height + gap) / (base + gap));
  
  figure.style.gridRowEnd = `span ${rows}`;
}

/* --- Back-to-Top Button (Pill-based) --- */
(() => {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  
  const showAfter = 600;
  const onScroll = () => btn.classList.toggle('is-hidden', window.scrollY <= showAfter);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* --- Initialize Gallery --- */
window.addEventListener('load', buildGallery);

// Rebuild gallery on resize (debounced)
window.addEventListener('resize', ()=>{
  clearTimeout(window.__galleryResize);
  window.__galleryResize = setTimeout(buildGallery, 150);
});
