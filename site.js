const nav = document.querySelector('header nav');

if (nav) {
  const header = document.querySelector('.site-header');
  const toggle = document.createElement('button');
  const mobileNav = document.createElement('div');

  toggle.className = 'mobile-nav-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-label', 'Open navigation');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = '\u2630';

  mobileNav.className = 'mobile-nav';
  nav.querySelectorAll('a').forEach((link) => {
    const clone = link.cloneNode(true);
    mobileNav.appendChild(clone);
  });

  toggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    toggle.textContent = open ? '\u00d7' : '\u2630';
  });

  mobileNav.addEventListener('click', () => {
    mobileNav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    toggle.textContent = '\u2630';
  });

  header.querySelector('.header-inner').append(toggle, mobileNav);
}

const membershipForm = document.querySelector('#membership-form');

if (membershipForm) {
  const status = membershipForm.querySelector('.form-status');

  membershipForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!membershipForm.reportValidity()) return;

    const data = new FormData(membershipForm);
    const subject = encodeURIComponent('PHAN membership contact');
    const body = encodeURIComponent([
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Address: ${data.get('address')}`,
      `Additional household members: ${data.get('household') || 'None'}`,
    ].join('\n'));

    window.location.href = `mailto:info@phansf.org?subject=${subject}&body=${body}`;
    status.textContent = 'Your email client is opening with your membership details.';
    status.classList.remove('error');
  });
}
