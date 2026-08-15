document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const nav = document.querySelector('.simple-nav');
    const navToggle = document.querySelector('.nav-toggle');
    const themeToggle = document.querySelector('.theme-toggle');
    const pathPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentPage = pathPage === 'project.html' ? 'projects.html' : pathPage;

    document.querySelectorAll('.simple-nav a').forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop() || 'index.html';
        if (linkPage === currentPage) {
            link.setAttribute('aria-current', 'page');
        }
    });

    const setMenuState = open => {
        if (!nav || !navToggle) return;
        nav.classList.toggle('is-open', open);
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
        const icon = navToggle.querySelector('i');
        if (icon) icon.className = open ? 'fas fa-xmark' : 'fas fa-bars';
    };

    navToggle?.addEventListener('click', () => {
        setMenuState(navToggle.getAttribute('aria-expanded') !== 'true');
    });

    nav?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => setMenuState(false));
    });

    document.addEventListener('click', event => {
        if (nav?.classList.contains('is-open') && !event.target.closest('.nav-shell')) {
            setMenuState(false);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 880) setMenuState(false);
    });

    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem('portfolio-theme');
    } catch (error) {
        savedTheme = null;
    }

    if (savedTheme === 'light' || savedTheme === 'dark') {
        body.dataset.theme = savedTheme;
    }

    const updateThemeControl = () => {
        if (!themeToggle) return;
        const isLight = body.dataset.theme === 'light';
        const label = isLight ? 'Switch to dark theme' : 'Switch to light theme';
        themeToggle.setAttribute('aria-label', label);
        themeToggle.setAttribute('title', label);
        const icon = themeToggle.querySelector('i');
        if (icon) icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
    };

    themeToggle?.addEventListener('click', () => {
        const nextTheme = body.dataset.theme === 'light' ? 'dark' : 'light';
        body.dataset.theme = nextTheme;
        try {
            localStorage.setItem('portfolio-theme', nextTheme);
        } catch (error) {
            // The selected theme still applies for the current page view.
        }
        updateThemeControl();
    });

    updateThemeControl();
});
