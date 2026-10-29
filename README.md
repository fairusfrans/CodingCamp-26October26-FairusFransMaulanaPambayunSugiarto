# 💰 Expense & Budget Visualizer

A clean, minimal web app to track personal expenses and visualize spending by category — no server, no sign-up, no build step needed.

## ✨ Features

### Required (MVP)
| Feature | Details |
|---|---|
| **Input Form** | Item name, amount, category (Food / Transport / Fun) with inline validation |
| **Transaction List** | Scrollable list with name, amount, category, and one-click delete |
| **Total Balance** | Auto-updates at the top whenever a transaction is added or removed |
| **Pie Chart** | Live Chart.js chart showing spending distribution by category |
| **LocalStorage** | All data persists across page refreshes — no server needed |

### Optional Challenges (3 / 5 implemented)
| Challenge | Details |
|---|---|
| ✅ **Custom Categories** | Click ＋ next to the category selector to add your own categories (e.g. Health, Shopping) |
| ✅ **Sort Transactions** | Sort the transaction list by **Date**, **Amount**, or **Category** |
| ✅ **Dark / Light Mode** | Toggle button in the top-right corner; preference saved in localStorage |

## 🗂️ Project Structure

```
├── index.html        ← App markup
├── css/
│   └── style.css     ← All styles (single file)
├── js/
│   └── app.js        ← All logic (single file, vanilla JS)
└── README.md
```

## 🚀 Getting Started

1. Clone or download this repository.
2. Open `index.html` directly in any modern browser — no build step, no install needed.

## 🌐 Live Demo

Deployed via **GitHub Pages**: [View Site](https://github.com/fairusfrans/CodingCamp-26October26-FairusFransMaulanaPambayunSugiarto)  
*(Update this link after publishing to GitHub Pages)*

## 🛠️ Tech Stack

- **HTML5** — semantic structure  
- **CSS3** — custom properties, grid, flexbox, animations  
- **Vanilla JavaScript (ES6+)** — zero frameworks  
- **[Chart.js v4](https://www.chartjs.org/)** — pie chart (via CDN)  
- **localStorage** — client-side persistence  

## 🌐 Browser Support

Chrome · Firefox · Edge · Safari (all modern versions)
