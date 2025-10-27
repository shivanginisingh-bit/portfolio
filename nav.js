(function () {
  const btn   = document.querySelector('#menuBtn, .menu-btn, .nav-toggle');
  const drop  = document.querySelector('#menuDropdown, .menu-dropdown, .nav-dropdown');
  const scrim = document.querySelector('#menuScrim, .menu-scrim');

  if (!btn || !drop) return;

  // ensure scrim node exists
  let scrimNode = scrim;
  if (!scrimNode) {
    scrimNode = document.createElement('div');
    scrimNode.className = 'menu-scrim';
    document.body.appendChild(scrimNode);
  }

  const links = drop.querySelectorAll('a, button');
  const first = links[0];
  const last  = links[links.length - 1];

  function open() {
    btn.setAttribute('aria-expanded', 'true');
    drop.classList.add('open');
    scrimNode.classList.add('open');
    document.body.classList.add('nav-open');
    // focus first item for a11y
    first && first.focus({preventScroll: true});
  }

  function close() {
    btn.setAttribute('aria-expanded', 'false');
    drop.classList.remove('open');
    scrimNode.classList.remove('open');
    document.body.classList.remove('nav-open');
    btn.focus({preventScroll: true});
  }

  function toggle() {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    expanded ? close() : open();
  }

  btn.addEventListener('click', toggle);
  scrimNode.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
    if (e.key === 'Tab' && drop.classList.contains('open')) {
      // simple focus trap
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  });
})();

