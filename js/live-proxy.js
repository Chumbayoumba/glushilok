/* Живые прокси: https://vnespiska.win/api/proxies-ru.json — только те, что подключились
 * с российского сервера за последние 20 минут. В HTML лежит запасной адрес на случай,
 * если API не ответит; скрипт меняет его на свежий.
 *   a[data-live-proxy="N"]      — href = N-й прокси (tg://)
 *   [data-live-field="server"]  — server / port / secret / meta / updated
 *   [data-live-list]            — список запасных прокси (со 2-го)
 */
(function () {
  var API = 'https://vnespiska.win/api/proxies-ru.json';
  window.YM_ID = window.YM_ID || 109844968;
  function each(sel, fn) { var n = document.querySelectorAll(sel); for (var i = 0; i < n.length; i++) fn(n[i]); }
  function apply(d) {
    var list = (d && d.proxies) || [];
    if (!list.length) return;
    var top = list[0];
    each('a[data-live-proxy]', function (a) {
      var p = list[parseInt(a.getAttribute('data-live-proxy'), 10) || 0] || top;
      a.href = p.tg;
    });
    each('[data-live-field]', function (el) {
      var f = el.getAttribute('data-live-field');
      if (f === 'server') el.textContent = top.server;
      else if (f === 'port') el.textContent = top.port;
      else if (f === 'secret') el.textContent = top.secret;
      else if (f === 'updated') el.textContent = d.updated_msk || '';
      else if (f === 'meta') el.textContent = top.server + ':' + top.port + ' · MTProto · проверен из России ' + (d.updated_msk ? d.updated_msk.split(' ')[1] + ' МСК' : 'сейчас');
    });
    each('[data-live-list]', function (box) {
      var html = '';
      for (var i = 1; i < list.length && i < 6; i++) {
        var p = list[i];
        html += '<a class="btn8831 live-proxy-alt" href="' + p.tg + '" rel="nofollow">⚡ ПРОКСИ #' + (i + 1) +
          (p.rtt_ms ? ' · ' + p.rtt_ms + ' мс' : '') + '</a> ';
      }
      if (html) { box.innerHTML = html; box.style.display = ''; }
    });
  }
  // Цели Метрики: переход в канал и подключение живого прокси.
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || typeof window.ym !== 'function' || !window.YM_ID) return;
    var h = a.getAttribute('href') || '';
    try {
      if (/^https:\/\/t\.me\/(\+|vnespiska\b(?!bot))/.test(h)) window.ym(window.YM_ID, 'reachGoal', 'channel_click');
      else if (a.hasAttribute('data-live-proxy') || /live-proxy-alt/.test(a.className)) window.ym(window.YM_ID, 'reachGoal', 'live_proxy_click');
    } catch (err) {}
  }, true);
  try {
    fetch(API, { cache: 'no-store' }).then(function (r) { return r.json(); }).then(apply)['catch'](function () {});
  } catch (e) {}
})();
