const e={badge:"Fonctionnalités",item:{designTokens:{description:`Le backend Rust natif avec gRPC IPC garantit que chaque opération est rapide, réactive et fiable.

Sans la lourdeur d'Electron.`,title:"Performance avant tout"},componentLibrary:{description:`Exécutez vos extensions VS Code existantes avec haute fidélité via l'hôte d'extension Cocoon.

Aucune modification nécessaire.`,title:"Compatibilité VS Code"},documentation:{description:"Les services UI natifs Effect-TS offrent la sécurité des types, la concurrence structurée et une excellente gestion des erreurs.",title:"Architecture Effect-TS"},versionControl:{description:`Une base de code, des déploiements natifs pour macOS, Windows et Linux avec Tauri.

Écrivez une fois, exécutez partout.`,title:"Multi-plateforme"},collaboration:{description:`Entièrement libre d'utilisation, de modification et de distribution.

Licencié sous Creative Commons CC0.

Aucune restriction.`,title:"Open Source"},cicdIntegration:{description:`Construit sur des technologies open source éprouvées:

Rust, Tauri, Effect-TS et la plateforme VS Code.`,title:"Outils modernes"}},subtitle:"Découvrez ce qui fait de Code Editor Land l'éditeur de code le plus avancé disponible.",title:"Conçu pour la performance, pensé pour les développeurs"},t={badge:"Nouveau : Architecture Effect-TS",subtitle:`Un éditeur ultra-rapide et type-safe construit avec Rust, Tauri et Effect-TS.

Découvrez l'éditeur qui réinvente VS Code pour l'ère moderne.`,title:"L'avenir de l'édition de code",titleHighlight:"Land",atScale:"commence ici",cta:{primary:"Télécharger",secondary:"En savoir plus"},scene:{description:"Visualisation animée de l'architecture",hub:"Architecture centrale",components:{button:"Noyau Rust",colors:"Tauri UI",typography:"Services Effect-TS",components:"gRPC IPC",spacing:"Extension Host",icons:"Multi-plateforme",docs:"VS Code API",versions:"Open Source CC0"}}},n={docs:"Documentation",downloads:"Télécharger",features:"Fonctionnalités",github:"GitHub"},i={subtitle:`Code Editor Land est entièrement gratuit.

Pas de niveaux, pas d'abonnements, pas de restrictions.`,labels:{monthly:"Mensuel",yearly:"Annuel",savings:"(Économisez jusqu'à 20%)",popular:"Le plus populaire",perMonth:"/mois",perYear:"/an",free:"Gratuit"},toggle:{toMonthly:"Passer à la facturation {{label}}",toYearly:"Passer à la facturation {{label}}"},tiers:{free:{name:"Communauté",description:`Pour tout le monde.

Toutes les fonctionnalités de l'éditeur, entièrement gratuites.`,features:{1:"Compatibilité VS Code complète",2:"Toutes les extensions supportées",3:"Performance Rust native",4:"Multi-plateforme (macOS, Windows, Linux)",5:"UI type-safe Effect-TS",6:"Architecture basée sur gRPC",7:"Open Source (licence CC0)"},button:"Télécharger maintenant"}},title:"Gratuit pour toujours, Open Source",badge:"Tarification"},o={quote:{1:`Une alternative axée sur la performance et ouverte.

Land est exactement ce dont VS Code avait besoin.

C'est incroyablement rapide.`,2:`L'architecture Effect-TS est magnifique à utiliser.

La sécurité des types détecte les bugs avant qu'ils ne se produisent.`,3:`Exécuter mes extensions existantes sans modifications est révolutionnaire.

La compatibilité est impressionnante.`,4:`Enfin un éditeur qui respecte mes ressources système.

Plus de surcharge mémoire Electron.`,5:`L'engagement open source signifie que je peux contribuer et personnaliser.

C'est l'éditeur que j'attendais.`,6:`L'architecture basée sur gRPC est un chef-d'œuvre en conception de systèmes.

Land est l'avenir des éditeurs de bureau.`},subtitle:"Les voix de la communauté sur l'avenir de l'édition de code.",title:"Ce que disent les développeurs",badge:"Témoignages",attribution:"Retour de la communauté",attributionNote:"Membre représentatif de la communauté"},r={title:"Feuille de route & Prévisions",subtitle:`Financé par le fonds NGI0 Commons.

Open Source, gratuit pour toujours, développé en public.`,tiers:{current:{name:"Phase actuelle",description:`Fondation et échafaudage de l'éditeur principal.

Développement actif.`,features:{mountain:`Mountain ⛰️
backend natif Rust/Tauri`,cocoon:`Cocoon 🦋
hôte d'extension VS Code via Effect-TS`,wind:`Wind 🍃
ré-implémentation du Workbench`,sky:`Sky 🌌
rendu de l'interface de l'éditeur`,air:`Air 🪁
démon de mise à jour et signature cryptographique`,echo:`Echo 📣
planificateur de tâches à vol de travail`,common:`Common 👨🏻‍🏭
Abstract Rust foundation, typed effects, zero concrete implementations`,grove:`Grove 🌳
WASMtime sandbox, capability-based extension isolation`,maintain:`Maintain 💪🏻
Build orchestrator, Rhai scripting, TOML/JSON5 config`,mist:`Mist 🌫️
DNS sandbox, all *.editor.land traffic resolves locally`,output:`Output ⚫
Compilation pipeline, deterministic checksummed bundles`,rest:`Rest ⛱️
TypeScript compiler in Rust + OXC, 2–3× faster than esbuild`,sidecar:`SideCar ⚙️
Cross-platform Node.js binary distributor per target triple`,vine:`Vine 🌿
gRPC backbone, contract-first .proto definitions`,worker:`Worker 🍩
Service Worker, offline support, AES-GCM encrypted auth`},button:"Voir sur GitHub"},next:{name:"Prochain jalon",description:"Écosystème d'extensions et stabilité de la plateforme.",features:{1:"Compatibilité élevée des extensions VS Code",2:"Installateur multi-plateforme et mise à jour automatique",3:"Finalisation du protocole gRPC IPC",4:"Synchronisation des paramètres et portail cloud optionnel"},button:"Suivre les progrès"},future:{name:"Vision à long terme",description:"Éditeur complet remplaçant les outils basés sur Electron.",features:{1:"Édition mobile native (iOS, Android)",2:"Édition collaborative en temps réel",3:"Outils de développement assistés par IA",4:"Place de marché de plugins et écosystème"},button:"En savoir plus"}}},s={title:"Architecture",subtitle:`Land remplace la pile Electron de VS Code par une architecture modulaire et haute performance.

Chaque élément est un dépôt autonome.`,mountain:{description:`Gère le cycle de vie des fenêtres, du système de fichiers et des processus.

Le backend natif Rust/Tauri qui remplace le processus principal d'Electron.`,subtitle:"Backend natif Rust/Tauri"},cocoon:{description:`Exécute les extensions VS Code via Effect-TS avec une compatibilité API haute fidélité.

Aucune modification nécessaire aux extensions existantes.`,subtitle:"Hôte d'extension TypeScript"},wind:{description:`Ré-implémentation du VS Code Workbench.

Fournit le shell de l'éditeur, les panneaux, les barres latérales et la barre d'activité.`,subtitle:"Service UI TypeScript"},sky:{description:`Rend l'interface de l'éditeur avec des composants Astro.

Gère les thèmes, les mises en page et la couche de présentation visuelle.`,subtitle:"Composant UI Astro"},air:{description:`Démon en arrière-plan pour les mises à jour automatiques, les téléchargements et la signature cryptographique.

Garde Land à jour silencieusement.`,subtitle:"Démon en arrière-plan Rust"},echo:{description:`Exécuteur à vol de travail haute performance.

Planifie et distribue les tâches sur les cœurs pour un débit maximum.`,subtitle:"Planificateur de tâches Rust"}},a={features:e,hero:t,nav:n,pricing:i,testimonials:o,roadmap:r,architecture:s};export{s as architecture,a as default,e as features,t as hero,n as nav,i as pricing,r as roadmap,o as testimonials};
