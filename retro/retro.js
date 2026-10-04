// ==========================================================================
// RETRO 1995 — WINDOW MANAGER & DESKTOP LOGIC (WINDOWS 95 & NETSCAPE)
// ==========================================================================

// Helper per normalizzare i percorsi degli asset relativi quando siamo nella cartella /retro/
function fixRetroAsset(url) {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
    if (url.startsWith('../')) return url;
    if (url.startsWith('/')) return url;
    return '../' + url;
}

function fixRetroHtml(html) {
    if (!html) return '';
    return html
        .replace(/src=(['"])assets\//g, 'src=$1../assets/')
        .replace(/src=(['"])project_placeholder\.png/g, 'src=$1../project_placeholder.png')
        .replace(/href=(['"])assets\//g, 'href=$1../assets/');
}

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // 1. WINDOW MANAGER STORE
    // --------------------------------------------------------------------------
    let highestZ = 10;
    const isMobile = () => window.innerWidth < 768;

    const windowState = {
        netscape: {
            id: 'netscape',
            title: 'Netscape Navigator - [Mattia Scarpa - Portfolio 1995]',
            icon: '🌐',
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: 10,
            pos: { x: 40, y: 25 },
            size: { w: 860, h: 580 }
        },
        notepad: {
            id: 'notepad',
            title: 'Curriculum.txt - Blocco note',
            icon: '📄',
            isOpen: false,
            isMinimized: false,
            isMaximized: false,
            zIndex: 9,
            pos: { x: 90, y: 60 },
            size: { w: 640, h: 440 }
        },
        terminal: {
            id: 'terminal',
            title: 'MS-DOS Prompt [80x25]',
            icon: '📟',
            isOpen: false,
            isMinimized: false,
            isMaximized: false,
            zIndex: 8,
            pos: { x: 130, y: 90 },
            size: { w: 640, h: 400 }
        },
        projects: {
            id: 'projects',
            title: 'I Miei Progetti - Esplora Risorse',
            icon: '📁',
            isOpen: false,
            isMinimized: false,
            isMaximized: false,
            zIndex: 7,
            pos: { x: 160, y: 120 },
            size: { w: 580, h: 380 }
        }
    };

    // Responsive initial sizing
    function adjustInitialWindowSizes() {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        
        if (vw >= 768) {
            windowState.netscape.size.w = Math.min(880, vw - 80);
            windowState.netscape.size.h = Math.min(600, vh - 100);
            windowState.notepad.size.w = Math.min(660, vw - 120);
            windowState.notepad.size.h = Math.min(460, vh - 140);
            windowState.terminal.size.w = Math.min(660, vw - 140);
            windowState.terminal.size.h = Math.min(420, vh - 160);
        }
    }
    adjustInitialWindowSizes();

    function focusWindow(id) {
        const win = windowState[id];
        if (!win || !win.isOpen) return;
        
        highestZ++;
        win.zIndex = highestZ;
        win.isMinimized = false;
        
        // Aggiorna classi active
        Object.keys(windowState).forEach(key => {
            const el = document.getElementById(`win-${key}`);
            if (el) {
                if (key === id) {
                    el.classList.add('active');
                } else {
                    el.classList.remove('active');
                }
            }
        });
        
        renderWindows();
        renderTaskbar();
    }

    function openWindow(id) {
        const win = windowState[id];
        if (!win) return;
        win.isOpen = true;
        win.isMinimized = false;
        focusWindow(id);
    }

    function closeWindow(id) {
        const win = windowState[id];
        if (!win) return;
        win.isOpen = false;
        renderWindows();
        renderTaskbar();
    }

    function minimizeWindow(id) {
        const win = windowState[id];
        if (!win) return;
        win.isMinimized = true;
        renderWindows();
        renderTaskbar();
    }

    function toggleMaximize(id) {
        const win = windowState[id];
        if (!win) return;
        win.isMaximized = !win.isMaximized;
        renderWindows();
        renderTaskbar();
    }

    function renderWindows() {
        const mobile = isMobile();

        Object.keys(windowState).forEach(id => {
            const win = windowState[id];
            const el = document.getElementById(`win-${id}`);
            if (!el) return;

            if (!win.isOpen || win.isMinimized) {
                el.style.display = 'none';
            } else {
                el.style.display = 'flex';
                el.style.zIndex = win.zIndex;

                if (mobile) {
                    el.style.top = '0px';
                    el.style.left = '0px';
                    el.style.width = '100vw';
                    el.style.height = 'calc(100vh - 32px)';
                    el.classList.remove('is-maximized');
                } else if (win.isMaximized) {
                    el.classList.add('is-maximized');
                } else {
                    el.classList.remove('is-maximized');
                    el.style.top = `${win.pos.y}px`;
                    el.style.left = `${win.pos.x}px`;
                    el.style.width = `${win.size.w}px`;
                    el.style.height = `${win.size.h}px`;
                }
            }
        });
    }

    function renderTaskbar() {
        const container = document.getElementById('taskbarItems');
        if (!container) return;
        container.innerHTML = '';

        // Troviamo quale finestra è attiva in primo piano
        let topActiveId = null;
        let highestActiveZ = -1;
        Object.keys(windowState).forEach(id => {
            const w = windowState[id];
            if (w.isOpen && !w.isMinimized && w.zIndex > highestActiveZ) {
                highestActiveZ = w.zIndex;
                topActiveId = id;
            }
        });

        Object.keys(windowState).forEach(id => {
            const win = windowState[id];
            if (!win.isOpen) return;

            const btn = document.createElement('div');
            btn.className = `taskbar-item ${(!win.isMinimized && id === topActiveId) ? 'active' : ''}`;
            btn.innerHTML = `
                <span class="taskbar-item-icon">${win.icon}</span>
                <span>${win.title.split(' - ')[0]}</span>
            `;

            btn.addEventListener('click', () => {
                if (win.isMinimized) {
                    win.isMinimized = false;
                    focusWindow(id);
                } else if (id === topActiveId) {
                    minimizeWindow(id);
                } else {
                    focusWindow(id);
                }
            });

            container.appendChild(btn);
        });
    }

    // --------------------------------------------------------------------------
    // 2. DRAG & DROP FOR WINDOWS (DESKTOP)
    // --------------------------------------------------------------------------
    let activeDrag = null;

    document.querySelectorAll('.window').forEach(winEl => {
        const id = winEl.id.replace('win-', '');
        const titleBar = winEl.querySelector('.title-bar');

        winEl.addEventListener('mousedown', () => {
            focusWindow(id);
        });

        if (titleBar) {
            titleBar.addEventListener('mousedown', (e) => {
                // Non avviare drag se clicchiamo sui pulsanti di controllo
                if (e.target.closest('.title-bar-controls')) return;
                if (isMobile() || windowState[id].isMaximized) return;

                activeDrag = {
                    id: id,
                    startX: e.clientX,
                    startY: e.clientY,
                    initialX: windowState[id].pos.x,
                    initialY: windowState[id].pos.y
                };
                focusWindow(id);
                e.preventDefault();
            });

            // Doppio click sulla barra del titolo = toggle maximize
            titleBar.addEventListener('dblclick', (e) => {
                if (e.target.closest('.title-bar-controls')) return;
                if (!isMobile()) toggleMaximize(id);
            });
        }

        // Window controls buttons
        const minBtn = winEl.querySelector('[aria-label="Minimize"]');
        const maxBtn = winEl.querySelector('[aria-label="Maximize"]');
        const closeBtn = winEl.querySelector('[aria-label="Close"]');

        if (minBtn) minBtn.addEventListener('click', (e) => { e.stopPropagation(); minimizeWindow(id); });
        if (maxBtn) maxBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMaximize(id); });
        if (closeBtn) closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closeWindow(id); });
    });

    document.addEventListener('mousemove', (e) => {
        if (!activeDrag) return;
        const dx = e.clientX - activeDrag.startX;
        const dy = e.clientY - activeDrag.startY;
        
        let newX = Math.max(0, Math.min(window.innerWidth - 100, activeDrag.initialX + dx));
        let newY = Math.max(0, Math.min(window.innerHeight - 60, activeDrag.initialY + dy));
        
        windowState[activeDrag.id].pos.x = newX;
        windowState[activeDrag.id].pos.y = newY;
        
        const el = document.getElementById(`win-${activeDrag.id}`);
        if (el) {
            el.style.left = `${newX}px`;
            el.style.top = `${newY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        activeDrag = null;
    });

    // --------------------------------------------------------------------------
    // 3. DESKTOP ICONS INTERACTION
    // --------------------------------------------------------------------------
    document.querySelectorAll('.desktop-icon').forEach(icon => {
        const targetWin = icon.getAttribute('data-window');

        icon.addEventListener('click', (e) => {
            document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
            icon.classList.add('selected');
            e.stopPropagation();

            // Su mobile o touch, il singolo tocco apre la finestra
            if (isMobile()) {
                if (targetWin) openWindow(targetWin);
            }
        });

        icon.addEventListener('dblclick', () => {
            if (targetWin) openWindow(targetWin);
        });
    });

    // Cliccando sul desktop vuoto si deselezionano le icone e si chiude lo Start Menu
    document.getElementById('desktop').addEventListener('click', (e) => {
        if (e.target.id === 'desktop') {
            document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
            closeStartMenu();
        }
    });

    // --------------------------------------------------------------------------
    // 4. START MENU & TASKBAR
    // --------------------------------------------------------------------------
    const startBtn = document.getElementById('startButton');
    const startMenu = document.getElementById('startMenu');

    function toggleStartMenu() {
        if (!startMenu) return;
        const isOpen = startMenu.classList.contains('open');
        if (isOpen) {
            closeStartMenu();
        } else {
            startMenu.classList.add('open');
            startBtn.classList.add('active');
        }
    }

    function closeStartMenu() {
        if (!startMenu) return;
        startMenu.classList.remove('open');
        if (startBtn) startBtn.classList.remove('active');
    }

    if (startBtn) {
        startBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleStartMenu();
        });
    }

    // Start Menu Items
    document.querySelectorAll('.start-menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const targetWin = item.getAttribute('data-window');
            if (targetWin) {
                openWindow(targetWin);
            }
            closeStartMenu();
        });
    });

    // System Clock
    function updateClock() {
        const clockEl = document.getElementById('systemClock');
        if (!clockEl) return;
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        clockEl.textContent = `${hrs}:${mins}`;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // --------------------------------------------------------------------------
    // 5. NETSCAPE NAVIGATOR LOGIC & RENDERING
    // --------------------------------------------------------------------------
    const netscapeUrlInput = document.getElementById('netscapeUrl');
    const netscapeTabs = document.querySelectorAll('.netscape-tab');
    let netscapeHistory = ['home'];
    let historyIdx = 0;

    function renderNetscapePage(page) {
        const contentContainer = document.getElementById('netscapeContent');
        if (!contentContainer) return;

        netscapeTabs.forEach(t => {
            if (t.getAttribute('data-page') === page) {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });

        if (netscapeUrlInput) {
            netscapeUrlInput.value = `https://retro.mattiascarpa.it/${page}`;
        }

        const projects = window.PORTFOLIO_PROJECTS || [];
        const info = window.PORTFOLIO_INFO || {};

        if (page === 'home') {
            contentContainer.innerHTML = `
                <div class="retro-hero-banner">
                    <h1 style="font-size: 26px; color: #000080; margin-bottom: 4px; font-weight: bold;">
                        ~*~ BENVENUTO NEL SITO PERSONALE DI MATTIA SCARPA ~*~
                    </h1>
                    <p style="font-size: 14px; font-style: italic; color: #555;">
                        Full-Stack Developer, Creative Technologist & IT Specialist • Venezia, Italia
                    </p>
                </div>

                <div class="retro-marquee">
                    *** ULTIME NOTIZIE: SITO OTTIMIZZATO PER NETSCAPE NAVIGATOR 3.0 GOLD (RISOLUZIONE RACCOMANDATA 800x600 A 256 COLORI) ***
                </div>

                <div style="display: flex; gap: 16px; margin: 16px 0; flex-wrap: wrap;">
                    <div style="flex: 2; min-width: 260px;">
                        <h2 style="color: #000080; font-size: 18px; border-bottom: 2px solid #000080; padding-bottom: 3px; margin-bottom: 8px;">
                            Benvenuto nella mia Rete Personale!
                        </h2>
                        <p style="margin-bottom: 10px; font-size: 13.5px; line-height: 1.5;">
                            Costruisco siti web, applicazioni iOS native e infrastrutture di telecomunicazione dove l'ingegneria pulita incontra il design funzionale. Con oltre 5 anni di esperienza attiva sul campo, guido progetti digitali dalla concezione tecnica fino all'infrastruttura di produzione.
                        </p>
                        <p style="margin-bottom: 12px; font-size: 13.5px; line-height: 1.5;">
                            Puoi esplorare le schede in alto per consultare la galleria dei <b>Progetti</b> completati, l'elenco delle <b>Competenze</b> tecniche o inviarmi una missiva telematica tramite la sezione <b>Contatti</b>.
                        </p>
                        
                        <div style="background: #e9e9e9; border: 1px inset #808080; padding: 10px; margin-top: 12px;">
                            <b>📌 Navigazione Rapida:</b>
                            <ul style="margin-left: 20px; margin-top: 5px;">
                                <li><a href="#" onclick="window.navRetro('progetti'); return false;" style="color: #0000ff;">Mostra tutti i Progetti realizzati</a></li>
                                <li><a href="#" onclick="window.navRetro('competenze'); return false;" style="color: #0000ff;">Visualizza lo Stack Tecnologico</a></li>
                                <li><a href="#" onclick="window.openApp('notepad'); return false;" style="color: #0000ff;">Apri il Curriculum.txt nel Blocco Note</a></li>
                                <li><a href="#" onclick="window.openApp('terminal'); return false;" style="color: #0000ff;">Avvia la Shell MS-DOS Prompt</a></li>
                            </ul>
                        </div>
                    </div>

                    <div style="flex: 1; min-width: 200px;">
                        <div class="retro-card">
                            <h3 style="font-size: 14px; font-weight: bold; color: #000080; margin-bottom: 6px;">Statistiche Web</h3>
                            <p style="font-size: 12px; margin-bottom: 4px;">Visitatori totali: <b>004821</b></p>
                            <p style="font-size: 12px; margin-bottom: 4px;">Stato Server: <span style="color: green; font-weight: bold;">ONLINE</span></p>
                            <p style="font-size: 12px; margin-bottom: 4px;">Anni Esperienza: <b>5+</b></p>
                            <p style="font-size: 12px; margin-bottom: 8px;">Progetti Conclusi: <b>40+</b></p>
                            <hr style="border: none; border-top: 1px solid #808080; margin: 6px 0;">
                            <div style="text-align: center; font-size: 11px; color: #666;">
                                <span>[ Netscape Verified ]</span><br>
                                <span>[ No Cookies Used ]</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (page === 'progetti') {
            let cardsHtml = '';
            projects.forEach(p => {
                const tagsHtml = (p.tags || []).map(t => `<span class="retro-tag">${t}</span>`).join(' ');
                const heroSrc = fixRetroAsset(p.hero);
                cardsHtml += `
                    <div class="retro-card" style="display: flex; gap: 14px; align-items: flex-start; flex-wrap: wrap;">
                        ${heroSrc ? `
                            <div style="width: 140px; flex-shrink: 0; cursor: pointer;" onclick="window.viewProjectDetail('${p.id}')">
                                <img src="${heroSrc}" alt="${p.title}" style="width: 140px; height: 95px; object-fit: cover; border: 2px inset #808080; background: #fff;" />
                            </div>
                        ` : ''}
                        <div style="flex: 1; min-width: 220px;">
                            <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px dotted #808080; padding-bottom: 4px; margin-bottom: 8px; flex-wrap: wrap; gap: 4px;">
                                <h3 style="font-size: 16px; font-weight: bold; color: #000080; cursor: pointer;" onclick="window.viewProjectDetail('${p.id}')">${p.title}</h3>
                                <span style="font-size: 11px; font-family: sans-serif; color: #555;">[ ${p.category} • ${p.year} ]</span>
                            </div>
                            <p style="font-size: 13px; line-height: 1.45; margin-bottom: 8px;">${p.shortDesc || ''}</p>
                            <div class="retro-badge-row">${tagsHtml}</div>
                            <div style="margin-top: 8px; display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                                ${(p.link && p.link !== '#') ? `<a href="${p.link}" target="_blank" class="btn-win95" style="font-size: 11px;">🌐 Visita Sito Live</a>` : ''}
                                <button class="retro-btn" onclick="window.viewProjectDetail('${p.id}')">🔍 Leggi Dettagli</button>
                            </div>
                        </div>
                    </div>
                `;
            });

            contentContainer.innerHTML = `
                <div style="margin-bottom: 14px;">
                    <h2 style="color: #000080; font-size: 20px; border-bottom: 2px solid #000080; padding-bottom: 3px;">
                        Archivio Lavori & Progetti Software
                    </h2>
                    <p style="font-size: 13px; color: #444; margin-top: 4px;">
                        Selezione di progetti reali sviluppati tra il 2021 e il 2026. Dati sincronizzati direttamente dal portfolio principale.
                    </p>
                </div>
                <div>${cardsHtml}</div>
            `;
        } else if (page === 'competenze') {
            contentContainer.innerHTML = `
                <h2 style="color: #000080; font-size: 20px; border-bottom: 2px solid #000080; padding-bottom: 3px; margin-bottom: 12px;">
                    Tavola Sinottica delle Competenze Tecniche
                </h2>

                <div class="retro-card">
                    <h3 style="font-size: 15px; color: #000080; margin-bottom: 6px;">1. Frontend & Mobile Engineering</h3>
                    <p style="font-size: 13px; margin-bottom: 8px;">Sviluppo di interfacce reattive ad alte prestazioni, SPA, SSR e sviluppo iOS nativo geospaziale.</p>
                    <table border="1" cellpadding="6" cellspacing="0" style="width: 100%; border-collapse: collapse; font-size: 12px; background: #fff;">
                        <tr style="background: #e0e0e0;"><th>Area</th><th>Tecnologie Chiave</th><th>Applicato in</th></tr>
                        <tr><td>Ecosistema React</td><td>React 18/19, Next.js, TypeScript, State Management</td><td>Tour Guide App, Portfolio Personale</td></tr>
                        <tr><td>Mobile & Mappe</td><td>Swift, MapKit JS, iOS Native, Face ID, Geofencing</td><td>Gestione Lavori Venezia (Whitelabel)</td></tr>
                        <tr><td>UI & Motion</td><td>Tailwind CSS, GSAP Motion, Vanilla CSS, A11y 60fps</td><td>Portfolio Personale, Progetti Sperimentali</td></tr>
                    </table>
                </div>

                <div class="retro-card">
                    <h3 style="font-size: 15px; color: #000080; margin-bottom: 6px;">2. Backend, Database & Cloud BaaS</h3>
                    <p style="font-size: 13px; margin-bottom: 8px;">Persistenza, sicurezza a livello di riga (RLS), microservizi asincroni e parsing dati.</p>
                    <table border="1" cellpadding="6" cellspacing="0" style="width: 100%; border-collapse: collapse; font-size: 12px; background: #fff;">
                        <tr style="background: #e0e0e0;"><th>Area</th><th>Tecnologie Chiave</th><th>Applicato in</th></tr>
                        <tr><td>Database Relazionale</td><td>Supabase, PostgreSQL, RLS Policies, Realtime Sync</td><td>Gestione Lavori Venezia</td></tr>
                        <tr><td>Microservizi & API</td><td>Node.js, Express, Python 3, FastAPI, Data Automation</td><td>Tool Geocoding Automatico Civici</td></tr>
                        <tr><td>Backend Tradizionale</td><td>PHP, Laravel MVC, Eloquent ORM, MySQL</td><td>Applicativi Web Enterprise</td></tr>
                    </table>
                </div>

                <div class="retro-card">
                    <h3 style="font-size: 15px; color: #000080; margin-bottom: 6px;">3. Enterprise IT, Virtualizzazione & DevOps</h3>
                    <table border="1" cellpadding="6" cellspacing="0" style="width: 100%; border-collapse: collapse; font-size: 12px; background: #fff;">
                        <tr style="background: #e0e0e0;"><th>Area</th><th>Tecnologie Chiave</th><th>Note di Produzione</th></tr>
                        <tr><td>Hypervisor</td><td>VMware ESXi, vSphere Client, VM Provisioning</td><td>Infrastruttura Navale Eyelink s.r.l.</td></tr>
                        <tr><td>Posta & Sicurezza</td><td>Libraesva ESG, MailStore Server, SPF/DKIM/DMARC</td><td>Policy & Continuità Aziendale</td></tr>
                        <tr><td>Container & Mesh</td><td>Docker Compose, Tailscale (WireGuard), Zero-Trust</td><td>Matrix VoIP Network</td></tr>
                    </table>
                </div>
            `;
        } else if (page === 'contatti') {
            contentContainer.innerHTML = `
                <h2 style="color: #000080; font-size: 20px; border-bottom: 2px solid #000080; padding-bottom: 3px; margin-bottom: 12px;">
                    Modulo Telematico di Contatto
                </h2>
                <div class="retro-card" style="max-width: 540px;">
                    <p style="font-size: 13px; margin-bottom: 12px;">
                        Per comunicazioni urgenti, richieste di preventivo o collaborazioni su software web e mobile:
                    </p>
                    <div style="margin-bottom: 10px;">
                        <label style="display: block; font-size: 12px; font-weight: bold; margin-bottom: 2px;">Indirizzo E-Mail Principale:</label>
                        <a href="mailto:info@mattiascarpa.it" style="font-family: monospace; font-size: 15px; color: #0000ff; text-decoration: underline;">info@mattiascarpa.it</a>
                    </div>
                    <div style="margin-bottom: 12px;">
                        <label style="display: block; font-size: 12px; font-weight: bold; margin-bottom: 2px;">Canali di Rete Ufficiali:</label>
                        <ul style="margin-left: 20px; font-size: 13px; line-height: 1.6;">
                            <li><a href="https://github.com/Tiume001" target="_blank" style="color: #0000ff;">GitHub Repository (Tiume001)</a></li>
                            <li><a href="https://www.linkedin.com/in/mattia-scarpa-a20a6b277/" target="_blank" style="color: #0000ff;">LinkedIn Professional Profile</a></li>
                            <li><a href="https://g.dev/mattiascarpa" target="_blank" style="color: #0000ff;">Google Developer Profile</a></li>
                        </ul>
                    </div>
                    <div style="background: #e8e8e8; border: 1px solid #999; padding: 10px;">
                        <span style="font-size: 11px; color: #444;">
                            💡 È anche possibile inviare una missiva diretta aprendo il client di posta predefinito cliccando sul link sottostante:
                        </span>
                        <div style="margin-top: 8px;">
                            <a href="mailto:info@mattiascarpa.it?subject=Contatto%20da%20Portfolio%201995" class="btn-win95">✉️ Componi Messaggio Elettronico</a>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    window.navRetro = function(page) {
        historyIdx++;
        netscapeHistory = netscapeHistory.slice(0, historyIdx);
        netscapeHistory.push(page);
        renderNetscapePage(page);
    };

    window.viewProjectDetail = function(projectId) {
        const projects = window.PORTFOLIO_PROJECTS || [];
        const p = projects.find(item => item.id === projectId);
        if (!p) return;

        const contentContainer = document.getElementById('netscapeContent');
        if (!contentContainer) return;

        if (netscapeUrlInput) {
            netscapeUrlInput.value = `https://retro.mattiascarpa.it/progetti/${projectId}`;
        }

        const tagsHtml = (p.tags || []).map(t => `<span class="retro-tag">${t}</span>`).join(' ');
        const heroSrc = fixRetroAsset(p.hero);
        const formattedDesc = fixRetroHtml(p.desc || p.shortDesc);

        let galleryHtml = '';
        if (p.gallery && p.gallery.length > 0) {
            galleryHtml = `
                <div style="margin-top: 20px; border-top: 1px dashed #808080; padding-top: 14px;">
                    <h4 style="font-size: 14px; font-weight: bold; color: #000080; margin-bottom: 8px;">🖼️ Galleria Fotografica del Progetto:</h4>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        ${p.gallery.map(img => `
                            <a href="${fixRetroAsset(img)}" target="_blank" title="Clicca per aprire a dimensione originale">
                                <img src="${fixRetroAsset(img)}" style="max-height: 100px; max-width: 160px; object-fit: cover; border: 2px inset #808080; background: #fff;" alt="Screenshot">
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        contentContainer.innerHTML = `
            <div style="margin-bottom: 12px;">
                <button class="retro-btn" onclick="window.navRetro('progetti')">⬅ Torna alla lista Progetti</button>
            </div>
            <div class="retro-card">
                <h2 style="font-size: 22px; color: #000080; margin-bottom: 4px;">${p.title}</h2>
                <div style="font-size: 12px; color: #555; margin-bottom: 10px;">
                    <b>Categoria:</b> ${p.category} | <b>Ruolo:</b> ${p.role} | <b>Anno:</b> ${p.year}
                </div>
                <div class="retro-badge-row">${tagsHtml}</div>
                <hr style="border: none; border-top: 1px solid #808080; margin: 12px 0;">
                
                ${heroSrc ? `
                    <div style="margin-bottom: 14px; text-align: center;">
                        <img src="${heroSrc}" alt="${p.title}" style="max-width: 100%; max-height: 280px; object-fit: contain; border: 2px inset #808080; background: #fff; margin: 0 auto;" />
                    </div>
                ` : ''}

                <div style="font-size: 13.5px; line-height: 1.5; color: #222;">
                    ${formattedDesc}
                </div>

                ${galleryHtml}

                ${(p.link && p.link !== '#') ? `
                    <div style="margin-top: 16px;">
                        <a href="${p.link}" target="_blank" class="btn-win95" style="font-size: 12px;">🌐 Visita il Sito Ufficiale</a>
                    </div>
                ` : ''}
            </div>
        `;
    };

    window.openApp = function(appId) {
        openWindow(appId);
    };

    // Tabs click
    netscapeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const page = tab.getAttribute('data-page');
            window.navRetro(page);
        });
    });

    // Netscape Toolbar buttons
    const btnBack = document.getElementById('netscapeBack');
    const btnFwd = document.getElementById('netscapeForward');
    const btnHome = document.getElementById('netscapeHome');
    const btnReload = document.getElementById('netscapeReload');

    if (btnBack) btnBack.addEventListener('click', () => {
        if (historyIdx > 0) {
            historyIdx--;
            renderNetscapePage(netscapeHistory[historyIdx]);
        }
    });

    if (btnFwd) btnFwd.addEventListener('click', () => {
        if (historyIdx < netscapeHistory.length - 1) {
            historyIdx++;
            renderNetscapePage(netscapeHistory[historyIdx]);
        }
    });

    if (btnHome) btnHome.addEventListener('click', () => {
        window.navRetro('home');
    });

    if (btnReload) btnReload.addEventListener('click', () => {
        const logo = document.querySelector('.netscape-n-logo');
        if (logo) {
            logo.style.transform = 'rotate(360deg)';
            setTimeout(() => { logo.style.transform = ''; }, 600);
        }
        renderNetscapePage(netscapeHistory[historyIdx]);
    });

    // Initial render Netscape
    renderNetscapePage('home');

    // --------------------------------------------------------------------------
    // 6. NOTEPAD CV POPULATION
    // --------------------------------------------------------------------------
    function populateNotepad() {
        const textarea = document.getElementById('notepadText');
        if (!textarea) return;

        textarea.value = 
`========================================================================
                      CURRICULUM VITAE ET STUDIORUM
                             MATTIA SCARPA
                  Full-Stack Developer & IT Specialist
                       Email: info@mattiascarpa.it
                       Dominio: https://mattiascarpa.it
                       GitHub: https://github.com/Tiume001
========================================================================

[ PROFILO PROFESSIONALE ]
Sviluppatore software e sistemista IT con solida esperienza nella creazione
di soluzioni complete: dallo sviluppo applicativo mobile (iOS Swift) e web
moderno (React/Next.js/Tailwind), fino all'orchestrazione di infrastrutture
di rete private (Docker, Tailscale, VMware ESXi) e sicurezza della posta.

------------------------------------------------------------------------
[ ESPERIENZE LAVORATIVE ]

* 2026 — IT Specialist
  Eyelink s.r.l. — Venezia
  - Progettazione e deploy dell'infrastruttura IT end-to-end per nave da
    crociera/trasporto marittimo.
  - Implementazione cluster server ESXi, networking isolato ad alta
    disponibilità e policy di sicurezza perimetrale.

* 2026 — Freelance Frontend Developer
  Tour Guide Business — Venezia
  - Sviluppo di una web app custom multilingua con login riservato.
  - Ascolto tracce audio offline, mappe interattive e brochure PDF.

* 2023 — 2026 — E-Waste Logistics & Internal Developer
  Re.Te. s.r.l. — Venezia
  - Gestione operativa della logistica marittima di smaltimento RAEE nei
    canali di Venezia.
  - Ideazione e sviluppo indipendente di un applicativo gestionale basato
    su mappa interattiva geospaziale e database per tracciare i cantieri.

* 2016 — Digitalization & Data Management
  Ca' Foscari University Library — Venezia
  - Digitalizzazione, catalogazione e migrazione nei sistemi archivistici
    di preziosi manoscritti storici.

------------------------------------------------------------------------
[ CERTIFICAZIONI UFFICIALI VERIFICATE ]

* Anthropic AI & Claude Certificates (2 Attestati ufficiali)
  - Sviluppo soluzioni con modelli LLM e prompt engineering avanzato.

* HackerRank Skill Certifications (3 Attestati)
  - Valutazioni tecniche ufficiali in JavaScript, CSS3 e Python.

* Aulab Hackademy Attestati (2 Attestati)
  - Percorso Full-Stack Web Development.

* Coursera Project Certificate (ID: HMND9HNN377T)
  - Certificato di sviluppo pratico autorizzato da Coursera Network.

------------------------------------------------------------------------
[ COMPETENZE TECNICHE PRINCIPALI ]

- Frontend: React 18/19, Next.js, TypeScript, Swift, MapKit JS, GSAP, CSS3
- Backend: Supabase, PostgreSQL, Node.js, Python, FastAPI, PHP, Laravel
- DevOps & IT: Docker, Tailscale, WireGuard, VMware ESXi, Libraesva ESG
- Strumenti: Git, GitHub CI/CD, Figma, Bash/Zsh Scripting

========================================================================
[ NOTA: È possibile scaricare il CV completo in formato PDF originale ]
Percorso file: ../assets/CV.pdf
========================================================================
`;
    }
    populateNotepad();

    // --------------------------------------------------------------------------
    // 7. MS-DOS PROMPT TERMINAL
    // --------------------------------------------------------------------------
    const dosInput = document.getElementById('dosInput');
    const dosOutput = document.getElementById('dosOutput');
    const dosHistory = [];
    let dosHistoryIndex = -1;

    function appendDosOutput(text) {
        if (!dosOutput) return;
        dosOutput.innerHTML += text + '\n';
        const term = document.getElementById('dosTerminal');
        if (term) term.scrollTop = term.scrollHeight;
    }

    if (dosInput) {
        dosInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const rawCmd = dosInput.value.trim();
                const cmd = rawCmd.toLowerCase();
                
                appendDosOutput(`C:\\MATTIA> ${rawCmd}`);
                if (rawCmd) dosHistory.push(rawCmd);
                dosHistoryIndex = dosHistory.length;
                dosInput.value = '';

                switch(cmd) {
                    case 'help':
                        appendDosOutput(`Comandi disponibili:
  HELP       - Mostra questa schermata informativa
  DIR        - Elenca i file e le cartelle sul volume
  TYPE       - Mostra il contenuto di un file (es: TYPE CURRICULUM.TXT)
  NETSCAPE   - Avvia il browser web Netscape Navigator
  NOTEPAD    - Avvia l'editor Blocco Note
  PROJECTS   - Elenca i progetti software sviluppati
  SKILLS     - Elenca lo stack delle competenze tecniche
  CONTACT    - Mostra le coordinate telematiche
  2026       - Ritorna al portfolio moderno
  VER        - Mostra la versione del sistema operativo DOS
  CLS        - Pulisce lo schermo del terminale
  EXIT       - Chiude la sessione MS-DOS Prompt`);
                        break;
                    case 'dir':
                        appendDosOutput(` Volume in drive C has no label.
 Volume Serial Number is 1995-2026
 Directory of C:\\MATTIA

.              <DIR>        04-10-95  12:00p
..             <DIR>        04-10-95  12:00p
NETSCAPE EXE       1,428,512 04-10-95   3:15p
NOTEPAD  EXE         245,760 04-10-95   9:00a
CURRICUL TXT          12,480 04-10-95   4:20p
PROGETTI       <DIR>        04-10-95   1:10p
2026     BAT             128 04-10-95   6:30p
         4 file(s)      1,686,880 bytes
         3 dir(s)     428,512,000 bytes free`);
                        break;
                    case 'type curriculum.txt':
                    case 'type curricul.txt':
                        appendDosOutput(document.getElementById('notepadText') ? document.getElementById('notepadText').value : 'File non trovato.');
                        break;
                    case 'netscape':
                        appendDosOutput('Avvio di Netscape Navigator in corso...');
                        openWindow('netscape');
                        break;
                    case 'notepad':
                        appendDosOutput('Avvio del Blocco Note in corso...');
                        openWindow('notepad');
                        break;
                    case 'projects':
                        appendDosOutput(`Progetti in archivio:
  1. GESTIONE LAVORI VENEZIA  (iOS Swift, MapKit JS, Supabase)
  2. GUIDA TURISTICA APP      (Web App offline, Audio, PDF)
  3. MATRIX VOIP NETWORK      (Docker, PBX, Tailscale, Element)
  4. VECCHIO PORTFOLIO        (HTML, CSS, JS, Firebase)
Digita 'NETSCAPE' per visualizzare i case study completi con immagini.`);
                        break;
                    case 'skills':
                        appendDosOutput(`Competenze Core:
  - Frontend: React 19, Next.js, Swift, MapKit, Tailwind, GSAP
  - Backend:  PostgreSQL, Supabase, Node.js, Python, FastAPI
  - DevOps:   Docker, Tailscale Mesh, VMware ESXi, MailStore`);
                        break;
                    case 'contact':
                        appendDosOutput(`Coordinate Telematiche:
  E-Mail: info@mattiascarpa.it
  GitHub: https://github.com/Tiume001
  Web:    https://mattiascarpa.it`);
                        break;
                    case 'ver':
                        appendDosOutput('MS-DOS Version 6.22 (Windows 95 Shell Emulation)');
                        break;
                    case 'cls':
                        if (dosOutput) dosOutput.innerHTML = '';
                        break;
                    case 'exit':
                        closeWindow('terminal');
                        break;
                    case '2026':
                    case 'reboot':
                        appendDosOutput('Ritorno al portfolio moderno...');
                        setTimeout(() => { window.location.href = '../'; }, 400);
                        break;
                    case '':
                        break;
                    default:
                        appendDosOutput(`Comando o nome file non valido: '${rawCmd}'. Digita 'HELP' per la lista.`);
                        break;
                }
            } else if (e.key === 'ArrowUp') {
                if (dosHistoryIndex > 0) {
                    dosHistoryIndex--;
                    dosInput.value = dosHistory[dosHistoryIndex];
                }
            } else if (e.key === 'ArrowDown') {
                if (dosHistoryIndex < dosHistory.length - 1) {
                    dosHistoryIndex++;
                    dosInput.value = dosHistory[dosHistoryIndex];
                } else {
                    dosHistoryIndex = dosHistory.length;
                    dosInput.value = '';
                }
            }
        });
    }

    // --------------------------------------------------------------------------
    // 8. FOLDER PROGETTI EXPLORER POPULATION
    // --------------------------------------------------------------------------
    function populateProjectsFolder() {
        const container = document.getElementById('folderExplorerGrid');
        if (!container) return;
        const projects = window.PORTFOLIO_PROJECTS || [];

        container.innerHTML = '';
        projects.forEach(p => {
            const item = document.createElement('div');
            item.className = 'folder-item';
            item.innerHTML = `
                <div class="folder-item-icon">📁</div>
                <div class="folder-item-label">${p.title}</div>
            `;
            item.addEventListener('click', () => {
                openWindow('netscape');
                window.viewProjectDetail(p.id);
            });
            container.appendChild(item);
        });
    }
    populateProjectsFolder();

    // --------------------------------------------------------------------------
    // 9. INITIAL RENDERING & RESIZE LISTENER
    // --------------------------------------------------------------------------
    renderWindows();
    renderTaskbar();

    window.addEventListener('resize', () => {
        renderWindows();
        renderTaskbar();
    });
});
