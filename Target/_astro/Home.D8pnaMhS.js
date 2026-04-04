const e={badge:"Funktionen",item:{designTokens:{description:`Natives Rust-Backend mit gRPC IPC stellt sicher, dass jeder Vorgang schnell, reaktionsschnell und zuverlässig ist.

Kein Electron-Overhead.`,title:"Performance zuerst"},componentLibrary:{description:`Führen Sie Ihre bestehenden VS Code-Erweiterungen mit hoher Wiedergabetreue über den Cocoon-Extension-Host aus.

Keine Änderungen erforderlich.`,title:"VS Code-Kompatibilität"},documentation:{description:"Native Effect-TS-UI-Dienste bieten Typsicherheit, strukturierte Nebenläufigkeit und hervorragendes Fehlerhandling.",title:"Effect-TS-Architektur"},versionControl:{description:`Eine Codebasis, native Deployments für macOS, Windows und Linux mit Tauri.

Einmal schreiben, überall ausführen.`,title:"Cross-Platform"},collaboration:{description:`Völlig frei zu nutzen, zu verändern und zu verbreiten.

Lizenziert unter Creative Commons CC0.

Keine Einschränkungen.`,title:"Open Source"},cicdIntegration:{description:`Aufgebaut auf bewährten Open-Source-Technologien:

Rust, Tauri, Effect-TS und die VS Code-Plattform.`,title:"Moderne Werkzeuge"}},subtitle:"Entdecken Sie, was Code Editor Land zum fortschrittlichsten verfügbaren Code-Editor macht.",title:"Für Performance gebaut, für Entwickler gestaltet"},t={badge:"Neu: Effect-TS-Architektur",subtitle:`Ein blitzschneller, typsicherer Editor, erstellt mit Rust, Tauri und Effect-TS.

Erleben Sie den Editor, der VS Code für die moderne Ära neu denkt.`,title:"Die Zukunft der Code-Bearbeitung",titleHighlight:"Land",atScale:"beginnt hier",cta:{primary:"Herunterladen",secondary:"Mehr erfahren"},scene:{description:"Animierte Architektur-Visualisierung",hub:"Kernarchitektur",components:{button:"Rust-Kern",colors:"Tauri UI",typography:"Effect-TS-Dienste",components:"gRPC IPC",spacing:"Extension Host",icons:"Cross-Platform",docs:"VS Code API",versions:"Open Source CC0"}}},n={docs:"Dokumentation",downloads:"Herunterladen",features:"Funktionen",github:"GitHub"},i={subtitle:`Code Editor Land ist komplett kostenlos.

Keine Stufen, keine Abonnements, keine Einschränkungen.`,labels:{monthly:"Monatlich",yearly:"Jährlich",savings:"(Bis zu 20% sparen)",popular:"Beliebteste",perMonth:"/Monat",perYear:"/Jahr",free:"Kostenlos"},toggle:{toMonthly:"Zu {{label}} Abrechnung wechseln",toYearly:"Zu {{label}} Abrechnung wechseln"},tiers:{free:{name:"Community",description:`Für jeden.

Volle Editor-Funktionen, völlig kostenlos.`,features:{1:"Volle VS Code-Kompatibilität",2:"Alle Erweiterungen unterstützt",3:"Native Rust-Performance",4:"Cross-Platform (macOS, Windows, Linux)",5:"Effect-TS typsichere UI",6:"gRPC-basierte Architektur",7:"Open Source (CC0-Lizenz)"},button:"Jetzt herunterladen"}},title:"Kostenlos für immer, Open Source",badge:"Preise"},r={quote:{1:`Eine leistungsorientierte, offene Alternative.

Land ist genau das, was VS Code brauchte.

Es ist unglaublich schnell.`,2:`Die Effect-TS-Architektur ist wunderschön zu bearbeiten.

Die Typsicherheit fängt Fehler ab, bevor sie passieren.`,3:`Meine bestehenden Erweiterungen ohne Änderungen auszuführen ist bahnbrechend.

Die Kompatibilität ist beeindruckend.`,4:`Endlich ein Editor, der meine Systemressourcen respektiert.

Kein Electron-Speicheroverhead mehr.`,5:`Das Open-Source-Engagement bedeutet, dass ich beitragen und anpassen kann.

Das ist der Editor, auf den ich gewartet habe.`,6:`Die gRPC-basierte Architektur ist ein Meisterwerk des Systemdesigns.

Land ist die Zukunft der Desktop-Editoren.`},subtitle:"Community-Stimmen zur Zukunft der Code-Bearbeitung.",title:"Was Entwickler sagen",badge:"Erfahrungsberichte",attribution:"Community-Feedback",attributionNote:"Repräsentatives Community-Mitglied"},s={title:"Roadmap & Erwartungen",subtitle:`Finanziert durch den NGI0 Commons Fund.

Open Source, kostenlos für immer, öffentlich entwickelt.`,tiers:{current:{name:"Aktuelle Phase",description:`Grundlagen und Kern-Editor-Gerüst.

Aktive Entwicklung.`,features:{mountain:`Mountain ⛰️
Rust/Tauri natives Backend`,cocoon:`Cocoon 🦋
VS Code Extension Host via Effect-TS`,wind:`Wind 🍃
Workbench-Neuimplementierung`,sky:`Sky 🌌
Editor-Interface-Rendering`,air:`Air 🪁
Update-Daemon und Krypto-Signierung`,echo:`Echo 📣
Work-Stealing-Task-Scheduler`,common:`Common 👨🏻‍🏭
Abstract Rust foundation, typed effects, zero concrete implementations`,grove:`Grove 🌳
WASMtime sandbox, capability-based extension isolation`,maintain:`Maintain 💪🏻
Build orchestrator, Rhai scripting, TOML/JSON5 config`,mist:`Mist 🌫️
DNS sandbox, all *.editor.land traffic resolves locally`,output:`Output ⚫
Compilation pipeline, deterministic checksummed bundles`,rest:`Rest ⛱️
TypeScript compiler in Rust + OXC, 2–3× faster than esbuild`,sidecar:`SideCar ⚙️
Cross-platform Node.js binary distributor per target triple`,vine:`Vine 🌿
gRPC backbone, contract-first .proto definitions`,worker:`Worker 🍩
Service Worker, offline support, AES-GCM encrypted auth`},button:"Auf GitHub ansehen"},next:{name:"Nächster Meilenstein",description:"Erweiterungs-Ökosystem und Plattformstabilität.",features:{1:"Hochwertige VS Code-Erweiterungskompatibilität",2:"Cross-Platform-Installer und Auto-Update",3:"gRPC-IPC-Protokollfinalisierung",4:"Einstellungssync und cloud-optionales Portal"},button:"Fortschritt verfolgen"},future:{name:"Langfristige Vision",description:"Voll ausgestatteter Editor als Ersatz für Electron-basierte Tools.",features:{1:"Natives mobiles Bearbeiten (iOS, Android)",2:"Kollaboratives Echtzeit-Bearbeiten",3:"KI-gestützte Entwicklungswerkzeuge",4:"Plugin-Marktplatz und Ökosystem"},button:"Mehr erfahren"}}},o={title:"Architektur",subtitle:`Land ersetzt VS Codes Electron-Stack durch eine modulare, hochleistungsfähige Architektur.

Jedes Element ist ein eigenständiges Repository.`,mountain:{description:`Verwaltet Fenster-, Dateisystem- und Prozess-Lebenszyklus.

Das native Rust/Tauri-Backend, das Electrons Hauptprozess ersetzt.`,subtitle:"Rust/Tauri natives Backend"},cocoon:{description:`Führt VS Code-Erweiterungen über Effect-TS mit hochwertiger API-Kompatibilität aus.

Keine Änderungen an bestehenden Erweiterungen erforderlich.`,subtitle:"TypeScript Extension Host"},wind:{description:`Neuimplementierung des VS Code Workbench.

Bietet die Editor-Shell, Panels, Seitenleisten und Aktivitätsleiste.`,subtitle:"TypeScript UI-Dienst"},sky:{description:`Rendert die Editor-Oberfläche mit Astro-Komponenten.

Verwaltet Themes, Layouts und die visuelle Präsentationsschicht.`,subtitle:"Astro UI-Komponente"},air:{description:`Hintergrunddaemon für automatische Updates, Downloads und kryptografische Signierung.

Hält Land still auf dem neuesten Stand.`,subtitle:"Rust-Hintergrunddaemon"},echo:{description:`Hochleistungs-Work-Stealing-Executor.

Plant und verteilt Aufgaben auf Kerne für maximalen Durchsatz.`,subtitle:"Rust Task Scheduler"}},a={features:e,hero:t,nav:n,pricing:i,testimonials:r,roadmap:s,architecture:o};export{o as architecture,a as default,e as features,t as hero,n as nav,i as pricing,s as roadmap,r as testimonials};
