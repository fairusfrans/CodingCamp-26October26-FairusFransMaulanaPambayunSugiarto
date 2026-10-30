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
- App header with title
- Balance card with total amount and per-category stat pills (Food, Transport, Fun)
- Two-column main layout (form + list on the left, chart on the right)
- Add Transaction form with fields: Item Name, Amount (Rp), Category
- Transaction list with empty state
- Chart section with canvas element and empty state

---

### TASK-03: Styling (css/style.css)
**Status:** ✅ Completed
**Description:** Style the entire app in a single CSS file, light mode only.
**Deliverables:**
- CSS custom properties for light theme
- Responsive two-column grid (collapses to single column on mobile)
- Balance card with purple gradient background
- Form styles with focus and validation error states
- Transaction item styles with category colour accent on left border
- Slide-in animation for new items
- Mobile breakpoints at 780px and 480px

---

### TASK-04: Core Logic — Form & Transactions (js/app.js)
**Status:** ✅ Completed
**Description:** Implement form submission, validation, and transaction CRUD.
**Deliverables:**
- `validateForm()` — checks all fields, shows inline errors
- Form submit handler — creates transaction object, saves to localStorage
- `renderList()` — renders transaction items (newest first) with delete buttons
- Delete handler (event delegation on the list container)
- `loadTransactions()` / `saveTransactions()` — localStorage helpers

---

### TASK-05: Total Balance Display
**Status:** ✅ Completed
**Description:** Calculate and display live totals.
**Deliverables:**
- `calcTotals()` — sums grand total and per-category totals
- `renderBalance()` — updates balance amount and 3 category stat pills
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

---

### TASK-07: Currency Format (Rupiah)
**Status:** ✅ Completed
**Description:** Display all amounts in Indonesian Rupiah format.
**Deliverables:**
- `fmt()` — manual thousand-separator formatting (e.g. Rp 15.000)
- Does not use `toLocaleString('id-ID')` — safe across all browsers and OS

---

### TASK-08: GitHub Pages Deployment
**Status:** ✅ Completed
**Description:** Publish the site via GitHub Pages.
**Live URL:** [https://fairusfrans.github.io/CodingCamp-26October26-FairusFransMaulanaPambayunSugiarto/](https://fairusfrans.github.io/CodingCamp-26October26-FairusFransMaulanaPambayunSugiarto/)
**Steps:**
1. Commit all files and push to GitHub (`main` branch)
2. Go to repository **Settings → Pages**
3. Set source to `main` branch, root `/`
4. Save — GitHub will provide a public URL
