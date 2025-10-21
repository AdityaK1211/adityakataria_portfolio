// ===== Theme Handling with Persistence =====
const themeToggles = document.querySelectorAll('#toggle-theme, #mobile-theme-toggle');

function applyTheme(mode) {
  if (mode === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggles.forEach(b => b.textContent = '☀');
  } else {
    document.body.classList.remove('dark-mode');
    themeToggles.forEach(b => b.textContent = '🌙');
  }
}
function getStoredTheme() { return localStorage.getItem('theme') || 'light'; }
function setStoredTheme(mode) { localStorage.setItem('theme', mode); }
function toggleTheme() {
  const isDark = document.body.classList.contains('dark-mode');
  applyTheme(isDark ? 'light' : 'dark');
  setStoredTheme(isDark ? 'light' : 'dark');
}
applyTheme(getStoredTheme());
themeToggles.forEach(btn => btn && btn.addEventListener('click', toggleTheme));

// ===== Mobile Sidebar Toggle =====
const menuToggleBtn = document.getElementById('menu-toggle');
const sidebar = document.querySelector('.sidebar');
if (menuToggleBtn && sidebar) {
  menuToggleBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
}
document.querySelectorAll('.sidebar nav a').forEach(a => {
  a.addEventListener('click', () => { if (window.innerWidth <= 768) sidebar.classList.remove('open'); });
});

// ===== OS-style Modal =====
const trashBtn = document.getElementById('trash-btn');
const trashModal = document.getElementById('trash-modal');
const trashClose = document.getElementById('trash-close');

if (trashBtn && trashModal) {
  trashBtn.addEventListener('click', () => {
    trashModal.style.display = 'flex';
    trashModal.setAttribute('aria-hidden', 'false');
  });
  if (trashClose) {
    trashClose.addEventListener('click', () => {
      trashModal.style.display = 'none';
      trashModal.setAttribute('aria-hidden', 'true');
    });
  }
  trashModal.addEventListener('click', (e) => {
    if (e.target === trashModal) {
      trashModal.style.display = 'none';
      trashModal.setAttribute('aria-hidden', 'true');
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && trashModal.style.display === 'flex') {
      trashModal.style.display = 'none';
      trashModal.setAttribute('aria-hidden', 'true');
    }
  });
}

// ===== Education logos: click-to-zoom lightbox =====
const lightbox = document.getElementById('img-lightbox');
const lightboxImg = document.getElementById('lightbox-img');

if (lightbox && lightboxImg) {
  document.querySelectorAll('.edu-logo').forEach(img => {
    img.addEventListener('click', () => {
      if (img.classList.contains('missing')) return;
      lightboxImg.src = img.src;
      lightbox.style.display = 'flex';
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });
  lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
  });
}

// ===== Minor polish: focus ring on Tab only =====
(function focusRings() {
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);
})();
