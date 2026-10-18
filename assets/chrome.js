/* Lighthouse site header and footer, shared by the home page and the Assign page. */
(function () {
  const PARTNER = 'Developed by Harper Steenstra &middot; In partnership with the Maine Department of Education';
  window.LH_PARTNER = PARTNER;

  const cur = (page, key) => (page === key ? ' aria-current="page"' : '');

  /* One header bar: the logo and the three things people come here to do. */
  window.siteHeader = (page) => `
  <a class="skip" href="#main">Skip to content</a>
  <div class="ev-util"><div class="wrap ev-util-in"><span class="ev-util-note">Maine Department of Education &middot; Maine Learning Technology Initiative (MLTI)</span></div></div>
  <header class="ev-head"><div class="wrap ev-head-in">
    <a class="brand" href="./">${brandMark()}<span><span class="brand-name">LIGHTHOUSE</span><br><span class="brand-sub">Cybersecurity Readiness</span></span></a>
    <nav class="ev-nav" id="ev-nav" aria-label="Main"><a href="student/">Student Course</a><a href="educator/">Educator Course</a><a href="assign.html"${cur(page, 'assign')}>Assign to a Class</a></nav>
    <button class="ev-menu" type="button" aria-expanded="false" aria-controls="ev-nav">Menu</button>
  </div></header>`;

  window.siteFooter = () => `
  <footer class="ev-foot"><div class="wrap ev-foot-in">
    <div class="brand">${brandMark()}<span><span class="brand-name">LIGHTHOUSE</span><br><span class="brand-sub">Cybersecurity Readiness for Maine Schools</span></span></div>
    <nav aria-label="Footer"><a href="privacy.html">Privacy</a></nav>
    <div class="ev-foot-note">${PARTNER}<br>All scenarios, people, schools, and websites in these courses are fictional.</div>
  </div></footer>`;

  /* Mobile menu: call after the header is on the page. */
  window.bindSiteMenu = () => {
    const btn = document.querySelector('.ev-menu'), nav = document.getElementById('ev-nav');
    if (!btn || !nav) return;
    const set = (open) => { nav.classList.toggle('open', open); btn.setAttribute('aria-expanded', open); btn.textContent = open ? 'Close' : 'Menu'; };
    btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
    nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => set(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('open')) { set(false); btn.focus(); } });
  };
})();
