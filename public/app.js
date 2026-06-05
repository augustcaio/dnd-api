const ENDPOINTS = [
  { section: 'Status', items: [
    { method: 'GET', path: '/api/health', label: 'Status da API', status: 'live' },
  ]},
  { section: 'Mundo', items: [
    { method: 'GET', path: '/api/deities', label: 'Divindades', status: 'live' },
    { method: 'GET', path: '/api/deities/:id', label: 'Divindade por ID', status: 'live', params: [{ name: 'id', eg: '1' }] },
    { method: 'GET', path: '/api/planes', label: 'Planos de existência', status: 'live' },
    { method: 'GET', path: '/api/planes/:id', label: 'Plano por ID', status: 'live', params: [{ name: 'id', eg: '1' }] },
  ]},
  { section: 'Tesouro', items: [
    { method: 'GET', path: '/api/items', label: 'Itens mágicos', status: 'soon' },
    { method: 'GET', path: '/api/items/artifacts', label: 'Artefatos', status: 'soon' },
    { method: 'GET', path: '/api/treasures/gems', label: 'Gemas', status: 'soon' },
    { method: 'GET', path: '/api/treasures/art-objects', label: 'Objetos de arte', status: 'soon' },
  ]},
  { section: 'Ameaças', items: [
    { method: 'GET', path: '/api/hazards/poisons', label: 'Venenos', status: 'soon' },
    { method: 'GET', path: '/api/hazards/diseases', label: 'Doenças', status: 'soon' },
    { method: 'GET', path: '/api/hazards/madness', label: 'Loucura', status: 'soon' },
    { method: 'GET', path: '/api/monsters/list', label: 'Monstros', status: 'soon' },
    { method: 'GET', path: '/api/monsters/stats-by-cr', label: 'Estatísticas por ND', status: 'soon' },
  ]},
  { section: 'Regras', items: [
    { method: 'GET', path: '/api/rules/ability-checks', label: 'Testes de habilidade', status: 'soon' },
    { method: 'GET', path: '/api/rules/difficulty-classes', label: 'Classes de dificuldade', status: 'soon' },
    { method: 'GET', path: '/api/rules/saving-throws', label: 'Testes de resistência', status: 'soon' },
    { method: 'GET', path: '/api/rules/xp-by-cr', label: 'XP por ND', status: 'soon' },
    { method: 'GET', path: '/api/rules/siege-weapons', label: 'Armas de cerco', status: 'soon' },
    { method: 'GET', path: '/api/rules/optional', label: 'Regras opcionais', status: 'soon' },
  ]},
  { section: 'Geradores', items: [
    { method: 'POST', path: '/api/adventures/generate', label: 'Gerar aventura', status: 'soon' },
    { method: 'POST', path: '/api/npcs/generate', label: 'Gerar NPC', status: 'soon' },
    { method: 'POST', path: '/api/dungeons/generate', label: 'Gerar masmorra', status: 'soon' },
    { method: 'POST', path: '/api/monsters/create-quick', label: 'Monstro rápido', status: 'soon' },
  ]},
  { section: 'Downtime & Campanha', items: [
    { method: 'GET', path: '/api/downtime/activities', label: 'Atividades downtime', status: 'soon' },
    { method: 'GET', path: '/api/campaign/maintenance-costs', label: 'Custos de propriedade', status: 'soon' },
    { method: 'GET', path: '/api/campaign/events/roll', label: 'Evento de campanha', status: 'soon' },
  ]},
];

let history = JSON.parse(sessionStorage.getItem('api-history') || '[]');
let activePath = null;
let sectionsCollapsed = JSON.parse(sessionStorage.getItem('sections-collapsed') || '{}');

function renderSidebar(filter) {
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = '';
  ENDPOINTS.forEach((section) => {
    const items = filter
      ? section.items.filter(e => matchesFilter(e, filter))
      : section.items;
    if (items.length === 0 && filter) return;

    const isCollapsed = sectionsCollapsed[section.section] || false;
    const sec = document.createElement('div');
    sec.className = 'section-title';
    sec.innerHTML = `
      <span class="arrow ${isCollapsed ? '' : 'open'}">&#9654;</span>
      ${section.section}
      <span class="count">${items.length}/${section.items.length}</span>
    `;
    sec.addEventListener('click', () => {
      sectionsCollapsed[section.section] = !sectionsCollapsed[section.section];
      sessionStorage.setItem('sections-collapsed', JSON.stringify(sectionsCollapsed));
      renderSidebar(document.getElementById('search').value);
    });
    sidebar.appendChild(sec);

    if (!isCollapsed) {
      items.forEach(ep => {
        const el = document.createElement('div');
        el.className = `ep ${activePath === ep.path ? 'active' : ''}`;
        if (filter && !matchesFilter(ep, filter)) el.classList.add('hidden');
        el.innerHTML = `
          <span class="status-dot ${ep.status}"></span>
          <span class="method ${ep.method.toLowerCase()}">${ep.method}</span>
          <span class="path">${shortPath(ep.path)}</span>
        `;
        el.addEventListener('click', () => handleEndpointClick(ep));
        sidebar.appendChild(el);
      });
    }
  });
  updateSearchHint(filter);
}

function matchesFilter(ep, filter) {
  const q = filter.toLowerCase();
  return ep.path.toLowerCase().includes(q) || ep.label.toLowerCase().includes(q);
}

function shortPath(p) {
  return p.length > 28 ? p.slice(0, 25) + '..' : p;
}

function updateSearchHint(filter) {
  const hint = document.getElementById('search-hint');
  if (!filter) { hint.textContent = `${countEndpoints()} endpoints`; return; }
  const visible = document.querySelectorAll('.ep:not(.hidden)').length;
  hint.textContent = `${visible} resultados`;
}

function countEndpoints() {
  return ENDPOINTS.reduce((s, sec) => s + sec.items.length, 0);
}

function handleEndpointClick(ep) {
  if (ep.method === 'POST') {
    showGeneratorForm(ep);
  } else {
    fetchEndpoint(ep);
  }
}

async function fetchEndpoint(ep, body) {
  const content = document.getElementById('content');
  const welcome = document.getElementById('welcome');
  if (welcome) welcome.style.display = 'none';

  const start = performance.now();
  let panel = content.querySelector('.response-panel');
  if (!panel) {
    panel = document.createElement('div');
    panel.className = 'response-panel';
    content.appendChild(panel);
  }

  panel.innerHTML = '<div style="text-align:center;padding:2rem;color:#555;">Carregando...</div>';

  try {
    const opts = { headers: { 'Accept': 'application/json' } };
    if (body) {
      opts.method = 'POST';
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(body);
    }
    const res = await fetch(ep.path, opts);
    const latency = ((performance.now() - start) / 1000).toFixed(2);
    const data = await res.json();
    const ok = res.ok ? 'ok' : 'err';

    panel.innerHTML = `
      <div class="meta">
        <span class="status-code ${ok}">${res.status} ${res.statusText}</span>
        <span class="latency">${latency}s</span>
        <span class="endpoint-label">${ep.method} ${ep.path}</span>
        <button class="clear-btn" onclick="clearResponse(this)">Limpar</button>
      </div>
      <pre class="json"><button class="copy-btn" onclick="copyJson(this)">Copiar</button>${formatJson(data)}</pre>
    `;

    addHistory(ep.method, ep.path, res.status);
    document.querySelectorAll('.ep').forEach(e => e.classList.remove('active'));
    document.querySelectorAll('.ep').forEach(e => {
      if (e.querySelector('.path')?.textContent.trim() === shortPath(ep.path)) e.classList.add('active');
    });
  } catch (err) {
    panel.innerHTML = `
      <div class="meta">
        <span class="status-code err">Erro</span>
        <span class="endpoint-label">${ep.method} ${ep.path}</span>
        <button class="clear-btn" onclick="clearResponse(this)">Limpar</button>
      </div>
      <pre class="json"><span style="color:#c44;">Erro de conexão: ${err.message}</span></pre>
    `;
  }
}

function showGeneratorForm(ep) {
  const content = document.getElementById('content');
  const welcome = document.getElementById('welcome');
  if (welcome) welcome.style.display = 'none';

  let panel = content.querySelector('.response-panel');
  if (panel) panel.remove();

  const gen = document.createElement('div');
  gen.className = 'gen-form';
  gen.dataset.path = ep.path;
  gen.dataset.method = ep.method;

  const name = ep.label;
  gen.innerHTML = `<h3>${ep.method} ${ep.path}</h3><p style="font-size:0.8rem;color:#888;margin-bottom:0.75rem;">${name}</p>`;

  if (ep.path === '/api/adventures/generate') {
    gen.innerHTML += `
      <div class="field"><label>Tipo de aventura</label><select id="gen-type">
        <option value="location">Baseada em local</option>
        <option value="event">Baseada em evento</option>
        <option value="mystery">Mistério</option>
        <option value="intrigue">Intriga</option>
      </select></div>
      <button onclick="executeGen(this)">Gerar Aventura</button>
    `;
  } else if (ep.path === '/api/npcs/generate') {
    gen.innerHTML += `
      <div class="field"><label>Tipo de NPC</label><select id="gen-type">
        <option value="">Aleatório</option>
        <option value="villain">Vilão</option>
        <option value="ally">Aliado</option>
        <option value="contact">Contato</option>
        <option value="hireling">Contratado</option>
      </select></div>
      <button onclick="executeGen(this)">Gerar NPC</button>
    `;
  } else if (ep.path === '/api/dungeons/generate') {
    gen.innerHTML += `
      <div class="field"><label>Tipo de masmorra</label><select id="gen-type">
        <option value="covil">Covil</option>
        <option value="labirinto">Labirinto</option>
        <option value="mina">Mina</option>
        <option value="tumba">Tumba</option>
        <option value="portal_planar">Portal Planar</option>
      </select></div>
      <div class="field"><label>Níveis</label><input type="number" id="gen-levels" value="1" min="1" max="10"></div>
      <div class="field"><label>Salas</label><input type="number" id="gen-rooms" value="10" min="1" max="100"></div>
      <button onclick="executeGen(this)">Gerar Masmorra</button>
    `;
  } else if (ep.path === '/api/monsters/create-quick') {
    gen.innerHTML += `
      <div class="field"><label>Nome do monstro</label><input type="text" id="gen-name" value="Monstro" placeholder="Nome"></div>
      <div class="field"><label>ND pretendido</label><input type="number" id="gen-cr" value="5" min="0" max="30"></div>
      <button onclick="executeGen(this)">Criar Monstro</button>
    `;
  } else {
    gen.innerHTML += `<button onclick="executeGen(this)">Executar</button>`;
  }

  content.appendChild(gen);
  document.querySelectorAll('.ep').forEach(e => e.classList.remove('active'));
  document.querySelectorAll('.ep').forEach(e => {
    if (e.querySelector('.path')?.textContent.trim() === shortPath(ep.path)) e.classList.add('active');
  });
}

async function executeGen(btn) {
  btn.disabled = true;
  btn.textContent = 'Gerando...';
  const form = btn.closest('.gen-form');
  const path = form.dataset.path;
  const body = {};

  const typeEl = form.querySelector('#gen-type');
  if (typeEl) body.type = typeEl.value;

  if (path === '/api/dungeons/generate') {
    body.levels = parseInt(form.querySelector('#gen-levels')?.value) || 1;
    body.rooms = parseInt(form.querySelector('#gen-rooms')?.value) || 10;
  }
  if (path === '/api/monsters/create-quick') {
    body.name = form.querySelector('#gen-name')?.value || 'Monstro';
    body.intendedCR = parseInt(form.querySelector('#gen-cr')?.value) || 5;
  }

  await fetchEndpoint({ method: 'POST', path, label: '' }, body);
  btn.disabled = false;
  btn.textContent = 'Gerar';
}

function formatJson(obj) {
  return syntaxHighlight(JSON.stringify(obj, null, 2));
}

function syntaxHighlight(json) {
  return json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"([^"]+)":/g, '<span class="key">"$1"</span>:')
    .replace(/: "([^"]*)"/g, (m) => {
      const val = m.slice(2, -1);
      if (val === 'null') return ': <span class="null">null</span>';
      return ': <span class="string">"' + val + '"</span>';
    })
    .replace(/: (\d+\.?\d*)/g, ': <span class="number">$1</span>')
    .replace(/: (true|false)/g, ': <span class="boolean">$1</span>')
    .replace(/: (null)/g, ': <span class="null">$1</span>')
    .replace(/([{\[\]}])/g, '<span class="bracket">$1</span>');
}

function copyJson(btn) {
  const pre = btn.closest('pre');
  const text = pre.textContent.replace('Copiar', '').trim();
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copiado!';
    setTimeout(() => btn.textContent = 'Copiar', 1500);
  });
}

function clearResponse(btn) {
  btn.closest('.response-panel').remove();
  const welcome = document.getElementById('welcome');
  if (welcome) welcome.style.display = '';
}

function addHistory(method, path, status) {
  const time = new Date().toLocaleTimeString();
  history.unshift({ method, path, status, time });
  if (history.length > 20) history.pop();
  sessionStorage.setItem('api-history', JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const dd = document.getElementById('history-dropdown');
  dd.innerHTML = history.map(h => `
    <div class="history-item">
      <span class="hmethod ${h.method.toLowerCase()}">${h.method}</span>
      <span class="hpath">${h.path}</span>
      <span style="color:${h.status < 400 ? '#4c4' : '#c44'};font-size:0.7rem;">${h.status}</span>
      <span class="htime">${h.time}</span>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('search').addEventListener('input', (e) => {
    renderSidebar(e.target.value);
  });

  document.getElementById('history-toggle').addEventListener('click', () => {
    document.getElementById('history-dropdown').classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.history')) {
      document.getElementById('history-dropdown').classList.remove('open');
    }
  });

  fetch('/api/health')
    .then(r => r.json())
    .then(d => {
      const badge = document.getElementById('health-badge');
      badge.textContent = `🟢 OK (${Math.floor(d.uptime)}s)`;
      badge.className = 'badge ok';
    })
    .catch(() => {
      const badge = document.getElementById('health-badge');
      badge.textContent = '🔴 Offline';
      badge.className = 'badge err';
    });

  renderSidebar('');
  renderHistory();
});
