# Galatians Notes — Project Instructions

## Wording
- Preserve the exact wording of all notes as supplied by the user
- Do not paraphrase, reword, simplify, or expand any note content
- Correct only clear errors in grammar, spelling, or punctuation, and only when the correction does not change the meaning
- Any rewording beyond that requires explicit instruction from the user

## Attribution
- Default source for all notes is **Bruce, *The Epistle to the Galatians* (NIGTC)** unless stated otherwise
- Other common sources: Longenecker (*Galatians*, WBC), Dunn (*The Epistle to the Galatians*, BNTC), BDAG

## Spanish parity
- Every note added to an English page (`gal{N}-en.html`) must also be added to the corresponding Spanish page (`gal{N}-es.html`) in the same commit
- Translate all prose, block quotes, and source labels into Spanish (machine translation is fine)
- Greek and Latin terms are left untranslated; scripture references remain in their standard Spanish form
- BibleGateway version on Spanish pages defaults to RVR1960

## File structure
- One HTML file per chapter per language: `gal{N}-en.html` / `gal{N}-es.html`
- `nav.js` — single source of truth for navigation; add a chapter number to `NAV_CHAPTERS` to extend the site
- `appendix-en.html` — long primary source texts in English
- `galatians.css` — all styles (dark mode, responsive layout, topbar, chapter nav buttons)
- `galatians.js` — dark mode toggle, full-text search, BibleGateway init, timestamp

## HTML conventions
- Greek terms use numeric HTML entities (e.g. `&#960;&#945;&#953;&#948;&#945;&#947;&#969;&#947;ό&#962;` for παιδαγωγός)
- Section markers: `<!-- §GAL-X-XX -->`
- Block quotes: `<p class="bq">…</p>`
- Source labels: `<span class="src">[Author, Title]</span>`
- Cited works: `<cite>Title</cite>`
- Scripture references left as plain text — BibleGateway tooltips provide the verse text on hover

## Git workflow
- Commit changes to `main` after each change unless the user asks for a review branch
- Do not push to `origin` unless the user explicitly asks
- Write descriptive commit messages noting which verse sections and files were changed
