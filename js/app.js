/* ================================================================
   Expense & Budget Visualizer  ·  app.js
   Vanilla JS — no frameworks.  Data persisted in localStorage.
   ================================================================ */

'use strict';

/* ──────────────────────────────────────────────
   CONSTANTS
   ────────────────────────────────────────────── */

const STORAGE_KEY = 'ebv_transactions';

const CATEGORIES = {
  Food:      { color: '#16f978' },
  Transport: { color: '#3bedf6' },
  Fun:       { color: '#9b55f7' },
};

/* ──────────────────────────────────────────────
   STATE
   ────────────────────────────────────────────── */

let transactions = loadTransactions();
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
const statFoodEl         = document.getElementById('statFood');
const statTransportEl    = document.getElementById('statTransport');
const statFunEl          = document.getElementById('statFun');

const transactionListEl  = document.getElementById('transactionList');
const transactionCountEl = document.getElementById('transactionCount');
const emptyStateEl       = document.getElementById('emptyState');

const chartCanvas        = document.getElementById('spendingChart');
const chartEmptyEl       = document.getElementById('chartEmpty');

/* ──────────────────────────────────────────────
   LOCAL STORAGE
   ────────────────────────────────────────────── */

function loadTransactions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTransactions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
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

  saveTransactions();
  renderAll();
  resetForm();
});

/* ── Validation ── */
function validateForm() {
  let ok = true;

  if (!itemNameInput.value.trim()) {
    showError(itemNameInput, nameError); ok = false;
  } else {
    clearError(itemNameInput, nameError);
  }

  const amt = parseFloat(amountInput.value);
  if (!amountInput.value || isNaN(amt) || amt < 1 || amt > 5000000) {
    showError(amountInput, amountError); ok = false;
  } else {
    clearError(amountInput, amountError);
  }

  if (!categorySelect.value) {
    showError(categorySelect, categoryError); ok = false;
  } else {
    clearError(categorySelect, categoryError);
  }

  return ok;
}

function showError(el, msgEl) {
  el.classList.add('invalid');
  msgEl.classList.add('visible');
}

function clearError(el, msgEl) {
  el.classList.remove('invalid');
  msgEl.classList.remove('visible');
}

/* Live-clear errors as user types */
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
  saveTransactions();
  renderAll();
});

/* ──────────────────────────────────────────────
   CALCULATIONS
   ────────────────────────────────────────────── */

function calcTotals() {
  const totals = { Food: 0, Transport: 0, Fun: 0 };
  let grand = 0;
  transactions.forEach(t => {
    totals[t.category] += t.amount;
    grand += t.amount;
  });
  return { totals, grand };
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
  const { totals, grand } = calcTotals();
  totalBalanceEl.textContent  = fmt(grand);
  statFoodEl.textContent      = fmt(totals.Food);
  statTransportEl.textContent = fmt(totals.Transport);
  statFunEl.textContent       = fmt(totals.Fun);
}

/* ── Transaction List ── */
function renderList() {
  /* remove existing items but keep the empty-state node */
  transactionListEl.querySelectorAll('.transaction-item').forEach(el => el.remove());

  const count = transactions.length;
  transactionCountEl.textContent = count === 1 ? '1 item' : `${count} items`;

  if (count === 0) {
    emptyStateEl.style.display = '';
    return;
  }
  emptyStateEl.style.display = 'none';

  /* newest first */
  [...transactions].reverse().forEach(t => {
    const meta = CATEGORIES[t.category] || { icon: '💸', color: '#9ca3af' };
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
      <button
        class="btn-delete"
        data-id="${t.id}"
        aria-label="Hapus ${escHtml(t.name)}"
        title="Hapus"
      >✕</button>
    `;
    transactionListEl.appendChild(item);
  });
}

/* ── Pie Chart ── */
function renderChart() {
  const { totals } = calcTotals();
  const keys   = Object.keys(CATEGORIES);
  const data   = keys.map(k => totals[k]);
  const hasData = data.some(v => v > 0);

  if (!hasData) {
    chartEmptyEl.classList.add('visible');
    chartCanvas.style.display = 'none';
    if (chart) { chart.destroy(); chart = null; }
    return;
  }

  chartEmptyEl.classList.remove('visible');
  chartCanvas.style.display = 'block';

  const labels = keys.map(k => `${CATEGORIES[k].icon} ${k}`);
  const colors = keys.map(k => CATEGORIES[k].color);

  if (chart) {
    chart.data.datasets[0].data = data;
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
        hoverBackgroundColor: colors.map(c => fadeColor(c, 0.8)),
        borderWidth:          3,
        borderColor:          '#ffffff',
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
            color:         '#1a1b2e',
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

/** Format angka menjadi Rupiah — contoh: Rp 15.000 */
function fmt(value) {
  return 'Rp ' + Math.round(value).toLocaleString('id-ID');
}

/** Escape karakter HTML untuk mencegah XSS */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Konversi hex ke rgba untuk warna hover chart */
function fadeColor(hex, alpha) {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = (n >> 16) & 0xff;
  const g = (n >> 8)  & 0xff;
  const b =  n        & 0xff;
  return `rgba(${r},${g},${b},${alpha})`;
}

/* ──────────────────────────────────────────────
   INIT
   ────────────────────────────────────────────── */

renderAll();
