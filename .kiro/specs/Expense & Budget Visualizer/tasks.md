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
- `<html data-theme="light">` for theme switching
- App header with title + 🌙 dark mode toggle button (`id="themeToggle"`)
- Balance card with total amount (`id="totalBalance"`) and dynamic stat pills (`id="balanceStats"`)
- Two-column main layout (form + list left, chart right)
- Add Transaction form: Item Name, Amount (Rp), Category `<select>` + ＋ button (`id="openAddCategory"`)
- Custom category inline sub-form (`id="customCategoryForm"`, hidden by default, shown via `.open` class)
- Transaction list with sort bar (Terbaru / Jumlah / Kategori via `.btn-sort`) and empty state
- Chart section with `<canvas id="spendingChart">` and empty state fallback

---

### TASK-03: Styling (css/style.css)
**Status:** ✅ Completed
**Description:** Style the entire app in a single CSS file with light and dark theme.
**Deliverables:**
- `:root` CSS variables — light theme (default)
- `[data-theme="dark"]` CSS variables — dark theme override
- `body` transition for smooth theme switching
- Responsive two-column grid → single column at 780px
- Purple gradient balance card
- Form focus, validation error, and invalid states
- `.category-row` flex layout for select + ＋ button
- `.custom-category-form` hidden/open via `.open` class with `fadeIn` animation
- `.sort-bar` pill buttons with `.active` state
- `.transaction-item` with colour accent `border-left`, `slideIn` animation
- `.btn-theme` circular toggle button
- Mobile breakpoints at 780px and 480px

---

### TASK-04: Core Logic — Form & Transactions (js/app.js)
**Status:** ✅ Completed
**Description:** Implement form submission, validation, and transaction CRUD.
**Deliverables:**
- `validateForm()` — checks all fields, shows inline errors per field
- Form `submit` handler — builds transaction object `{ id, name, amount, category }`, saves to `ebv_transactions`
- `renderList()` — renders sorted transaction items with delete buttons
- Delete via event delegation on `.transaction-list`
- `loadJSON()` / `saveJSON()` — localStorage read/write helpers

---

### TASK-05: Total Balance Display
**Status:** ✅ Completed
**Description:** Calculate and display live totals.
**Deliverables:**
- `calcTotals()` — returns grand total + per-category breakdown
- `renderBalance()` — updates `#totalBalance` and injects category stat pills into `#balanceStats`
- Auto-updates on every add and delete

---

### TASK-06: Pie Chart (Chart.js)
**Status:** ✅ Completed
**Description:** Render and update a pie chart of spending by category.
**Deliverables:**
- `renderChart()` — creates or updates Chart.js v4 pie instance
- Only renders when ≥1 transaction exists; shows empty state otherwise
- Chart colours match each category's accent colour
- Tooltips show Rp amount + percentage
- Chart legend and border colour respond to active theme

---

### TASK-07: Dark Mode Toggle
**Status:** ✅ Completed
**Description:** Add a dark/light mode toggle that persists across refreshes.
**Optional Challenge #3 from brief.**
**Deliverables:**
- `applyTheme(dark)` — sets `data-theme` attribute on `<html>`
- Toggle button switches 🌙 ↔ ☀️ icon
- Preference saved to `ebv_theme` in localStorage and restored on page load
- Chart destroyed and rebuilt on toggle so legend/border colours update correctly
- All UI components (form, list, chart, header, balance card) respond to theme via CSS variables

---

### TASK-08: Sort Transactions
**Status:** ✅ Completed
**Description:** Allow the user to sort the transaction list by amount or category.
**Optional Challenge #2 from brief.**
**Deliverables:**
- Three sort pill buttons in `.sort-bar`:
  - **Terbaru** (`data-sort="date"`) — newest first, default
  - **Jumlah** (`data-sort="amount"`) — highest amount first
  - **Kategori** (`data-sort="category"`) — alphabetical A → Z
- `getSortedTransactions()` returns a sorted copy without mutating state
- Active button highlighted via `.active` class + `aria-pressed` attribute
- Sort preference saved to `ebv_sort` in localStorage and restored on page load

---

### TASK-09: Custom Categories
**Status:** ✅ Completed
**Description:** Let users add their own spending categories beyond the 3 defaults.
**Optional Challenge #1 from brief.**
**Deliverables:**
- ＋ button (`id="openAddCategory"`) beside category `<select>` opens inline sub-form
- `addCustomCategory()` — validates name, checks for duplicates (case-insensitive), assigns colour from `CUSTOM_PALETTE` (8 rotating colours)
- Batal button and Escape key close the form without saving
- Enter key in name input triggers save
- New category appears immediately in `<select>`, pie chart, and balance pills
- Custom categories (+ defaults) persisted to `ebv_categories` in localStorage

---

### TASK-10: GitHub Pages Deployment
**Status:** ✅ Completed
**Description:** Publish the site via GitHub Pages.
**Live URL:** [https://fairusfrans.github.io/CodingCamp-26October26-FairusFransMaulanaPambayunSugiarto/](https://fairusfrans.github.io/CodingCamp-26October26-FairusFransMaulanaPambayunSugiarto/)
**Steps:**
1. Commit all files and push to GitHub (`main` branch)
2. Go to repository **Settings → Pages**
3. Set source: `main` branch, root `/`
4. Save — GitHub Pages publishes the live URL above
