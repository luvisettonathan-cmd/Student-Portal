// ══════════════════════════════════════════════════════════════
// NEXUS ENGLISH CENTER - PORTAL DO ALUNO
// ══════════════════════════════════════════════════════════════
//
// ⚠️ SUBSTITUA AS 2 LINHAS ABAIXO COM OS DADOS DO SEU SUPABASE
//
const SUPABASE_URL = 'https://aqlnihunzthcilrabasp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxbG5paHVuenRoY2lscmFiYXNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwNDMxOTQsImV4cCI6MjA5MTYxOTE5NH0.Dth5evj04iA9X9V68QfbSJ9qFC2PSCdetXNOG5MKg7c';
//
// ══════════════════════════════════════════════════════════════

if (!window.supabase) { document.getElementById('app').innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;color:#c23616;font-size:1rem;">Erro ao carregar Supabase. Verifique sua conexão e recarregue a página.</div>'; throw new Error('Supabase SDK não carregou'); }
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const MODULES = [
  { id: 'starter', label: 'Starter' },
  { id: 'a1', label: 'A1' },
  { id: 'a2', label: 'A2' },
  { id: 'b1', label: 'B1' },
  { id: 'b2', label: 'B2' },
];

const UNITS = [
  { id: 'chapeco', label: 'Chapecó' },
  { id: 'passo-fundo', label: 'Passo Fundo' },
  { id: 'online', label: 'Online' },
];

// ── ICONES SVG CUSTOMIZADOS (traço fino, não padrão AI) ──
const ICONS = {
  home: '<svg class="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-9z" stroke-linejoin="round"/></svg>',
  announce: '<svg class="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 8L3 11v3l15 3V8z" stroke-linejoin="round"/><path d="M18 6v14"/><circle cx="20" cy="13" r="1.5"/><path d="M7 14l1 5h3l-1-5"/></svg>',
  book: '<svg class="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 5c2-1 4-1 7 0v14c-3-1-5-1-7 0V5z" stroke-linejoin="round"/><path d="M13 5c2-1 4-1 7 0v14c-3-1-5-1-7 0V5z" stroke-linejoin="round"/></svg>',
  stack: '<svg class="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke-linejoin="round"/><path d="M3 13l9 5 9-5" stroke-linejoin="round"/><path d="M3 17l9 5 9-5" stroke-linejoin="round"/></svg>',
  spark: '<svg class="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3l2 7 7 2-7 2-2 7-2-7-7-2 7-2 2-7z" stroke-linejoin="round"/></svg>',
  compass: '<svg class="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M15 9l-2 5-5 2 2-5 5-2z" stroke-linejoin="round"/></svg>',
  shape: '<svg class="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="7" height="7" rx="1"/><circle cx="17.5" cy="6.5" r="3.5"/><path d="M3 17l4-4 4 4-4 4-4-4z" stroke-linejoin="round"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  waveform: '<svg class="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><path d="M3 12h2M7 9v6M11 5v14M15 8v8M19 11v2M21 12h0"/></svg>',
  users: '<svg class="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5" stroke-linejoin="round"/><path d="M15 20c0-2 2-3 4-3s4 1 4 3"/></svg>',
  cog: '<svg class="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3"/><path d="M12 3l1 3M12 18l1 3M3 12l3-1M18 13l3-1M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" stroke-linecap="round"/></svg>',
  logout: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4" stroke-linejoin="round"/><path d="M10 8l-4 4 4 4M6 12h10" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  plus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20h4L20 8l-4-4L4 16v4z" stroke-linejoin="round"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" stroke-linejoin="round"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>',
  eyeOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4l16 16" stroke-linecap="round"/><path d="M9 5.5c1-.3 2-.5 3-.5 7 0 10 7 10 7s-.7 1.7-2.2 3.5M6 6.5C3.3 8.3 2 12 2 12s3 7 10 7c1.5 0 2.9-.3 4-.8"/></svg>',
  arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
  arrowDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>',
  external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6"/><path d="M20 4L10 14"/><path d="M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 7h6l-5 4 2 7-6-4-6 4 2-7-5-4h6l3-7z" stroke-linejoin="round"/></svg>',
  info: '<svg class="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v.5M12 11v5" stroke-linecap="round"/></svg>',
  sparkle: '<svg class="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 4l1.5 5L19 11l-5.5 2L12 18l-1.5-5L5 11l5.5-2L12 4z" stroke-linejoin="round"/></svg>',
};

function icon(name) {
  const wrapper = document.createElement('span');
  wrapper.style.display = 'inline-flex';
  wrapper.innerHTML = ICONS[name] || '';
  return wrapper.firstElementChild;
}

let state = {
  screen: 'login',
  loginTab: 'student',
  user: null,
  userType: null,
  tab: 'home',
  currentSection: null,
  adminSubTab: 'students',
  moduleFilter: 'all',
  data: { students: [], admins: [], sections: [], contents: [], announcements: [] },
};

// ── Session persistence ──
function saveSession() {
  try {
    sessionStorage.setItem('nexus_session', JSON.stringify({
      user: state.user,
      userType: state.userType,
      screen: state.screen,
      tab: state.tab,
    }));
  } catch(e) {}
}
function clearSession() {
  try { sessionStorage.removeItem('nexus_session'); } catch(e) {}
}

// ── Idle timer (15 min inactivity → logout) ──
let _idleTimer = null;
const IDLE_MS = 15 * 60 * 1000;
function resetIdleTimer() {
  if (_idleTimer) clearTimeout(_idleTimer);
  _idleTimer = setTimeout(() => {
    if (state.screen === 'portal') {
      state.user = null; state.userType = null; state.screen = 'login';
      state.tab = 'home'; state.currentSection = null;
      clearSession();
      ['mousemove','keydown','click','scroll','touchstart'].forEach(ev =>
        document.removeEventListener(ev, resetIdleTimer)
      );
      render();
    }
  }, IDLE_MS);
}
function startIdleTimer() {
  stopIdleTimer();
  resetIdleTimer();
  ['mousemove','keydown','click','scroll','touchstart'].forEach(ev =>
    document.addEventListener(ev, resetIdleTimer, { passive: true })
  );
}
function stopIdleTimer() {
  if (_idleTimer) { clearTimeout(_idleTimer); _idleTimer = null; }
  ['mousemove','keydown','click','scroll','touchstart'].forEach(ev =>
    document.removeEventListener(ev, resetIdleTimer)
  );
}


// ── DB ──
async function dbSelect(table, order = 'id') {
  const { data, error } = await db.from(table).select('*').order(order);
  if (error) { console.error(table, error); return []; }
  return data || [];
}
async function dbInsert(table, row) {
  const { data, error } = await db.from(table).insert(row).select();
  if (error) { alert('Erro: ' + error.message); return null; }
  return data?.[0];
}
async function dbUpdate(table, id, updates) {
  const { error } = await db.from(table).update(updates).eq('id', id);
  if (error) alert('Erro: ' + error.message);
}
async function dbDelete(table, id) {
  const { error } = await db.from(table).delete().eq('id', id);
  if (error) alert('Erro: ' + error.message);
}

async function loadAll() {
  const [students, admins, sections, contents, announcements] = await Promise.all([
    dbSelect('students'),
    dbSelect('student_portal_admins'),
    dbSelect('sections', 'sort_order'),
    dbSelect('contents', 'sort_order'),
    dbSelect('student_announcements'),
  ]);
  state.data = { students, admins, sections, contents, announcements };
  render();
}

const app = document.getElementById('app');

function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
    else if (k.startsWith('on')) el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === 'className') el.className = v;
    else if (k === 'innerHTML') el.innerHTML = v;
    else if (v !== null && v !== undefined && v !== false) el.setAttribute(k, v);
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue;
    el.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
  }
  return el;
}

function render() {
  app.innerHTML = '';
  if (state.screen === 'login') app.appendChild(renderLogin());
  else app.appendChild(renderPortal());
}

// ══════════════════════════════════════════════════════════════
// LOGIN
// ══════════════════════════════════════════════════════════════
// LOGIN
// ══════════════════════════════════════════════════════════════
function renderLogin() {
  const wrap = h('div', { className: 'login-wrap' });

  // Coluna esquerda decorativa
  const left = h('div', { className: 'login-left' });
  const logoLeft = h('div', { className: 'login-left-logo', innerHTML: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 110" width="240" height="82">
  <text x="0" y="82" font-family="'Arial Black', 'Helvetica Neue', Arial, sans-serif" font-weight="900" font-size="90" fill="#ffffff" letter-spacing="-2">NEXUS</text>
  <text x="82" y="104" font-family="Arial, Helvetica, sans-serif" font-weight="400" font-size="13.5" fill="#ffffff" letter-spacing="5">ENGLISH CENTER</text>
</svg>` });
  const heroText = h('div', { className: 'login-left-hero' },
    h('h1', { innerHTML: 'Bem-vindo ao<br><span>Portal do Aluno</span>' }),
    h('p', {}, 'Acesse suas aulas, materiais e acompanhe sua evolução no inglês.')
  );
  left.append(logoLeft, heroText);

  // Coluna direita com formulário
  const right = h('div', { className: 'login-right' });
  const form = h('div', { className: 'login-form' });

  const kicker = h('div', { className: 'login-form-kicker' },
    h('div', { className: 'login-kicker-line' }),
    h('span', {}, 'PORTAL DO ALUNO')
  );
  form.appendChild(kicker);
  form.appendChild(h('h2', { className: 'login-form-title', innerHTML: 'Área do <span>aluno</span>' }));
  form.appendChild(h('p', { className: 'login-form-sub' }, 'Acesse seu portal e continue sua jornada no inglês.'));

  const errBox = h('div', { className: 'login-error', style: { display: 'none' } });

  const userInput = h('input', {
    className: 'field-input',
    placeholder: 'seu.usuario',
    autocomplete: 'username',
    id: 'login-user-input'
  });

  const pwInput = h('input', {
    className: 'field-input',
    type: 'password',
    placeholder: '••••••',
    autocomplete: 'current-password'
  });

  const doLogin = async () => {
    const username = userInput.value.toLowerCase().trim();
    const password = pwInput.value;

    if (!username || !password) {
      errBox.textContent = 'Preencha usuário e senha';
      errBox.style.display = 'flex';
      return;
    }

    errBox.style.display = 'none';

    // Tenta admin primeiro
    const { data: adminData, error: adminError } = await db
      .from('student_portal_admins')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();

    if (!adminError && adminData) {
      state.user = adminData;
      state.userType = 'admin';
      state.loginTab = 'admin';
      state.screen = 'portal';
      state.tab = 'admin';
      await loadAll();
      saveSession(); startIdleTimer();
      return;
    }

    // Tenta aluno
    const { data: studentRows, error: studentError } = await db
      .from('students')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .limit(1);

    if (studentError) {
      console.error('Erro de login:', studentError);
      errBox.textContent = 'Erro ao conectar: ' + studentError.message;
      errBox.style.display = 'flex';
      return;
    }

    const studentData = studentRows && studentRows[0];

    if (studentData) {
      state.user = studentData;
      state.userType = 'student';
      state.loginTab = 'student';
      state.screen = 'portal';
      state.tab = 'home';
      await loadAll();
      saveSession(); startIdleTimer();
      return;
    }

    errBox.textContent = 'Usuário ou senha incorretos';
    errBox.style.display = 'flex';
  };pwInput.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
  userInput.addEventListener('keydown', e => { if (e.key === 'Enter') pwInput.focus(); });

  form.append(
    errBox,
    h('div', { className: 'field' },
      h('label', { className: 'field-label' }, 'USUÁRIO'),
      userInput
    ),
    h('div', { className: 'field' },
      h('label', { className: 'field-label' }, 'SENHA'),
      pwInput
    ),
    h('button', { className: 'login-btn', onClick: doLogin }, 'Entrar'),
  );

  right.appendChild(form);
  wrap.append(left, right);
  return wrap;
}

function renderChat() {
  // Chat state stored on window to persist across re-renders
  if (!window._chatHistory) window._chatHistory = [];
  if (!window._chatLoading) window._chatLoading = false;

  const level = (state.user && state.user.module) ? state.user.module.toUpperCase() : 'A1';

  function buildUI() {
    const wrap = document.createElement('div');
    wrap.className = 'chat-page';

    // Header
    const header = h('div', { className: 'chat-header' },
      icon('waveform'),
      h('div', { className: 'chat-header-text' },
        h('h2', {}, 'Chat com IA'),
        h('span', { className: 'chat-level-badge' }, 'Tutor de ingl\u00eas \u2022 N\u00edvel ' + level)
      )
    );
    wrap.appendChild(header);

    // Messages area
    const msgs = document.createElement('div');
    msgs.className = 'chat-messages';
    msgs.id = 'chat-messages-area';

    if (window._chatHistory.length === 0) {
      msgs.appendChild(h('div', { className: 'chat-empty' },
        h('p', {}, '\uD83D\uDCAC Ol\u00e1! Sou seu tutor de ingl\u00eas. Pode me perguntar sobre gram\u00e1tica, vocabul\u00e1rio, exerc\u00edcios ou qualquer d\u00favida sobre ingl\u00eas.'),
        h('div', { className: 'chat-suggestions' },
          h('button', { className: 'chat-suggestion-btn', onClick: () => sendMessage('What is the difference between "since" and "for"?') }, '"since" vs "for"'),
          h('button', { className: 'chat-suggestion-btn', onClick: () => sendMessage('Explain Present Perfect vs Past Simple') }, 'Present Perfect vs Past Simple'),
          h('button', { className: 'chat-suggestion-btn', onClick: () => sendMessage('How do I use modal verbs?') }, 'Modal verbs'),
        )
      ));
    } else {
      window._chatHistory.forEach(m => {
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble ' + (m.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai');
        bubble.textContent = m.content;
        msgs.appendChild(bubble);
      });
      if (window._chatLoading) {
        const typing = h('div', { className: 'chat-bubble chat-bubble-ai chat-typing' },
          h('span', {}), h('span', {}), h('span', {})
        );
        msgs.appendChild(typing);
      }
    }
    wrap.appendChild(msgs);

    // Input area
    const inputArea = h('div', { className: 'chat-input-area' },
      h('textarea', {
        className: 'chat-input',
        id: 'chat-input-field',
        placeholder: 'Ask your English question...',
        rows: 1,
        onKeyDown: (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const val = document.getElementById('chat-input-field').value.trim();
            if (val) sendMessage(val);
          }
        }
      }),
      h('button', {
        className: 'chat-send-btn',
        disabled: window._chatLoading,
        onClick: () => {
          const val = document.getElementById('chat-input-field').value.trim();
          if (val) sendMessage(val);
        }
      }, icon('arrowRight'))
    );
    wrap.appendChild(inputArea);

    // Clear button
    if (window._chatHistory.length > 0) {
      wrap.appendChild(h('button', {
        className: 'chat-clear-btn',
        onClick: () => { window._chatHistory = []; window._chatLoading = false; render(); state.tab = 'chat'; render(); }
      }, 'Limpar conversa'));
    }

    return wrap;
  }

  async function sendMessage(text) {
    if (window._chatLoading) return;
    window._chatHistory.push({ role: 'user', content: text });
    window._chatLoading = true;

    // Re-render to show user message + typing
    const container = document.querySelector('.content');
    if (container) {
      const old = container.querySelector('.chat-page');
      if (old) container.replaceChild(buildUI(), old);
    }
    // Scroll to bottom
    const area = document.getElementById('chat-messages-area');
    if (area) area.scrollTop = area.scrollHeight;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: window._chatHistory,
          level: level
        })
      });
      const data = await res.json();
      window._chatHistory.push({ role: 'assistant', content: data.reply || 'Sorry, I could not process that.' });
    } catch (e) {
      window._chatHistory.push({ role: 'assistant', content: 'Error connecting to AI. Please try again.' });
    }

    window._chatLoading = false;

    // Re-render
    const container2 = document.querySelector('.content');
    if (container2) {
      const old2 = container2.querySelector('.chat-page');
      if (old2) container2.replaceChild(buildUI(), old2);
    }
    const area2 = document.getElementById('chat-messages-area');
    if (area2) area2.scrollTop = area2.scrollHeight;
  }

  return buildUI();
}

function renderDuvidas() {
  const wrap = h('div', { className: 'duvidas-page' },
    h('div', { className: 'duvidas-header' },
      icon('info'),
      h('h2', {}, 'Dúvidas')
    ),
    h('p', { className: 'duvidas-sub' }, 'Entre em contato com a nossa equipe pelos canais abaixo.')
  );
  return wrap;
}

function renderPortal() {
  const wrap = h('div', { className: 'portal-layout' });
  const isAdmin = state.userType === 'admin';

  wrap.appendChild(renderSidebar(isAdmin));

  const content = h('main', { className: 'content fade-up' });

  if (isAdmin) content.appendChild(renderAdminPanel());
  else {
    if (state.currentSection) content.appendChild(renderSectionDetail());
    else if (state.tab === 'home') content.appendChild(renderHome());
    else if (state.tab === 'announcements') content.appendChild(renderAnnouncements());
    else if (state.tab === 'aulas') content.appendChild(renderAulas());
    else if (state.tab === 'daily') content.appendChild(renderDaily());
    else if (state.tab === 'duvidas') content.appendChild(renderDuvidas());
    else if (state.tab === 'chat') content.appendChild(renderChat());
  }

  wrap.appendChild(content);
  return wrap;
}

// ══════════════════════════════════════════════════════════════
// SIDEBAR
// ══════════════════════════════════════════════════════════════
function renderSidebar(isAdmin) {
  const sb = h('aside', { className: 'sidebar' });

  sb.appendChild(h('div', { className: 'sidebar-brand' },
    h('div', { className: 'sidebar-logo' }, 'N'),
    h('div', {},
      h('div', { className: 'sidebar-title' }, isAdmin ? 'Admin' : 'Portal'),
      h('div', { className: 'sidebar-title-sub' }, 'Nexus English')
    )
  ));

  const nav = h('nav', { className: 'sidebar-nav' });

  if (isAdmin) {
    // Admin sidebar: links principais + sub-navigation
    const adminLinks = [
      { id: 'students', label: 'Alunos', iconName: 'users' },
      { id: 'admins', label: 'Admins', iconName: 'cog' },
    ];

    adminLinks.forEach(link => {
      nav.appendChild(h('button', {
        className: `sidebar-link ${state.adminSubTab === link.id ? 'active' : ''}`,
        onClick: () => { state.adminSubTab = link.id; render(); }
      },
        icon(link.iconName),
        h('span', {}, link.label)
      ));
    });
  } else {
    // Aluno sidebar
    const mainLinks = [
      { id: 'home', label: 'Home', iconName: 'home' },      { id: 'daily', label: 'Daily practice', iconName: 'spark' },
      { id: 'aulas', label: 'Aulas', iconName: 'book' },
      { id: 'exercicios', label: 'Exercícios', iconName: 'stack' },
      { id: 'materiais', label: 'Materiais', iconName: 'compass' },
      { id: 'gramatica', label: 'Referência gramatical', iconName: 'info' },
      { id: 'prova', label: 'Prova', iconName: 'sparkle' },
      { id: 'chat', label: 'Chat com IA', iconName: 'waveform' },
      { id: 'comunidades', label: 'Comunidades', iconName: 'users' },
      { id: 'duvidas', label: 'Dúvidas', iconName: 'info' },
    ];

    mainLinks.forEach(link => {
      nav.appendChild(h('button', {
        className: `sidebar-link ${state.tab === link.id ? 'active' : ''}`,
        onClick: () => { state.tab = link.id; state.currentSection = null; render(); }
      },
        icon(link.iconName),
        h('span', {}, link.label),
        link.count > 0 && h('span', { className: 'sidebar-badge' }, link.count)
      ));
    });

    // Divisor e itens futuros
    const divider = h('div', { className: 'sidebar-divider' });
    nav.appendChild(divider);

    const soonItems = [
      { label: 'Em breve', iconName: 'announce' },
    ];
    soonItems.forEach(item => {
      nav.appendChild(h('button', {
        className: 'sidebar-link disabled',
      },
        icon(item.iconName),
        h('span', {}, item.label),
      ));
    });

    // Seções dinâmicas
    const mod = state.user.module || 'starter';
    const visibleSections = state.data.sections.filter(s => s.name !== 'Materiais do Curso' && s.name !== 'Atividades Extras' &&
      s.visible && (!s.target_modules || s.target_modules.length === 0 || s.target_modules.includes(mod))
    );

    if (visibleSections.length > 0) {
      nav.appendChild(h('div', { className: 'sidebar-section-label' }, 'Explore'));

      const sectionIcons = ['book', 'stack', 'spark', 'compass', 'waveform', 'sparkle'];
      visibleSections.forEach((sec, idx) => {
        const iconName = sectionIcons[idx % sectionIcons.length];
        nav.appendChild(h('button', {
          className: `sidebar-link ${state.currentSection === sec.id ? 'active' : ''}`,
          onClick: () => { state.currentSection = sec.id; state.tab = 'section'; render(); }
        },
          icon(iconName),
          h('span', {}, sec.name)
        ));
      });
    }
  }

  sb.appendChild(nav);

  // Footer (user + logout)
  const footer = h('div', { className: 'sidebar-footer' });
  const initials = state.user.name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
  const userMeta = isAdmin
    ? 'Admin'
    : ((state.user.module || '').toUpperCase() + ' · ' + (UNITS.find(u => u.id === state.user.unit)?.label || '—'));

  footer.appendChild(h('div', { className: 'sidebar-user' },
    h('div', { className: 'sidebar-user-avatar' }, initials),
    h('div', { className: 'sidebar-user-info' },
      h('div', { className: 'sidebar-user-name' }, state.user.name),
      h('div', { className: 'sidebar-user-meta' }, userMeta)
    )
  ));

  footer.appendChild(h('button', {
    className: 'sidebar-logout',
    onClick: () => {
      state.user = null; state.userType = null; state.screen = 'login';
      state.tab = 'home'; state.currentSection = null;
      stopIdleTimer(); clearSession(); render();
    }
  }, icon('logout'), 'Sair'));
  sb.appendChild(footer);
  return sb;
}

// ══════════════════════════════════════════════════════════════
// STUDENT: HOME
// ══════════════════════════════════════════════════════════════
function renderHome() {
  const d = h('div', { className: 'home-page' });
  const mod = state.user.module || 'starter';
  const modLabel = MODULES.find(m => m.id === mod)?.label || '—';
  const firstName = state.user.name ? state.user.name.split(' ')[0] : 'Aluno';

  // Streak e progresso (calculados localmente por ora)
  const streak = state.user.streak || 0;
  const progress = state.user.progress || 0;

  // ── 1. TOPO ──
  const topBar = h('div', { className: 'home-topbar' },
    h('div', { className: 'home-welcome' },
      h('h1', { className: 'home-welcome-title' }, 'Welcome back, ' + firstName + ' 👋'),
      h('p', { className: 'home-welcome-sub' }, "You're on: ", h('strong', {}, modLabel))
    ),
    h('div', { className: 'home-stats' },
      h('div', { className: 'home-stat' },
        h('span', { className: 'home-stat-icon' }, '🔥'),
        h('div', {},
          h('div', { className: 'home-stat-value' }, streak + (streak === 1 ? ' day' : ' days')),
          h('div', { className: 'home-stat-label' }, 'Streak')
        )
      ),
      h('div', { className: 'home-stat' },
        h('span', { className: 'home-stat-icon' }, '📊'),
        h('div', {},
          h('div', { className: 'home-stat-value' }, progress + '%'),
          h('div', { className: 'home-stat-label' }, 'Progress')
        )
      )
    )
  );
  d.appendChild(topBar);

  // ── 2. DAILY PRACTICE CARD ──
  const dailyCard = h('div', { className: 'home-daily-card' },
    h('div', { className: 'home-daily-left' },
      h('div', { className: 'home-daily-tag' }, '🔥 Daily Practice'),
      h('h2', { className: 'home-daily-title' }, "Complete today's challenge"),
      h('p', { className: 'home-daily-sub' }, '5 min • Quick exercises to keep your streak going')
    ),
    h('button', {
      className: 'home-daily-btn',
      onClick: () => { state.tab = 'daily'; render(); }
    }, 'Start now →')
  );
  d.appendChild(dailyCard);

  // ── 3. QUICK ACCESS GRID ──
  const quickLabel = h('div', { className: 'home-section-label' }, 'Quick access');
  d.appendChild(quickLabel);

  const quickItems = [
    { iconName: 'book',     title: 'Aulas',       desc: 'Watch your lessons',        tab: 'aulas' },
    { iconName: 'stack',    title: 'Exercícios',  desc: 'Practice what you learned', tab: 'exercicios' },
    { iconName: 'compass',  title: 'Materiais',   desc: 'Access extra content',      tab: 'materiais' },
    { iconName: 'waveform', title: 'Chat com IA', desc: 'Ask questions anytime',     tab: 'chat' },
  ];

  const grid = h('div', { className: 'home-quick-grid' });
  quickItems.forEach(item => {
    const iconEl = icon(item.iconName);
    if (iconEl) {
      iconEl.removeAttribute('class');
      iconEl.setAttribute('class', 'home-quick-svg');
    }
    grid.appendChild(h('div', {
      className: 'home-quick-card',
      onClick: () => { state.tab = item.tab; render(); }
    },
      h('div', { className: 'home-quick-icon' }, iconEl || ''),
      h('div', { className: 'home-quick-title' }, item.title),
      h('div', { className: 'home-quick-desc' }, item.desc)
    ));
  });
  d.appendChild(grid);

  return d;
}
function waveIconSvg() {
  const w = document.createElement('span');
  w.style.display = 'inline-flex';
  w.innerHTML = '<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color:#d9622d"><path d="M7 11V5.5a1.5 1.5 0 0 1 3 0V12M10 7.5V3.5a1.5 1.5 0 0 1 3 0V12M13 5a1.5 1.5 0 0 1 3 0v7M16 7.5a1.5 1.5 0 0 1 3 0V14c0 3-2 7-6.5 7S5 17 5 14v-2a1.5 1.5 0 0 1 2.5-1"/></svg>';
  return w.firstElementChild;
}

// ══════════════════════════════════════════════════════════════
// STUDENT: SECTION DETAIL
// ══════════════════════════════════════════════════════════════
function renderSectionDetail() {
  const d = h('div');
  const sec = state.data.sections.find(s => s.id === state.currentSection);
  if (!sec) { state.currentSection = null; render(); return d; }

  const mod = state.user.module || 'starter';
  const items = state.data.contents.filter(c =>
    c.section_id === sec.id &&
    (!c.target_modules || c.target_modules.length === 0 || c.target_modules.includes(mod))
  );

  const backBtn = h('button', { className: 'back-link', onClick: () => { state.currentSection = null; state.tab = 'home'; render(); } });
  backBtn.appendChild(icon('arrowUp'));
  backBtn.firstElementChild.style.transform = 'rotate(-90deg)';
  backBtn.appendChild(h('span', {}, 'Voltar ao início'));h
  d.appendChild(backBtn);

  d.appendChild(h('div', { className: 'page-header' },
    h('div', { className: 'page-kicker' }, 'Seção'),
    h('h1', { className: 'page-title' }, sec.name),
    sec.description && h('p', { className: 'page-subtitle' }, sec.description)
  ));

  if (items.length === 0) {
    d.appendChild(h('div', { className: 'empty-state' },
      h('div', { className: 'empty-state-icon' }, icon('sparkle')),
      h('div', { className: 'empty-state-title', innerHTML: 'Nenhum conteúdo <span>ainda</span>' }),
      h('div', { className: 'empty-state-text' }, 'Esta seção será atualizada em breve pela coordenação.')
    ));
  } else {
    const list = h('div', { className: 'content-list' });
    items.forEach((item, i) => {
      list.appendChild(h('a', {
        className: 'content-item',
        href: item.link || '#',
        target: item.link ? '_blank' : '_self',
        rel: 'noopener'
      },
        h('div', { className: 'content-number' }, String(i + 1).padStart(2, '0')),
        h('div', { className: 'content-main' },
          h('div', { className: 'content-tag' }, item.content_type || 'LINK'),
          h('h3', { className: 'content-title' }, item.title),
          item.description && h('p', { className: 'content-desc' }, item.description)
        ),
        h('div', { className: 'content-cta' }, 'Acessar', icon('external'))
      ));
    });
    d.appendChild(list);
  }

  return d;
}

// ══════════════════════════════════════════════════════════════
// STUDENT: ANNOUNCEMENTS
// ══════════════════════════════════════════════════════════════
function renderAnnouncements() {
  const d = h('div');
  const mod = state.user.module || 'starter';
  const filtered = state.data.announcements.filter(a =>
    !a.target_modules || a.target_modules.length === 0 || a.target_modules.includes(mod)
  );

  d.appendChild(h('div', { className: 'page-header' },
    h('div', { className: 'page-kicker' }, 'Comunicados'),
    h('h1', { className: 'page-title', innerHTML: 'Avisos da <span>coordenação</span>' }),
    h('p', { className: 'page-subtitle' }, 'Acompanhe aqui todas as comunicações importantes da escola, eventos e atualizações do seu curso.')
  ));

  if (filtered.length === 0) {
    d.appendChild(h('div', { className: 'empty-state' },
      h('div', { className: 'empty-state-icon' }, icon('announce')),
      h('div', { className: 'empty-state-title', innerHTML: 'Sem <span>novidades</span>' }),
      h('div', { className: 'empty-state-text' }, 'Quando houver avisos, eles aparecerão aqui.')
    ));
  } else {
    const sorted = [...filtered].sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return new Date(b.created_at) - new Date(a.created_at);
    });
    const list = h('div', { className: 'announcement-list' });
    sorted.forEach(a => list.appendChild(announcementNode(a)));
    d.appendChild(list);
  }

  return d;
}

// ══════════════════════════════════════════════════════════════
// AULAS
// ══════════════════════════════════════════════════════════════
function renderAulas() {
  // ── Dados dos cursos gerados automaticamente ──
  const COURSES = [
    {
      id: 'starter', label: 'Starter',
      lessons: Array.from({ length: 8 }, (_, i) => ({ id: `starter-${i+1}`, label: `Lesson ${i+1}`, num: i+1 }))
    },
    {
      id: 'a1', label: 'A1',
      lessons: Array.from({ length: 10 }, (_, i) => ({ id: `a1-${i+1}`, label: `Lesson ${i+1}`, num: i+1 }))
    },
    {
      id: 'a2', label: 'A2',
      lessons: Array.from({ length: 10 }, (_, i) => ({ id: `a2-${i+11}`, label: `Lesson ${i+11}`, num: i+11 }))
    },
    {
      id: 'b1', label: 'B1',
      lessons: Array.from({ length: 10 }, (_, i) => ({ id: `b1-${i+21}`, label: `Lesson ${i+21}`, num: i+21 }))
    },
    {
      id: 'b2', label: 'B2',
      lessons: Array.from({ length: 19 }, (_, i) => i + 1)
        .filter(n => ![5, 10, 15, 20].includes(n))
        .map(n => ({ id: `b2-${n}`, label: `Unit ${n}`, num: n }))
    },
  ];

  // ── Estado local (persiste em state.aulas) ──
  if (!state.aulas) state.aulas = { level: 'starter', openLesson: null, quizAnswers: {}, quizSubmitted: {} };
  const as = state.aulas;

  // ── Progresso salvo no localStorage ──
  function getProgress() {
    try { return JSON.parse(localStorage.getItem('nexus_aulas_progress') || '{}'); } catch { return {}; }
  }
  function saveProgress(p) {
    localStorage.setItem('nexus_aulas_progress', JSON.stringify(p));
  }
  function markComplete(lessonId) {
    const p = getProgress(); p[lessonId] = 'completed'; saveProgress(p);
  }
  function getStatus(lessonId) {
    const p = getProgress(); return p[lessonId] || 'not-started';
  }
  function getLevelProgress(course) {
    const p = getProgress();
    const total = course.lessons.length;
    const done = course.lessons.filter(l => p[l.id] === 'completed').length;
    return { done, total, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  }

  // ── Wrapper principal ──
  const page = h('div', { className: 'aulas-page' });

  // ── Título ──
  page.appendChild(h('div', { className: 'aulas-header' },
    h('h1', { className: 'aulas-title' }, 'Aulas'),
    h('p', { className: 'aulas-subtitle' }, 'Selecione um nível e acompanhe seu progresso')
  ));

  // ── Level Tabs ──
  const tabs = h('div', { className: 'aulas-tabs' });
  COURSES.forEach(course => {
    const active = as.level === course.id;
    const prog = getLevelProgress(course);
    tabs.appendChild(h('button', {
      className: `aulas-tab ${active ? 'active' : ''}`,
      onClick: () => { as.level = course.id; as.openLesson = null; as.quizAnswers = {}; as.quizSubmitted = {}; render(); }
    },
      h('span', { className: 'aulas-tab-label' }, course.label),
      h('span', { className: `aulas-tab-badge ${prog.pct === 100 ? 'done' : ''}` }, prog.pct + '%')
    ));
  });
  page.appendChild(tabs);

  const activeCourse = COURSES.find(c => c.id === as.level);
  const prog = getLevelProgress(activeCourse);

  // ── Progress bar do nível ──
  const progBar = h('div', { className: 'aulas-level-progress' },
    h('div', { className: 'aulas-level-progress-info' },
      h('span', {}, activeCourse.label + ' — ' + prog.done + ' de ' + prog.total + ' aulas concluídas'),
      h('span', { className: 'aulas-level-progress-pct' }, prog.pct + '%')
    ),
    h('div', { className: 'aulas-progress-track' },
      h('div', { className: 'aulas-progress-fill', style: `width:${prog.pct}%` })
    )
  );
  page.appendChild(progBar);

  // ── Painel de aula aberta ──
  if (as.openLesson) {
    const lesson = activeCourse.lessons.find(l => l.id === as.openLesson);
    if (lesson) {
      const status = getStatus(lesson.id);
      const panel = h('div', { className: 'aulas-lesson-panel' });

      // Cabeçalho do painel
      panel.appendChild(h('div', { className: 'aulas-panel-header' },
        h('div', { className: 'aulas-panel-title-row' },
          h('h2', { className: 'aulas-panel-title' }, lesson.label),
          h('div', { className: 'aulas-panel-actions' },
            status !== 'completed' ? h('button', {
              className: 'aulas-complete-btn',
              onClick: () => { markComplete(lesson.id); render(); }
            }, '✓ Marcar como concluída') : h('span', { className: 'aulas-complete-badge' }, '✓ Concluída'),
            h('button', { className: 'aulas-close-btn', onClick: () => { as.openLesson = null; render(); } }, '✕ Fechar')
          )
        )
      ));

      // Player de vídeo (placeholder)
      panel.appendChild(h('div', { className: 'aulas-video-wrapper' },
        h('div', { className: 'aulas-video-placeholder' },
          h('div', { className: 'aulas-video-icon' }, icon('book')),
          h('p', { className: 'aulas-video-text' }, 'Vídeo da ' + lesson.label),
          h('p', { className: 'aulas-video-hint' }, 'O vídeo será incorporado aqui')
        )
      ));

      // Quiz
      const quizKey = lesson.id;
      const submitted = !!as.quizSubmitted[quizKey];

      // Perguntas placeholder — serão substituídas por dados reais depois
      const questions = [
        {
          id: 'q1', text: `Quiz: ${lesson.label} — Pergunta 1`,
          options: ['Opção A', 'Opção B', 'Opção C', 'Opção D'], correct: 0
        },
        {
          id: 'q2', text: `Quiz: ${lesson.label} — Pergunta 2`,
          options: ['Opção A', 'Opção B', 'Opção C', 'Opção D'], correct: 1
        },
        {
          id: 'q3', text: `Quiz: ${lesson.label} — Pergunta 3`,
          options: ['Opção A', 'Opção B', 'Opção C', 'Opção D'], correct: 2
        },
      ];

      const quizSection = h('div', { className: 'aulas-quiz' });
      quizSection.appendChild(h('h3', { className: 'aulas-quiz-title' }, '📝 Quiz'));

      questions.forEach((q, qi) => {
        const qBlock = h('div', { className: 'aulas-quiz-question' });
        qBlock.appendChild(h('p', { className: 'aulas-quiz-q-text' }, (qi + 1) + '. ' + q.text));
        const opts = h('div', { className: 'aulas-quiz-options' });
        q.options.forEach((opt, oi) => {
          const selected = as.quizAnswers[quizKey + '_' + q.id] === oi;
          let optClass = 'aulas-quiz-opt';
          if (submitted) {
            if (oi === q.correct) optClass += ' correct';
            else if (selected && oi !== q.correct) optClass += ' wrong';
          } else if (selected) optClass += ' selected';

          opts.appendChild(h('button', {
            className: optClass,
            disabled: submitted,
            onClick: () => {
              if (!submitted) {
                as.quizAnswers[quizKey + '_' + q.id] = oi;
                render();
              }
            }
          }, opt));
        });
        qBlock.appendChild(opts);
        quizSection.appendChild(qBlock);
      });

      if (!submitted) {
        const allAnswered = questions.every(q => as.quizAnswers[quizKey + '_' + q.id] !== undefined);
        quizSection.appendChild(h('button', {
          className: `aulas-quiz-submit ${allAnswered ? '' : 'disabled'}`,
          disabled: !allAnswered,
          onClick: () => {
            if (allAnswered) {
              as.quizSubmitted[quizKey] = true;
              markComplete(lesson.id);
              render();
            }
          }
        }, 'Enviar respostas'));
      } else {
        const score = questions.filter(q => as.quizAnswers[quizKey + '_' + q.id] === q.correct).length;
        const pct = Math.round((score / questions.length) * 100);
        const resultClass = pct >= 70 ? 'great' : pct >= 40 ? 'ok' : 'retry';
        quizSection.appendChild(h('div', { className: `aulas-quiz-result ${resultClass}` },
          h('span', { className: 'aulas-quiz-score' }, score + '/' + questions.length + ' corretas'),
          h('span', { className: 'aulas-quiz-pct' }, pct + '%'),
          pct < 70 ? h('button', {
            className: 'aulas-quiz-retry',
            onClick: () => {
              as.quizAnswers = Object.fromEntries(
                Object.entries(as.quizAnswers).filter(([k]) => !k.startsWith(quizKey + '_'))
              );
              as.quizSubmitted[quizKey] = false;
              render();
            }
          }, '↺ Tentar novamente') : h('span', { className: 'aulas-quiz-congrats' }, '🎉 Parabéns!')
        ));
      }

      panel.appendChild(quizSection);
      page.appendChild(panel);
    }
  }

  // ── Grade de aulas ──
  const grid = h('div', { className: 'aulas-grid' });
  activeCourse.lessons.forEach(lesson => {
    const status = getStatus(lesson.id);
    const isOpen = as.openLesson === lesson.id;
    const card = h('div', {
      className: `aulas-card ${status} ${isOpen ? 'open' : ''}`,
      onClick: () => {
        as.openLesson = isOpen ? null : lesson.id;
        as.quizAnswers = {};
        as.quizSubmitted = {};
        render();
        // Scroll suave ao painel
        setTimeout(() => {
          const panel = document.querySelector('.aulas-lesson-panel');
          if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    },
      h('div', { className: 'aulas-card-top' },
        h('span', { className: 'aulas-card-num' }, lesson.num),
        h('span', { className: `aulas-status-dot ${status}` })
      ),
      h('div', { className: 'aulas-card-title' }, lesson.label),
      h('div', { className: 'aulas-card-icons' },
        h('span', { className: 'aulas-card-icon-item' }, icon('book'), h('span', {}, 'Vídeo')),
        h('span', { className: 'aulas-card-icon-item' }, icon('shape'), h('span', {}, 'Quiz'))
      ),
      h('div', { className: `aulas-status-label ${status}` },
        status === 'completed' ? '✓ Concluída' :
        status === 'in-progress' ? '▶ Em andamento' : '○ Não iniciada'
      )
    );
    grid.appendChild(card);
  });
  page.appendChild(grid);

  return page;
}


function announcementNode(a) {
  const dt = new Date(a.created_at);
  const day = dt.getDate();
  const month = dt.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '').toUpperCase();

  return h('article', { className: `announcement ${a.pinned ? 'pinned' : ''}` },
    h('div', { className: 'announcement-date' },
      h('strong', {}, day),
      h('span', {}, month)
    ),
    h('div', { className: 'announcement-body' },
      h('h3', {}, a.title),
      a.content && h('p', {}, a.content),
      h('div', { className: 'announcement-author' }, '— ' + (a.author || 'Coordenação'))
    ),
    a.pinned && h('div', { className: 'pinned-label' }, 'Fixado')
  );
}

// ══════════════════════════════════════════════════════════════
// DAILY PRACTICE
// ══════════════════════════════════════════════════════════════
const DAILY_PRACTICES={
  starter:[{topic:"Verb To Be — Present",explanation:"Use am/is/are to describe people and things. \"I am\", \"He is\", \"They are\".",exercises:[{type:"mc",q:"She ___ a teacher.",opts:["am","is","are","be"],correct:1,exp:"\"She\" is 3rd person singular → use \"is\"."},{type:"fill",q:"Complete: I ___ happy today.",answer:"am",exp:"With \"I\", always use \"am\"."},{type:"error",q:"Find the error: \"They is my friends.\"",opts:["They → We","is → are","my → mine","No error"],correct:1,exp:"\"They\" takes \"are\", not \"is\"."},{type:"mc",q:"We ___ students.",opts:["am","is","are","be"],correct:2,exp:"\"We\" is plural → use \"are\"."},{type:"fill",q:"The dog ___ very big.",answer:"is",exp:"\"The dog\" is 3rd person singular → \"is\"."}]},{topic:"Subject Pronouns",explanation:"I, you, he, she, it, we, they replace nouns as the subject of a sentence.",exercises:[{type:"mc",q:"Maria is my sister. ___ is kind.",opts:["He","She","They","It"],correct:1,exp:"\"Maria\" is female → use \"She\"."},{type:"mc",q:"John and I are students. ___ study every day.",opts:["He","She","We","They"],correct:2,exp:"\"John and I\" = \"We\"."},{type:"fill",q:"My dog is big. ___ is also fast.",answer:"It",exp:"Non-human animals → \"It\"."},{type:"error",q:"Find the error: \"Him is my brother.\"",opts:["Him → He","is → are","my → mine","No error"],correct:0,exp:"Subject pronoun needed → \"He\"."},{type:"mc",q:"The books are on the table. ___ are new.",opts:["It","He","She","They"],correct:3,exp:"Plural things → \"They\"."}]},{topic:"Articles — A / An",explanation:"Use \"a\" before consonant sounds and \"an\" before vowel sounds (a, e, i, o, u).",exercises:[{type:"mc",q:"She has ___ umbrella.",opts:["a","an","the","—"],correct:1,exp:"\"Umbrella\" starts with a vowel sound → \"an\"."},{type:"mc",q:"He is ___ engineer.",opts:["a","an","the","—"],correct:1,exp:"\"Engineer\" starts with a vowel sound → \"an\"."},{type:"error",q:"Find the error: \"I have a apple.\"",opts:["I → We","a → an","have → has","No error"],correct:1,exp:"\"Apple\" starts with a vowel → \"an apple\"."},{type:"fill",q:"I want ___ orange juice.",answer:"an",exp:"\"Orange\" starts with a vowel sound → \"an\"."},{type:"mc",q:"She drives ___ old car.",opts:["a","an","the","—"],correct:1,exp:"\"Old\" starts with a vowel sound → \"an\"."}]},{topic:"Plural Nouns",explanation:"Most nouns add -s or -es to form the plural. Some are irregular (child/children).",exercises:[{type:"fill",q:"One cat, two ___",answer:"cats",exp:"Regular noun → add -s."},{type:"mc",q:"What is the plural of \"bus\"?",opts:["bus","buss","buses","busis"],correct:2,exp:"Words ending in -s, -sh, -ch, -x add -es."},{type:"mc",q:"What is the plural of \"child\"?",opts:["childs","childes","children","child"],correct:2,exp:"\"Child\" is an irregular plural → \"children\"."},{type:"error",q:"Find the error: \"She has two boxs.\"",opts:["She → He","boxs → boxes","has → have","No error"],correct:1,exp:"\"Box\" ends in -x → add -es: \"boxes\"."},{type:"fill",q:"One man, two ___",answer:"men",exp:"Irregular plural: man → men."}]},{topic:"Numbers & Basic Greetings",explanation:"Learn numbers 1–20 and everyday greetings: Hello, Good morning, Thank you.",exercises:[{type:"mc",q:"How do you say 15 in English?",opts:["fifty","fiveteen","fifteen","fiften"],correct:2,exp:"15 = fifteen."},{type:"mc",q:"Which is the correct greeting for morning?",opts:["Good night","Good evening","Good morning","Good afternoon"],correct:2,exp:"\"Good morning\" is used before noon."},{type:"fill",q:"10 + 5 = ___",answer:"fifteen",exp:"10 + 5 = 15 = fifteen."},{type:"mc",q:"How do you say 12 in English?",opts:["twelfth","twelve","twentee","twelf"],correct:1,exp:"12 = twelve."},{type:"error",q:"Find the error: \"Good Night! How are you?\" (morning context)",opts:["Good Night → Good Morning","How → What","you → u","No error"],correct:0,exp:"\"Good Night\" is for the evening, not morning."}]},{topic:"Verb To Have",explanation:"Use \"have\" with I/you/we/they and \"has\" with he/she/it.",exercises:[{type:"mc",q:"She ___ a red car.",opts:["have","has","is","are"],correct:1,exp:"3rd person singular → \"has\"."},{type:"error",q:"Find the error: \"They has two cats.\"",opts:["They → He","has → have","cats → cat","No error"],correct:1,exp:"\"They\" requires \"have\"."},{type:"fill",q:"I ___ a big family.",answer:"have",exp:"\"I\" always uses \"have\"."},{type:"mc",q:"My parents ___ a new house.",opts:["has","is","have","are"],correct:2,exp:"\"My parents\" = plural → \"have\"."},{type:"fill",q:"He ___ two brothers and one sister.",answer:"has",exp:"\"He\" is 3rd person singular → \"has\"."}]},{topic:"Common Adjectives",explanation:"Adjectives describe nouns. In English, they go BEFORE the noun: \"a big house\".",exercises:[{type:"mc",q:"Which sentence is correct?",opts:["A house big","A big house","Big a house","House big a"],correct:1,exp:"Adjective comes before the noun in English."},{type:"mc",q:"She is a ___ girl. (happy)",opts:["girl happy","happy girl","happily girl","girl happily"],correct:1,exp:"Adjective before noun: \"a happy girl\"."},{type:"fill",q:"The sky is ___. (blue)",answer:"blue",exp:"Adjectives also come after \"to be\"."},{type:"error",q:"Find the error: \"It is a day beautiful.\"",opts:["It → This","a day beautiful → a beautiful day","is → are","No error"],correct:1,exp:"Adjective goes BEFORE the noun."},{type:"mc",q:"Opposite of \"hot\" is:",opts:["warm","cool","cold","freezing"],correct:2,exp:"The direct opposite of \"hot\" is \"cold\"."}]},{topic:"Days of the Week",explanation:"Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday. Always capitalized in English.",exercises:[{type:"mc",q:"Which day comes after Wednesday?",opts:["Tuesday","Friday","Thursday","Monday"],correct:2,exp:"Mon → Tue → Wed → Thu → Fri → Sat → Sun."},{type:"error",q:"Find the error: \"I work on monday.\"",opts:["I → We","on → in","monday → Monday","work → works"],correct:2,exp:"Days of the week are always capitalized."},{type:"mc",q:"Saturday and Sunday are the ___",opts:["workdays","weekdays","weekend","holidays"],correct:2,exp:"Saturday + Sunday = the weekend."},{type:"fill",q:"The day after Sunday is ___",answer:"Monday",exp:"The week starts again with Monday."},{type:"mc",q:"Which day comes BEFORE Friday?",opts:["Saturday","Wednesday","Sunday","Thursday"],correct:3,exp:"Thu comes right before Fri."}]},{topic:"Basic Questions — WH Words",explanation:"Who (person), What (thing), Where (place), When (time), Why (reason), How (manner).",exercises:[{type:"mc",q:"___ is your name?",opts:["Where","When","What","Who"],correct:2,exp:"\"What\" is used for things/information like a name."},{type:"mc",q:"___ do you live?",opts:["What","Who","When","Where"],correct:3,exp:"\"Where\" asks about a place."},{type:"fill",q:"___ old are you?",answer:"How",exp:"\"How old\" asks about age."},{type:"mc",q:"___ is your birthday?",opts:["Where","What","When","Who"],correct:2,exp:"\"When\" asks about time/date."},{type:"error",q:"Find the error: \"Where is your name?\"",opts:["Where → What","is → are","your → you","No error"],correct:0,exp:"\"What is your name?\" — not \"Where\"."}]},{topic:"Colors in English",explanation:"Basic colors: red, blue, green, yellow, black, white, orange, purple, pink, brown.",exercises:[{type:"mc",q:"The sky is usually ___ during the day.",opts:["green","red","blue","purple"],correct:2,exp:"The daytime sky is blue."},{type:"fill",q:"Bananas are ___",answer:"yellow",exp:"Bananas are yellow."},{type:"mc",q:"Which color do you get mixing red and white?",opts:["purple","orange","pink","brown"],correct:2,exp:"Red + White = Pink."},{type:"error",q:"Find the error: \"Grass is usually red.\"",opts:["Grass → Trees","usually → always","red → green","No error"],correct:2,exp:"Grass is green, not red."},{type:"fill",q:"The opposite of black is ___",answer:"white",exp:"Black and white are opposites."}]}],
  a1:[{topic:"Present Simple — Affirmative",explanation:"Use the base verb for I/you/we/they. Add -s/-es for he/she/it: \"She works\".",exercises:[{type:"mc",q:"He ___ to school every day.",opts:["go","goes","going","gone"],correct:1,exp:"3rd person singular → add -es to \"go\" → \"goes\"."},{type:"fill",q:"She ___ (like) coffee.",answer:"likes",exp:"3rd person singular → \"likes\"."},{type:"error",q:"Find the error: \"They goes to the gym.\"",opts:["They → He","goes → go","to → at","No error"],correct:1,exp:"\"They\" takes the base form → \"go\"."},{type:"mc",q:"My sister ___ in London.",opts:["live","lives","is living","lived"],correct:1,exp:"\"My sister\" = 3rd person singular → \"lives\"."},{type:"fill",q:"I ___ (study) English every morning.",answer:"study",exp:"\"I\" takes the base form → \"study\"."}]},{topic:"Present Simple — Negative",explanation:"Use \"don't\" (I/you/we/they) or \"doesn't\" (he/she/it) + base verb.",exercises:[{type:"mc",q:"She ___ like pizza.",opts:["don't","doesn't","isn't","aren't"],correct:1,exp:"She → \"doesn't\" + base verb."},{type:"fill",q:"They ___ (not watch) TV.",answer:"don't watch",exp:"\"They\" → \"don't\" + base verb."},{type:"error",q:"Find the error: \"He don't play football.\"",opts:["He → They","don't → doesn't","play → plays","No error"],correct:1,exp:"\"He\" requires \"doesn't\"."},{type:"mc",q:"We ___ live in Paris.",opts:["doesn't","don't","aren't","isn't"],correct:1,exp:"\"We\" → \"don't\"."},{type:"fill",q:"She ___ (not like) horror films.",answer:"doesn't like",exp:"\"She\" → \"doesn't\" + base verb."}]},{topic:"Present Simple — Questions",explanation:"Use Do/Does + subject + base verb. \"Do you play?\" / \"Does she work?\"",exercises:[{type:"mc",q:"___ she speak French?",opts:["Do","Does","Is","Are"],correct:1,exp:"3rd person singular question → \"Does\"."},{type:"fill",q:"___ you like music?",answer:"Do",exp:"\"You\" → use \"Do\"."},{type:"mc",q:"Which question is correct?",opts:["Does they work?","Do she work?","Does he work?","Do he works?"],correct:2,exp:"\"He\" → \"Does he work?\""},{type:"error",q:"Find the error: \"Do she live here?\"",opts:["Do → Does","she → he","live → lives","No error"],correct:0,exp:"\"She\" is 3rd singular → \"Does she live here?\""},{type:"fill",q:"___ your parents work on Saturdays?",answer:"Do",exp:"\"Your parents\" = plural → \"Do\"."}]},{topic:"Prepositions of Time — In, On, At",explanation:"\"At\" for exact times, \"on\" for days/dates, \"in\" for months/years/seasons.",exercises:[{type:"mc",q:"I wake up ___ 7 o'clock.",opts:["in","on","at","by"],correct:2,exp:"Exact time → \"at 7 o'clock\"."},{type:"mc",q:"She was born ___ July.",opts:["at","on","in","by"],correct:2,exp:"Month → \"in July\"."},{type:"fill",q:"We have class ___ Monday.",answer:"on",exp:"Days of the week → \"on Monday\"."},{type:"mc",q:"He started working here ___ 2019.",opts:["on","at","in","by"],correct:2,exp:"Years → \"in 2019\"."},{type:"error",q:"Find the error: \"The party is in Friday.\"",opts:["The → A","in → on","party → parties","No error"],correct:1,exp:"Days of the week → \"on Friday\"."}]},{topic:"Prepositions of Place — In, On, At",explanation:"\"At\" for specific locations, \"on\" for surfaces, \"in\" for enclosed spaces.",exercises:[{type:"mc",q:"The book is ___ the table.",opts:["in","at","on","by"],correct:2,exp:"Surface → \"on the table\"."},{type:"fill",q:"She is ___ home.",answer:"at",exp:"\"At home\" is a fixed expression."},{type:"error",q:"Find the error: \"He is in the bus stop.\"",opts:["He → She","in → at","bus → buss","No error"],correct:1,exp:"Specific location → \"at the bus stop\"."},{type:"mc",q:"The keys are ___ my bag.",opts:["at","on","in","by"],correct:2,exp:"Inside an enclosed space → \"in my bag\"."},{type:"fill",q:"There is a picture ___ the wall.",answer:"on",exp:"Surface → \"on the wall\"."}]},{topic:"There is / There are",explanation:"Use \"there is\" for singular and \"there are\" for plural to say something exists.",exercises:[{type:"mc",q:"___ a cat in the garden.",opts:["There are","There is","There was","It is"],correct:1,exp:"Singular \"a cat\" → \"There is\"."},{type:"fill",q:"___ three students in the room.",answer:"There are",exp:"Plural → \"There are\"."},{type:"error",q:"Find the error: \"There is two books on the desk.\"",opts:["There is → There are","two → second","books → book","No error"],correct:0,exp:"\"Two books\" is plural → \"There are\"."},{type:"mc",q:"___ a problem with the computer.",opts:["There are","There is","There were","They are"],correct:1,exp:"Singular \"a problem\" → \"There is\"."},{type:"fill",q:"___ many people at the party.",answer:"There are",exp:"\"Many people\" is plural → \"There are\"."}]},{topic:"Possessive Adjectives",explanation:"my, your, his, her, its, our, their — used before nouns to show ownership.",exercises:[{type:"mc",q:"That is ___ car. (belongs to him)",opts:["my","your","his","her"],correct:2,exp:"Male possession → \"his\"."},{type:"fill",q:"We love ___ school.",answer:"our",exp:"\"We\" → \"our\"."},{type:"error",q:"Find the error: \"She forgot hers bag.\"",opts:["She → He","hers → her","forgot → forgets","No error"],correct:1,exp:"\"Her\" is already possessive — no -s needed."},{type:"mc",q:"The dog wagged ___ tail.",opts:["his","her","their","its"],correct:3,exp:"For animals/things → \"its\"."},{type:"fill",q:"They sold ___ house last year.",answer:"their",exp:"\"They\" → \"their\"."}]},{topic:"Can / Can't for Ability",explanation:"Use \"can\" to say you are able to do something. \"Can't\" = cannot.",exercises:[{type:"mc",q:"She ___ swim very well.",opts:["can","cans","is can","does can"],correct:0,exp:"\"Can\" never adds -s. \"She can swim\"."},{type:"fill",q:"I ___ drive. I don't have a license.",answer:"can't",exp:"\"Can't\" = cannot."},{type:"mc",q:"Which is correct?",opts:["He can to run fast","He cans run fast","He can run fast","He can runs fast"],correct:2,exp:"Can + base verb (no \"to\", no -s)."},{type:"error",q:"Find the error: \"Can you to help me?\"",opts:["Can → Could","you → I","to help → help","No error"],correct:2,exp:"After \"can\" → base verb (no \"to\")."},{type:"fill",q:"Birds ___ fly, but penguins ___.",answer:"can, can't",exp:"Most birds can fly; penguins cannot."}]},{topic:"Object Pronouns",explanation:"me, you, him, her, it, us, them — used as the object of a verb or preposition.",exercises:[{type:"mc",q:"Can you help ___? (me/I)",opts:["I","me","my","mine"],correct:1,exp:"After a verb → object pronoun \"me\"."},{type:"mc",q:"I love ___. (him/he)",opts:["he","his","him","himself"],correct:2,exp:"After a verb → \"him\"."},{type:"fill",q:"Tell ___ the truth.",answer:"me",exp:"\"Tell me\" → object pronoun."},{type:"error",q:"Find the error: \"She called I yesterday.\"",opts:["She → He","called → called","I → me","No error"],correct:2,exp:"Object of verb → \"me\", not \"I\"."},{type:"mc",q:"They invited ___ to the party.",opts:["we","our","us","ours"],correct:2,exp:"Object pronoun for \"we\" → \"us\"."}]},{topic:"Imperatives",explanation:"Use the base verb to give commands or instructions. \"Open the door.\" / \"Don't talk!\"",exercises:[{type:"mc",q:"How do you say \"Nao fale!\" in English?",opts:["Not talk!","Don't talk!","No talk!","Doesn't talk!"],correct:1,exp:"Negative imperative = Don't + base verb."},{type:"fill",q:"___ your homework! (do)",answer:"Do",exp:"Imperative: base verb \"Do\"."},{type:"error",q:"Find the error: \"Please to close the window.\"",opts:["Please → Kindly","to close → close","window → windows","No error"],correct:1,exp:"Imperatives don't use \"to\": \"Please close\"."},{type:"mc",q:"Which is a correct imperative?",opts:["You sit down.","Please sits down.","Sit down, please.","Sitting down."],correct:2,exp:"Imperative: \"Sit down\" (base verb first)."},{type:"fill",q:"___ quiet, please! (be)",answer:"Be",exp:"\"Be quiet\" — imperative of \"to be\"."}]}],
  a2:[{topic:"Past Simple — Regular Verbs",explanation:"Add -ed to regular verbs: walk→walked, play→played. Use \"did not\" for negatives.",exercises:[{type:"mc",q:"She ___ (watch) TV last night.",opts:["watch","watches","watched","watching"],correct:2,exp:"Past simple regular → add -ed: \"watched\"."},{type:"fill",q:"They ___ (play) football yesterday.",answer:"played",exp:"Past simple → \"played\"."},{type:"error",q:"Find the error: \"He didn't went to school.\"",opts:["He → She","didn't went → didn't go","school → class","No error"],correct:1,exp:"After \"didn't\" always use the base form."},{type:"mc",q:"We ___ (visit) Rome last summer.",opts:["visit","visited","visits","visiting"],correct:1,exp:"Regular past simple → \"visited\"."},{type:"fill",q:"She ___ (clean) her room this morning.",answer:"cleaned",exp:"Regular verb → add -ed: \"cleaned\"."}]},{topic:"Past Simple — Irregular Verbs",explanation:"Common irregulars: go→went, have→had, see→saw, come→came, take→took.",exercises:[{type:"mc",q:"She ___ to Paris last summer.",opts:["go","goes","went","gone"],correct:2,exp:"Past of \"go\" → \"went\"."},{type:"fill",q:"We ___ (see) a great movie.",answer:"saw",exp:"Past of \"see\" → \"saw\"."},{type:"mc",q:"Which is the past of \"have\"?",opts:["haved","had","has","having"],correct:1,exp:"Irregular: have → had."},{type:"error",q:"Find the error: \"I taked the bus yesterday.\"",opts:["I → She","taked → took","bus → train","No error"],correct:1,exp:"Irregular: take → took (not \"taked\")."},{type:"fill",q:"He ___ (come) to the party late.",answer:"came",exp:"Irregular: come → came."}]},{topic:"Past Simple — Questions",explanation:"Use \"Did + subject + base verb\" for past questions. \"Did you go?\" / \"Did she eat?\"",exercises:[{type:"mc",q:"___ you go to the party?",opts:["Do","Did","Was","Were"],correct:1,exp:"Past question → \"Did you go?\""},{type:"fill",q:"___ she call you?",answer:"Did",exp:"\"Did\" starts past questions."},{type:"error",q:"Find the error: \"Did she went to school?\"",opts:["Did → Does","went → go","school → work","No error"],correct:1,exp:"After \"Did\" → base verb \"go\"."},{type:"mc",q:"Where ___ you go last night?",opts:["do","does","did","was"],correct:2,exp:"Past question → \"did you go\"."},{type:"fill",q:"___ he study for the exam?",answer:"Did",exp:"\"Did\" + subject + base verb."}]},{topic:"Comparatives",explanation:"Short adjectives: add -er (bigger, taller). Long adjectives: use \"more\" (more expensive).",exercises:[{type:"mc",q:"This book is ___ than that one. (interesting)",opts:["interestinger","more interesting","most interesting","interestingmore"],correct:1,exp:"Long adjective → \"more interesting\"."},{type:"fill",q:"He is ___ than his brother. (tall)",answer:"taller",exp:"Short adjective → add -er: \"taller\"."},{type:"error",q:"Find the error: \"She is more tall than me.\"",opts:["She → He","more tall → taller","than → as","No error"],correct:1,exp:"Short adjective \"tall\" → \"taller\", not \"more tall\"."},{type:"mc",q:"This car is ___ than mine. (expensive)",opts:["expensiver","most expensive","more expensive","expensivest"],correct:2,exp:"Long adjective → \"more expensive\"."},{type:"fill",q:"Summer is ___ than winter. (hot)",answer:"hotter",exp:"Short adjective + double consonant → \"hotter\"."}]},{topic:"Superlatives",explanation:"Short adjectives: add -est (biggest). Long adjectives: use \"the most\" (the most expensive).",exercises:[{type:"mc",q:"She is ___ girl in the class. (smart)",opts:["smarter","the most smart","the smartest","most smartest"],correct:2,exp:"Short adjective + -est: \"the smartest\"."},{type:"fill",q:"It is ___ movie I have ever seen. (good)",answer:"the best",exp:"Irregular superlative: good → the best."},{type:"mc",q:"This is ___ building in the city. (tall)",opts:["the tallest","the most tall","taller","more taller"],correct:0,exp:"Short adjective → \"the tallest\"."},{type:"error",q:"Find the error: \"He is the most fast runner.\"",opts:["He → She","most fast → fastest","runner → runners","No error"],correct:1,exp:"Short adjective \"fast\" → \"the fastest\"."},{type:"fill",q:"Brazil is ___ country in South America. (big)",answer:"the biggest",exp:"Short adj + -est: big → biggest (double consonant)."}]},{topic:"Past Continuous",explanation:"Was/were + verb-ing. Describes an action in progress at a specific time in the past.",exercises:[{type:"mc",q:"At 8 PM, she ___ (study).",opts:["studied","was studying","is studying","studies"],correct:1,exp:"Action in progress in the past → \"was studying\"."},{type:"fill",q:"They ___ (play) when it started to rain.",answer:"were playing",exp:"\"They\" + past continuous → \"were playing\"."},{type:"error",q:"Find the error: \"He were watching TV.\"",opts:["He → They","were → was","watching → watched","No error"],correct:1,exp:"\"He\" (singular) → \"was watching\"."},{type:"mc",q:"I ___ (sleep) when you called.",opts:["slept","was sleeping","am sleeping","sleep"],correct:1,exp:"Past continuous for interrupted action → \"was sleeping\"."},{type:"fill",q:"We ___ (have) dinner at 7 o'clock.",answer:"were having",exp:"\"We\" + past continuous → \"were having\"."}]},{topic:"Adverbs of Frequency",explanation:"Always(100%), usually, often, sometimes, rarely, never(0%) go before the main verb.",exercises:[{type:"mc",q:"She ___ eats breakfast. (100% of the time)",opts:["never","sometimes","always","rarely"],correct:2,exp:"100% → \"always\"."},{type:"fill",q:"I ___ go to bed late. I prefer sleeping early.",answer:"rarely",exp:"Almost never → \"rarely\"."},{type:"error",q:"Find the error: \"He eats always lunch at noon.\"",opts:["He → She","always → never","eats always → always eats","No error"],correct:2,exp:"Adverb of frequency goes BEFORE the main verb."},{type:"mc",q:"Which adverb means \"about 50% of the time\"?",opts:["always","never","often","sometimes"],correct:3,exp:"\"Sometimes\" = approximately 50% frequency."},{type:"fill",q:"She ___ brushes her teeth before bed. (every time)",answer:"always",exp:"100% → \"always\"."}]},{topic:"Going To — Future Plans",explanation:"Use \"am/is/are going to + base verb\" to talk about plans or intentions.",exercises:[{type:"mc",q:"She ___ visit her parents next week.",opts:["going to","is going to","go to","will going"],correct:1,exp:"\"She\" → \"is going to visit\"."},{type:"fill",q:"We ___ (study) tonight.",answer:"are going to study",exp:"\"We\" → \"are going to\" + base verb."},{type:"error",q:"Find the error: \"He is go to travel tomorrow.\"",opts:["He → She","go → going","travel → traveling","No error"],correct:1,exp:"\"Is going to\" — needs \"going\", not \"go\"."},{type:"mc",q:"I ___ buy a new phone. (I have already decided)",opts:["am going to","is going to","are going to","go to"],correct:0,exp:"\"I\" → \"am going to\"."},{type:"fill",q:"___ they ___ (move) to a new city?",answer:"Are, going to move",exp:"\"They\" → \"Are they going to move?\""}]},{topic:"Countable vs Uncountable Nouns",explanation:"Countable: can be counted (an apple, two apples). Uncountable: can't be counted (water, money).",exercises:[{type:"mc",q:"Which is uncountable?",opts:["chair","book","water","car"],correct:2,exp:"\"Water\" cannot be counted individually."},{type:"mc",q:"She wants ___ information.",opts:["an","a","some","one"],correct:2,exp:"\"Information\" is uncountable → \"some information\"."},{type:"fill",q:"Could I have ___ water please?",answer:"some",exp:"Uncountable noun → \"some water\"."},{type:"error",q:"Find the error: \"I need an advice.\"",opts:["I → We","an → some","advice → advices","No error"],correct:1,exp:"\"Advice\" is uncountable → \"some advice\" (no \"an\")."},{type:"mc",q:"Which word is countable?",opts:["music","furniture","idea","equipment"],correct:2,exp:"\"Idea\" is countable (one idea, two ideas)."}]},{topic:"Questions with How",explanation:"\"How long?\" = duration, \"How often?\" = frequency, \"How far?\" = distance.",exercises:[{type:"mc",q:"___ does it take to get there? (1 hour)",opts:["How far","How often","How long","How much"],correct:2,exp:"\"1 hour\" is duration → \"How long?\""},{type:"fill",q:"___ do you exercise? — Three times a week.",answer:"How often",exp:"Frequency → \"How often?\""},{type:"mc",q:"___ is it from here? (5 km)",opts:["How long","How much","How often","How far"],correct:3,exp:"5 km is distance → \"How far?\""},{type:"error",q:"Find the error: \"How long do you go to the gym?\" (3 days/week)",opts:["How long → How often","do → does","go → went","No error"],correct:0,exp:"Frequency (3 days/week) → \"How often?\""},{type:"fill",q:"___ does the flight take? — About 10 hours.",answer:"How long",exp:"Duration (10 hours) → \"How long?\""}]}],
  b1:[{topic:"Present Perfect — Introduction",explanation:"Have/has + past participle. Connects past actions to the present. \"I have eaten.\"",exercises:[{type:"mc",q:"She ___ (visit) Paris three times.",opts:["visited","has visited","have visited","visit"],correct:1,exp:"\"She\" (singular) → \"has visited\"."},{type:"fill",q:"I have never ___ (eat) sushi.",answer:"eaten",exp:"\"Eat\" irregular past participle → \"eaten\"."},{type:"error",q:"Find the error: \"He have finished the report.\"",opts:["He → They","have → has","finished → finish","No error"],correct:1,exp:"\"He\" → \"has finished\"."},{type:"mc",q:"They ___ just ___ the film. (watch)",opts:["have watched","has watched","watched","are watching"],correct:0,exp:"\"They\" → \"have watched\"."},{type:"fill",q:"We ___ (never / be) to Australia.",answer:"have never been",exp:"\"Have never been\" = never visited."}]},{topic:"Present Perfect — Since vs For",explanation:"\"Since\" = starting point (since 2020). \"For\" = duration (for 5 years).",exercises:[{type:"mc",q:"She has lived here ___ 2018.",opts:["for","since","during","from"],correct:1,exp:"2018 is a starting point → \"since\"."},{type:"fill",q:"He has worked there ___ ten years.",answer:"for",exp:"10 years is a duration → \"for\"."},{type:"mc",q:"I have known her ___ we were children.",opts:["for","during","since","in"],correct:2,exp:"\"We were children\" is a starting point → \"since\"."},{type:"error",q:"Find the error: \"They have lived here since five years.\"",opts:["They → We","since → for","lived → live","No error"],correct:1,exp:"\"Five years\" is a duration → \"for five years\"."},{type:"fill",q:"I have had this phone ___ March.",answer:"since",exp:"March is a starting point → \"since\"."}]},{topic:"Modal Verbs — Should / Shouldn't",explanation:"\"Should\" gives advice or recommendation. \"Shouldn't\" = it's not a good idea.",exercises:[{type:"mc",q:"You look tired. You ___ go to bed early.",opts:["must","should","can","would"],correct:1,exp:"Advice → \"should\"."},{type:"fill",q:"You ___ eat so much junk food. It's bad for you.",answer:"shouldn't",exp:"Negative advice → \"shouldn't\"."},{type:"error",q:"Find the error: \"She should to study more.\"",opts:["She → He","should to → should","study → studies","No error"],correct:1,exp:"Modal verbs don't use \"to\": \"should study\"."},{type:"mc",q:"Which sentence gives advice?",opts:["I can swim.","You should drink more water.","She is tired.","They played football."],correct:1,exp:"\"Should\" gives advice."},{type:"fill",q:"You ___ worry so much. Try to relax!",answer:"shouldn't",exp:"Negative advice → \"shouldn't worry\"."}]},{topic:"Modal Verbs — Must / Mustn't",explanation:"\"Must\" = strong obligation. \"Mustn't\" = it is prohibited. NOT the same as \"don't have to\".",exercises:[{type:"mc",q:"You ___ wear a seatbelt. It's the law.",opts:["should","must","can","might"],correct:1,exp:"Law = strong obligation → \"must\"."},{type:"fill",q:"You ___ smoke in here. It's forbidden.",answer:"mustn't",exp:"\"Mustn't\" = prohibited."},{type:"mc",q:"Which is correct? (exam tomorrow)",opts:["I mustn't study","I must to study","I must study","I musts study"],correct:2,exp:"Must + base verb (no \"to\")."},{type:"error",q:"Find the error: \"You musts leave now.\"",opts:["You → He","musts → must","leave → leaving","No error"],correct:1,exp:"\"Must\" never adds -s."},{type:"fill",q:"Children ___ touch electrical sockets. It's dangerous.",answer:"mustn't",exp:"\"Mustn't\" = prohibition for safety."}]},{topic:"First Conditional",explanation:"If + present simple, will + base verb. Real/possible future situations.",exercises:[{type:"mc",q:"If it rains, we ___ stay inside.",opts:["stayed","will stay","would stay","stay"],correct:1,exp:"1st conditional → \"will stay\"."},{type:"fill",q:"If you study hard, you ___ (pass) the exam.",answer:"will pass",exp:"Result clause → \"will\" + base verb."},{type:"error",q:"Find the error: \"If she will come, I will be happy.\"",opts:["If → When","will come → comes","will be → am","No error"],correct:1,exp:"After \"if\" → present simple, not \"will\"."},{type:"mc",q:"If they ___ early, we can have lunch together.",opts:["will arrive","arrived","arrive","arriving"],correct:2,exp:"If-clause → present simple \"arrive\"."},{type:"fill",q:"If you don't hurry, you ___ (miss) the bus.",answer:"will miss",exp:"Result of not hurrying → \"will miss\"."}]},{topic:"Reported Speech — Statements",explanation:"Change tense back: say \"I am tired\" → reported as \"He said he was tired\".",exercises:[{type:"mc",q:"Direct: \"I live in London.\" Reported: She said she ___ in London.",opts:["lives","lived","is living","will live"],correct:1,exp:"Present simple → past simple in reported speech."},{type:"fill",q:"He said: \"I am hungry.\" → He said he ___ hungry.",answer:"was",exp:"\"Am\" → \"was\" in reported speech."},{type:"mc",q:"\"I will help you.\" → She said she ___ help me.",opts:["will","would","should","could"],correct:1,exp:"\"Will\" → \"would\" in reported speech."},{type:"error",q:"Find the error: \"She said she will come tomorrow.\"",opts:["she → he","will → would","come → came","No error"],correct:1,exp:"\"Will\" becomes \"would\" in reported speech."},{type:"fill",q:"\"I can swim.\" → He said he ___ swim.",answer:"could",exp:"\"Can\" → \"could\" in reported speech."}]},{topic:"Relative Clauses — Who, Which, That",explanation:"\"Who\" for people, \"which\" for things, \"that\" for both. They add information about nouns.",exercises:[{type:"mc",q:"The man ___ lives next door is a doctor.",opts:["which","whose","who","that it"],correct:2,exp:"\"Man\" is a person → \"who\"."},{type:"fill",q:"This is the book ___ I told you about.",answer:"that",exp:"\"That\" can refer to things."},{type:"mc",q:"The car ___ she bought is very expensive.",opts:["who","whose","whom","which"],correct:3,exp:"\"Car\" is a thing → \"which\"."},{type:"error",q:"Find the error: \"The woman which won the race is my friend.\"",opts:["The → A","which → who","won → wins","No error"],correct:1,exp:"For people → \"who\", not \"which\"."},{type:"fill",q:"That is the restaurant ___ we went on our first date.",answer:"where",exp:"\"Where\" is used for places in relative clauses."}]},{topic:"Phrasal Verbs — Common Ones",explanation:"Phrasal verbs = verb + preposition/adverb. \"Give up\" (quit), \"find out\" (discover).",exercises:[{type:"mc",q:"Don't ___ (desistir)! Keep trying!",opts:["give out","give up","give in","give away"],correct:1,exp:"\"Give up\" = quit/desistir."},{type:"fill",q:"I need to ___ what time the bus leaves. (discover)",answer:"find out",exp:"\"Find out\" = discover."},{type:"mc",q:"\"Turn off\" means:",opts:["increase","activate","deactivate/turn off","turn around"],correct:2,exp:"\"Turn off\" = deactivate."},{type:"error",q:"Find the error: \"Please turn of the lights.\"",opts:["Please → Kindly","turn of → turn off","lights → light","No error"],correct:1,exp:"\"Turn off\" — double f."},{type:"fill",q:"Can you ___ the music? It's too loud. (reduce)",answer:"turn down",exp:"\"Turn down\" = reduce volume."}]},{topic:"Used To — Past Habits",explanation:"\"Used to + base verb\" describes past habits that no longer happen. \"I used to play football.\"",exercises:[{type:"mc",q:"She ___ smoke, but she quit.",opts:["was use to","used to","uses to","use to"],correct:1,exp:"\"Used to\" expresses a past habit."},{type:"fill",q:"I ___ (love) cartoons when I was a kid.",answer:"used to love",exp:"\"Used to\" + base verb."},{type:"error",q:"Find the error: \"He used to played guitar.\"",opts:["He → She","used to played → used to play","guitar → drums","No error"],correct:1,exp:"\"Used to\" + base verb (not past tense)."},{type:"mc",q:"Which sentence describes a past habit?",opts:["I play tennis now.","I used to play tennis.","I am playing tennis.","I will play tennis."],correct:1,exp:"\"Used to play\" = past habit."},{type:"fill",q:"Did you ___ live in this neighbourhood?",answer:"use to",exp:"Question form → \"Did you use to?\" (no -d)."}]}],
  b2:[{topic:"Passive Voice — All Tenses",explanation:"Passive works in all tenses: is done, was done, has been done, will be done.",exercises:[{type:"mc",q:"The report ___ (write) by the team last week.",opts:["was writing","was written","has been written","were written"],correct:1,exp:"Past simple passive → \"was written\"."},{type:"fill",q:"The new bridge ___ (build) by 2025.",answer:"will be built",exp:"Future passive → \"will be built\"."},{type:"error",q:"Find the error: \"The windows have been broke.\"",opts:["The → These","have been broke → have been broken","windows → window","No error"],correct:1,exp:"Past participle of \"break\" → \"broken\"."},{type:"mc",q:"The meeting ___ (cancel) due to bad weather.",opts:["was cancelling","was cancelled","is cancelled","has cancelled"],correct:1,exp:"Past passive → \"was cancelled\"."},{type:"fill",q:"This novel ___ (translate) into 30 languages.",answer:"has been translated",exp:"Present perfect passive → \"has been translated\"."}]},{topic:"Second Conditional",explanation:"If + past simple, would + base verb. Imaginary/unlikely situations in the present.",exercises:[{type:"mc",q:"If I ___ a million dollars, I would travel the world.",opts:["have","will have","had","would have"],correct:2,exp:"2nd conditional → \"if\" + past simple."},{type:"fill",q:"If she ___ harder, she would get better grades. (study)",answer:"studied",exp:"Past simple in the \"if\" clause."},{type:"error",q:"Find the error: \"If I would be rich, I would buy a yacht.\"",opts:["would be → were/was","rich → wealthy","buy → bought","No error"],correct:0,exp:"2nd conditional: \"If I were rich\" (not \"would be\")."},{type:"mc",q:"I would call her if I ___ her number.",opts:["know","will know","knew","had known"],correct:2,exp:"2nd conditional if-clause → \"knew\"."},{type:"fill",q:"If you ___ (be) taller, you could be a basketball player.",answer:"were",exp:"2nd conditional: \"If you were\" (hypothetical)."}]},{topic:"Third Conditional",explanation:"If + past perfect, would have + past participle. Imaginary past situations.",exercises:[{type:"mc",q:"If she had studied, she ___ the exam.",opts:["passed","would pass","would have passed","had passed"],correct:2,exp:"3rd conditional → \"would have passed\"."},{type:"fill",q:"If I had known, I ___ (tell) you.",answer:"would have told",exp:"\"Would have\" + past participle."},{type:"mc",q:"Which sentence is a 3rd conditional?",opts:["If it rains, I'll stay.","If I were rich, I'd travel.","If she had come, we would have met.","If you want, we can go."],correct:2,exp:"Past perfect + would have = 3rd conditional."},{type:"error",q:"Find the error: \"If he had tried, he would has succeeded.\"",opts:["had tried → tried","would has → would have","succeeded → succeed","No error"],correct:1,exp:"\"Would have\" not \"would has\"."},{type:"fill",q:"They ___ (not lose) if they had practiced more.",answer:"wouldn't have lost",exp:"Negative 3rd conditional."}]},{topic:"Mixed Conditionals",explanation:"3rd cond. \"if\" + 2nd cond. result (or vice versa) — mixes time references.",exercises:[{type:"mc",q:"If she had taken the job, she ___ rich now.",opts:["would be","would have been","will be","had been"],correct:0,exp:"Past action → present result: \"would be\"."},{type:"fill",q:"If I ___ (be) braver, I would have spoken up yesterday.",answer:"were",exp:"Present state affecting past event → \"were\"."},{type:"mc",q:"Mixed conditional links:",opts:["two present events","past cause + present result","two future events","present cause + past result"],correct:1,exp:"Most common: past cause → present result."},{type:"error",q:"Find the error: \"If she was more careful, she would have avoided the accident.\"",opts:["was → had been","more → most","avoided → avoid","No error"],correct:0,exp:"For a past event → \"if she had been more careful\"."},{type:"fill",q:"If he had emigrated, he ___ (live) in Spain now.",answer:"would be living",exp:"Past cause → present result: \"would be living\"."}]},{topic:"Advanced Passive — Reporting Verbs",explanation:"\"It is said that...\" / \"He is believed to be...\" — formal passive with reporting verbs.",exercises:[{type:"mc",q:"People say he is a genius. → It ___ he is a genius.",opts:["is said that","said that","has said that","says that"],correct:0,exp:"Reporting passive → \"It is said that...\""},{type:"fill",q:"Experts believe the economy will improve. → The economy ___ (believe) to improve.",answer:"is believed",exp:"Passive with infinitive → \"is believed to\"."},{type:"mc",q:"\"It is thought that climate change is serious.\" This is:",opts:["Active voice","Passive reporting","Direct speech","A question"],correct:1,exp:"\"It is thought that\" = passive reporting structure."},{type:"error",q:"Find the error: \"It is knowing that she resigned.\"",opts:["It → This","knowing → known","resigned → resigns","No error"],correct:1,exp:"Passive requires past participle: \"It is known\"."},{type:"fill",q:"He is ___ (report) to have left the country.",answer:"reported",exp:"\"Is reported to have\" = passive reporting."}]},{topic:"Inversion for Emphasis",explanation:"For formal/emphatic style: \"Never have I seen...\", \"Rarely does she...\", \"Not only did he...\"",exercises:[{type:"mc",q:"\"Never I have seen such beauty.\" — What is wrong?",opts:["Never → Rarely","I have → have I","such → so much","Nothing"],correct:1,exp:"After \"Never\" → invert subject and auxiliary: \"Never have I\"."},{type:"fill",q:"___ has she been this angry. (hardly ever)",answer:"Rarely",exp:"\"Rarely\" can replace \"hardly ever\" in inversion."},{type:"mc",q:"\"Not only ___ he rude, but also aggressive.\"",opts:["is","was","were","did"],correct:0,exp:"\"Not only is he...\" — present inversion."},{type:"error",q:"Find the error: \"Hardly ever she complains.\"",opts:["Hardly → Almost","she complains → does she complain","ever → never","No error"],correct:1,exp:"After \"Hardly ever\" → invert: \"does she complain\"."},{type:"fill",q:"Under no circumstances ___ you reveal this secret.",answer:"should",exp:"After \"Under no circumstances\" → invert: \"should you\"."}]},{topic:"Subjunctive Mood",explanation:"Used in formal English after \"suggest, recommend, demand, insist\" + that + base verb.",exercises:[{type:"mc",q:"I suggest that he ___ the doctor. (formal)",opts:["sees","see","is seeing","will see"],correct:1,exp:"Subjunctive after \"suggest that\" → bare infinitive \"see\"."},{type:"fill",q:"The committee demanded that the report ___ (submit) immediately.",answer:"be submitted",exp:"Passive subjunctive → \"be submitted\"."},{type:"mc",q:"\"It is essential that every student ___ on time.\"",opts:["is","be","are","will be"],correct:1,exp:"After \"essential that\" → subjunctive \"be\"."},{type:"error",q:"Find the error: \"She insists that he apologizes.\"",opts:["She → He","apologizes → apologize","insists → insisted","No error"],correct:1,exp:"After \"insists that\" → subjunctive \"apologize\" (no -s)."},{type:"fill",q:"The doctor recommended that she ___ more rest. (take)",answer:"take",exp:"Subjunctive after \"recommended that\" → base verb \"take\"."}]},{topic:"Cleft Sentences for Emphasis",explanation:"\"It was X that/who...\" and \"What I need is...\" — structures to emphasize parts of a sentence.",exercises:[{type:"mc",q:"\"I need a break.\" → Emphatic: ___ I need is a break.",opts:["That","What","It","Which"],correct:1,exp:"\"What I need\" cleft emphasizes the object."},{type:"fill",q:"___ was John who broke the window. (emphasize subject)",answer:"It",exp:"\"It was John who...\" cleft emphasizes the subject."},{type:"mc",q:"Which is a correct cleft sentence?",opts:["What he did was leave early.","That he did was leave early.","Which he did was leave early.","How he did was leave early."],correct:0,exp:"\"What he did was...\" is a correct cleft."},{type:"error",q:"Find the error: \"It was yesterday that she called me.\"",opts:["It → This","was yesterday → yesterday was","No error — this is correct","No error"],correct:3,exp:"\"It was yesterday that she called me\" is a correct cleft."},{type:"fill",q:"___ I enjoy most is reading. (What/It)",answer:"What",exp:"\"What I enjoy most is...\" emphasizes the activity."}]},{topic:"Discourse Markers",explanation:"Words linking ideas: however, moreover, nevertheless, therefore, in contrast, on the other hand.",exercises:[{type:"mc",q:"The price is high. ___, the quality is excellent.",opts:["Therefore","However","Moreover","So"],correct:1,exp:"\"However\" introduces a contrast."},{type:"fill",q:"She was tired; ___, she kept working.",answer:"nevertheless",exp:"\"Nevertheless\" = despite this (formal \"but\")."},{type:"mc",q:"\"___, the results confirm our hypothesis.\" (adding evidence)",opts:["However","In contrast","Furthermore","Nevertheless"],correct:2,exp:"\"Furthermore\" adds supporting information."},{type:"error",q:"Find the error: \"He studied hard. Therefore, he failed.\"",opts:["Therefore → However","studied → studies","failed → passes","No error"],correct:0,exp:"\"Therefore\" shows result/consequence — contradictory here."},{type:"fill",q:"The plan seems good; ___, we should consider the risks.",answer:"however",exp:"\"However\" introduces a contrasting point."}]},{topic:"Wish / If Only",explanation:"\"Wish + past simple\" for present regrets. \"Wish + past perfect\" for past regrets.",exercises:[{type:"mc",q:"I wish I ___ taller. (I'm not tall)",opts:["am","was/were","have been","will be"],correct:1,exp:"Present wish → \"wish + past simple\": \"I wish I were taller\"."},{type:"fill",q:"If only I ___ (study) harder — then I would have passed.",answer:"had studied",exp:"Past regret → \"if only + past perfect\"."},{type:"mc",q:"\"I wish she would stop talking.\" This expresses:",opts:["a past regret","a present annoyance about behavior","a hypothetical past","a real condition"],correct:1,exp:"\"Wish + would\" = annoyance about present/future behavior."},{type:"error",q:"Find the error: \"I wish I was there yesterday.\"",opts:["I → She","was → had been","there → here","No error"],correct:1,exp:"Past regret → \"I wish I had been there yesterday\"."},{type:"fill",q:"She wishes she ___ (can) speak Japanese.",answer:"could",exp:"\"Can\" becomes \"could\" with \"wish\" → present wish."}]}],
}

function renderDaily() {
  // ── Estado local ──
  if (!state.daily) state.daily = { answers: {}, submitted: {}, completed: false };
  const ds = state.daily;

  // ── Selecionar prática do dia com base na data ──
  const now = new Date();
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  const mod = state.user.module || 'starter';
  const practices = DAILY_PRACTICES[mod] || DAILY_PRACTICES.starter;
  const todayIndex = dayOfYear % practices.length;
  const practice = practices[todayIndex];

  // ── Chave única do dia (para localStorage) ──
  const todayKey = `nexus_daily_${state.user.id || "guest"}_${now.getFullYear()}_${now.getMonth()}_${now.getDate()}_${mod}`;

  function isDoneToday() {
    try { return localStorage.getItem(todayKey) === 'done'; } catch { return false; }
  }
  function markDoneToday() {
    try { localStorage.setItem(todayKey, 'done'); } catch {}
  }

  const alreadyDone = isDoneToday() || ds.completed;

  const page = h('div', { className: 'daily-page' });

  // ── Header ──
  const dayNum = todayIndex + 1;
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  page.appendChild(h('div', { className: 'daily-header' },
    h('div', { className: 'daily-header-left' },
      h('div', { className: 'daily-tag' }, '🔥 Day ' + dayNum),
      h('h1', { className: 'daily-title' }, practice.topic),
      h('p', { className: 'daily-date' }, dateStr)
    ),
    alreadyDone
      ? h('div', { className: 'daily-done-badge' }, '✓ Completed today!')
      : h('div', { className: 'daily-level-badge' }, mod.toUpperCase())
  ));

  // ── Explicação ──
  page.appendChild(h('div', { className: 'daily-explanation' },
    h('div', { className: 'daily-exp-icon' }, icon('info')),
    h('p', { className: 'daily-exp-text' }, practice.explanation)
  ));

  // ── Exercícios ──
  const exercisesWrap = h('div', { className: 'daily-exercises' });

  practice.exercises.forEach((ex, ei) => {
    const ansKey = 'ex_' + ei;
    const answered = ds.answers[ansKey] !== undefined;
    const userAns = ds.answers[ansKey];
    const submitted = !!ds.submitted[ansKey];

    const exCard = h('div', { className: `daily-ex-card ${submitted ? 'revealed' : ''}` });

    // Tipo label
    const typeLabel = ex.type === 'mc' ? 'Multiple choice'
                    : ex.type === 'fill' ? 'Fill in the blank'
                    : 'Correct the error';
    exCard.appendChild(h('div', { className: 'daily-ex-type' }, typeLabel));
    exCard.appendChild(h('p', { className: 'daily-ex-q' }, (ei + 1) + '. ' + ex.q));

    if (ex.type === 'mc' || ex.type === 'error') {
      // Multiple choice options
      const optsWrap = h('div', { className: 'daily-opts' });
      ex.opts.forEach((opt, oi) => {
        let cls = 'daily-opt';
        if (submitted) {
          if (oi === ex.correct) cls += ' correct';
          else if (userAns === oi && oi !== ex.correct) cls += ' wrong';
        } else if (userAns === oi) cls += ' selected';

        optsWrap.appendChild(h('button', {
          className: cls,
          disabled: submitted || alreadyDone,
          onClick: () => {
            if (!submitted && !alreadyDone) {
              ds.answers[ansKey] = oi;
              render();
            }
          }
        }, opt));
      });
      exCard.appendChild(optsWrap);

      if (!submitted && !alreadyDone) {
        exCard.appendChild(h('button', {
          className: `daily-check-btn ${answered ? '' : 'disabled'}`,
          disabled: !answered,
          onClick: () => {
            if (answered) { ds.submitted[ansKey] = true; render(); }
          }
        }, 'Check answer'));
      }
    } else if (ex.type === 'fill') {
      // Fill in the blank
      if (!submitted && !alreadyDone) {
        const inp = h('input', {
          className: 'daily-fill-input',
          type: 'text',
          placeholder: 'Type your answer…',
          value: ds.answers[ansKey] || '',
          onInput: (e) => { ds.answers[ansKey] = e.target.value; },
          onKeyDown: (e) => { if (e.key === 'Enter' && ds.answers[ansKey]) { ds.submitted[ansKey] = true; render(); } }
        });
        exCard.appendChild(inp);
        exCard.appendChild(h('button', {
          className: `daily-check-btn ${ds.answers[ansKey] ? '' : 'disabled'}`,
          disabled: !ds.answers[ansKey],
          onClick: () => {
            if (ds.answers[ansKey]) { ds.submitted[ansKey] = true; render(); }
          }
        }, 'Check answer'));
      } else {
        const isCorrect = typeof userAns === 'string' &&
          userAns.trim().toLowerCase() === ex.answer.toLowerCase();
        exCard.appendChild(h('div', { className: `daily-fill-result ${isCorrect ? 'correct' : 'wrong'}` },
          h('span', {}, 'Your answer: '),
          h('strong', {}, userAns || ex.answer),
          !isCorrect ? h('span', { className: 'daily-correct-ans' }, ' ✓ ' + ex.answer) : null
        ));
      }
    }

    // Feedback
    if (submitted || alreadyDone) {
      let isRight = false;
      if (ex.type === 'fill') {
        isRight = typeof userAns === 'string' && userAns.trim().toLowerCase() === ex.answer.toLowerCase();
      } else {
        isRight = userAns === ex.correct;
      }
      exCard.appendChild(h('div', { className: `daily-feedback ${isRight ? 'right' : 'wrong'}` },
        h('span', { className: 'daily-feedback-icon' }, isRight ? '✓' : '✗'),
        h('span', {}, ex.exp)
      ));
    }

    exercisesWrap.appendChild(exCard);
  });

  page.appendChild(exercisesWrap);

  // ── Botão Complete ──
  const allSubmitted = practice.exercises.every((_, ei) => !!ds.submitted['ex_' + ei]);

  if (!alreadyDone) {
    if (allSubmitted) {
      const score = practice.exercises.filter((ex, ei) => {
        const ua = ds.answers['ex_' + ei];
        return ex.type === 'fill'
          ? typeof ua === 'string' && ua.trim().toLowerCase() === ex.answer.toLowerCase()
          : ua === ex.correct;
      }).length;
      const pct = Math.round((score / practice.exercises.length) * 100);

      page.appendChild(h('div', { className: 'daily-summary' },
        h('div', { className: 'daily-summary-score' },
          h('span', { className: 'daily-summary-num' }, score + '/' + practice.exercises.length),
          h('span', { className: 'daily-summary-label' }, 'correct')
        ),
        h('button', {
          className: 'daily-complete-btn',
          onClick: () => {
            markDoneToday();
            ds.completed = true;
            // Update streak
            const p = JSON.parse(localStorage.getItem('nexus_aulas_progress') || '{}');
            render();
          }
        }, '🔥 Complete Daily Practice')
      ));
    }
  } else {
    page.appendChild(h('div', { className: 'daily-done-msg' },
      h('div', { className: 'daily-done-icon' }, '🎉'),
      h('h2', { className: 'daily-done-title' }, "You're done for today!"),
      h('p', { className: 'daily-done-sub' }, 'Come back tomorrow for a new practice.'),
      h('button', {
        className: 'daily-go-home',
        onClick: () => { state.tab = 'home'; render(); }
      }, '< Back to Home')
    ));
  }

  return page;
}


// ══════════════════════════════════════════════════════════════
// ADMIN PANEL
// ══════════════════════════════════════════════════════════════
function renderAdminPanel() {
  const d = h('div');

  const titles = {
    students: { kicker: 'Cadastro', title: 'Gestão de <span>alunos</span>', sub: 'Cadastre, edite e organize os logins de cada aluno do portal.' },
    sections: { kicker: 'Organização', title: 'Seções do <span>portal</span>', sub: 'Crie os blocos que aparecerão no portal dos alunos. Cada seção agrupa conteúdos relacionados.' },
    contents: { kicker: 'Conteúdos', title: 'Itens das <span>seções</span>', sub: 'Adicione links, materiais e recursos dentro de cada seção criada.' },
    announcements: { kicker: 'Comunicação', title: 'Avisos e <span>comunicados</span>', sub: 'Publique mensagens que aparecem para os alunos na página inicial.' },
    admins: { kicker: 'Equipe', title: 'Administradores', sub: 'Gerencie quem tem acesso ao painel de administração do portal.' },
    'tab-home': { kicker: 'Portal do Aluno', title: 'Aba <span>Home</span>', sub: 'Gerencie o conteúdo exibido na tela inicial do aluno.' },
    'tab-daily': { kicker: 'Portal do Aluno', title: 'Aba <span>Daily Practice</span>', sub: 'Gerencie as atividades de prática diária dos alunos.' },
    'tab-aulas': { kicker: 'Portal do Aluno', title: 'Aba <span>Aulas</span>', sub: 'Gerencie as aulas em vídeo, PDF ou link externo.' },
    'tab-exercicios': { kicker: 'Portal do Aluno', title: 'Aba <span>Exercícios</span>', sub: 'Gerencie as listas de exercícios e quizzes.' },
    'tab-materiais': { kicker: 'Portal do Aluno', title: 'Aba <span>Materiais</span>', sub: 'Gerencie livros, áudios, slides e recursos complementares.' },
    'tab-gramatica': { kicker: 'Portal do Aluno', title: 'Aba <span>Ref. Gramatical</span>', sub: 'Gerencie o material de referência gramatical dos alunos.' },
    'tab-prova': { kicker: 'Portal do Aluno', title: 'Aba <span>Prova</span>', sub: 'Gerencie as provas e avaliações do módulo.' },
    'tab-chat': { kicker: 'Portal do Aluno', title: 'Aba <span>Chat com IA</span>', sub: 'Configure o assistente de IA disponível para os alunos.' },
    'tab-comunidades': { kicker: 'Portal do Aluno', title: 'Aba <span>Comunidades</span>', sub: 'Gerencie os grupos e comunidades de estudo.' },
  };
  const t = titles[state.adminSubTab] || titles.students;

  d.appendChild(h('div', { className: 'page-header' },
    h('div', { className: 'page-kicker' }, t.kicker),
    h('h1', { className: 'page-title', innerHTML: t.title }),
    h('p', { className: 'page-subtitle' }, t.sub)
  ));

  switch (state.adminSubTab) {
    case 'students': d.appendChild(renderAdminStudents()); break;
    case 'sections': d.appendChild(renderAdminSections()); break;
    case 'contents': d.appendChild(renderAdminContents()); break;
    case 'announcements': d.appendChild(renderAdminAnnouncements()); break;
    case 'admins': d.appendChild(renderAdminAdmins()); break;
    case 'tab-home': d.appendChild(renderAdminTabHome()); break;
    case 'tab-daily': d.appendChild(renderAdminTabDaily()); break;
    case 'tab-aulas': d.appendChild(renderAdminTabAulas()); break;
    case 'tab-exercicios': d.appendChild(renderAdminTabExercicios()); break;
    case 'tab-materiais': d.appendChild(renderAdminTabMateriais()); break;
    case 'tab-gramatica': d.appendChild(renderAdminTabGramatica()); break;
    case 'tab-prova': d.appendChild(renderAdminTabProva()); break;
    case 'tab-chat': d.appendChild(renderAdminTabChat()); break;
    case 'tab-comunidades': d.appendChild(renderAdminTabComunidades()); break;
  }

  return d;
}

// ── Admin: Students ──
function renderAdminStudents() {
  const d = h('div');

  d.appendChild(h('div', { className: 'info-panel' },
    h('span', { className: 'info-panel-icon' }, icon('info')),
    h('div', {},
      h('div', { className: 'info-panel-title' }, 'Como funciona'),
      h('div', { className: 'info-panel-text', innerHTML: 'Cada aluno precisa de <strong>login individual</strong> para acessar o portal. Use o m\u00f3dulo certo \u2014 os conte\u00fados s\u00e3o filtrados automaticamente.' })
    )
  ));

  // ---- MODAL ----
  function openStudentModal(student) {
    const isEdit = !!student;
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'modal-container';

    function generateUsername(name) {
      return name.trim().toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '.')
        .replace(/[^a-z0-9.]/g, '');
    }

    function generatePassword() {
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#!';
      let p = '';
      for (let i = 0; i < 10; i++) p += chars[Math.floor(Math.random() * chars.length)];
      return p;
    }

    modal.innerHTML = `
      <div class="modal-header">
        <h2 class="modal-title">${isEdit ? 'Edit Student' : 'Create Student'}</h2>
        <button class="modal-close-btn" id="modalCloseBtn">&#x2715;</button>
      </div>
      <div class="modal-body">
        <form id="studentModalForm" autocomplete="off">

          <div class="modal-section">
            <h3 class="modal-section-title">Informa\u00e7\u00f5es do aluno</h3>
            <div class="modal-field">
              <label class="modal-label" for="fieldName">Nome completo <span class="required">*</span></label>
              <input class="modal-input" type="text" id="fieldName" placeholder="Ex: Jo\u00e3o da Silva" value="${isEdit ? (student.name || '') : ''}" required />
            </div>
            <div class="modal-field">
              <label class="modal-label" for="fieldUsername">Username <span class="required">*</span></label>
              <div class="modal-input-row">
                <input class="modal-input" type="text" id="fieldUsername" placeholder="joao.silva" value="${isEdit ? (student.username || '') : ''}" required ${isEdit ? 'readonly' : ''} />
              </div>
              <p class="modal-hint">Gerado automaticamente a partir do nome</p>
            </div>
            <div class="modal-field">
              <label class="modal-label" for="fieldPassword">Senha ${isEdit ? '' : '<span class="required">*</span>'}</label>
              <div class="modal-input-row">
                <input class="modal-input" type="text" id="fieldPassword" placeholder="${isEdit ? 'Deixe em branco para manter' : 'Digite ou gere automaticamente'}" autocomplete="new-password" />
                <button type="button" class="btn-gen-pass" id="btnGenPass">Gerar</button>
              </div>
            </div>
            <div class="modal-field">
              <label class="modal-label" for="fieldEmail">E-mail</label>
              <input class="modal-input" type="email" id="fieldEmail" placeholder="joao@email.com" value="${isEdit ? (student.email || '') : ''}" />
            </div>
          </div>

          <div class="modal-section">
            <h3 class="modal-section-title">Configura\u00e7\u00e3o acad\u00eamica</h3>
            <div class="modal-field">
              <label class="modal-label" for="fieldModule">N\u00edvel <span class="required">*</span></label>
              <select class="modal-select" id="fieldModule" required>
                <option value="">Selecione...</option>
                ${MODULES.map(m => `<option value="${m.id}" ${isEdit && student.module === m.id ? 'selected' : ''}>${m.label}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="modal-section">
            <h3 class="modal-section-title">Configura\u00e7\u00f5es</h3>
            <div class="modal-checkboxes">
              <label class="modal-checkbox-label">
                <input type="checkbox" id="checkForcePass" />
                <span>For\u00e7ar troca de senha no primeiro login</span>
              </label>
              <label class="modal-checkbox-label">
                <input type="checkbox" id="checkResetProgress" />
                <span>Resetar progresso</span>
              </label>
            </div>
          </div>

          <div class="modal-section modal-summary-section">
            <h3 class="modal-section-title">Resumo</h3>
            <div class="modal-summary" id="modalSummary">
              <div class="summary-row"><span class="summary-label">Nome</span><span class="summary-value" id="summaryName">-</span></div>
              <div class="summary-row"><span class="summary-label">Username</span><span class="summary-value" id="summaryUsername">-</span></div>
              <div class="summary-row"><span class="summary-label">N\u00edvel</span><span class="summary-value" id="summaryModule">-</span></div>
            </div>
          </div>

        </form>
        <div class="modal-error" id="modalError" style="display:none"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-ghost" id="modalCancelBtn">Cancelar</button>
        <button type="button" class="btn btn-primary" id="modalSubmitBtn">
          ${isEdit ? 'Salvar altera\u00e7\u00f5es' : 'Criar aluno'}
        </button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => overlay.classList.add('modal-visible'));

    const fieldName = modal.querySelector('#fieldName');
    const fieldUsername = modal.querySelector('#fieldUsername');
    const fieldPassword = modal.querySelector('#fieldPassword');
    const fieldEmail = modal.querySelector('#fieldEmail');
    const fieldModule = modal.querySelector('#fieldModule');
    const btnGenPass = modal.querySelector('#btnGenPass');
    const modalError = modal.querySelector('#modalError');

    function updateSummary() {
      modal.querySelector('#summaryName').textContent = fieldName.value.trim() || '-';
      modal.querySelector('#summaryUsername').textContent = fieldUsername.value.trim() || '-';
      const modEl = fieldModule;
      modal.querySelector('#summaryModule').textContent = modEl.options[modEl.selectedIndex]?.text || '-';
    }

    if (!isEdit) {
      fieldName.addEventListener('input', () => {
        if (fieldName.value.trim()) {
          fieldUsername.value = generateUsername(fieldName.value);
        }
        updateSummary();
      });
    }
    fieldUsername.addEventListener('input', updateSummary);
    fieldModule.addEventListener('change', updateSummary);
    btnGenPass.addEventListener('click', () => {
      fieldPassword.value = generatePassword();
    });

    updateSummary();

    function closeModal() {
      overlay.classList.remove('modal-visible');
      setTimeout(() => overlay.remove(), 250);
    }

    modal.querySelector('#modalCloseBtn').addEventListener('click', closeModal);
    modal.querySelector('#modalCancelBtn').addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

    modal.querySelector('#modalSubmitBtn').addEventListener('click', async () => {
      const name = fieldName.value.trim();
      const username = fieldUsername.value.trim();
      const password = fieldPassword.value.trim();
      const email = fieldEmail.value.trim();
      const module = fieldModule.value;

      modalError.style.display = 'none';

      if (!name || !username || !module) {
        modalError.textContent = 'Preencha todos os campos obrigat\u00f3rios.';
        modalError.style.display = 'block';
        return;
      }

      if (!isEdit && !password) {
        modalError.textContent = 'Informe uma senha para o novo aluno.';
        modalError.style.display = 'block';
        return;
      }

      const btn = modal.querySelector('#modalSubmitBtn');
      btn.disabled = true;
      btn.textContent = 'Salvando...';

      try {
        if (isEdit) {
          const updates = { name, module, email };
          if (password) updates.password = password;
          await dbUpdate('students', student.id, updates);
        } else {
          const exists = state.data.students.find(s => s.username === username.toLowerCase());
          if (exists) throw new Error('J\u00e1 existe um aluno com esse username.');
          await dbInsert('students', {
            username: username.toLowerCase(),
            password, name, email,
            module: module.toLowerCase()
          });
        }
        await loadAll();
        closeModal();
      } catch (err) {
        modalError.textContent = err.message || 'Erro ao salvar. Tente novamente.';
        modalError.style.display = 'block';
        btn.disabled = false;
        btn.textContent = isEdit ? 'Salvar altera\u00e7\u00f5es' : 'Criar aluno';
      }
    });
  }

  // ---- ADD BUTTON ----
  const addBtn = h('button', { className: 'btn-add', onClick: () => openStudentModal(null) },
    icon('plus'), 'Cadastrar aluno');
  d.appendChild(addBtn);

  // ---- MODULE FILTER ----
  const filter = h('div', { className: 'module-filter' });
  ['all', 'starter', 'a1', 'a2', 'b1', 'b2'].forEach(m => {
    filter.appendChild(h('button', {
      className: state.moduleFilter === m ? 'active' : '',
      onClick: () => { state.moduleFilter = m; render(); }
    }, m === 'all' ? 'Todos' : m.toUpperCase()));
  });
  d.appendChild(filter);

  const filtered = state.moduleFilter === 'all'
    ? state.data.students
    : state.data.students.filter(s => s.module === state.moduleFilter);

  if (filtered.length === 0) {
    d.appendChild(h('div', { className: 'empty-state' },
      h('div', { className: 'empty-state-icon' }, icon('users')),
      h('div', { className: 'empty-state-title', innerHTML: 'Nenhum <span>aluno</span>' }),
      h('div', { className: 'empty-state-text' }, 'Clique em "Cadastrar aluno" para come\u00e7ar.')
    ));
  } else {
    const grid = h('div', { className: 'student-grid' });
    filtered.forEach(s => {
      const names = (s.name || '').split(' ');
      const initials = (names[0]?.[0] || '') + (names[1]?.[0] || '');
      grid.appendChild(h('div', { className: 'student-card' },
        h('div', { className: 'student-top' },
          h('div', { className: 'student-avatar' }, initials),
          h('div', { className: 'student-info' },
            h('div', { className: 'student-name' }, s.name),
            h('div', { className: 'student-username' }, '@' + s.username)
          )
        ),
        h('div', { className: 'student-details' },
          h('div', {}, 'M\u00f3dulo', h('strong', {}, (s.module || '?').toUpperCase()))
        ),
        h('div', { className: 'student-card-actions' },
          h('button', { className: 'btn btn-ghost btn-small', onClick: () => openStudentModal(s) }, 'Editar'),
          h('button', { className: 'btn btn-ghost btn-small btn-danger', onClick: async () => {
            if (!confirm('Excluir aluno ' + s.name + '?')) return;
            await dbDelete('students', s.id); await loadAll();
          }}, 'Excluir')
        )
      ));
    });
    d.appendChild(grid);
  }
  return d;
}
function renderAdminTabGeneric(tabId, label, iconName) {
  const d = h('div');
  const tabKey = 'TAB-' + tabId.replace('tab-', '').toUpperCase();
  const items = state.data.contents.filter(c => c.content_type === tabKey);

  d.appendChild(h('button', { className: 'btn-add', onClick: async () => {
    const title = prompt('Título:'); if (!title) return;
    const description = prompt('Descrição (opcional):') || '';
    const link = prompt('Link (URL, opcional):') || '';
    const modStr = prompt('Para quais módulos? (starter,a1,a2,b1,b2 \u2014 vazio = todos):', '') || '';
    const target_modules = modStr ? modStr.toLowerCase().split(',').map(s => s.trim()).filter(Boolean) : ['starter','a1','a2','b1','b2'];
    await dbInsert('contents', { title, description, link, content_type: tabKey, target_modules, sort_order: items.length });
    await loadAll();
  }}, icon('plus'), 'Adicionar item'));

  if (items.length === 0) {
    d.appendChild(h('div', { className: 'empty-state' },
      h('div', { className: 'empty-state-icon' }, icon(iconName)),
      h('div', { className: 'empty-state-title', innerHTML: 'Nenhum item em <span>' + label + '</span>' }),
      h('div', { className: 'empty-state-text' }, 'Use o botão acima para adicionar o primeiro item.')
    ));
  } else {
    const list = h('div', { className: 'admin-list' });
    items.forEach((item, i) => {
      list.appendChild(h('div', { className: 'admin-list-item' },
        h('div', { className: 'admin-list-number' }, String(i + 1).padStart(2, '0')),
        h('div', { className: 'admin-list-main' },
          h('div', { className: 'content-tag' }, item.target_modules && item.target_modules.length < 5 ? item.target_modules.map(m => m.toUpperCase()).join(', ') : 'TODOS'),
          h('h3', { className: 'content-title' }, item.title),
          item.description && h('p', { className: 'content-desc' }, item.description)
        ),
        h('div', { className: 'edit-actions' },
          item.link && h('a', { className: 'icon-btn', href: item.link, target: '_blank', title: 'Abrir' }, icon('external')),
          h('button', { className: 'icon-btn', title: 'Editar', onClick: async () => {
            const title = prompt('Título:', item.title); if (!title) return;
            const description = prompt('Descrição:', item.description || '') || '';
            const link = prompt('Link:', item.link || '') || '';
            const modStr = prompt('Módulos (vazio=todos):', (item.target_modules || []).join(',')) || '';
            const target_modules = modStr ? modStr.toLowerCase().split(',').map(s => s.trim()).filter(Boolean) : ['starter','a1','a2','b1','b2'];
            await dbUpdate('contents', item.id, { title, description, link, target_modules }); await loadAll();
          }}, icon('edit')),
          h('button', { className: 'icon-btn danger', title: 'Excluir', onClick: async () => {
            if (!confirm('Excluir "' + item.title + '"?')) return;
            await dbDelete('contents', item.id); await loadAll();
          }}, icon('trash'))
        )
      ));
    });
    d.appendChild(list);
  }
  return d;
}
function renderAdminTabHome(){ return renderAdminTabGeneric('tab-home', 'Home', 'home'); }
function renderAdminTabDaily(){ return renderAdminTabGeneric('tab-daily', 'Daily Practice', 'spark'); }
function renderAdminTabAulas(){ return renderAdminTabGeneric('tab-aulas', 'Aulas', 'book'); }
function renderAdminTabExercicios(){ return renderAdminTabGeneric('tab-exercicios', 'Exercícios', 'stack'); }
function renderAdminTabMateriais(){ return renderAdminTabGeneric('tab-materiais', 'Materiais', 'compass'); }
function renderAdminTabGramatica(){ return renderAdminTabGeneric('tab-gramatica', 'Ref. Gramatical', 'info'); }
function renderAdminTabProva(){ return renderAdminTabGeneric('tab-prova', 'Prova', 'sparkle'); }
function renderAdminTabChat(){ return renderAdminTabGeneric('tab-chat', 'Chat com IA', 'waveform'); }
function renderAdminTabComunidades(){ return renderAdminTabGeneric('tab-comunidades', 'Comunidades', 'users'); }

// ── Admin: Sections ──
function renderAdminSections() {
  const d = h('div');

  d.appendChild(h('div', { className: 'info-panel' },
    h('span', { className: 'info-panel-icon' }, icon('info')),
    h('div', {},
      h('div', { className: 'info-panel-title' }, 'Seções do portal'),
      h('div', { className: 'info-panel-text', innerHTML: 'Cada seção é um <strong>bloco do portal</strong> (ex: Materiais, Biblioteca, Podcasts). Depois, em "Conteúdos", você adiciona itens dentro delas.' })
    )
  ));

  d.appendChild(h('button', { className: 'btn-add', onClick: async () => {
    const name = prompt('Nome da seção:'); if (!name) return;
    const description = prompt('Descrição curta:') || '';
    const modStr = prompt('Mostrar para quais módulos? (starter,a1,a2,b1,b2 — vazio = todos):', '') || '';
    const target_modules = modStr ? modStr.toLowerCase().split(',').map(s => s.trim()).filter(Boolean) : ['starter','a1','a2','b1','b2'];
    await dbInsert('sections', { name, description, sort_order: state.data.sections.length + 1, target_modules });
    await loadAll();
  }}, icon('plus'), 'Criar seção'));

  if (state.data.sections.length === 0) {
    d.appendChild(h('div', { className: 'empty-state' },
      h('div', { className: 'empty-state-icon' }, icon('shape')),
      h('div', { className: 'empty-state-title', innerHTML: 'Nenhuma <span>seção</span>' })
    ));
  } else {
    const list = h('div', { className: 'admin-list' });
    state.data.sections.forEach((sec, i) => {
      const count = state.data.contents.filter(c => c.section_id === sec.id).length;
      list.appendChild(h('div', { className: 'admin-list-item' },
        h('div', { className: 'admin-list-number' }, String(i + 1).padStart(2, '0')),
        h('div', { className: 'admin-list-main' },
          h('div', { className: 'content-tag' }, count + ' ' + (count === 1 ? 'item' : 'itens') + ' · ' + (sec.visible ? 'VISÍVEL' : 'OCULTA')),
          h('h3', { className: 'content-title' }, sec.name),
          h('p', { className: 'content-desc' }, sec.description || '—')
        ),
        h('div', { className: 'edit-actions' },
          h('button', { className: 'icon-btn', title: sec.visible ? 'Ocultar' : 'Mostrar', onClick: async () => {
            await dbUpdate('sections', sec.id, { visible: !sec.visible }); await loadAll();
          }}, icon(sec.visible ? 'eye' : 'eyeOff')),
          h('button', { className: 'icon-btn', title: 'Subir', onClick: async () => {
            const idx = state.data.sections.findIndex(x => x.id === sec.id);
            if (idx > 0) {
              const prev = state.data.sections[idx - 1];
              await dbUpdate('sections', sec.id, { sort_order: prev.sort_order });
              await dbUpdate('sections', prev.id, { sort_order: sec.sort_order });
              await loadAll();
            }
          }}, icon('arrowUp')),
          h('button', { className: 'icon-btn', title: 'Descer', onClick: async () => {
            const idx = state.data.sections.findIndex(x => x.id === sec.id);
            if (idx < state.data.sections.length - 1) {
              const next = state.data.sections[idx + 1];
              await dbUpdate('sections', sec.id, { sort_order: next.sort_order });
              await dbUpdate('sections', next.id, { sort_order: sec.sort_order });
              await loadAll();
            }
          }}, icon('arrowDown')),
          h('button', { className: 'icon-btn', title: 'Editar', onClick: async () => {
            const name = prompt('Nome:', sec.name); if (!name) return;
            const description = prompt('Descrição:', sec.description || '') || '';
            const modStr = prompt('Módulos (vazio=todos):', (sec.target_modules || []).join(',')) || '';
            const target_modules = modStr ? modStr.toLowerCase().split(',').map(s => s.trim()).filter(Boolean) : ['starter','a1','a2','b1','b2'];
            await dbUpdate('sections', sec.id, { name, description, target_modules }); await loadAll();
          }}, icon('edit')),
          h('button', { className: 'icon-btn danger', title: 'Excluir', onClick: async () => {
            if (!confirm('Excluir seção "' + sec.name + '" e todos os conteúdos dentro?')) return;
            await dbDelete('sections', sec.id); await loadAll();
          }}, icon('trash'))
        )
      ));
    });
    d.appendChild(list);
  }
  return d;
}

// ── Admin: Contents ──
function renderAdminContents() {
  const d = h('div');

  d.appendChild(h('div', { className: 'info-panel' },
    h('span', { className: 'info-panel-icon' }, icon('info')),
    h('div', {},
      h('div', { className: 'info-panel-title' }, 'Conteúdos'),
      h('div', { className: 'info-panel-text', innerHTML: 'Adicione itens dentro das seções. Cada item é um <strong>link</strong> (Google Drive, YouTube, PDF, etc).' })
    )
  ));

  if (state.data.sections.length === 0) {
    d.appendChild(h('div', { className: 'empty-state' },
      h('div', { className: 'empty-state-icon' }, icon('shape')),
      h('div', { className: 'empty-state-title', innerHTML: 'Crie <span>seções</span> primeiro' }),
      h('div', { className: 'empty-state-text' }, 'Antes de adicionar conteúdos, você precisa criar ao menos uma seção.')
    ));
    return d;
  }

  d.appendChild(h('button', { className: 'btn-add', onClick: async () => {
    const sectionOpts = state.data.sections.map((s, i) => (i + 1) + ' - ' + s.name).join('\n');
    const secIdx = prompt('Em qual seção? Digite o número:\n\n' + sectionOpts);
    if (!secIdx) return;
    const sec = state.data.sections[parseInt(secIdx) - 1];
    if (!sec) { alert('Seção inválida'); return; }

    const title = prompt('Título:'); if (!title) return;
    const description = prompt('Descrição (opcional):') || '';
    const link = prompt('Link (URL):') || '';
    const content_type = prompt('Tipo (LINK, VÍDEO, PDF, ÁUDIO, DRIVE):', 'LINK') || 'LINK';
    const modStr = prompt('Para quais módulos? (vazio = todos):', '') || '';
    const target_modules = modStr ? modStr.toLowerCase().split(',').map(s => s.trim()).filter(Boolean) : ['starter','a1','a2','b1','b2'];

    await dbInsert('contents', { section_id: sec.id, title, description, link, content_type, target_modules, sort_order: 0 });
    await loadAll();
  }}, icon('plus'), 'Adicionar conteúdo'));

  state.data.sections.forEach(sec => {
    const items = state.data.contents.filter(c => c.section_id === sec.id);

    d.appendChild(h('div', { className: 'section-kicker' },
      h('span', { className: 'section-kicker-label' }, sec.name + ' · ' + items.length + (items.length === 1 ? ' item' : ' itens')),
      h('div', { className: 'section-kicker-line' })
    ));

    if (items.length === 0) {
      d.appendChild(h('p', { style: { fontFamily: 'Geist, sans-serif', color: '#8a7b71', fontSize: '13px', padding: '12px 0', fontStyle: 'italic' } }, 'Vazio. Use o botão acima para adicionar.'));
    } else {
      const list = h('div', { className: 'admin-list' });
      items.forEach((item, i) => {
        list.appendChild(h('div', { className: 'admin-list-item' },
          h('div', { className: 'admin-list-number' }, String(i + 1).padStart(2, '0')),
          h('div', { className: 'admin-list-main' },
            h('div', { className: 'content-tag' }, (item.content_type || 'LINK') + (item.target_modules && item.target_modules.length < 5 ? ' · ' + item.target_modules.map(m => m.toUpperCase()).join(', ') : '')),
            h('h3', { className: 'content-title' }, item.title),
            item.description && h('p', { className: 'content-desc' }, item.description)
          ),
          h('div', { className: 'edit-actions' },
            item.link && h('a', { className: 'icon-btn', href: item.link, target: '_blank', title: 'Abrir' }, icon('external')),
            h('button', { className: 'icon-btn', title: 'Editar', onClick: async () => {
              const title = prompt('Título:', item.title); if (!title) return;
              const description = prompt('Descrição:', item.description || '') || '';
              const link = prompt('Link:', item.link || '') || '';
              const content_type = prompt('Tipo:', item.content_type || 'LINK') || 'LINK';
              const modStr = prompt('Módulos (vazio=todos):', (item.target_modules || []).join(',')) || '';
              const target_modules = modStr ? modStr.toLowerCase().split(',').map(s => s.trim()).filter(Boolean) : ['starter','a1','a2','b1','b2'];
              await dbUpdate('contents', item.id, { title, description, link, content_type, target_modules }); await loadAll();
            }}, icon('edit')),
            h('button', { className: 'icon-btn danger', title: 'Excluir', onClick: async () => {
              if (!confirm('Excluir "' + item.title + '"?')) return;
              await dbDelete('contents', item.id); await loadAll();
            }}, icon('trash'))
          )
        ));
      });
      d.appendChild(list);
    }
  });

  return d;
}

// ── Admin: Announcements ──
function renderAdminAnnouncements() {
  const d = h('div');

  d.appendChild(h('div', { className: 'info-panel' },
    h('span', { className: 'info-panel-icon' }, icon('info')),
    h('div', {},
      h('div', { className: 'info-panel-title' }, 'Avisos'),
      h('div', { className: 'info-panel-text', innerHTML: 'Publique comunicados que aparecem para os alunos. Avisos <strong>fixados</strong> sobem para o topo.' })
    )
  ));

  d.appendChild(h('button', { className: 'btn-add', onClick: async () => {
    const title = prompt('Título do aviso:'); if (!title) return;
    const content = prompt('Conteúdo:') || '';
    const pinned = confirm('Fixar no topo?');
    const modStr = prompt('Para quais módulos? (vazio = todos):', '') || '';
    const target_modules = modStr ? modStr.toLowerCase().split(',').map(s => s.trim()).filter(Boolean) : ['starter','a1','a2','b1','b2'];

    await dbInsert('student_announcements', { title, content, pinned, target_modules, author: state.user.name });
    await loadAll();
  }}, icon('plus'), 'Novo aviso'));

  const sorted = [...state.data.announcements].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.created_at) - new Date(a.created_at);
  });

  if (sorted.length === 0) {
    d.appendChild(h('div', { className: 'empty-state' },
      h('div', { className: 'empty-state-icon' }, icon('announce')),
      h('div', { className: 'empty-state-title', innerHTML: 'Nenhum <span>aviso</span>' })
    ));
  } else {
    const list = h('div', { className: 'announcement-list' });
    sorted.forEach(a => {
      const node = announcementNode(a);
      node.style.position = 'relative';
      const actions = h('div', { className: 'edit-actions', style: { position: 'absolute', top: '16px', right: '16px' } },
        h('button', { className: 'icon-btn', title: a.pinned ? 'Desafixar' : 'Fixar', onClick: async () => {
          await dbUpdate('student_announcements', a.id, { pinned: !a.pinned }); await loadAll();
        }}, icon('pin')),
        h('button', { className: 'icon-btn', title: 'Editar', onClick: async () => {
          const title = prompt('Título:', a.title); if (!title) return;
          const content = prompt('Conteúdo:', a.content || '') || '';
          await dbUpdate('student_announcements', a.id, { title, content }); await loadAll();
        }}, icon('edit')),
        h('button', { className: 'icon-btn danger', title: 'Excluir', onClick: async () => {
          if (!confirm('Excluir "' + a.title + '"?')) return;
          await dbDelete('student_announcements', a.id); await loadAll();
        }}, icon('trash'))
      );
      node.appendChild(actions);
      list.appendChild(node);
    });
    d.appendChild(list);
  }
  return d;
}

// ── Admin: Admins ──
function renderAdminAdmins() {
  const d = h('div');

  d.appendChild(h('div', { className: 'info-panel' },
    h('span', { className: 'info-panel-icon' }, icon('info')),
    h('div', {},
      h('div', { className: 'info-panel-title' }, 'Administradores'),
      h('div', { className: 'info-panel-text', innerHTML: 'Quem tem acesso ao painel pode <strong>criar, editar e excluir</strong> todo o conteúdo do portal.' })
    )
  ));

  d.appendChild(h('button', { className: 'btn-add', onClick: async () => {
    const name = prompt('Nome completo:'); if (!name) return;
    const username = prompt('Usuário (sem espaços, minúsculo):'); if (!username) return;
    const password = prompt('Senha:'); if (!password) return;

    const exists = state.data.admins.find(a => a.username === username.toLowerCase().trim());
    if (exists) { alert('Usuário já existe!'); return; }

    await dbInsert('student_portal_admins', {
      username: username.toLowerCase().trim(), password, name
    });
    await loadAll();
  }}, icon('plus'), 'Novo admin'));

  const grid = h('div', { className: 'students-grid' });
  state.data.admins.forEach(a => {
    const initials = a.name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
    grid.appendChild(h('div', { className: 'student-card' },
      h('div', { className: 'student-top' },
        h('div', { className: 'student-avatar' }, initials),
        h('div', { className: 'student-info' },
          h('div', { className: 'student-name' }, a.name),
          h('div', { className: 'student-username' }, '@' + a.username)
        )
      ),
      h('div', { className: 'student-card-actions' },
        h('button', { className: 'btn btn-ghost btn-small', onClick: async () => {
          const name = prompt('Nome:', a.name); if (!name) return;
          const password = prompt('Nova senha (vazio=manter):', '');
          const updates = { name };
          if (password) updates.password = password;
          await dbUpdate('student_portal_admins', a.id, updates); await loadAll();
        }}, 'Editar'),
        a.username !== 'admin' && h('button', { className: 'btn btn-ghost btn-small', onClick: async () => {
          if (!confirm('Excluir admin ' + a.name + '?')) return;
          await dbDelete('student_portal_admins', a.id); await loadAll();
        }}, 'Excluir')
      )
    ));
  });
  d.appendChild(grid);
  return d;
}

// ── Session restore on page load ──
(function() {
  try {
    const saved = sessionStorage.getItem('nexus_session');
    if (saved) {
      const s = JSON.parse(saved);
      state.user     = s.user     || null;
      state.userType = s.userType || null;
      state.screen   = s.screen   || 'login';
      state.tab      = s.tab      || 'home';
      if (state.screen === 'portal' && state.user) {
        loadAll().then(() => { render(); startIdleTimer(); });
        return;
      }
    }
  } catch(e) {}
  render();
})();
