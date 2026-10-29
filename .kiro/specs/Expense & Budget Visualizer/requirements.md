# Requirements — Expense & Budget Visualizer

## Technical Constraints

### TC-1: Technology Stack
- HTML for structure
- CSS for styling
- Vanilla JavaScript (no frameworks like React, Vue, etc.)
- No backend server required

### TC-2: Data Storage
- Use browser Local Storage API
- All data stored client-side only

### TC-3: Browser Compatibility
- Must work in modern browsers (Chrome, Firefox, Edge, Safari)
- Can be used as a standalone web app or browser extension

---

## Non-Functional Requirements

### NFR-1: Simplicity
- Clean, minimal interface
- Easy to understand and use
- No complex setup required
- No test setup required

### NFR-2: Performance
- Fast load time
- Responsive UI interactions
- No noticeable lag when updating data

### NFR-3: Visual Design
- User-friendly aesthetic
- Clear visual hierarchy
- Readable typography

---

## Folder Rules
- Only **1 CSS file** inside `css/`
- Only **1 JavaScript file** inside `js/`
- Keep code clean and readable

---

## Required Features (MVP)

### FR-1: Input Form
- Fields: Item Name, Amount, Category (Food, Transport, Fun)
- Adds a transaction to the list on submit
- Validates that all fields are filled before submitting

### FR-2: Transaction List
- Scrollable list of all added transactions
- Each item shows: name, amount, and category
- Each item has a delete button to remove it

### FR-3: Total Balance
- Displays total spending balance at the top of the page
- Updates automatically whenever a transaction is added or deleted

### FR-4: Visual Chart
- Pie chart showing spending distribution by category
- Chart updates automatically when transactions change
- Implemented using Chart.js (loaded via CDN)

---

## Optional Challenges (Implemented: 3 / 5)

| # | Challenge | Status |
|---|---|---|
| 1 | Allow users to add custom categories | ✅ Done |
| 2 | Sort transactions by amount or category | ✅ Done |
| 3 | Dark / light mode toggle | ✅ Done |
| 4 | Export data to CSV | — |
| 5 | Budget limit warnings per category | — |

---

## Deployment
- Source: GitHub repository
- Host: GitHub Pages
- Branch: `main`, root `/`
