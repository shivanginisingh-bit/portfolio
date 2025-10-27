(() => {
  // Init guard (no dependency on MQ)
  if (window.__NAV_UNIFIED_INIT__) return;
  window.__NAV_UNIFIED_INIT__ = true;
  window.__NAV_MANAGED__ = true;

  const btn = document.querySelector('[data-nav="menu-btn"], .nav-pill');
  if (!btn) return;
  const labelSpan = document.querySelector('[data-nav="menu-label"]') || btn.querySelector('.menu-btn__label') || null;
  btn.dataset.navManaged = "1";

  // Ensure panel + scrim exist and are self-styled (ignore external CSS)
  let panel = document.querySelector('[data-nav="menu-panel"]');
  if (!panel) {
    panel = document.createElement('nav');
    panel.setAttribute('data-nav','menu-panel');
    panel.innerHTML = `<ul data-nav="menu-list" style="list-style:none;margin:0;padding:6px;display:grid;gap:2px"></ul>`;
    document.body.appendChild(panel);
  }
  const list = panel.querySelector('[data-nav="menu-list"]');
  let scrim  = document.querySelector('[data-nav="menu-scrim"]');
  if (!scrim) {
    scrim = document.createElement('div');
    scrim.setAttribute('data-nav','menu-scrim');
    document.body.appendChild(scrim);
  }

  // Base inline styles (highest z-index, fixed position)
  Object.assign(panel.style, {
    position:'fixed', right:'20px', top:'72px', minWidth:'240px',
    background:'rgba(0,0,0,.92)', color:'#fff',
    borderRadius:'14px', padding:'8px',
    boxShadow:'0 8px 32px rgba(0,0,0,.35)',
    opacity:'0', pointerEvents:'none', transform:'translateY(-4px)',
    transition:'opacity .15s, transform .15s',
    zIndex: '10010'
  });
  Object.assign(scrim.style, {
    position:'fixed', inset:'0', background:'rgba(0,0,0,.25)',
    opacity:'0', pointerEvents:'none', transition:'opacity .15s',
    zIndex: '10009'
  });

  // Populate links only if empty
  if (list && list.children.length === 0) {
    const LINKS = [
      { text: 'work',       href: 'index.html#case-studies' },
      { text: 'about me',   href: 'about.html' },
      { text: 'blog',       href: 'https://medium.com/@shivanginisingh', external: true },
      { text: 'contact me', href: 'contact.html' },
    ];
    LINKS.forEach(({text, href, external}) => {
      const li = document.createElement('li');
      const a  = document.createElement('a');
      a.href = href; 
      a.textContent = text;
      if (external) { a.target = '_blank'; a.rel = 'noopener'; }
      Object.assign(a.style, {
        display:'flex', alignItems:'center', minHeight:'44px',
        padding:'10px 16px', borderRadius:'12px',
        color:'inherit', textDecoration:'none'
      });
      a.addEventListener('mouseenter', () => a.style.background='rgba(255,255,255,.08)');
      a.addEventListener('mouseleave', () => a.style.background='transparent');
      li.appendChild(a); 
      list.appendChild(li);
    });
  }

  const setOpen = (isOpen) => {
    if (!panel) return;
    panel.style.opacity       = isOpen ? '1' : '0';
    panel.style.pointerEvents = isOpen ? 'auto' : 'none';
    panel.style.transform     = isOpen ? 'translateY(0)' : 'translateY(-4px)';
    scrim.style.opacity       = isOpen ? '1' : '0';
    scrim.style.pointerEvents = isOpen ? 'auto' : 'none';
    btn?.setAttribute('aria-expanded', String(isOpen));
    if (labelSpan) { try { labelSpan.textContent = isOpen ? 'close' : 'menu'; } catch(_){} }
    console.log('[nav] setOpen =', isOpen);
  };

  const open  = () => setOpen(true);
  const close = () => setOpen(false);

  // Wire up button
  btn.addEventListener('click', () => {
    const nowOpen = panel.style.pointerEvents !== 'auto';
    setOpen(nowOpen);
  }, { passive:true });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (panel.style.pointerEvents !== 'auto') return;
    const within = e.target.closest('[data-nav="menu-panel"], [data-nav="menu-btn"], .nav-pill');
    if (!within) setOpen(false);
  }, { passive: true });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.style.pointerEvents === 'auto') setOpen(false);
  });

  // Close on scrim click
  scrim.addEventListener('click', close, { passive: true });

  // Close after link click, but let anchors navigate naturally
  list?.addEventListener('click', (e) => {
    if (!e.target.closest('a')) return;
    setTimeout(() => setOpen(false), 0);
  }, { passive: true });

  // Handle special homepage "work" link smooth scroll
  const current = location.pathname.split('/').pop() || 'index.html';
  const isHomePage = /(^|\/)(index\.html)?$/.test(current);
  
  list?.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    
    const href = a.getAttribute('href') || '';
    
    // If we're on the homepage and clicking "work", smooth scroll to the section
    if (href.includes('case-studies') && isHomePage) {
      e.preventDefault();
      e.stopPropagation();
      
      const target = document.getElementById('case-studies');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', '#case-studies');
      }
      
      setTimeout(() => setOpen(false), 100);
      return;
    }
    
    // For external links (like blog), open in new tab
    if (href.startsWith('http')) {
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }
  });

  console.log('✅ nav-unified.js loaded with inline styles (CSS-independent)');
})();
