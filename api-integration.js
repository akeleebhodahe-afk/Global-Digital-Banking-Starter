const apiBaseUrl = (window.GLOBALBANK_API_BASE_URL || 'http://127.0.0.1:4000').replace(/\/$/, '');
let syncToken = 0;

async function getJson(path) {
  const response = await fetch(`${apiBaseUrl}${path}`, { headers: { Accept: 'application/json' } });
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error(payload?.error?.message || `Request failed: ${response.status}`);
    error.code = payload?.error?.code || 'REQUEST_FAILED';
    error.requestId = payload?.error?.requestId || response.headers.get('x-request-id');
    throw error;
  }
  return payload;
}

function setApiStatus(message, type = 'info') {
  let status = document.querySelector('#api-status');
  if (!status) {
    status = document.createElement('div');
    status.id = 'api-status';
    status.className = 'container api-status';
    document.querySelector('#main-content')?.prepend(status);
  }
  status.dataset.type = type;
  status.setAttribute('role', type === 'warning' ? 'alert' : 'status');
  status.textContent = message;
}

function clearApiStatus() { document.querySelector('#api-status')?.remove(); }
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[character])); }
function apiCard(item, action = '') { return `<article class="feature-card"><span class="card-icon">▤</span><h3>${escapeHtml(item.title || item.name)}</h3><p>${escapeHtml(item.excerpt || item.description || '')}</p>${action}</article>`; }
function isCurrent(token) { return token === syncToken; }

async function syncKnowledge(token) {
  const grid = document.querySelector('.article-grid'); if (!grid) return;
  setApiStatus('Loading knowledge from the GlobalBank API…');
  try { const result = await getJson('/api/knowledge'); if (!isCurrent(token)) return; grid.innerHTML = result.data.map(item => apiCard(item, `<a href="/resources" data-route>Explore resources →</a>`)).join(''); clearApiStatus(); }
  catch (error) { if (isCurrent(token)) setApiStatus(`Knowledge is currently using the local preview. ${error.message}`, 'warning'); }
}

async function syncResources(token) {
  const list = document.querySelector('.resource-list'); if (!list) return;
  setApiStatus('Loading resources from the GlobalBank API…');
  try { const result = await getJson('/api/resources'); if (!isCurrent(token)) return; list.innerHTML = result.data.map(item => `<a href="${escapeHtml(item.href)}" data-route><span>${escapeHtml(item.type)}</span><strong>${escapeHtml(item.title)}</strong><em>Explore →</em></a>`).join(''); clearApiStatus(); }
  catch (error) { if (isCurrent(token)) setApiStatus(`Resources are currently using the local preview. ${error.message}`, 'warning'); }
}

async function syncMembership(token) {
  const grid = document.querySelector('.pricing-grid'); if (!grid) return;
  setApiStatus('Loading membership plans from the GlobalBank API…');
  try { const result = await getJson('/api/membership/plans'); if (!isCurrent(token)) return; grid.innerHTML = result.data.map((plan, index) => `<div class="price-card ${index === 1 ? 'featured' : ''}"><span class="eyebrow">${escapeHtml(plan.code)}</span><h2>${escapeHtml(plan.name)}</h2><p>${escapeHtml(plan.description)}</p><strong>${escapeHtml(plan.priceDisplay)}</strong><ul>${plan.features.map(feature => `<li>${escapeHtml(feature)}</li>`).join('')}</ul><a href="/contact" data-route class="button ${index === 1 ? '' : 'button-ghost'}">Learn more</a></div>`).join(''); clearApiStatus(); }
  catch (error) { if (isCurrent(token)) setApiStatus(`Membership plans are currently using the local preview. ${error.message}`, 'warning'); }
}

async function syncDashboard(token) {
  const dashboard = document.querySelector('.dashboard-grid'); if (!dashboard) return;
  setApiStatus('Loading prototype dashboard data from the GlobalBank API…');
  try {
    const [profile, accounts, transfers] = await Promise.all([getJson('/api/demo/profile'), getJson('/api/demo/accounts'), getJson('/api/demo/transfers')]);
    if (!isCurrent(token)) return;
    const balance = accounts.data[0]?.balanceDisplay || '—';
    const activity = transfers.data.map(transfer => `<div class="activity-row"><span>${escapeHtml(transfer.beneficiaryLabel)}</span><strong>${escapeHtml(transfer.sourceAmountDisplay)}</strong></div>`).join('');
    dashboard.innerHTML = `<div class="dashboard-card balance"><span class="eyebrow">TOTAL BALANCE · ${escapeHtml(profile.data.status)}</span><strong>${escapeHtml(balance)}</strong><span class="positive">Display-only preview</span></div><div class="dashboard-card"><span class="eyebrow">ACCOUNTS · ${accounts.meta.count}</span>${accounts.data.map(account => `<div class="activity-row"><span>${escapeHtml(account.name)}<small>${escapeHtml(account.maskedNumber)} · ${escapeHtml(account.currency)}</small></span><strong>${escapeHtml(account.balanceDisplay)}</strong></div>`).join('')}</div><div class="dashboard-card"><span class="eyebrow">TRANSFER ACTIVITY · ${transfers.meta.count}</span>${activity || '<p class="muted">No preview activity.</p>'}</div>`;
    setApiStatus('Prototype data loaded. No real accounts, balances, or transfers are connected.', 'demo');
  } catch (error) { if (isCurrent(token)) setApiStatus(`Dashboard is currently using the local preview. ${error.message}`, 'warning'); }
}

function syncPageFromApi() {
  const token = ++syncToken;
  const path = window.location.pathname;
  if (path === '/knowledge') syncKnowledge(token);
  else if (path === '/resources') syncResources(token);
  else if (path === '/membership') syncMembership(token);
  else if (path === '/dashboard') syncDashboard(token);
  else clearApiStatus();
}

window.addEventListener('load', syncPageFromApi);
window.addEventListener('popstate', () => setTimeout(syncPageFromApi, 0));
new MutationObserver(() => {
  if (document.querySelector('#main-content')) syncPageFromApi();
}).observe(document.querySelector('#app'), { childList: true });
