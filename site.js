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
    .phan-join { background: var(--phan-green-deep); color: #fff; padding: 72px max(32px, calc((100% - 1200px) / 2)); }
    .phan-join-copy { max-width: 760px; }
    .phan-join .phan-eyebrow { margin-bottom: 10px; color: #b7c8bd; }
    .phan-join h2 { max-width: 760px; font-size: clamp(36px, 4vw, 54px); color: #fff; }
    .phan-join p { max-width: 680px; margin: 18px 0 0; color: rgba(255,255,255,.82); font-size: 15px; line-height: 1.8; }
    .phan-join-note { margin-top: 18px !important; color: #fff !important; font-size: 15px !important; font-weight: 600; letter-spacing: .01em; }
    .phan-join-link { display: inline-flex; align-items: center; gap: 9px; margin-top: 24px; color: #fff; font-size: 11px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,.45); padding-bottom: 6px; }
    .phan-join-link:hover { color: #fff; text-decoration: none; border-color: #fff; }
    .phan-section-heading > .phan-section-link { display: none; }
    .phan-mission-heading-line { white-space: nowrap; }
    @media (max-width: 760px) {
      .phan-join { padding: 58px 20px 64px; }
      .phan-join h2 { font-size: clamp(34px, 9vw, 46px); }
      .phan-join p { font-size: 14px; }
    }
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.phan-home h1, .phan-home h2').forEach((heading) => {
    heading.textContent = heading.textContent.replace(/\.\s*$/, '').replace(/Presidio Heights/g, 'Presidio\u00a0Heights');
  });

  const missionHeading = document.querySelector('.phan-mission h2');
  if (missionHeading) missionHeading.innerHTML = '<span class="phan-mission-heading-line">Your neighborhood.</span> Your voice';

  const parkHeading = document.querySelector('.phan-life-copy h2');
  if (parkHeading) parkHeading.textContent = parkHeading.textContent.replace("One of San Francisco's great parks is part of daily life", "One of San Francisco's great parks is part of everyday life");

  const joinSection = document.querySelector('.phan-join');
  if (joinSection) {
    const existingButton = joinSection.querySelector('a.btn');
    if (existingButton) existingButton.remove();
    if (!joinSection.querySelector('.phan-join-link')) {
      const link = document.createElement('a');
      link.href = 'membership.html';
      link.className = 'phan-join-link';
      link.innerHTML = 'Join PHAN <span aria-hidden="true">&#8594;</span>';
      joinSection.querySelector('.phan-join-copy')?.appendChild(link);
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
