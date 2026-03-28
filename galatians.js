// ── Search ──────────────────────────────────────────────────────────────────
var matches = [];
var cur = -1;

function onSearch() {
  var term = document.getElementById('searchInput').value;
  doSearch(term);
}

function onSearchKey(e) {
  if (e.key === 'Enter') { stepMatch(e.shiftKey ? -1 : 1); }
  if (e.key === 'Escape') { clearSearch(); }
}

function doSearch(term) {
  clearHighlights();
  matches = [];
  cur = -1;
  if (!term || !term.trim()) { updateUI(); return; }

  var content = document.getElementById('content');
  var escaped = term.replace(new RegExp('[.*+?^' + '$' + '{}()|[\\]\\\\]', 'g'), '\\' + '$&');
  var re = new RegExp(escaped, 'gi');

  var walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, null, false);
  var nodes = [];
  while (walker.nextNode()) {
    var n = walker.currentNode;
    // Skip text inside script/style/a tags (preserve BibleGateway tooltip links)
    var p = n.parentElement;
    var skip = false;
    while (p && p !== content) {
      var t = p.tagName;
      if (t === 'SCRIPT' || t === 'STYLE' || t === 'A') { skip = true; break; }
      p = p.parentElement;
    }
    if (!skip) nodes.push(n);
  }

  nodes.forEach(function(node) {
    var text = node.textContent;
    var segs = [];
    var m;
    re.lastIndex = 0;
    while ((m = re.exec(text)) !== null) {
      segs.push({start: m.index, end: m.index + m[0].length, matched: m[0]});
    }
    if (!segs.length) return;

    var frag = document.createDocumentFragment();
    var last = 0;
    segs.forEach(function(seg) {
      if (seg.start > last) {
        frag.appendChild(document.createTextNode(text.slice(last, seg.start)));
      }
      var mk = document.createElement('mark');
      mk.textContent = seg.matched;
      frag.appendChild(mk);
      matches.push(mk);
      last = seg.end;
    });
    if (last < text.length) {
      frag.appendChild(document.createTextNode(text.slice(last)));
    }
    node.parentNode.replaceChild(frag, node);
  });

  if (matches.length > 0) {
    cur = 0;
    matches[0].classList.add('current');
    matches[0].scrollIntoView({behavior: 'smooth', block: 'center'});
  }
  updateUI();
}

function clearHighlights() {
  var marks = document.querySelectorAll('#content mark');
  marks.forEach(function(mk) {
    var parent = mk.parentNode;
    parent.replaceChild(document.createTextNode(mk.textContent), mk);
  });
  document.getElementById('content').normalize();
}

function stepMatch(dir) {
  if (matches.length < 2) return;
  matches[cur].classList.remove('current');
  cur = (cur + dir + matches.length) % matches.length;
  matches[cur].classList.add('current');
  matches[cur].scrollIntoView({behavior: 'smooth', block: 'center'});
  updateUI();
}

function clearSearch() {
  document.getElementById('searchInput').value = '';
  clearHighlights();
  matches = [];
  cur = -1;
  updateUI();
}

function updateUI() {
  var term = document.getElementById('searchInput').value.trim();
  var countEl = document.getElementById('matchCount');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var clrBtn  = document.getElementById('clearBtn');

  if (term && matches.length === 0) {
    countEl.textContent = 'No matches';
    countEl.style.color = '#ff8a80';
  } else if (matches.length > 0) {
    countEl.textContent = (cur + 1) + ' / ' + matches.length;
    countEl.style.color = 'rgba(255,255,255,0.7)';
  } else {
    countEl.textContent = '';
  }

  prevBtn.disabled = matches.length < 2;
  nextBtn.disabled = matches.length < 2;
  clrBtn.style.display = term ? 'flex' : 'none';
}

// ── Dark mode ────────────────────────────────────────────────────────────────
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  var btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = theme === 'dark' ? '\u2600' : '\uD83C\uDF19';
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  var current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

(function initTheme() {
  var saved = localStorage.getItem('theme');
  if (saved) { applyTheme(saved); return; }
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
})();

// ── BibleGateway tooltips ────────────────────────────────────────────────────
BGLinks.version = document.getElementById('refVersionSel').value || "LSB";
BGLinks.showTooltips = true;
BGLinks.linkVerses();

function onVersionChange() {
  var version = document.getElementById('refVersionSel').value;
  clearSearch();
  var links = document.querySelectorAll('#content a[href*="biblegateway.com"]');
  links.forEach(function(a) {
    while (a.firstChild) a.parentNode.insertBefore(a.firstChild, a);
    a.parentNode.removeChild(a);
  });
  document.getElementById('content').normalize();
  BGLinks.version = version;
  BGLinks.linkVerses();
}

// ── Timestamp ────────────────────────────────────────────────────────────────
var d = new Date(document.lastModified);
document.getElementById('lastmod').textContent = 'Last updated: ' + d.toLocaleString();
