const pageMeta = {
  '/board.html': { title: 'Board of Directors | Presidio Heights Association of Neighbors', description: 'Meet the volunteer Board of Directors of the Presidio Heights Association of Neighbors (PHAN) and learn how the board serves the community.' },
  '/district.html': { title: '311 & District Supervisor | PHAN', description: 'San Francisco 311 resources and District 2 Supervisor information for Presidio Heights residents.' },
};
const pagePath = window.location.pathname.replace(/\/$/, '') || '/';
const metaConfig = pageMeta[pagePath];
if (metaConfig && document.head) {
  if (!document.querySelector('meta[name="description"]')) { const m = document.createElement('meta'); m.name = 'description'; m.content = metaConfig.description; document.head.appendChild(m); }
  if (!document.querySelector('link[rel="canonical"]')) { const l = document.createElement('link'); l.rel = 'canonical'; l.href = `https://www.phansf.org${pagePath}`; document.head.appendChild(l); }
  document.title = metaConfig.title;
}

const nav = document.querySelector('header nav');
if (nav) {
  const cta = nav.querySelector(':scope > .nav-cta');
  if (cta) cta.textContent = 'Join PHAN';
  const aboutMenu = nav.querySelector('.nav-dropdown .dropdown-menu');
  if (aboutMenu && !aboutMenu.querySelector('a[href="about.html"]')) { const a = document.createElement('a'); a.href = 'about.html'; a.textContent = 'About PHAN'; aboutMenu.prepend(a); }

  const header = document.querySelector('.site-header');
  const toggle = document.createElement('button');
  const mobileNav = document.createElement('div');
  toggle.className = 'mobile-nav-toggle'; toggle.type = 'button'; toggle.setAttribute('aria-label', 'Open navigation'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-controls', 'mobile-navigation'); toggle.textContent = '\u2630';
  mobileNav.className = 'mobile-nav'; mobileNav.id = 'mobile-navigation'; mobileNav.setAttribute('aria-label', 'Mobile navigation');

  nav.querySelectorAll(':scope > a, :scope > .nav-dropdown').forEach((item) => {
    if (item.matches('a')) { const link = item.cloneNode(true); if (link.classList.contains('nav-cta')) link.classList.add('mobile-nav-cta'); mobileNav.appendChild(link); return; }
    const label = item.querySelector(':scope > span');
    if (label) { const heading = document.createElement('div'); heading.className = 'mobile-nav-group'; heading.textContent = label.textContent.replace(/\s+▾$/, '').trim(); mobileNav.appendChild(heading); }
    item.querySelectorAll(':scope > .dropdown-menu > a').forEach((link) => { const clone = link.cloneNode(true); clone.classList.add('mobile-subitem'); mobileNav.appendChild(clone); });
  });

  toggle.addEventListener('click', () => { const open = mobileNav.classList.toggle('is-open'); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); toggle.textContent = open ? '\u00d7' : '\u2630'; });
  mobileNav.addEventListener('click', (event) => { if (!event.target.closest('a')) return; mobileNav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation'); toggle.textContent = '\u2630'; });
  header.querySelector('.header-inner').append(toggle, mobileNav);
}

if (pagePath === '/' || pagePath === '/index.html') {
  const style = document.createElement('style');
  style.textContent = `
    .phan-hero h1 { font-size: clamp(44px, 5vw, 68px); }
    .phan-section-heading h2 { font-size: clamp(32px, 3.5vw, 44px); }
    .phan-mission h2, .phan-neighborhood h2, .phan-guide-heading h2, .phan-character-copy h2, .phan-history-copy h2 { font-size: clamp(36px, 3.6vw, 52px); }
    .phan-life-copy h2 { font-size: clamp(36px, 3.5vw, 48px); }
    .phan-join h2 { font-size: clamp(30px, 3.2vw, 44px); }
    .phan-location h2 { font-size: 42px; }
    .phan-section-heading > .phan-section-link { display: none; }
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.phan-home h1, .phan-home h2').forEach((heading) => {
    heading.textContent = heading.textContent.replace(/\.\s*$/, '').replace(/Presidio Heights/g, 'Presidio\u00a0Heights');
  });
}

if (pagePath === '/board.html') {
  const theme = document.createElement('link');
  theme.rel = 'stylesheet';
  theme.href = 'phan-theme.css';
  document.head.appendChild(theme);

  const main = document.querySelector('main.page-content');
  const title = main?.querySelector(':scope > h2');
  if (main && title) {
    const h1 = document.createElement('h1');
    h1.innerHTML = title.innerHTML;
    title.replaceWith(h1);

    const kicker = document.createElement('span');
    kicker.className = 'story-kicker';
    kicker.textContent = 'About PHAN';
    main.insertBefore(kicker, main.querySelector(':scope > h1'));

    const officersHeading = Array.from(main.querySelectorAll(':scope > h4')).find((heading) => heading.textContent.trim() === 'Officers');
    if (officersHeading) {
      const sectionHeading = document.createElement('h2');
      sectionHeading.textContent = 'Officers';
      officersHeading.replaceWith(sectionHeading);
    }

    const boardColumns = main.querySelector('.board-columns');
    if (boardColumns) {
      const sectionHeading = document.createElement('h2');
      sectionHeading.textContent = 'Board of Directors';
      main.insertBefore(sectionHeading, boardColumns);
      boardColumns.querySelectorAll(':scope > div > h4').forEach((heading) => heading.remove());
    }
  }
}

const membershipForm = document.querySelector('#membership-form');
if (membershipForm) {
  const status = membershipForm.querySelector('.form-status');
  membershipForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!membershipForm.reportValidity()) return;
    const data = new FormData(membershipForm);
    const subject = encodeURIComponent('PHAN membership contact');
    const body = encodeURIComponent([`Name: ${data.get('name')}`, `Email: ${data.get('email')}`, `Address: ${data.get('address')}`, `Additional household members: ${data.get('household') || 'None'}`].join('\n'));
    window.location.href = `mailto:info@phansf.org?subject=${subject}&body=${body}`;
    status.textContent = 'Your email client is opening with your membership details.';
    status.classList.remove('error');
  });
}