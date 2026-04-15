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
      { id: 'sections', label: 'Seções', iconName: 'shape' },
      { id: 'contents', label: 'Conteúdos', iconName: 'stack' },
      { id: 'announcements', label: 'Avisos', iconName: 'announce' },
      { id: 'admins', label: 'Admins', iconName: 'cog' },
    ];
    const studentTabLinks = [
      { id: 'tab-home', label: 'Home', iconName: 'home' },
      { id: 'tab-daily', label: 'Daily Practice', iconName: 'spark' },
      { id: 'tab-aulas', label: 'Aulas', iconName: 'book' },
      { id: 'tab-exercicios', label: 'Exercícios', iconName: 'stack' },
      { id: 'tab-materiais', label: 'Materiais', iconName: 'compass' },
      { id: 'tab-gramatica', label: 'Ref. Gramatical', iconName: 'info' },
      { id: 'tab-prova', label: 'Prova', iconName: 'sparkle' },
      { id: 'tab-chat', label: 'Chat com IA', iconName: 'waveform' },
      { id: 'tab-comunidades', label: 'Comunidades', iconName: 'users' },
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
    nav.appendChild(h('div', { className: 'sidebar-divider' }));
    nav.appendChild(h('div', { className: 'sidebar-section-label' }, 'Portal do Aluno'));
    studentTabLinks.forEach(link => {
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
      render();
    }
  }, icon('logout'), 'Sair'));

  sb.appendChild(footer);
  return sb;
}

// ══════════════════════════════════════════════════════════════
// STUDENT: HOME
// ══════════════════════════════════════════════════════════════
function renderHome() {
  const d = h('div');
  const mod = state.user.module || 'starter';
  const modLabel = MODULES.find(m => m.id === mod)?.label || '—';
  const unitLabel = UNITS.find(u => u.id === state.user.unit)?.label || '—';

  // Welcome
  d.appendChild(h('div', { className: 'welcome' },
    h('h1', { className: 'welcome-title' },
      h('span', {}, 'Welcome'),
      h('span', { className: 'welcome-wave' }, waveIconSvg())
    ),
    h('div', { className: 'welcome-meta' },
      h('span', {}, state.user.name.split(' ')[0]),
      h('span', { className: 'divider' }),
      h('span', {}, h('strong', {}, modLabel)),
      h('span', { className: 'divider' }),
      h('span', {}, unitLabel)
    )
  ));

  // Visible sections as cards
  const visibleSections = state.data.sections.filter(s => s.name !== 'Materiais do Curso' && s.name !== 'Atividades Extras' &&
    s.visible && (!s.target_modules || s.target_modules.length === 0 || s.target_modules.includes(mod))
  );

  if (visibleSections.length === 0) {
    d.appendChild(h('div', { className: 'empty-state' },
      h('div', { className: 'empty-state-icon' }, icon('sparkle')),
      h('div', { className: 'empty-state-title', innerHTML: 'Em <span>preparação</span>' }),
      h('div', { className: 'empty-state-text' }, 'A coordenação está organizando o conteúdo. Volte em breve para acessar materiais novos.')
    ));
  } else {
    const grid = h('div', { className: 'cards-grid' });
    visibleSections.forEach(sec => {
      const count = state.data.contents.filter(c =>
        c.section_id === sec.id &&
        (!c.target_modules || c.target_modules.length === 0 || c.target_modules.includes(mod))
      ).length;

      grid.appendChild(h('div', {
        className: 'info-card',
        onClick: () => { state.currentSection = sec.id; state.tab = 'section'; render(); }
      },
        h('div', { className: 'info-card-head' },
          h('div', { className: 'info-card-title' }, sec.name),
          count > 0 && h('div', { className: 'info-card-count' }, count)
        ),
        h('div', { className: 'info-card-desc' }, sec.description || 'Conteúdos desta seção'),
        h('div', { className: 'info-card-arrow' }, 'Acessar', icon('arrowRight'))
      ));
    });
    d.appendChild(grid);
  }

  // Pinned announcements
  const pinned = state.data.announcements.filter(a => a.pinned && (!a.target_modules || a.target_modules.length === 0 || a.target_modules.includes(mod)));
  if (pinned.length > 0) {
    d.appendChild(h('div', { className: 'section-kicker' },
      h('span', { className: 'section-kicker-label' }, 'Em destaque'),
      h('div', { className: 'section-kicker-line' })
    ));
    const list = h('div', { className: 'announcement-list' });
    pinned.slice(0, 2).forEach(a => list.appendChild(announcementNode(a)));
    d.appendChild(list);
  }

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
      h('div', { className: 'info-panel-text', innerHTML: 'Cada aluno precisa de <strong>login individual</strong> para acessar o portal. Use a unidade e o módulo certos — os conteúdos são filtrados automaticamente.' })
    )
  ));

  const addBtn = h('button', { className: 'btn-add', onClick: async () => {
    const name = prompt('Nome completo do aluno:'); if (!name) return;
    const username = prompt('Nome de usuário (ex: joao.silva, sem espaços):'); if (!username) return;
    const password = prompt('Senha inicial:'); if (!password) return;
    const email = prompt('E-mail (opcional):') || '';
    const module = prompt('Módulo (starter, a1, a2, b1, b2):', 'starter') || 'starter';
    const unit = prompt('Unidade (chapeco, passo-fundo, online):', 'chapeco') || 'chapeco';

    const exists = state.data.students.find(s => s.username === username.toLowerCase().trim());
    if (exists) { alert('Esse nome de usuário já existe!'); return; }

    await dbInsert('students', {
      username: username.toLowerCase().trim(),
      password, name, email,
      module: module.toLowerCase().trim(),
      unit: unit.toLowerCase().trim()
    });
    await loadAll();
  }}, icon('plus'), 'Cadastrar aluno');
  d.appendChild(addBtn);

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
      h('div', { className: 'empty-state-text' }, 'Clique em "Cadastrar aluno" para começar.')
    ));
  } else {
    const grid = h('div', { className: 'students-grid' });
    filtered.forEach(s => {
      const initials = s.name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
      grid.appendChild(h('div', { className: 'student-card' },
        h('div', { className: 'student-top' },
          h('div', { className: 'student-avatar' }, initials),
          h('div', { className: 'student-info' },
            h('div', { className: 'student-name' }, s.name),
            h('div', { className: 'student-username' }, '@' + s.username)
          )
        ),
        h('div', { className: 'student-details' },
          h('div', {}, 'Módulo', h('strong', {}, (s.module || '—').toUpperCase())),
          h('div', {}, 'Unidade', h('strong', {}, UNITS.find(u => u.id === s.unit)?.label || '—'))
        ),
        h('div', { className: 'student-card-actions' },
          h('button', { className: 'btn btn-ghost btn-small', onClick: async () => {
            const name = prompt('Nome:', s.name); if (!name) return;
            const password = prompt('Nova senha (vazio = manter):', '');
            const module = prompt('Módulo:', s.module) || s.module;
            const unit = prompt('Unidade:', s.unit) || s.unit;
            const email = prompt('E-mail:', s.email || '') || '';
            const updates = { name, module, unit, email };
            if (password) updates.password = password;
            await dbUpdate('students', s.id, updates); await loadAll();
          }}, 'Editar'),
          h('button', { className: 'btn btn-ghost btn-small', onClick: async () => {
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

render();
