(function () {
  "use strict";

  var data = window.ROLL_CALL;
  if (!data) return;

  var root = document.documentElement;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var total = data.spots.length;
  var active = 0;

  var escapeMap = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) { return escapeMap[ch]; });
  }
  function pad(n) { return String(n).padStart(2, "0"); }
  function mapsUrl(query) {
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
  }
  function revealBehaviour() {
    return reduceMotion ? "auto" : "smooth";
  }

  document.title = data.meta.title;
  var metaDescription = $('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute("content", data.meta.description);

  /* ---------- theme ---------- */

  var themeToggle = $("#themeToggle");
  var themeLabel = $("#themeLabel");
  var themeMeta = $('meta[name="theme-color"]');

  function syncTheme() {
    var dark = root.dataset.theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(dark));
    themeToggle.setAttribute("aria-label", dark ? data.ui.themeAriaToLight : data.ui.themeAriaToDark);
    themeLabel.textContent = dark ? data.ui.themeToLight : data.ui.themeToDark;
    if (themeMeta) {
      themeMeta.setAttribute("content", dark ? data.meta.themeColorDark : data.meta.themeColorLight);
    }
  }

  syncTheme();

  themeToggle.addEventListener("click", function () {
    var next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("rollcall-theme", next); } catch (error) { /* private mode */ }
    syncTheme();
  });

  /* ---------- header + mobile nav ---------- */

  $("#brandName").textContent = data.brand.name;
  $("#brandSub").textContent = data.brand.sub;
  $("#skipLink").textContent = data.ui.skip;

  var nav = $("#navLinks");
  nav.innerHTML = data.nav
    .map(function (item) { return '<a href="' + esc(item.href) + '">' + esc(item.label) + "</a>"; })
    .join("");

  var navToggle = $("#navToggle");
  var navToggleLabel = $("#navToggleLabel");

  function setNavOpen(open) {
    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggleLabel.textContent = open ? data.ui.menuClose : data.ui.menu;
  }

  navToggle.addEventListener("click", function () {
    setNavOpen(!nav.classList.contains("is-open"));
  });

  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setNavOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setNavOpen(false);
      navToggle.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 820 && nav.classList.contains("is-open")) setNavOpen(false);
  });

  /* ---------- hero ---------- */

  var lines = data.hero.titleLines || [data.hero.titleTop || "", data.hero.titleBottom || ""];
  $("#heroKicker").textContent = data.hero.kicker;
  $("#heroIssue").textContent = data.hero.issue;
  $("#heroLine1").textContent = lines[0] || "";
  $("#heroLine2").textContent = lines[1] || "";
  $("#heroLine3").textContent = lines[2] || "";
  $("#heroIntro").textContent = data.hero.intro;
  $("#heroActions").innerHTML =
    '<a class="btn btn--primary" href="#map">' + esc(data.hero.primaryCta) +
      ' <span aria-hidden="true">↓</span></a>' +
    '<a class="btn btn--ghost" href="#stops">' + esc(data.hero.secondaryCta) + "</a>";
  $("#heroStats").innerHTML = data.hero.stats
    .map(function (stat) {
      return '<li><span class="stat-num">' + esc(stat.value) + '</span>' +
        '<span class="stat-label">' + esc(stat.label) + "</span></li>";
    })
    .join("");

  var heroImage = $("#heroImage");
  heroImage.src = data.hero.image;
  heroImage.alt = data.hero.imageAlt;
  $("#heroBadge").setAttribute("aria-label", data.hero.badgeAria);
  $("#badgeRing").textContent = data.hero.badgeRing;
  $("#badgeCenter").textContent = data.hero.badgeCenter;
  $("#heroPlace").textContent = data.hero.place;
  $("#heroCoords").textContent = data.hero.coordinates;
  $("#scrollHint").textContent = data.ui.scrollHint;

  var tickerItems = data.ticker.concat(data.ticker);
  var tickerGroup = '<div class="ticker-group">' + tickerItems
    .map(function (item) {
      return '<span class="ticker-item">' + esc(item) +
        '</span><span class="ticker-star" aria-hidden="true">✦</span>';
    })
    .join("") + "</div>";
  $("#tickerTrack").innerHTML = tickerGroup + tickerGroup;

  /* ---------- map copy, labels, pins ---------- */

  $("#mapKicker").textContent = data.map.kicker;
  $("#mapTitle").textContent = data.map.title;
  $("#mapLede").textContent = data.map.lede;
  $("#mapHint").textContent = data.map.hint;
  $("#mapPlate").textContent = data.map.plate;
  $("#mapNote").textContent = data.map.note;
  $("#mapStamp").textContent = data.map.stamp;
  $("#compassN").textContent = data.ui.north;
  $("#mapCanvas").setAttribute("aria-label", data.map.ariaLabel);

  $("#mapLegend").innerHTML = data.map.legend
    .map(function (item) {
      return '<li><span class="legend-swatch legend-swatch--' + esc(item.kind) +
        '" aria-hidden="true"></span>' + esc(item.label) + "</li>";
    })
    .join("");

  var svgNS = "http://www.w3.org/2000/svg";
  var labelGroup = $("#mapLabels");
  data.map.labels.forEach(function (label) {
    var text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", label.x);
    text.setAttribute("y", label.y);
    text.setAttribute("class", "map-label");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("font-size", label.size || 14);
    if (label.rotate) {
      text.setAttribute("transform", "rotate(" + label.rotate + " " + label.x + " " + label.y + ")");
    }
    text.textContent = label.text;
    labelGroup.appendChild(text);
  });

  var pinsEl = $("#pins");
  pinsEl.innerHTML = data.spots
    .map(function (spot, index) {
      return '<button type="button" class="pin accent-' + esc(spot.accent) + '"' +
        ' style="--x:' + Number(spot.x) + '%;--y:' + Number(spot.y) + '%"' +
        ' data-index="' + index + '" aria-pressed="false"' +
        ' aria-label="' + esc(data.ui.pin) + " " + (index + 1) + ": " + esc(spot.name) + '">' +
        '<span class="pin-num" aria-hidden="true">' + (index + 1) + "</span>" +
        '<span class="pin-tip" aria-hidden="true">' + esc(spot.name) + "</span>" +
        "</button>";
    })
    .join("");

  pinsEl.addEventListener("click", function (event) {
    var pin = event.target.closest(".pin");
    if (!pin) return;
    setActive(Number(pin.dataset.index));

    if (window.matchMedia("(max-width: 980px)").matches) {
      var orderCard = $("#spotlight");
      if (orderCard) {
        orderCard.scrollIntoView({ behavior: revealBehaviour(), block: "start" });
      }
    }
  });

  /* ---------- shared render blocks ---------- */

  function tagRow(spot) {
    return '<ul class="tag-row">' + spot.tags
      .map(function (tag) { return '<li class="tag">' + esc(tag) + "</li>"; })
      .join("") + "</ul>";
  }

  function detailList(spot) {
    var labels = data.spotlight.labels;
    return '<dl class="spot-details">' +
      '<div><dt>' + esc(labels.price) + "</dt><dd>" + esc(spot.price) + "</dd></div>" +
      '<div><dt>' + esc(labels.time) + "</dt><dd>" + esc(spot.bestTime) + "</dd></div>" +
      '<div><dt>' + esc(labels.eat) + "</dt><dd>" + esc(spot.eatAt) + "</dd></div>" +
      "</dl>";
  }

  /* ---------- spotlight ---------- */

  var spotlight = $("#spotlight");

  function renderSpotlight(index, focusDirection) {
    var spot = data.spots[index];
    var number = pad(index + 1);

    spotlight.innerHTML =
      '<div class="spotlight-top">' +
        '<span class="eyebrow">' + esc(data.spotlight.eyebrow) + "</span>" +
        '<span class="spot-count">' + esc(data.ui.pin) + " " + number + " / " + pad(total) + "</span>" +
      "</div>" +
      '<div class="spotlight-body">' +
        '<div class="spot-head">' +
          '<span class="spot-number">' + number + "</span>" +
          "<div>" +
            '<h3 class="spot-name">' + esc(spot.name) + "</h3>" +
            '<p class="spot-meta">' + esc(spot.area) +
              (spot.since ? " · " + esc(spot.since) : "") + "</p>" +
          "</div>" +
        "</div>" +
        '<div class="spot-order">' +
          '<span class="micro-label">' + esc(data.ui.order) + "</span>" +
          '<p class="spot-dish">' + esc(spot.order) + "</p>" +
          '<p class="spot-order-note">' + esc(spot.orderNote) + "</p>" +
        "</div>" +
        '<p class="spot-blurb">' + esc(spot.blurb) + "</p>" +
        tagRow(spot) +
        detailList(spot) +
        '<a class="btn btn--gold" href="' + mapsUrl(spot.mapsQuery) +
          '" target="_blank" rel="noopener">' + esc(data.ui.directions) +
          ' <span aria-hidden="true">↗</span></a>' +
        '<div class="spot-nav">' +
          '<button class="icon-btn" type="button" data-nav="prev" aria-label="' + esc(data.ui.prev) + '">←</button>' +
          '<span class="spot-nav-hint">' + esc(data.ui.browseHint) + "</span>" +
          '<button class="icon-btn" type="button" data-nav="next" aria-label="' + esc(data.ui.next) + '">→</button>' +
        "</div>" +
      "</div>";

    $$("[data-nav]", spotlight).forEach(function (button) {
      button.addEventListener("click", function () {
        var direction = button.dataset.nav;
        setActive(active + (direction === "prev" ? -1 : 1), direction);
      });
    });

    spotlight.classList.remove("is-swapping");
    void spotlight.offsetWidth;
    spotlight.classList.add("is-swapping");

    if (focusDirection) {
      var target = spotlight.querySelector('[data-nav="' + focusDirection + '"]');
      if (target) target.focus({ preventScroll: true });
    }
  }

  function setActive(index, focusDirection) {
    active = ((index % total) + total) % total;
    $$(".pin", pinsEl).forEach(function (pin, pinIndex) {
      var isActive = pinIndex === active;
      pin.classList.toggle("is-active", isActive);
      pin.setAttribute("aria-pressed", String(isActive));
    });
    renderSpotlight(active, focusDirection);
  }

  /* ---------- ten stops ---------- */

  $("#listKicker").textContent = data.list.kicker;
  $("#listTitle").textContent = data.list.title;
  $("#listLede").textContent = data.list.lede;
  $("#priceNote").textContent = data.list.priceNote;

  var layouts = [
    "stop--feature",
    "stop--feature is-flipped",
    "stop--pair",
    "stop--pair is-offset",
    "stop--wide",
    "stop--feature is-flipped",
    "stop--pair",
    "stop--pair is-offset",
    "stop--feature",
    "stop--closing"
  ];

  function stopMedia(spot) {
    return '<figure class="stop-media">' +
      '<img src="' + esc(spot.image) + '" alt="' + esc(spot.imageAlt) +
        '" width="1400" height="933" loading="lazy" decoding="async" />' +
      "</figure>";
  }

  function stopHeader(spot, number) {
    return '<div class="stop-top">' +
        '<span class="stop-no">' + esc(data.guide.columns.number) + " " + number + "</span>" +
        '<span class="stop-area">' + esc(spot.area) +
          (spot.since ? " · " + esc(spot.since) : "") + "</span>" +
      "</div>" +
      '<h3 class="stop-name">' + esc(spot.name) + "</h3>";
  }

  function stopOrderBlock(spot) {
    return '<div class="stop-order">' +
        '<span class="micro-label">' + esc(data.ui.order) + "</span>" +
        '<p class="stop-dish">' + esc(spot.order) + "</p>" +
        '<p class="stop-order-note">' + esc(spot.orderNote) + "</p>" +
      "</div>";
  }

  function stopActions(index, spot) {
    return '<div class="stop-actions">' +
        '<button class="btn btn--primary btn--small" type="button" data-map="' + index + '">' +
          esc(data.ui.showOnMap) + ' <span aria-hidden="true">↓</span></button>' +
        '<a class="link-arrow" href="' + mapsUrl(spot.mapsQuery) +
          '" target="_blank" rel="noopener">' + esc(data.ui.maps) +
          ' <span aria-hidden="true">↗</span></a>' +
      "</div>";
  }

  var stopsGrid = $("#spotGrid");
  stopsGrid.innerHTML = data.spots
    .map(function (spot, index) {
      var number = pad(index + 1);
      var layout = layouts[index % layouts.length];
      var body;

      if (layout.indexOf("stop--closing") !== -1) {
        body =
          '<div class="stop-body">' +
            '<div class="stop-close-main">' +
              stopHeader(spot, number) +
              stopOrderBlock(spot) +
              tagRow(spot) +
            "</div>" +
            '<div class="stop-close-side">' +
              '<p class="stop-blurb">' + esc(spot.blurb) + "</p>" +
              detailList(spot) +
              stopActions(index, spot) +
            "</div>" +
          "</div>";
      } else {
        body =
          '<div class="stop-body">' +
            stopHeader(spot, number) +
            stopOrderBlock(spot) +
            '<p class="stop-blurb">' + esc(spot.blurb) + "</p>" +
            tagRow(spot) +
            detailList(spot) +
            stopActions(index, spot) +
          "</div>";
      }

      return '<article class="stop ' + layout + ' accent-' + esc(spot.accent) +
        ' reveal" id="spot-' + index + '" data-index="' + index + '" style="--i:' + index + '">' +
        stopMedia(spot) + body +
        "</article>";
    })
    .join("");

  document.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-map]");
    if (!trigger) return;
    setActive(Number(trigger.dataset.map));
    var mapPanel = $(".map-panel");
    if (mapPanel) {
      mapPanel.scrollIntoView({ behavior: revealBehaviour(), block: "start" });
    }
  });

  /* ---------- field guide ---------- */

  $("#guideKicker").textContent = data.guide.kicker;
  $("#guideTitle").textContent = data.guide.title;
  $("#guideLede").textContent = data.guide.lede;
  $("#guideNote").textContent = data.guide.note;

  var cols = data.guide.columns;
  $("#guideHead").innerHTML =
    "<tr>" +
      '<th scope="col">' + esc(cols.number) + "</th>" +
      '<th scope="col">' + esc(cols.stop) + "</th>" +
      '<th scope="col">' + esc(cols.order) + "</th>" +
      '<th scope="col">' + esc(cols.price) + "</th>" +
      '<th scope="col">' + esc(cols.time) + "</th>" +
      '<th scope="col">' + esc(cols.eat) + "</th>" +
      '<th scope="col"><span class="visually-hidden">' + esc(cols.open) + "</span></th>" +
    "</tr>";

  $("#guideBody").innerHTML = data.spots
    .map(function (spot, index) {
      var number = pad(index + 1);
      return "<tr>" +
        '<td class="guide-no" data-label="' + esc(cols.number) + '">' + number + "</td>" +
        '<td class="guide-stop" data-label="' + esc(cols.stop) + '" data-no="' + number + '">' +
          '<span class="guide-name">' + esc(spot.name) + "</span>" +
          '<span class="guide-area">' + esc(spot.area) +
            (spot.since ? " · " + esc(spot.since) : "") + "</span>" +
        "</td>" +
        '<td class="guide-order" data-label="' + esc(cols.order) + '">' + esc(spot.order) + "</td>" +
        '<td class="guide-price" data-label="' + esc(cols.price) + '">' + esc(spot.price) + "</td>" +
        '<td data-label="' + esc(cols.time) + '">' + esc(spot.bestTime) + "</td>" +
        '<td data-label="' + esc(cols.eat) + '">' + esc(spot.eatAt) + "</td>" +
        '<td class="guide-open"><button type="button" data-map="' + index +
          '" aria-label="' + esc(data.ui.showOnMap + ": " + spot.name) + '">' +
          '<span class="guide-open-text">' + esc(data.ui.showOnMap) + "</span>" +
          '<span aria-hidden="true">↗</span></button></td>' +
      "</tr>";
    })
    .join("");

  /* ---------- about ---------- */

  $("#aboutKicker").textContent = data.about.kicker;
  $("#aboutTitle").textContent = data.about.title;
  $("#aboutBody").innerHTML = data.about.body
    .map(function (paragraph) { return "<p>" + esc(paragraph) + "</p>"; })
    .join("");
  $("#aboutQuote p").textContent = data.about.quote;
  $("#aboutQuote cite").textContent = data.about.quoteAttribution;
  $("#aboutFacts").innerHTML = data.about.facts
    .map(function (fact) {
      return '<li><span class="fact-value">' + esc(fact.value) +
        '</span><span class="fact-label">' + esc(fact.label) + "</span></li>";
    })
    .join("");

  var aboutImage = $("#aboutImage");
  aboutImage.src = data.about.image;
  aboutImage.alt = data.about.imageAlt;
  $("#aboutImageCaption").textContent = data.about.imageCaption;

  /* ---------- footer ---------- */

  var bandGroup = '<div class="footer-band-group">' +
    '<span class="footer-band-item">' + esc(data.footer.marquee) + "</span>" +
    '<span class="footer-band-star" aria-hidden="true">✦</span>' +
    '<span class="footer-band-item">' + esc(data.footer.marquee) + "</span>" +
    '<span class="footer-band-star" aria-hidden="true">✦</span>' +
    '<span class="footer-band-item">' + esc(data.footer.marquee) + "</span>" +
    '<span class="footer-band-star" aria-hidden="true">✦</span>' +
    "</div>";
  $("#footerTrack").innerHTML = bandGroup + bandGroup;

  $("#footerBrand").textContent = data.brand.name + " · " + data.brand.sub;
  $("#footerBig").textContent = data.footer.big;
  $("#footerNav").innerHTML = data.nav
    .map(function (item) { return '<a href="' + esc(item.href) + '">' + esc(item.label) + "</a>"; })
    .join("");
  $("#footerBlurb").textContent = data.footer.blurb;
  $("#madeWith").textContent = data.footer.madeWith;
  $("#smallPrint").textContent = data.footer.smallPrint;
  $("#footerCoords").textContent = data.footer.coordinates;
  $("#footerCopy").textContent = data.footer.copyright;
  $("#backToMap").innerHTML = esc(data.ui.backToMap) + ' <span aria-hidden="true">↑</span>';

  /* ---------- reveal on scroll ---------- */

  setActive(0);

  var revealElements = $$(".reveal");

  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealElements.forEach(function (element) { element.classList.add("is-in"); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
    );
    revealElements.forEach(function (element) { observer.observe(element); });
  }
})();
