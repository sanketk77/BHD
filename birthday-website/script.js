/* ═══════════════════════════════════════════════════════════
   BIRTHDAY WEBSITE — script.js
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ─── STATE ─────────────────────────────────────────────── */
let currentPage = 'page-landing';
let noClickCount = 0;
let letterTyping = null;
let slideshowTimer = null;
let currentSlide = 0;
let musicPlaying = false;

/* ─── INIT ON DOM READY ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  setupCursor();
  setupGlobalHearts();
  initStars();
  initBalloons();
  initSlideshow();
  startFireworks();
  startConfetti();
  setupScrollReveal();

  // Loading screen → fade out after 2.4s
  setTimeout(() => {
    const loader = document.getElementById('loading-screen');
    loader.classList.add('fade-out');
    setTimeout(() => loader.remove(), 900);
  }, 2400);
});

/* ═══════════════════════════════════════════════════════════
   CUSTOM CURSOR + HEART TRAIL
   ═══════════════════════════════════════════════════════════ */
function setupCursor() {
  const cursor = document.getElementById('cursor');
  let lastTrail = 0;

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';

    const now = Date.now();
    if (now - lastTrail > 80) {
      spawnHeartTrail(e.clientX, e.clientY);
      lastTrail = now;
    }
  });
}

function spawnHeartTrail(x, y) {
  const hearts = ['❤️','💕','💖','💗','✨','🌸'];
  const el = document.createElement('div');
  el.className = 'cursor-heart';
  el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  el.style.cssText = `left:${x}px;top:${y}px;font-size:${10+Math.random()*8}px`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 820);
}

/* ═══════════════════════════════════════════════════════════
   SPARKLE ON CLICK
   ═══════════════════════════════════════════════════════════ */
document.addEventListener('click', e => {
  for (let i = 0; i < 5; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle-particle';
    s.textContent = ['✨','💖','🌸','⭐','💫'][i];
    s.style.cssText = `left:${e.clientX + (Math.random()-0.5)*40}px;top:${e.clientY}px`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 950);
  }
});

/* ═══════════════════════════════════════════════════════════
   PAGE NAVIGATION
   ═══════════════════════════════════════════════════════════ */
function goToPage(targetId) {
  // Hide current
  const current = document.getElementById(currentPage);
  if (current) current.classList.remove('active');

  // Show target
  const target = document.getElementById(targetId);
  if (!target) return;
  target.classList.add('active');
  currentPage = targetId;
  target.scrollTop = 0;

  // Page-specific init
  if (targetId === 'page-timeline') initTimelineHearts();
  if (targetId === 'page-letter')   startLetterTyping();
  if (targetId === 'page-proposal') initProposal();
  if (targetId === 'page-final')    initFinalPage();
  if (targetId === 'page-gallery')  triggerGalleryReveal();
}

/* ═══════════════════════════════════════════════════════════
   SLIDESHOW (Landing background)
   ═══════════════════════════════════════════════════════════ */
function initSlideshow() {
  const slides = document.querySelectorAll('.slide');
  if (!slides.length) return;
  slides[0].classList.add('active');

  slideshowTimer = setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 4500);
}

/* ═══════════════════════════════════════════════════════════
   STARS
   ═══════════════════════════════════════════════════════════ */
function initStars() {
  const layer = document.getElementById('stars');
  if (!layer) return;
  for (let i = 0; i < 60; i++) {
    const s = document.createElement('div');
    s.className = 'star-dot';
    const size = 1 + Math.random() * 3;
    s.style.cssText = `
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      width:${size}px; height:${size}px;
      animation-duration:${1.5+Math.random()*3}s;
      animation-delay:${Math.random()*4}s;
    `;
    layer.appendChild(s);
  }

  // Proposal stars
  const ps = document.getElementById('stars-proposal');
  if (ps) {
    for (let i = 0; i < 100; i++) {
      const s = document.createElement('div');
      s.className = 'star-dot';
      const size = 1 + Math.random() * 2.5;
      s.style.cssText = `
        left:${Math.random()*100}%;
        top:${Math.random()*100}%;
        width:${size}px; height:${size}px;
        animation-duration:${1+Math.random()*4}s;
        animation-delay:${Math.random()*5}s;
      `;
      ps.appendChild(s);
    }
  }
}

/* ═══════════════════════════════════════════════════════════
   BALLOONS
   ═══════════════════════════════════════════════════════════ */
function initBalloons() {
  const container = document.getElementById('balloons');
  if (!container) return;
  const emojis = ['🎈','🎈','🎉','🎊','🎈','💜','🌸'];
  for (let i = 0; i < 9; i++) {
    const b = document.createElement('div');
    b.className = 'balloon';
    b.textContent = emojis[i % emojis.length];
    b.style.cssText = `
      left:${5+Math.random()*90}%;
      font-size:${2+Math.random()*1.5}rem;
      animation-duration:${6+Math.random()*8}s;
      animation-delay:${Math.random()*6}s;
    `;
    container.appendChild(b);
  }
}

/* ═══════════════════════════════════════════════════════════
   GLOBAL FLOATING HEARTS
   ═══════════════════════════════════════════════════════════ */
function setupGlobalHearts() {
  const container = document.getElementById('global-hearts');
  const symbols = ['❤️','💕','💖','💗','💓','🌸','✨'];

  function spawnHeart() {
    const h = document.createElement('div');
    h.className = 'float-heart';
    h.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const dur = 8 + Math.random() * 10;
    h.style.cssText = `
      left:${Math.random()*100}%;
      font-size:${.8+Math.random()*1.4}rem;
      animation-duration:${dur}s;
      animation-delay:0s;
    `;
    container.appendChild(h);
    setTimeout(() => h.remove(), dur * 1000);
  }

  spawnHeart();
  setInterval(spawnHeart, 1400);
}

/* ═══════════════════════════════════════════════════════════
   CONFETTI (Landing)
   ═══════════════════════════════════════════════════════════ */
function startConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#c9b8e8','#f4a8c7','#e8c97a','#ffffff','#9b7fd4','#e0789e'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: 4 + Math.random() * 7,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: .6 + Math.random() * 1.5,
      angle: Math.random() * 360,
      spin: (Math.random() - .5) * 4,
      drift: (Math.random() - .5) * 1.2,
      shape: Math.random() > .5 ? 'rect' : 'circle'
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = .8;
      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size/2, -p.size/4, p.size, p.size/2);
      }
      ctx.restore();

      p.y += p.speed;
      p.x += p.drift;
      p.angle += p.spin;
      if (p.y > canvas.height) { p.y = -10; p.x = Math.random() * canvas.width; }
    });
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

/* ═══════════════════════════════════════════════════════════
   FIREWORKS (Landing)
   ═══════════════════════════════════════════════════════════ */
function startFireworks() {
  const canvas = document.getElementById('fireworks-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#c9b8e8','#f4a8c7','#e8c97a','#9b7fd4','#ffffff','#ff8fab'];

  class Particle {
    constructor(x, y, color, angle, speed) {
      this.x = x; this.y = y;
      this.color = color;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1;
      this.decay = .015 + Math.random() * .015;
      this.radius = 2 + Math.random() * 2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += .04;  // gravity
      this.alpha -= this.decay;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(this.alpha, 0);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function launchFirework() {
    const x = 80 + Math.random() * (canvas.width - 160);
    const y = 50 + Math.random() * (canvas.height * .5);
    const color = colors[Math.floor(Math.random() * colors.length)];
    const count = 50 + Math.floor(Math.random() * 40);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const speed = 2 + Math.random() * 4;
      particles.push(new Particle(x, y, color, angle, speed));
    }
  }

  setInterval(launchFirework, 2200);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].alpha <= 0) particles.splice(i, 1);
    }
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

/* ═══════════════════════════════════════════════════════════
   MUSIC TOGGLE
   ═══════════════════════════════════════════════════════════ */
function toggleMusic() {
  const audio = document.getElementById('bg-music');
  const btn   = document.getElementById('music-btn');
  if (!audio || !btn) return;

  if (musicPlaying) {
    audio.pause();
    btn.textContent = '🎵 Play Birthday Music';
    btn.classList.remove('playing');
    musicPlaying = false;
  } else {
    audio.play().catch(() => {});
    btn.textContent = '🎵 Pause Music';
    btn.classList.add('playing');
    musicPlaying = true;
  }
}

/* ═══════════════════════════════════════════════════════════
   TIMELINE HEARTS
   ═══════════════════════════════════════════════════════════ */
function initTimelineHearts() {
  const container = document.getElementById('timeline-hearts');
  if (!container) return;
  container.innerHTML = '';
  const symbols = ['💜','💕','🌸','✨','💖'];
  for (let i = 0; i < 18; i++) {
    const h = document.createElement('div');
    h.className = 'float-heart';
    h.textContent = symbols[i % symbols.length];
    const dur = 7 + Math.random() * 8;
    h.style.cssText = `
      left:${Math.random()*100}%;
      font-size:${.9+Math.random()*1.2}rem;
      animation-duration:${dur}s;
      animation-delay:${Math.random()*5}s;
    `;
    container.appendChild(h);
  }

  // Trigger scroll-reveal for cards
  setTimeout(() => {
    document.querySelectorAll('#page-timeline .timeline-card').forEach((card, i) => {
      setTimeout(() => card.classList.add('revealed'), i * 220);
    });
  }, 200);
}

/* ═══════════════════════════════════════════════════════════
   GALLERY REVEAL
   ═══════════════════════════════════════════════════════════ */
function triggerGalleryReveal() {
  setTimeout(() => {
    document.querySelectorAll('#page-gallery .gallery-item').forEach((item, i) => {
      setTimeout(() => item.classList.add('revealed'), i * 100);
    });
  }, 200);
}

/* ═══════════════════════════════════════════════════════════
   LIGHTBOX
   ═══════════════════════════════════════════════════════════ */
function openLightbox(src) {
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  img.src = src;
  lb.classList.add('open');
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.classList.remove('open');
}

/* ═══════════════════════════════════════════════════════════
   LETTER TYPING EFFECT
   ═══════════════════════════════════════════════════════════ */
const LETTER_TEXT = `Happy Birthday, Pookie Dookie ❤️

I don't know how to put everything into words, but I'm really grateful that you came into my life.

You make ordinary days feel extraordinary.

I hope your smile never fades.

May this birthday bring you endless happiness.

And maybe...

Today I finally want to ask you something...`;

function startLetterTyping() {
  const el = document.getElementById('letter-text');
  const cursorEl = document.getElementById('letter-cursor');
  const btn = document.getElementById('letter-continue-btn');
  if (!el) return;

  // Reset
  el.textContent = '';
  if (btn) btn.style.display = 'none';
  if (letterTyping) clearTimeout(letterTyping);

  let i = 0;

  // Init rose petals
  initLetterPetals();

  function type() {
    if (i < LETTER_TEXT.length) {
      el.textContent += LETTER_TEXT[i];
      i++;
      const delay = LETTER_TEXT[i-1] === '\n' ? 320 : 38 + Math.random() * 22;
      letterTyping = setTimeout(type, delay);
    } else {
      // Done typing
      if (cursorEl) cursorEl.style.display = 'none';
      if (btn) btn.style.display = 'inline-block';
    }
  }
  type();
}

/* ═══════════════════════════════════════════════════════════
   LETTER PETALS
   ═══════════════════════════════════════════════════════════ */
function initLetterPetals() {
  const container = document.getElementById('letter-petals');
  if (!container) return;
  container.innerHTML = '';
  const petals = ['🌸','🌺','🌷','💮','🏵️'];
  for (let i = 0; i < 14; i++) {
    const p = document.createElement('div');
    p.className = 'letter-petal';
    p.textContent = petals[i % petals.length];
    const dur = 8 + Math.random() * 10;
    p.style.cssText = `
      left:${Math.random()*100}%;
      font-size:${.9+Math.random()*.9}rem;
      animation-duration:${dur}s;
      animation-delay:${Math.random()*5}s;
    `;
    container.appendChild(p);
  }
}

/* ═══════════════════════════════════════════════════════════
   PROPOSAL PAGE INIT
   ═══════════════════════════════════════════════════════════ */
function initProposal() {
  noClickCount = 0;

  // Reset no button
  const noBtn = document.getElementById('no-btn');
  if (noBtn) {
    noBtn.style.display = '';
    noBtn.style.transform = '';
    noBtn.style.position = '';
    noBtn.style.opacity = '1';
    noBtn.textContent = 'NO 💔';
  }
  // Reset yes overlay
  const overlay = document.getElementById('yes-overlay');
  if (overlay) overlay.style.display = 'none';

  // Rose petals
  initRosePetals();

  // Proposal mini hearts
  initProposalHearts();
}

function initRosePetals() {
  const container = document.getElementById('rose-petals');
  if (!container) return;
  container.innerHTML = '';
  const petals = ['🌹','🌸','🥀','🌺','💐'];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'rose-petal-el';
    p.textContent = petals[i % petals.length];
    const dur = 5 + Math.random() * 9;
    p.style.cssText = `
      left:${Math.random()*100}%;
      top:-20px;
      font-size:${.8+Math.random()*1}rem;
      animation-duration:${dur}s;
      animation-delay:${Math.random()*6}s;
    `;
    container.appendChild(p);
  }
}

function initProposalHearts() {
  const container = document.getElementById('proposal-hearts');
  if (!container) return;
  container.innerHTML = '';
  const symbols = ['❤️','💖','💕','💗'];
  for (let i = 0; i < 12; i++) {
    const h = document.createElement('div');
    h.className = 'proposal-mini-heart';
    h.textContent = symbols[i % symbols.length];
    const dur = 3 + Math.random() * 4;
    h.style.cssText = `
      left:${Math.random()*90}%;
      bottom:${Math.random()*30}%;
      animation-duration:${dur}s;
      animation-delay:${Math.random()*4}s;
    `;
    container.appendChild(h);
  }
}

/* ═══════════════════════════════════════════════════════════
   NO BUTTON LOGIC
   ═══════════════════════════════════════════════════════════ */
const NO_TEXTS = [
  'NO 💔',
  'Are you sure? 🥺',
  'Think again ❤️',
  'No isn\'t working 😭',
  'Try YES 😌',
  'Really? 😭',
  'Nope! 🥺',
  'I\'m escaping! 🏃',
];

function handleNo() {
  const noBtn  = document.getElementById('no-btn');
  const yesBtn = document.getElementById('yes-btn');
  if (!noBtn) return;

  noClickCount++;
  const proposal = document.getElementById('page-proposal');
  const maxX = (proposal ? proposal.clientWidth : window.innerWidth) - 140;
  const maxY = (proposal ? proposal.clientHeight : window.innerHeight) - 60;

  noBtn.textContent = NO_TEXTS[Math.min(noClickCount, NO_TEXTS.length - 1)];

  // Make it absolutely positioned if not already
  if (noBtn.style.position !== 'absolute') {
    const rect = noBtn.getBoundingClientRect();
    noBtn.style.position = 'fixed';
    noBtn.style.left = rect.left + 'px';
    noBtn.style.top  = rect.top  + 'px';
    noBtn.style.margin = '0';
    noBtn.style.zIndex = '9999';
  }

  // Random new position
  const nx = 40 + Math.random() * (window.innerWidth  - 180);
  const ny = 60 + Math.random() * (window.innerHeight - 100);
  const scale  = Math.max(0.4, 1 - noClickCount * 0.08);
  const rotate = (Math.random() - .5) * 30;

  noBtn.style.left = nx + 'px';
  noBtn.style.top  = ny + 'px';
  noBtn.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
  noBtn.style.transition = 'left .35s cubic-bezier(.25,.8,.25,1), top .35s cubic-bezier(.25,.8,.25,1), transform .3s ease, opacity .3s';

  if (noClickCount >= 6) {
    noBtn.style.opacity = '0';
    setTimeout(() => { noBtn.style.display = 'none'; }, 400);
  }

  // Shrink yes button up a bit when no is clicked (encouraging)
  if (yesBtn) {
    yesBtn.style.transform = 'scale(1.12) translateY(-4px)';
    setTimeout(() => { yesBtn.style.transform = ''; }, 400);
  }
}

/* Mouse-chase: no button tries to dodge the cursor */
document.addEventListener('mousemove', e => {
  const noBtn = document.getElementById('no-btn');
  if (!noBtn || noClickCount === 0) return;
  if (noBtn.style.display === 'none') return;
  if (noBtn.style.position !== 'fixed') return;

  const rect = noBtn.getBoundingClientRect();
  const btnCX = rect.left + rect.width / 2;
  const btnCY = rect.top  + rect.height / 2;
  const dx = e.clientX - btnCX;
  const dy = e.clientY - btnCY;
  const dist = Math.sqrt(dx*dx + dy*dy);

  if (dist < 130) {
    const flee = 160 / Math.max(dist, 1);
    let nx = parseFloat(noBtn.style.left) - dx * flee * .06;
    let ny = parseFloat(noBtn.style.top)  - dy * flee * .06;
    nx = Math.max(10, Math.min(window.innerWidth  - rect.width  - 10, nx));
    ny = Math.max(10, Math.min(window.innerHeight - rect.height - 10, ny));
    noBtn.style.left = nx + 'px';
    noBtn.style.top  = ny + 'px';
  }
});

/* ═══════════════════════════════════════════════════════════
   YES BUTTON
   ═══════════════════════════════════════════════════════════ */
function handleYes() {
  const overlay = document.getElementById('yes-overlay');
  if (overlay) {
    overlay.style.display = 'flex';
    launchCelebration();
  }
}

function launchCelebration() {
  const canvas = document.getElementById('celebration-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#c9b8e8','#f4a8c7','#e8c97a','#9b7fd4','#ff8fab','#ffffff'];

  // Big burst from center
  for (let i = 0; i < 180; i++) {
    const angle = (i / 180) * Math.PI * 2;
    const speed = 3 + Math.random() * 8;
    particles.push({
      x: canvas.width / 2, y: canvas.height / 2,
      vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1, decay: .012 + Math.random() * .01,
      radius: 3 + Math.random() * 3,
      emoji: Math.random() > .7 ? ['❤️','💖','✨','🌸'][Math.floor(Math.random()*4)] : null
    });
  }

  // Extra firework bursts
  const positions = [
    [canvas.width*.25, canvas.height*.3],
    [canvas.width*.75, canvas.height*.25],
    [canvas.width*.5,  canvas.height*.6],
    [canvas.width*.15, canvas.height*.55],
    [canvas.width*.85, canvas.height*.5],
  ];
  positions.forEach(([px, py]) => {
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      particles.push({
        x: px, y: py,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1, decay: .016 + Math.random() * .012,
        radius: 2 + Math.random() * 2.5, emoji: null
      });
    }
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      if (p.alpha <= 0) return;
      alive = true;
      p.x += p.vx; p.y += p.vy;
      p.vy += .055; p.alpha -= p.decay;

      ctx.save();
      ctx.globalAlpha = Math.max(p.alpha, 0);
      if (p.emoji) {
        ctx.font = '18px serif';
        ctx.fillText(p.emoji, p.x, p.y);
      } else {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });
    if (alive) requestAnimationFrame(animate);
  }
  animate();
}

/* ═══════════════════════════════════════════════════════════
   FINAL PAGE
   ═══════════════════════════════════════════════════════════ */
function initFinalPage() {
  // Dense floating hearts
  const container = document.getElementById('final-hearts');
  if (container) {
    container.innerHTML = '';
    const symbols = ['❤️','💕','💖','💗','💓','🌸','✨','💜'];
    for (let i = 0; i < 30; i++) {
      const h = document.createElement('div');
      h.className = 'float-heart';
      h.textContent = symbols[i % symbols.length];
      const dur = 7 + Math.random() * 9;
      h.style.cssText = `
        left:${Math.random()*100}%;
        font-size:${.9+Math.random()*2}rem;
        animation-duration:${dur}s;
        animation-delay:${Math.random()*6}s;
      `;
      container.appendChild(h);
    }
  }

  // Day counter
  const counter = document.getElementById('day-counter');
  if (counter) {
    // Day 1 is today (birthday)
    counter.textContent = 'Day 1 of our forever. ✨';
  }
}

/* ═══════════════════════════════════════════════════════════
   REPLAY
   ═══════════════════════════════════════════════════════════ */
function replayStory() {
  goToPage('page-landing');
}

/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL (for pages that scroll)
   ═══════════════════════════════════════════════════════════ */
function setupScrollReveal() {
  // For gallery items use triggerGalleryReveal on page open
  // For other scrollable pages observe
  const pages = ['page-gallery','page-timeline'];
  pages.forEach(pageId => {
    const page = document.getElementById(pageId);
    if (!page) return;
    page.addEventListener('scroll', () => {
      const items = page.querySelectorAll('.scroll-reveal:not(.revealed)');
      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight * .88) {
          item.classList.add('revealed');
        }
      });
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   RESIZE HANDLER
   ═══════════════════════════════════════════════════════════ */
window.addEventListener('resize', () => {
  const cConf = document.getElementById('confetti-canvas');
  const cFire = document.getElementById('fireworks-canvas');
  const cCele = document.getElementById('celebration-canvas');
  if (cConf) { cConf.width  = window.innerWidth; cConf.height  = window.innerHeight; }
  if (cFire) { cFire.width  = window.innerWidth; cFire.height  = window.innerHeight; }
  if (cCele) { cCele.width  = window.innerWidth; cCele.height  = window.innerHeight; }
});
