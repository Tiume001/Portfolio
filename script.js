// ==================== LENIS ====================
const lenisInstance = new Lenis({
    lerp: 0.08, // Valore bilanciato ottimale per desktop e mouse
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1, 
    touchInertiaMultiplier: 1,
    smoothTouch: true, 
    syncTouch: false,   
    infinite: true // Abilita lo scorrimento infinito
});
lenisInstance.on('scroll', ScrollTrigger.update);

// Sincronizzazione corretta tra Lenis e GSAP Ticker
// Questo evita conflitti tra i due loop di animazione (causa degli scatti su PC)
gsap.ticker.add((time) => {
    lenisInstance.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// ==================== CURSOR ====================
const techCursor = document.querySelector('.tech-cursor');
document.addEventListener('mousemove', e => { 
    if(techCursor) { 
        techCursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`; 
    }
});
document.querySelectorAll('.hoverable,a,button,.lightbox-image').forEach(el => {
    el.addEventListener('mouseenter', () => { if(techCursor) techCursor.classList.add('hovering'); });
    el.addEventListener('mouseleave', () => { if(techCursor) techCursor.classList.remove('hovering'); });
});
// Hover su bottoni modale e form
document.querySelectorAll('#closeOverlayBtn, .form-input, .form-btn').forEach(el => {
    el.addEventListener('mouseenter', () => { if(techCursor) techCursor.classList.add('hovering'); });
    el.addEventListener('mouseleave', () => { if(techCursor) techCursor.classList.remove('hovering'); });
});
if('ontouchstart' in window){ if(techCursor) techCursor.style.display='none'; document.body.style.cursor='auto'; }

// ==================== SCROLL PROGRESS ====================
const scrollProg = document.getElementById('scrollProgress');
lenisInstance.on('scroll', ({progress}) => { if(scrollProg) scrollProg.style.height = (progress*100)+'%'; });

// ==================== MOBILE MENU ====================
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;
menuToggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    menuToggle.innerHTML = menuOpen
        ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></svg>';
});
function closeMobileMenu(){ menuOpen=false; mobileMenu.classList.remove('open'); menuToggle.innerHTML='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></svg>'; }

// ==================== NAV SCROLL ====================
const navBar = document.querySelector('.nav-bar');
ScrollTrigger.create({ start: 60, onUpdate: self => navBar.classList.toggle('scrolled', self.progress > 0) });

// ==================== TYPING EFFECT ====================
const roles = ['Full-Stack Developer', 'Creative Technologist', 'UI Engineer', 'Problem Solver'];
let rIdx = 0, cIdx = 0, deleting = false;
function typeRole(){
    const roleTexts = document.querySelectorAll('.hero-role span:first-child');
    const cur = roles[rIdx];
    if(!deleting){
        const txt = cur.substring(0, cIdx+1);
        roleTexts.forEach(el => el.textContent = txt);
        cIdx++;
        if(cIdx === cur.length){ deleting = true; setTimeout(typeRole, 2200); return; }
        setTimeout(typeRole, 70);
    } else {
        const txt = cur.substring(0, cIdx-1);
        roleTexts.forEach(el => el.textContent = txt);
        cIdx--;
        if(cIdx === 0){ deleting = false; rIdx = (rIdx+1) % roles.length; setTimeout(typeRole, 400); return; }
        setTimeout(typeRole, 35);
    }
}

// ==================== PRELOADER ====================
window.addEventListener('load', () => {
    const preloaderFill = document.querySelector('.preloader-fill');
    const preTl = gsap.timeline({ onComplete: initScrollAnimations });
    
    preTl
        .to(preloaderFill, { width: '100%', duration: 1.0, ease: 'power2.inOut' })
        .to('.preloader-text', { y: -20, opacity: 0, duration: 0.4, ease: 'power2.in' }, '+=0.1')
        .to('.preloader', { yPercent: -100, duration: 0.7, ease: 'power3.inOut' })
        .set('.preloader', { display: 'none' })
        .to('.hero-line', { y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.09 }, '-=0.2')
        .to('.hero-role', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.5')
        .to('.hero-subtitle', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .to('.hero-object', { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }, '-=0.8')
        .to('.hero-scroll', { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.4')
        .call(() => { typeRole(); });
});

// Floating animation init logic moved to initScrollAnimations
// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations(){
    gsap.registerPlugin(ScrollTrigger);

    // Clone Hero for seamless infinite scroll
    const hero = document.querySelector('.hero');
    if (hero) {
        const clone = hero.cloneNode(true);
        clone.classList.add('hero-clone');
        // Rimuovi l'id per evitare duplicati
        clone.removeAttribute('id');
        document.body.insertBefore(clone, document.querySelector('script[src="script.js"]'));
    }

    // ==================== FLOATING ANIMATION ====================
    gsap.to('.cube-scene', { y: '-=18', duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 });

    // ==================== CUBE INTERACTION ====================
    document.querySelectorAll('.hero-object').forEach(heroObj => {
        const cube = heroObj.querySelector('.cube');
        const scene = heroObj.querySelector('.cube-scene');
        
        heroObj.addEventListener('mouseenter', () => {
            if(document.querySelector('.tech-cursor')) document.querySelector('.tech-cursor').classList.add('dot-mode');
            gsap.to(cube, { '--cube-z': window.innerWidth < 768 ? '100px' : '150px', duration: 0.6, ease: 'back.out(1.5)' });
        });

        heroObj.addEventListener('mousemove', (e) => {
            const rect = heroObj.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distX = (e.clientX - centerX) / (rect.width / 2);
            const distY = (e.clientY - centerY) / (rect.height / 2);
            const distance = Math.min(Math.sqrt(distX*distX + distY*distY), 1);
            
            const baseZ = window.innerWidth < 768 ? 70 : 110;
            const maxAddZ = window.innerWidth < 768 ? 50 : 120;
            const targetZ = baseZ + ((1 - distance) * maxAddZ); 
            
            gsap.to(cube, { '--cube-z': `${targetZ}px`, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
            gsap.to(scene, { rotationX: -distY * 20, rotationY: distX * 20, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
        });

        heroObj.addEventListener('mouseleave', () => {
            if(document.querySelector('.tech-cursor')) document.querySelector('.tech-cursor').classList.remove('dot-mode');
            gsap.to(cube, { '--cube-z': window.innerWidth < 768 ? '70px' : '110px', duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
            gsap.to(scene, { rotationX: 0, rotationY: 0, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
        });
    });

    // Hero parallax (applicato a tutte le hero, inclusa la clonata)
    gsap.utils.toArray('.hero').forEach(h => {
        gsap.to(h.querySelector('.hero-content'), { y: -120, ease: 'none', scrollTrigger: { trigger: h, start: 'top top', end: 'bottom top', scrub: true } });
        gsap.to(h.querySelector('.hero-object'), { y: -200, x: -80, ease: 'none', scrollTrigger: { trigger: h, start: 'top top', end: 'bottom top', scrub: true } });
    });

    // Text reveals
    gsap.utils.toArray('.reveal-line-inner').forEach(el => {
        gsap.to(el, { y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el.closest('.reveal-line'), start: 'top 90%', toggleActions: 'play none none none' } });
    });

    // About line draw
    gsap.to('#aboutLine', { width: '100%', duration: 1.5, ease: 'power2.out', scrollTrigger: { trigger: '#aboutLine', start: 'top 85%', toggleActions: 'play none none none' } });

    // Stat counters
    document.querySelectorAll('.stat-item').forEach(item => {
        const target = parseInt(item.dataset.target);
        const numEl = item.querySelector('.stat-num');
        ScrollTrigger.create({ trigger: item, start: 'top 88%', once: true, onEnter: () => {
            gsap.to({ val: 0 }, { val: target, duration: 1.8, ease: 'power2.out', onUpdate: function(){ numEl.textContent = Math.round(this.targets()[0].val) + '+'; } });
        }});
    });

    // ---- APPROACH STICKY ----
    const steps = gsap.utils.toArray('.approach-step');
    const stepNum = document.getElementById('stepNumber');

    if(steps.length > 1){
        // Hide steps after first initially
        steps.forEach((s, i) => { if(i > 0) gsap.set(s, { y: 60, opacity: 0 }); });
        
        if(document.querySelector('.approach-wrapper')){
            const aTl = gsap.timeline({
                scrollTrigger: { trigger: '.approach-wrapper', start: 'top top', end: 'bottom bottom', scrub: true }
            });
        
            for(let i = 1; i < steps.length; i++){
                const pos = (i - 1) / (steps.length - 1);
                aTl.to(steps[i-1], { y: -50, opacity: 0, duration: 0.25, ease: 'none' }, pos);
                if(stepNum) {
                    aTl.to(stepNum, { opacity: 0, y: -15, duration: 0.08, ease: 'none' }, pos);
                    const label = 'nc' + i;
                    aTl.addLabel(label, pos + 0.1);
                    aTl.set(stepNum, { textContent: '0' + (i+1) }, label);
                    aTl.to(stepNum, { opacity: 1, y: 0, duration: 0.08, ease: 'none' }, label);
                }
                aTl.to(steps[i], { y: 0, opacity: 1, duration: 0.25, ease: 'none' }, pos + 0.1);
            }
        }
    }

    // ---- HORIZONTAL SCROLL WORK ----
    const workTrack = document.querySelector('.work-track');
    if(workTrack){
        const tween = gsap.to(workTrack, { x: () => -(workTrack.scrollWidth - window.innerWidth + window.innerWidth * 0.1), ease: 'none' });
        ScrollTrigger.create({ 
            trigger: '.work-wrapper', 
            start: 'top top', 
            end: 'bottom bottom',
            animation: tween, 
            scrub: true, 
            invalidateOnRefresh: true 
        });
    }

    // ---- TECH BARS ----
    document.querySelectorAll('.tech-item').forEach((item, i) => {
        const level = item.dataset.level;
        const fill = item.querySelector('.tech-bar-fill');
        ScrollTrigger.create({ trigger: item, start: 'top 90%', once: true, onEnter: () => {
            setTimeout(() => { fill.style.width = level + '%'; }, i * 60);
        }});
    });

    // ---- TIMELINE FILL ----
    const timelineSection = document.getElementById('timelineSection');
    const timelineFill = document.getElementById('timelineFill');
    const timelineDots = document.querySelectorAll('.timeline-dot');
    
    gsap.to(timelineFill, {
        height: '100%',
        ease: 'none',
        scrollTrigger: { trigger: timelineSection, start: 'top 60%', end: 'bottom 60%', scrub: true }
    });
    
    // Activate dots on scroll
    timelineDots.forEach((dot, i) => {
        ScrollTrigger.create({ trigger: dot.closest('.timeline-entry'), start: 'top 60%', onEnter: () => dot.classList.add('active'), onLeaveBack: () => dot.classList.remove('active') });
    });

    // ---- EXPERIENCE ENTRIES FADE ----
    gsap.utils.toArray('.timeline-entry').forEach((entry, i) => {
        gsap.from(entry, { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: entry, start: 'top 88%', toggleActions: 'play none none none' }, delay: i * 0.1 });
    });

    // ---- CTA SCALE ----
    gsap.to('.cta-text', { scale: 0.88, opacity: 0.35, ease: 'none', scrollTrigger: { trigger: '#contact', start: 'top bottom', end: 'bottom top', scrub: true } });

    // ==================== PROJECT OVERLAY LOGIC ====================
    const projectsData = [
        {
            title: "Guida Turistica App", category: "Web / Presentazione", desc: "<div class='text-sm md:text-base leading-relaxed'><p class='mb-4'>Una web app moderna, sviluppata in HTML, CSS e JavaScript Vanilla, pensata per arricchire l'esperienza dei turisti durante i tour guidati. L'accesso è riservato e protetto da username e password.</p><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Multilingua & Home Page</h4><p class='mb-4'>L'interfaccia principale permette agli utenti di selezionare la propria lingua, offrendo un'esperienza su misura per turisti internazionali, con un design pulito e contemporaneo.</p><img src='assets/projects/tour-guide/home.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Home Multilingua' loading='lazy'><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Pagine delle Attrazioni & Audio</h4><p class='mb-4'>Ogni attrazione ha una sua pagina dedicata con immagini specifiche e testi approfonditi. Inoltre, include tracce audio che possono essere riprodotte direttamente online o scaricate sul dispositivo per l'ascolto offline.</p><img src='assets/projects/tour-guide/attrazione.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Pagina Attrazione' loading='lazy'><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Documentazione PDF</h4><p class='mb-4'>Per chi preferisce leggere l'intero itinerario o stamparlo, l'applicazione genera e mette a disposizione un PDF completo, impaginato professionalmente, scaricabile con un clic.</p><img src='assets/projects/tour-guide/pdfDowload.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Download PDF' loading='lazy'></div>", role: "Frontend Developer", year: "2023", link: "#", hero: "assets/projects/tour-guide/cover.png", tags: ["HTML", "CSS", "JavaScript"], gallery: []
        },
        {
            title: "Gestione Lavori Venezia", category: "iOS / Web App", desc: "<div class='text-sm md:text-base leading-relaxed'><p class='mb-4'>Applicazione logistica gestionale strutturata come 'whitelabel': ogni ditta (es. smaltimento rifiuti, consegne, ritiri) può avere la propria app personalizzata mantenendo i propri dati al sicuro e isolati. L'accesso è doppiamente protetto tramite credenziali standard e <strong>scansione biometrica</strong> (Face ID / Touch ID). Progettata inizialmente per la complessa viabilità dei canali di Venezia, la sua architettura è scalabile in tutto il mondo.</p><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Architettura & Database</h4><p class='mb-4'>L'intero ecosistema si appoggia su <strong>Supabase</strong>, assicurando sincronizzazione immediata e sicura di codici CER, informazioni sui cantieri e foto allegate.</p><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Mappa Geospaziale (MapKit JS)</h4><p class='mb-4'>Il cuore dell'app è la mappa interattiva nativa in <strong>Swift</strong> basata su <strong>MapKit</strong>. Offre il tracciamento live degli operatori e il passaggio fluido tra viste (Standard, Satellite, 3D Satellite) per individuare ormeggi e lavori con precisione.</p><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Flusso Operativo</h4><p class='mb-4'>Include una dashboard giornaliera legata al calendario. Cliccando un'etichetta sulla mappa si apre una bacheca con tutte le info e foto allegate. È integrato un registro completo dei codici CER con ricerca rapida.</p><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Automazione & Import Excel</h4><p class='mb-4'>Per accelerare le assegnazioni, un tool importa i file Excel e <strong>geolocalizza automaticamente i lavori in base a sestiere e civico</strong>.</p><img src='assets/projects/venezia-app/esempioExcelToImport.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Esempio Tabella Excel' loading='lazy'></div>", role: "Lead Developer (Swift)", year: "2024", link: "#", hero: "assets/projects/venezia-app/newCover.png", tags: ["Swift", "MapKit JS", "Supabase", "iOS"], gallery: ["assets/projects/venezia-app/0Cover.png","assets/projects/venezia-app/mappa1.png","assets/projects/venezia-app/mappa2.png","assets/projects/venezia-app/mappa3.png","assets/projects/venezia-app/mappa4.png","assets/projects/venezia-app/facciataProgramma5.png","assets/projects/venezia-app/facciataCodiciCER6.png","assets/projects/venezia-app/FacciataImportExcel7.png","assets/projects/venezia-app/supabase.png"]
        },
        {
            title: "Vecchio Portfolio", category: "Web / Portfolio", desc: "Il mio precedente portfolio personale, sviluppato nativamente in HTML, CSS e JavaScript. Il sito è ospitato su GitHub Pages e integra Firebase per la gestione completa dell'autenticazione, permettendo un sistema di login tramite account Google, email classica o numero di telefono. Il sito include diverse sezioni funzionali mostrate nella galleria: dalla Home (1), alla gestione dinamica degli Appunti (2), l'interfaccia di Login sicura (3), una bacheca per le Certificazioni (4), l'archivio dei Progetti (5), per concludersi con una 'Sezione Nerd' (6) dedicata alle passioni più tecniche.", role: "Frontend Developer", year: "2021", link: "#", hero: "assets/projects/old-portfolio/cover.png", tags: ["HTML", "CSS", "JS", "Firebase", "GitHub"], gallery: ["assets/projects/old-portfolio/01-home.png","assets/projects/old-portfolio/02-appunti.png","assets/projects/old-portfolio/03-login.png","assets/projects/old-portfolio/04-certificazioni.png","assets/projects/old-portfolio/05-progetti.png","assets/projects/old-portfolio/06-sezione-nerd.png"]
        },
        {
            title: "Matrix VoIP Network", category: "DevOps / Networking", desc: "<div class='text-sm md:text-base leading-relaxed'><p class='mb-4'>Progettazione e implementazione di un'infrastruttura di comunicazione e messaggistica privata ad alta sicurezza. Un ecosistema decentralizzato e indipendente che garantisce il controllo totale sui propri dati.</p><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Virtualizzazione (Docker)</h4><p class='mb-4'>L'intero ecosistema è containerizzato tramite <strong>Docker</strong>, permettendo di avviare, gestire e aggiornare i servizi (tra cui il server Matrix e il PBX VoIP) in ambienti isolati. L'orchestrazione è supportata da script di automazione (<code>.command</code>) che semplificano il deploy e la manutenzione.</p><img src='assets/projects/matrix-voip/docker.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Configurazione Docker' loading='lazy'><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Sicurezza & Tunneling (Tailscale)</h4><p class='mb-4'>Per esporre i servizi in totale sicurezza, ho implementato una rete virtuale privata mesh utilizzando <strong>Tailscale</strong>. In questo modo i server comunicano tramite IP privati isolati, rendendo l'infrastruttura invisibile e inaccessibile dall'esterno se non tramite il tunnel crittografato.</p><img src='assets/projects/matrix-voip/tailscale.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Rete Privata Tailscale' loading='lazy'><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Messaggistica Sovrana (Matrix & Element)</h4><p class='mb-4'>Svincolandosi dai server pubblici, il sistema utilizza il dominio personale <strong>mattiascarpa.it</strong> come nodo Matrix proprietario. Sfruttando il client <strong>Element</strong>, il setup offre un ambiente di chat crittografata end-to-end senza alcun tracciamento di terze parti.</p><img src='assets/projects/matrix-voip/Element.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Client Chat Element' loading='lazy'></div>", role: "DevOps Engineer", year: "2023", link: "#", hero: "assets/projects/matrix-voip/cover.png", tags: ["Docker", "Matrix", "Tailscale", "Element"], gallery: []
        },
        {
            title: "Sito Personale Alpha", category: "Web / Personale", desc: "Primo di due progetti personali sviluppati con l'intento di spingere al limite le mie conoscenze frontend. Questo sito funge da sandbox per testare approcci headless, integrazione con CMS moderni e l'uso avanzato di utility-first CSS come Tailwind. È il banco di prova per i componenti che poi riutilizzo nei progetti dei clienti.", role: "Creator", year: "2022", link: "#", hero: "project_placeholder.png", tags: ["React", "Tailwind"], gallery: ["project_placeholder.png","project_placeholder.png"]
        },
        {
            title: "Sito Personale Beta", category: "Web / Personale", desc: "Progetto web sperimentale focalizzato esclusivamente sul lato estetico e interattivo. L'obiettivo era padroneggiare la libreria GSAP e testare layout asimmetrici, transizioni pagina complesse e rendering a 60fps costanti sfruttando l'architettura di Next.js.", role: "Creative Developer", year: "2024", link: "#", hero: "project_placeholder.png", tags: ["Next.js", "GSAP"], gallery: ["project_placeholder.png","project_placeholder.png"]
        }
    ];

    const overlay = document.getElementById('projectOverlay');
    const closeBtn = document.getElementById('closeOverlayBtn');
    const overlayScrollArea = document.getElementById('overlayScrollArea');
    let overlayLenis;
    let overlayRafId;

    function rafOverlay(time) {
        if(overlayLenis) {
            overlayLenis.raf(time);
            overlayRafId = requestAnimationFrame(rafOverlay);
        }
    }

    function initOverlayLenis() {
        if(overlayRafId) cancelAnimationFrame(overlayRafId);
        if(overlayLenis) overlayLenis.destroy();
        overlayLenis = new Lenis({
            wrapper: overlayScrollArea,
            content: overlayScrollArea.querySelector('.overlay-lenis-content'),
            lerp: 0.04,
            smoothWheel: true,
            smoothTouch: true,
            syncTouch: false,
            touchMultiplier: 1,
            touchInertiaMultiplier: 1
        });
        overlayRafId = requestAnimationFrame(rafOverlay);
    }

    const wCards = document.querySelectorAll('.work-card');
    wCards.forEach((card, index) => {
        card.style.pointerEvents = 'auto';
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevent anything else from catching it
            
            try {
                const data = projectsData[index];
                if(!data) return;
                
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
                data.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.className = 'text-[10px] tracking-[0.15em] uppercase text-text-sec border border-white/15 px-4 py-1.5 rounded-full';
                    span.textContent = tag;
                    tagsContainer.appendChild(span);
                });
                
                const galleryContainer = document.getElementById('overlayGallery');
                const gallerySection = document.getElementById('gallerySection');
                galleryContainer.innerHTML = '';
                
                if (data.gallery && data.gallery.length > 0) {
                    if(gallerySection) gallerySection.style.display = 'block';
                    data.gallery.forEach(imgSrc => {
                        const img = document.createElement('img');
                        img.src = imgSrc;
                        img.className = 'w-full h-auto object-contain rounded-lg bg-white/5 cursor-pointer hover:opacity-80 transition-opacity lightbox-image';
                        img.loading = 'lazy';
                        galleryContainer.appendChild(img);
                    });
                } else {
                    if(gallerySection) gallerySection.style.display = 'none';
                }

                lenisInstance.stop();
                gsap.set(overlay, { display: 'flex', yPercent: 100 });
                overlayScrollArea.scrollTop = 0;
                gsap.to(overlay, { 
                    yPercent: 0, 
                    duration: 0.8, 
                    ease: 'power4.out',
                    onComplete: () => {
                        initOverlayLenis(); 
                    }
                });
                
                if (typeof techCursor !== 'undefined' && techCursor) {
                    techCursor.style.opacity = '0';
                    document.body.style.cursor = 'auto';
                }
            } catch(err) {
                alert("Errore JS durante apertura: " + err.message);
            }
        });
    });

    if(closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if(overlayRafId) cancelAnimationFrame(overlayRafId);
            if(overlayLenis) {
                overlayLenis.destroy();
                overlayLenis = null;
            }
            gsap.to(overlay, { 
                yPercent: 100, 
                duration: 0.7, 
                ease: 'power3.inOut',
                onComplete: () => {
                    gsap.set(overlay, { display: 'none' });
                    lenisInstance.start();
                    if (typeof techCursor !== 'undefined' && techCursor) {
                        techCursor.style.opacity = '1';
                        if(!('ontouchstart' in window)) document.body.style.cursor = 'none';
                    }
                }
            });
        });
    }
}

// ==================== LIGHTBOX ====================
const globalLightbox = document.getElementById('globalLightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeLightboxBtn = document.getElementById('closeLightboxBtn');
let isLightboxOpen = false;

function openLightbox(src) {
    if(!globalLightbox || !lightboxImg) return;
    isLightboxOpen = true;
    lightboxImg.src = src;
    
    // Mostra il lightbox
    globalLightbox.classList.remove('pointer-events-none');
    
    gsap.to(globalLightbox, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    gsap.to(lightboxImg, { scale: 1, duration: 0.5, ease: 'back.out(1.2)' });
}

function closeLightbox() {
    if(!globalLightbox || !isLightboxOpen) return;
    isLightboxOpen = false;
    
    gsap.to(globalLightbox, { opacity: 0, duration: 0.3, ease: 'power2.inOut', onComplete: () => {
        globalLightbox.classList.add('pointer-events-none');
        lightboxImg.src = '';
    }});
    gsap.to(lightboxImg, { scale: 0.95, duration: 0.3, ease: 'power2.inOut' });
}

// Event delegation per intercettare i click sulle immagini del progetto
const projectOverlay = document.getElementById('projectOverlay');
if (projectOverlay) {
    projectOverlay.addEventListener('click', (e) => {
        // Se clicco su un'immagine della galleria o del testo descrittivo (inline)
        if (e.target.tagName === 'IMG' && (e.target.closest('#overlayGallery') || e.target.classList.contains('lightbox-image'))) {
            openLightbox(e.target.src);
        }
    });
    
    // Gestione cursore per elementi dinamici
    projectOverlay.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'IMG' && (e.target.closest('#overlayGallery') || e.target.classList.contains('lightbox-image'))) {
            if(typeof techCursor !== 'undefined' && techCursor) techCursor.classList.add('hovering');
        }
    });
    projectOverlay.addEventListener('mouseout', (e) => {
        if (e.target.tagName === 'IMG' && (e.target.closest('#overlayGallery') || e.target.classList.contains('lightbox-image'))) {
            if(typeof techCursor !== 'undefined' && techCursor) techCursor.classList.remove('hovering');
        }
    });
}

// Chiusura lightbox
if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
if (globalLightbox) globalLightbox.addEventListener('click', (e) => {
    // Chiudi se clicco fuori dall'immagine o sfondo
    if(e.target === globalLightbox || e.target.classList.contains('lightbox-content-wrapper')) {
        closeLightbox();
    }
});

// Chiudi con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isLightboxOpen) closeLightbox();
});
