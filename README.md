# 💰 Expense & Budget Visualizer

A clean, minimal web app to track personal expenses and visualize spending by category — no server, no sign-up, no build step needed.

## 🌐 Live Demo

[https://fairusfrans.github.io/CodingCamp-26October26-FairusFransMaulanaPambayunSugiarto/](https://fairusfrans.github.io/CodingCamp-26October26-FairusFransMaulanaPambayunSugiarto/)

## ✨ Features (MVP)

| Feature | Details |
|---|---|
| **Input Form** | Item name, amount (Rp), category (Food / Transport / Fun) with inline validation |
| **Transaction List** | Scrollable list, newest first, with name, amount, category, and delete button |
| **Total Balance** | Auto-updates at the top whenever a transaction is added or removed |
| **Pie Chart** | Live Chart.js pie chart showing spending distribution by category |
| **LocalStorage** | All data persists across page refreshes — no server needed |

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

## 🛠️ Tech Stack

- **HTML5** — semantic structure
- **CSS3** — custom properties, grid, flexbox, animations
- **Vanilla JavaScript (ES6+)** — zero frameworks
- **[Chart.js v4](https://www.chartjs.org/)** — pie chart (via CDN)
- **localStorage** — client-side persistence

## 🌐 Browser Support

Chrome · Firefox · Edge · Safari (all modern versions)
