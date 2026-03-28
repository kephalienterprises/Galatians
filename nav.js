// ── Site structure (extend NAV_CHAPTERS as new chapters are added) ─────────────
var NAV_CHAPTERS = [3, 4];

var NAV_SECTIONS = {
  '3': [
    {label: '3:1\u201318',                        id: 'gal-3-1-18'},
    {label: '3:19',                               id: 'gal-3-19'},
    {label: '\u2514 Ordained Through Angels',     id: 'gal-3-19-angels'},
    {label: '\u2514 By the Hand of a Mediator',  id: 'gal-3-19-mediator'},
    {label: '3:20',                               id: 'gal-3-20'},
    {label: '3:21',                               id: 'gal-3-21'},
    {label: '3:22',                               id: 'gal-3-22'},
    {label: '3:23',                               id: 'gal-3-23'},
    {label: '3:24',                               id: 'gal-3-24'},
    {label: '3:25',                               id: 'gal-3-25'},
    {label: 'Summary 3:19\u201325',              id: 'gal-3-summary'}
  ],
  '4': [
    {label: '4:1', id: 'gal-4-1'},
    {label: '4:2', id: 'gal-4-2'},
    {label: '4:3', id: 'gal-4-3'}
  ]
};

var NAV_CHAPTER = parseInt(document.documentElement.getAttribute('data-chapter'), 10);
var NAV_LANG    = document.documentElement.getAttribute('data-lang') || 'en';
var NAV_LANGS   = ['en', 'es'];

// ── Build topbar ───────────────────────────────────────────────────────────────
(function buildTopbar() {
  var nav = document.getElementById('topbar');
  if (!nav) return;
  nav.className = 'topbar';

  function mk(tag, cls) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
  }
  function sep() { return mk('span', 'topbar-sep'); }

  // Title
  var title = mk('span', 'topbar-title');
  title.textContent = 'Why the Law, Then?';
  nav.appendChild(title);

  // Chapter select
  var chSel = mk('select');
  chSel.id = 'chapterSel';
  chSel.setAttribute('onchange', 'onChapterChange()');
  NAV_CHAPTERS.forEach(function(ch) {
    var opt = document.createElement('option');
    opt.value = ch;
    opt.textContent = 'Galatians ' + ch;
    if (ch === NAV_CHAPTER) opt.selected = true;
    chSel.appendChild(opt);
  });
  nav.appendChild(chSel);

  // Verse select
  var vsSel = mk('select');
  vsSel.id = 'verseSel';
  vsSel.setAttribute('onchange', 'onVerseChange()');
  var defOpt = document.createElement('option');
  defOpt.value = '';
  defOpt.textContent = '\u2014 Verse \u2014';
  vsSel.appendChild(defOpt);
  var sections = NAV_SECTIONS[String(NAV_CHAPTER)];
  if (sections) {
    sections.forEach(function(s) {
      var opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = s.label;
      vsSel.appendChild(opt);
    });
  }
  nav.appendChild(vsSel);

  nav.appendChild(sep());

  // Bible version select
  var verSel = mk('select');
  verSel.id = 'refVersionSel';
  verSel.title = 'Bible version for scripture tooltips';
  verSel.setAttribute('onchange', 'onVersionChange()');
  ['LSB', 'SBLGNT'].forEach(function(v) {
    var opt = document.createElement('option');
    opt.value = v;
    opt.textContent = v;
    verSel.appendChild(opt);
  });
  nav.appendChild(verSel);

  nav.appendChild(sep());

  // Language toggle
  var langDiv = mk('div', 'lang-toggle');
  NAV_LANGS.forEach(function(lang) {
    var a = document.createElement('a');
    a.href = 'gal' + NAV_CHAPTER + '-' + lang + '.html';
    a.textContent = lang.toUpperCase();
    a.className = 'lang-btn' + (lang === NAV_LANG ? ' lang-active' : '');
    langDiv.appendChild(a);
  });
  nav.appendChild(langDiv);

  // Search group
  var sg = mk('div', 'search-group');
  sg.innerHTML =
    '<input type="text" id="searchInput" placeholder="Search notes\u2026"' +
      ' oninput="onSearch()" onkeydown="onSearchKey(event)">' +
    '<span class="match-count" id="matchCount"></span>' +
    '<button id="prevBtn" onclick="stepMatch(-1)" disabled title="Previous match">\u2191</button>' +
    '<button id="nextBtn" onclick="stepMatch(1)" disabled title="Next match">\u2193</button>' +
    '<button id="clearBtn" onclick="clearSearch()" style="display:none" title="Clear">\u00d7</button>' +
    '<button id="themeBtn" onclick="toggleTheme()" title="Toggle dark mode">\uD83C\uDF19</button>';
  nav.appendChild(sg);
})();

// ── Chapter navigation ─────────────────────────────────────────────────────────
function onChapterChange() {
  var val = parseInt(document.getElementById('chapterSel').value, 10);
  if (val !== NAV_CHAPTER) {
    window.location.href = 'gal' + val + '-' + NAV_LANG + '.html';
  }
}

function onVerseChange() {
  var id = document.getElementById('verseSel').value;
  if (id) scrollToId(id);
}

function scrollToId(id) {
  var el = document.getElementById(id);
  if (!el) return;
  var bar = document.querySelector('.topbar');
  var offset = bar ? bar.offsetHeight + 16 : 68;
  var y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({top: y, behavior: 'smooth'});
}

// ── Prev / next chapter buttons ────────────────────────────────────────────────
(function buildChapterNav() {
  var idx     = NAV_CHAPTERS.indexOf(NAV_CHAPTER);
  var prevCh  = idx > 0                        ? NAV_CHAPTERS[idx - 1] : null;
  var nextCh  = idx < NAV_CHAPTERS.length - 1  ? NAV_CHAPTERS[idx + 1] : null;

  var prevBtn = document.getElementById('chapPrev');
  var nextBtn = document.getElementById('chapNext');

  if (prevBtn) {
    if (prevCh !== null) {
      prevBtn.innerHTML =
        '<span class="chap-arrow">\u2039</span>' +
        '<span class="chap-label">Gal\u00a0' + prevCh + '</span>';
      prevBtn.onclick = function() {
        window.location.href = 'gal' + prevCh + '-' + NAV_LANG + '.html';
      };
    } else {
      prevBtn.style.display = 'none';
    }
  }

  if (nextBtn) {
    if (nextCh !== null) {
      nextBtn.innerHTML =
        '<span class="chap-label">Gal\u00a0' + nextCh + '</span>' +
        '<span class="chap-arrow">\u203a</span>';
      nextBtn.onclick = function() {
        window.location.href = 'gal' + nextCh + '-' + NAV_LANG + '.html';
      };
    } else {
      nextBtn.style.display = 'none';
    }
  }
})();
