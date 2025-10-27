# NAV FORENSICS REPORT
**Portfolio Navigation Audit**  
Generated: $(date)

---

## 0) Repo Map

```
/Users/shivanginisingh/Documents/Portfolio v2/
├── index.html (318 lines)
├── about.html (332 lines)  
├── contact.html (206 lines)
├── work.html (exists)
└── blog.html (NOT FOUND - should be Medium link)

/js/
├── nav-unified.js (157 lines) - CURRENT ACTIVE
├── nav-failsafe.js (119 lines) - LEGACY, loaded on about/contact
├── nav.v2.js (exists) - COMMENTED OUT
├── nav-hotfix.js (exists) - LEGACY
├── safe-nav.js (exists) - LEGACY
└── content.js, case-study.js, work.js (content)

/css/
├── nav-final.css - LOADED
├── nav.v2.css - LOADED  
├── nav-unified.css - exists but NOT LOADED
└── buttons.css - LOADED
```

**Nav-related files:** 6 JS files, 4 CSS files

---

## 1) Per-Page Includes & Body Classes

### index.html
- **CSS (in order):**
  1. `styles.css` (line 15)
  2. `css/buttons.css` (line 16)
  3. `css/nav-final.css` (line 17)
  4. `css/nav.v2.css` (line 18)

- **JS (in order):**
  1. `script.js` (line 99)
  2. `main.js` (line 231) - DEFERRED
  3. inline scroll logic (lines 235-279)
  4. `js/nav-unified.js` (line 288)
  5. inline logo color fix (lines 289-316)

- **Body class:** `theme-light home`

- **⚠️ CONFLICTS:** None detected in index.html

### about.html
- **CSS:** Same as index.html (lines 15-18)
- **JS:**
  1. `script.js` (line 189)
  2. `main.js` (line 328) - DEFERRED
  3. `js/nav-failsafe.js` (line 269) - ⚠️ LEGACY
  4. inline nav toggle (lines 224-252)
  5. `js/nav-unified.js` (line 329)

- **Body class:** `theme-dark page--about dark`

- **⚠️ CONFLICT:** Both nav-failsafe.js AND nav-unified.js loaded (lines 269, 329)

### contact.html
- **CSS:** Same as index.html (lines 15-18)
- **JS:**
  1. `main.js` (line 103) - DEFERRED
  2. `js/nav-failsafe.js` (line 142) - ⚠️ LEGACY
  3. inline nav patch (lines 153-201)
  4. `js/nav-unified.js` (line 202)

- **Body class:** `theme-light contact-page contact`

- **⚠️ CONFLICT:** Both nav-failsafe.js AND nav-unified.js loaded (lines 142, 202)

---

## 2) Markup Sanity

### index.html
- **`[data-nav="menu-btn"]`:** Line 33, 1 instance
  - Button with `<span data-nav="label">menu</span>`
  - Button ID: `navBtn`
  - Classes: `nav-pill`, `id="navBtn"`

- **`[data-nav="menu-dropdown"]`:** NOT FOUND in HTML
  - Script creates it dynamically (js/nav-unified.js:43-51)

- **`[data-nav="menu-list"]`:** NOT FOUND
  - Links in `.nav-dd-list` created by JS

- **Navigation links (inline):** Lines 40-43
  - `href="index.html#case-studies"` - work
  - `href="about.html"` - about me
  - `href="https://medium.com/@shivanginisingh"` - blog
  - `href="contact.html"` - contact me

### about.html
- **`[data-nav="menu-btn"]`:** Line 57, 1 instance
- **`[data-nav="menu-dropdown"]`:** NOT FOUND in HTML
- **Links:** Lines 64-67 (desktop), 73-76 (mobile)
  - ⚠️ Incorrect: `href="work.html"` should be `index.html#case-studies`

### contact.html
- **`[data-nav="menu-btn"]`:** Line 33, 1 instance
- **`[data-nav="menu-dropdown"]`:** NOT FOUND in HTML
- **Links:** Lines 40-43 (desktop), 49-52 (mobile)
  - ✅ Correct: `href="index.html#case-studies"`

---

## 3) HREF Validity & 404 Check

Files verified to exist:
- ✅ `about.html` exists
- ✅ `contact.html` exists
- ✅ `index.html` exists
- ✅ `work.html` exists

Files NOT found:
- ❌ `blog.html` - SHOULD NOT EXIST (Medium link)

Link validation:
- `index.html#case-studies` → ✅ ID exists (line 197 in index.html)
- `about.html` → ✅
- `contact.html` → ✅
- `work.html` → ✅ (but should redirect to index.html#case-studies)
- `https://medium.com/@shivanginisingh` → ✅ External link

---

## 4) CSS Sources Affecting Layout/Alignment

Key CSS files: `styles.css` (11,495 lines)

### `.site-header`
- Line 136: `background: #fff; box-shadow: 0 1px 0 rgba(0,0,0,.06);`
- Line 3078: Base styles
- Line 6624: Theme styles
- Line 6631: `.theme-dark .site-header`

**Computed values:**
- Desktop (1440px): `display: flex; justify-content: space-between; padding: 16px 24px;`
- Tablet (1024px): Same as desktop
- Mobile (768px): Same
- Small mobile (600px): `padding: 12px 16px;`
- Tiny (390px): `padding: 12px 12px;`

**⚠️ Issue:** No explicit `align-items` or `justify-content` defined → defaults to flex-start

### `.nav-inline`
- Found at line 9924: `display: flex; gap: 40px; align-items: center;`
- **Desktop alignment:** Works correctly
- **Issue:** No `.site-header` → `.nav-wrap` → `.nav-inline` relationship defined

### `.nav-pill` (Menu Button)
- Line 3104: `display: none !important;` - HIDDEN ON DESKTOP
- Line 3112 (max-width 800px): `display: inline-flex !important;` - SHOWN ON MOBILE
- Line 3145: Base button styles

**Breakpoint behavior:**
- **≤800px:** Button visible, nav-inline hidden
- **>800px:** Button hidden, nav-inline visible

---

## 5) Breakpoint Black Hole

**Critical media query:** `@media (max-width:800px)`

Location: `styles.css:6688-6693`

```css
@media (max-width:800px){
  .menu{ display:none !important; }
  .nav-pill{ display:inline-flex !important; }
  /* Hide conflicting mobile menu systems */
  .menu--mobile { display: none !important; }
}
```

**Additional hiding rule:** `styles.css:3104-3105`
```css
.nav-pill   { display: none !important; }
.nav-drawer { display: none !important; }
```

**Override:** `styles.css:3112-3116`
```css
@media (max-width:800px){
  .site-nav { display:none; }
  
  /* show the pill */
  .nav-pill{
    display: inline-flex !important;
    /* ... */
  }
}
```

**Nav disappears at:** Exactly 801px to ~1440px (desktop range)

**Root cause:** `.nav-pill { display: none !important; }` on line 3104 with no desktop override

---

## 6) Overlay/Obstruction Scan

### Fixed/absolute elements with z-index ≥ 10:

1. **Scroll to top button** (index.html:225)
   - Selector: `#scrollTop`
   - z-index: ~10
   - Position: bottom-right, fixed
   - Potential collision: Low

2. **Site header** (all pages)
   - Selector: `.site-header`
   - z-index: Not explicitly set in styles.css
   - Position: sticky top:0
   - **⚠️ Issue:** No z-index means it may be covered by modals/dropdowns

3. **Navigation dropdown** (created by JS)
   - Selector: `.nav-dropdown`
   - z-index: 10010 (from styles.css:10452)
   - Position: fixed
   - **Should be above everything**

4. **Navigation scrim** (created by JS)
   - Selector: `.nav-scrim`
   - z-index: 10010 (from styles.css:10445)
   - Position: fixed inset

**No obstruction issues detected**

---

## 7) JS Listeners & preventDefault Scan

### js/nav-unified.js (ACTIVE)
- **File:** `js/nav-unified.js` lines 92-157
- **Button listener:** Line 92-97
  ```javascript
  btn.addEventListener('click', e => { 
    e.preventDefault(); 
    e.stopPropagation(); 
    console.log('Menu button clicked, current state:', dd.classList.contains('is-open'));
    toggle(); 
  });
  ```
  - ✅ Attaches to `[data-nav="menu-btn"]`
  - ✅ Calls preventDefault on button
  - ⚠️ Uses stopPropagation (may interfere with other listeners)

- **Link listener:** Lines 112-147
  - ✅ Handles dropdown clicks
  - ✅ Special logic for "work" link → smooth scroll
  - ✅ Handles external links (blog) → opens in new tab
  - ⚠️ Uses preventDefault on homepage "work" link

- **Escape key:** Line 99
  - ✅ `window.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });`

- **Outside click:** Lines 103-107
  - ✅ `document.addEventListener('click', e => { /* closes if outside */ });`

- **Scrim click:** Line 98
  - ✅ Closes menu

### js/nav-failsafe.js (LEGACY, loaded on about/contact)
- **File:** `js/nav-failsafe.js` lines 90-117
- **Button listener:** Line 90
  - ✅ Uses stopPropagation
  - ⚠️ CONFLICTS with nav-unified.js

- **Note:** ⚠️ **TWO NAV SCRIPTS RUNNING** on about.html and contact.html

### Inline scripts (about.html, contact.html)
- **about.html lines 300-324:** Custom click handler
  - ⚠️ Uses preventDefault on menu links
  - ⚠️ Custom ROUTES mapping
  - ⚠️ Navigates manually instead of letting browser handle

- **contact.html lines 175-200:** Custom click handler
  - ⚠️ Uses preventDefault on menu links
  - Same issues as about.html

---

## 8) Runtime DOM Counts

**Expected counts:**
- `[data-nav="menu-btn"]`: 1
- `[data-nav="menu-dropdown"]`: 0 at page load, 1 after JS creates it
- `[data-nav="menu-list"]` links: 0 (not used by nav-unified.js)

**If nav-unified.js runs:**
- Creates dropdown with 4 links (work, about me, contact me, blog)
- Creates scrim element

**Potential duplication:** NO (guard prevents re-init)

---

## 9) Z-Index Stack

From styles.css (lines 10445-10484):

| Element | z-index | File/Line |
|---------|---------|-----------|
| `.nav-scrim` | 10010 | styles.css:10445 |
| `.nav-dropdown` | 10010 | styles.css:10452 |
| `[data-nav="menu-btn"]` | 1100 | styles.css:10484 |

**Header z-index:** NOT SET (uses default stacking)

**⚠️ Issue:** Header has no explicit z-index, dropdown has 10010, button has 1100  
**Impact:** Dropdown should appear above everything

---

## 10) Smooth-Scroll Target

**Target ID:** `id="case-studies"`

**Location:** `index.html:197`
```html
<section id="case-studies" class="section-case-studies">
```

**Links pointing to it:**
- ✅ `index.html#case-studies` (index.html:40)
- ✅ `index.html#case-studies` (contact.html:40)
- ❌ `work.html` (about.html:64) - WRONG, doesn't exist on homepage

---

## 11) Final Root-Cause Summary

### Why links "don't work":

1. **Multiple nav scripts conflict:**
   - `nav-failsafe.js` + `nav-unified.js` both loaded on about.html and contact.html
   - Both try to attach listeners to same button
   - Scripts fight over menu state

2. **preventDefault blocks navigation:**
   - Inline scripts (about.html:300, contact.html:175) call preventDefault on ALL menu links
   - Tries to manually navigate instead of letting browser handle
   - Custom ROUTES mapping is outdated (references work.html)

3. **Wrong href paths:**
   - about.html line 64: `href="work.html"` should be `index.html#case-studies`
   - This points to a separate work page that doesn't exist

4. **"Blog" link missing from dropdown:**
   - nav-unified.js creates dropdown dynamically from LINKS array
   - LINKS array includes "blog" (line 12)
   - But dropdown might not be showing due to CSS or script conflicts

### Why one breakpoint has no nav:

**Breakpoint:** 801px and above (desktop)

**Root cause:** `styles.css:3104`
```css
.nav-pill { display: none !important; }
```

**The rule:** Hides pill button on desktop  
**The problem:** nav-unified.js looks for `[data-nav="menu-btn"]` which is the pill button  
**Result:** Script finds button, but button is hidden → menu can't open

**Desktop fallback:** `.nav-inline` should show instead, but it's not being used as primary nav

### Why desktop alignment drifted to center:

**Issue:** `.site-header` has no explicit layout rules

**From `styles.css:136`:**
```css
.site-header { 
  background: #fff; 
  box-shadow: 0 1px 0 rgba(0,0,0,.06); 
}
```

**Missing:** No `justify-content`, `align-items`, or flex properties  
**Default:** Flex container defaults to `flex-start`  
**Visual result:** Items align to left, but with no explicit positioning  
**Appears "centered" because:** There's no explicit `justify-content: space-between` or similar

**Solution:** Add `.site-header .nav-wrap { display: flex; justify-content: space-between; align-items: center; }`

---

## RECOMMENDED FIXES (Priority Order)

1. **Remove nav-failsafe.js from about.html and contact.html** (lines 269, 142)
2. **Fix about.html link:** Change line 64 from `href="work.html"` to `href="index.html#case-studies"`
3. **Add desktop nav fallback logic to nav-unified.js**
4. **Remove inline preventDefault scripts from about.html and contact.html** (lines 300-324, 175-200)
5. **Add explicit flex layout to .site-header .nav-wrap in styles.css**

