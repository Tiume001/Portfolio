// Unica sorgente di verità per progetti e dati biografici
// Condivisa tra il portfolio moderno (index.html) e la modalità retrò (retro/index.html)

window.PORTFOLIO_PROJECTS = [
    {
        id: "tour-guide",
        title: "Guida Turistica App",
        category: "Web / Presentazione",
        shortDesc: "Web app multilingua con login riservato per ascolto tracce audio offline, mappe e PDF informativi.",
        desc: "<div class='text-sm md:text-base leading-relaxed'><p class='mb-4'>Una web app moderna, sviluppata in HTML, CSS e JavaScript Vanilla, pensata per arricchire l'esperienza dei turisti durante i tour guidati. L'accesso è riservato e protetto da username e password.</p><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Multilingua & Home Page</h4><p class='mb-4'>L'interfaccia principale permette agli utenti di selezionare la propria lingua, offrendo un'esperienza su misura per turisti internazionali, con un design pulito e contemporaneo.</p><img src='assets/projects/tour-guide/home.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Home Multilingua' loading='lazy'><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Pagine delle Attrazioni & Audio</h4><p class='mb-4'>Ogni attrazione ha una sua pagina dedicata con immagini specifiche e testi approfonditi. Inoltre, include tracce audio che possono essere riprodotte direttamente online o scaricate sul dispositivo per l'ascolto offline.</p><img src='assets/projects/tour-guide/attrazione.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Pagina Attrazione' loading='lazy'><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Documentazione PDF</h4><p class='mb-4'>Per chi preferisce leggere l'intero itinerario o stamparlo, l'applicazione genera e mette a disposizione un PDF completo, impaginato professionalmente, scaricabile con un clic.</p><img src='assets/projects/tour-guide/pdfDowload.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Download PDF' loading='lazy'></div>",
        role: "Frontend Developer",
        year: "2023",
        link: "https://veniceguide.github.io",
        hero: "assets/projects/tour-guide/cover.png",
        tags: ["HTML", "CSS", "JavaScript"],
        gallery: [
            "assets/projects/tour-guide/cover.png",
            "assets/projects/tour-guide/home.png",
            "assets/projects/tour-guide/attrazione.png",
            "assets/projects/tour-guide/pdfDowload.png"
        ]
    },
    {
        id: "venezia-app",
        title: "Gestione Lavori Venezia",
        category: "iOS / Web App",
        shortDesc: "App gestionale iOS whitelabel con mappa interattiva 3D per coordinare lavori e smaltimenti, basata su Swift, MapKit JS e Supabase.",
        desc: "<div class='text-sm md:text-base leading-relaxed'><p class='mb-4'>Applicazione logistica gestionale strutturata come 'whitelabel': ogni ditta (es. smaltimento rifiuti, consegne, ritiri) può avere la propria app personalizzata mantenendo i propri dati al sicuro e isolati. L'accesso è doppiamente protetto tramite credenziali standard e <strong>scansione biometrica</strong> (Face ID / Touch ID). Progettata inizialmente per la complessa viabilità dei canali di Venezia, la sua architettura è scalabile in tutto il mondo.</p><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Architettura & Database</h4><p class='mb-4'>L'intero ecosistema si appoggia su <strong>Supabase</strong>, assicurando sincronizzazione immediata e sicura di codici CER, informazioni sui cantieri e foto allegate.</p><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Mappa Geospaziale (MapKit JS)</h4><p class='mb-4'>Il cuore dell'app è la mappa interattiva nativa in <strong>Swift</strong> basata su <strong>MapKit</strong>. Offre il tracciamento live degli operatori e il passaggio fluido tra viste (Standard, Satellite, 3D Satellite) per individuare ormeggi e lavori con precisione.</p><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Flusso Operativo</h4><p class='mb-4'>Include una dashboard giornaliera legata al calendario. Cliccando un'etichetta sulla mappa si apre una bacheca con tutte le info e foto allegate. È integrato un registro completo dei codici CER con ricerca rapida.</p><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Automazione & Import Excel</h4><p class='mb-4'>Per accelerare le assegnazioni, un tool importa i file Excel e <strong>geolocalizza automaticamente i lavori in base a sestiere e civico</strong>.</p><img src='assets/projects/venezia-app/esempioExcelToImport.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Esempio Tabella Excel' loading='lazy'></div>",
        role: "Lead Developer (Swift)",
        year: "2024",
        link: "#",
        hero: "assets/projects/venezia-app/newCover.png",
        tags: ["Swift", "MapKit JS", "Supabase", "iOS"],
        gallery: [
            "assets/projects/venezia-app/0Cover.png",
            "assets/projects/venezia-app/mappa1.png",
            "assets/projects/venezia-app/mappa2.png",
            "assets/projects/venezia-app/mappa3.png",
            "assets/projects/venezia-app/mappa4.png",
            "assets/projects/venezia-app/facciataProgramma5.png",
            "assets/projects/venezia-app/facciataCodiciCER6.png",
            "assets/projects/venezia-app/FacciataImportExcel7.png",
            "assets/projects/venezia-app/supabase.png"
        ]
    },
    {
        id: "old-portfolio",
        title: "Vecchio Portfolio",
        category: "Web / Portfolio",
        shortDesc: "Il mio precedente portfolio personale, ancora attivo come archivio storico dei miei primi lavori e della mia evoluzione tecnica.",
        desc: "Il mio precedente portfolio personale, sviluppato nativamente in HTML, CSS e JavaScript. Il sito è ospitato su GitHub Pages e integra Firebase per la gestione completa dell'autenticazione, permettendo un sistema di login tramite account Google, email classica o numero di telefono. Il sito include diverse sezioni funzionali mostrate nella galleria: dalla Home (1), alla gestione dinamica degli Appunti (2), l'interfaccia di Login sicura (3), una bacheca per le Certificazioni (4), l'archivio dei Progetti (5), per concludersi con una 'Sezione Nerd' (6) dedicata alle passioni più tecniche.",
        role: "Frontend Developer",
        year: "2021",
        link: "https://webauth-38128.web.app",
        hero: "assets/projects/old-portfolio/cover.png",
        tags: ["HTML", "CSS", "JS", "Firebase", "GitHub"],
        gallery: [
            "assets/projects/old-portfolio/01-home.png",
            "assets/projects/old-portfolio/02-appunti.png",
            "assets/projects/old-portfolio/03-login.png",
            "assets/projects/old-portfolio/04-certificazioni.png",
            "assets/projects/old-portfolio/05-progetti.png",
            "assets/projects/old-portfolio/06-sezione-nerd.png"
        ]
    },
    {
        id: "matrix-voip",
        title: "Matrix VoIP Network",
        category: "DevOps / Networking",
        shortDesc: "Infrastruttura di comunicazione privata su dominio personale con PBX, Matrix ed Element, orchestrata con Docker e resa invisibile da Tailscale.",
        desc: "<div class='text-sm md:text-base leading-relaxed'><p class='mb-4'>Progettazione e implementazione di un'infrastruttura di comunicazione e messaggistica privata ad alta sicurezza. Un ecosistema decentralizzato e indipendente che garantisce il controllo totale sui propri dati.</p><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Virtualizzazione (Docker)</h4><p class='mb-4'>L'intero ecosistema è containerizzato tramite <strong>Docker</strong>, permettendo di avviare, gestire e aggiornare i servizi (tra cui il server Matrix e il PBX VoIP) in ambienti isolati. L'orchestrazione è supportata da script di automazione (<code>.command</code>) che semplificano il deploy e la manutenzione.</p><img src='assets/projects/matrix-voip/docker.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Configurazione Docker' loading='lazy'><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Sicurezza & Tunneling (Tailscale)</h4><p class='mb-4'>Per esporre i servizi in totale sicurezza, ho implementato una rete virtuale privata mesh utilizzando <strong>Tailscale</strong>. In questo modo i server comunicano tramite IP privati isolati, rendendo l'infrastruttura invisibile e inaccessibile dall'esterno se non tramite il tunnel crittografato.</p><img src='assets/projects/matrix-voip/tailscale.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Rete Privata Tailscale' loading='lazy'><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Messaggistica Sovrana (Matrix & Element)</h4><p class='mb-4'>Svincolandosi dai server pubblici, il sistema utilizza il dominio personale <strong>mattiascarpa.it</strong> come nodo Matrix proprietario. Sfruttando il client <strong>Element</strong>, il setup offre un ambiente di chat crittografata end-to-end senza alcun tracciamento di terze parti.</p><img src='assets/projects/matrix-voip/Element.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Client Chat Element' loading='lazy'></div>",
        role: "DevOps Engineer",
        year: "2023",
        link: "#",
        hero: "assets/projects/matrix-voip/cover.png",
        tags: ["Docker", "Matrix", "Tailscale", "Element"],
        gallery: [
            "assets/projects/matrix-voip/cover.png",
            "assets/projects/matrix-voip/docker.png",
            "assets/projects/matrix-voip/tailscale.png",
            "assets/projects/matrix-voip/Element.png"
        ]
    },
    {
        id: "personal-alpha",
        title: "Sito Personale Alpha",
        category: "Web / Personale",
        shortDesc: "Sito web personale sviluppato per testare nuove tecnologie e gestire contenuti in maniera dinamica.",
        desc: "Primo di due progetti personali sviluppati con l'intento di spingere al limite le mie conoscenze frontend. Questo sito funge da sandbox per testare approcci headless, integrazione con CMS moderni e l'uso avanzato di utility-first CSS come Tailwind. È il banco di prova per i componenti che poi riutilizzo nei progetti dei clienti.",
        role: "Creator",
        year: "2022",
        link: "#",
        hero: "project_placeholder.png",
        tags: ["React", "Tailwind"],
        gallery: ["project_placeholder.png"]
    },
    {
        id: "personal-beta",
        title: "Sito Personale Beta",
        category: "Web / Personale",
        shortDesc: "Applicazione web sperimentale incentrata su layout innovativi e prestazioni di alto livello.",
        desc: "Progetto web sperimentale focalizzato esclusivamente sul lato estetico e interattivo. L'obiettivo era padroneggiare la libreria GSAP e testare layout asimmetrici, transizioni pagina complesse e rendering a 60fps costanti sfruttando l'architettura di Next.js.",
        role: "Creative Developer",
        year: "2024",
        link: "#",
        hero: "project_placeholder.png",
        tags: ["Next.js", "GSAP"],
        gallery: ["project_placeholder.png"]
    }
];

window.PORTFOLIO_INFO = {
    name: "Mattia Scarpa",
    role: "Full-Stack Developer & IT Specialist",
    location: "Venezia, Italia",
    email: "info@mattiascarpa.it",
    website: "https://mattiascarpa.it",
    github: "https://github.com/Tiume001",
    linkedin: "https://www.linkedin.com/in/mattia-scarpa-a20a6b277/",
    experience: [
        {
            year: "2026",
            role: "IT Specialist",
            company: "Eyelink s.r.l. — Venice",
            desc: "Progettazione e deploy dell'infrastruttura IT per nave da crociera/trasporto marittimo. Configurazione server bare-metal ESXi e reti ad alta affidabilità per ambiente isolato."
        },
        {
            year: "2026",
            role: "Freelance Frontend Developer",
            company: "Tour Guide Business — Venice",
            desc: "Web app custom multilingua per audioguide turistiche a Venezia, con audio offline, mappe interattive e generazione brochure PDF."
        },
        {
            year: "2023 — 2026",
            role: "E-Waste Logistics & Internal Developer",
            company: "Re.Te. s.r.l. — Venice",
            desc: "Logistica marittima smaltimento RAEE nei canali di Venezia. Sviluppo interno di applicazione con mappa geospaziale e database per tracciamento cantieri."
        },
        {
            year: "2016",
            role: "Digitalization & Data Management",
            company: "Ca' Foscari University Library — Venice",
            desc: "Digitalizzazione manoscritti storici, catalogazione e migrazione nei sistemi archivistici bibliotecari."
        }
    ],
    skills: {
        frontend: ["React", "Next.js", "TypeScript", "Swift / iOS", "Tailwind CSS", "GSAP Motion", "MapKit JS"],
        backend: ["PostgreSQL", "Supabase", "Node.js", "Python / FastAPI", "PHP / Laravel", "REST APIs"],
        infrastructure: ["Docker", "Tailscale / WireGuard", "VMware ESXi", "vSphere", "Libraesva ESG", "MailStore"],
        tools: ["Git / GitHub", "Anthropic Claude API", "Figma", "Zsh / Bash Automation"]
    }
};
