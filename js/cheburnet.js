/* ЧЕБУРНЕТ — движок проверки доступности интернет-ресурсов.
   Логика проверки воспроизводит метод dpi.rip дословно (все пробы клиентские):
     tl  — базовая проба: fetch("https://"+домен, {mode:"no-cors"}), таймаут 10 с;
     ti  — обычные домены: 3 попытки tl + запасная проба /cdn-cgi/trace;
     tp  — провайдеры (DPI-детект): HEAD проходит, но крупный POST обрывается -> "dpi";
     th  — гео-блок: /cdn-cgi/trace домена даёт страну; если в blockedIn -> "geo-blocked";
     t1  — IP/провайдер/страна через api.ipapi.is;
     t4  — несколько источников IP для детекта split tunneling.
   Иконки сервисов: icons.duckduckgo.com/ip3/<домен>.ico.
   Флаги стран: cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/<код>.svg. */

(function () {
	"use strict";

	var METRIKA_ID = 109844968;
	var TS = { mode: "no-cors", credentials: "omit", cache: "no-store" };

	function reachGoal(n) { try { if (typeof window.ym === "function") { window.ym(METRIKA_ID, "reachGoal", n); } } catch (e) {} }
	function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
	function urlOf(d, p) { return "https://" + d + (p || "/") + "?t=" + Math.random(); }

	/* ---- дословные пробы dpi.rip ----------------------------------------- */

	/* tl: базовая проба доступности */
	async function tl(e) {
		var t = new AbortController();
		var a = setTimeout(function () { t.abort(); }, 10000);
		try { await fetch("https://" + e, { mode: "no-cors", signal: t.signal }); return true; }
		catch (x) { return false; }
		finally { clearTimeout(a); }
	}

	/* ti: обычный домен — 3 попытки + запасные пробы /cdn-cgi/trace и HEAD.
	   HEAD-fallback — наше дополнение: ловит хосты, отвечающие на HEAD, но
	   капризничающие на GET no-cors (например, из-за редиректов), что иначе
	   давало бы ложное "недоступен". */
	async function ti(e) {
		var t = Date.now();
		for (var a = 1; a <= 3; a++) {
			if (await tl(e)) { return { domain: e, status: "ok", elapsed: Date.now() - t, attempts: a }; }
			if (a <= 2) { await wait(1500); }
		}
		if (await tl(e + "/cdn-cgi/trace")) { return { domain: e, status: "ok", elapsed: Date.now() - t, attempts: 4 }; }
		if (await tc(e)) { return { domain: e, status: "ok", elapsed: Date.now() - t, attempts: 5 }; }
		return { domain: e, status: "blocked", elapsed: Date.now() - t, attempts: 5 };
	}

	/* tc: HEAD-проба (для провайдеров) */
	async function tc(e) {
		var t = new AbortController();
		var a = setTimeout(function () { t.abort(); }, 5000);
		try { await fetch(urlOf(e), { method: "HEAD", mode: TS.mode, credentials: TS.credentials, cache: TS.cache, signal: t.signal }); return true; }
		catch (x) { return false; }
		finally { clearTimeout(a); }
	}

	/* tu: крупный POST 64 КБ -> "timeout" если оборвано */
	async function tu(e) {
		var t = new AbortController();
		var a = setTimeout(function () { t.abort(); }, 12000);
		try {
			var b = new Uint8Array(65536);
			crypto.getRandomValues(b);
			await fetch(urlOf(e), { method: "POST", mode: TS.mode, credentials: TS.credentials, cache: TS.cache, signal: t.signal, body: b });
			return "ok";
		} catch (x) { return (x && x.name === "AbortError") ? "timeout" : "error"; }
		finally { clearTimeout(a); }
	}

	/* td: 9 HEAD с большой строкой запроса -> "timeout" если оборвано */
	async function td(e) {
		for (var i = 0; i < 9; i++) {
			var t = new AbortController();
			var a = setTimeout(function () { t.abort(); }, 8000);
			try {
				var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
				var arr = new Uint8Array(7168);
				crypto.getRandomValues(arr);
				var s = Array.prototype.map.call(arr, function (n) { return chars[n % chars.length]; }).join("");
				await fetch("https://" + e + "/?x=" + s + "&t=" + Math.random(), { method: "HEAD", mode: TS.mode, credentials: TS.credentials, cache: TS.cache, signal: t.signal });
			} catch (x) {
				clearTimeout(a);
				return (x && x.name === "AbortError") ? "timeout" : "error";
			}
			clearTimeout(a);
		}
		return "ok";
	}

	/* tp: провайдер/хостинг — детект DPI */
	async function tp(e) {
		var t = Date.now();
		if (await tc(e)) {
			if ((await tu(e)) === "timeout") { return { domain: e, status: "dpi", elapsed: Date.now() - t, attempts: 1 }; }
			if ((await td(e)) === "timeout") { return { domain: e, status: "suspicious", elapsed: Date.now() - t, attempts: 1 }; }
			return { domain: e, status: "ok", elapsed: Date.now() - t, attempts: 1 };
		}
		return { domain: e, status: "blocked", elapsed: Date.now() - t, attempts: 1 };
	}

	/* tm: trace домена -> {ip, loc, colo, warp} | null */
	async function tm(e) {
		var t = new AbortController();
		var a = setTimeout(function () { t.abort(); }, 8000);
		try {
			var r = await fetch("https://" + e + "/cdn-cgi/trace", { signal: t.signal, cache: "no-store" });
			if (!r.ok) { return null; }
			var txt = await r.text();
			var o = {};
			txt.split("\n").forEach(function (line) {
				var p = line.split("=");
				if (p.length === 2) { o[p[0].trim()] = p[1].trim(); }
			});
			return o.ip ? o : null;
		} catch (x) { return null; }
		finally { clearTimeout(a); }
	}

	/* th: гео-блок */
	async function th(e, list) {
		list = list || [];
		var a = Date.now();
		for (var r = 1; r <= 3; r++) {
			var n = await tm(e);
			if (n) {
				var loc = (n.loc || "").toUpperCase();
				var geo = list.length > 0 && loc && list.indexOf(loc) !== -1;
				return { domain: e, status: geo ? "geo-blocked" : "ok", elapsed: Date.now() - a, attempts: r, traceLoc: loc, traceColo: n.colo, traceWarp: n.warp };
			}
			if (r <= 2) { await wait(1500); }
		}
		return { domain: e, status: "blocked", elapsed: Date.now() - a, attempts: 3 };
	}

	/* ---- определение подключения ----------------------------------------- */

	/* t1: основной источник IP/провайдера/страны */
	async function t1() {
		var r = await fetch("https://api.ipapi.is/", { cache: "no-store" });
		var t = await r.json();
		return {
			ip: t.ip,
			asn: (t.asn && t.asn.asn) || 0,
			holder: (t.company && t.company.name) || (t.asn && t.asn.org) || "",
			domain: (t.company && t.company.domain) || (t.asn && t.asn.domain) || "",
			country: (t.location && t.location.country_code) || "",
			city: (t.location && t.location.city) || ""
		};
	}

	function parseIp(text) { var m = text.match(/^ip=(.+)$/m); return m ? m[1].trim() : null; }

	/* пул ограниченной конкурентности: tasks — массив функций, возвращающих Promise */
	function runPool(tasks, limit) {
		return new Promise(function (resolve) {
			var i = 0, active = 0, finished = 0, total = tasks.length;
			if (!total) { resolve(); return; }
			function next() {
				while (active < limit && i < total) {
					var task = tasks[i++];
					active++;
					Promise.resolve().then(task).catch(function () {}).then(function () {
						active--; finished++;
						if (finished === total) { resolve(); } else { next(); }
					});
				}
			}
			next();
		});
	}

	async function t8(url, parse, label) {
		try { var r = await fetch(url, { cache: "no-store" }); var ip = parse(await r.text()); return ip ? { label: label, ip: ip } : null; }
		catch (e) { return null; }
	}

	/* t4: набор IP из разных источников (детект split tunneling) */
	async function t4() {
		var res = await Promise.allSettled([
			t8("https://1.1.1.1/cdn-cgi/trace", parseIp, "Cloudflare"),
			t8("https://checkip.amazonaws.com", function (e) { return e.trim() || null; }, "AWS"),
			t8("https://chatgpt.com/cdn-cgi/trace", parseIp, "ChatGPT")
		]);
		return res.filter(function (x) { return x.status === "fulfilled" && x.value !== null; }).map(function (x) { return x.value; });
	}

	/* ---- визуальные помощники -------------------------------------------- */

	function favicon(domain) {
		var d = domain.split("/")[0];
		return "https://icons.duckduckgo.com/ip3/" + d + ".ico";
	}
	function flagUrl(cc) {
		return "https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/" + cc.toLowerCase() + ".svg";
	}
	function el(tag, cls, html) { var e = document.createElement(tag); if (cls) { e.className = cls; } if (html != null) { e.innerHTML = html; } return e; }
	function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

	function statusInfo(s) {
		switch (s) {
			case "ok": return ["st-ok", "доступен"];
			case "blocked": return ["st-block", "недоступен"];
			case "dpi": return ["st-dpi", "DPI"];
			case "suspicious": return ["st-slow", "подозрительно"];
			case "geo-blocked": return ["st-geo", "гео-блок"];
			case "checking": return ["st-wait", "проверка\u2026"];
			default: return ["st-idle", "ожидание"];
		}
	}

	/* ---- рендер таблиц ---------------------------------------------------- */

	var CFG = window.SITES_CONFIG || [];

	function buildTables() {
		var host = document.getElementById("categories");
		host.innerHTML = "";
		var cellMap = {};
		CFG.forEach(function (cat) {
			var block = el("div", "cat");
			block.appendChild(el("h3", null, esc(cat.ru) + " <span class=\"small\">(" + cat.sites.length + ")</span>"));
			var tbl = el("table", "check");
			cat.sites.forEach(function (s) {
				var tr = el("tr");
				var st = statusInfo("idle");
				var flag = s.flag ? "<img class=\"flag\" src=\"" + flagUrl(s.flag) + "\" alt=\"\" loading=\"lazy\"> " : "";
				tr.innerHTML =
					"<td class=\"svc-name\"><img class=\"favi\" src=\"" + favicon(s.d) + "\" alt=\"\" loading=\"lazy\" onerror=\"this.style.visibility='hidden'\"> " + flag + esc(s.name) + "</td>" +
					"<td class=\"svc-cat\">" + esc(s.d) + "</td>" +
					"<td class=\"status " + st[0] + "\">" + st[1] + "</td>";
				tbl.appendChild(tr);
				cellMap[cat.id + "|" + s.d] = tr.querySelector(".status");
			});
			block.appendChild(tbl);
			host.appendChild(block);
		});
		return cellMap;
	}

	function setCell(cell, status) {
		if (!cell) { return; }
		var st = statusInfo(status);
		cell.className = "status " + st[0];
		cell.textContent = st[1];
	}

	/* ---- запуск ----------------------------------------------------------- */

	async function run() {
		var btn = document.getElementById("runBtn");
		if (btn) { btn.disabled = true; btn.textContent = "Идёт проверка\u2026"; }
		reachGoal("test_run");

		var connHint = document.getElementById("connHint");
		var summaryHint = document.getElementById("summaryHint");
		if (connHint) { connHint.style.display = "none"; }
		if (summaryHint) { summaryHint.style.display = "none"; }

		/* подключение */
		var connEl = document.getElementById("conn");
		if (connEl) { connEl.style.display = "block"; connEl.innerHTML = "Определение подключения\u2026"; }
		var info = null, ipset = [];
		try { info = await t1(); } catch (e) {}
		try { ipset = await t4(); } catch (e) {}
		if (connEl) {
			var split = "";
			if (info && ipset.length) {
				var diff = ipset.filter(function (x) { return x.ip !== info.ip; });
				if (diff.length) { split = "<tr><th>Раздельный туннель</th><td>обнаружены разные IP: " +
					ipset.map(function (x) { return esc(x.label) + "=" + esc(x.ip); }).join(", ") + "</td></tr>"; }
			}
			if (info) {
				var prov = (info.domain ? "<img class=\"favi\" src=\"" + favicon(info.domain) + "\" alt=\"\" onerror=\"this.style.visibility='hidden'\"> " : "") + esc(info.holder || "—") + (info.asn ? " (AS" + info.asn + ")" : "");
				var ctry = info.country ? "<img class=\"flag\" src=\"" + flagUrl(info.country) + "\" alt=\"\"> " + esc(info.country) + (info.city ? " (" + esc(info.city) + ")" : "") : "—";
				connEl.innerHTML = "<table class=\"data\">" +
					"<tr><th style=\"width:34%;\">IP-адрес</th><td>" + esc(info.ip || "—") + "</td></tr>" +
					"<tr><th>Провайдер</th><td>" + prov + "</td></tr>" +
					"<tr><th>Страна</th><td>" + ctry + "</td></tr>" +
					split + "</table>";
			} else {
				connEl.innerHTML = "<span class=\"small\">Не удалось определить подключение (возможно, заблокирован api.ipapi.is).</span>";
			}
		}

		/* таблицы */
		var cellMap = buildTables();
		var counters = { ok: 0, blocked: 0, dpi: 0, geo: 0, total: 0 };

		var keys = [];
		CFG.forEach(function (cat) {
			cat.sites.forEach(function (s) {
				var key = cat.id + "|" + s.d;
				keys.push(key);
				setCell(cellMap[key], "checking");
			});
		});

		var summaryEl = document.getElementById("summary");
		if (summaryEl) { summaryEl.style.display = "block"; }
		var done = 0;
		counters.total = keys.length;

		function tally(status) {
			if (status === "ok") { counters.ok++; }
			else if (status === "dpi") { counters.dpi++; }
			else if (status === "geo-blocked") { counters.geo++; }
			else { counters.blocked++; }
		}
		function pct(n) { return counters.total ? Math.round(n / counters.total * 100) : 0; }
		function renderSummary() {
			if (!summaryEl) { return; }
			summaryEl.innerHTML =
				"<table class=\"sumtbl\"><tr>" +
				"<td class=\"sc ok\"><b>" + counters.ok + "</b><span>доступно</span><i>" + pct(counters.ok) + "%</i></td>" +
				"<td class=\"sc block\"><b>" + counters.blocked + "</b><span>недоступно</span><i>" + pct(counters.blocked) + "%</i></td>" +
				"<td class=\"sc dpi\"><b>" + counters.dpi + "</b><span>DPI</span><i>" + pct(counters.dpi) + "%</i></td>" +
				"<td class=\"sc geo\"><b>" + counters.geo + "</b><span>гео-блок</span><i>" + pct(counters.geo) + "%</i></td>" +
				"</tr></table>" +
				"<p class=\"small\">Проверено: <b>" + done + " / " + counters.total + "</b></p>";
		}
		renderSummary();

		/* Список задач. Пробы dpi.rip сохранены дословно, но выполняются через пул
		   ограниченной конкурентности: запуск всех 221 сразу (особенно тяжёлых
		   DPI-проб с POST 64 КБ) перегружает сеть и даёт ложные таймауты. */
		var tasks = [];
		CFG.forEach(function (cat) {
			cat.sites.forEach(function (s) {
				var key = cat.id + "|" + s.d;
				tasks.push(function () {
					var p = (cat.id === "providers") ? tp(s.d)
						: (cat.id === "geoblock") ? th(s.d, s.blockedIn)
						: ti(s.d);
					return p.then(function (res) {
						setCell(cellMap[key], res.status);
						tally(res.status);
						done++; renderSummary();
					}).catch(function () {
						setCell(cellMap[key], "blocked");
						counters.blocked++; done++; renderSummary();
					});
				});
			});
		});

		await runPool(tasks, 10);

		if (btn) { btn.disabled = false; btn.textContent = "Запустить проверку заново"; }

		var verdict = document.getElementById("verdict");
		if (verdict) {
			verdict.style.display = "block";
			var restricted = counters.blocked + counters.dpi + counters.geo;
			if (restricted === 0) {
				verdict.className = "verdict good";
				verdict.innerHTML = "<span class=\"verdict-title\">★ ТЫ ЕЩЁ НЕ В ЧЕБУРНЕТЕ! ★</span><br>" +
					"Из твоей сети доступны все проверенные ресурсы. Но это может измениться в любой момент — " +
					"сохрани сайт и держи прокси/VPN наготове.";
				reachGoal("proverka_clean");
			} else {
				verdict.className = "verdict bad";
				verdict.innerHTML = "<span class=\"verdict-title\">⚠ ТЫ УЖЕ В ЧЕБУРНЕТЕ! ⚠</span><br>" +
					"Недоступно: <b>" + counters.blocked + "</b> &nbsp; признаки DPI: <b>" + counters.dpi +
					"</b> &nbsp; гео-блок: <b>" + counters.geo + "</b>.<br>" +
					"Хочешь выбраться из Чебурнета? Включи прокси (бесплатно) или VPN — см. ниже 👇";
				reachGoal("proverka_blocked");
			}
		}
	}

	document.addEventListener("DOMContentLoaded", function () {
		var btn = document.getElementById("runBtn");
		if (btn) { btn.addEventListener("click", function () { run(); }); }
		if (location.hash === "#autorun") { run(); }
	});
})();
