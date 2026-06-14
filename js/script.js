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
    var audio = document.getElementById("bgAudio");
    if (!btn || !audio) return;
    audio.volume = 0.55;
    audio.loop = true;
    btn.addEventListener("click", function () {
      if (audio.paused) {
        var p = audio.play();
        if (p && p.catch) p.catch(function(){});
        btn.textContent = "🔊 ХОЧУ ПЕРЕМЕН: ВКЛ"; btn.classList.add("on");
      } else {
        audio.pause();
        btn.textContent = "🔊 ХОЧУ ПЕРЕМЕН: ВЫКЛ"; btn.classList.remove("on");
      }
    });
    // если трек кончился (на случай если loop не сработал) — перезапускаем
    audio.addEventListener("ended", function () {
      if (btn.classList.contains("on")) { audio.currentTime = 0; audio.play().catch(function(){}); }
    });
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
