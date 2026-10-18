/* Lighthouse cookie banner. Lighthouse only uses browser storage on the visitor's own device. */
(function () {
  const ROOT = (document.currentScript && document.currentScript.src || '').replace(/assets\/consent\.js.*$/, '');
  const KEY = 'lighthouse:consent';
  let seen = null;
  try { seen = localStorage.getItem(KEY); } catch (e) {}
  function banner() {
    if (seen) return;
    const b = document.createElement('div');
    b.className = 'consent'; b.setAttribute('role', 'dialog'); b.setAttribute('aria-label', 'Cookie preferences');
    b.innerHTML = `<div class="cs-text"><b>Cookies and storage</b><span>Lighthouse uses cookies and similar storage on this device to save your progress. Nothing is sent to us. Read the <a href="${ROOT}privacy.html">privacy notice</a>.</span></div>
      <div class="cs-btns"><button class="btn ghost sm" data-c="essential">Essential only</button><button class="btn primary sm" data-c="all">Accept all</button></div>`;
    document.body.appendChild(b);
    b.querySelectorAll('[data-c]').forEach((x) => x.onclick = () => {
      try { localStorage.setItem(KEY, JSON.stringify({ choice: x.dataset.c, ts: new Date().toISOString() })); } catch (e) {}
      b.classList.add('out'); setTimeout(() => b.remove(), 300);
    });
  }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', banner) : banner();
})();
