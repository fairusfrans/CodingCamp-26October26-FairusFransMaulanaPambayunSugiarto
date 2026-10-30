# 💰 Expense & Budget Visualizer

A clean, minimal web app to track personal expenses and visualize spending by category — no server, no sign-up, no build step needed.

## 🌐 Live Demo

[https://fairusfrans.github.io/CodingCamp-26October26-FairusFransMaulanaPambayunSugiarto/](https://fairusfrans.github.io/CodingCamp-26October26-FairusFransMaulanaPambayunSugiarto/)

---

## ✨ Features (MVP)

| Feature | Details |
|---|---|
| **Input Form** | Item name, amount (Rp), category select with inline validation |
| **Transaction List** | Scrollable list with name, amount, category, and delete button |
| **Total Balance** | Auto-updates at the top whenever a transaction is added or removed |
| **Pie Chart** | Live Chart.js pie chart showing spending distribution by category |
| **LocalStorage** | All data persists across page refreshes — no server needed |

---

## 🌟 Optional Challenges (3 / 5 implemented)

### 1 · Allow users to add custom categories
- Click the **＋** button next to the category dropdown to open an inline form
- Enter a name for the new category (duplicate check included)
- New category is instantly available in the dropdown, pie chart, and balance pills
- Custom categories are saved to `localStorage` under `ebv_categories`

### 2 · Sort transactions by amount or category
- Sort bar below the "Transactions" heading with three pill buttons:
  - **Terbaru** — newest first (default, sorted by timestamp)
  - **Jumlah** — highest amount first
  - **Kategori** — alphabetical A → Z
- Active sort is highlighted and persisted in `localStorage` under `ebv_sort`

### 3 · Dark / light mode toggle
- 🌙 / ☀️ button in the top-right corner of the header
- Switches the entire UI between light and dark theme instantly
- Uses CSS custom properties on `[data-theme="dark"]` for a smooth transition
- Preference is saved to `localStorage` under `ebv_theme` and restored on reload

---

## 🗂️ Project Structure

```
├── index.html        ← App markup
├── css/
│   └── style.css     ← All styles (single file, light + dark theme)
├── js/
│   └── app.js        ← All logic (single file, vanilla JS)
└── README.md
```

---

## 🚀 Getting Started

1. Clone or download this repository.
2. Open `index.html` directly in any modern browser — no build step, no install needed.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 (semantic) |
| Styling | CSS3 — custom properties, grid, flexbox, animations |
| Logic | Vanilla JavaScript (ES6+) — zero frameworks |
| Chart | [Chart.js v4](https://www.chartjs.org/) via CDN |
| Storage | Browser `localStorage` |

---

## 🌐 Browser Support

Chrome · Firefox · Edge · Safari (all modern versions)

---

## 📦 localStorage Keys

| Key | Contents |
|---|---|
| `ebv_transactions` | Array of transaction objects `{ id, name, amount, category }` |
| `ebv_categories` | Array of category objects `{ name, icon, color }` |
| `ebv_sort` | Active sort mode: `"date"` \| `"amount"` \| `"category"` |
| `ebv_theme` | Active theme: `"light"` \| `"dark"` |
