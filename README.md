# Study Notes on Galatians

A static website of personal study notes on Paul's letter to the Galatians, drawing on commentaries, lexicons, ancient primary sources, and original Greek analysis.

**Live site:** https://kephalienterprises.github.io/Galatians/

---

## Structure

The site is split into one HTML file per chapter per language:

| File | Content |
|---|---|
| `gal3-en.html` | Galatians 3 — English |
| `gal3-es.html` | Galatians 3 — Spanish |
| `gal4-en.html` | Galatians 4 — English |
| `gal4-es.html` | Galatians 4 — Spanish |
| `index.html` | Redirect to `gal3-en.html` |

Supporting files:

| File | Purpose |
|---|---|
| `nav.js` | Single source of truth for site navigation — topbar, chapter list, verse dropdown, prev/next buttons, i18n strings |
| `galatians.js` | Dark mode, full-text search, BibleGateway tooltip init, timestamp |
| `galatians.css` | All styles, including CSS custom properties for dark mode and responsive layout |

---

## Adding a New Chapter

1. Create `galN-en.html` and `galN-es.html` (copy an existing file as a template, update `data-chapter="N"`)
2. Add `N` to the `NAV_CHAPTERS` array in `nav.js`

The topbar, chapter dropdown, and prev/next buttons update automatically.

---

## Features

- **BibleGateway tooltips** — hover over any scripture reference to see the verse text; English pages default to LSB, Spanish pages to RVR1960
- **Full-text search** — searches all note text, skipping hyperlinks
- **Dark mode** — follows system preference, with manual toggle persisted in `localStorage`
- **Language toggle** — EN/ES switch in the topbar links to the equivalent chapter in the other language
- **Responsive** — topbar collapses to two rows on mobile; chapter nav buttons move to bottom corners

---

## Primary Sources Cited

- F. F. Bruce, *The Epistle to the Galatians* (NIGTC)
- Richard N. Longenecker, *Galatians* (WBC)
- J. D. G. Dunn, *The Epistle to the Galatians* (BNTC)
- BDAG (*A Greek-English Lexicon of the New Testament*)
- Rahlfs LXX
- Various Greek and Latin primary sources (Plato, Aristotle, Xenophon, Demosthenes, Justinian)
