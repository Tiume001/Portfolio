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
        ],
        i18n: {
            it: {
                title: "Guida Turistica App",
                category: "Web / Presentazione",
                shortDesc: "Web app multilingua con login riservato per ascolto tracce audio offline, mappe e PDF informativi.",
                role: "Frontend Developer"
            },
            en: {
                title: "Tourist Guide App",
                category: "Web / Showcase",
                shortDesc: "Multilingual web app with private login for offline audio tracks, interactive maps, and PDF brochures.",
                role: "Frontend Developer",
                desc: "<div class='text-sm md:text-base leading-relaxed'><p class='mb-4'>A modern web app built with vanilla HTML, CSS, and JavaScript, designed to enhance the experience of tourists on guided tours. Access is private and protected by username and password.</p><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Multilingual & Home Page</h4><p class='mb-4'>The main interface lets visitors pick their preferred language, delivering a tailored experience for international travelers with a clean, contemporary design.</p><img src='assets/projects/tour-guide/home.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Multilingual Home' loading='lazy'><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Attraction Pages & Audio</h4><p class='mb-4'>Each attraction features a dedicated page with curated images and detailed historical descriptions, along with audio tracks that can be played online or downloaded for offline use.</p><img src='assets/projects/tour-guide/attrazione.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Attraction Page' loading='lazy'><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>PDF Documentation</h4><p class='mb-4'>For visitors who prefer printing or reading the full itinerary, the application generates a professionally formatted PDF brochure downloadable in one click.</p><img src='assets/projects/tour-guide/pdfDowload.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Download PDF' loading='lazy'></div>"
            },
            es: {
                title: "App Guía Turística",
                category: "Web / Presentación",
                shortDesc: "Aplicación web multilingüe con acceso privado para reproducción de audio offline, mapas y folletos en PDF.",
                role: "Desarrollador Frontend",
                desc: "<div class='text-sm md:text-base leading-relaxed'><p class='mb-4'>Una aplicación web moderna desarrollada en HTML, CSS y JavaScript Vanilla, pensada para enriquecer la experiencia de los turistas en visitas guiadas. El acceso es privado y seguro mediante usuario y contraseña.</p><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Multilingüe y Página de Inicio</h4><p class='mb-4'>La interfaz principal permite a los visitantes elegir su idioma preferido, brindando una experiencia personalizada a turistas internacionales con un diseño limpio y actual.</p><img src='assets/projects/tour-guide/home.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Inicio Multilingüe' loading='lazy'><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Atracciones y Pistas de Audio</h4><p class='mb-4'>Cada atracción cuenta con su página dedicada con fotografías y textos detallados, además de pistas de audio que pueden reproducirse en línea o descargarse para su uso sin conexión.</p><img src='assets/projects/tour-guide/attrazione.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Página de Atracción' loading='lazy'><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Documentación en PDF</h4><p class='mb-4'>Para quienes prefieren leer o imprimir el recorrido completo, la aplicación genera un folleto en PDF maquetado profesionalmente, descargable con un clic.</p><img src='assets/projects/tour-guide/pdfDowload.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Descarga PDF' loading='lazy'></div>"
            }
        }
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
        ],
        i18n: {
            it: {
                title: "Gestione Lavori Venezia",
                category: "iOS / Web App",
                shortDesc: "App gestionale iOS whitelabel con mappa interattiva 3D per coordinare lavori e smaltimenti, basata su Swift, MapKit JS e Supabase.",
                role: "Lead Developer (Swift)"
            },
            en: {
                title: "Venice Logistics & Works",
                category: "iOS / Web App",
                shortDesc: "Whitelabel iOS logistics app with 3D interactive map to coordinate works and disposal across Venice, built with Swift, MapKit JS, and Supabase.",
                role: "Lead Developer (Swift)",
                desc: "<div class='text-sm md:text-base leading-relaxed'><p class='mb-4'>Whitelabel logistical management app: each company (waste disposal, deliveries, pickups) gets its own branded app while keeping data private and isolated. Secured with credentials and <strong>biometric authentication</strong> (Face ID / Touch ID). Designed originally for the complex canal geography of Venice, its architecture scales worldwide.</p><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Architecture & Database</h4><p class='mb-4'>Powered by <strong>Supabase</strong>, ensuring immediate and secure real-time synchronization of waste codes (CER), site information, and attached photos.</p><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Geospatial Map (MapKit JS)</h4><p class='mb-4'>The core of the application is a native <strong>Swift</strong> interactive map powered by <strong>MapKit</strong>. It features live operator tracking and smooth transitions between Standard, Satellite, and 3D Satellite views to pinpoint moorings and jobs with precision.</p><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Operational Workflow</h4><p class='mb-4'>Includes a daily calendar dashboard. Clicking any map marker opens a bulletin board with complete info and photos. An integrated CER code register provides instant search.</p><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Automation & Excel Import</h4><p class='mb-4'>To speed up job dispatching, a built-in tool imports Excel sheets and <strong>automatically geolocates tasks based on district and door numbers</strong>.</p><img src='assets/projects/venezia-app/esempioExcelToImport.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Excel Import Example' loading='lazy'></div>"
            },
            es: {
                title: "Gestión de Trabajos Venecia",
                category: "iOS / Web App",
                shortDesc: "App de gestión logística whitelabel para iOS con mapa interactivo 3D para coordinar tareas y traslados, desarrollada en Swift, MapKit JS y Supabase.",
                role: "Desarrollador Principal (Swift)",
                desc: "<div class='text-sm md:text-base leading-relaxed'><p class='mb-4'>Aplicación de gestión logística whitelabel: cada empresa dispone de su app personalizada manteniendo sus datos aislados y seguros. Doble protección con credenciales y <strong>escaneo biométrico</strong> (Face ID / Touch ID). Diseñada inicialmente para los canales de Venecia, con arquitectura escalable globalmente.</p><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Arquitectura y Base de Datos</h4><p class='mb-4'>El ecosistema se apoya en <strong>Supabase</strong>, garantizando sincronización en tiempo real de códigos de residuos (CER), obras y fotografías.</p><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Mapa Geoespacial (MapKit JS)</h4><p class='mb-4'>El núcleo es un mapa interactivo nativo en <strong>Swift</strong> con <strong>MapKit</strong>. Ofrece seguimiento en vivo y cambio fluido entre vistas estándar, satélite y satélite 3D para ubicar amarres y trabajos con máxima precisión.</p><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Flujo Operativo</h4><p class='mb-4'>Incluye panel diario con calendario. Al tocar un marcador se despliega la ficha completa con fotos. Registro integrado de códigos CER con búsqueda rápida.</p><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Automatización e Importación Excel</h4><p class='mb-4'>Herramienta para importar archivos Excel y <strong>geolocalizar automáticamente las tareas según barrio y número cívico</strong>.</p><img src='assets/projects/venezia-app/esempioExcelToImport.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Ejemplo Excel' loading='lazy'></div>"
            }
        }
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
        ],
        i18n: {
            it: {
                title: "Vecchio Portfolio",
                category: "Web / Portfolio",
                shortDesc: "Il mio precedente portfolio personale, ancora attivo come archivio storico dei miei primi lavori e della mia evoluzione tecnica.",
                role: "Frontend Developer"
            },
            en: {
                title: "Legacy Portfolio",
                category: "Web / Portfolio",
                shortDesc: "My previous personal portfolio, still live as a historical archive of my early work and engineering evolution.",
                role: "Frontend Developer",
                desc: "My previous personal portfolio, built natively with HTML, CSS, and JavaScript. Hosted on GitHub Pages with Firebase Authentication supporting Google sign-in, email, and phone authentication. Features diverse functional modules shown in the gallery: Home (1), Notes management (2), secure Auth interface (3), Credentials showcase (4), Projects archive (5), and a technical 'Nerd Corner' (6)."
            },
            es: {
                title: "Portafolio Anterior",
                category: "Web / Portafolio",
                shortDesc: "Mi anterior portafolio personal, aún activo como archivo histórico de mis primeros proyectos y evolución técnica.",
                role: "Desarrollador Frontend",
                desc: "Mi anterior portafolio personal, desarrollado en HTML, CSS y JavaScript nativos. Alojado en GitHub Pages e integrado con Firebase Authentication (Google, correo y teléfono). Incluye módulos funcionales mostrados en la galería: Inicio (1), notas dinámicas (2), inicio de sesión seguro (3), certificaciones (4), archivo de proyectos (5) y una sección técnica 'Nerd Corner' (6)."
            }
        }
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
        ],
        i18n: {
            it: {
                title: "Matrix VoIP Network",
                category: "DevOps / Networking",
                shortDesc: "Infrastruttura di comunicazione privata su dominio personale con PBX, Matrix ed Element, orchestrata con Docker e resa invisibile da Tailscale.",
                role: "DevOps Engineer"
            },
            en: {
                title: "Matrix VoIP Network",
                category: "DevOps / Networking",
                shortDesc: "Private communication infrastructure on personal domain with PBX, Matrix, and Element, containerized with Docker and secured via Tailscale.",
                role: "DevOps Engineer",
                desc: "<div class='text-sm md:text-base leading-relaxed'><p class='mb-4'>Design and implementation of a private, high-security messaging and VoIP communication infrastructure. A decentralized, self-hosted ecosystem granting complete data ownership.</p><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Virtualization (Docker)</h4><p class='mb-4'>The stack is containerized via <strong>Docker</strong>, enabling isolated deployment, management, and upgrades of services including the Matrix homeserver and VoIP PBX. Automated shell scripts streamline deployment and maintenance.</p><img src='assets/projects/matrix-voip/docker.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Docker Configuration' loading='lazy'><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Security & Tunneling (Tailscale)</h4><p class='mb-4'>To expose services securely, a point-to-point mesh VPN was implemented via <strong>Tailscale</strong>. Servers communicate through isolated private IPs, keeping the infrastructure completely invisible to the open Internet without port forwarding.</p><img src='assets/projects/matrix-voip/tailscale.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Tailscale Private Mesh' loading='lazy'><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Sovereign Messaging (Matrix & Element)</h4><p class='mb-4'>Free from third-party servers, the setup utilizes personal domain <strong>mattiascarpa.it</strong> as a federated Matrix node. Using <strong>Element</strong> clients, it provides an end-to-end encrypted messaging environment without tracking.</p><img src='assets/projects/matrix-voip/Element.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Element Chat Client' loading='lazy'></div>"
            },
            es: {
                title: "Matrix VoIP Network",
                category: "DevOps / Redes",
                shortDesc: "Infraestructura de comunicación privada en dominio propio con PBX, Matrix y Element, orquestada con Docker y protegida con Tailscale.",
                role: "Ingeniero DevOps",
                desc: "<div class='text-sm md:text-base leading-relaxed'><p class='mb-4'>Diseño e implementación de una infraestructura privada de mensajería y voz IP de alta seguridad. Un ecosistema descentralizado y soberano que garantiza control total sobre los datos.</p><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Virtualización (Docker)</h4><p class='mb-4'>Todo el ecosistema está contenerizado mediante <strong>Docker</strong>, permitiendo gestionar y actualizar servicios (servidor Matrix y PBX VoIP) en entornos aislados con scripts de automatización.</p><img src='assets/projects/matrix-voip/docker.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Configuración Docker' loading='lazy'><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Seguridad y Túneles (Tailscale)</h4><p class='mb-4'>Para conectar servicios con total seguridad se implementó una red virtual privada mesh con <strong>Tailscale</strong>, comunicando servidores mediante IPs privadas e invisibles a Internet público.</p><img src='assets/projects/matrix-voip/tailscale.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Red Privada Tailscale' loading='lazy'><h4 class='text-white font-display font-semibold text-lg mb-2 mt-6'>Mensajería Segura (Matrix y Element)</h4><p class='mb-4'>Utilizando el dominio propio <strong>mattiascarpa.it</strong> como nodo Matrix independiente y la app <strong>Element</strong>, ofrece chat cifrado de extremo a extremo sin rastreo de terceros.</p><img src='assets/projects/matrix-voip/Element.png' class='w-full rounded-lg mt-4 mb-2 border border-white/10 lightbox-image cursor-pointer hover:opacity-80 transition-opacity' alt='Cliente Element' loading='lazy'></div>"
            }
        }
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
        gallery: ["project_placeholder.png"],
        i18n: {
            it: {
                title: "Sito Personale Alpha",
                category: "Web / Personale",
                shortDesc: "Sito web personale sviluppato per testare nuove tecnologie e gestire contenuti in maniera dinamica.",
                role: "Creator"
            },
            en: {
                title: "Personal Website Alpha",
                category: "Web / Personal",
                shortDesc: "Personal website built to experiment with modern headless workflows and dynamic content management.",
                role: "Creator",
                desc: "First of two personal projects crafted to push frontend boundaries. This project acts as an architectural playground for testing headless CMS integrations, modern build tools, and advanced utility-first CSS in Tailwind, establishing reusable components for client projects."
            },
            es: {
                title: "Sitio Personal Alpha",
                category: "Web / Personal",
                shortDesc: "Sitio web personal desarrollado para experimentar con nuevas tecnologías y gestión dinámica de contenidos.",
                role: "Creador",
                desc: "Primero de dos proyectos personales creados para ampliar conocimientos frontend. Funciona como banco de pruebas para flujos headless, integración con CMS modernos y uso avanzado de Tailwind CSS."
            }
        }
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
        gallery: ["project_placeholder.png"],
        i18n: {
            it: {
                title: "Sito Personale Beta",
                category: "Web / Personale",
                shortDesc: "Applicazione web sperimentale incentrata su layout innovativi e prestazioni di alto livello.",
                role: "Creative Developer"
            },
            en: {
                title: "Personal Website Beta",
                category: "Web / Personal",
                shortDesc: "Experimental web application focused on creative layouts, 60fps animations, and bleeding-edge performance.",
                role: "Creative Developer",
                desc: "Experimental web application focused on visual elegance and fluid interactivity. Explores GSAP motion choreography, asymmetrical editorial layouts, complex page transitions, and solid 60fps rendering atop Next.js."
            },
            es: {
                title: "Sitio Personal Beta",
                category: "Web / Personal",
                shortDesc: "Aplicación web experimental enfocada en diseños innovadores y rendimiento de alto nivel a 60 fps.",
                role: "Desarrollador Creativo",
                desc: "Proyecto web experimental enfocado en la estética y la interacción fluida. Diseñado para explorar coreografías GSAP, composiciones asimétricas y transiciones a 60 fps constantes con Next.js."
            }
        }
    }
];

window.getProjectLocalized = function(project, lang) {
    lang = lang || 'it';
    if (!project) return project;
    const t = (project.i18n && project.i18n[lang]) ? project.i18n[lang] : null;
    if (!t) return project;
    return {
        ...project,
        title: t.title || project.title,
        category: t.category || project.category,
        shortDesc: t.shortDesc || project.shortDesc,
        desc: t.desc || project.desc,
        role: t.role || project.role
    };
};

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
