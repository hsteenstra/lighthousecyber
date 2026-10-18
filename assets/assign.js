/* Lighthouse "Assign a Course" page: builds a shareable link, Google Classroom share, QR code, and student instructions. */
(function () {
  const COURSES = {
    student: {
      name: 'Student Course', path: 'student/', who: 'Students, grades 6–12', total: 45,
      modules: [['Spot the Phish', 12], ['Lock It Down', 8], ['Think Before You Post', 10], ['Scams, Fakes & Pressure', 10], ['Who Do You Tell?', 6]]
    },
    educator: {
      name: 'Educator Course', path: 'educator/', who: 'Teachers and school staff', total: 50,
      modules: [['Phishing in the School Inbox', 13], ['Student Images & Viral Moments', 16], ['Protecting Student Data', 11], ['When Something Goes Wrong', 11]]
    }
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const $ = (s) => document.querySelector(s);
  const base = new URL('.', location.href);

  document.getElementById('app').innerHTML = siteHeader('assign') + `
  <main id="main">
    <section class="as-head"><div class="wrap">
      <p class="ev-over">For Teachers</p>
      <h1>Assign Lighthouse to Your Class</h1>
      <p>Pick a course or a single module. You will get a link, a Google Classroom button, a QR code, and instructions you can paste for students.</p>
    </div></section>

    <section class="as-body"><div class="wrap as-grid">
      <form class="as-form" id="as-form" novalidate>
        <fieldset>
          <legend><span>1</span>Choose a course</legend>
          <div class="as-choices">
            ${Object.entries(COURSES).map(([k, c], i) => `<label class="as-choice"><input type="radio" name="course" value="${k}" ${i === 0 ? 'checked' : ''}>
              <span><b>${c.name}</b><small>${c.who} &middot; about ${c.total} minutes</small></span></label>`).join('')}
          </div>
        </fieldset>
        <fieldset>
          <legend><span>2</span>What to assign</legend>
          <div class="as-scope" id="as-scope"></div>
        </fieldset>
        <fieldset>
          <legend><span>3</span>Due date <em>(optional)</em></legend>
          <label class="sr" for="as-due">Due date</label>
          <input type="date" id="as-due" class="as-input">
        </fieldset>
      </form>

      <aside class="as-out" aria-labelledby="as-out-h">
        <h2 id="as-out-h">Your assignment</h2>
        <p class="as-summary" id="as-summary"></p>

        <label class="as-label" for="as-link">Link for students</label>
        <div class="as-copyrow"><input id="as-link" class="as-input mono" readonly><button type="button" class="ev-pill dark sm" data-copy="as-link">Copy link</button></div>

        <a class="as-classroom" id="as-classroom" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="4" width="20" height="15" rx="2" fill="#1e8e3e"/><rect x="4" y="6" width="16" height="11" rx="1" fill="#fff"/><circle cx="12" cy="10" r="2" fill="#1e8e3e"/><path d="M8.5 15.5a3.5 3.5 0 0 1 7 0z" fill="#1e8e3e"/><rect x="14" y="19" width="6" height="1.8" rx=".9" fill="#1e8e3e"/></svg>
          Share to Google Classroom</a>
        <p class="as-note">Opens Google Classroom in a new tab, where you pick the class and choose Assignment.</p>

        <div class="as-qr">
          <div class="as-qr-img" id="as-qr" role="img" aria-label="QR code for the student link"></div>
          <div><b>QR code</b><p>Students can scan it with a phone or Chromebook camera.</p>
            <div class="as-qr-btns"><button type="button" class="ev-pill dark sm" id="as-project">Show on projector</button><a class="as-dl" id="as-dl" download="lighthouse-qr.svg">Download</a></div></div>
        </div>

        <label class="as-label" for="as-text">Instructions to paste</label>
        <textarea id="as-text" class="as-input as-text" rows="7"></textarea>
        <div class="as-copyrow end"><a class="as-preview" id="as-preview" target="_blank" rel="noopener">Open the link as a student</a><button type="button" class="ev-pill dark sm" data-copy="as-text">Copy instructions</button></div>
        <p class="as-status" id="as-status" role="status" aria-live="polite"></p>
      </aside>
    </div></section>

    <section class="as-how cream"><div class="wrap as-how-grid">
      <div><h2>How students turn it in</h2>
        <p>Lighthouse does not collect student information, so completion is turned in the same way as other work.</p></div>
      <ul>
        <li><b>Whole course.</b> Students finish every module, then print or save their certificate as a PDF and attach it to the assignment. Each certificate has an ID.</li>
        <li><b>Single module.</b> Students take a screenshot of the &ldquo;Module complete&rdquo; screen and attach it.</li>
        <li><b>Shared devices.</b> Progress is saved in the browser, so students should use the same device and account to pick up where they left off.</li>
      </ul>
    </div></section>
  </main>` + siteFooter() + `
  <div class="as-projector" id="as-projector" hidden><div class="as-proj-card" role="dialog" aria-modal="true" aria-labelledby="as-proj-h">
    <h2 id="as-proj-h">Scan to start</h2><div class="as-proj-qr" id="as-proj-qr"></div><p class="mono" id="as-proj-link"></p>
    <button type="button" class="ev-pill dark" id="as-proj-close">Close</button></div></div>`;
  bindSiteMenu();

  const form = $('#as-form');
  const pick = () => form.querySelector('input[name="course"]:checked').value;

  function drawScope() {
    const c = COURSES[pick()];
    $('#as-scope').innerHTML = `<label class="as-choice"><input type="radio" name="scope" value="0" checked><span><b>The whole course</b><small>${c.modules.length} modules &middot; about ${c.total} minutes</small></span></label>` +
      c.modules.map(([t, min], i) => `<label class="as-choice"><input type="radio" name="scope" value="${i + 1}"><span><b>Module ${i + 1}: ${esc(t)}</b><small>About ${min} minutes</small></span></label>`).join('');
  }

  function qrSVG(text, cell) {
    if (typeof qrcode !== 'function') return '';
    const q = qrcode(0, 'M'); q.addData(text); q.make();
    return q.createSvgTag({ cellSize: cell, margin: 2, scalable: true });
  }

  function update() {
    const key = pick(), c = COURSES[key];
    const n = +(form.querySelector('input[name="scope"]:checked') || { value: 0 }).value;
    const url = new URL(c.path, base);
    if (n) url.searchParams.set('module', n);
    const link = url.href;
    const due = $('#as-due').value ? new Date($('#as-due').value + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : '';
    const title = n ? `Lighthouse, Module ${n}: ${c.modules[n - 1][0]}` : `Lighthouse: ${c.name}`;
    const length = n ? `about ${c.modules[n - 1][1]} minutes` : `about ${c.total} minutes`;
    const finish = n
      ? 'When you finish, you will see a "Module complete" screen. Take a screenshot of it and turn it in here.'
      : 'Complete every module. You can stop and pick up later on the same device. When you finish, print or save your certificate as a PDF and turn it in here.';
    const body = `${title} (${length})\n${link}\n\n${finish}${due ? `\n\nDue: ${due}` : ''}`;

    $('#as-summary').textContent = `${title}, ${length}${due ? `, due ${due}` : ''}.`;
    $('#as-link').value = link;
    $('#as-text').value = body;
    $('#as-preview').href = link;
    $('#as-classroom').href = 'https://classroom.google.com/share?' + new URLSearchParams({ url: link, title, body: finish });
    const svg = qrSVG(link, 4);
    $('#as-qr').innerHTML = svg || '<p class="as-note">The QR code could not load. The link above works the same way.</p>';
    $('#as-dl').hidden = !svg;
    if (svg) $('#as-dl').href = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    $('#as-proj-link').textContent = link;
  }

  form.addEventListener('change', (e) => { if (e.target.name === 'course') drawScope(); update(); });
  $('#as-due').addEventListener('input', update);

  /* Copy buttons, with a fallback for browsers that block the clipboard API */
  document.querySelectorAll('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
    const field = document.getElementById(b.dataset.copy), status = $('#as-status');
    try { await navigator.clipboard.writeText(field.value); }
    catch (e) { field.select(); if (!document.execCommand('copy')) { status.textContent = 'Copying was blocked. Select the text and press Ctrl+C or Command+C.'; return; } }
    const label = b.textContent; b.textContent = 'Copied'; status.textContent = b.dataset.copy === 'as-link' ? 'Link copied.' : 'Instructions copied.';
    setTimeout(() => { b.textContent = label; }, 1800);
  }));

  /* Projector view */
  const proj = $('#as-projector');
  const closeProj = () => { proj.hidden = true; $('#as-project').focus(); };
  $('#as-project').addEventListener('click', () => { $('#as-proj-qr').innerHTML = qrSVG($('#as-link').value, 10); proj.hidden = false; $('#as-proj-close').focus(); });
  $('#as-proj-close').addEventListener('click', closeProj);
  proj.addEventListener('click', (e) => { if (e.target === proj) closeProj(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !proj.hidden) closeProj(); });

  drawScope(); update();
})();
