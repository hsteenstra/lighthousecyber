/* Lighthouse lesson engine — renders a course defined in window.COURSE */
(function () {
  const C = window.COURSE;
  const app = document.getElementById('app');
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const EDU = C.audience === 'educator';

  /* ---------- State ---------- */
  const STORE = 'lighthouse:v1:' + C.id;
  const params = new URLSearchParams(location.search);
  const PREVIEW = params.has('preview');
  /* ?module=N comes from a teacher's assignment link: that module opens even if earlier ones are unfinished. */
  const ASSIGNED = Math.min((+params.get('module') || 0) - 1, C.modules.length - 1);
  const fresh = () => ({ done: {}, mode: 'group', notes: {}, scores: {}, cert: {} });
  let S;
  try { S = Object.assign(fresh(), JSON.parse(localStorage.getItem(STORE) || '{}')); } catch (e) { S = fresh(); }
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) {} };

  const MODS = C.modules;
  const key = (m, s) => m + '.' + s;
  const modCount = (m) => MODS[m].steps.filter((_, s) => S.done[key(m, s)]).length;
  const modDone = (m) => modCount(m) === MODS[m].steps.length;
  const unlocked = (m) => PREVIEW || !C.lockModules || m === 0 || m === ASSIGNED || modDone(m - 1);
  const allDone = () => MODS.every((_, m) => modDone(m));
  const totalSteps = MODS.reduce((a, m) => a + m.steps.length, 0);
  const overallPct = () => Math.round(100 * MODS.reduce((a, _, m) => a + modCount(m), 0) / totalSteps);
  const firstOpen = (m) => { const i = MODS[m].steps.findIndex((_, s) => !S.done[key(m, s)]); return i < 0 ? 0 : i; };
  const reachable = (m, s) => PREVIEW || !C.lockModules || s === 0 || S.done[key(m, s)] || S.done[key(m, s - 1)];

  const AUTO = { cover: 1, lesson: 1, turntalk: 1 };
  const KIND = { cover: 'Intro', lesson: 'Learn', inbox: 'Inbox', spot: 'Activity', linkpick: 'Activity', urlbreak: 'Activity', sort: 'Activity', order: 'Activity', password: 'Lab', turntalk: 'Talk', choice: 'Check' };
  const kindLabel = (st) => st.kind === 'choice' && st.reflect ? 'Reflect' : st.kind === 'turntalk' && S.mode === 'solo' ? 'Reflect' : KIND[st.kind] || '';

  /* ---------- Small helpers ---------- */
  const PALETTE = ['#2459d6', '#c8322b', '#138a4b', '#7c3aed', '#b86e00', '#0e7490', '#be185d', '#334155'];
  const colorFor = (s) => PALETTE[[...String(s)].reduce((a, c) => a + c.charCodeAt(0), 0) % PALETTE.length];
  const initials = (n) => String(n).replace(/[^A-Za-z ]/g, '').split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase() || '?';
  const head = (s) => s.title ? `<div class="step-head">${s.eyebrow ? `<div class="eyebrow">${s.eyebrow}</div>` : ''}<h2>${s.title}</h2>${s.prompt ? `<p>${s.prompt}</p>` : ''}</div>` : '';
  const letter = (i) => 'ABCDEFGH'[i];
  function toast(msg) {
    let t = $('#toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.style.cssText = 'position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:#0a1a33;color:#fff;padding:10px 16px;border-radius:10px;font-size:.88rem;z-index:90;box-shadow:0 10px 30px rgba(0,0,0,.25);transition:opacity .2s;max-width:90vw'; document.body.appendChild(t); }
    t.textContent = msg; t.style.opacity = 1; clearTimeout(t._h); t._h = setTimeout(() => (t.style.opacity = 0), 2600);
  }
  function feedback(tone, title, html) {
    const ic = tone === 'good' ? 'check' : tone === 'bad' ? 'x' : 'info';
    return `<div class="feedback ${tone}"><div class="fb-h"><span class="badge">${icon(ic)}</span>${title}</div>${html || ''}</div>`;
  }
  function animateCounters(root) {
    $$('[data-count-to]', root).forEach((el) => {
      const from = +el.dataset.countFrom || 0, to = +el.dataset.countTo, dur = +el.dataset.dur || 4200, t0 = performance.now();
      const fmt = (n) => n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? (n / 1e3).toFixed(n >= 1e4 ? 0 : 1) + 'K' : Math.round(n).toString();
      const tick = (t) => { const p = Math.min(1, (t - t0) / dur); const e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(from + (to - from) * e); if (p < 1 && el.isConnected) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    });
  }
  function bindLinks(root) {
    $$('.screen', root).forEach((scr) => {
      let bar = $('.status-url', scr);
      if (!bar) { bar = document.createElement('div'); bar.className = 'status-url'; scr.appendChild(bar); }
      scr.addEventListener('mouseover', (e) => { const a = e.target.closest('[data-href]'); if (a) { bar.textContent = a.dataset.href; bar.classList.add('show'); } });
      scr.addEventListener('mouseout', (e) => { if (e.target.closest('[data-href]')) bar.classList.remove('show'); });
    });
    root.addEventListener('click', (e) => {
      const a = e.target.closest('[data-href]');
      if (a && !root.classList.contains('spot-on')) { e.preventDefault(); toast('Links are disabled in this simulation. This one goes to: ' + a.dataset.href); }
    });
  }

  /* ---------- Device + visual builders ---------- */
  const laptop = (inner) => `<div class="laptop"><div class="lid"><div class="screen">${inner}<div class="status-url"></div></div></div><div class="base"></div></div>`;
  const winBar = (t) => `<div class="win-bar"><span class="dots"><i></i><i></i><i></i></span><span class="title">${esc(t)}</span></div>`;
  const browserChrome = (url, tab, inner, lock = true) => `<div class="browser"><div class="tabs"><span class="dots"><i></i><i></i><i></i></span><div class="tab"><span class="fav"></span>${esc(tab)}</div></div>
    <div class="addr"><span class="navs">${icon('chevL')}${icon('chevR')}${icon('reset')}</span><div class="url">${icon(lock ? 'lock' : 'alert')}${url}</div></div>${inner}</div>`;

  function emailHTML(v) {
    const f = v.from || {};
    const addr = `<span class="ad"${f.flag ? ` data-flag="${f.flag}"` : ''}>&lt;${esc(f.addr)}&gt;</span>`;
    return `<div class="email-h">
      <div class="subj"><span${v.subjectFlag ? ` data-flag="${v.subjectFlag}"` : ''}>${esc(v.subject)}</span></div>
      <div class="from"><div class="avatar" style="background:${f.color || colorFor(f.name)}">${initials(f.name)}</div>
        <div><div class="nm">${esc(f.name)} ${addr}</div><div class="to">to ${esc(v.to || 'me')}</div></div><div class="when">${esc(v.time || '')}</div></div>
    </div><div class="email-b">${v.external ? `<div class="ext-banner">${icon('alert')} This message came from outside your organization.</div>` : ''}${v.body}</div>`;
  }
  function phoneHTML(v) {
    const msgs = v.messages.map((m, i) => m.stamp ? `<div class="stamp" style="animation-delay:${i * .5}s">${esc(m.stamp)}</div>`
      : `<div class="bubble ${m.from}" style="animation-delay:${.2 + i * .55}s">${m.html || esc(m.text)}</div>`).join('');
    return `<div class="phone ${v.style || ''}"><div class="ph-screen screen"><div class="island"></div>
      <div class="ph-status"><span>${v.clock || '3:47'}</span><span class="sig"><i style="height:4px"></i><i style="height:6px"></i><i style="height:8px"></i><i style="height:10px"></i></span></div>
      <div class="ph-head"><div class="av" style="${v.avatarColor ? 'background:' + v.avatarColor : ''}">${initials(v.contact)}</div><div><div class="nm">${esc(v.contact)}</div>${v.sub ? `<div class="sub">${esc(v.sub)}</div>` : ''}</div></div>
      <div class="ph-msgs">${msgs}</div><div class="ph-input"><div>${v.style === 'dm' ? 'Message...' : 'Text Message'}</div></div></div></div>`;
  }
  function socialHTML(v) {
    return `<div class="social"><div class="sp-head"><div class="av" style="background:${v.color || '#8b1d1d'}">${initials(v.account)}</div>
      <div><div class="h">${esc(v.handle)} ${v.verified ? '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6" fill="none" stroke-width="2.5"/></svg>' : ''}</div><div class="s">${esc(v.account)} · ${esc(v.when || '2h')}</div></div></div>
      <div class="sp-media">${footballScene()}<div class="play"><svg viewBox="0 0 24 24"><path d="M6 4l14 8-14 8z"/></svg></div>
        ${v.trending ? '<div class="trend">Trending</div>' : ''}
        <div class="views-pill">${icon('eye')}<span data-count-from="${v.views[0]}" data-count-to="${v.views[1]}">${v.views[0]}</span> views</div></div>
      <div class="sp-stats"><span>${icon('heart')}<span data-count-from="${v.likes[0]}" data-count-to="${v.likes[1]}">0</span></span><span>${icon('message')}<span data-count-from="${v.comments[0]}" data-count-to="${v.comments[1]}">0</span></span><span>${icon('share')}<span data-count-from="${v.shares[0]}" data-count-to="${v.shares[1]}">0</span></span></div>
      <div class="sp-cap"><b>${esc(v.handle)}</b>${v.caption}</div>
      <div class="sp-comments">${(v.replies || []).map((c) => `<div><b>${esc(c.u)}</b>${esc(c.t)}</div>`).join('')}<div class="muted">View all comments</div></div></div>`;
  }
  function visualHTML(v) {
    if (!v) return '';
    if (v.type === 'email') return laptop(winBar(v.window || 'Mail') + `<div style="padding:24px 28px 34px;max-height:520px;overflow:auto">${emailHTML(v)}</div>`);
    if (v.type === 'phone') return phoneHTML(v);
    if (v.type === 'social') return socialHTML(v);
    if (v.type === 'browser') return laptop(browserChrome(v.url, v.tab || '', `<div style="max-height:480px;overflow:auto">${v.html}</div>`, v.lock !== false));
    if (v.type === 'art') return `<div class="lesson-art">${art(v.name)}</div>`;
    if (v.type === 'html') return v.html;
    return '';
  }

  /* ---------- Step renderers ---------- */
  const R = {};

  R.cover = (st, el) => {
    el.innerHTML = `<div class="cover"><div class="txt"><div class="eyebrow">${st.eyebrow || ''}</div><h2>${st.title}</h2><p>${st.body || ''}</p>
      ${st.goals ? `<ul class="goals">${st.goals.map((g) => `<li>${icon('check')}<span>${g}</span></li>`).join('')}</ul>` : ''}
      <div class="chips">${(st.meta || []).map((m) => `<span>${icon(m[0])}${m[1]}</span>`).join('')}</div></div><div class="art">${art(st.art)}</div></div>`;
  };

  R.lesson = (st, el) => {
    const side = st.visual ? visualHTML(st.visual) : st.art ? `<div class="lesson-art">${art(st.art)}</div>` : '';
    const pts = st.points ? `<div class="points">${st.points.map((p) => `<div class="point"><div class="ic">${icon(p.icon || 'shield')}</div><h4>${p.title}</h4><p>${p.text}</p></div>`).join('')}</div>` : '';
    const call = st.callout ? `<div class="callout ${st.calloutTone || ''}">${icon(st.calloutIcon || 'info')}<div>${st.callout}</div></div>` : '';
    el.innerHTML = head(st) + (side ? `<div class="grid-2"><div class="prose">${st.body || ''}${call}</div><div>${side}</div></div>${pts}` : `<div class="prose">${st.body || ''}</div>${pts}${call}`);
    animateCounters(el); bindLinks(el);
  };

  R.spot = (st, el, complete) => {
    const ids = Object.keys(st.flags), total = ids.length, found = [];
    el.innerHTML = head(st) + `<div class="grid-2"><div class="spot-wrap">${visualHTML(st.visual)}<div class="hover-tip">${icon('eye')} Hover over links to preview where they really go, just like you would in a real inbox.</div></div>
      <div class="card flag-panel"><h3>Red flags <span class="flag-count">0 / ${total}</span></h3><p style="color:var(--muted);font-size:.9rem;margin:6px 0 0">${st.panelHint || 'Click directly on anything in the message that seems suspicious.'}</p>
      <ul class="flag-list"><li class="empty">No flags found yet</li></ul>
      <div class="q-actions"><button class="btn ghost sm pulse-hint">${icon('sparkle')} Hint</button><button class="btn ghost sm reveal">${icon('eye')} Show me the rest</button></div><div class="fb-slot"></div></div></div>`;
    const wrap = $('.spot-wrap', el), list = $('.flag-list', el), count = $('.flag-count', el);
    wrap.classList.add('spot-on');
    bindLinks(wrap);
    const mark = (id, how) => {
      if (found.includes(id)) return;
      found.push(id); const n = found.length;
      $$(`[data-flag="${id}"]`, wrap).forEach((node, i) => { node.classList.add(how); if (i === 0) node.insertAdjacentHTML('beforeend', `<span class="pin">${n}</span>`); });
      $('.empty', list)?.remove();
      list.insertAdjacentHTML('beforeend', `<li class="${how === 'revealed' ? 'rev' : ''}"><span class="n">${n}</span><div><b>${st.flags[id].title}</b><span>${st.flags[id].text}</span></div></li>`);
      count.textContent = `${found.length} / ${total}`;
      if (found.length === total) finish();
    };
    const finish = () => {
      $('.q-actions', el).remove();
      const self = $$('li:not(.rev)', list).length;
      $('.fb-slot', el).innerHTML = feedback(self === total ? 'good' : 'neutral', self === total ? 'You caught every red flag.' : `You spotted ${self} of ${total} on your own.`, st.wrap ? `<p>${st.wrap}</p>` : '');
      S.scores[st.id || el.dataset.k] = [self, total]; complete();
    };
    wrap.addEventListener('click', (e) => {
      const t = e.target.closest('[data-flag]');
      if (t && wrap.contains(t)) { e.preventDefault(); return mark(t.dataset.flag, 'found'); }
      if (!e.target.closest('.screen') || found.length === total) return;
      const scr = e.target.closest('.screen'), r = scr.getBoundingClientRect();
      const p = document.createElement('div'); p.className = 'miss-ping'; p.style.left = e.clientX - r.left + 'px'; p.style.top = e.clientY - r.top + 'px';
      scr.appendChild(p); setTimeout(() => p.remove(), 650);
    });
    $('.reveal', el).onclick = () => ids.forEach((id) => mark(id, 'revealed'));
    $('.pulse-hint', el).onclick = () => {
      const id = ids.find((x) => !found.includes(x)); if (!id) return;
      const n = $(`[data-flag="${id}"]`, wrap); n.classList.remove('hinted'); void n.offsetWidth; n.classList.add('hinted');
      n.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
  };

  R.inbox = (st, el, complete) => {
    const E = st.emails; let sel = 0; const ans = {};
    el.innerHTML = head(st) + laptop(winBar(st.window || 'Mail') + `<div class="mail"><div class="m-side"><div class="m-head">${icon('mail')} Inbox <span class="count">${E.length}</span></div>
      <div class="m-search">${icon('search')} Search mail</div><div class="m-list"></div></div><div class="m-read"></div></div>`) +
      `<div class="hover-tip">${icon('eye')} Open each message, hover over links to check where they lead, then decide.</div><div class="fb-slot"></div>`;
    const list = $('.m-list', el), read = $('.m-read', el), slot = $('.fb-slot', el);
    const drawList = () => {
      list.innerHTML = E.map((m, i) => `<button class="m-item ${i === sel ? 'sel' : ''} ${ans[i] ? '' : 'unread'}" data-i="${i}">
        <div class="r1"><span class="who">${esc(m.from.name)}</span><span class="t">${esc(m.time)}</span></div><div class="sub">${esc(m.subject)}</div><div class="pre">${esc(m.preview)}</div>
        ${ans[i] ? `<span class="verdict ${ans[i] === m.verdict ? 'good' : 'miss'}">${ans[i] === m.verdict ? 'Correct' : 'Missed'}</span>` : ''}</button>`).join('');
    };
    const drawRead = () => {
      const m = E[sel], a = ans[sel];
      read.innerHTML = `<div class="m-tools"><span class="lbl">${a ? 'You decided' : 'What should you do with this email?'}</span>
        <button class="btn sm danger" data-v="phish" ${a ? 'disabled' : ''}>${icon('flag')} Report phishing</button>
        <button class="btn sm ok" data-v="safe" ${a ? 'disabled' : ''}>${icon('check')} It's safe</button></div>
        <div class="m-body">${emailHTML(m)}</div>`;
      if (a && m.flags) Object.keys(m.flags).forEach((id, n) => $$(`[data-flag="${id}"]`, read).forEach((node, i) => { node.classList.add('found'); if (!i) node.insertAdjacentHTML('beforeend', `<span class="pin">${n + 1}</span>`); }));
      $$('[data-v]', read).forEach((b) => b.onclick = () => decide(b.dataset.v));
    };
    const drawFb = () => {
      const m = E[sel], a = ans[sel];
      if (!a) { slot.innerHTML = ''; return; }
      const right = a === m.verdict;
      const title = (right ? 'Correct. ' : 'Not quite. ') + (m.verdict === 'phish' ? 'This one is phishing.' : 'This one is legitimate.');
      const body = `<p>${m.explain}</p>` + (m.flags ? `<ul>${Object.values(m.flags).map((f, i) => `<li><b>${i + 1}. ${f.title}</b> ${f.text}</li>`).join('')}</ul>` : '') + (m.good ? `<ul>${m.good.map((g) => `<li>${g}</li>`).join('')}</ul>` : '');
      const next = E.findIndex((_, i) => !ans[i]);
      slot.innerHTML = feedback(right ? 'good' : 'bad', title, body + (next >= 0 ? `<div class="q-actions"><button class="btn primary sm nx">Open next email ${icon('right')}</button></div>` : ''));
      const nx = $('.nx', slot); if (nx) nx.onclick = () => { sel = next; draw(); el.scrollIntoView({ behavior: 'smooth' }); };
    };
    const decide = (v) => {
      ans[sel] = v; draw();
      if (Object.keys(ans).length === E.length) {
        const score = E.filter((m, i) => ans[i] === m.verdict).length;
        S.scores[el.dataset.k] = [score, E.length];
        slot.insertAdjacentHTML('beforeend', feedback('neutral', `Inbox cleared: ${score} of ${E.length} sorted correctly.`, st.wrap ? `<p>${st.wrap}</p>` : ''));
        complete();
      }
    };
    const draw = () => { drawList(); drawRead(); drawFb(); };
    list.onclick = (e) => { const b = e.target.closest('.m-item'); if (b) { sel = +b.dataset.i; draw(); } };
    draw(); bindLinks(el);
  };

  R.linkpick = (st, el, complete) => {
    const O = st.options; let picked = null;
    const tagFor = (i) => i === st.answer ? (st.ask === 'phish' ? 'phish' : 'safe') : (st.ask === 'phish' ? 'safe' : 'phish');
    const tagOf = (o, i) => o.verdict || tagFor(i);
    let inner;
    if (st.layout === 'windows') {
      inner = `<div class="win-trio">${O.map((o, i) => `<button class="mini-win" data-i="${i}"><div class="mw-bar"><span class="dots"><i></i><i></i><i></i></span><span class="mw-url">${icon(o.lock === false ? 'alert' : 'lock')}${o.url}</span></div>
        <span class="letter">${letter(i)}</span><div class="mw-page"><div class="logo-badge" style="background:${o.color || '#2459d6'}">${o.mark || initials(o.brand)}</div><div class="mw-title">${esc(o.brand)}</div>
        <div class="field">Email or username</div><div class="field">Password</div><div class="mw-btn" style="background:${o.color || '#2459d6'}">Sign in</div><div class="mw-foot">${esc(o.foot || '')}</div></div></button>`).join('')}</div>`;
    } else {
      const serp = `<div class="serp"><div class="s-bar"><div class="s-logo">Seek<span>.</span></div><div class="s-input">${icon('search')}${esc(st.search)}</div></div>
        <div class="s-meta">About 48,200 results</div>${O.map((o, i) => `<button class="result" data-i="${i}" data-href="${esc(o.href)}"><span class="letter">${letter(i)}</span><span>
        <span class="site"><span class="fv" style="background:${o.color || colorFor(o.site)}">${initials(o.site)}</span><span><b style="display:block;font-weight:600">${o.ad ? '<span class="ad-tag">Sponsored</span>' : ''}${esc(o.site)}</b><span class="u">${o.display}</span></span></span>
        <span class="ttl" style="display:block">${esc(o.title)}</span><span class="snip">${esc(o.snippet)}</span></span></button>`).join('')}</div>`;
      inner = laptop(browserChrome(`seek.example/search?q=${encodeURIComponent(st.search).replace(/%20/g, '+')}`, st.search + ' - Seek', serp));
    }
    el.innerHTML = head(st) + (st.context ? `<div class="callout blue" style="margin:0 0 18px">${icon('info')}<div>${st.context}</div></div>` : '') + inner +
      `<div class="hover-tip">${icon('eye')} ${st.layout === 'windows' ? 'Read each address bar carefully. The page design can be copied; the domain cannot.' : 'Hover over each result to see the real address in the bottom corner.'}</div><div class="fb-slot"></div>`;
    bindLinks(el);
    const btns = $$('[data-i]', el);
    btns.forEach((b) => b.onclick = (e) => {
      e.stopPropagation(); if (picked !== null) return;
      picked = +b.dataset.i; const right = picked === st.answer;
      btns.forEach((x, i) => { x.classList.add(i === picked ? (right ? 'is-right' : 'is-wrong') : 'x'); if (i === st.answer && !right) x.classList.add('is-right'); x.insertAdjacentHTML('beforeend', `<span class="tag ${tagOf(O[i], i)}">${tagOf(O[i], i) === 'safe' ? 'Legit' : 'Phishing'}</span>`); });
      $('.fb-slot', el).innerHTML = feedback(right ? 'good' : 'bad', right ? 'Good eye.' : `Not this time. The answer is ${letter(st.answer)}.`,
        `${st.explain ? `<p>${st.explain}</p>` : ''}<div class="explain-grid">${O.map((o, i) => `<div class="ex"><span class="l ${tagOf(o, i)}">${letter(i)}</span><div><b class="mono" style="font-size:.84rem">${o.realDomain || ''}</b><div>${o.why}</div></div></div>`).join('')}</div>`);
      S.scores[el.dataset.k] = [right ? 1 : 0, 1]; complete();
    });
  };

  R.urlbreak = (st, el, complete) => {
    let left = st.urls.length;
    el.innerHTML = head(st) + `<div class="url-key" style="margin-bottom:18px">${icon('info')}<span>Tip: look at the piece just before the first <b>/</b> after <span class="mono">https://</span>. That piece tells you who owns the site. Everything before it is just a label anyone can add.</span></div>` +
      st.urls.map((u, ui) => `<div class="url-card" data-u="${ui}"><div class="q"><span>Link ${ui + 1} of ${st.urls.length}</span><span>${esc(u.label || 'Click the real domain')}</span></div>
        <div class="url-line">${u.parts.map((p, pi) => `<button data-p="${pi}"${/^(https?:\/\/|\/)/.test(p) ? ' class="skip" disabled' : ''}>${esc(p)}</button>`).join('')}</div><div class="ans" hidden></div></div>`).join('');
    $$('.url-card', el).forEach((card) => {
      const u = st.urls[+card.dataset.u];
      $$('button', card).forEach((b) => b.onclick = () => {
        const p = +b.dataset.p, right = p === u.answer;
        $$('button', card).forEach((x, i) => { x.disabled = true; x.classList.add(i === u.answer ? 'right' : 'dim'); });
        if (!right) b.classList.add('wrong');
        const a = $('.ans', card); a.hidden = false;
        a.innerHTML = `${right ? '<b>Correct.</b>' : `<b>Close, but look again.</b> The real domain is <span class="mono">${esc(u.parts[u.answer])}</span>.`} ${u.explain}`;
        if (--left === 0) complete();
      });
    });
  };

  R.choice = (st, el, complete) => {
    const O = st.options, multi = !!st.multi, reflect = !!st.reflect;
    let tries = 0; const chosen = new Set();
    const optHTML = (o, i) => `<button class="opt ${multi ? 'multi' : ''}" data-i="${i}">${o.icon ? `<span class="people-ic">${icon(o.icon)}</span>` : `<span class="k">${multi ? '' : letter(i)}</span>`}<span>${o.text}${o.sub ? `<small>${o.sub}</small>` : ''}</span></button>`;
    const q = `<div class="q-card">${st.question ? `<div class="q">${st.question}</div>` : ''}<div class="options ${st.layout || ''}">${O.map(optHTML).join('')}</div>
      ${multi ? `<div class="q-actions"><button class="btn primary check" disabled>Check my answer</button><span style="color:var(--muted);font-size:.86rem">Select all that apply.</span></div>` : ''}<div class="fb-slot"></div></div>`;
    el.innerHTML = head(st) + (st.visual ? `<div class="grid-2 even"><div>${visualHTML(st.visual)}</div><div>${q}</div></div>` : `<div style="max-width:${st.layout === 'people' ? '1120px' : '820px'}">${q}</div>`);
    animateCounters(el); bindLinks(el);
    const opts = $$('.opt', el), slot = $('.fb-slot', el);
    if (multi) {
      const chk = $('.check', el);
      opts.forEach((b) => b.onclick = () => { const i = +b.dataset.i; chosen.has(i) ? chosen.delete(i) : chosen.add(i); b.classList.toggle('sel'); chk.disabled = !chosen.size; if (b.querySelector('.k')) b.querySelector('.k').innerHTML = chosen.has(i) ? icon('check') : ''; });
      chk.onclick = () => {
        let ok = true;
        opts.forEach((b, i) => { b.disabled = true; b.classList.remove('sel'); const c = !!O[i].correct;
          if (chosen.has(i) && c) b.classList.add('right'); else if (chosen.has(i) && !c) { b.classList.add('wrong'); ok = false; } else if (c) { b.classList.add('right'); b.style.opacity = '.75'; ok = false; } });
        chk.remove(); $('.q-actions', el)?.remove();
        slot.innerHTML = feedback(ok ? 'good' : 'neutral', ok ? (st.rightTitle || 'Exactly right.') : (st.missTitle || 'Here is the full picture.'), `<p>${st.explain || ''}</p>`);
        complete();
      };
      return;
    }
    opts.forEach((b) => b.onclick = () => {
      const i = +b.dataset.i, o = O[i];
      if (reflect) {
        opts.forEach((x) => x.classList.remove('mine')); b.classList.add('mine');
        slot.innerHTML = feedback('neutral', st.reflectTitle || 'There is no single right answer here. Here is how to think about it.',
          `<div class="perspectives">${O.map((x, j) => `<div class="persp ${j === i ? 'mine' : ''}"><b>${x.text}${j === i ? '<span class="tag-chip">Your pick</span>' : ''}</b>${x.fb}</div>`).join('')}</div>${st.debrief ? `<div class="callout blue">${icon('info')}<div>${st.debrief}</div></div>` : ''}`);
        complete(); return;
      }
      tries++;
      const right = !!o.correct, reveal = !right && tries >= 2;
      opts.forEach((x, j) => { x.classList.remove('wrong'); if (right || reveal) { x.disabled = true; if (O[j].correct) x.classList.add('right'); } });
      if (!right) b.classList.add('wrong');
      if (right || reveal) {
        const good = O.find((x) => x.correct);
        slot.innerHTML = feedback(right ? 'good' : 'bad', right ? (st.rightTitle || 'That is right.') : 'Here is the best answer.', `<p>${right ? o.fb : `${o.fb} <br><br><b>Best answer:</b> ${good.fb}`}</p>${st.explain ? `<p>${st.explain}</p>` : ''}`);
        S.scores[el.dataset.k] = [right && tries === 1 ? 1 : 0, 1]; complete();
      } else {
        b.disabled = true;
        slot.innerHTML = feedback('bad', 'Not quite. Try again.', `<p>${o.fb}</p>`);
      }
    });
  };

  R.sort = (st, el, complete) => {
    const place = {}; let selected = null, checked = false;
    const items = st.items.map((it, i) => ({ ...it, i })).sort(() => Math.random() - .5);
    el.innerHTML = head(st) + `<div class="pool" data-b=""></div><div class="buckets">${st.buckets.map((b) => `<div class="bucket" data-b="${b.id}"><div class="bh"><span class="sw" style="background:${b.color}"></span><div><b>${b.label}</b>${b.desc ? `<small>${b.desc}</small>` : ''}</div></div><div class="bb"></div></div>`).join('')}</div>
      <div class="q-actions"><button class="btn primary check" disabled>Check my sort</button><span class="hint" style="color:var(--muted);font-size:.86rem">Drag each card into a column, or tap a card and then tap a column.</span></div><div class="fb-slot"></div>`;
    const pool = $('.pool', el), chk = $('.check', el);
    const card = (it) => `<div class="sort-card" draggable="true" data-c="${it.i}"><span class="grip">${icon('grip')}</span><span>${it.text}${checked ? `<span class="why">${it.why}</span>` : ''}</span></div>`;
    const draw = () => {
      pool.innerHTML = items.filter((it) => !place[it.i]).map(card).join('');
      pool.classList.toggle('empty', !pool.children.length);
      st.buckets.forEach((b) => { $(`.bucket[data-b="${b.id}"] .bb`, el).innerHTML = items.filter((it) => place[it.i] === b.id).map(card).join(''); });
      $$('.sort-card', el).forEach((c) => {
        const i = +c.dataset.c;
        if (checked) { c.classList.add(place[i] === st.items[i].bucket ? 'right' : 'wrong'); c.draggable = false; return; }
        if (selected === i) c.classList.add('sel');
        c.addEventListener('dragstart', (e) => { e.dataTransfer.setData('text/plain', i); c.classList.add('dragging'); });
        c.addEventListener('dragend', () => c.classList.remove('dragging'));
        c.addEventListener('click', (e) => { e.stopPropagation(); selected = selected === i ? null : i; draw(); });
      });
      $$('.bucket', el).forEach((b) => b.classList.toggle('target', selected !== null));
      chk.disabled = checked || Object.keys(place).length < items.length;
    };
    const drop = (i, b) => { if (checked) return; if (b) place[i] = b; else delete place[i]; selected = null; draw(); };
    [pool, ...$$('.bucket', el)].forEach((z) => {
      z.addEventListener('dragover', (e) => { e.preventDefault(); z.classList.add('over'); });
      z.addEventListener('dragleave', () => z.classList.remove('over'));
      z.addEventListener('drop', (e) => { e.preventDefault(); z.classList.remove('over'); drop(+e.dataTransfer.getData('text/plain'), z.dataset.b); });
      z.addEventListener('click', () => { if (selected !== null) drop(selected, z.dataset.b); });
    });
    chk.onclick = () => {
      checked = true; draw();
      const score = items.filter((it) => place[it.i] === it.bucket).length;
      $('.hint', el).remove(); chk.remove();
      $('.fb-slot', el).innerHTML = feedback(score === items.length ? 'good' : 'neutral', `${score} of ${items.length} placed where we would put them.`, `<p>${st.explain || 'Read the note on each card to see the reasoning.'}</p>`);
      S.scores[el.dataset.k] = [score, items.length]; complete();
    };
    draw();
  };

  R.order = (st, el, complete) => {
    let order = st.items.map((_, i) => i);
    do { order.sort(() => Math.random() - .5); } while (order.every((v, i) => v === i));
    let dragFrom = null;
    el.innerHTML = head(st) + `<ol class="order-list"></ol><div class="q-actions"><button class="btn primary check">Check order</button></div><div class="fb-slot"></div>`;
    const ol = $('.order-list', el);
    const draw = (mark) => {
      ol.innerHTML = order.map((v, pos) => `<li draggable="${!mark}" data-pos="${pos}" class="${mark ? (v === pos ? 'right' : 'wrong') : ''}"><span class="pos">${pos + 1}</span><span class="txt">${st.items[v]}</span>
        ${mark ? '' : `<span class="mv"><button data-mv="-1" aria-label="Move up">${icon('up')}</button><button data-mv="1" aria-label="Move down">${icon('down')}</button></span>`}</li>`).join('');
      if (mark) return;
      $$('li', ol).forEach((li) => {
        const pos = +li.dataset.pos;
        li.addEventListener('dragstart', () => { dragFrom = pos; li.classList.add('dragging'); });
        li.addEventListener('dragend', () => li.classList.remove('dragging'));
        li.addEventListener('dragover', (e) => e.preventDefault());
        li.addEventListener('drop', (e) => { e.preventDefault(); if (dragFrom === null) return; const [v] = order.splice(dragFrom, 1); order.splice(pos, 0, v); dragFrom = null; draw(); });
        $$('[data-mv]', li).forEach((b) => b.onclick = () => { const to = pos + +b.dataset.mv; if (to < 0 || to >= order.length) return; [order[pos], order[to]] = [order[to], order[pos]]; draw(); });
      });
    };
    const check = () => {
      const ok = order.every((v, i) => v === i);
      draw(true);
      $('.q-actions', el).innerHTML = ok ? '' : `<button class="btn ghost retry">${icon('reset')} Try again</button><button class="btn ghost show">Show the correct order</button>`;
      $('.fb-slot', el).innerHTML = feedback(ok ? 'good' : 'bad', ok ? 'That is the right sequence.' : 'Some steps are out of order.', `<p>${st.explain || ''}</p>`);
      S.scores[el.dataset.k] = S.scores[el.dataset.k] || [ok ? 1 : 0, 1];
      complete();
      const r = $('.retry', el); if (r) r.onclick = () => { $('.q-actions', el).innerHTML = '<button class="btn primary check">Check order</button>'; $('.fb-slot', el).innerHTML = ''; draw(); $('.check', el).onclick = check; };
      const s = $('.show', el); if (s) s.onclick = () => { order = st.items.map((_, i) => i); draw(true); $('.q-actions', el).innerHTML = ''; };
    };
    $('.check', el).onclick = check;
    draw();
  };

  R.password = (st, el, complete) => {
    const COMMON = ['password', 'passw0rd', '123456', '12345678', 'qwerty', 'letmein', 'football', 'baseball', 'welcome', 'iloveyou', 'admin', 'monkey', 'dragon', 'sunshine', 'princess', 'maine', 'morse', 'shipmates', 'school', 'teacher', 'student', 'summer', 'winter', 'abc123'];
    const LV = [['Very weak', '#e2453c'], ['Weak', '#f07b3f'], ['Fair', '#f5b93d'], ['Strong', '#7bd389'], ['Very strong', '#2fbf71']];
    const score = (pw) => {
      if (!pw) return null;
      const low = /[a-z]/.test(pw), up = /[A-Z]/.test(pw), dig = /\d/.test(pw), sym = /[^A-Za-z0-9]/.test(pw);
      const pool = (low ? 26 : 0) + (up ? 26 : 0) + (dig ? 10 : 0) + (sym ? 33 : 0);
      let bits = pw.length * Math.log2(pool || 1);
      const lc = pw.toLowerCase().replace(/[@4]/g, 'a').replace(/0/g, 'o').replace(/[1!]/g, 'i').replace(/3/g, 'e').replace(/\$/g, 's');
      const common = COMMON.some((w) => lc.includes(w));
      if (common) bits = Math.min(bits, 18 + Math.max(0, pw.length - 10) * 3);
      if (/(.)\1\1/.test(pw)) bits -= 8;
      if (/(19|20)\d\d/.test(pw)) bits -= 6;
      if (/(012|123|234|345|456|567|678|789|abc|bcd|qwe)/i.test(pw)) bits -= 6;
      const words = pw.split(/[\s\-_.]+/).filter((w) => w.length >= 3).length;
      bits = Math.max(1, bits);
      const lvl = bits < 28 ? 0 : bits < 40 ? 1 : bits < 56 ? 2 : bits < 72 ? 3 : 4;
      const secs = Math.pow(2, bits) / 2 / 1e10;
      return { lvl, secs, len: pw.length >= 12, mix: low && up, dig, sym, common: !common, phrase: words >= 4 };
    };
    const human = (s) => {
      if (s < 1) return 'Instantly';
      const u = [[60, 'seconds'], [60, 'minutes'], [24, 'hours'], [365, 'days'], [100, 'years'], [1e4, 'centuries']];
      let v = s;
      for (const [d, n] of u) { if (v < d) return Math.round(v) + ' ' + n; v /= d; }
      return v > 1e6 ? 'Longer than the universe has existed' : 'Millions of years';
    };
    el.innerHTML = head(st) + `<div class="grid-2"><div class="pw-lab"><label for="pw">Test a password</label>
      <div class="pw-input"><input id="pw" type="text" autocomplete="off" spellcheck="false" placeholder="Type a made-up password"><button class="clr" aria-label="Clear">${icon('x')}</button></div>
      <div class="meter">${LV.map(() => '<i></i>').join('')}</div>
      <div class="pw-verdict"><div><div style="font-size:.74rem;color:#9fb0cd;font-weight:700;letter-spacing:.08em;text-transform:uppercase">Strength</div><div class="lvl">Start typing</div></div><div class="crack">Time to crack<b>--</b></div></div>
      <ul class="pw-checks">${[['len', '12 or more characters'], ['mix', 'Upper and lowercase'], ['dig', 'Includes a number'], ['sym', 'Includes a symbol'], ['common', 'Not a common word or name'], ['phrase', 'Four or more random words']].map(([k, t]) => `<li data-c="${k}"><span class="ck">${icon('check')}</span>${t}</li>`).join('')}</ul>
      <div class="pw-try"><span style="font-size:.78rem;color:#8ea0bf;align-self:center;margin-right:4px">Try:</span>${st.samples.map((s) => `<button>${esc(s)}</button>`).join('')}</div>
      <div class="pw-note">${icon('lock')} Nothing you type here is saved or sent anywhere. Still, never type a password you actually use.</div></div>
      <div class="prose">${st.body}</div></div>`;
    const inp = $('#pw', el);
    const upd = () => {
      const r = score(inp.value);
      $$('.meter i', el).forEach((b, i) => b.style.background = r && i <= r.lvl ? LV[r.lvl][1] : '');
      $('.lvl', el).textContent = r ? LV[r.lvl][0] : 'Start typing';
      $('.lvl', el).style.color = r ? LV[r.lvl][1] : '';
      $('.crack b', el).textContent = r ? human(r.secs) : '--';
      $$('.pw-checks li', el).forEach((li) => li.classList.toggle('on', !!(r && r[li.dataset.c])));
      if (r && inp.value.length >= 8) complete();
    };
    inp.oninput = upd;
    $('.clr', el).onclick = () => { inp.value = ''; upd(); inp.focus(); };
    $$('.pw-try button', el).forEach((b) => b.onclick = () => { inp.value = b.textContent; upd(); });
  };

  R.turntalk = (st, el) => {
    const solo = S.mode === 'solo', k = el.dataset.k;
    const total = (st.minutes || 2) * 60; let rem = total, h = null;
    const CIRC = 2 * Math.PI * 84;
    const side = solo ? `<div style="width:100%"><textarea placeholder="Jot down your thinking. This stays on this device.">${esc(S.notes[k] || '')}</textarea><div class="saved">Saved automatically</div></div>`
      : `<div class="timer"><svg viewBox="0 0 190 190"><circle class="trk" cx="95" cy="95" r="84" fill="none" stroke-width="10"/><circle class="prg" cx="95" cy="95" r="84" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="${CIRC}" stroke-dashoffset="0"/></svg>
         <div class="read"><div><b>${fmt(total)}</b><span>${st.minutes || 2} minute talk</span></div></div></div>
         <div class="tt-ctrl"><button class="go">${icon('play')} Start</button><button class="rs">${icon('reset')} Reset</button></div>`;
    el.innerHTML = `<div class="tt"><div class="tt-main"><span class="tt-label">${icon(solo ? 'book' : 'talk')} ${solo ? 'Reflect' : (st.label || 'Turn and Talk')}</span>
      <h2>${st.prompt}</h2>${st.stems ? `<div class="stems">${st.stems.map((s) => `<div>${s}</div>`).join('')}</div>` : ''}
      ${st.share ? `<div class="share"><h4>${solo ? 'Also consider' : 'Whole-group share out'}</h4><ol>${st.share.map((s) => `<li>${s}</li>`).join('')}</ol></div>` : ''}</div>
      <div class="tt-side">${side}</div></div>`;
    function fmt(s) { return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
    if (solo) { $('textarea', el).oninput = (e) => { S.notes[k] = e.target.value; save(); }; return; }
    const prg = $('.prg', el), rd = $('.read b', el), go = $('.go', el), tm = $('.timer', el);
    const paint = () => { rd.textContent = fmt(rem); prg.style.strokeDashoffset = CIRC * (1 - rem / total); tm.classList.toggle('done', rem === 0); };
    const chime = () => { try { const a = new (window.AudioContext || window.webkitAudioContext)(); [660, 880].forEach((f, i) => { const o = a.createOscillator(), g = a.createGain(); o.frequency.value = f; o.connect(g); g.connect(a.destination); const t = a.currentTime + i * .28; g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.25, t + .03); g.gain.exponentialRampToValueAtTime(.0001, t + .7); o.start(t); o.stop(t + .75); }); } catch (e) {} };
    const stop = () => { clearInterval(h); h = null; go.innerHTML = icon('play') + ' ' + (rem < total && rem > 0 ? 'Resume' : 'Start'); };
    go.onclick = () => {
      if (h) return stop();
      if (rem === 0) rem = total;
      go.innerHTML = icon('pause') + ' Pause';
      h = setInterval(() => { if (!el.isConnected) return clearInterval(h); rem--; paint(); if (rem <= 0) { stop(); chime(); } }, 1000);
    };
    $('.rs', el).onclick = () => { stop(); rem = total; paint(); go.innerHTML = icon('play') + ' Start'; };
    paint();
  };

  /* ---------- Shell ---------- */
  function topbar() {
    return `<div class="partner-strip"><span>${C.partner}</span><span style="margin-left:auto">${C.audienceLine}</span></div>
      <header class="topbar"><a class="brand" href="#/">${brandMark()}<span><span class="brand-name">LIGHTHOUSE</span><br><span class="brand-sub">Cybersecurity Readiness</span></span></a>
      <span class="course-chip">${C.chip}</span><span class="spacer"></span>
      <div class="overall"><span>${overallPct()}% complete</span><span class="bar"><i style="width:${overallPct()}%"></i></span></div>
      ${EDU ? `<button class="tb-btn mode-btn" title="Switch between a facilitated staff session and working on your own">${icon(S.mode === 'solo' ? 'user' : 'users')} ${S.mode === 'solo' ? 'On my own' : 'Group session'}</button>
      <button class="tb-btn present-btn ${document.body.classList.contains('presenting') ? 'on' : ''}">${icon('present')} Present</button>` : ''}
      <a class="tb-btn" href="../">${icon('home')} Portal</a></header>`;
  }
  function bindTop() {
    const mb = $('.mode-btn'); if (mb) mb.onclick = () => { S.mode = S.mode === 'solo' ? 'group' : 'solo'; save(); route(); toast(S.mode === 'solo' ? 'Individual mode: discussion prompts become private reflections.' : 'Group mode: discussion prompts include a facilitation timer.'); };
    const pb = $('.present-btn'); if (pb) pb.onclick = () => {
      const on = document.body.classList.toggle('presenting'); pb.classList.toggle('on', on);
      try { on ? document.documentElement.requestFullscreen?.() : document.fullscreenElement && document.exitFullscreen(); } catch (e) {}
    };
  }

  function home() {
    const nextM = MODS.findIndex((_, m) => !modDone(m));
    const started = overallPct() > 0;
    const cta = allDone() ? `<a class="btn beam lg" href="#/certificate">${icon('award')} View your certificate</a>`
      : `<a class="btn beam lg" href="#/m/${nextM}/${firstOpen(nextM)}">${started ? 'Continue' : 'Begin the course'} ${icon('right')}</a>`;
    const cards = MODS.map((m, i) => {
      const done = modDone(i), lock = !unlocked(i), pct = Math.round(100 * modCount(i) / m.steps.length);
      return `<article class="mod-card ${lock ? 'locked' : ''}"><div class="art">${art(m.art)}${lock ? `<span class="lockmark">${icon('lock')}</span>` : ''}<span class="num">MODULE ${i + 1}</span>
        <span class="state-pill ${done ? 'done' : ''}">${done ? icon('check') + 'Complete' : lock ? icon('lock') + 'Locked' : pct ? pct + '% done' : 'Ready'}</span></div>
        <div class="body"><h3>${m.title}</h3><p>${m.summary}</p><div class="progress"><i style="width:${pct}%"></i></div>
        <div class="foot"><span class="meta"><span>${icon('clock')}${m.minutes} min</span><span>${icon('layers')}${m.steps.length} steps</span></span>
        ${lock ? `<span class="btn sm ghost" style="pointer-events:none">${icon('lock')} Finish module ${i}</span>` : `<a class="btn sm ${done ? 'ghost' : 'primary'}" href="#/m/${i}/${done ? 0 : firstOpen(i)}">${done ? 'Review' : pct ? 'Continue' : 'Start'} ${icon('right')}</a>`}</div></div></article>`;
    }).join('');
    const cert = `<article class="mod-card cert-card ${allDone() || PREVIEW ? '' : 'locked'}"><div class="art">${art('cert')}<span class="num">FINAL</span></div>
      <div class="body"><h3>Certificate of Completion</h3><p>${C.certBlurb}</p><div class="foot"><span class="meta"><span>${icon('award')}Printable PDF</span></span>
      ${allDone() || PREVIEW ? `<a class="btn sm beam" href="#/certificate">Open ${icon('right')}</a>` : `<span class="btn sm ghost" style="pointer-events:none">${icon('lock')} Complete all modules</span>`}</div></div></article>`;
    app.innerHTML = topbar() + `<section class="scene-hero"><div class="scene-bg">${scene()}</div><div class="wrap"><div class="hero-copy"><div class="eyebrow"><i></i>${C.eyebrow}</div><h1>${C.title}</h1><p class="lead">${C.lead}</p>
      <div class="hero-meta">${C.heroMeta.map((m) => `<span>${icon(m[0])}${m[1]}</span>`).join('')}</div><div class="hero-actions">${cta}${C.heroSecondary || ''}</div></div>
      </div></div></section>
      <main class="dash-body"><div class="wrap"><div class="mod-grid">${cards}${cert}</div>${C.homeExtra ? C.homeExtra() : ''}</div></main>`;
    fitScene($('.scene-hero .scene-bg'));
    bindTop();
  }

  function player(m, s) {
    const mod = MODS[m], st = mod.steps[s], k = key(m, s);
    app.innerHTML = topbar() + `<div class="player"><aside class="side"><a class="back-link" href="#/">${icon('left')} All modules</a>
      <div class="side-head"><div class="sh-art">${art(mod.art)}</div><div class="sh-body"><div><div class="eyebrow">Module ${m + 1} of ${MODS.length}</div><div class="mod-title">${mod.title}</div><div class="mod-sub">${mod.minutes} minutes</div></div>
      <div class="ring"><svg viewBox="0 0 46 46"><circle cx="23" cy="23" r="19" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="5"/><circle class="ring-p" cx="23" cy="23" r="19" fill="none" stroke="#f5b93d" stroke-width="5" stroke-linecap="round" stroke-dasharray="119.4" stroke-dashoffset="${119.4 * (1 - modCount(m) / mod.steps.length)}" style="transition:stroke-dashoffset .5s"/></svg><b class="ring-t">${Math.round(100 * modCount(m) / mod.steps.length)}%</b></div></div></div>
      <ol class="steps">${mod.steps.map((x, i) => `<li class="${S.done[key(m, i)] ? 'done' : ''} ${i === s ? 'cur' : ''} ${x.kind === 'turntalk' ? 'is-tt' : ''}"><button data-s="${i}" ${reachable(m, i) ? '' : 'disabled'}>
        <span class="dot">${S.done[key(m, i)] ? icon('check') : i + 1}</span><span>${x.nav || x.title}</span><span class="kind">${kindLabel(x)}</span></button></li>`).join('')}</ol></aside>
      <section class="stage-wrap"><div class="stage-head"><span class="crumb">Module ${m + 1} &middot; <b>Step ${s + 1} of ${mod.steps.length}</b></span><span class="mini-bar"><i style="width:${100 * modCount(m) / mod.steps.length}%"></i></span></div>
      <div class="stage"><div class="step" data-k="${k}"></div>${EDU && st.notes ? `<details class="notes"><summary>${icon('book')} Facilitator notes</summary><div class="notes-body">${st.notes}</div></details>` : ''}</div>
      <div class="stage-foot"><button class="btn ghost prev" ${s === 0 ? 'disabled' : ''}>${icon('left')} Back</button><span class="hint"></span><span class="spacer"></span>
      <button class="btn primary next">${s === mod.steps.length - 1 ? 'Finish module' : 'Continue'} ${icon('right')}</button></div></section></div>`;
    bindTop();
    const el = $('.step'), next = $('.next'), hint = $('.hint');
    const sync = () => {
      const ok = !!S.done[k] || PREVIEW;
      next.disabled = !ok;
      hint.innerHTML = ok ? '' : `${icon('info')} ${st.kind === 'password' ? 'Try at least one password of 8+ characters to continue.' : 'Complete the activity to continue.'}`;
    };
    const complete = () => {
      if (S.done[k]) return sync();
      S.done[k] = true; save(); sync();
      const li = $$('.steps li')[s]; li.classList.add('done'); $('.dot', li).innerHTML = icon('check');
      const nb = $$('.steps button')[s + 1]; if (nb) nb.disabled = false;
      $('.mini-bar i').style.width = 100 * modCount(m) / mod.steps.length + '%';
      $('.ring-p').style.strokeDashoffset = 119.4 * (1 - modCount(m) / mod.steps.length); $('.ring-t').textContent = Math.round(100 * modCount(m) / mod.steps.length) + '%';
      $('.overall span').textContent = overallPct() + '% complete'; $('.overall .bar i').style.width = overallPct() + '%';
    };
    R[st.kind](st, el, complete);
    if (st.hint) {
      const hb = document.createElement('div'); hb.className = 'hint-box';
      hb.innerHTML = `<button class="hint-btn">${icon('sparkle')} Need a hint?</button>`;
      const h = $('.step-head', el); h ? h.after(hb) : el.prepend(hb);
      $('.hint-btn', hb).onclick = () => { hb.innerHTML = `<div class="hint-text">${icon('info')}<div>${st.hint}</div></div>`; };
    }
    if (AUTO[st.kind]) complete();
    sync();
    $$('.steps button').forEach((b) => b.onclick = () => go(m, +b.dataset.s));
    $('.prev').onclick = () => go(m, s - 1);
    next.onclick = () => s < mod.steps.length - 1 ? go(m, s + 1) : finishModule(m);
    window.scrollTo(0, 0);
  }
  const go = (m, s) => { location.hash = `#/m/${m}/${s}`; };

  function finishModule(m) {
    const last = m === MODS.length - 1;
    const colors = ['#f5b93d', '#2459d6', '#2fbf71', '#e2453c', '#7c3aed'];
    const burst = Array.from({ length: 46 }, (_, i) => `<i style="background:${colors[i % 5]};--x:${(Math.random() - .5) * 560}px;--y:${(Math.random() - .3) * 420}px;--r:${Math.random() * 720}deg;animation-delay:${Math.random() * .15}s"></i>`).join('');
    const ov = document.createElement('div'); ov.className = 'overlay';
    ov.innerHTML = `<div class="done-card"><div class="burst">${burst}</div><div class="medal">${sealSVG()}</div><div class="eyebrow" style="color:var(--blue-600)">Module ${m + 1} complete</div>
      <h3>${MODS[m].title}</h3><p>${MODS[m].doneLine || 'Nice work. Your progress is saved on this device.'}</p>
      <div class="acts"><a class="btn ghost" href="#/">Dashboard</a>${last ? `<a class="btn beam" href="#/certificate">${icon('award')} Get your certificate</a>` : `<a class="btn primary" href="#/m/${m + 1}/${firstOpen(m + 1)}">Next module ${icon('right')}</a>`}</div></div>`;
    document.body.appendChild(ov);
    ov.addEventListener('click', (e) => { if (e.target === ov || e.target.closest('a')) ov.remove(); });
  }

  function guilloche() {
    let p = '';
    [[0, 0], [1100, 0], [0, 850], [1100, 850]].forEach(([cx, cy]) => { for (let i = 0; i < 26; i++) p += `<ellipse cx="${cx}" cy="${cy}" rx="${180 + i * 3}" ry="${70 + i * 2}" transform="rotate(${i * 7} ${cx} ${cy})" fill="none" stroke="#c9a24a" stroke-width=".7" opacity=".55"/>`; });
    return `<svg class="guil" viewBox="0 0 1100 850" preserveAspectRatio="none">${p}</svg>`;
  }
  const certId = (name, date) => { let h = 2166136261; for (const c of C.id + name + date) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return 'LH-' + C.certCode + '-' + (h >>> 0).toString(36).toUpperCase().padStart(7, '0'); };

  function certificate() {
    if (!allDone() && !PREVIEW) {
      app.innerHTML = topbar() + `<main class="wrap" style="padding:50px 16px"><div class="card cert-locked"><div style="width:120px;margin:0 auto">${sealSVG()}</div><h2 style="margin-top:14px">Almost there</h2>
        <p style="color:var(--muted)">Your certificate unlocks after every module is complete.</p><ul>${MODS.map((m, i) => `<li>${modDone(i) ? `<span style="color:var(--ok)">${icon('check')}</span>` : `<span style="color:#9aa6bb">${icon('clock')}</span>`} Module ${i + 1}: ${m.title}</li>`).join('')}</ul>
        <div style="margin-top:22px"><a class="btn primary" href="#/">Back to dashboard</a></div></div></main>`;
      bindTop(); return;
    }
    const today = new Date();
    if (!S.cert.date) { S.cert.date = today.toISOString(); save(); }
    const d = new Date(S.cert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    app.innerHTML = topbar() + `<main class="wrap" style="padding:40px 16px 70px"><div class="step-head"><div class="eyebrow">Course complete</div><h2>Your certificate</h2><p>Enter your name as you want it to appear, then print or save it as a PDF${EDU ? ' for your professional development records' : ' to share with your teacher'}.</p></div>
      <div class="cert-setup"><div class="card">
        <div class="field-row"><label for="cn">Full name</label><input id="cn" value="${esc(S.cert.name || '')}" placeholder="First and last name" maxlength="60"></div>
        <div class="field-row"><label for="cs">School</label><input id="cs" value="${esc(S.cert.school || C.defaultSchool || '')}" placeholder="School name" maxlength="70"></div>
        ${EDU ? `<div class="field-row"><label for="cr">Role</label><select id="cr">${['Teacher', 'Administrator', 'Coach / Athletics', 'Counselor / Social Worker', 'Educational Technician', 'Support Staff', 'Other Staff'].map((r) => `<option ${S.cert.role === r ? 'selected' : ''}>${r}</option>`).join('')}</select></div>`
          : `<div class="field-row"><label for="cg">Grade</label><select id="cg">${['6', '7', '8', '9', '10', '11', '12'].map((g) => `<option ${S.cert.grade === g ? 'selected' : ''}>${g}</option>`).join('')}</select></div>`}
        <button class="btn beam lg" id="print" style="width:100%;margin-top:6px">${icon('printer')} Print or save as PDF</button>
        <p style="color:var(--muted);font-size:.8rem;margin-top:12px">In the print dialog, choose "Save as PDF" and landscape. Certificate ID: <span class="mono cid"></span></p></div>
        <div><div class="certificate">${guilloche()}<div class="frame"></div><div class="inner">
          <div class="c-brand">${brandMark()} Lighthouse</div><div class="c-title">Certificate of Completion</div><div class="c-sub">${C.certSub}</div>
          <div class="c-pre">This certifies that</div><div class="c-name">Your Name</div>
          <div class="c-body">${C.certBody}</div><div class="c-mods">${MODS.map((m) => `<span>${m.title}</span>`).join('')}</div>
          <div class="c-foot"><div class="sigline"><span class="script c-date">${d}</span><b>Date of Completion</b></div>${sealSVG()}<div class="sigline"><span class="script c-school">&nbsp;</span><b class="c-role">School</b></div></div>
        </div><div class="c-partner">${C.partner}</div><div class="c-id"></div></div></div></div></main>`;
    bindTop();
    const upd = () => {
      S.cert.name = $('#cn').value.trim(); S.cert.school = $('#cs').value.trim();
      if (EDU) S.cert.role = $('#cr').value; else S.cert.grade = $('#cg').value;
      save();
      $('.c-name').textContent = S.cert.name || 'Your Name';
      $('.c-school').textContent = S.cert.school || ' ';
      $('.c-role').textContent = EDU ? `${S.cert.role} · School` : `Grade ${S.cert.grade} · School`;
      const id = certId(S.cert.name, S.cert.date); $('.c-id').textContent = 'ID ' + id; $('.cid').textContent = id;
    };
    $$('#cn,#cs,#cr,#cg').forEach((i) => i.addEventListener('input', upd));
    $$('#cr,#cg').forEach((i) => i.addEventListener('change', upd));
    $('#print').onclick = () => { if (!S.cert.name) { $('#cn').focus(); toast('Add your name first.'); return; } window.print(); };
    upd();
  }

  function route() {
    document.querySelector('.overlay')?.remove();
    const h = location.hash.replace(/^#\/?/, '').split('/');
    if (h[0] === 'm') {
      const m = Math.min(+h[1] || 0, MODS.length - 1), s = Math.min(+h[2] || 0, MODS[m].steps.length - 1);
      if (!unlocked(m)) return (location.hash = '#/');
      if (!reachable(m, s)) return go(m, firstOpen(m));
      return player(m, s);
    }
    if (h[0] === 'certificate') return certificate();
    home(); window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);
  window.LH = { reset() { localStorage.removeItem(STORE); location.hash = '#/'; location.reload(); } };
  if (ASSIGNED >= 0 && !location.hash.replace(/^#\/?/, '')) history.replaceState(null, '', `#/m/${ASSIGNED}/${firstOpen(ASSIGNED)}`);
  route();
})();
