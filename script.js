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
            // Close language menu if open
            const langMenu = document.getElementById('langMenu');
            if (langMenu && langMenu.classList.contains('open')) {
                langMenu.classList.remove('open');
                const lBtn = document.getElementById('langToggleBtn');
                if (lBtn) lBtn.setAttribute('aria-expanded', 'false');
            }

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

// ==================== 1B. MULTI-LANGUAGE TRANSLATION ENGINE ====================
const TRANSLATIONS = {
    it: {
        nav_about: "About",
        nav_approach: "Approach",
        nav_work: "Work",
        nav_skills: "Skills",
        nav_experience: "Experience",
        nav_contact: "Contact",
        theme_menu_header: "Tonalità di Colore",
        theme_btn_text: "Palette",
        lang_select_title: "Seleziona Lingua",
        mobile_theme_title: "Tonalità di Colore",
        mobile_lang_title: "Lingua",
        hero_badge: "Full-Stack & IT Systems Specialist • Venice, IT",
        hero_roles: [
            'Full-Stack Developer',
            'Creative Technologist',
            'Ingegnere iOS & Swift',
            'Specialista IT & DevOps'
        ],
        hero_subtitle: "Developer &bull; Creative Technologist &bull; Based in Venice, Italy",
        hero_scroll: "Scroll",
        about_label: "( About )",
        about_line_1: "Realizzo siti web e applicazioni al confine tra",
        about_line_2: "ingegneria solida e design ricercato.",
        about_line_3: "Con oltre 5 anni di esperienza, la mia visione va",
        about_line_4: "oltre la scrittura del codice: guido i clienti dal concept",
        about_line_5: "al rilascio e coordino l'intero comparto operativo e",
        about_line_6: "gestionale IT, offrendo soluzioni digitali complete",
        about_line_7: "ed end-to-end pronte per il mercato.",
        stat_years: "Anni di Esperienza",
        stat_projects: "Progetti Rilasciati",
        stat_tech: "Tech Stack",
        approach_label: "( How I Work )",
        approach_s1_title: "Understand",
        approach_s1_desc: "Ogni grande prodotto nasce da una comprensione profonda. Analizzo requisiti, esigenze degli utenti e vincoli tecnici per tracciare la strada ideale.",
        approach_s2_title: "Architect",
        approach_s2_desc: "Un'architettura pulita è il fondamento del software scalabile. Progetto sistemi manutenibili, testabili e pronti ad evolvere nel tempo.",
        approach_s3_title: "Build",
        approach_s3_desc: "Scrivere codice è artigianato digitale. Ogni riga è intenzionale: performante, accessibile e manutenibile, utilizzando strumenti moderni.",
        approach_s4_title: "Refine",
        approach_s4_desc: "L'ultimo 10% fa tutta la differenza. Ottimizzo le performance, rifinisco le micro-interazioni e curo ogni minimo dettaglio prima del rilascio.",
        work_label: "( Selected Work )",
        work_title: "Featured Projects",
        work_toggle_all: "Mostra tutti (6)",
        work_toggle_less: "Mostra meno",
        skills_label: "( Tech Stack )",
        skills_title: "Skills & Tools",
        skills_bento1_title: "Frontend & Mobile",
        skills_bento1_sub: "Client-Side Engineering",
        skills_bento1_react_desc: "Sviluppo di SPA/SSR ad alte prestazioni, App Router, State Management reattivo e ottimizzazione Core Web Vitals.",
        skills_bento1_swift_desc: "Sviluppo iOS nativo, gestione mappe geospaziali complesse con viste vettoriali/satellitari e scansione biometrica (Face ID).",
        skills_bento1_ui_desc: "Design system atomici, CSS performante zero-runtime, micro-animazioni fluide a 60fps con GSAP e accessibilità.",
        skills_bento2_title: "Backend & Data",
        skills_bento2_sub: "Storage, API & Cloud BaaS",
        skills_bento2_supa_desc: "Modellazione schemi relazionali, politiche di sicurezza Row-Level Security (RLS), trigger e sincronizzazione real-time.",
        skills_bento2_node_desc: "Microservizi asincroni, REST API e automazione di parser per importazione e geocodifica di dataset complessi (Excel/JSON).",
        skills_bento2_php_desc: "Architettura MVC, gestione middleware, routing avanzato e persistenza con Eloquent ORM.",
        skills_bento3_title: "Enterprise IT & Virtualization",
        skills_bento3_sub: "Infrastructure & Security",
        skills_bento3_vmware_desc: "Deploy e gestione hypervisor bare-metal, configurazione VM, isolamento reti vSwitch e piani di continuità operativa.",
        skills_bento3_mail_desc: "Protezione perimetrale della posta (anti-phishing, spoofing, policy SPF/DKIM/DMARC) e archiviazione forense a norma.",
        skills_bento4_title: "DevOps, Mesh & AI",
        skills_bento4_sub: "Containers, Networking & Tools",
        skills_bento4_docker_desc: "Scrittura Dockerfile e configurazioni multi-container per isolare nodi applicativi, PBX VoIP e deploy automatizzato tramite script.",
        skills_bento4_tail_desc: "Reti private cifrate point-to-point (WireGuard), tunneling zero-trust e routing sicuro senza porte pubbliche esposte.",
        skills_bento4_ai_desc: "Integrazione modelli LLM (Anthropic Claude API), prompt engineering avanzato, Git/GitHub CI-CD e prototipazione UI/UX.",
        certs_label: "( Credentials )",
        certs_title: "Certificazioni & Attestati",
        certs_sub: "Verified Credentials",
        certs_anthropic_title: "Anthropic AI & Claude Certificates",
        certs_anthropic_desc: "Attestati ufficiali sullo sviluppo di soluzioni AI, prompt engineering e integrazione dei modelli di Anthropic.",
        certs_hackerrank_title: "HackerRank Skill Certifications",
        certs_hackerrank_desc: "Valutazioni ufficiali sulle competenze tecniche di programmazione in JavaScript, CSS3 e Python.",
        certs_aulab_title: "Aulab Hackademy Attestati",
        certs_aulab_desc: "Attestati di completamento e specializzazione nel percorso Full-Stack Web Development.",
        certs_coursera_title: "Coursera Project Certificate",
        certs_coursera_desc: "Certificazione di progetto pratico autorizzata da Coursera Project Network per lo sviluppo su WordPress.",
        certs_view_pdf: "Vedi PDF",
        certs_cert_1: "Attestato I",
        certs_cert_2: "Attestato II",
        experience_label: "( Experience )",
        experience_title: "Where I've Worked",
        experience_toggle_all: "Mostra tutte le esperienze (4)",
        experience_toggle_less: "Mostra meno",
        exp_1_role: "IT specialist",
        exp_1_desc: "Progettazione e deploy dell'infrastruttura IT end-to-end per una nave da trasporto marittimo. Creazione da zero di reti server ad alta affidabilità per un ambiente complesso e isolato.",
        exp_2_role: "Freelance Frontend Developer",
        exp_2_desc: "Progettazione e sviluppo di una web app su misura per un'attività di guide turistiche a Venezia. Gestione del ciclo frontend completo: design reattivo, performance elevate e audio offline.",
        exp_3_role: "E-Waste Logistics & Internal Developer",
        exp_3_desc: "Gestione logistica marittima per lo smaltimento di rifiuti tecnologici nei canali di Venezia. Ho progettato e sviluppato un'applicazione geospaziale con database per tracciare i cantieri e ottimizzare i flussi interni.",
        exp_4_role: "Digitalization & Data Management",
        exp_4_desc: "Digitalizzazione e catalogazione di manoscritti storici e migrazione nei sistemi archivistici bibliotecari. Questa esperienza ha consolidato solide basi nella gestione di banche dati e precisione archivistica.",
        cta_label: "( Get In Touch )",
        cta_line_1: "LET'S BUILD",
        cta_line_2: "SOMETHING",
        cta_line_3: "TOGETHER",
        footer_rights: "Designed & Developed by Mattia Scarpa",
        footer_back_top: "Torna su",
        retro_toggle_text: "Modalità 1995",
        modal_project_title: "Il Progetto",
        modal_role: "Ruolo",
        modal_year: "Anno",
        modal_link: "Link",
        modal_visit: "Visita il sito live",
        modal_gallery: "Galleria"
    },
    en: {
        nav_about: "About",
        nav_approach: "Approach",
        nav_work: "Work",
        nav_skills: "Skills",
        nav_experience: "Experience",
        nav_contact: "Contact",
        theme_menu_header: "Color Palette",
        theme_btn_text: "Palette",
        lang_select_title: "Select Language",
        mobile_theme_title: "Color Palette",
        mobile_lang_title: "Language",
        hero_badge: "Full-Stack & IT Systems Specialist • Venice, IT",
        hero_roles: [
            'Full-Stack Developer',
            'Creative Technologist',
            'iOS & Swift Engineer',
            'IT Systems & DevOps Specialist'
        ],
        hero_subtitle: "Developer &bull; Creative Technologist &bull; Based in Venice, Italy",
        hero_scroll: "Scroll",
        about_label: "( About )",
        about_line_1: "I build websites and applications that sit at the",
        about_line_2: "intersection of clean engineering and thoughtful design.",
        about_line_3: "With 5+ years of experience, my focus goes",
        about_line_4: "beyond writing code: I guide clients from concept",
        about_line_5: "to launch and oversee the entire operational and",
        about_line_6: "managerial side of the IT department, delivering",
        about_line_7: "comprehensive, end-to-end digital solutions.",
        stat_years: "Years Experience",
        stat_projects: "Projects Shipped",
        stat_tech: "Tech Stack",
        approach_label: "( How I Work )",
        approach_s1_title: "Understand",
        approach_s1_desc: "Every great product starts with deep understanding. I dive into requirements, user needs, and technical constraints to map the optimal path forward.",
        approach_s2_title: "Architect",
        approach_s2_desc: "Clean architecture is the foundation of scalable software. I design systems that are maintainable, testable, and built to evolve with your product.",
        approach_s3_title: "Build",
        approach_s3_desc: "Writing code is craftsmanship. Every line is intentional — performant, accessible, and maintainable. I build with modern tools and proven patterns.",
        approach_s4_title: "Refine",
        approach_s4_desc: "The last 10% makes all the difference. I optimize performance, polish interactions, and ensure every detail meets the highest standard before delivery.",
        work_label: "( Selected Work )",
        work_title: "Featured Projects",
        work_toggle_all: "Show all (6)",
        work_toggle_less: "Show less",
        skills_label: "( Tech Stack )",
        skills_title: "Skills & Tools",
        skills_bento1_title: "Frontend & Mobile",
        skills_bento1_sub: "Client-Side Engineering",
        skills_bento1_react_desc: "High-performance SPA/SSR development, Next.js App Router, reactive state management, and Core Web Vitals optimization.",
        skills_bento1_swift_desc: "Native iOS development, complex geospatial map integration with vector/satellite views, and biometric authentication (Face ID).",
        skills_bento1_ui_desc: "Atomic design systems, high-performance zero-runtime CSS, smooth 60fps micro-interactions with GSAP, and accessibility.",
        skills_bento2_title: "Backend & Data",
        skills_bento2_sub: "Storage, API & Cloud BaaS",
        skills_bento2_supa_desc: "Relational schema modeling, Row-Level Security (RLS) policies, database triggers, and real-time data sync.",
        skills_bento2_node_desc: "Asynchronous microservices, REST APIs, and automated parsing tools for importing and geocoding complex datasets.",
        skills_bento2_php_desc: "MVC architecture, middleware handling, advanced routing, and database persistence with Eloquent ORM.",
        skills_bento3_title: "Enterprise IT & Virtualization",
        skills_bento3_sub: "Infrastructure & Security",
        skills_bento3_vmware_desc: "Bare-metal hypervisor deployment, VM provisioning, isolated vSwitch networking, and business continuity planning.",
        skills_bento3_mail_desc: "Perimeter email security (anti-phishing, anti-spoofing, SPF/DKIM/DMARC enforcement) and legally compliant email archiving.",
        skills_bento4_title: "DevOps, Mesh & AI",
        skills_bento4_sub: "Containers, Networking & Tools",
        skills_bento4_docker_desc: "Dockerfile authoring, multi-container stacks for isolated application nodes, PBX VoIP, and automated shell deployment scripts.",
        skills_bento4_tail_desc: "Encrypted point-to-point mesh networks (WireGuard), zero-trust tunneling, and secure private routing without open public ports.",
        skills_bento4_ai_desc: "LLM integration (Anthropic Claude API), advanced prompt engineering, Git/GitHub CI-CD workflows, and UI/UX prototyping.",
        certs_label: "( Credentials )",
        certs_title: "Certifications & Credentials",
        certs_sub: "Verified Credentials",
        certs_anthropic_title: "Anthropic AI & Claude Certificates",
        certs_anthropic_desc: "Official credentials in AI application development, advanced prompt engineering, and Anthropic model integration.",
        certs_hackerrank_title: "HackerRank Skill Certifications",
        certs_hackerrank_desc: "Official assessments and validated skills in JavaScript, CSS3, and Python programming.",
        certs_aulab_title: "Aulab Hackademy Certificates",
        certs_aulab_desc: "Certificates of completion and specialization in Full-Stack Web Development.",
        certs_coursera_title: "Coursera Project Certificate",
        certs_coursera_desc: "Hands-on project certification authorized by Coursera Project Network for WordPress development.",
        certs_view_pdf: "View PDF",
        certs_cert_1: "Certificate I",
        certs_cert_2: "Certificate II",
        experience_label: "( Experience )",
        experience_title: "Where I've Worked",
        experience_toggle_all: "Show all experiences (4)",
        experience_toggle_less: "Show less",
        exp_1_role: "IT Specialist",
        exp_1_desc: "Designed and deployed the end-to-end IT infrastructure for a maritime vessel. Built robust server networks from scratch and engineered high-availability networking solutions tailored for a complex, isolated environment.",
        exp_2_role: "Freelance Frontend Developer",
        exp_2_desc: "Designed and developed a custom website for a local tour guide business in Venice. Managed the complete frontend lifecycle, focusing on responsive design, performance optimization, and translating real client requirements into an engaging digital experience.",
        exp_3_role: "E-Waste Logistics & Internal Developer",
        exp_3_desc: "Managed maritime logistics for technological waste disposal across Venice, overseeing the entire lifecycle from client collection to mainland processing centers. Combining this operational insight with my tech skills, I independently designed and developed a database-driven map application to track jobs and streamline internal workflows.",
        exp_4_role: "Digitalization & Data Management",
        exp_4_desc: "Managed the digital transition of historical manuscripts by cataloging physical assets and migrating them into complex library management systems. This early experience built a strong foundation in database management, digital archiving, and organizational precision.",
        cta_label: "( Get In Touch )",
        cta_line_1: "LET'S BUILD",
        cta_line_2: "SOMETHING",
        cta_line_3: "TOGETHER",
        footer_rights: "Designed & Developed by Mattia Scarpa",
        footer_back_top: "Back to top",
        retro_toggle_text: "1995 Mode",
        modal_project_title: "The Project",
        modal_role: "Role",
        modal_year: "Year",
        modal_link: "Link",
        modal_visit: "Visit live website",
        modal_gallery: "Gallery"
    },
    es: {
        nav_about: "Sobre mí",
        nav_approach: "Método",
        nav_work: "Proyectos",
        nav_skills: "Habilidades",
        nav_experience: "Experiencia",
        nav_contact: "Contacto",
        theme_menu_header: "Paleta de Colores",
        theme_btn_text: "Paleta",
        lang_select_title: "Seleccionar Idioma",
        mobile_theme_title: "Paleta de Colores",
        mobile_lang_title: "Idioma",
        hero_badge: "Especialista Full-Stack y Sistemas IT • Venecia, IT",
        hero_roles: [
            'Desarrollador Full-Stack',
            'Tecnólogo Creativo',
            'Ingeniero iOS y Swift',
            'Especialista IT y DevOps'
        ],
        hero_subtitle: "Desarrollador &bull; Tecnólogo Creativo &bull; Basado en Venecia, Italia",
        hero_scroll: "Desplazar",
        about_label: "( Sobre mí )",
        about_line_1: "Desarrollo sitios web y aplicaciones en la",
        about_line_2: "intersección entre ingeniería limpia y diseño reflexivo.",
        about_line_3: "Con más de 5 años de experiencia, mi enfoque va",
        about_line_4: "más allá de escribir código: guío a los clientes desde",
        about_line_5: "el concepto al lanzamiento y coordino la gestión operativa",
        about_line_6: "del departamento IT, brindando soluciones digitales",
        about_line_7: "integrales y escalables de extremo a extremo.",
        stat_years: "Años de Experiencia",
        stat_projects: "Proyectos Entregados",
        stat_tech: "Stack Tecnológico",
        approach_label: "( Mi Método )",
        approach_s1_title: "Comprender",
        approach_s1_desc: "Cada gran producto comienza con una comprensión profunda. Analizo requerimientos, necesidades de usuario y restricciones técnicas para trazar el camino óptimo.",
        approach_s2_title: "Arquitectura",
        approach_s2_desc: "Una arquitectura limpia es la base de un software escalable. Diseño sistemas mantenibles, testeables y preparados para evolucionar con su producto.",
        approach_s3_title: "Construir",
        approach_s3_desc: "Escribir código es artesanía digital. Cada línea es intencional: de alto rendimiento, accesible y mantenible, utilizando herramientas modernas.",
        approach_s4_title: "Perfeccionar",
        approach_s4_desc: "El último 10% marca toda la diferencia. Optimizo el rendimiento, pulo las interacciones y cuido cada detalle antes del lanzamiento.",
        work_label: "( Proyectos Seleccionados )",
        work_title: "Proyectos Destacados",
        work_toggle_all: "Mostrar todos (6)",
        work_toggle_less: "Mostrar menos",
        skills_label: "( Stack Tecnológico )",
        skills_title: "Habilidades & Herramientas",
        skills_bento1_title: "Frontend & Mobile",
        skills_bento1_sub: "Ingeniería Client-Side",
        skills_bento1_react_desc: "Desarrollo de SPA/SSR de alto rendimiento, App Router, gestión de estado reactiva y optimización de Core Web Vitals.",
        skills_bento1_swift_desc: "Desarrollo nativo para iOS, mapas geoespaciales complejos con vistas vectoriales/satelitales y autenticación biométrica (Face ID).",
        skills_bento1_ui_desc: "Sistemas de diseño atómico, CSS de alto rendimiento zero-runtime, microanimaciones fluidas a 60fps con GSAP y accesibilidad.",
        skills_bento2_title: "Backend & Datos",
        skills_bento2_sub: "Almacenamiento, API & Cloud BaaS",
        skills_bento2_supa_desc: "Modelado de esquemas relacionales, políticas Row-Level Security (RLS), disparadores y sincronización en tiempo real.",
        skills_bento2_node_desc: "Microservicios asíncronos, APIs REST y herramientas automáticas para importación y geocodificación de datos complejos (Excel/JSON).",
        skills_bento2_php_desc: "Arquitectura MVC, gestión de middleware, enrutamiento avanzado y persistencia con Eloquent ORM.",
        skills_bento3_title: "IT Empresarial & Virtualización",
        skills_bento3_sub: "Infraestructura & Seguridad",
        skills_bento3_vmware_desc: "Despliegue y gestión de hipervisores bare-metal, configuración de VMs, redes vSwitch aisladas y planes de contingencia operativa.",
        skills_bento3_mail_desc: "Seguridad perimetral del correo (antiphishing, antispoofing, directivas SPF/DKIM/DMARC) y archivado forense normativo.",
        skills_bento4_title: "DevOps, Mesh & IA",
        skills_bento4_sub: "Contenedores, Redes & Herramientas",
        skills_bento4_docker_desc: "Creación de Dockerfiles y pilas multi-contenedor para aislar aplicaciones y PBX VoIP, y despliegue automatizado con scripts.",
        skills_bento4_tail_desc: "Redes privadas cifradas punto a punto (WireGuard), túneles zero-trust y enrutamiento seguro sin puertos públicos abiertos.",
        skills_bento4_ai_desc: "Integración de modelos LLM (Anthropic Claude API), ingeniería de prompts avanzada, flujos CI/CD en Git/GitHub y prototipado UI/UX.",
        certs_label: "( Credenciales )",
        certs_title: "Certificaciones y Títulos",
        certs_sub: "Credenciales Verificadas",
        certs_anthropic_title: "Certificados Anthropic AI y Claude",
        certs_anthropic_desc: "Certificados oficiales sobre desarrollo de soluciones de IA, ingeniería de prompts e integración de modelos de Anthropic.",
        certs_hackerrank_title: "Certificaciones HackerRank",
        certs_hackerrank_desc: "Evaluaciones oficiales y competencias técnicas validadas en programación JavaScript, CSS3 y Python.",
        certs_aulab_title: "Certificados Aulab Hackademy",
        certs_aulab_desc: "Certificados de finalización y especialización en Desarrollo Web Full-Stack.",
        certs_coursera_title: "Certificado de Proyecto Coursera",
        certs_coursera_desc: "Certificación de proyecto práctico autorizada por Coursera Project Network para desarrollo en WordPress.",
        certs_view_pdf: "Ver PDF",
        certs_cert_1: "Certificado I",
        certs_cert_2: "Certificado II",
        experience_label: "( Experiencia )",
        experience_title: "Dónde He Trabajado",
        experience_toggle_all: "Mostrar todas las experiencias (4)",
        experience_toggle_less: "Mostrar menos",
        exp_1_role: "Especialista en TI",
        exp_1_desc: "Diseño y despliegue de la infraestructura de TI integral para una embarcación marítima. Creación desde cero de redes de servidores robustas y soluciones de alta disponibilidad para un entorno aislado.",
        exp_2_role: "Desarrollador Frontend Freelance",
        exp_2_desc: "Diseño y desarrollo de una aplicación web a medida para guías turísticos en Venecia. Gestión del ciclo frontend completo: diseño responsivo, alto rendimiento y audio sin conexión.",
        exp_3_role: "Logística RAEE y Desarrollador Interno",
        exp_3_desc: "Gestión de logística marítima para la recogida y traslado de residuos tecnológicos en los canales de Venecia. Diseñé y desarrollé una aplicación de mapas con base de datos para registrar obras y optimizar flujos internos.",
        exp_4_role: "Digitalización y Gestión de Datos",
        exp_4_desc: "Digitalización de manuscritos históricos, catalogación de fondos y migración a sistemas bibliotecarios. Esta experiencia consolidó bases sólidas en gestión de bases de datos y precisión documental.",
        cta_label: "( Contacto )",
        cta_line_1: "LET'S BUILD",
        cta_line_2: "SOMETHING",
        cta_line_3: "TOGETHER",
        footer_rights: "Diseñado y Desarrollado por Mattia Scarpa",
        footer_back_top: "Volver arriba",
        retro_toggle_text: "Modo 1995",
        modal_project_title: "El Proyecto",
        modal_role: "Rol",
        modal_year: "Año",
        modal_link: "Enlace",
        modal_visit: "Visitar sitio web",
        modal_gallery: "Galería"
    }
};

let currentLang = 'it';
let typingTimeout = null;
let roles = ['Full-Stack Developer', 'Creative Technologist', 'Ingegnere iOS & Swift', 'Specialista IT & DevOps'];
let rIdx = 0, cIdx = 0, deleting = false;
let projectsExpanded = false;
let expExpanded = false;

function setLanguage(lang) {
    if (!['it', 'en', 'es'].includes(lang)) lang = 'it';
    currentLang = lang;
    document.documentElement.setAttribute('lang', lang);
    try {
        localStorage.setItem('portfolio_lang', lang);
    } catch(e) {}

    // Aggiorna indicatore e bandiera bottone
    const flagEl = document.getElementById('langActiveFlag');
    const textEl = document.getElementById('langBtnText');
    const flagMap = { it: '🇮🇹', en: '🇬🇧', es: '🇪🇸' };
    const labelMap = { it: 'IT', en: 'EN', es: 'ES' };
    if (flagEl) flagEl.textContent = flagMap[lang] || '🇮🇹';
    if (textEl) textEl.textContent = labelMap[lang] || 'IT';

    // Aggiorna stato attivo nel menu a tendina desktop
    document.querySelectorAll('.lang-option').forEach(opt => {
        if (opt.getAttribute('data-lang') === lang) {
            opt.classList.add('active');
        } else {
            opt.classList.remove('active');
        }
    });

    // Aggiorna bottoni lingua menu mobile
    document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
            btn.classList.remove('text-text-sec');
            btn.classList.add('text-text');
        } else {
            btn.classList.remove('active');
            btn.classList.remove('text-text');
            btn.classList.add('text-text-sec');
        }
    });

    // Aggiorna tutti i nodi con attributo data-i18n
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.it;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict && dict[key] !== undefined) {
            if (el.getAttribute('data-i18n-html') === 'true') {
                el.innerHTML = dict[key];
            } else {
                el.textContent = dict[key];
            }
        }
    });

    // Aggiorna ruoli typing animation
    if (dict.hero_roles) {
        roles = dict.hero_roles;
        rIdx = 0;
        cIdx = 0;
        deleting = false;
        if (typingTimeout) clearTimeout(typingTimeout);
        typeRole();
    }

    // Aggiorna schede progetti
    updateWorkCardsLanguage();

    // Aggiorna testi bottoni toggle expand/collapse
    if (typeof updateProjectsToggleText === 'function') updateProjectsToggleText();
    if (typeof updateExpToggleText === 'function') updateExpToggleText();
}

// Inizializzazione Language Engine
function initLanguageEngine() {
    let saved = 'it';
    try {
        saved = localStorage.getItem('portfolio_lang') || 'it';
    } catch(e) {}
    setLanguage(saved);

    const toggleBtn = document.getElementById('langToggleBtn');
    const langMenu = document.getElementById('langMenu');

    if (toggleBtn && langMenu) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Chiudi menu tema se aperto
            const themeMenu = document.getElementById('themeMenu');
            if (themeMenu && themeMenu.classList.contains('open')) {
                themeMenu.classList.remove('open');
                const tBtn = document.getElementById('themeToggleBtn');
                if (tBtn) tBtn.setAttribute('aria-expanded', 'false');
            }

            const isOpen = langMenu.classList.contains('open');
            if (isOpen) {
                closeLangMenu();
            } else {
                openLangMenu();
            }
        });

        // Selezione lingua da menu
        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                const chosen = opt.getAttribute('data-lang');
                setLanguage(chosen);
                closeLangMenu();
            });
        });

        // Chiusura al click esterno
        document.addEventListener('click', (e) => {
            if (!langMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
                closeLangMenu();
            }
        });

        // Chiusura con tasto Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLangMenu();
        });
    }

    function openLangMenu() {
        langMenu.classList.add('open');
        toggleBtn.setAttribute('aria-expanded', 'true');
    }

    function closeLangMenu() {
        if (langMenu) langMenu.classList.remove('open');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    }
}
initLanguageEngine();

// Funzione per aggiornare il contenuto localizzato delle card progetti
function updateWorkCardsLanguage() {
    const projectsData = (typeof window !== 'undefined' && window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
    const wCards = document.querySelectorAll('.work-card');
    wCards.forEach((card, index) => {
        const raw = projectsData[index];
        if (!raw) return;
        const localized = (window.getProjectLocalized) ? window.getProjectLocalized(raw, currentLang) : raw;
        const catEl = card.querySelector('.work-card-cat');
        const titleEl = card.querySelector('.work-card-info h3');
        const descEl = card.querySelector('.work-card-info p');
        if (catEl && localized.category) catEl.textContent = localized.category;
        if (titleEl && localized.title) titleEl.textContent = localized.title;
        if (descEl && localized.shortDesc) descEl.textContent = localized.shortDesc;
    });
}

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
roles = (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang].hero_roles)
    ? TRANSLATIONS[currentLang].hero_roles
    : ['Full-Stack Developer', 'Creative Technologist', 'Ingegnere iOS & Swift', 'Specialista IT & DevOps'];

function typeRole() {
    const roleTexts = document.querySelectorAll('.hero-role span:first-child');
    if (!roles || roles.length === 0) return;
    const cur = roles[rIdx] || roles[0];
    if (!deleting) {
        const txt = cur.substring(0, cIdx + 1);
        roleTexts.forEach(el => el.textContent = txt);
        cIdx++;
        if (cIdx === cur.length) {
            deleting = true;
            typingTimeout = setTimeout(typeRole, 2400);
            return;
        }
        typingTimeout = setTimeout(typeRole, 65);
    } else {
        const txt = cur.substring(0, cIdx - 1);
        roleTexts.forEach(el => el.textContent = txt);
        cIdx--;
        if (cIdx === 0) {
            deleting = false;
            rIdx = (rIdx + 1) % roles.length;
            typingTimeout = setTimeout(typeRole, 350);
            return;
        }
        typingTimeout = setTimeout(typeRole, 30);
    }
}

// ==================== 9. PRELOADER & HERO REVEALS ====================
let preloaderDismissed = false;
function dismissPreloader() {
    if (preloaderDismissed) return;
    preloaderDismissed = true;

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
}

if (document.readyState === 'complete') {
    dismissPreloader();
} else {
    window.addEventListener('load', dismissPreloader);
    // Safety fallback: dismiss preloader if an external font/asset is slow to respond
    setTimeout(dismissPreloader, 2800);
}

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

    // Floating 3D Octahedron Beacon animation
    gsap.to('.octa-scene', { y: '-=14', duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.5 });

    // Interactive Holographic Diamond Beacon 3D Physics
    document.querySelectorAll('.cta-object').forEach(ctaObj => {
        const octa = ctaObj.querySelector('.octahedron');
        const scene = ctaObj.querySelector('.octa-scene');
        if (!octa || !scene) return;

        const isMobile = () => window.innerWidth < 768;
        const getBaseZ = () => isMobile() ? 31 : 45;
        const getMaxAddZ = () => isMobile() ? 32 : 60;

        ctaObj.addEventListener('mouseenter', () => {
            if (techCursor) techCursor.classList.add('dot-mode');
            const targetZ = isMobile() ? '55px' : '88px';
            gsap.to(octa, { '--octa-z': targetZ, duration: 0.6, ease: 'back.out(1.5)', overwrite: 'auto' });
        });

        ctaObj.addEventListener('mousemove', (e) => {
            const rect = ctaObj.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distX = (e.clientX - centerX) / (rect.width / 2);
            const distY = (e.clientY - centerY) / (rect.height / 2);
            const distance = Math.min(Math.sqrt(distX * distX + distY * distY), 1);

            const baseZ = getBaseZ();
            const maxAddZ = getMaxAddZ();
            const targetZ = baseZ + ((1 - distance) * maxAddZ);

            gsap.to(octa, { '--octa-z': `${targetZ}px`, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
            gsap.to(scene, { rotationX: -distY * 22, rotationY: distX * 22, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
        });

        ctaObj.addEventListener('mouseleave', () => {
            if (techCursor) techCursor.classList.remove('dot-mode');
            const baseZ = `${getBaseZ()}px`;
            gsap.to(octa, { '--octa-z': baseZ, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
            gsap.to(scene, { rotationX: 0, rotationY: 0, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
        });

        // Touch support on mobile devices
        ctaObj.addEventListener('touchstart', () => {
            const openZ = isMobile() ? '58px' : '90px';
            gsap.to(octa, { '--octa-z': openZ, duration: 0.5, ease: 'back.out(1.5)', overwrite: 'auto' });
        }, { passive: true });

        ctaObj.addEventListener('touchend', () => {
            const baseZ = `${getBaseZ()}px`;
            gsap.to(octa, { '--octa-z': baseZ, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
        }, { passive: true });
    });

    // CTA Beacon scroll entrance
    gsap.from('.cta-3d-wrapper', {
        scale: 0.75,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
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

            const rawData = projectsData[index];
            if (!rawData) return;
            const data = (window.getProjectLocalized) ? window.getProjectLocalized(rawData, currentLang) : rawData;

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
const toggleProjectsBtn = document.getElementById('toggleProjectsBtn');
const toggleProjectsText = document.getElementById('toggleProjectsText');
const toggleProjectsIcon = document.getElementById('toggleProjectsIcon');
const extraCards = document.querySelectorAll('.work-card-extra');
const workWrapper = document.querySelector('.work-wrapper');
const allWorkCards = document.querySelectorAll('.work-card');

function updateProjectsToggleText() {
    const el = document.getElementById('toggleProjectsText');
    if (!el) return;
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.it;
    el.textContent = projectsExpanded ? t.work_toggle_less : `${t.work_toggle_all}`;
}

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
            updateProjectsToggleText();
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
                updateProjectsToggleText();
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
const toggleExpBtn = document.getElementById('toggleExperienceBtn');
const toggleExpText = document.getElementById('toggleExpText');
const toggleExpIcon = document.getElementById('toggleExpIcon');
const extraExp = document.getElementById('extraExperience');

function updateExpToggleText() {
    const el = document.getElementById('toggleExpText');
    if (!el) return;
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.it;
    el.textContent = expExpanded ? t.experience_toggle_less : t.experience_toggle_all;
}

if (toggleExpBtn && extraExp) {
    toggleExpBtn.addEventListener('click', () => {
        expExpanded = !expExpanded;
        if (expExpanded) {
            extraExp.classList.add('is-expanded');
            updateExpToggleText();
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
                updateExpToggleText();
                if (toggleExpIcon) toggleExpIcon.style.transform = 'rotate(0deg)';
                setTimeout(() => { ScrollTrigger.refresh(); }, 400);
            }, 250);
        }
    });
}
