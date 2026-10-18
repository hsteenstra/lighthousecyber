/* Lighthouse portal — landing page for schools, students, and educators */
(function () {


  const inboxMock = `<div class="mock-laptop"><div class="ml-screen">
      <div class="ml-bar"><span class="dots"><i></i><i></i><i></i></span>Harborview Mail</div>
      <div class="ml-rows">
        ${[['Ms. Rivera', 'Lab report due Friday', 'safe'], ['R0BUX Rewards', 'You were selected: 10,000 FREE...', 'phish'], ['Harborview Athletics', 'Practice moved to 4:30', 'safe'], ['Delivery Notice', 'Your package could not be...', 'phish']]
          .map(([w, t, v], i) => `<div class="ml-row" style="--d:${i * .45 + .4}s"><span class="av" style="background:${v === 'phish' ? '#c8322b' : '#138a4b'}">${w[0]}</span><span class="tx"><b>${w}</b><span>${t}</span></span><span class="tag ${v}">${v === 'phish' ? icon('flag') + 'Phishing' : icon('check') + 'Safe'}</span></div>`).join('')}
      </div></div><div class="ml-base"></div></div>`;

  const talkMock = `<div class="mock-talk"><div class="mt-main"><span class="mt-label">${icon('talk')} Turn and Talk</span>
      <div class="mt-q">It is Sunday at 6:15 PM. Who needs to know, in what order?</div>
      <div class="mt-stem">The first person I would call is...</div><div class="mt-stem">What I would not know how to do is...</div></div>
      <div class="mt-side"><div class="mt-timer"><svg viewBox="0 0 100 100"><circle class="mt-trk" cx="50" cy="50" r="42" fill="none" stroke-width="7"/><circle class="mt-prog" cx="50" cy="50" r="42" fill="none" stroke-width="7" stroke-linecap="round" stroke-dasharray="264" stroke-dashoffset="70"/></svg><b>2:14</b></div></div></div>`;

  const why = [
    ['monitor', 'Realistic Practice', 'Fake inboxes, texts, and websites.'],
    ['talk', 'Real Decisions', 'Learn by making the call.'],
    ['award', 'A Certificate', 'Printable when you finish.']
  ];

  document.getElementById('app').innerHTML = siteHeader('home') + `
  <main id="main">
  <section class="ev-hero"><div class="ev-hero-bg scene-bg" aria-hidden="true">${scene()}</div><div class="wrap ev-hero-in">
    <div class="ev-hero-copy">
      <h1 class="hero-title">Guiding Every Student and Educator Safely Through a Connected World</h1>
      <p class="ev-sub">Cybersecurity courses for Maine middle schools, high schools, and school staff.</p>
      <div class="hero-actions">
        <a class="ev-pill white" href="student/">Student Course</a>
        <a class="ev-pill outline" href="educator/">Educator Course</a>
      </div>
    </div>
  </div>
  <a class="ev-scroll" href="#why" aria-label="Scroll down to learn more"><span>Scroll</span>${icon('down')}</a>
  </section>

  <section class="ev-why" id="why"><div class="wrap">
    <h2 class="ev-center">The Lighthouse Difference</h2>
    <div class="ev-why-grid">${why.map(([ic, t, d]) => `<div class="ev-why-item"><div class="ev-why-ic">${icon(ic)}</div><h3><span>${t}</span></h3><p>${d}</p></div>`).join('')}</div>
  </div></section>

  <div id="courses">
  <section class="ev-row cream"><div class="wrap ev-row-in">
    <div class="ev-row-art student">${inboxMock}</div>
    <div class="ev-row-text">
      <p class="ev-over">For Students &middot; Grades 6&ndash;12</p>
      <h2>Student Course</h2>
      <p class="ev-lead">Five short modules students do on their own. About 45 minutes.</p>
      <a class="ev-pill dark" href="student/">Start the Student Course</a>
    </div>
  </div></section>

  <section class="ev-row"><div class="wrap ev-row-in reverse">
    <div class="ev-row-art educator">${talkMock}</div>
    <div class="ev-row-text">
      <p class="ev-over">For Educators &middot; All School Staff</p>
      <h2>Educator Course</h2>
      <p class="ev-lead">Four modules built for a staff meeting. About 50 minutes.</p>
      <a class="ev-pill dark" href="educator/">Start the Educator Course</a>
    </div>
  </div></section>
  </div>

  </main>` + siteFooter();

  fitScene(document.querySelector('.ev-hero-bg'));

  /* As you scroll down, the hero blurs and fades out of focus. */
  const hero = document.querySelector('.ev-hero');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    const blurOut = () => { hero.style.setProperty('--p', Math.min(1, Math.max(0, scrollY / (hero.offsetHeight * .85))).toFixed(3)); ticking = false; };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(blurOut); } }, { passive: true });
    blurOut();
  }

  bindSiteMenu();
})();
