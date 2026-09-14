/* ============================================================
   新北市召會 三重會所 — 共用的標題帶 / 選單 / 頁尾
   ------------------------------------------------------------
   ★ 要改「網站名稱、標題帶經文、選單項目、頁尾聯絡資訊」，
     只要改下面的 SITE 與 NAV 兩個設定就好，全站會一起更新。
   ★ 每一頁的 <body data-page="..."> 要對應 NAV 裡的 id，
     選單才會把目前頁面標成紅色。
   ============================================================ */

(function () {
  "use strict";

  /* ---------- 1) 網站基本資料 ------------------------------ */
  var SITE = {
    org:  "新北市召會",
    hall: "三重會所",

    // 標題帶右側經文
    verse:    "在祂裏面，你們也同被建造，成為神在靈裏的居所。",
    verseRef: "以弗所書 2章22節",

    // 頁尾聯絡資訊
    // ★ phone 與 email 填空字串時，頁尾會自動不顯示該行；有資料時填回去即可
    address: "新北市三重區大同北路36號",
    phone:   "",
    email:   ""
  };

  /* ---------- 2) 選單結構 ---------------------------------- */
  /* 參照淡水會所：首頁 / 召會簡介 / 真理追求 / 代禱事項 / 聚會時間 / 聯絡我們 */
  var NAV = [
    { id: "home", label: "首頁", href: "index.html", children: [
        { id: "faith",     label: "我們的信仰", href: "faith.html" },
        { id: "practice",  label: "我們的實行", href: "practice.html" },
        { id: "testimony", label: "蒙恩交通",   href: "testimony.html" }
    ]},
    { id: "about", label: "召會簡介", href: "about.html", children: [
        { id: "church-life", label: "召會生活", href: "church-life.html" }
    ]},
    { id: "truth", label: "真理追求", href: "truth.html", children: [
        { id: "morning-revival", label: "晨興聖言", href: "morning-revival.html" }
    ]},
    { id: "prayer",   label: "代禱事項", href: "prayer.html" },
    { id: "meetings", label: "聚會時間", href: "meetings.html" },
    { id: "contact",  label: "聯絡我們", href: "contact.html" }
  ];

  /* ---------- 3) 以下為產生畫面的程式，一般不需更動 -------- */

  var current = document.body.getAttribute("data-page") || "home";

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "text") n.textContent = attrs[k];
      else if (k === "html") n.innerHTML = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }

  /* 這個項目（或它的子項目）是不是目前頁面？ */
  function isCurrent(item) {
    if (item.id === current) return true;
    return (item.children || []).some(function (c) { return c.id === current; });
  }

  /* ---- 標題帶 ---- */
  function buildBanner() {
    var logo = el("a", { class: "banner__logo", href: "index.html",
                         "aria-label": SITE.org + SITE.hall + "首頁" }, [
      el("span", { class: "banner__org",  text: SITE.org }),
      el("span", { class: "banner__hall", text: SITE.hall })
    ]);

    var verse = el("p", { class: "banner__verse" }, [
      document.createTextNode(SITE.verse + " "),
      el("span", { class: "banner__ref", text: SITE.verseRef })
    ]);

    return el("header", { class: "banner" }, [
      el("div", { class: "wrap banner__inner" }, [logo, verse])
    ]);
  }

  /* ---- 選單 ---- */
  function buildNav() {
    var list = el("ul", { class: "nav__list", id: "navList" });

    NAV.forEach(function (item) {
      var li = el("li", { class: "nav__item" + (isCurrent(item) ? " is-current" : "") });

      var link = el("a", { class: "nav__link", href: item.href, text: item.label });
      if (item.id === current) link.setAttribute("aria-current", "page");
      li.appendChild(link);

      if (item.children && item.children.length) {
        var sub = el("ul", { class: "nav__sub" });
        item.children.forEach(function (c) {
          var cli = el("li", { class: c.id === current ? "is-current" : "" });
          var clink = el("a", { class: "nav__link", href: c.href, text: c.label });
          if (c.id === current) clink.setAttribute("aria-current", "page");
          cli.appendChild(clink);
          sub.appendChild(cli);
        });
        li.appendChild(sub);
      }
      list.appendChild(li);
    });

    var toggle = el("button", {
      class: "nav__toggle", type: "button",
      "aria-expanded": "false", "aria-controls": "navList"
    }, [ el("span", { class: "nav__burger", "aria-hidden": "true" }),
         el("span", { text: "選單" }) ]);

    toggle.addEventListener("click", function () {
      var open = list.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    return el("nav", { class: "nav", "aria-label": "主選單" }, [
      el("div", { class: "wrap nav__inner" }, [toggle, list])
    ]);
  }

  /* ---- 頁尾 ---- */
  /* 只輸出有填值的聯絡欄位，留空的行不會出現 */
  function buildContactLines() {
    var lines = [];
    if (SITE.address) lines.push("地址：" + SITE.address);
    if (SITE.phone)   lines.push("電話：" + SITE.phone);
    if (SITE.email)   lines.push("Email：<a href=\"mailto:" + SITE.email + "\">" + SITE.email + "</a>");
    return lines.join("<br>");
  }

  function buildFooter() {
    var links = el("ul", { class: "footer__links" });
    NAV.forEach(function (item) {
      links.appendChild(el("li", null, [ el("a", { href: item.href, text: item.label }) ]));
    });

    var brand = el("div", null, [
      el("div", { class: "footer__brand", text: SITE.org + "　" + SITE.hall }),
      el("p", { class: "footer__meta", html: buildContactLines() })
    ]);

    return el("footer", { class: "footer" }, [
      el("div", { class: "wrap footer__inner" }, [brand, links]),
      el("div", { class: "footer__copy",
                  text: "© " + new Date().getFullYear() + " " + SITE.org + SITE.hall +
                        "　本站內容僅供召會弟兄姊妹及慕道朋友參考" })
    ]);
  }

  /* ---- 掛上畫面 ---- */
  function mount(id, node) {
    var slot = document.getElementById(id);
    if (slot) slot.replaceWith(node);
  }

  mount("site-header", el("div", null, [buildBanner(), buildNav()]));
  mount("site-footer", buildFooter());

  /* 頁面標題自動補上會所名稱 */
  if (!/三重會所/.test(document.title)) {
    document.title = document.title + "｜" + SITE.org + SITE.hall;
  }
})();
