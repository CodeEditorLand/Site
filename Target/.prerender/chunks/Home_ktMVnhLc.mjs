const logo = "Land";
const nav$1 = {"features":"Funciones","download":"Descargar","docs":"Documentacion","blog":"Blog","contributing":"Contribuir","dashboard":"Panel","github":"GitHub"};
const actions = {"signIn":"Iniciar sesion","signUp":"Registrarse","editorPortal":"Portal del editor","getStarted":"Obtener Land","logout":"Cerrar sesion","loading":"Cargando…"};
const user = {"avatarAlt":"Menu de usuario","menu":{"dashboard":"Panel de control","account":"Cuenta","signOut":"Cerrar sesion"}};
const EsHeader = {
  logo,
  nav: nav$1,
  actions,
  user,
};

const Header = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	actions,
	default: EsHeader,
	logo,
	nav: nav$1,
	user
}, Symbol.toStringTag, { value: 'Module' }));

const Blog = {
  "meta.title": "Blog | Code Editor Land",
  "meta.description": "Architektur-Einblicke, Release-Notizen und Neuigkeiten.",
  "page.title": "Blog",
  "page.subtitle": "Architektur, Releases und der Weg nach vorne.",
  "card.readMore": "Mehr lesen",
  "card.minRead": "Min. Lesezeit",
  "empty.title": "Noch keine Beiträge",
  "empty.subtitle": "Schauen Sie bald wieder vorbei für Updates.",
};

const Blog$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: Blog
}, Symbol.toStringTag, { value: 'Module' }));

const features = {"badge":"Features","item":{"designTokens":{"description":"Hören Sie auf, VS Code ein Gigabyte RAM zu übergeben, nur um eine Datei zu öffnen.\n\nLands Rust-Kern mit gRPC IPC antwortet in Mikrosekunden. Auch mit Hunderten offener Dateien.","title":"Kein Lag, nie"},"componentLibrary":{"description":"Ihre gesamte VS Code-Erweiterungsbibliothek funktioniert sofort.\n\nDer Cocoon-Host spiegelt die vollständige VS Code API-Oberfläche. Nichts muss neu geschrieben werden.","title":"Ihre Erweiterungen, unverändert"},"documentation":{"description":"Effect-TS bietet typisierte Services, strukturierte Nebenläufigkeit und nachverfolgbare Fehler.\n\nFehler werden zur Compile-Zeit erkannt, nicht um 3 Uhr nachts.","title":"Typsicher von Anfang bis Ende"},"versionControl":{"description":"Ein Codebase kompiliert zu vollständig nativen Apps für macOS, Windows und Linux via Tauri.\n\nVeröffentlichen Sie für alle drei Plattformen mit einem einzigen Befehl.","title":"Ein Build, jede Plattform"},"collaboration":{"description":"CC0 Public Domain. Nutzen, forken, ausliefern, sogar verkaufen.\n\nNLnet-finanziert und vollständig in der Öffentlichkeit gebaut.","title":"Kostenlos für immer, ohne Bedingungen"},"cicdIntegration":{"description":"Rust, Tauri, Effect-TS und Biome bilden einen Stack, der für Korrektheit und Entwicklergeschwindigkeit gewählt wurde.\n\nVertraute Tools, keine Kompromisse.","title":"Erstklassige Toolchain"}},"subtitle":"Sechs Gründe, warum Land schneller, sicherer und offener ist als jeder Electron-basierte Editor.","title":"Anders im Design. Messbar besser."};
const hero = {"badge":"Native Geschwindigkeit Kein Electron CC0","subtitle":"Hören Sie auf, VS Code ein Gigabyte RAM zu übergeben.\n\nLand ist mit Rust, Tauri und Effect-TS gebaut. Nativ schnell. Kein Electron. Für immer frei.","title":"Der Code-Editor, den Sie verdient haben","titleHighlight":"Land","atScale":"beginnt hier","cta":{"primary":"Herunterladen","secondary":"Mehr erfahren"},"scene":{"description":"Animierte Architektur-Visualisierung","hub":"Kernarchitektur","components":{"button":"Rust-Kern","colors":"Tauri UI","typography":"Effect-TS-Dienste","components":"gRPC IPC","spacing":"Extension Host","icons":"Cross-Platform","docs":"VS Code API","versions":"Open Source CC0"},"cards":{"1":{"title":"Rust-Kern","tooltip":["Mountain implements Common traits in Rust via Tauri.","Handles windows, files, terminals, process control, and gRPC IPC through the Vine protocol.","The ActionEffect system treats every operation as declarative data dispatched across layers."]},"2":{"title":"Tauri UI","tooltip":["Sky renders the editor interface in the OS WebView via Astro and routes Tauri events through SkyBridge to VS Code workbench APIs.","Multiple workbench layouts adapt the UI layer to different runtimes: browser proxy, Mountain-native, or Electron."]},"3":{"title":"Effect-TS-Dienste","tooltip":["Cocoon and Wind use Effect-TS for typed errors, scoped resources, cancellation, and supervised concurrency.","Wind composes workbench services into Layer stacks that make dependency paths traceable at compile time - one stack per runtime target."]},"4":{"title":"gRPC IPC","tooltip":["Vine defines the gRPC protocol layer between Mountain, Cocoon, Air, and Grove.","Proto definitions currently live in Mountain and Cocoon while Vine consolidates.","Every gRPC call is a typed contract - the wire format is the interface."]},"5":{"title":"Extension Host","tooltip":["Cocoon runs VS Code extensions via dual-track architecture:","Track A loads unmodified extHost sources for maximum compatibility,","Track B routes I/O-heavy operations to Mountain through gRPC.","Effect-TS services implement the vscode API shim across both tracks."]},"6":{"title":"Cross-Platform","tooltip":["Tauri bundles to native macOS, Windows, and Linux packages using the OS WebView - no embedded Chromium.","Per-platform build configuration and binary management keep cross-compilation paths explicit rather than hidden in installer scripts."]},"7":{"title":"VS Code API","tooltip":["Cocoon implements the VS Code API surface through Effect-TS services: commands, workspace, terminals, webviews, language providers, and diagnostics.","The dual-track architecture preserves compatibility with published extension APIs while routing through native services."]},"8":{"title":"Open Source CC0","tooltip":["All 15 element repos are under CC0 1.0 Universal public domain.","No attribution required, no compliance restrictions.","Funded by NLnet NGI0 Commons Fund."]}}}};
const nav = {"docs":"Dokumentation","downloads":"Herunterladen","features":"Funktionen","github":"GitHub"};
const pricing = {"subtitle":"Code Editor Land ist komplett kostenlos.\n\nKeine Stufen, keine Abonnements, keine Einschränkungen.","labels":{"monthly":"Monatlich","yearly":"Jährlich","savings":"(Bis zu 20% sparen)","popular":"Beliebteste","perMonth":"/Monat","perYear":"/Jahr","free":"Kostenlos"},"toggle":{"toMonthly":"Zu {{label}} Abrechnung wechseln","toYearly":"Zu {{label}} Abrechnung wechseln"},"tiers":{"free":{"name":"Community","description":"Für jeden.\n\nVolle Editor-Funktionen, völlig kostenlos.","features":{"1":"Volle VS Code-Kompatibilität","2":"Alle Erweiterungen unterstützt","3":"Native Rust-Performance","4":"Cross-Platform (macOS, Windows, Linux)","5":"Effect-TS typsichere UI","6":"gRPC-basierte Architektur","7":"Open Source (CC0-Lizenz)"},"button":"Jetzt herunterladen"}},"title":"Kostenlos für immer, Open Source","badge":"Preise"};
const testimonials = {"quote":{"1":"Eine leistungsorientierte, offene Alternative.\n\nLand ist genau das, was VS Code brauchte.\n\nEs ist unglaublich schnell.","2":"Die Effect-TS-Architektur ist wunderschön zu bearbeiten.\n\nDie Typsicherheit fängt Fehler ab, bevor sie passieren.","3":"Meine bestehenden Erweiterungen ohne Änderungen auszuführen ist bahnbrechend.\n\nDie Kompatibilität ist beeindruckend.","4":"Endlich ein Editor, der meine Systemressourcen respektiert.\n\nKein Electron-Speicheroverhead mehr.","5":"Das Open-Source-Engagement bedeutet, dass ich beitragen und anpassen kann.\n\nDas ist der Editor, auf den ich gewartet habe.","6":"Die gRPC-basierte Architektur ist ein Meisterwerk des Systemdesigns.\n\nLand ist die Zukunft der Desktop-Editoren."},"subtitle":"Community-Stimmen zur Zukunft der Code-Bearbeitung.","title":"Was Entwickler sagen","badge":"Erfahrungsberichte","attribution":"Community-Feedback","attributionNote":"Repräsentatives Community-Mitglied"};
const roadmap = {"title":"Roadmap und was Sie erwarten können","subtitle":"Finanziert durch den NLnet NGI0 Commons Fund.\n\nIn der Öffentlichkeit gebaut, für immer frei, keine Überraschungen auf der Roadmap.","tiers":{"current":{"name":"Aktiv in Entwicklung","description":"Die fünfzehn Kernelemente befinden sich in aktiver Entwicklung. Jedes ist ein eigenständiges Repository, das Sie heute inspizieren und zu dem Sie beitragen können.","features":{"mountain":"Mountain ⛰️\nRust/Tauri natives Backend","cocoon":"Cocoon 🦋\nVS Code Extension Host via Effect-TS","wind":"Wind 🍃\nWorkbench-Neuimplementierung","sky":"Sky 🌌\nEditor-Interface-Rendering","air":"Air 🪁\nUpdate-Daemon und Krypto-Signierung","echo":"Echo 📣\nWork-Stealing-Task-Scheduler","common":"Common 👨🏻‍🏭\nAbstract Rust foundation, typed effects, zero concrete implementations","grove":"Grove 🌳\nWASMtime sandbox, capability-based extension isolation","maintain":"Maintain 💪🏻\nBuild orchestrator, Rhai scripting, TOML/JSON5 config","mist":"Mist 🌫️\nDNS sandbox, all *.land.playform.cloud traffic resolves locally","output":"Output ⚫\nCompilation pipeline, deterministic checksummed bundles","rest":"Rest ⛱️\nTypeScript compiler in Rust + OXC, 2-3× faster than esbuild","sidecar":"SideCar ⚙️\nCross-platform Node.js binary distributor per target triple","vine":"Vine 🌿\ngRPC backbone, contract-first .proto definitions","worker":"Worker 🍩\nService Worker, offline support, AES-GCM encrypted auth"},"button":"Auf GitHub ansehen"},"next":{"name":"Als Nächstes","description":"Erweiterungs-Ökosystem-Feinschliff und erste stabile Veröffentlichung auf allen drei Plattformen.","features":{"1":"Hochwertige VS Code-Erweiterungskompatibilität","2":"Cross-Platform-Installer und Auto-Update","3":"gRPC-IPC-Protokollfinalisierung","4":"Einstellungssync und cloud-optionales Portal"},"button":"Fortschritt verfolgen"},"future":{"name":"Langfristige Vision","description":"Land wird zur führenden plattformübergreifenden nativen IDE. Vollständige Plugin-Sandbox, WASM-Erweiterungen und native KI-Integration.","features":{"1":"Natives mobiles Bearbeiten (iOS, Android)","2":"Kollaboratives Echtzeit-Bearbeiten","3":"KI-gestützte Entwicklungswerkzeuge","4":"Plugin-Marktplatz und Ökosystem"},"button":"Mehr erfahren"}}};
const architecture = {"title":"Architektur","subtitle":"Land ersetzt VS Codes Electron-Stack durch eine modulare, hochleistungsfähige Architektur.\n\nJedes Element ist ein eigenständiges Repository.","mountain":{"description":"Verwaltet Fenster-, Dateisystem- und Prozess-Lebenszyklus.\n\nDas native Rust/Tauri-Backend, das Electrons Hauptprozess ersetzt.","subtitle":"Nativer Prozessmanager"},"cocoon":{"description":"Führt VS Code-Erweiterungen über Effect-TS mit hochwertiger API-Kompatibilität aus.\n\nKeine Änderungen an bestehenden Erweiterungen erforderlich.","subtitle":"Erweiterungshost ohne Neuschreibung"},"wind":{"description":"Neuimplementierung des VS Code Workbench.\n\nBietet die Editor-Shell, Panels, Seitenleisten und Aktivitätsleiste.","subtitle":"Vollständige Workbench-Shell"},"sky":{"description":"Rendert die Editor-Oberfläche mit Astro-Komponenten.\n\nVerwaltet Themes, Layouts und die visuelle Präsentationsschicht.","subtitle":"Themes und Layout-Schicht"},"air":{"description":"Hintergrunddaemon für automatische Updates, Downloads und kryptografische Signierung.\n\nHält Land still auf dem neuesten Stand.","subtitle":"Stille Updates, immer signiert"},"echo":{"description":"Hochleistungs-Work-Stealing-Executor.\n\nPlant und verteilt Aufgaben auf Kerne für maximalen Durchsatz.","subtitle":"Jedes CPU-Kern wird genutzt"},"heading":"Wie die Architektur funktioniert","intro":"Land ersetzt Electrons VS Code-Stack Element für Element."};
const DeHome = {
  features,
  hero,
  nav,
  pricing,
  testimonials,
  roadmap,
  architecture,
};

const Home = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	architecture,
	default: DeHome,
	features,
	hero,
	nav,
	pricing,
	roadmap,
	testimonials
}, Symbol.toStringTag, { value: 'Module' }));

export { Blog$1 as B, DeHome as D, EsHeader as E, Header as H, Home as a };
