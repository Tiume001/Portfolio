# Portfolio Personale

Questo è il mio sito portfolio personale, progettato e sviluppato interamente a mano con **HTML, CSS e Vanilla JavaScript**. L'obiettivo primario di questo progetto era creare un'esperienza utente immersiva, premium e fluida ad altissime prestazioni, spingendo al limite le animazioni basate sullo scroll senza sacrificare i framerate.

## 🚀 Tecnologie e Librerie Utilizzate

*   **HTML5 & CSS3 Vanilla**: Nessun framework CSS ingombrante. Layout e stili realizzati su misura con ampio utilizzo di Flexbox/Grid, CSS Variables, `clamp()` per una tipografia fluida e Glassmorphism (`backdrop-filter`).
*   **Vanilla JS**: Logica dell'app e manipolazione del DOM gestite in modo nativo per la massima leggerezza.
*   **GSAP (GreenSock Animation Platform)**: Utilizzato in modo massiccio per gestire animazioni complesse.
*   **GSAP ScrollTrigger**: Gestisce il pinning, la sezione dedicata allo scorrimento orizzontale, gli effetti di parallasse sulle immagini di copertina e i "reveal" dei testi al passaggio dello scroll.
*   **Lenis Smooth Scroll**: Implementato per restituire un feeling di scroll morbido, continuo e identico su tutti i browser e dispositivi.

## ✨ Architettura & Funzionalità Chiave

### 1. Sincronizzazione Avanzata GSAP + Lenis
Il codice è progettato per risolvere definitivamente i classici problemi di "jitter" (scatti) e desincronizzazione causati dal conflitto tra l'interpolazione dello scroll e le animazioni. Disattivando il loop interno nativo di Lenis in favore del ticker globale di GSAP (`gsap.ticker.add`) e rimuovendo ritardi negli *scrub*, il sito garantisce uno scorrimento solidissimo e privo di latenza (no-lag) persino su monitor da gaming ad alto refresh rate.

### 2. Esperienza Premium (Aesthetic & Feel)
Il design ruota attorno a un elegante stile "Dark Mode", esaltato da font di carattere (Space Grotesk, Syne). È presente un effetto "Noise" statico per conferire un tocco di grana organica e fotografica, progettato appositamente per pesare zero sulla GPU. Un cursore personalizzato circolare segue l'utente, espandendosi, contraendosi o sparendo a seconda dell'elemento con cui si sta interagendo.

### 3. Modale Dinamica dei Progetti (Overlay)
Piuttosto che richiedere caricamenti di pagine multiple, i case study si aprono fulmineamente all'interno di un overlay. Questo overlay gode di:
*   Un'istanza *indipendente e temporanea* di Lenis creata al volo per scorrere i contenuti interni.
*   Blocco intelligente dello scroll della pagina sottostante (`lenisInstance.stop()`).
*   Un'attenta pulizia della memoria: alla chiusura della modale, il loop d'animazione interno viene distrutto rigorosamente (`gsap.ticker.remove()`) per scongiurare qualsiasi Memory Leak o calo di prestazioni prolungato.
*   Iniezione dinamica dei contenuti (titoli, descrizioni, tag e galleria fotografica) direttamente da un array JSON nel Javascript.

### 4. Ottimizzazione Estrema delle Prestazioni
Per garantire che le animazioni massicce non soffocassero la scheda grafica (VRAM):
*   Tutti i movimenti sono confinati a proprietà CSS composite-ready come `transform` e `opacity`.
*   È stata effettuata una pulizia di tutte le clausole `will-change` superflue che portano i browser a sovraccaricare la memoria, delegando totalmente a GSAP la gestione dell'accelerazione hardware on-demand.

## 📱 Mobile-First & Responsività
La fluidità orizzontale e verticale è garantita anche su tablet e smartphone. Le logiche di ricalcolo del track dei progetti aggiornano al volo il fine-corsa. Per dispositivi con schermi stretti (mobile), le card assumono formati intelligenti (es. proporzione `4/3`) e larghezze ristrette per invitare naturalmente al tocco e allo scorrimento orizzontale, disabilitando le animazioni del cursore personalizzato non necessarie per il tocco.

## 🛠 Come Avviare il Progetto
Trattandosi di codice nativo, non c'è bisogno di processi di build come Webpack, Vite o Node.js. 
Basta lanciare un server locale basilare (es. estensione *Live Server* su VSCode) o aprire direttamente il file `index.html` nel browser per vedere il sito in funzione!
Per modificare i dati dei progetti nel portfolio, è sufficiente aggiornare le informazioni dentro l'array `projectsData` presente in fondo al file `script.js`.
