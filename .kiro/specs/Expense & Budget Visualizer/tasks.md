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
- Balance card with total amount and per-category stat pills
- Two-column main layout (form + list on the left, chart on the right)
- Add Transaction form with fields: Item Name, Amount, Category
- Custom category inline sub-form (hidden by default)
- Transaction list with sort controls and empty state
- Chart section with canvas element and empty state

---

### TASK-03: Styling (css/style.css)
**Status:** ✅ Completed  
**Description:** Style the entire app in a single CSS file.  
**Deliverables:**
- CSS custom properties for light and dark themes
- Responsive two-column grid (collapses to single column on mobile)
- Balance card with gradient background
- Form styles with focus and validation error states
- Transaction item styles with category colour accent
- Sort bar button styles
- Chart card styles
- Slide-in and fade-in animations
- Mobile breakpoints at 780 px and 480 px

---

### TASK-04: Core Logic — Form & Transactions (js/app.js)
**Status:** ✅ Completed  
**Description:** Implement form submission, validation, and transaction CRUD.  
**Deliverables:**
- `validateForm()` — checks all fields, shows inline errors
- Form submit handler — creates transaction object, saves to localStorage
- `renderList()` — renders sorted transaction items with delete buttons
- Delete handler (event delegation on the list container)
- `saveJSON()` / `loadJSON()` — localStorage helpers

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
- Tooltips show dollar amount and percentage
- Chart re-renders correctly after dark/light mode toggle

---

### TASK-07: Dark / Light Mode Toggle
**Status:** ✅ Completed  
**Description:** Add a theme toggle that persists across refreshes.  
**Deliverables:**
- `applyTheme(dark)` — sets `data-theme` attribute on `<html>`
- Toggle button switches moon/sun icon
- Theme preference saved in localStorage
- Chart legend and tooltip text colour adapts to active theme

---

### TASK-08: Sort Transactions
**Status:** ✅ Completed  
**Description:** Allow the user to sort the transaction list.  
**Deliverables:**
- Sort buttons: Date (default), Amount, Category
- `getSortedTransactions()` — returns sorted copy of transactions array
- Active sort button highlighted
- Sort preference persisted in localStorage

---

### TASK-09: Custom Categories
**Status:** ✅ Completed  
**Description:** Let users add their own spending categories.  
**Deliverables:**
- ＋ button next to category select opens inline form
- `addCustomCategory()` — validates, assigns colour from palette, saves to localStorage
- New category immediately available in select dropdown and pie chart
- Duplicate name check (case-insensitive)

---

### TASK-10: GitHub Pages Deployment
**Status:** ✅ Completed  
**Description:** Publish the site via GitHub Pages.  
**Live URL:** [https://fairusfrans.github.io/CodingCamp-26October26-FairusFransMaulanaPambayunSugiarto/]
**Steps:**
1. Commit all files and push to GitHub (`main` branch)
2. Go to repository **Settings → Pages**
3. Set source to `main` branch, root `/`
4. Save — GitHub will provide a public URL
5. Update the live demo link in `README.md`
