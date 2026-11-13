(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Footer year */
  var y = document.getElementById('year');
  if (y) y.textContent = '© ' + new Date().getFullYear() + ' ·';

  /* Sticky nav state */
  var nav = document.getElementById('nav');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 12); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Scroll reveal */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* Card spotlight */
  document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* Rotating role text */
  var typed = document.getElementById('typed');
  var caret = document.querySelector('.caret');
  var words = ['Discord bots', 'API integrations', 'backend services', 'server automation'];
  if (typed && !reduce) {
    var w = 0, c = words[0].length, del = true;
    (function tick() {
      var word = words[w];
      if (del) { c--; } else { c++; }
      typed.textContent = word.slice(0, c);
      var wait = del ? 38 : 70;
      if (!del && c === word.length) { del = true; wait = 1900; }
      else if (del && c === 0) { del = false; w = (w + 1) % words.length; wait = 280; }
      setTimeout(tick, wait);
    })();
  } else if (caret) { caret.style.display = 'none'; }

  /* Animated network background */
  var canvas = document.getElementById('bg');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, pts = [], running = true, raf = 0;
  var mouse = { x: -9999, y: -9999 };

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.max(28, Math.min(80, Math.round((W * H) / 20000)));
    pts = [];
    for (var i = 0; i < n; i++) {
      pts.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.4 + 0.6
      });
    }
    if (reduce) draw();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    var maxD = Math.min(150, Math.max(100, W / 9)), i, j, p, q, dx, dy, d, a;
    for (i = 0; i < pts.length; i++) {
      p = pts[i];
      if (!reduce) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = W + 20; else if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20; else if (p.y > H + 20) p.y = -20;
      }
      for (j = i + 1; j < pts.length; j++) {
        q = pts[j]; dx = p.x - q.x; dy = p.y - q.y; d = dx * dx + dy * dy;
        if (d < maxD * maxD) {
          a = (1 - Math.sqrt(d) / maxD) * 0.22;
          ctx.strokeStyle = 'rgba(139,107,255,' + a.toFixed(3) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
      dx = p.x - mouse.x; dy = p.y - mouse.y; d = Math.sqrt(dx * dx + dy * dy);
      if (d < 170) {
        a = (1 - d / 170) * 0.45;
        ctx.strokeStyle = 'rgba(34,211,238,' + a.toFixed(3) + ')';
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
      ctx.fillStyle = 'rgba(190,200,255,0.55)';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
    }
  }

  function loop() { if (!running) return; draw(); raf = requestAnimationFrame(loop); }

  var rt;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(resize, 150); });
  resize();

  if (!reduce) {
    window.addEventListener('pointermove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    window.addEventListener('pointerleave', function () { mouse.x = mouse.y = -9999; });
    document.addEventListener('visibilitychange', function () {
      running = !document.hidden;
      if (running) { cancelAnimationFrame(raf); loop(); }
    });
    loop();
  }
})();
