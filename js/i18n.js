/* What about coffee? · Sprachen (nach dem Muster von Projekt 91 The Meat Company)
   Deutsch steht im HTML. Für EN, TR, AR, RU tauscht dieses Skript vor main.js alle Texte
   (data-i18n = Inhalt, data-i18n-a = "attr:schluessel;attr:schluessel") aus js/i18n-data.js.
   Die Sprache setzt das Skript im <head> (?lang= vor gespeicherter Wahl, sonst Deutsch).
   Ein Wechsel lädt die Seite neu, damit alle Animationen mit dem neuen Text messen. */
(function () {
  "use strict";

  var doc = document.documentElement;
  var lang = doc.lang || "de";
  var all = window.WAC_I18N || {}, de = all.de || {}, dict = all[lang] || {};
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  window.WAC_LANG = lang;
  window.WAC_t = function (key, vars) {
    var s = dict[key] != null ? dict[key] : (de[key] != null ? de[key] : key);
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split("{" + k + "}").join(vars[k]); });
    return s;
  };

  /* Texte der Speisekarte: ganzer Text, sonst Zutatenliste Teil für Teil (wie in tools/build_i18n.py) */
  var one = function (s) { var v = dict["k:" + s]; return v != null ? v : s; };
  window.WAC_k = function (s) {
    if (!s || lang === "de") return s;
    if (dict["k:" + s] != null) return dict["k:" + s];
    if (s.indexOf(", ") < 0 || /[.!?]$/.test(s)) return s;
    var out = s.split(", ").map(one).join(lang === "ar" ? "، " : ", ");
    if (lang !== "ar" && s.charAt(0) === s.charAt(0).toUpperCase()) out = out.charAt(0).toLocaleUpperCase(lang) + out.slice(1);
    return out;
  };

  if (lang !== "de" && all[lang]) {
    $$("[data-i18n]").forEach(function (el) {
      var v = dict[el.getAttribute("data-i18n")];
      if (v == null) return;
      if (v.indexOf("{p") > -1) {
        var pills = el.querySelectorAll(".pill");
        v = v.replace(/\{p(\d)\}/g, function (m, n) { var p = pills[n - 1]; return p ? p.outerHTML : ""; });
      }
      el.innerHTML = v;
    });
    $$("[data-i18n-a]").forEach(function (el) {
      el.getAttribute("data-i18n-a").split(";").forEach(function (pair) {
        var i = pair.indexOf(":"), attr = pair.slice(0, i).trim(), v = dict[pair.slice(i + 1).trim()];
        if (v != null) el.setAttribute(attr, v);
      });
    });
  }

  /* Türkisch schreibt groß mit İ. Unübersetzte englische Namen (Flat White, Iced Latte) sollen
     als ICED erscheinen, nicht als İCED. */
  if (lang === "tr") {
    $$("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (dict[k] != null && dict[k] === de[k]) el.setAttribute("lang", "en");
    });
    $$(".panel__list li:not([data-i18n])").forEach(function (li) { if (!li.querySelector("[data-i18n]")) li.setAttribute("lang", "en"); });
  }

  /* Umschalter: Menü oben in der Navigation und Reihe im Handy Menü */
  $$("[data-lang-current]").forEach(function (el) { el.textContent = lang.toUpperCase(); });
  $$("[data-lang]").forEach(function (a) {
    var l = a.getAttribute("data-lang");
    if (l === lang) a.setAttribute("aria-current", "true");
    a.addEventListener("click", function (e) {
      e.preventDefault();
      if (l === lang) return close();
      try { localStorage.setItem("wac-lang", l); } catch (err) { /* privat */ }
      try { sessionStorage.setItem("wac-scroll", String(window.pageYOffset)); } catch (err) { /* privat */ }
      location.href = location.pathname + "?lang=" + l;
    });
  });

  /* Speisekarte als PDF in der gewählten Sprache */
  var L = lang.toUpperCase();
  $$("[data-dl]").forEach(function (a) { a.href = "assets/menu/What-about-coffee-Karte-" + L + ".pdf"; });
  $$("[data-dl-cover]").forEach(function (img) { img.src = "assets/menu/cover-" + lang + ".webp"; });
  $$("[data-dl-lang]").forEach(function (a) { if (a.getAttribute("data-dl-lang") === lang) a.setAttribute("aria-current", "true"); });

  var box = document.querySelector(".lang"), btn = box && box.querySelector(".lang__toggle");
  function close() {
    if (!box) return;
    box.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
  }
  if (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = !box.classList.contains("is-open");
      box.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function (e) { if (!box.contains(e.target)) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  doc.classList.remove("i18n-wait");
})();
