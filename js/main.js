/**
 * TAURUS TAX GROUP - MAIN JAVASCRIPT
 * Handles component loading, navigation, mobile menu, and page interactions
 */

// ============================================
// THEME (runs immediately to prevent flash)
// ============================================

(function() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

// ============================================
// COMPONENT LOADER
// ============================================

async function loadComponents() {
  const headerPlaceholder = document.getElementById('site-header');
  const footerPlaceholder = document.getElementById('site-footer');

  // Detect base path from the script's own src attribute
  const scriptEl = document.querySelector('script[src$="main.js"]');
  const basePath = scriptEl ? scriptEl.src.replace(/js\/main\.js$/, '') : '';

  const fetches = [];

  if (headerPlaceholder) {
    fetches.push(
      fetch(basePath + 'components/header.html')
        .then(res => res.text())
        .then(html => {
          // Fix relative links if we're in a subdirectory
          const depth = location.pathname.split('/').length - 2;
          const prefix = depth > 1 ? '../' : '';
          if (prefix) {
            html = html.replace(/href="(?!https?:\/\/|mailto:|tel:|#)([^"]+)"/g, 'href="' + prefix + '$1"');
            html = html.replace(/src="(?!https?:\/\/)([^"]+)"/g, 'src="' + prefix + '$1"');
          }
          headerPlaceholder.outerHTML = html;
        })
    );
  }

  if (footerPlaceholder) {
    fetches.push(
      fetch(basePath + 'components/footer.html')
        .then(res => res.text())
        .then(html => {
          const depth = location.pathname.split('/').length - 2;
          const prefix = depth > 1 ? '../' : '';
          if (prefix) {
            html = html.replace(/href="(?!https?:\/\/|mailto:|tel:|#)([^"]+)"/g, 'href="' + prefix + '$1"');
            html = html.replace(/src="(?!https?:\/\/)([^"]+)"/g, 'src="' + prefix + '$1"');
          }
          footerPlaceholder.outerHTML = html;
        })
    );
  }

  await Promise.all(fetches);
}

// ============================================
// INITIALIZATION (runs after components load)
// ============================================

function initSite() {

  // ============================================
  // MOBILE NAVIGATION
  // ============================================

  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Create overlay element
  let mobileOverlay = document.querySelector('.mobile-menu-overlay');
  if (!mobileOverlay && mobileMenuToggle) {
    mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-menu-overlay';
    mobileOverlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(mobileOverlay);
  }

  function closeMobileMenu() {
    if (navLinks && mobileMenuToggle) {
      navLinks.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (mobileOverlay) {
        mobileOverlay.classList.remove('active');
      }
    }
  }

  function openMobileMenu() {
    if (navLinks && mobileMenuToggle) {
      navLinks.classList.add('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      if (mobileOverlay) {
        mobileOverlay.classList.add('active');
      }
      // Focus first link for keyboard navigation
      const firstLink = navLinks.querySelector('a');
      if (firstLink) {
        setTimeout(() => firstLink.focus(), 300);
      }
    }
  }

  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close mobile menu when clicking on a link
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(link => {
      link.addEventListener('click', function() {
        closeMobileMenu();
      });
    });

    // Close mobile menu when clicking overlay
    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', function() {
        closeMobileMenu();
      });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.main-nav') &&
          !event.target.closest('.mobile-menu-overlay') &&
          navLinks.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  }

  // ============================================
  // ACTIVE NAVIGATION LINK
  // ============================================

  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksElements = document.querySelectorAll('.nav-links a');

    navLinksElements.forEach(link => {
      const linkPage = link.getAttribute('href').split('#')[0];

      // Remove active class from all
      link.classList.remove('active');

      // Add active class to current page
      if (linkPage === currentPage ||
          (currentPage === '' && linkPage === 'index.html') ||
          (currentPage === '/' && linkPage === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  setActiveNavLink();

  // ============================================
  // SMOOTH SCROLLING FOR ANCHOR LINKS
  // ============================================

  const anchorLinks = document.querySelectorAll('a[href*="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Only handle same-page anchors
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const navHeight = document.querySelector('.site-header')?.offsetHeight || 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ============================================
  // HEADER SHADOW ON SCROLL
  // ============================================

  const siteHeader = document.querySelector('.site-header');

  if (siteHeader) {
    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', function() {
      lastScroll = window.pageYOffset;

      if (!ticking) {
        window.requestAnimationFrame(function() {
          if (lastScroll > 10) {
            siteHeader.style.boxShadow = '0 2px 12px rgba(16, 40, 72, 0.15)';
          } else {
            siteHeader.style.boxShadow = '0 2px 8px rgba(16, 40, 72, 0.08)';
          }
          ticking = false;
        });

        ticking = true;
      }
    });
  }

  // ============================================
  // THEME TOGGLE
  // ============================================

  const themeToggle = document.querySelector('.theme-toggle');

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  // Listen for device theme changes (only applies if user hasn't manually chosen)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }
  });

  // ============================================
  // ACCESSIBILITY: ESC KEY TO CLOSE MOBILE MENU
  // ============================================

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navLinks?.classList.contains('active')) {
      closeMobileMenu();
      // Return focus to toggle button
      if (mobileMenuToggle) {
        mobileMenuToggle.focus();
      }
    }
  });
}

// ============================================
// BOOTSTRAP
// ============================================

document.addEventListener('DOMContentLoaded', async function() {
  await loadComponents();
  initSite();
});
