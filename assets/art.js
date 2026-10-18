/* Lighthouse — icon set and illustrations (inline SVG, no external assets) */
(function () {
  const P = {
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    shieldCheck: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    users: '<circle cx="9" cy="8" r="4"/><path d="M1 21a8 8 0 0 1 16 0"/><path d="M16 4a4 4 0 0 1 0 8M23 21a8 8 0 0 0-5-7.4"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    play: '<path d="M6 4l14 8-14 8z"/>',
    pause: '<path d="M7 4v16M17 4v16"/>',
    reset: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    right: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    left: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    chevL: '<path d="m15 18-6-6 6-6"/>',
    chevR: '<path d="m9 18 6-6-6-6"/>',
    up: '<path d="m18 15-6-6-6 6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    flag: '<path d="M4 22V4a1 1 0 0 1 1-1h11l-1.5 4L16 11H5"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff: '<path d="M17.9 17.9A10 10 0 0 1 12 20c-6.4 0-10-8-10-8a18 18 0 0 1 5-5.9M9.9 4.2A9 9 0 0 1 12 4c6.4 0 10 8 10 8a18 18 0 0 1-2.2 3.2M1 1l22 22"/>',
    message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    printer: '<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
    key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>',
    camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
    school: '<path d="M3 21h18M5 21V10l7-5 7 5v11"/><path d="M10 21v-5h4v5M12 5V2h3"/>',
    megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    grip: '<path d="M9 6h.01M9 12h.01M9 18h.01M15 6h.01M15 12h.01M15 18h.01" stroke-width="3"/>',
    home: '<path d="m3 10 9-7 9 7v11a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
    monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
    present: '<rect x="2" y="3" width="20" height="13" rx="2"/><path d="m8 21 4-5 4 5"/><path d="M10 7.5v5l4-2.5z"/>',
    paperclip: '<path d="m21.4 11-9.2 9.2a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5"/>',
    phone: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v9H5v-9"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/>',
    sparkle: '<path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"/>',
    share: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/>',
    talk: '<path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    whistle: '<circle cx="8" cy="15" r="5"/><path d="M12 12 21 7v4l-6 3M8 15h.01"/>',
    heartHand: '<path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.8-2.8L14.4 13"/><path d="m2 15 6 6"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
    wifi: '<path d="M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0M2 9.5a15 15 0 0 1 20 0M12 20h.01"/>',
    cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.7-9h1.8a4.5 4.5 0 1 1 0 9z"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>'
  };
  window.icon = (n, cls = '') => `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n] || ''}</svg>`;

  let uid = 0;
  const tint = (hex, t) => '#' + [1, 3, 5].map((i) => Math.round(parseInt(hex.slice(i, i + 2), 16) * (1 - t) + 255 * t).toString(16).padStart(2, '0')).join('');
  const bg = (id, a = '#0d2245', b = '#1c3f7a') => `
    <defs>
      <linearGradient id="bg${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${tint(a, .9)}"/><stop offset="1" stop-color="${tint(b, .8)}"/></linearGradient>
      <radialGradient id="glow${id}" cx=".7" cy=".3" r=".6"><stop offset="0" stop-color="#f5b93d" stop-opacity=".16"/><stop offset="1" stop-color="#f5b93d" stop-opacity="0"/></radialGradient>
      <radialGradient id="glowb${id}" cx=".2" cy=".9" r=".6"><stop offset="0" stop-color="#3a73f0" stop-opacity=".12"/><stop offset="1" stop-color="#3a73f0" stop-opacity="0"/></radialGradient>
      <pattern id="dots${id}" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#0a1a33" opacity=".05"/></pattern>
      <linearGradient id="card${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e6ecf7"/></linearGradient>
      <linearGradient id="gold${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd677"/><stop offset="1" stop-color="#e59a17"/></linearGradient>
      <linearGradient id="red${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff6b5f"/><stop offset="1" stop-color="#c8322b"/></linearGradient>
      <linearGradient id="blue${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5b8cff"/><stop offset="1" stop-color="#2459d6"/></linearGradient>
      <linearGradient id="green${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3fd38a"/><stop offset="1" stop-color="#138a4b"/></linearGradient>
      <filter id="sh${id}" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="#0a1a33" flood-opacity=".16"/></filter>
    </defs>
    <rect width="480" height="360" fill="url(#bg${id})"/>
    <rect width="480" height="360" fill="url(#dots${id})"/>
    <rect width="480" height="360" fill="url(#glow${id})"/>
    <rect width="480" height="360" fill="url(#glowb${id})"/>
    <path d="M0 338 q30 -8 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 V360 H0z" fill="#ffffff" opacity=".5"/>
    <path d="M0 346 q40 -7 80 0 t80 0 t80 0 t80 0 t80 0 t80 0 V360 H0z" fill="#ffffff" opacity=".7"/>`;
  const stars = (n, seed = 3) => { let s = ''; let x = seed; for (let i = 0; i < n; i++) { x = (x * 9301 + 49297) % 233280; const a = x / 233280; x = (x * 9301 + 49297) % 233280; const b = x / 233280; s += `<circle cx="${(a * 480).toFixed(0)}" cy="${(b * 200).toFixed(0)}" r="${(a * 1.4 + .4).toFixed(1)}" fill="#fff" opacity="${(.2 + b * .5).toFixed(2)}"/>`; } return s; };
  const wrap = (inner) => `<svg viewBox="0 0 480 360" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">${inner}</svg>`;

  /* Harbor scene, daytime by default (pass night: true for the night palette). Crop with `view` to reuse it as a card illustration. */
  function scene(o = {}) {
    const id = 's' + (++uid), W = 1440, LX = 1060, LY = 262, N = !!o.night;
    const P = N
      ? { sky: ['#030a1a', '#0a1c40', '#18376b', '#2b4d84'], far: '#0f2348', near: '#0a1a38', sea: ['#173468', '#0c2048', '#030918'], wave: '#8fb2ff', waveOp: 1, rock: ['#1a2f55', '#050c1c'], ridge: '#3a5d96', pine: '#061026', hull: '#0b1630', fog: '#5d7fb8', beam: .8, shadow: .45 }
      : { sky: ['#cfe1f5', '#e2edf8', '#f1f5fa', '#fbf6ec'], far: '#c3d4ea', near: '#a9bfdc', sea: ['#b7cfec', '#a3c1e6', '#8db1dd'], wave: '#ffffff', waveOp: 3.2, rock: ['#8a9dbb', '#64789b'], ridge: '#b3c2d8', pine: '#6d82a6', hull: '#5b6f93', fog: '#ffffff', beam: .45, shadow: .14 };
    let rnd = 11; const r = () => (rnd = (rnd * 9301 + 49297) % 233280) / 233280;
    let st = '';
    for (let i = 0; i < 120; i++) { const x = r() * W, y = r() * 470, s = r(); st += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(s * 1.5 + .35).toFixed(2)}" fill="#fff" opacity="${(.25 + (1 - y / 470) * .6).toFixed(2)}"${i % 6 === 0 ? ` class="tw" style="animation-delay:${(r() * 4).toFixed(2)}s"` : ''}/>`; }
    const pines = (x0, x1, base, h, n, fill) => { let p = ''; for (let i = 0; i < n; i++) { const x = x0 + (x1 - x0) * (i + r() * .6) / n, hh = h * (.6 + r() * .6); p += `<path d="M${x.toFixed(1)} ${(base - hh).toFixed(1)} l${(hh * .22).toFixed(1)} ${(hh * .55).toFixed(1)} h-${(hh * .08).toFixed(1)} l${(hh * .16).toFixed(1)} ${(hh * .45).toFixed(1)} h-${(hh * .6).toFixed(1)} l${(hh * .16).toFixed(1)} -${(hh * .45).toFixed(1)} h-${(hh * .08).toFixed(1)}z" fill="${fill}"/>`; } return p; };
    const wave = (y, amp, len, op, w = 1.6, cls = 'wv') => { let d = `M-${len * 2 + 3000} ${y}`; for (let x = -len * 2 - 3000; x < W + len * 2 + 3000; x += len) d += ` q${len / 4} -${amp} ${len / 2} 0 t${len / 2} 0`; return `<path class="${cls}" style="--len:${len}px" d="${d}" stroke="${P.wave}" stroke-opacity="${Math.min(1, op * P.waveOp)}" stroke-width="${w}" fill="none"/>`; };
    let refl = ''; for (let i = 0; i < 16; i++) { const y = 616 + i * 11, w = 10 + i * 4 + r() * 10; refl += `<rect class="rf" style="animation-delay:${(r() * 2).toFixed(2)}s" x="${(LX - w / 2 + (r() - .5) * 18).toFixed(1)}" y="${y}" width="${w.toFixed(1)}" height="2.4" rx="1.2" fill="#ffd677" opacity="${(.75 - i * .04).toFixed(2)}"/>`; }
    const band = (y1, y2) => { const xL = (y) => 1036 + (y - 300) * (1006 - 1036) / 250, xR = (y) => 1084 + (y - 300) * (1114 - 1084) / 250; return `M${xL(y1)} ${y1} L${xR(y1)} ${y1} L${xR(y2)} ${y2} L${xL(y2)} ${y2}Z`; };
    return `<svg class="scene" viewBox="${o.view || '0 0 1440 800'}" preserveAspectRatio="${o.par || 'xMidYMax slice'}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="sky${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.sky[0]}"/><stop offset=".42" stop-color="${P.sky[1]}"/><stop offset=".72" stop-color="${P.sky[2]}"/><stop offset="1" stop-color="${P.sky[3]}"/></linearGradient>
        <radialGradient id="hz${id}" cx=".72" cy=".74" r=".55"><stop offset="0" stop-color="#f5b93d" stop-opacity=".30"/><stop offset=".5" stop-color="#e86a4a" stop-opacity=".08"/><stop offset="1" stop-color="#f5b93d" stop-opacity="0"/></radialGradient>
        <linearGradient id="sea${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.sea[0]}"/><stop offset=".3" stop-color="${P.sea[1]}"/><stop offset="1" stop-color="${P.sea[2]}"/></linearGradient>
        <linearGradient id="bm${id}" gradientUnits="userSpaceOnUse" x1="${LX}" y1="0" x2="-100" y2="0"><stop offset="0" stop-color="#fff1c4" stop-opacity=".95"/><stop offset=".25" stop-color="#ffd677" stop-opacity=".42"/><stop offset="1" stop-color="#ffd677" stop-opacity="0"/></linearGradient>
        <radialGradient id="lg${id}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff6d8"/><stop offset=".25" stop-color="#ffd677" stop-opacity=".7"/><stop offset="1" stop-color="#ffd677" stop-opacity="0"/></radialGradient>
        <radialGradient id="moon${id}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#dfe8ff" stop-opacity=".5"/><stop offset="1" stop-color="#dfe8ff" stop-opacity="0"/></radialGradient>
        <linearGradient id="tw${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#e7edf7"/><stop offset="1" stop-color="#9fb0cc"/></linearGradient>
        <linearGradient id="tr${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f0574c"/><stop offset=".55" stop-color="#d23a30"/><stop offset="1" stop-color="#8f2019"/></linearGradient>
        <linearGradient id="rk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.rock[0]}"/><stop offset="1" stop-color="${P.rock[1]}"/></linearGradient>
        <linearGradient id="fog${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.fog}" stop-opacity="0"/><stop offset=".5" stop-color="${P.fog}" stop-opacity="${N ? .22 : .5}"/><stop offset="1" stop-color="${P.fog}" stop-opacity="0"/></linearGradient>
        <linearGradient id="sh${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffdd85"/><stop offset="1" stop-color="#e09412"/></linearGradient>
        <filter id="bl${id}" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="14"/></filter>
        <filter id="ds${id}" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#0a1a33" flood-opacity="${P.shadow}"/></filter>
      </defs>
      <rect x="-3000" width="${W + 6000}" height="800" fill="url(#sky${id})"/>
      <rect width="${W}" height="800" fill="url(#hz${id})"/>
      ${N ? `<g>${st}</g><circle cx="840" cy="118" r="70" fill="url(#moon${id})"/><circle cx="840" cy="118" r="20" fill="#eef3ff"/><circle cx="848" cy="112" r="18" fill="#0d214a"/>` : ''}
      <g class="beam" style="transform-origin:${LX}px ${LY}px">
        <polygon points="${LX},${LY - 8} -120,${LY - 190} -120,${LY + 150} ${LX},${LY + 8}" fill="url(#bm${id})" filter="url(#bl${id})" opacity="${P.beam}"/>
        <polygon points="${LX},${LY - 4} -120,${LY - 110} -120,${LY + 80} ${LX},${LY + 4}" fill="url(#bm${id})" opacity="${N ? 1 : .55}"/>
      </g>
      <path d="M-3000 574 L0 568 C120 556 210 548 300 556 S470 572 560 566 S760 552 860 562 S1100 574 1440 566 V600 H-3000Z" fill="${P.far}"/>
      ${pines(20, 560, 566, 26, 34, P.far)}
      <rect x="-3000" y="520" width="${W + 6000}" height="90" fill="url(#fog${id})"/>
      <path d="M-3000 600 L0 592 C80 572 160 560 250 566 S390 586 470 594 V604 H-3000Z" fill="${P.near}"/>
      ${pines(0, 430, 590, 40, 22, P.near)}
      <g class="boat"><path d="M392 604 h46 l-7 9 h-32z" fill="${P.hull}"/><path d="M414 602 V560 l20 40z" fill="${N ? '#c9d6ef' : '#ffffff'}" opacity=".9"/><path d="M412 602 V572 l-14 28z" fill="${N ? '#9fb2d6' : '#eef3fa'}" opacity=".9"/></g>
      <rect x="-3000" y="600" width="${W + 6000}" height="200" fill="url(#sea${id})"/>
      <rect x="-3000" y="598" width="${W + 6000}" height="3" fill="#ffd677" opacity=".12"/>
      ${N ? refl : refl.replace(/#ffd677/g, '#ffffff')}
      ${wave(632, 3, 90, .16)}${wave(668, 4, 120, .12, 1.8, 'wv slow')}${wave(712, 5, 150, .1, 2)}${wave(764, 6, 190, .08, 2.4, 'wv slow')}
      <path d="M860 604 C900 560 960 540 1000 532 L1130 528 C1190 530 1250 548 1300 566 C1360 584 1410 590 1440 592 V640 C1380 636 1300 628 1220 630 C1120 632 1000 628 900 622 Z" fill="url(#rk${id})"/>
      <path d="M900 600 C940 566 980 548 1010 540 M1180 536 C1240 548 1300 570 1360 584" stroke="${P.ridge}" stroke-opacity=".7" stroke-width="2" fill="none"/>
      <path d="M880 616 q30 -6 60 0 t60 0 M1240 628 q30 -6 60 0 t60 0" stroke="#dfe8ff" stroke-opacity=".35" stroke-width="2" fill="none"/>
      ${pines(1250, 1440, 584, 46, 7, P.pine)}
      <g>
        <path d="M1150 532 h104 v-36 h-104z" fill="#d9e1ee"/><path d="M1150 532 h104 v-36 h-104z" fill="#0a1a38" opacity=".18"/>
        <path d="M1142 498 l60 -30 l60 30z" fill="#a8312a"/><rect x="1226" y="470" width="10" height="18" fill="#7a221d"/>
        <rect x="1166" y="506" width="14" height="16" rx="1.5" fill="${N ? '#ffd677' : '#8fb3dd'}"/><rect x="1222" y="506" width="14" height="16" rx="1.5" fill="${N ? '#ffd677' : '#8fb3dd'}"/>
        <rect x="1194" y="508" width="14" height="24" rx="1.5" fill="#2a3d63"/>
        ${N ? '<circle cx="1173" cy="514" r="16" fill="#ffd677" opacity=".18"/><circle cx="1229" cy="514" r="16" fill="#ffd677" opacity=".18"/>' : ''}
      </g>
      <g filter="url(#ds${id})">
        <path d="M1036 300 L1084 300 L1114 550 L1006 550 Z" fill="url(#tw${id})"/>
        <path d="${band(330, 372)}" fill="url(#tr${id})"/><path d="${band(420, 462)}" fill="url(#tr${id})"/><path d="${band(508, 550)}" fill="url(#tr${id})"/>
        <rect x="1053" y="384" width="13" height="20" rx="6.5" fill="#22355a"/><rect x="1052" y="476" width="15" height="22" rx="7.5" fill="#22355a"/>
        <rect x="996" y="548" width="128" height="12" rx="3" fill="#152745"/>
      </g>
      <rect x="1028" y="292" width="64" height="10" rx="2" fill="#0d1830"/>
      <path d="M1030 292 v-14 M1042 292 v-14 M1054 292 v-14 M1066 292 v-14 M1078 292 v-14 M1090 292 v-14 M1028 279 h64" stroke="#0d1830" stroke-width="2.4"/>
      <rect x="1042" y="246" width="36" height="34" fill="#ffe7a1"/>
      <path d="M1054 246 v34 M1066 246 v34" stroke="#c99a2e" stroke-width="2"/>
      <circle class="flash" cx="${LX}" cy="${LY}" r="60" fill="url(#lg${id})"/>
      <path d="M1036 248 h48 l-8 -16 q-16 -14 -32 0 z" fill="#c8322b"/><path d="M1052 232 q8 -8 16 0z" fill="#9b241f"/>
      <circle cx="${LX}" cy="222" r="4" fill="#c8322b"/><path d="M${LX} 218 v-14" stroke="#c8322b" stroke-width="2"/>
      ${!N || o.shield === false ? '' : `<g transform="translate(1290 650)" filter="url(#ds${id})" class="bob2"><path d="M44 0 l42 15 v32 c0 30 -42 48 -42 48 s-42 -18 -42 -48 V15z" fill="url(#sh${id})"/><path d="m26 47 13 13 24 -24" stroke="#0a1a33" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`}
    </svg>`;
  }
  window.scene = scene;

  /* Fit a hero scene to its box so the whole lighthouse always shows, whatever the screen shape. */
  window.fitScene = (box) => {
    const svg = box && box.querySelector('svg.scene'); if (!svg) return;
    const fit = () => {
      const a = box.clientWidth / Math.max(1, box.clientHeight), vh = 640, vw = vh * a;
      const x0 = vw <= 1440 ? Math.min(Math.max(0, 1320 - vw), 1440 - vw) : 1440 - vw;
      svg.setAttribute('viewBox', `${x0.toFixed(1)} ${800 - vh} ${vw.toFixed(1)} ${vh}`);
      svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    };
    fit(); new ResizeObserver(fit).observe(box);
  };

  const ART = {
    lighthouse() { return scene({ view: '780 150 600 450', par: 'xMidYMid slice', shield: false }); },
    phish(id) {
      return wrap(`${bg(id)}${stars(18, 11)}
        <path d="M300 0 V96" stroke="#7d8fae" stroke-width="2"/>
        <path d="M300 96 v40 a22 22 0 0 1 -44 0 v-8" stroke="#7d8fae" stroke-width="7" fill="none" stroke-linecap="round"/>
        <path d="M256 128 l-9 12 l14 -2" fill="#7d8fae"/>
        <g transform="translate(120 150) rotate(-8)" filter="url(#sh${id})">
          <rect width="230" height="150" rx="16" fill="url(#card${id})"/>
          <path d="M0 16 L115 92 L230 16" stroke="#b7c4dc" stroke-width="5" fill="none"/>
          <path d="M0 150 L88 74 M230 150 L142 74" stroke="#d3dcec" stroke-width="4"/>
          <rect x="168" y="-16" width="70" height="34" rx="17" fill="url(#red${id})"/>
          <text x="203" y="7" font-family="Public Sans, sans-serif" font-size="14" font-weight="800" fill="#fff" text-anchor="middle">URGENT</text>
        </g>
        <g transform="translate(46 70)" filter="url(#sh${id})">
          <rect width="136" height="40" rx="20" fill="#fff"/>
          <circle cx="20" cy="20" r="11" fill="url(#red${id})"/><path d="M20 14v7M20 25v.5" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
          <rect x="38" y="13" width="80" height="6" rx="3" fill="#c9d3e3"/><rect x="38" y="23" width="56" height="5" rx="2.5" fill="#e1e7f1"/>
        </g>
        <g transform="translate(360 104)" filter="url(#sh${id})">
          <rect width="96" height="96" rx="22" fill="url(#blue${id})"/>
          <path d="M38 56 a12 12 0 0 0 17 1 l9 -9 a12 12 0 0 0 -17 -17 l-4 4 M58 40 a12 12 0 0 0 -17 -1 l-9 9 a12 12 0 0 0 17 17 l4 -4" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>
        </g>
        <g transform="translate(380 260)"><circle r="26" fill="#0a1a33" stroke="#f5b93d" stroke-width="3"/><text y="7" font-family="JetBrains Mono, monospace" font-size="22" font-weight="700" fill="#f5b93d" text-anchor="middle">@</text></g>`);
    },
    lock(id) {
      return wrap(`${bg(id, '#0b1d3d', '#173a6e')}${stars(16, 5)}
        <circle cx="240" cy="180" r="128" fill="none" stroke="#3a73f0" stroke-opacity=".25" stroke-dasharray="4 8"/>
        <circle cx="240" cy="180" r="94" fill="none" stroke="#f5b93d" stroke-opacity=".25"/>
        <g filter="url(#sh${id})">
          <path d="M240 64 l84 30 v62 c0 64 -84 104 -84 104 s-84 -40 -84 -104 v-62z" fill="url(#blue${id})"/>
          <path d="M240 84 l64 23 v49 c0 50 -64 82 -64 82 s-64 -32 -64 -82 v-49z" fill="#0f2a57" opacity=".35"/>
          <rect x="206" y="148" width="68" height="56" rx="10" fill="url(#gold${id})"/>
          <path d="M218 148 v-14 a22 22 0 0 1 44 0 v14" stroke="#ffd677" stroke-width="9" fill="none"/>
          <circle cx="240" cy="171" r="7" fill="#0a1a33"/><rect x="236.5" y="174" width="7" height="16" rx="3" fill="#0a1a33"/>
        </g>
        <g transform="translate(40 250)" filter="url(#sh${id})">
          <rect width="150" height="48" rx="12" fill="#fff"/>
          ${[0,1,2,3,4,5,6].map(i => `<circle cx="${22 + i * 16}" cy="24" r="5" fill="#0f2a57"/>`).join('')}
        </g>
        <g transform="translate(330 56)" filter="url(#sh${id})">
          <rect width="112" height="64" rx="14" fill="#fff"/>
          <text x="56" y="26" font-family="Public Sans" font-size="11" font-weight="700" fill="#64708a" text-anchor="middle">CODE</text>
          <text x="56" y="49" font-family="JetBrains Mono" font-size="20" font-weight="700" fill="#0a1a33" text-anchor="middle" letter-spacing="2">482 913</text>
        </g>`);
    },
    post(id) {
      return wrap(`${bg(id, '#14183d', '#2a2f74')}${stars(16, 9)}
        <defs><linearGradient id="vid${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f8f4e"/><stop offset="1" stop-color="#1c5e33"/></linearGradient></defs>
        <g filter="url(#sh${id})" transform="translate(170 40)">
          <rect width="140" height="280" rx="26" fill="#0b0f18"/>
          <rect x="8" y="8" width="124" height="264" rx="20" fill="#fff"/>
          <rect x="8" y="48" width="124" height="120" fill="url(#vid${id})"/>
          ${[0,1,2,3,4].map(i => `<path d="M${8 + i * 31} 48 V168" stroke="#fff" stroke-opacity=".25"/>`).join('')}
          <circle cx="70" cy="108" r="18" fill="rgba(0,0,0,.45)" stroke="#fff" stroke-width="2"/><path d="M65 99 l14 9 l-14 9z" fill="#fff"/>
          <circle cx="26" cy="30" r="10" fill="url(#blue${id})"/><rect x="42" y="25" width="60" height="6" rx="3" fill="#c9d3e3"/>
          <rect x="18" y="182" width="90" height="6" rx="3" fill="#c9d3e3"/><rect x="18" y="194" width="70" height="6" rx="3" fill="#e1e7f1"/>
          <path d="M22 222 a6 6 0 0 1 10 -4 a6 6 0 0 1 10 4 l-10 10z" fill="#ff3b5c"/>
          <text x="50" y="230" font-family="Public Sans" font-size="11" font-weight="800" fill="#111">1.2M</text>
        </g>
        <g filter="url(#sh${id})">
          <g transform="translate(46 70)"><rect width="78" height="78" rx="18" fill="url(#red${id})"/><path d="M28 34 a8 8 0 0 1 11 -6 a8 8 0 0 1 11 6 c0 9 -11 16 -11 16 s-11 -7 -11 -16z" fill="#fff"/></g>
          <g transform="translate(360 84)"><rect width="84" height="44" rx="22" fill="#fff"/><text x="42" y="28" font-family="Public Sans" font-size="14" font-weight="800" fill="#0a1a33" text-anchor="middle">VIRAL</text></g>
          <g transform="translate(350 220)"><rect width="96" height="58" rx="14" fill="#fff"/><circle cx="24" cy="29" r="12" fill="url(#gold${id})"/><rect x="44" y="20" width="40" height="6" rx="3" fill="#c9d3e3"/><rect x="44" y="32" width="28" height="6" rx="3" fill="#e1e7f1"/></g>
          <g transform="translate(40 230)"><rect width="100" height="44" rx="22" fill="#0a1a33" stroke="#f5b93d" stroke-width="2"/><text x="50" y="28" font-family="JetBrains Mono" font-size="13" font-weight="700" fill="#f5b93d" text-anchor="middle">SHARE</text></g>
        </g>
        <path d="M130 110 C150 120 160 130 172 140 M346 110 C330 120 322 128 312 136 M330 246 C320 236 316 230 312 226 M140 250 C150 246 160 240 170 236" stroke="#7d8fae" stroke-opacity=".5" stroke-width="2" stroke-dasharray="4 5" fill="none"/>`);
    },
    scam(id) {
      return wrap(`${bg(id, '#1c1238', '#3a1f5c')}${stars(16, 13)}
        <g filter="url(#sh${id})">
          <g transform="translate(60 70)"><rect width="230" height="78" rx="20" fill="#fff"/><path d="M30 78 l-10 18 l26 -18z" fill="#fff"/>
            <rect x="22" y="22" width="150" height="9" rx="4.5" fill="#c9d3e3"/><rect x="22" y="40" width="110" height="9" rx="4.5" fill="#e1e7f1"/>
            <rect x="140" y="38" width="70" height="24" rx="12" fill="url(#blue${id})"/><text x="175" y="54" font-family="Public Sans" font-size="11" font-weight="800" fill="#fff" text-anchor="middle">CLAIM</text></g>
          <g transform="translate(200 186)"><rect width="220" height="70" rx="20" fill="url(#blue${id})"/><path d="M190 70 l12 18 l-28 -18z" fill="#2459d6"/>
            <rect x="22" y="20" width="140" height="9" rx="4.5" fill="#fff" opacity=".85"/><rect x="22" y="38" width="96" height="9" rx="4.5" fill="#fff" opacity=".55"/></g>
          <g transform="translate(330 40)"><path d="M48 4 L92 82 H4 Z" fill="url(#gold${id})" stroke="#fff3cf" stroke-width="3" stroke-linejoin="round"/><path d="M48 32 v24 M48 68 v1" stroke="#1c1238" stroke-width="8" stroke-linecap="round"/></g>
          <g transform="translate(70 214)"><rect width="88" height="70" rx="10" fill="url(#red${id})"/><rect x="-6" y="-14" width="100" height="22" rx="6" fill="#ff8a80"/><rect x="38" y="-14" width="12" height="84" fill="#ffd677"/>
            <path d="M44 -14 c-14 -22 -34 -10 -20 0 M44 -14 c14 -22 34 -10 20 0" stroke="#ffd677" stroke-width="6" fill="none"/></g>
        </g>
        <g transform="translate(200 290)" opacity=".9"><rect width="120" height="36" rx="18" fill="#0a0820" stroke="#ff3b5c" stroke-width="2"/><text x="60" y="23" font-family="JetBrains Mono" font-size="12" font-weight="700" fill="#ff8a9d" text-anchor="middle">ACT NOW</text></g>`);
    },
    tell(id) {
      const person = (x, y, c, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-58" r="26" fill="#f2c9a8"/><path d="M-26 -66 a26 26 0 0 1 52 0 q-26 -16 -52 0z" fill="#3b2a20"/><path d="M-46 30 v-30 a46 40 0 0 1 92 0 v30z" fill="${c}"/></g>`;
      return wrap(`${bg(id, '#0b2a3d', '#16506b')}${stars(14, 17)}
        <circle cx="240" cy="380" r="200" fill="#ffffff" opacity=".5"/>
        <g filter="url(#sh${id})">${person(150, 290, 'url(#blue' + id + ')', 1)}${person(330, 290, 'url(#gold' + id + ')', 1.15)}</g>
        <g filter="url(#sh${id})" transform="translate(170 50)">
          <rect width="140" height="96" rx="24" fill="#fff"/><path d="M40 96 l-6 22 l26 -22z" fill="#fff"/>
          <path d="M70 22 l30 11 v20 c0 22 -30 34 -30 34 s-30 -12 -30 -34 v-20z" fill="url(#green${id})"/>
          <path d="m58 52 9 9 16 -16" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <g transform="translate(60 80)" opacity=".85"><rect width="72" height="40" rx="20" fill="#fff" opacity=".12"/><circle cx="20" cy="20" r="4" fill="#fff"/><circle cx="36" cy="20" r="4" fill="#fff"/><circle cx="52" cy="20" r="4" fill="#fff"/></g>`);
    },
    data(id) {
      return wrap(`${bg(id, '#0a2236', '#134a66')}${stars(14, 21)}
        <g filter="url(#sh${id})">
          <g transform="translate(70 90) rotate(-6)"><rect width="150" height="190" rx="14" fill="#fff"/><rect x="18" y="20" width="60" height="60" rx="10" fill="#dbe4f3"/><circle cx="48" cy="44" r="13" fill="#9fb0cd"/><path d="M26 76 a22 18 0 0 1 44 0z" fill="#9fb0cd"/>
            ${[0,1,2,3,4].map(i => `<rect x="18" y="${100 + i * 16}" width="${110 - (i % 2) * 30}" height="7" rx="3.5" fill="#c9d3e3"/>`).join('')}
            <rect x="90" y="28" width="44" height="18" rx="9" fill="url(#red${id})"/><text x="112" y="41" font-family="Public Sans" font-size="9" font-weight="800" fill="#fff" text-anchor="middle">IEP</text></g>
          <g transform="translate(250 70)"><path d="M70 30 a56 56 0 0 1 106 22 a40 40 0 0 1 -6 80 H40 a46 46 0 0 1 30 -102z" fill="url(#card${id})"/>
            <path d="M108 102 v-40 M92 76 l16 -16 l16 16" stroke="#2459d6" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
          <g transform="translate(300 216)"><rect width="110" height="86" rx="14" fill="url(#gold${id})"/><path d="M30 0 v-14 a25 25 0 0 1 50 0 v14" stroke="#ffd677" stroke-width="9" fill="none"/><circle cx="55" cy="38" r="9" fill="#0a1a33"/><rect x="51" y="42" width="8" height="20" rx="4" fill="#0a1a33"/></g>
        </g>`);
    },
    respond(id) {
      return wrap(`${bg(id, '#2a0f1a', '#5a1d2c')}${stars(12, 23)}
        <defs><radialGradient id="siren${id}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff6b5f" stop-opacity=".7"/><stop offset="1" stop-color="#ff6b5f" stop-opacity="0"/></radialGradient></defs>
        <circle cx="150" cy="150" r="110" fill="url(#siren${id})"><animate attributeName="r" values="90;120;90" dur="2s" repeatCount="indefinite"/></circle>
        <g filter="url(#sh${id})">
          <path d="M100 210 v-60 a50 50 0 0 1 100 0 v60z" fill="url(#red${id})"/>
          <rect x="84" y="208" width="132" height="26" rx="8" fill="#e8ecf3"/>
          <path d="M126 150 a24 24 0 0 1 24 -24" stroke="#fff" stroke-width="8" stroke-linecap="round" fill="none" opacity=".7"/>
          <g transform="translate(260 70)"><rect width="160" height="220" rx="16" fill="#fff"/><rect x="50" y="-12" width="60" height="26" rx="8" fill="#9fb0cd"/>
            ${[0,1,2,3].map(i => `<g transform="translate(20 ${36 + i * 44})"><rect width="22" height="22" rx="6" fill="${i < 2 ? 'url(#green' + id + ')' : '#e1e7f1'}"/>${i < 2 ? '<path d="m6 11 4 4 7-8" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>' : ''}<rect x="34" y="4" width="${90 - i * 8}" height="6" rx="3" fill="#c9d3e3"/><rect x="34" y="14" width="${60 - i * 6}" height="5" rx="2.5" fill="#e1e7f1"/></g>`).join('')}
          </g>
        </g>`);
    },
    welcome(id) { return ART.lighthouse(id); },
    cert(id) {
      return wrap(`${bg(id, '#0d2245', '#1d3f78')}${stars(30, 29)}
        <g filter="url(#sh${id})" transform="translate(240 170)">
          <path d="M-34 40 l-22 90 l32 -16 l18 30 l18 -78z" fill="#c8322b"/><path d="M34 40 l22 90 l-32 -16 l-18 30 l-18 -78z" fill="#9b241f"/>
          <circle r="76" fill="url(#gold${id})"/><circle r="62" fill="none" stroke="#fff3cf" stroke-width="3" stroke-dasharray="3 5"/>
          <path d="M0 -36 l30 11 v20 c0 24 -30 38 -30 38 s-30 -14 -30 -38 v-20z" fill="#0a1a33"/>
          <path d="m-12 2 9 9 16 -16" stroke="#ffd677" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </g>`);
    }
  };
  window.art = (name) => (ART[name] || ART.lighthouse)(++uid);

  window.brandMark = () => `<svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
    <path d="M20 9.5 L2 4 V14.5 Z" fill="#f5b93d" opacity=".4"/><path d="M20 9.5 L38 4 V14.5 Z" fill="#f5b93d" opacity=".4"/>
    <path d="M16.4 7.6 h7.2 l-1.3 -3.1 q-2.3 -2 -4.6 0z" fill="#c8322b"/><path d="M20 2.6 v-1.8" stroke="#c8322b" stroke-width="1.2" stroke-linecap="round"/>
    <rect x="17" y="7.6" width="6" height="3.8" fill="#ffd677"/><path d="M19 7.6 v3.8 M21 7.6 v3.8" stroke="#d9a53a" stroke-width=".6"/>
    <rect x="15.4" y="11.3" width="9.2" height="1.7" rx=".6" fill="#14305e"/>
    <path d="M16.8 13 h6.4 l1.6 20 h-9.6z" fill="#fff" stroke="#14305e" stroke-width="1.2" stroke-linejoin="round"/>
    <path d="M16.47 17 h7.06 l.32 4 h-7.7z M15.83 25 h8.34 l.32 4 h-8.98z" fill="#c8322b"/>
    <path d="M4.5 36 q3.9 -2.6 7.8 0 t7.8 0 t7.8 0 t7.8 0" stroke="#3a73f0" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`;

  window.sealSVG = () => `<svg class="seal" viewBox="0 0 200 200" aria-hidden="true">
    <defs>
      <linearGradient id="sealg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e9c46a"/><stop offset=".5" stop-color="#c9952c"/><stop offset="1" stop-color="#a87418"/></linearGradient>
      <path id="sealArc" d="M100 100 m-66 0 a66 66 0 1 1 132 0 a66 66 0 1 1 -132 0"/>
    </defs>
    <path d="M70 150 l-14 46 l20 -10 l10 18 l12 -44z" fill="#14305e"/><path d="M130 150 l14 46 l-20 -10 l-10 18 l-12 -44z" fill="#0d2245"/>
    <g>${Array.from({ length: 36 }, (_, i) => `<path d="M100 100 L${100 + 92 * Math.cos(i * Math.PI / 18)} ${100 + 92 * Math.sin(i * Math.PI / 18)} L${100 + 92 * Math.cos((i + .5) * Math.PI / 18)} ${100 + 92 * Math.sin((i + .5) * Math.PI / 18)}z" fill="url(#sealg)"/>`).join('')}</g>
    <circle cx="100" cy="100" r="84" fill="url(#sealg)"/>
    <circle cx="100" cy="100" r="78" fill="none" stroke="#fff6dc" stroke-width="1.5"/>
    <circle cx="100" cy="100" r="54" fill="none" stroke="#fff6dc" stroke-width="1.5"/>
    <text font-family="Public Sans, sans-serif" font-size="10.5" font-weight="800" letter-spacing="3.2" fill="#fff8e6"><textPath href="#sealArc" startOffset="0">LIGHTHOUSE · CYBERSECURITY READINESS · MAINE SCHOOLS ·</textPath></text>
    <path d="M100 68 l26 9 v17 c0 20 -26 32 -26 32 s-26 -12 -26 -32 v-17z" fill="#0d2245"/>
    <path d="m89 99 8 8 15 -15" stroke="#f5d27a" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  /* Football-field video frame used in the viral-video scenario */
  window.footballScene = () => `<svg class="scene" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="fsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1530"/><stop offset="1" stop-color="#253c6b"/></linearGradient>
      <linearGradient id="fturf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f8f4e"/><stop offset="1" stop-color="#185a30"/></linearGradient>
      <radialGradient id="flite" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff7d6"/><stop offset="1" stop-color="#fff7d6" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="400" height="320" fill="url(#fsky)"/>
    <circle cx="60" cy="40" r="50" fill="url(#flite)" opacity=".6"/><circle cx="340" cy="40" r="50" fill="url(#flite)" opacity=".6"/>
    <rect x="52" y="22" width="16" height="10" fill="#fffbe6"/><rect x="332" y="22" width="16" height="10" fill="#fffbe6"/>
    <path d="M0 120 H400 V140 H0z" fill="#132447"/>
    ${Array.from({ length: 30 }, (_, i) => `<circle cx="${8 + i * 13.5}" cy="${126 + (i % 3) * 4}" r="3.4" fill="${['#e2453c', '#f5f7fb', '#5b8cff', '#f5b93d'][i % 4]}" opacity=".75"/>`).join('')}
    <path d="M-40 320 L60 140 H340 L440 320z" fill="url(#fturf)"/>
    ${[0, 1, 2, 3, 4, 5].map(i => { const t = i / 5; const y = 140 + t * 180; const x1 = 60 - t * 100; const x2 = 340 + t * 100; return `<path d="M${x1} ${y} H${x2}" stroke="#fff" stroke-opacity=".55" stroke-width="${1 + t * 2}"/>`; }).join('')}
    <g transform="translate(150 196)">
      <ellipse cx="0" cy="62" rx="22" ry="5" fill="#000" opacity=".3"/>
      <path d="M-14 0 h28 l4 34 h-36z" fill="#8b1d1d"/><text x="0" y="24" font-family="Public Sans" font-size="16" font-weight="900" fill="#fff" text-anchor="middle">22</text>
      <circle cx="0" cy="-12" r="13" fill="#d8dde6"/><rect x="-11" y="-12" width="22" height="5" fill="#8b1d1d"/>
      <path d="M-14 34 l-6 26 h10 l6 -24z M14 34 l8 24 h-10 l-6 -22z" fill="#f2f2f2"/>
      <path d="M14 6 l18 -10" stroke="#8b1d1d" stroke-width="8" stroke-linecap="round"/>
      <ellipse cx="36" cy="-12" rx="9" ry="5.5" fill="#7a4a24" transform="rotate(-30 36 -12)"/>
    </g>
    <g transform="translate(260 206) scale(.85)">
      <path d="M-14 0 h28 l4 34 h-36z" fill="#1f3c88"/><circle cx="0" cy="-12" r="13" fill="#e8ecf3"/><rect x="-11" y="-12" width="22" height="5" fill="#1f3c88"/>
      <path d="M-14 34 l-10 22 h10 l8 -22z M14 34 l4 24 h-10 l-2 -22z" fill="#e8ecf3"/>
    </g>
    <rect x="12" y="282" width="96" height="24" rx="5" fill="#000" opacity=".55"/><text x="60" y="299" font-family="JetBrains Mono" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">HOME 28  AWAY 24</text>
  </svg>`;
})();
