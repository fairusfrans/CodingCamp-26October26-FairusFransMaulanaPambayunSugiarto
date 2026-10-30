# Tasks — Expense & Budget Visualizer

## Task List

### TASK-01: Project Scaffold
**Status:** ✅ Completed
**Description:** Create the folder structure and base files.
**Deliverables:**
- `index.html` — app shell
- `css/style.css` — single stylesheet
- `js/app.js` — single JavaScript file
- `README.md` — project documentation

---

### TASK-02: HTML Markup (index.html)
**Status:** ✅ Completed
**Description:** Write semantic HTML for all UI sections.
**Deliverables:**
- App header with title and dark/light mode toggle button
- Balance card with total amount and per-category stat pills (injected by JS)
- Two-column main layout (form + list on the left, chart on the right)
- Add Transaction form: Item Name, Amount (Rp), Category select + ＋ button
- Custom category inline sub-form (hidden by default)
- Transaction list with sort bar (Terbaru / Jumlah / Kategori) and empty state
- Chart section with canvas element and empty state

---

### TASK-03: Styling (css/style.css)
**Status:** ✅ Completed
**Description:** Style the entire app in a single CSS file with light/dark theme support.
**Deliverables:**
- CSS custom properties for light theme (`:root`) and dark theme (`[data-theme="dark"]`)
- Responsive two-column grid (collapses to single column on mobile at 780px)
- Balance card with purple gradient background
- Form styles with focus and validation error states
- Custom category form (hidden/open via `.open` class)
- Sort bar pill button styles with active state
- Transaction item styles with category colour accent on left border
- Slide-in and fade-in animations
- Mobile breakpoints at 780px and 480px

---

### TASK-04: Core Logic — Form & Transactions (js/app.js)
**Status:** ✅ Completed
**Description:** Implement form submission, validation, and transaction CRUD.
**Deliverables:**
- `validateForm()` — checks all fields, shows inline errors
- Form submit handler — creates transaction object, saves to localStorage
- `renderList()` — renders sorted transaction items with delete buttons
- Delete handler (event delegation on the list container)
- `loadJSON()` / `saveJSON()` — localStorage helpers

---

### TASK-05: Total Balance Display
**Status:** ✅ Completed
**Description:** Calculate and display live totals.
**Deliverables:**
- `calcTotals()` — sums grand total and per-category totals
- `renderBalance()` — updates balance amount and category stat pills
- Balance updates on every add and delete

---

### TASK-06: Pie Chart (Chart.js)
**Status:** ✅ Completed
**Description:** Render and update a pie chart of spending by category.
**Deliverables:**
- `renderChart()` — creates or updates Chart.js pie chart
- Chart only renders when at least one transaction exists
- Empty state shown when no data
- Chart colours match category accent colours
- Tooltips show Rupiah amount and percentage
- Chart legend colour adapts to active theme

---

### TASK-07: Dark / Light Mode Toggle
**Status:** ✅ Completed
**Description:** Add a theme toggle that persists across refreshes.
**Deliverables:**
- `applyTheme(dark)` — sets `data-theme` attribute on `<html>`
- Toggle button switches 🌙 / ☀️ icon
- Theme preference saved in localStorage (`ebv_theme`)
- Chart legend and border colour adapts to active theme

---

### TASK-08: Sort Transactions
**Status:** ✅ Completed
**Description:** Allow the user to sort the transaction list.
**Deliverables:**
- Sort buttons: Terbaru (default), Jumlah, Kategori
- `getSortedTransactions()` — returns sorted copy of transactions array
- Active sort button highlighted
- Sort preference persisted in localStorage (`ebv_sort`)

---

### TASK-09: Custom Categories
**Status:** ✅ Completed
**Description:** Let users add their own spending categories.
**Deliverables:**
- ＋ button next to category select opens inline form
- `addCustomCategory()` — validates, assigns colour from palette, saves to localStorage
- New category immediately available in select dropdown and pie chart
- Duplicate name check (case-insensitive)
- Custom categories persist in localStorage (`ebv_categories`)

---

### TASK-10: GitHub Pages Deployment
**Status:** ✅ Completed
**Description:** Publish the site via GitHub Pages.
**Live URL:** [https://fairusfrans.github.io/CodingCamp-26October26-FairusFransMaulanaPambayunSugiarto/](https://fairusfrans.github.io/CodingCamp-26October26-FairusFransMaulanaPambayunSugiarto/)
**Steps:**
1. Commit all files and push to GitHub (`main` branch)
2. Go to repository **Settings → Pages**
3. Set source to `main` branch, root `/`
4. Save — GitHub Pages provides the public URL above
