// ==========================================================================
// MATTIA SCARPA — PORTFOLIO ENGINE
// Lenis Smooth Scroll, GSAP Orchestration, Theme Engine & Interactions
// ==========================================================================

// ==================== 1. THEME ENGINE ====================
const THEMES = {
    monochrome: { name: 'Obsidian Silver', color: '#f5f5f5' },
    emerald:    { name: 'Cyber Emerald',  color: '#00ffaa' },
    cyan:       { name: 'Electric Cyan',   color: '#00e5ff' },
    violet:     { name: 'Violet Synth',    color: '#c084fc' },
    amber:      { name: 'Solar Amber',     color: '#fbbf24' },
    crimson:    { name: 'Neon Crimson',    color: '#ff2d55' }
};

function setTheme(themeKey) {
    if (!THEMES[themeKey]) themeKey = 'monochrome';
    
    document.documentElement.setAttribute('data-theme', themeKey);
    try {
        localStorage.setItem('portfolio_theme', themeKey);
    } catch(e) {}

    // Aggiorna indicatore colore bottone
    const indicator = document.getElementById('themeActiveIndicator');
    if (indicator) {
        indicator.style.backgroundColor = THEMES[themeKey].color;
        indicator.style.boxShadow = `0 0 10px ${THEMES[themeKey].color}`;
    }

    // Aggiorna stato attivo nel menu
    document.querySelectorAll('.theme-option').forEach(opt => {
        if (opt.getAttribute('data-theme') === themeKey) {
            opt.classList.add('active');
        } else {
            opt.classList.remove('active');
        }
    });
}

// Inizializzazione Theme Engine
function initThemeEngine() {
    let saved = 'monochrome';
    try {
        saved = localStorage.getItem('portfolio_theme') || 'monochrome';
    } catch(e) {}
    setTheme(saved);

    const toggleBtn = document.getElementById('themeToggleBtn');
    const themeMenu = document.getElementById('themeMenu');

    if (toggleBtn && themeMenu) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = themeMenu.classList.contains('open');
            if (isOpen) {
                closeThemeMenu();
            } else {
                openThemeMenu();
            }
        });

        // Selezione tema
        document.querySelectorAll('.theme-option').forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                const chosen = opt.getAttribute('data-theme');
                setTheme(chosen);
                closeThemeMenu();
            });
        });

        // Chiusura al click esterno
        document.addEventListener('click', (e) => {
            if (!themeMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
                closeThemeMenu();
            }
        });

        // Chiusura con tasto Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeThemeMenu();
        });
    }

    function openThemeMenu() {
        themeMenu.classList.add('open');
        toggleBtn.setAttribute('aria-expanded', 'true');
    }

    function closeThemeMenu() {
        if (themeMenu) themeMenu.classList.remove('open');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    }
}
initThemeEngine();

// ==================== 2. VENICE LIVE TIME ====================
function updateVeniceTime() {
    const el = document.getElementById('veniceTime');
    if (!el) return;
    try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('it-IT', {
            timeZone: 'Europe/Rome',
            hour: '2-digit',
            minute: '2-digit'
        });
        el.textContent = `Venice, IT • ${timeStr} CET`;
    } catch(e) {}
}
updateVeniceTime();
setInterval(updateVeniceTime, 30000);

// ==================== 3. LENIS SMOOTH SCROLL ====================
const lenisInstance = new Lenis({
    lerp: 0.085,
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.0,
    touchInertiaMultiplier: 0.8,
    smoothTouch: false,
    syncTouch: false
});

lenisInstance.on('scroll', ScrollTrigger.update);

// Sincronizzazione precisa tra Lenis e GSAP Ticker per eliminare jitter
gsap.ticker.add((time) => {
    lenisInstance.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// ==================== 4. CURSOR & AMBIENT SPOTLIGHT ====================
const techCursor = document.querySelector('.tech-cursor');
const ambientGlow = document.getElementById('ambientGlow');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let glowX = mouseX;
let glowY = mouseY;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (techCursor) {
        techCursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }
});

// Smooth RAF interpolation for ambient background light
function animateAmbientGlow() {
    if (ambientGlow) {
        glowX += (mouseX - glowX) * 0.06;
        glowY += (mouseY - glowY) * 0.06;
        ambientGlow.style.left = `${glowX}px`;
        ambientGlow.style.top = `${glowY}px`;
    }
    requestAnimationFrame(animateAmbientGlow);
}
requestAnimationFrame(animateAmbientGlow);

// Spotlight Mouse-tracking on Bento & Work Cards
function initSpotlightCards() {
    const cards = document.querySelectorAll('.skill-bento-card, .work-card, .cert-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}
initSpotlightCards();

// Cursor Hover Effects
document.querySelectorAll('.hoverable, a, button, .lightbox-image, .work-card').forEach(el => {
    el.addEventListener('mouseenter', () => { if (techCursor) techCursor.classList.add('hovering'); });
    el.addEventListener('mouseleave', () => { if (techCursor) techCursor.classList.remove('hovering'); });
});

if ('ontouchstart' in window) {
    if (techCursor) techCursor.style.display = 'none';
    document.body.style.cursor = 'auto';
}

// ==================== 5. SCROLL PROGRESS ====================
const scrollProg = document.getElementById('scrollProgress');
lenisInstance.on('scroll', ({ progress }) => {
    if (scrollProg) scrollProg.style.transform = `scaleY(${progress})`;
});

// ==================== 6. MOBILE MENU ====================
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        menuOpen = !menuOpen;
        mobileMenu.classList.toggle('open', menuOpen);
        menuToggle.innerHTML = menuOpen
            ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
            : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></svg>';
    });
}

function closeMobileMenu() {
    menuOpen = false;
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (menuToggle) menuToggle.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></svg>';
}

// ==================== 7. NAV SCROLL EFFECT ====================
const navBar = document.querySelector('.nav-bar');
if (navBar) {
    ScrollTrigger.create({
        start: 50,
        onUpdate: self => navBar.classList.toggle('scrolled', self.progress > 0)
    });
}

// ==================== 8. TYPING EFFECT ====================
const roles = [
    'Full-Stack Developer',
    'Creative Technologist',
    'iOS & Swift Engineer',
    'IT Systems & DevOps Specialist'
];
let rIdx = 0, cIdx = 0, deleting = false;

function typeRole() {
    const roleTexts = document.querySelectorAll('.hero-role span:first-child');
    const cur = roles[rIdx];
    if (!deleting) {
        const txt = cur.substring(0, cIdx + 1);
        roleTexts.forEach(el => el.textContent = txt);
        cIdx++;
        if (cIdx === cur.length) {
            deleting = true;
            setTimeout(typeRole, 2400);
            return;
        }
        setTimeout(typeRole, 65);
    } else {
        const txt = cur.substring(0, cIdx - 1);
        roleTexts.forEach(el => el.textContent = txt);
        cIdx--;
        if (cIdx === 0) {
            deleting = false;
            rIdx = (rIdx + 1) % roles.length;
            setTimeout(typeRole, 350);
            return;
        }
        setTimeout(typeRole, 30);
    }
}

// ==================== 9. PRELOADER & HERO REVEALS ====================
window.addEventListener('load', () => {
    const preloaderFill = document.querySelector('.preloader-fill');
    const preTl = gsap.timeline({ onComplete: initScrollAnimations });

    preTl
        .to(preloaderFill, { width: '100%', duration: 0.9, ease: 'power2.inOut' })
        .to('.preloader-text', { y: -20, opacity: 0, duration: 0.35, ease: 'power2.in' }, '+=0.1')
        .to('.preloader', { yPercent: -100, duration: 0.7, ease: 'power3.inOut' })
        .set('.preloader', { display: 'none' })
        .to('.hero-line', { y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.08 }, '-=0.2')
        .to('.hero-role', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.5')
        .to('.hero-subtitle', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .to('.hero-object', { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }, '-=0.8')
        .to('.hero-scroll', { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.4')
        .call(() => { typeRole(); });
});

// ==================== 10. SCROLL ANIMATIONS & GSAP SETUP ====================
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Floating 3D Scene animation
    gsap.to('.cube-scene', { y: '-=16', duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1 });

    // Interactive Holographic Cube 3D Physics
    document.querySelectorAll('.hero-object').forEach(heroObj => {
        const cube = heroObj.querySelector('.cube');
        const scene = heroObj.querySelector('.cube-scene');

        heroObj.addEventListener('mouseenter', () => {
            if (techCursor) techCursor.classList.add('dot-mode');
            const targetZ = window.innerWidth < 768 ? '100px' : '150px';
            gsap.to(cube, { '--cube-z': targetZ, duration: 0.6, ease: 'back.out(1.5)' });
        });

        heroObj.addEventListener('mousemove', (e) => {
            const rect = heroObj.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distX = (e.clientX - centerX) / (rect.width / 2);
            const distY = (e.clientY - centerY) / (rect.height / 2);
            const distance = Math.min(Math.sqrt(distX * distX + distY * distY), 1);

            const baseZ = window.innerWidth < 768 ? 75 : 120;
            const maxAddZ = window.innerWidth < 768 ? 45 : 110;
            const targetZ = baseZ + ((1 - distance) * maxAddZ);

            gsap.to(cube, { '--cube-z': `${targetZ}px`, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
            gsap.to(scene, { rotationX: -distY * 24, rotationY: distX * 24, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
        });

        heroObj.addEventListener('mouseleave', () => {
            if (techCursor) techCursor.classList.remove('dot-mode');
            const baseZ = window.innerWidth < 768 ? '75px' : '120px';
            gsap.to(cube, { '--cube-z': baseZ, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
            gsap.to(scene, { rotationX: 0, rotationY: 0, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
        });
    });

    // Hero Parallax
    const heroEl = document.querySelector('.hero');
    if (heroEl) {
        gsap.to(heroEl.querySelector('.hero-content'), {
            y: -110,
            ease: 'none',
            scrollTrigger: { trigger: heroEl, start: 'top top', end: 'bottom top', scrub: true }
        });
        gsap.to(heroEl.querySelector('.hero-object'), {
            y: -180,
            x: -60,
            ease: 'none',
            scrollTrigger: { trigger: heroEl, start: 'top top', end: 'bottom top', scrub: true }
        });
    }

    // Text line reveals
    gsap.utils.toArray('.reveal-line-inner').forEach(el => {
        gsap.to(el, {
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el.closest('.reveal-line'),
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    });

    // About draw line
    gsap.to('#aboutLine', {
        width: '100%',
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: { trigger: '#aboutLine', start: 'top 85%', toggleActions: 'play none none none' }
    });

    // Animated Stat Counters
    document.querySelectorAll('.stat-item').forEach(item => {
        const target = parseInt(item.dataset.target, 10);
        const numEl = item.querySelector('.stat-num');
        ScrollTrigger.create({
            trigger: item,
            start: 'top 88%',
            once: true,
            onEnter: () => {
                gsap.to({ val: 0 }, {
                    val: target,
                    duration: 1.8,
                    ease: 'power2.out',
                    onUpdate: function () {
                        numEl.textContent = Math.round(this.targets()[0].val) + '+';
                    }
                });
            }
        });
    });

    // ---- APPROACH STICKY SECTION ----
    const steps = gsap.utils.toArray('.approach-step');
    const stepNum = document.getElementById('stepNumber');

    if (steps.length > 1 && document.querySelector('.approach-wrapper')) {
        steps.forEach((s, i) => { if (i > 0) gsap.set(s, { y: 60, opacity: 0 }); });

        const aTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.approach-wrapper',
                start: 'top top',
                end: 'bottom bottom',
                scrub: true
            }
        });

        for (let i = 1; i < steps.length; i++) {
            const pos = (i - 1) / (steps.length - 1);
            aTl.to(steps[i - 1], { y: -50, opacity: 0, duration: 0.25, ease: 'none' }, pos);
            if (stepNum) {
                aTl.to(stepNum, { opacity: 0, y: -15, duration: 0.08, ease: 'none' }, pos);
                const label = 'step' + i;
                aTl.addLabel(label, pos + 0.1);
                aTl.set(stepNum, { textContent: '0' + (i + 1) }, label);
                aTl.to(stepNum, { opacity: 1, y: 0, duration: 0.08, ease: 'none' }, label);
            }
            aTl.to(steps[i], { y: 0, opacity: 1, duration: 0.25, ease: 'none' }, pos + 0.1);
        }
    }

    // ---- HORIZONTAL WORK SCROLL ----
    const workTrack = document.querySelector('.work-track');
    if (workTrack) {
        const tween = gsap.to(workTrack, {
            x: () => -(workTrack.scrollWidth - window.innerWidth + window.innerWidth * 0.1),
            ease: 'none'
        });

        ScrollTrigger.create({
            trigger: '.work-wrapper',
            start: 'top top',
            end: 'bottom bottom',
            animation: tween,
            scrub: true,
            invalidateOnRefresh: true
        });
    }

    // ---- BENTO SKILLS ANIMATION ----
    gsap.utils.toArray('.skill-bento-card').forEach((card, i) => {
        gsap.from(card, {
            y: 35,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none'
            },
            delay: (i % 2) * 0.12
        });
    });

    // ---- TIMELINE EXPERIENCE PROGRESS ----
    const timelineSection = document.getElementById('timelineSection');
    const timelineFill = document.getElementById('timelineFill');
    const timelineDots = document.querySelectorAll('.timeline-dot');

    if (timelineFill && timelineSection) {
        gsap.to(timelineFill, {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: timelineSection,
                start: 'top 60%',
                end: 'bottom 60%',
                scrub: true
            }
        });
    }

    timelineDots.forEach(dot => {
        ScrollTrigger.create({
            trigger: dot.closest('.timeline-entry'),
            start: 'top 60%',
            onEnter: () => dot.classList.add('active'),
            onLeaveBack: () => dot.classList.remove('active')
        });
    });

    // ---- CTA SCALE EFFECT ----
    gsap.to('.cta-text', {
        scale: 0.9,
        opacity: 0.4,
        ease: 'none',
        scrollTrigger: {
            trigger: '#contact',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });

    // Init project overlay & cards
    initProjectOverlayLogic();
}

// ==================== 11. PROJECT OVERLAY & MODAL LOGIC ====================
function initProjectOverlayLogic() {
    const projectsData = (typeof window !== 'undefined' && window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
    const overlay = document.getElementById('projectOverlay');
    const closeBtn = document.getElementById('closeOverlayBtn');
    const overlayScrollArea = document.getElementById('overlayScrollArea');
    let overlayLenis = null;
    let overlayRafId = null;

    function rafOverlay(time) {
        if (overlayLenis) {
            overlayLenis.raf(time);
            overlayRafId = requestAnimationFrame(rafOverlay);
        }
    }

    function initOverlayLenis() {
        if (overlayRafId) cancelAnimationFrame(overlayRafId);
        if (overlayLenis) overlayLenis.destroy();

        overlayLenis = new Lenis({
            wrapper: overlayScrollArea,
            content: overlayScrollArea.querySelector('.overlay-lenis-content'),
            lerp: 0.05,
            smoothWheel: true,
            smoothTouch: true,
            syncTouch: false,
            touchMultiplier: 0.8,
            touchInertiaMultiplier: 0.85
        });
        overlayRafId = requestAnimationFrame(rafOverlay);
    }

    const wCards = document.querySelectorAll('.work-card');
    wCards.forEach((card, index) => {
        card.style.pointerEvents = 'auto';
        card.style.cursor = 'pointer';

        card.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const data = projectsData[index];
            if (!data) return;

            document.getElementById('overlayHeroImg').src = data.hero;
            document.getElementById('overlayCat').textContent = data.category;
            document.getElementById('overlayTitle').textContent = data.title;
            document.getElementById('overlayDesc').innerHTML = data.desc;
            document.getElementById('overlayRole').textContent = data.role;
            document.getElementById('overlayYear').textContent = data.year;

            const linkEl = document.getElementById('overlayLink');
            const linkContainer = document.getElementById('overlayLinkContainer');
            if (data.link && data.link !== '#') {
                linkEl.href = data.link;
                linkContainer.style.display = 'block';
            } else {
                linkContainer.style.display = 'none';
            }

            const tagsContainer = document.getElementById('overlayTags');
            tagsContainer.innerHTML = '';
            (data.tags || []).forEach(tag => {
                const span = document.createElement('span');
                span.className = 'text-[10px] tracking-[0.15em] uppercase text-text-sec border border-white/15 px-4 py-1.5 rounded-full backdrop-blur-sm bg-white/5';
                span.textContent = tag;
                tagsContainer.appendChild(span);
            });

            const galleryContainer = document.getElementById('overlayGallery');
            const gallerySection = document.getElementById('gallerySection');
            galleryContainer.innerHTML = '';

            if (data.gallery && data.gallery.length > 0) {
                if (gallerySection) gallerySection.style.display = 'block';
                data.gallery.forEach(imgSrc => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.className = 'w-full h-auto object-contain rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:opacity-80 transition-all duration-300 lightbox-image';
                    img.loading = 'lazy';
                    galleryContainer.appendChild(img);
                });
            } else {
                if (gallerySection) gallerySection.style.display = 'none';
            }

            // Stop main Lenis and slide in overlay
            lenisInstance.stop();
            gsap.set(overlay, { display: 'flex', yPercent: 100 });
            overlayScrollArea.scrollTop = 0;

            gsap.to(overlay, {
                yPercent: 0,
                duration: 0.75,
                ease: 'power4.out',
                onComplete: () => {
                    initOverlayLenis();
                }
            });

            if (techCursor) {
                techCursor.style.opacity = '0';
                document.body.style.cursor = 'auto';
            }
        });
    });

    function closeOverlay() {
        if (overlayRafId) cancelAnimationFrame(overlayRafId);
        if (overlayLenis) {
            overlayLenis.destroy();
            overlayLenis = null;
        }

        gsap.to(overlay, {
            yPercent: 100,
            duration: 0.65,
            ease: 'power3.inOut',
            onComplete: () => {
                gsap.set(overlay, { display: 'none' });
                lenisInstance.start();
                if (techCursor) {
                    techCursor.style.opacity = '1';
                    if (!('ontouchstart' in window)) document.body.style.cursor = 'none';
                }
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeOverlay();
        });
    }

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay && overlay.style.display === 'flex' && !isLightboxOpen) {
            closeOverlay();
        }
    });
}

// ==================== 12. GLOBAL LIGHTBOX ====================
const globalLightbox = document.getElementById('globalLightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeLightboxBtn = document.getElementById('closeLightboxBtn');
let isLightboxOpen = false;

function openLightbox(src) {
    if (!globalLightbox || !lightboxImg) return;
    isLightboxOpen = true;
    lightboxImg.src = src;
    globalLightbox.classList.remove('pointer-events-none');

    gsap.to(globalLightbox, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    gsap.to(lightboxImg, { scale: 1, duration: 0.5, ease: 'back.out(1.2)' });
}

function closeLightbox() {
    if (!globalLightbox || !isLightboxOpen) return;
    isLightboxOpen = false;

    gsap.to(globalLightbox, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
        onComplete: () => {
            globalLightbox.classList.add('pointer-events-none');
            lightboxImg.src = '';
        }
    });
    gsap.to(lightboxImg, { scale: 0.95, duration: 0.3, ease: 'power2.inOut' });
}

const projectOverlay = document.getElementById('projectOverlay');
if (projectOverlay) {
    projectOverlay.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG' && (e.target.closest('#overlayGallery') || e.target.classList.contains('lightbox-image'))) {
            openLightbox(e.target.src);
        }
    });

    projectOverlay.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'IMG' && (e.target.closest('#overlayGallery') || e.target.classList.contains('lightbox-image'))) {
            if (techCursor) techCursor.classList.add('hovering');
        }
    });
    projectOverlay.addEventListener('mouseout', (e) => {
        if (e.target.tagName === 'IMG' && (e.target.closest('#overlayGallery') || e.target.classList.contains('lightbox-image'))) {
            if (techCursor) techCursor.classList.remove('hovering');
        }
    });
}

if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
if (globalLightbox) {
    globalLightbox.addEventListener('click', (e) => {
        if (e.target === globalLightbox || e.target.classList.contains('lightbox-content-wrapper')) {
            closeLightbox();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isLightboxOpen) closeLightbox();
});

// ==================== 13. EXPAND / COLLAPSE SECTIONS ====================
// Projects Expand / Collapse
let projectsExpanded = false;
const toggleProjectsBtn = document.getElementById('toggleProjectsBtn');
const toggleProjectsText = document.getElementById('toggleProjectsText');
const toggleProjectsIcon = document.getElementById('toggleProjectsIcon');
const extraCards = document.querySelectorAll('.work-card-extra');
const workWrapper = document.querySelector('.work-wrapper');
const allWorkCards = document.querySelectorAll('.work-card');

if (toggleProjectsBtn && extraCards.length > 0) {
    toggleProjectsBtn.addEventListener('click', () => {
        projectsExpanded = !projectsExpanded;
        if (projectsExpanded) {
            if (lenisInstance) {
                lenisInstance.scrollTo(workWrapper, { duration: 0.25, offset: 0 });
            } else if (workWrapper) {
                workWrapper.scrollIntoView({ behavior: 'smooth' });
            }

            extraCards.forEach(card => {
                card.style.display = 'flex';
                gsap.to(card, { opacity: 1, duration: 0.4, ease: 'power2.out' });
            });
            if (toggleProjectsText) toggleProjectsText.textContent = 'Mostra meno';
            if (toggleProjectsIcon) toggleProjectsIcon.style.transform = 'rotate(180deg)';
            if (workWrapper) workWrapper.classList.add('is-expanded');

            setTimeout(() => {
                ScrollTrigger.refresh();
                initSpotlightCards();
            }, 60);
        } else {
            if (lenisInstance) {
                lenisInstance.scrollTo(workWrapper, { duration: 0.65, offset: 0 });
            } else if (workWrapper) {
                workWrapper.scrollIntoView({ behavior: 'smooth' });
            }

            setTimeout(() => {
                extraCards.forEach(card => {
                    gsap.to(card, {
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.in',
                        onComplete: () => { card.style.display = 'none'; }
                    });
                });
                if (toggleProjectsText) toggleProjectsText.textContent = `Mostra tutti (${allWorkCards.length})`;
                if (toggleProjectsIcon) toggleProjectsIcon.style.transform = 'rotate(0deg)';
                if (workWrapper) workWrapper.classList.remove('is-expanded');

                setTimeout(() => {
                    ScrollTrigger.refresh();
                }, 350);
            }, 300);
        }
    });
}

// Experience Expand / Collapse
let expExpanded = false;
const toggleExpBtn = document.getElementById('toggleExperienceBtn');
const toggleExpText = document.getElementById('toggleExpText');
const toggleExpIcon = document.getElementById('toggleExpIcon');
const extraExp = document.getElementById('extraExperience');

if (toggleExpBtn && extraExp) {
    toggleExpBtn.addEventListener('click', () => {
        expExpanded = !expExpanded;
        if (expExpanded) {
            extraExp.classList.add('is-expanded');
            if (toggleExpText) toggleExpText.textContent = 'Mostra meno';
            if (toggleExpIcon) toggleExpIcon.style.transform = 'rotate(180deg)';
            setTimeout(() => { ScrollTrigger.refresh(); }, 400);
        } else {
            const expSection = document.getElementById('experience');
            if (lenisInstance) {
                lenisInstance.scrollTo(expSection, { duration: 0.6, offset: -20 });
            } else if (expSection) {
                expSection.scrollIntoView({ behavior: 'smooth' });
            }

            setTimeout(() => {
                extraExp.classList.remove('is-expanded');
                if (toggleExpText) toggleExpText.textContent = 'Mostra tutte le esperienze (4)';
                if (toggleExpIcon) toggleExpIcon.style.transform = 'rotate(0deg)';
                setTimeout(() => { ScrollTrigger.refresh(); }, 400);
            }, 250);
        }
    });
}
