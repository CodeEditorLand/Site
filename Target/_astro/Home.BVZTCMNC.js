const e={badge:"Fonctionnalités",item:{designTokens:{description:`Arrêtez de donner à VS Code un gigaoctet de RAM juste pour ouvrir un fichier.

Le noyau Rust de Land avec gRPC IPC répond en microsecondes. Même avec des centaines de fichiers ouverts.`,title:"Sans lag, jamais"},componentLibrary:{description:`Toute votre bibliothèque d'extensions VS Code fonctionne immédiatement.

L'hôte Cocoon reflète la surface complète de l'API VS Code. Rien n'a besoin d'être réécrit.`,title:"Vos extensions, inchangées"},documentation:{description:`Effect-TS vous offre des services typés, une concurrence structurée et des erreurs tracées.

Les erreurs sont détectées à la compilation, pas à 3 heures du matin.`,title:"Typage sûr de bout en bout"},versionControl:{description:`Un codebase compile en applications entièrement natives sur macOS, Windows et Linux via Tauri.

Publiez pour les trois plateformes avec une seule commande.`,title:"Une compilation, chaque plateforme"},collaboration:{description:`Domaine public CC0. Utilisez-le, forkez-le, distribuez-le, même vendez-le.

Financé par NLnet et construit entièrement en public.`,title:"Gratuit pour toujours, sans conditions"},cicdIntegration:{description:`Rust, Tauri, Effect-TS et Biome forment une stack choisie pour sa justesse et sa vélocité de développement.

Outils familiers, sans compromis.`,title:"Outils de développement de premier ordre"}},subtitle:"Six raisons pour lesquelles Land est plus rapide, plus sûr et plus ouvert que tout éditeur basé sur Electron.",title:"Différent par conception. Meilleur de façon mesurable."},t={badge:"Vitesse native Sans Electron CC0",subtitle:`Arrêtez de donner à VS Code un gigaoctet de RAM.

Land est construit avec Rust, Tauri et Effect-TS. Rapide nativement. Sans Electron. Gratuit pour toujours.`,title:"L'éditeur de code que vous méritez",titleHighlight:"Land",atScale:"commence ici",cta:{primary:"Télécharger",secondary:"En savoir plus"},scene:{description:"Visualisation animée de l'architecture",hub:"Architecture centrale",components:{button:"Noyau Rust",colors:"Tauri UI",typography:"Services Effect-TS",components:"gRPC IPC",spacing:"Extension Host",icons:"Multi-plateforme",docs:"VS Code API",versions:"Open Source CC0"}}},n={docs:"Documentation",downloads:"Télécharger",features:"Fonctionnalités",github:"GitHub"},i={subtitle:`Code Editor Land est entièrement gratuit.

Pas de niveaux, pas d'abonnements, pas de restrictions.`,labels:{monthly:"Mensuel",yearly:"Annuel",savings:"(Économisez jusqu'à 20%)",popular:"Le plus populaire",perMonth:"/mois",perYear:"/an",free:"Gratuit"},toggle:{toMonthly:"Passer à la facturation {{label}}",toYearly:"Passer à la facturation {{label}}"},tiers:{free:{name:"Communauté",description:`Pour tout le monde.

Toutes les fonctionnalités de l'éditeur, entièrement gratuites.`,features:{1:"Compatibilité VS Code complète",2:"Toutes les extensions supportées",3:"Performance Rust native",4:"Multi-plateforme (macOS, Windows, Linux)",5:"UI type-safe Effect-TS",6:"Architecture basée sur gRPC",7:"Open Source (licence CC0)"},button:"Télécharger maintenant"}},title:"Gratuit pour toujours, Open Source",badge:"Tarification"},s={quote:{1:`Une alternative axée sur la performance et ouverte.

Land est exactement ce dont VS Code avait besoin.

C'est incroyablement rapide.`,2:`L'architecture Effect-TS est magnifique à utiliser.

La sécurité des types détecte les bugs avant qu'ils ne se produisent.`,3:`Exécuter mes extensions existantes sans modifications est révolutionnaire.

La compatibilité est impressionnante.`,4:`Enfin un éditeur qui respecte mes ressources système.

Plus de surcharge mémoire Electron.`,5:`L'engagement open source signifie que je peux contribuer et personnaliser.

C'est l'éditeur que j'attendais.`,6:`L'architecture basée sur gRPC est un chef-d'œuvre en conception de systèmes.

Land est l'avenir des éditeurs de bureau.`},subtitle:"Les voix de la communauté sur l'avenir de l'édition de code.",title:"Ce que disent les développeurs",badge:"Témoignages",attribution:"Retour de la communauté",attributionNote:"Membre représentatif de la communauté"},o={title:"Feuille de route et ce à quoi s'attendre",subtitle:`Financé par le NLnet NGI0 Commons Fund.

Construit en public, gratuit pour toujours, sans surprises sur la feuille de route.`,tiers:{current:{name:"Actif maintenant",description:"Les quinze éléments principaux sont en développement actif. Chacun est un dépôt indépendant que vous pouvez inspecter et auquel vous pouvez contribuer aujourd'hui.",features:{mountain:`Mountain ⛰️
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
Service Worker, offline support, AES-GCM encrypted auth`},button:"Voir sur GitHub"},next:{name:"Prochainement",description:"Amélioration de l'écosystème d'extensions et première version stable sur les trois plateformes.",features:{1:"Compatibilité élevée des extensions VS Code",2:"Installateur multi-plateforme et mise à jour automatique",3:"Finalisation du protocole gRPC IPC",4:"Synchronisation des paramètres et portail cloud optionnel"},button:"Suivre les progrès"},future:{name:"Vision à long terme",description:"Land devient le premier IDE natif multiplateforme. Sandbox complet de plugins, extensions WASM et intégration IA native.",features:{1:"Édition mobile native (iOS, Android)",2:"Édition collaborative en temps réel",3:"Outils de développement assistés par IA",4:"Place de marché de plugins et écosystème"},button:"En savoir plus"}}},r={title:"Architecture",subtitle:`Land remplace la pile Electron de VS Code par une architecture modulaire et haute performance.

Chaque élément est un dépôt autonome.`,mountain:{description:`Gère le cycle de vie des fenêtres, du système de fichiers et des processus.

Le backend natif Rust/Tauri qui remplace le processus principal d'Electron.`,subtitle:"Gestionnaire de processus natif"},cocoon:{description:`Exécute les extensions VS Code via Effect-TS avec une compatibilité API haute fidélité.

Aucune modification nécessaire aux extensions existantes.`,subtitle:"Hôte d'extensions sans réécriture"},wind:{description:`Ré-implémentation du VS Code Workbench.

Fournit le shell de l'éditeur, les panneaux, les barres latérales et la barre d'activité.`,subtitle:"Shell complet du workbench"},sky:{description:`Rend l'interface de l'éditeur avec des composants Astro.

Gère les thèmes, les mises en page et la couche de présentation visuelle.`,subtitle:"Couche de thèmes et mises en page"},air:{description:`Démon en arrière-plan pour les mises à jour automatiques, les téléchargements et la signature cryptographique.

Garde Land à jour silencieusement.`,subtitle:"Mises à jour silencieuses, toujours signées"},echo:{description:`Exécuteur à vol de travail haute performance.

Planifie et distribue les tâches sur les cœurs pour un débit maximum.`,subtitle:"Utilise chaque coeur CPU"},heading:"Comment fonctionne l'architecture",intro:"Land remplace la stack Electron de VS Code élément par élément."},a={features:e,hero:t,nav:n,pricing:i,testimonials:s,roadmap:o,architecture:r};export{r as architecture,a as default,e as features,t as hero,n as nav,i as pricing,o as roadmap,s as testimonials};
