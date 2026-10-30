/* ================================================================
   Expense & Budget Visualizer  ·  app.js
   Vanilla JS — no frameworks.  Data persisted in localStorage.

   Optional Challenges:
     ✅  Custom categories
     ✅  Sort transactions (terbaru / jumlah / kategori)
     ✅  Dark / light mode toggle
   ================================================================ */

'use strict';

/* ──────────────────────────────────────────────
   CONSTANTS
   ────────────────────────────────────────────── */

const STORAGE_KEYS = {
  TRANSACTIONS: 'ebv_transactions',
  CATEGORIES:   'ebv_categories',
  SORT:         'ebv_sort',
  THEME:        'ebv_theme',
};

const DEFAULT_CATEGORIES = [
  { name: 'Food',      icon: '🍔', color: '#f97316' },
  { name: 'Transport', icon: '🚌', color: '#3b82f6' },
  { name: 'Fun',       icon: '🎉', color: '#a855f7' },
];

const CUSTOM_PALETTE = [
  '#10b981', '#ec4899', '#f59e0b', '#06b6d4',
  '#84cc16', '#6366f1', '#14b8a6', '#f43f5e',
];

/* ──────────────────────────────────────────────
   PERSISTENCE HELPERS
   ────────────────────────────────────────────── */

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* ──────────────────────────────────────────────
   STATE
   ────────────────────────────────────────────── */

let transactions = loadJSON(STORAGE_KEYS.TRANSACTIONS, []);
let categories   = loadJSON(STORAGE_KEYS.CATEGORIES,   DEFAULT_CATEGORIES);
let currentSort  = localStorage.getItem(STORAGE_KEYS.SORT)  || 'date';
let isDark       = localStorage.getItem(STORAGE_KEYS.THEME) === 'dark';
let chart        = null;

/* ──────────────────────────────────────────────
   DOM REFERENCES
   ────────────────────────────────────────────── */

const form               = document.getElementById('transactionForm');
const itemNameInput      = document.getElementById('itemName');
const amountInput        = document.getElementById('amount');
const categorySelect     = document.getElementById('category');

const nameError          = document.getElementById('nameError');
const amountError        = document.getElementById('amountError');
const categoryError      = document.getElementById('categoryError');

const totalBalanceEl     = document.getElementById('totalBalance');
const balanceStatsEl     = document.getElementById('balanceStats');

const transactionListEl  = document.getElementById('transactionList');
const transactionCountEl = document.getElementById('transactionCount');
const emptyStateEl       = document.getElementById('emptyState');

const chartCanvas        = document.getElementById('spendingChart');
const chartEmptyEl       = document.getElementById('chartEmpty');

const themeToggleBtn        = document.getElementById('themeToggle');
const sortBtns              = document.querySelectorAll('.btn-sort');
const openAddCategoryBtn    = document.getElementById('openAddCategory');
const cancelAddCategoryBtn  = document.getElementById('cancelAddCategory');
const confirmAddCategoryBtn = document.getElementById('confirmAddCategory');
const customCategoryForm    = document.getElementById('customCategoryForm');
const newCategoryNameInput  = document.getElementById('newCategoryName');
const newCategoryErrorEl    = document.getElementById('newCategoryError');

/* ──────────────────────────────────────────────
   DARK / LIGHT MODE TOGGLE
   ────────────────────────────────────────────── */

function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeToggleBtn.querySelector('.theme-icon').textContent = dark ? '☀️' : '🌙';
}

themeToggleBtn.addEventListener('click', () => {
  isDark = !isDark;
  applyTheme(isDark);
  localStorage.setItem(STORAGE_KEYS.THEME, isDark ? 'dark' : 'light');
  /* rebuild chart so legend colour updates */
  if (chart) { chart.destroy(); chart = null; }
  renderChart();
});

/* ──────────────────────────────────────────────
   CUSTOM CATEGORIES
   ────────────────────────────────────────────── */

function getCategoryMeta(name) {
  return categories.find(c => c.name === name) || { icon: '🏷️', color: '#9ca3af' };
}

function populateCategorySelect() {
  categorySelect.innerHTML = '<option value="">— Pilih kategori —</option>';
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value       = cat.name;
    opt.textContent = `${cat.icon} ${cat.name}`;
    categorySelect.appendChild(opt);
  });
}

function openCustomCategoryForm() {
  customCategoryForm.classList.add('open');
  customCategoryForm.setAttribute('aria-hidden', 'false');
  newCategoryNameInput.value = '';
  newCategoryErrorEl.classList.remove('visible');
  newCategoryNameInput.focus();
}

function closeCustomCategoryForm() {
  customCategoryForm.classList.remove('open');
  customCategoryForm.setAttribute('aria-hidden', 'true');
}

function addCustomCategory() {
  const name = newCategoryNameInput.value.trim();

  if (!name) {
    newCategoryErrorEl.textContent = 'Masukkan nama kategori.';
    newCategoryErrorEl.classList.add('visible');
    return;
  }

  if (categories.some(c => c.name.toLowerCase() === name.toLowerCase())) {
    newCategoryErrorEl.textContent = 'Kategori sudah ada.';
    newCategoryErrorEl.classList.add('visible');
    return;
  }

  const customCount = categories.length - DEFAULT_CATEGORIES.length;
  const color = CUSTOM_PALETTE[customCount % CUSTOM_PALETTE.length];

  categories.push({ name, icon: '🏷️', color });
  saveJSON(STORAGE_KEYS.CATEGORIES, categories);

  populateCategorySelect();
  categorySelect.value = name;
  closeCustomCategoryForm();
  clearError(categorySelect, categoryError);
}

openAddCategoryBtn.addEventListener('click', openCustomCategoryForm);
cancelAddCategoryBtn.addEventListener('click', closeCustomCategoryForm);
confirmAddCategoryBtn.addEventListener('click', addCustomCategory);

newCategoryNameInput.addEventListener('keydown', e => {
  if (e.key === 'Enter')  { e.preventDefault(); addCustomCategory(); }
  if (e.key === 'Escape') closeCustomCategoryForm();
});

/* ──────────────────────────────────────────────
   SORT
   ────────────────────────────────────────────── */

sortBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentSort = btn.dataset.sort;
    localStorage.setItem(STORAGE_KEYS.SORT, currentSort);
    sortBtns.forEach(b => {
      b.classList.toggle('active', b.dataset.sort === currentSort);
      b.setAttribute('aria-pressed', b.dataset.sort === currentSort ? 'true' : 'false');
    });
    renderList();
  });
});

function getSortedTransactions() {
  const copy = [...transactions];
  switch (currentSort) {
    case 'amount':   return copy.sort((a, b) => b.amount - a.amount);
    case 'category': return copy.sort((a, b) => a.category.localeCompare(b.category));
    default:         return copy.sort((a, b) => b.id - a.id); /* terbaru */
  }
}

/* ──────────────────────────────────────────────
   FORM SUBMISSION
   ────────────────────────────────────────────── */

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!validateForm()) return;

  transactions.push({
    id:       Date.now(),
    name:     itemNameInput.value.trim(),
    amount:   Math.round(parseFloat(amountInput.value)),
    category: categorySelect.value,
  });

  saveJSON(STORAGE_KEYS.TRANSACTIONS, transactions);
  renderAll();
  resetForm();
});

function validateForm() {
  let ok = true;

  if (!itemNameInput.value.trim()) {
    showError(itemNameInput, nameError); ok = false;
  } else { clearError(itemNameInput, nameError); }

  const amt = parseFloat(amountInput.value);
  if (!amountInput.value || isNaN(amt) || amt < 1 || amt > 5000000) {
    showError(amountInput, amountError); ok = false;
  } else { clearError(amountInput, amountError); }

  if (!categorySelect.value) {
    showError(categorySelect, categoryError); ok = false;
  } else { clearError(categorySelect, categoryError); }

  return ok;
}

function showError(el, msgEl) { el.classList.add('invalid');    msgEl.classList.add('visible'); }
function clearError(el, msgEl){ el.classList.remove('invalid'); msgEl.classList.remove('visible'); }

itemNameInput.addEventListener('input',   () => clearError(itemNameInput,  nameError));
amountInput.addEventListener('input',     () => clearError(amountInput,    amountError));
categorySelect.addEventListener('change', () => clearError(categorySelect, categoryError));

function resetForm() {
  form.reset();
  [itemNameInput, amountInput, categorySelect].forEach(el => el.classList.remove('invalid'));
  [nameError, amountError, categoryError].forEach(el => el.classList.remove('visible'));
}

/* ──────────────────────────────────────────────
   DELETE
   ────────────────────────────────────────────── */

transactionListEl.addEventListener('click', e => {
  const btn = e.target.closest('.btn-delete');
  if (!btn) return;
  transactions = transactions.filter(t => t.id !== parseInt(btn.dataset.id, 10));
  saveJSON(STORAGE_KEYS.TRANSACTIONS, transactions);
  renderAll();
});

/* ──────────────────────────────────────────────
   CALCULATIONS
   ────────────────────────────────────────────── */

function calcTotals() {
  const byCategory = {};
  let grand = 0;
  transactions.forEach(t => {
    byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
    grand += t.amount;
  });
  return { byCategory, grand };
}

/* ──────────────────────────────────────────────
   RENDER
   ────────────────────────────────────────────── */

function renderAll() {
  renderBalance();
  renderList();
  renderChart();
}

/* ── Balance ── */
function renderBalance() {
  const { byCategory, grand } = calcTotals();
  totalBalanceEl.textContent = fmt(grand);

  balanceStatsEl.innerHTML = '';
  categories.forEach(cat => {
    const amt = byCategory[cat.name] || 0;
    if (amt === 0) return;
    const pill = document.createElement('div');
    pill.className = 'stat-pill';
    pill.innerHTML = `
      <span class="stat-pill-label">${escHtml(cat.icon)} ${escHtml(cat.name)}</span>
      <span class="stat-pill-value">${fmt(amt)}</span>
    `;
    balanceStatsEl.appendChild(pill);
  });
}

/* ── Transaction List ── */
function renderList() {
  transactionListEl.querySelectorAll('.transaction-item').forEach(el => el.remove());

  const count = transactions.length;
  transactionCountEl.textContent = count === 1 ? '1 item' : `${count} items`;

  if (count === 0) { emptyStateEl.style.display = ''; return; }
  emptyStateEl.style.display = 'none';

  getSortedTransactions().forEach(t => {
    const meta = getCategoryMeta(t.category);
    const item = document.createElement('div');
    item.className = 'transaction-item';
    item.setAttribute('role', 'listitem');
    item.style.borderLeftColor = meta.color;
    item.innerHTML = `
      <span class="item-icon" aria-hidden="true">${meta.icon}</span>
      <div class="item-details">
        <div class="item-name" title="${escHtml(t.name)}">${escHtml(t.name)}</div>
        <div class="item-category">${escHtml(t.category)}</div>
      </div>
      <span class="item-amount">${fmt(t.amount)}</span>
      <button class="btn-delete" data-id="${t.id}" aria-label="Hapus ${escHtml(t.name)}" title="Hapus">✕</button>
    `;
    transactionListEl.appendChild(item);
  });
}

/* ── Pie Chart ── */
function renderChart() {
  const { byCategory } = calcTotals();
  const active  = categories.filter(c => (byCategory[c.name] || 0) > 0);
  const hasData = active.length > 0;

  if (!hasData) {
    chartEmptyEl.classList.add('visible');
    chartCanvas.style.display = 'none';
    if (chart) { chart.destroy(); chart = null; }
    return;
  }

  chartEmptyEl.classList.remove('visible');
  chartCanvas.style.display = 'block';

  const labels    = active.map(c => `${c.icon} ${c.name}`);
  const data      = active.map(c => byCategory[c.name] || 0);
  const colors    = active.map(c => c.color);
  const textColor = isDark ? '#e8eaf6' : '#1a1b2e';

  if (chart) {
    chart.data.labels                              = labels;
    chart.data.datasets[0].data                   = data;
    chart.data.datasets[0].backgroundColor        = colors;
    chart.data.datasets[0].borderColor            = isDark ? '#1a1d27' : '#ffffff';
    chart.options.plugins.legend.labels.color     = textColor;
    chart.update('active');
    return;
  }

  chart = new Chart(chartCanvas, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor:      colors,
        hoverBackgroundColor: colors.map(c => fadeColor(c, .8)),
        borderWidth:          3,
        borderColor:          isDark ? '#1a1d27' : '#ffffff',
        hoverBorderWidth:     3,
      }],
    },
    options: {
      responsive:          true,
      maintainAspectRatio: true,
      animation: { animateRotate: true, duration: 450 },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding:       16,
            color:         textColor,
            usePointStyle: true,
            pointStyle:    'circle',
            font: { size: 12, weight: '600', family: 'Segoe UI, system-ui, sans-serif' },
          },
        },
        tooltip: {
          callbacks: {
            label(ctx) {
              const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
              const pct   = total > 0 ? ((ctx.parsed / total) * 100).toFixed(1) : 0;
              return ` ${fmt(ctx.parsed)}  (${pct}%)`;
            },
          },
        },
      },
    },
  });
}

/* ──────────────────────────────────────────────
   UTILITIES
   ────────────────────────────────────────────── */

/** Format angka ke Rupiah — Rp 15.000 (aman di semua browser) */
function fmt(value) {
  const rounded = Math.round(value);
  return 'Rp ' + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/** Escape HTML untuk mencegah XSS */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Hex → rgba untuk hover chart */
function fadeColor(hex, alpha) {
  const n = parseInt(hex.replace('#', ''), 16);
  return `rgba(${(n >> 16) & 0xff},${(n >> 8) & 0xff},${n & 0xff},${alpha})`;
}

/* ──────────────────────────────────────────────
   INIT
   ────────────────────────────────────────────── */

applyTheme(isDark);

sortBtns.forEach(b => {
  b.classList.toggle('active', b.dataset.sort === currentSort);
  b.setAttribute('aria-pressed', b.dataset.sort === currentSort ? 'true' : 'false');
});

populateCategorySelect();
renderAll();
