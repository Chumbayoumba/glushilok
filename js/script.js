/* ═══════════════════════════════════════════════════════════
   ГЛУШИЛОК.NET — script.js
   Счётчик посетителей, таймер обратного отсчёта, "места"
   Чистый ванильный JS, без зависимостей (Web 1.0 vibe)
   ═══════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* ---------- 1. СЧЁТЧИК ПОСЕТИТЕЛЕЙ (hit counter) ----------
     Хранится в localStorage. Базовое "красивое" число + инкремент.
     Это маркетинговый псевдо-счётчик в стиле 2000-х. */
  function initHitCounter() {
    var el = document.getElementById("hitCounter");
    if (!el) return;
    var BASE = 1337420; // стартовое "число посетителей"
    var key = "glsh_hits";
    var n = parseInt(localStorage.getItem(key) || "0", 10);
    n += 1;
    localStorage.setItem(key, String(n));
    // случайный "шум", чтобы число росло у всех
    var shown = BASE + n + Math.floor(Math.random() * 50);
    el.textContent = String(shown).padStart(7, "0");
  }

  /* ---------- 2. ОНЛАЙН СЕЙЧАС (живой счётчик) ----------
     Колеблется вокруг базового значения каждые несколько секунд. */
  function initOnlineCounter() {
    var el = document.getElementById("usersOnline");
    if (!el) return;
    var base = 13000;
    function tick() {
      var val = base + Math.floor(Math.random() * 900) + 100;
      el.textContent = val.toLocaleString("ru-RU");
    }
    tick();
    setInterval(tick, 4000);
  }

  /* ---------- 3. ТАЙМЕР ОБРАТНОГО ОТСЧЁТА ----------
     Псевдо-дедлайн акции: всегда показывает ~конец текущих суток,
     создаёт ощущение срочности (FOMO). */
  function initCountdown() {
    var el = document.getElementById("countdown");
    if (!el) return;
    function pad(x) { return String(x).padStart(2, "0"); }
    function tick() {
      var now = new Date();
      var end = new Date(now);
      end.setHours(23, 59, 59, 999); // конец суток
      var diff = Math.max(0, Math.floor((end - now) / 1000));
      var h = Math.floor(diff / 3600);
      var m = Math.floor((diff % 3600) / 60);
      var s = diff % 60;
      el.textContent = pad(h) + ":" + pad(m) + ":" + pad(s);
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- 4. "ОСТАЛОСЬ МЕСТ" (scarcity) ----------
     Медленно уменьшается, не опускается ниже минимума. */
  function initSeats() {
    var el = document.getElementById("seats");
    if (!el) return;
    var key = "glsh_seats";
    var MIN = 7;
    var seats = parseInt(localStorage.getItem(key) || "0", 10);
    if (!seats || seats < MIN) seats = 37; // стартовое значение
    el.textContent = seats;
    // каждые 25-45 сек снимаем 1 место, пока не дойдём до MIN
    function dropOne() {
      if (seats > MIN) {
        seats -= 1;
        localStorage.setItem(key, String(seats));
        el.textContent = seats;
      }
      setTimeout(dropOne, 25000 + Math.random() * 20000);
    }
    setTimeout(dropOne, 25000 + Math.random() * 20000);
  }

  /* ---------- 5. ДАТА "ОБНОВЛЕНО" ---------- */
  function initLastUpdate() {
    var el = document.getElementById("lastUpdate");
    if (!el) return;
    var d = new Date();
    el.textContent = d.toLocaleDateString("ru-RU", {
      day: "2-digit", month: "2-digit", year: "numeric"
    });
  }

  /* ---------- 6. БОКОВЫЕ СЧЁТЧИКИ (ПК) ---------- */
  function initSideCounters() {
    var sc = document.getElementById("sideCounter");
    var so = document.getElementById("sideOnline");
    if (sc) {
      var n = parseInt(localStorage.getItem("glsh_hits") || "1", 10);
      sc.textContent = String(1337420 + n).padStart(7, "0");
    }
    if (so) {
      function tick() { so.textContent = (13000 + Math.floor(Math.random() * 900) + 100).toLocaleString("ru-RU"); }
      tick();
      setInterval(tick, 4000);
    }
  }

  /* ---------- 7. ПОП-АП "ВЫ N-Й ПОСЕТИТЕЛЬ" ----------
     Показывается 1 раз за сессию через 6 секунд. */
  function initPopup() {
    var pop = document.getElementById("winPopup");
    if (!pop) return;
    var closeBtn = document.getElementById("popupClose");
    var numEl = document.getElementById("popupNum");
    if (sessionStorage.getItem("glsh_popup_shown")) return;

    function show() {
      if (numEl) {
        var n = 1000000 + Math.floor(Math.random() * 999);
        numEl.textContent = n.toLocaleString("ru-RU");
      }
      pop.style.display = "flex";
      sessionStorage.setItem("glsh_popup_shown", "1");
    }
    function hide() { pop.style.display = "none"; }

    // ждём, пока пользователь нажмёт ENTER (класс entered), затем 5 сек
    function armWhenEntered() {
      if (document.body.classList.contains("entered")) {
        setTimeout(show, 5000);
      } else {
        setTimeout(armWhenEntered, 800);
      }
    }
    armWhenEntered();
    if (closeBtn) closeBtn.addEventListener("click", hide);
    pop.addEventListener("click", function (e) { if (e.target === pop) hide(); });
  }

  /* ---------- 8. ГОСТЕВАЯ КНИГА (localStorage) ---------- */
  function initGuestbook() {
    var box = document.getElementById("gbEntries");
    if (!box) return;
    var nameI = document.getElementById("gbName");
    var msgI = document.getElementById("gbMsg");
    var btn = document.getElementById("gbSubmit");
    var KEY = "glsh_guestbook";

    // дефолтные "затравочные" записи (соц.доказательство)
    var seed = [
      { n: "Серёга_2003", m: "Прокси спас когда инет глушили на МТС! Респектище!!!", d: "13.07.2026" },
      { n: "kat_msk", m: "залетела с телефона, всё работает, спасибо!!! :)", d: "11.07.2026" },
      { n: "ВованДеревня", m: "думал развод, а реально бесплатно. вернул ютуб. ICQ мне 228337", d: "09.07.2026" },
      { n: "xXx_HaCkEr_xXx", m: "Cool site!!! заходи на мой тоже =))) Netscape rulez", d: "05.07.2026" }
    ];

    function load() {
      try { return JSON.parse(localStorage.getItem(KEY) || "null") || seed.slice(); }
      catch (e) { return seed.slice(); }
    }
    function esc(s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
      });
    }
    function render() {
      var list = load();
      box.innerHTML = "";
      list.forEach(function (e) {
        var div = document.createElement("div");
        div.className = "gb-entry";
        div.innerHTML = '<span class="gb-date">' + esc(e.d) + '</span>' +
          '<span class="gb-author">' + esc(e.n) + ':</span> ' + esc(e.m);
        box.appendChild(div);
      });
    }
    function add() {
      var n = (nameI.value || "Аноним").trim().slice(0, 20);
      var m = (msgI.value || "").trim().slice(0, 120);
      if (!m) { msgI.focus(); return; }
      var list = load();
      var today = new Date().toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
      list.unshift({ n: n, m: m, d: today });
      localStorage.setItem(KEY, JSON.stringify(list.slice(0, 50)));
      nameI.value = ""; msgI.value = "";
      render();
    }
    if (btn) btn.addEventListener("click", add);
    if (msgI) msgI.addEventListener("keydown", function (e) { if (e.key === "Enter") add(); });
    render();
  }

  /* ---------- 9. ИСКРЫ ОТ КУРСОРА (sparkle trail, только ПК) ---------- */
  function initSparkle() {
    // отключаем на тач-устройствах и при reduced-motion
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ("ontouchstart" in window) return;
    var chars = ["✦", "✧", "★", "✩", "⋆", "✬"];
    var colors = ["#ff00ff", "#00ffff", "#ffff00", "#00ff00", "#ff6600"];
    var last = 0;
    document.addEventListener("mousemove", function (e) {
      var now = Date.now();
      if (now - last < 40) return; // троттлинг
      last = now;
      var s = document.createElement("span");
      s.className = "sparkle";
      s.textContent = chars[Math.floor(Math.random() * chars.length)];
      s.style.color = colors[Math.floor(Math.random() * colors.length)];
      s.style.left = e.clientX + "px";
      s.style.top = e.clientY + "px";
      document.body.appendChild(s);
      var start = null;
      function fade(ts) {
        if (!start) start = ts;
        var p = (ts - start) / 700;
        if (p >= 1) { s.remove(); return; }
        s.style.opacity = String(1 - p);
        s.style.transform = "translateY(" + (p * 18) + "px) scale(" + (1 - p * 0.5) + ")";
        requestAnimationFrame(fade);
      }
      requestAnimationFrame(fade);
    });
  }

  /* ---------- 10. ENTER SPLASH ---------- */
  function initEnter() {
    var splash = document.getElementById("enterSplash");
    var btn = document.getElementById("enterBtn");
    if (!splash || !btn) return;
    btn.addEventListener("click", function () {
      document.body.classList.add("entered");
      // попап показываем только ПОСЛЕ входа
      sessionStorage.removeItem("glsh_popup_blocked");
    });
  }

  /* ---------- 11. ОДОМЕТР (hit counter картинкой) ---------- */
  function initOdometer() {
    var odo = document.getElementById("odometer");
    if (!odo) return;
    var n = parseInt(localStorage.getItem("glsh_hits") || "1", 10);
    var val = 1337420 + n;
    var str = String(val).slice(-6).padStart(6, "0");
    var digits = odo.querySelectorAll(".odo-digit");
    for (var i = 0; i < digits.length && i < str.length; i++) {
      digits[i].textContent = str[i];
    }
  }

  /* ---------- 12. WHAT'S NEW даты ---------- */
  function initWhatsNew() {
    function ago(days) {
      var d = new Date();
      d.setDate(d.getDate() - days);
      return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
    }
    var map = { wn1: 2, wn2: 5, wn3: 0 };
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = "[" + ago(map[id]) + "]";
    });
  }

  /* ---------- 13. ПАДАЮЩИЙ СНЕГ (toggle, по умолч. вкл) ---------- */
  var snowTimer = null;
  function startSnow() {
    var layer = document.getElementById("snowLayer");
    if (!layer) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var flakes = ["❄", "❅", "❆", "*"];
    snowTimer = setInterval(function () {
      var f = document.createElement("span");
      f.className = "snow-flake";
      f.textContent = flakes[Math.floor(Math.random() * flakes.length)];
      f.style.left = Math.random() * 100 + "%";
      f.style.fontSize = (8 + Math.random() * 14) + "px";
      f.style.opacity = String(0.4 + Math.random() * 0.6);
      var dur = 4 + Math.random() * 5;
      var drift = (Math.random() * 60 - 30);
      f.style.transition = "transform " + dur + "s linear, opacity " + dur + "s linear";
      layer.appendChild(f);
      requestAnimationFrame(function () {
        f.style.transform = "translate(" + drift + "px," + (window.innerHeight + 40) + "px) rotate(360deg)";
        f.style.opacity = "0";
      });
      setTimeout(function () { f.remove(); }, dur * 1000 + 200);
    }, 280);
  }
  function stopSnow() {
    if (snowTimer) { clearInterval(snowTimer); snowTimer = null; }
    var layer = document.getElementById("snowLayer");
    if (layer) layer.innerHTML = "";
  }
  function initSnow() {
    var btn = document.getElementById("snowBtn");
    var on = true;
    startSnow();
    if (btn) btn.addEventListener("click", function () {
      on = !on;
      if (on) { startSnow(); btn.textContent = "❄ СНЕГ: ВКЛ"; btn.classList.add("on"); }
      else { stopSnow(); btn.textContent = "❄ СНЕГ: ВЫКЛ"; btn.classList.remove("on"); }
    });
  }

  /* ---------- 14. MIDI-МУЗЫКА (Web Audio чиптюн, без autoplay) ---------- */
  function initMusic() {
    var btn = document.getElementById("musicBtn");
    if (!btn) return;
    var ctx = null, master = null, playing = false, stopTimer = null;

    var F = {
      "F2":87.31,"G2":98.0,"A2":110.0,"D2":73.42,"E2":82.41,"C3":130.81,
      "E3":164.81,"F3":174.61,"G3":196.0,"A3":220.0,"B3":246.94,
      "C4":261.63,"D4":293.66,"E4":329.63,"F4":349.23,"G4":392.0,
      "A4":440.0,"B4":493.88,"C5":523.25,"D5":587.33,"E5":659.25
    };

    // ===== ВОКАЛЬНАЯ МЕЛОДИЯ (d = доли: 1=четверть, 0.5=восьмая) =====
    var verseMelody = [
      // Вместо тепла зелень стекла
      {n:"E4",d:1},{n:"E4",d:1},{n:"E4",d:1},{n:"E4",d:0.5},{n:"D4",d:0.5},{n:"C4",d:0.5},{n:"D4",d:1.5},{n:"E4",d:2},
      // Вместо огня дым
      {n:"E4",d:1},{n:"E4",d:1},{n:"D4",d:0.5},{n:"C4",d:0.5},{n:"D4",d:1},{n:"B3",d:4},
      // Из сетки календаря выхвачен день
      {n:"C4",d:1},{n:"C4",d:1},{n:"C4",d:1},{n:"C4",d:0.5},{n:"B3",d:0.5},{n:"A3",d:0.5},{n:"B3",d:1.5},{n:"C4",d:2},
      // Красное солнце сгорает дотла
      {n:"C4",d:1},{n:"C4",d:1},{n:"C4",d:1},{n:"C4",d:0.5},{n:"B3",d:0.5},{n:"A3",d:0.5},{n:"B3",d:1.5},{n:"C4",d:2},
      // День догорает с ним
      {n:"C4",d:1},{n:"C4",d:1},{n:"B3",d:0.5},{n:"A3",d:0.5},{n:"B3",d:1},{n:"G3",d:4},
      // На пылающий город падает тень
      {n:"A3",d:1},{n:"A3",d:1},{n:"A3",d:1},{n:"A3",d:0.5},{n:"G3",d:0.5},{n:"F3",d:0.5},{n:"G3",d:1.5},{n:"A3",d:2},
      {n:null,d:8}
    ];
    var chorusMelody = [
      {n:"E5",d:1},{n:"E5",d:1},{n:"E5",d:2}, // Перемен!
      {n:"A4",d:0.5},{n:"B4",d:0.5},{n:"C5",d:0.5},{n:"C5",d:0.5},{n:"C5",d:0.5},{n:"B4",d:0.5},{n:"A4",d:1},{n:null,d:2}, // требуют наши сердца
      {n:"E5",d:1},{n:"E5",d:1},{n:"E5",d:2},
      {n:"A4",d:0.5},{n:"B4",d:0.5},{n:"C5",d:0.5},{n:"C5",d:0.5},{n:"C5",d:0.5},{n:"B4",d:0.5},{n:"A4",d:1},{n:null,d:2}, // требуют наши глаза
      {n:"A4",d:0.5},{n:"A4",d:0.5},{n:"A4",d:0.5},{n:"G4",d:0.5},{n:"F4",d:0.5},{n:"G4",d:0.5},{n:"A4",d:1}, // В нашем смехе и в наших слезах
      {n:"C5",d:1},{n:"C5",d:0.5},{n:"C5",d:0.5},{n:"B4",d:0.5},{n:"A4",d:0.5},{n:"B4",d:1},{n:null,d:2}, // И в пульсации вен
      {n:"E5",d:1},{n:"E5",d:1},{n:"E5",d:2}, // Перемен!
      {n:"C5",d:1},{n:"B4",d:1},{n:"A4",d:2},{n:null,d:4} // Мы ждём перемен!
    ];
    var introMelody = [{n:null,d:32}];

    function genBass(note, beats){ var r=[]; for(var i=0;i<beats*2;i++) r.push({n:note,d:0.5}); return r; }
    var verseBass = [].concat(
      genBass("A2",8),genBass("G2",8),genBass("D2",8),genBass("A2",8),
      genBass("A2",8),genBass("G2",8),genBass("D2",8),genBass("A2",8));
    var chorusBass = [].concat(
      genBass("F2",4),genBass("G2",4),genBass("A2",8),
      genBass("F2",4),genBass("G2",4),genBass("A2",8),
      genBass("F2",4),genBass("G2",4),genBass("A2",8),
      genBass("F2",4),genBass("G2",4),genBass("A2",8));
    var introBass = [].concat(
      genBass("F2",4),genBass("G2",4),genBass("A2",8),
      genBass("F2",4),genBass("G2",4),genBass("A2",8));

    var fullMelody = [].concat(introMelody, verseMelody, chorusMelody, verseMelody, chorusMelody);
    var fullBass   = [].concat(introBass,   verseBass,   chorusBass,   verseBass,   chorusBass);

    function noiseBuf(){
      var len=ctx.sampleRate*0.15, b=ctx.createBuffer(1,len,ctx.sampleRate), d=b.getChannelData(0);
      for(var i=0;i<len;i++) d[i]=Math.random()*2-1; return b;
    }
    function playTone(freq,type,time,dur,vol){
      if(!freq) return;
      var o=ctx.createOscillator(), g=ctx.createGain();
      o.type=type; o.frequency.value=freq;
      g.gain.setValueAtTime(0,time);
      g.gain.linearRampToValueAtTime(vol,time+0.02);
      g.gain.setValueAtTime(vol*0.8,time+dur-0.05>time?time+dur-0.05:time);
      g.gain.linearRampToValueAtTime(0,time+dur);
      o.connect(g); g.connect(master); o.start(time); o.stop(time+dur);
    }
    function kick(time){
      var o=ctx.createOscillator(), g=ctx.createGain();
      o.type="sine"; o.frequency.setValueAtTime(150,time);
      o.frequency.exponentialRampToValueAtTime(45,time+0.12);
      g.gain.setValueAtTime(0.55,time); g.gain.exponentialRampToValueAtTime(0.0001,time+0.18);
      o.connect(g); g.connect(master); o.start(time); o.stop(time+0.2);
    }
    function snare(time){
      var s=ctx.createBufferSource(); s.buffer=noiseBuf();
      var f=ctx.createBiquadFilter(); f.type="highpass"; f.frequency.value=1800;
      var g=ctx.createGain(); g.gain.setValueAtTime(0.35,time);
      g.gain.exponentialRampToValueAtTime(0.0001,time+0.12);
      s.connect(f); f.connect(g); g.connect(master); s.start(time); s.stop(time+0.13);
    }

    function schedule() {
      var bpm = 132, beat = 60/bpm;
      var t0 = ctx.currentTime + 0.3;
      // мелодия (square, staccato)
      var mt = t0, total = 0;
      fullMelody.forEach(function(nt){
        var dur = nt.d*beat;
        if(nt.n){ playTone(F[nt.n],"square",mt,dur*0.85,0.18); playTone(F[nt.n]*2,"square",mt,dur*0.85,0.04); }
        mt += dur; total += dur;
      });
      // бас (sawtooth + sub)
      var bt = t0;
      fullBass.forEach(function(nt){
        var dur = nt.d*beat;
        if(nt.n){ playTone(F[nt.n],"sawtooth",bt,dur*0.95,0.14); playTone(F[nt.n]/2,"sine",bt,dur*0.95,0.12); }
        bt += dur;
      });
      // ударные: kick на 1 и 3, snare на 2 и 4, по всей длине трека
      var dt = t0, four = beat; // четверть
      for(var b=0; t0 + b*four < t0 + total; b++){
        var time = t0 + b*four;
        if(b % 2 === 0) kick(time); else snare(time);
      }
      return total;
    }

    function play(){
      ctx = ctx || new (window.AudioContext||window.webkitAudioContext)();
      if(ctx.state==="suspended") ctx.resume();
      if(!master){
        var comp=ctx.createDynamicsCompressor();
        master=ctx.createGain(); master.gain.value=0.55;
        master.connect(comp); comp.connect(ctx.destination);
      }
      playing=true;
      btn.textContent="🔊 ХОЧУ ПЕРЕМЕН: ВКЛ"; btn.classList.add("on");
      function loop(){
        if(!playing) return;
        var dur = schedule();
        stopTimer = setTimeout(loop, dur*1000); // зацикливаем по окончании трека
      }
      loop();
    }
    function stop(){
      playing=false;
      if(stopTimer) clearTimeout(stopTimer);
      if(ctx){ try{ ctx.close(); }catch(e){} ctx=null; master=null; }
      btn.textContent="🔊 ХОЧУ ПЕРЕМЕН: ВЫКЛ"; btn.classList.remove("on");
    }
    btn.addEventListener("click", function(){ playing ? stop() : play(); });
  }

  /* ---------- 15. ГОСТЕВАЯ Sign/View табы ---------- */
  function initGbTabs() {
    var sign = document.getElementById("gbTabSign");
    var view = document.getElementById("gbTabView");
    var form = document.getElementById("gbForm");
    var entries = document.getElementById("gbEntries");
    if (!sign || !view || !form || !entries) return;
    function show(mode) {
      if (mode === "sign") {
        form.style.display = ""; entries.style.display = "";
        sign.classList.add("gb-tab-active"); view.classList.remove("gb-tab-active");
      } else {
        form.style.display = "none"; entries.style.display = "";
        view.classList.add("gb-tab-active"); sign.classList.remove("gb-tab-active");
      }
    }
    sign.addEventListener("click", function () { show("sign"); });
    view.addEventListener("click", function () { show("view"); });
  }

  /* ---------- 16. ICQ-ШУТКА "ПРОСНИСЬ 2026" ---------- */
  function initIcqJoke() {
    var link = document.getElementById("icqLink");
    var pop = document.getElementById("icqPopup");
    var close = document.getElementById("icqClose");
    if (!link || !pop) return;
    function hide() { pop.style.display = "none"; }
    link.addEventListener("click", function (e) {
      e.preventDefault();
      pop.style.display = "flex";
    });
    if (close) close.addEventListener("click", hide);
    pop.addEventListener("click", function (e) { if (e.target === pop) hide(); });
  }

  /* ---------- ИНИЦИАЛИЗАЦИЯ ---------- */
  function init() {
    initEnter();
    initIcqJoke();
    initHitCounter();
    initOdometer();
    initOnlineCounter();
    initCountdown();
    initSeats();
    initLastUpdate();
    initWhatsNew();
    initSideCounters();
    initPopup();
    initGuestbook();
    initGbTabs();
    initSparkle();
    initSnow();
    initMusic();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
