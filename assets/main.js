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

  /* ---------- Language (EN / TR) ---------- */
  var TR = {
    skip: 'İçeriğe geç',
    brand: 'nullbyte, başa dön', nav: 'Ana menü', lang_label: 'Dil',
    nav_about: 'Hakkımda', nav_services: 'Hizmetler', nav_work: 'Çalışmalar', nav_process: 'Nasıl çalışırım', nav_contact: 'İletişim',
    badge: 'Backend ve otomasyon geliştiricisi',
    h1a: 'Discord botları, API’ler ve sunucular:', h1b: 'sessizce çalışır', h1c: 've asla durmaz.',
    lead: 'Ben <strong>nullbyte</strong>. Python ile <strong>Discord botları</strong>, <strong>API ve backend entegrasyonları</strong> ile <strong>sunucu ve VDS otomasyonu ile dağıtımı</strong> geliştiriyorum: temiz kod, güvenilir servisler ve kendi kendine ilgilenen otomasyon.',
    cta_work: 'Çalışmalarımı gör', cta_talk: 'Proje başlat',
    about_eyebrow: 'Hakkımda', about_title: 'Gösterişsiz, pratik mühendislik.',
    about_p1: 'Ben bir <strong>backend ve otomasyon geliştiricisiyim</strong>. Zamanımın çoğu Python, REST API’ler ve Windows sunucularına gidiyor: servisleri birbirine bağlayan ve güvenilir tutan araçlar geliştiriyorum.',
    about_p2: 'Önem verdiğim şeyler: <strong>temiz kod, öngörülebilir davranış ve ayakta kalan sistemler</strong>. Yani düzenli bir yapı, dikkatli hata yönetimi ve kimse sormadan neler olduğunu söyleyen izleme.',
    fact1: 'Python', fact1s: 'ana dil', fact2: 'Backend ve sunucular', fact2s: 'API, servisler, Windows', fact3: 'Otomasyon', fact3s: 'zamanlanmış işler ve izleme',
    svc_eyebrow: 'Ne yapıyorum', svc_title: 'Üç iş, doğru yapılmış.', svc_sub: 'Önemli sorunlara özenle uygulanan, odaklı bir beceri seti.',
    svc1_t: 'Discord botları', svc1_p: 'Python ile yazılmış, hızlı ve düzenli botlar: slash komutlarından bildirimlere, gece gündüz çalışan arka plan işçilerine kadar.',
    svc2_t: 'API ve backend entegrasyonları', svc2_p: 'Servisler arasında güvenilir bağlantılar. Temiz istek yönetimi, mantıklı hız sınırlama ve zarif hata toleransı; veri gitmesi gereken yere gider.',
    svc3_t: 'Sunucu ve VDS otomasyonu', svc3_p: 'Windows VDS kurulumu ve dağıtımı, zamanlanmış işler ve servisleri sağlıklı, güvenli ve kurtarılabilir tutan izleme.',
    stack_eyebrow: 'Araç seti', stack_title: 'Sık kullandığım araçlar.', stack_g1: 'Diller ve servisler', stack_g2: 'Operasyon',
    chip_backend: 'Backend otomasyonu', chip_win: 'Windows sunucu yönetimi', chip_mon: 'Servis izleme', chip_jobs: 'Zamanlanmış işler', chip_vds: 'VDS yönetimi',
    work_eyebrow: 'Seçilmiş çalışmalar', work_title: 'Herkese açık işler, doğrudan GitHub’dan.',
    work_sub: 'Bunlar herkese açık depolarım. GitHub’dan canlı çekiliyor, yani burada gördüğünüz şey gerçekten var olan şey.',
    repo_site_desc: 'Kişisel geliştirici sayfası',
    req_t: 'Daha fazla seçilmiş çalışma istek üzerine paylaşılır', req_p: 'Yaptıklarımın bir kısmı özel ya da başkaları için hazırlandı, bu yüzden herkese açık değil. Projenize uygun örnekler görmek isterseniz yeter ki isteyin.', req_cta: 'Örnek iste',
    cap_t: 'Neler geliştiriyorum',
    cap1_t: 'Discord botları', cap1_p: 'Slash komutları, bildirimler ve çevrimiçi kalmak ile hatalardan toparlanmak için tasarlanmış işçiler.',
    cap2_t: 'API tabanlı otomasyon', cap2_p: 'Dış API’lerden veri çekip bu veriye göre işlem yapan entegrasyonlar; limitlere, yeniden denemelere ve uç durumlara özen gösterilerek.',
    cap3_t: 'Sunucu araçları ve izleme', cap3_p: 'Windows sunucularını ayakta tutan betikler ve zamanlanmış görevler; sorunları erkenden yakalayan kontroller.',
    proof_eyebrow: 'Kanıtlar', proof_title: 'İddia değil, doğrulanabilir.', proof_sub: 'Aşağıdakilerin hepsini bağımsız olarak kontrol edebilirsiniz.',
    p1_t: 'Canlı GitHub etkinliği', p1_repos: 'Herkese açık depo', p1_push: 'Son herkese açık gönderim', p1_link: 'GitHub profilini aç',
    p2_t: 'Doğrulanmış alan adı', p2_p: '<span class="mono">nullbyte.is-a.dev</span>, açık kaynaklı is-a.dev kayıt sistemi üzerinden alındı ve Discord profilime doğrulanmış alan adı olarak bağlı.', p2_link: 'Herkese açık kaydı gör',
    p3_t: 'Açık kaynak, güvenli yayın', p3_p: 'Bu sitenin kaynak kodu herkese açık ve GitHub Pages üzerinden HTTPS ile sunuluyor. Kodu okuyabilir ya da commit geçmişine bakabilirsiniz.', p3_link: 'Kaynak kodu oku',
    proc_eyebrow: 'Nasıl çalışırım', proc_title: 'Proje bazlı ve baştan net.', proc_sub: 'Serbest projeleri tek tek üstleniyorum. İş başlamadan önce ne alacağınızı ve ne tutacağını her zaman bilirsiniz.',
    s1_t: 'Brief', s1_p: 'İhtiyacınızı anlatırsınız. Kapsamı, kısıtları ve “bitti”nin neye benzediğini netleştiren soruları ben sorarım.',
    s2_t: 'Teklif', s2_p: 'Net bir teklif ve üzerinde anlaşılmış bir plan alırsınız. İkisinden de memnun olmadan hiçbir şey başlamaz.',
    s3_t: 'Geliştirme', s3_p: 'Python ile geliştiririm, şekillenirken sizi bilgilendiririm ve canlıya almadan önce düzgünce test ederim.',
    s4_t: 'Teslim ve destek', s4_p: 'Bitmiş işi kurulum notlarıyla birlikte teslim alırsınız; sonrasında destek nasıl olacak, birlikte karar veririz.',
    t1_k: 'Çalışma şekli', t1_v: 'Serbest, proje bazlı', t2_k: 'Fiyatlandırma', t2_v: 'Projeye göre teklif: iletişime geçin', t3_k: 'Süre', t3_v: 'Baştan, projeye göre belirlenir',
    contact_eyebrow: 'İletişim', contact_title: 'Birlikte güvenilir bir şey kuralım.',
    contact_sub: 'İhtiyacınızı yazın, size sorularla ya da bir planla döneyim. Bana Discord veya GitHub üzerinden ulaşabilirsiniz.',
    ch_discord: 'Discord', ch_email: 'E-posta', copy: 'Kullanıcı adını kopyala', open: 'Profili aç', write: 'Bana yazın',
    foot: 'Backend ve otomasyon geliştiricisi', top: 'Başa dön ↑',
    copied: 'Discord kullanıcı adı kopyalandı: soysxl', copy_fail: 'Kopyalanamadı. Kullanıcı adı: soysxl',
    live_na: 'GitHub’da gör',
    title: 'nullbyte — Backend ve Otomasyon Geliştiricisi',
    desc: 'nullbyte; Python ile Discord botları, API ve backend entegrasyonları ile VDS otomasyonu ve dağıtımı geliştiren bir backend ve otomasyon geliştiricisidir.'
  };
  var EN = {
    copied: 'Discord username copied: soysxl', copy_fail: 'Could not copy. Username: soysxl', live_na: 'See GitHub',
    title: document.title,
    desc: (document.querySelector('meta[name="description"]') || {}).content || ''
  };
  var i18nEls = document.querySelectorAll('[data-i]'), ariaEls = document.querySelectorAll('[data-ia]');
  i18nEls.forEach(function (el) { EN[el.getAttribute('data-i')] = el.innerHTML; });
  ariaEls.forEach(function (el) { EN[el.getAttribute('data-ia')] = el.getAttribute('aria-label'); });

  var lang = 'en';
  var relayout = [];
  function t(k) { return (lang === 'tr' ? TR[k] : EN[k]); }

  function setLang(next, persist) {
    lang = next === 'tr' ? 'tr' : 'en';
    document.documentElement.lang = lang === 'tr' ? 'tr' : 'en-GB';
    i18nEls.forEach(function (el) { var v = t(el.getAttribute('data-i')); if (v != null) el.innerHTML = v; });
    ariaEls.forEach(function (el) { var v = t(el.getAttribute('data-ia')); if (v != null) el.setAttribute('aria-label', v); });
    document.title = t('title');
    var md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute('content', t('desc'));
    document.querySelectorAll('.lang-btn').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });
    var cp = document.getElementById('copied'); if (cp) cp.textContent = '';
    var cb = document.getElementById('copy-discord'); if (cb) cb.classList.remove('done');
    relayout.forEach(function (fn) { fn(); });
    if (persist) { try { localStorage.setItem('nb-lang', lang); } catch (e) { /* storage unavailable */ } }
  }

  var saved = null;
  try { saved = localStorage.getItem('nb-lang'); } catch (e) { /* storage unavailable */ }
  var initial = (saved === 'tr' || saved === 'en') ? saved
    : (/^tr\b/i.test((navigator.languages && navigator.languages[0]) || navigator.language || '') ? 'tr' : 'en');
  document.querySelectorAll('.lang-btn').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang'), true); });
  });

  /* ---------- Copy Discord username ---------- */
  var copyBtn = document.getElementById('copy-discord'), copiedMsg = document.getElementById('copied');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var text = copyBtn.getAttribute('data-copy');
      function ok() {
        copyBtn.classList.add('done'); copiedMsg.textContent = t('copied');
        setTimeout(function () { copyBtn.classList.remove('done'); }, 2500);
      }
      function fail() { copiedMsg.textContent = t('copy_fail'); }
      function legacy() {
        var ta = document.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
        document.body.appendChild(ta); ta.select();
        var done = false;
        try { done = document.execCommand('copy'); } catch (e) { done = false; }
        document.body.removeChild(ta);
        if (done) ok(); else fail();
      }
      if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text).then(ok, legacy); } else { legacy(); }
    });
  }

  /* ---------- Live GitHub data (public API, no token) ---------- */
  var USER = 'w44mwtksn4-blip';
  var reposEl = document.getElementById('repos');
  var liveRepos = document.getElementById('live-repos'), livePush = document.getElementById('live-push');
  var gh = { user: null, repos: null };
  var COLORS = { Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#3178c6', HTML: '#e34c26', CSS: '#563d7c', Shell: '#89e051', PowerShell: '#012456', Go: '#00ADD8', Rust: '#dea584', 'C#': '#178600', Java: '#b07219' };
  var FILE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M15 3v6h6"/></svg>';

  function fmtDate(iso) {
    try { return new Date(iso).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); }
    catch (e) { return iso.slice(0, 10); }
  }

  function renderRepos() {
    if (!reposEl || !gh.repos) return;
    var list = gh.repos.filter(function (r) { return !r.fork && !r.private && !r.archived; })
      .sort(function (a, b) { return (b.stargazers_count - a.stargazers_count) || (new Date(b.pushed_at) - new Date(a.pushed_at)); });
    if (!list.length) return;
    reposEl.textContent = '';
    reposEl.classList.toggle('solo', list.length === 1);
    list.forEach(function (r) {
      var a = document.createElement('a');
      a.className = 'repo'; a.href = r.html_url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      var top = document.createElement('div'); top.className = 'repo-top'; top.innerHTML = FILE_ICON;
      var h = document.createElement('h3'); h.textContent = r.name;
      var ar = document.createElement('span'); ar.className = 'arrow'; ar.setAttribute('aria-hidden', 'true'); ar.textContent = '↗';
      top.appendChild(h); top.appendChild(ar);
      var p = document.createElement('p');
      var isSite = r.name === USER + '.github.io';
      if (isSite && lang === 'tr') p.textContent = TR.repo_site_desc; else p.textContent = r.description || '';
      if (!p.textContent) p.style.display = 'none';
      var meta = document.createElement('div'); meta.className = 'repo-meta';
      if (r.language) {
        var l = document.createElement('span'), d = document.createElement('span');
        d.className = 'lang-dot'; d.style.background = COLORS[r.language] || '#7c5cff'; d.setAttribute('aria-hidden', 'true');
        l.appendChild(d); l.appendChild(document.createTextNode(r.language)); meta.appendChild(l);
      }
      var st = document.createElement('span'); st.textContent = '★ ' + r.stargazers_count; meta.appendChild(st);
      var up = document.createElement('span'); up.textContent = (lang === 'tr' ? 'Güncelleme ' : 'Updated ') + fmtDate(r.pushed_at); meta.appendChild(up);
      a.appendChild(top); a.appendChild(p); a.appendChild(meta);
      reposEl.appendChild(a);
    });
  }

  function renderLive() {
    if (!liveRepos) return;
    if (gh.user && typeof gh.user.public_repos === 'number') liveRepos.textContent = String(gh.user.public_repos);
    if (gh.repos) {
      var own = gh.repos.filter(function (r) { return !r.fork && r.pushed_at; });
      if (own.length) {
        var latest = own.reduce(function (m, r) { return new Date(r.pushed_at) > new Date(m) ? r.pushed_at : m; }, own[0].pushed_at);
        livePush.textContent = fmtDate(latest);
      }
    }
  }

  relayout.push(renderRepos, renderLive);

  function api(path) {
    return fetch('https://api.github.com' + path, { headers: { Accept: 'application/vnd.github+json' } })
      .then(function (res) { if (!res.ok) throw new Error(String(res.status)); return res.json(); });
  }
  if ('fetch' in window) {
    api('/users/' + USER).then(function (u) { gh.user = u; renderLive(); }).catch(function () { if (liveRepos) liveRepos.textContent = t('live_na'); });
    api('/users/' + USER + '/repos?per_page=100&type=owner&sort=pushed').then(function (r) { gh.repos = r; renderRepos(); renderLive(); }).catch(function () { if (livePush) livePush.textContent = t('live_na'); });
  }

  setLang(initial, false);
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
