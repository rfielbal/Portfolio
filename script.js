document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    const preloader = document.getElementById("preloader");
    const preloaderCounter = document.getElementById("preloader-counter");
    const preloaderFill = document.getElementById("preloader-fill");

    const navbar = document.getElementById("navbar");
    const homeSection = document.getElementById("home");
    const sectionTitles = document.querySelectorAll(".section-title");
    const signatureWord = document.getElementById("signature-word");
    const terminalOutput = document.getElementById("terminal-output");
    const terminalForm = document.getElementById("terminal-form");
    const terminalInput = document.getElementById("terminal-input");
    const terminalSuggestions = document.querySelectorAll("[data-terminal-command]");
    const contactBox = document.getElementById("contact-box");

    const fsMenu = document.getElementById("fs-menu");
    const openMenuBtn = document.getElementById("btn-open-menu");
    const closeMenuBtn = document.getElementById("btn-close-menu");
    const storyRail = document.getElementById("story-rail");
    const storyRailFill = document.getElementById("story-rail-fill");
    const storyDots = document.querySelectorAll(".story-dot");
    const navAnchors = document.querySelectorAll(".nav-links a, .fs-links a");
    const buildSections = document.querySelectorAll(".build-section");

    const missionStepTitle = document.getElementById("mission-step-title");
    const missionStepText = document.getElementById("mission-step-text");
    const missionSignals = document.querySelectorAll("[data-signal]");
    const manifestoSteps = document.querySelectorAll(".manifesto-step");
    const journeyTrack = document.getElementById("journey-track");
    const journeyProgress = document.getElementById("journey-progress");
    const journeyItems = document.querySelectorAll("[data-journey-item]");
    const journeyProjectLinks = document.querySelectorAll("[data-journey-project]");

    const capabilityStage = document.getElementById("capability-stage");
    const capabilityTabs = Array.from(document.querySelectorAll("[data-capability]"));
    const capabilityStageStatus = document.getElementById("capability-stage-status");
    const capabilityPanel = document.getElementById("capability-panel");
    const capabilityImage = document.getElementById("capability-image");
    const capabilityMediaType = document.getElementById("capability-media-type");
    const capabilityMediaProject = document.getElementById("capability-media-project");
    const capabilityMap = document.getElementById("capability-map");
    const capabilityNodes = Array.from(document.querySelectorAll("[data-capability-node]"));
    const capabilityIndex = document.getElementById("capability-index");
    const capabilityContext = document.getElementById("capability-context");
    const capabilityTitle = document.getElementById("capability-title");
    const capabilitySummary = document.getElementById("capability-summary");
    const capabilityNeed = document.getElementById("capability-need");
    const capabilityDecision = document.getElementById("capability-decision");
    const capabilityProof = document.getElementById("capability-proof");
    const capabilityTechs = document.getElementById("capability-techs");
    const capabilityOpenProject = document.getElementById("capability-open-project");
    const capabilityRole = document.getElementById("capability-role");

    const heroStats = document.getElementById("hero-stats");

    const projectGrid = document.getElementById("projects-grid");
    const filterButtons = document.querySelectorAll(".filter-btn");

    const projectModal = document.getElementById("modal-project");
    const closeProjectModal = document.getElementById("close-pm");
    const imageLightbox = document.getElementById("image-lightbox");
    const closeImageLightbox = document.getElementById("close-image-lightbox");
    const imageLightboxImg = document.getElementById("image-lightbox-img");
    const imageLightboxCaption = document.getElementById("image-lightbox-caption");

    const pmTitle = document.getElementById("pm-title");
    const pmCat = document.getElementById("pm-cat");
    const pmDate = document.getElementById("pm-date");
    const pmLogo = document.getElementById("pm-logo");
    const pmLogoSlot = document.getElementById("pm-logo-slot");
    const pmLogoFallback = document.getElementById("pm-logo-fallback");
    const pmText = document.getElementById("pm-text");
    const pmTechs = document.getElementById("pm-techs");
    const pmGallery = document.getElementById("pm-gallery");
    const pmLive = document.getElementById("pm-live");
    const pmLink = document.getElementById("pm-link");

    const projects = [
        {
            id: 4,
            index: "01",
            filter: "client",
            title: "Wheello · Habitat Insertion",
            category: "Application métier · Client",
            year: "2026",
            created: "24 mai - 4 juillet 2026",
            role: "Conception full-stack",
            status: "Livré",
            accent: "#43dfff",
            logo: "./images/projects/wheello/logo.png",
            logoAlt: "Logo Wheello",
            logoMark: "WH",
            description:
                "Projet réalisé dans le cadre de mon stage de première année de BTS SIO option SLAM, pour l'association Habitat Insertion.\n\nWheello est une solution métier complète pensée pour gérer une flotte de véhicules: utilisateurs, réservations, départs immédiats, retours, constats, signalements, bilans kilométriques, notifications, archivage et conformité RGPD.\n\nLe projet combine un back-office Symfony/API sécurisé, une application mobile Flutter pour les utilisateurs terrain, une logique JWT côté API, une gestion des rôles admin/super admin, des documents de livraison et une procédure de mise en production claire.",
            summary: "Application métier complète pour piloter les véhicules, réservations et usages internes d'une association.",
            impact: "Back-office, API sécurisée, app mobile, RGPD, bilans et livraison documentée.",
            techs: ["Symfony", "PHP", "API", "JWT", "Flutter", "Dart", "MySQL", "Doctrine", "Stimulus", "AssetMapper", "Docker", "PHPUnit"],
            cover: "./images/projects/wheello/cover.webp",
            coverLabel: "Back-office + application mobile",
            galleryLayout: "case-study",
            images: [
                {
                    src: "./images/projects/wheello/gallery/back-office/accueil.png",
                    alt: "Accueil du back-office Wheello Manager",
                    caption: "Accueil du back-office Symfony",
                    group: "Back-office web",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/wheello/gallery/back-office/vehicules.png",
                    alt: "Liste des véhicules dans le back-office Wheello",
                    caption: "Gestion des véhicules et disponibilités",
                    group: "Back-office web",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/wheello/gallery/back-office/bilan-kilometrique.png",
                    alt: "Bilan kilométrique dans l'administration Wheello",
                    caption: "Bilans kilométriques avec filtres métier",
                    group: "Back-office web",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/wheello/gallery/mobile/accueil.png",
                    alt: "Accueil de l'application mobile Wheello",
                    caption: "Accueil mobile et actions principales",
                    group: "Application mobile",
                    orientation: "portrait"
                },
                {
                    src: "./images/projects/wheello/gallery/mobile/reservations.png",
                    alt: "Calendrier des réservations dans l'application mobile Wheello",
                    caption: "Suivi des réservations utilisateur",
                    group: "Application mobile",
                    orientation: "portrait"
                },
                {
                    src: "./images/projects/wheello/gallery/mobile/modification-reservation.png",
                    alt: "Modification d'une réservation dans l'application mobile Wheello",
                    caption: "Modification de période avec disponibilités",
                    group: "Application mobile",
                    orientation: "portrait"
                }
            ],
            imageSlots: [],
            features: [
                "Back-office Symfony avec rôles admin et super admin, CRUD métier, planning, bilans et page APK.",
                "API sécurisée par JWT, sessions mobiles contrôlées et routes métier protégées.",
                "Application Flutter pour consulter les véhicules, réserver, déclarer un départ/retour et signaler un problème.",
                "Gestion des utilisateurs, sites, pôles, dispositifs, véhicules, constats, réservations et notifications.",
                "Archivage, anonymisation, conservation des données et documentation RGPD intégrée.",
                "Livraison structurée: docs admin, docs utilisateur, procédure de déploiement, tests et base prête."
            ],
            vlog: [
                {
                    label: "Épisode 1",
                    url: "https://www.linkedin.com/posts/rapha%C3%ABl-coursier_stage-btssio-daezveloppementweb-activity-7466384911877242881-9ZZc/"
                },
                {
                    label: "Épisode 2",
                    url: "https://www.linkedin.com/posts/rapha%C3%ABl-coursier_stage-btssio-daezveloppementweb-ugcPost-7468977458327793665-ktZD/"
                },
                {
                    label: "Épisode 3",
                    url: "https://www.linkedin.com/posts/rapha%C3%ABl-coursier_stage-%C3%A9pisode-3-la-vid%C3%A9o-est-op%C3%A9rationnelle-ugcPost-7471439859912511488-Js0P/"
                },
                {
                    label: "Épisode 4",
                    url: "https://www.linkedin.com/posts/rapha%C3%ABl-coursier_stage-btssio-daezveloppementweb-ugcPost-7474027734013411328-LZ_4/"
                },
                {
                    label: "Épisode 5",
                    url: "https://www.linkedin.com/posts/rapha%C3%ABl-coursier_stage-btssio-daezveloppementweb-ugcPost-7476552438225776641-YlBm/"
                },
                {
                    label: "Épisode 6",
                    url: "https://www.linkedin.com/posts/rapha%C3%ABl-coursier_stage-btssio-daezveloppementweb-ugcPost-7479194584447885312-ndaW/"
                }
            ],
            videoSpot: {
                title: "Épisode 1 : le défi de l'association",
                description: "Premier épisode du suivi de stage réalisé chez Habitat Insertion. La vidéo présente le besoin client, l'organisation du projet et les premières bases techniques mises en place pour créer une application mobile et un panel d'administration web de A à Z.",
                highlights: [
                    "Mise en place de la méthode Agile Scrum avec des sprints courts.",
                    "Modélisation des données et construction du MCD.",
                    "Début du développement de l'application mobile Flutter.",
                    "Création de l'API et du back-office Symfony.",
                    "Préparation d'une première démonstration fonctionnelle."
                ],
                localSource: "./videos/wheello-episode-1.mp4",
                url: "https://www.linkedin.com/posts/rapha%C3%ABl-coursier_stage-btssio-daezveloppementweb-activity-7466384911877242881-9ZZc/",
                orientation: "portrait"
            },
            repoLink: null,
            liveLink: null
        },
        {
            id: 3,
            index: "02",
            filter: "academique",
            title: "StreamCorner",
            category: "Site e-commerce · Projet de fin d'année",
            year: "2026",
            created: "1er mai 2026",
            role: "Développement full-stack",
            status: "En ligne",
            accent: "#ccff00",
            logo: "./images/projects/streamcorner/logo.png",
            logoAlt: "Symbole StreamCorner",
            logoMark: "SC",
            description:
                "Création d'un site e-commerce avec Symfony 6.4 dans le cadre du projet de fin d'année.\n\nStreamCorner est une boutique spécialisée dans le matériel de streaming. Le projet présente un parcours e-commerce complet: consultation d'une page d'accueil orientée produit, navigation dans un catalogue filtrable, accès aux fiches produits détaillées, gestion du panier, favoris, commandes et compte client.\n\nLe back-office permet d'administrer les produits, catégories, utilisateurs, commandes, contacts et contenus liés à la boutique.\n\nCompte admin visiteur:\nEmail: visiteur@streamcorner.com\nMot de passe: streamcorner",
            summary: "Boutique Symfony complète pour vendre du matériel de streaming, avec catalogue, panier, compte client et back-office.",
            impact: "Parcours e-commerce complet, administration produit et base Symfony structurée.",
            techs: ["Symfony 6.4", "PHP 8.2", "Doctrine", "MySQL", "Docker", "Apache", "Twig", "HTML", "CSS", "JavaScript"],
            cover: "./images/projects/streamcorner/cover.webp",
            images: [
                "./images/projects/streamcorner/gallery/accueil-boutique.png",
                "./images/projects/streamcorner/gallery/catalogue-produits.png",
                "./images/projects/streamcorner/gallery/back-office-produits.png"
            ],
            features: [
                "Catalogue filtrable avec fiches produits détaillées.",
                "Panier, favoris, commandes et création de compte client.",
                "Back-office pour gérer produits, catégories, utilisateurs, commandes, contacts et contenus.",
                "Déploiement en ligne avec environnement Symfony, base SQL et workflow Docker."
            ],
            repoLink: "https://github.com/rfielbal/StreamCorner",
            liveLink: "https://stream-corner.rfielbal.fr"
        },
        {
            id: 7,
            index: "03",
            filter: "perso",
            title: "AetherCore",
            category: "Inspecteur 3D multimodal · Projet perso",
            year: "2026",
            created: "11 février 2026",
            role: "Prototype 3D & WebGL",
            status: "Prototype jouable",
            accent: "#ff5f57",
            logo: "./images/projects/aethercore/logo.png",
            logoAlt: "Symbole AetherCore",
            logoMark: "AC",
            description:
                "AetherCore est un prototype personnel de visualiseur STL 3D dans le navigateur, pensé pour inspecter une pièce avec un rendu WebGL clair, des mesures utiles et une interaction sans contact optionnelle.\n\nLa version intégrée au portfolio charge un modèle de démonstration, permet d'importer un fichier STL, de passer entre plusieurs modes de rendu et d'afficher des estimations de dimensions, surface et volume. Le suivi de main via MediaPipe reste optionnel : l'application fonctionne aussi avec la souris, le tactile, l'import fichier et le glisser-déposer.\n\nLe projet a été restructuré en application Vite avec build de production, assets propres et fallback explicite si la caméra ou les modèles de vision ne sont pas disponibles.",
            summary: "Visualiseur STL 3D en WebGL avec import de modèle, modes de rendu, mesures et contrôle main optionnel.",
            impact: "Prototype industriel jouable, build Vite propre, rendu Three.js et fallback sans caméra.",
            techs: ["Vite", "JavaScript", "Three.js", "MediaPipe", "WebGL", "STLLoader", "STL", "UX temps réel"],
            cover: "./images/projects/aethercore/cover.webp",
            demoPreview: "./images/projects/aethercore/cover.webp",
            images: [
                "./images/projects/aethercore/gallery/interface-principale.png",
                "./images/projects/aethercore/gallery/mode-surface.png"
            ],
            demoEmbed: "./demos/aether-core/index.html",
            demoTitle: "DÉMO INTERACTIVE 3D",
            demoDescription: "La démo charge un modèle STL et reste utilisable sans caméra. Le suivi de main peut être activé dans l'application si le navigateur l'autorise.",
            features: [
                "Rendu 3D temps réel avec Three.js et modèle STL de démonstration.",
                "Import de fichiers STL par bouton ou glisser-déposer.",
                "Modes hybride, points et surface pour adapter la lecture du modèle.",
                "Dimensions, surface et volume estimés pour la pièce chargée.",
                "Contrôle main optionnel via MediaPipe avec fallback souris/tactile."
            ],
            repoLink: null,
            liveLink: "./demos/aether-core/index.html",
            liveLabel: "Tester la démo"
        },
        {
            id: 6,
            index: "04",
            filter: "academique",
            title: "Le Secret du Conservateur",
            category: "Escape game web · Projet académique",
            year: "2026",
            created: "9 mars 2026",
            role: "Game design & développement web",
            status: "Jouable",
            accent: "#ccff00",
            logo: "./images/projects/secret-conservateur/logo.png",
            logoAlt: "Symbole du Secret du Conservateur",
            logoMark: "LC",
            description:
                "Projet académique réalisé en fin de séquence de culture générale, autour du thème de la folie perçue dans l'histoire de l'art.\n\nLe Secret du Conservateur est un escape game jouable en navigateur : le joueur explore un musée fermé de nuit, traverse trois salles thématiques, observe des œuvres, lit des biographies et répond à des consoles d'analyse pour débloquer la sortie.\n\nLe projet m'a permis de travailler une logique de jeu complète en JavaScript : canvas, collisions, interactions clavier/tactile, carnet de progression, audio d'ambiance, overlays, énigmes et version web intégrable.",
            summary: "Escape game pédagogique en JavaScript autour de l'art, de l'observation et de la folie perçue par la société.",
            impact: "Jeu web jouable directement, canvas, audio, énigmes, narration et version desktop Electron.",
            techs: ["HTML", "CSS", "JavaScript", "Canvas", "Web Audio", "Electron", "Game design", "UX pédagogique"],
            cover: "./images/projects/secret-conservateur/cover.webp",
            demoPreview: "./images/projects/secret-conservateur/cover.webp",
            images: [
                "./images/projects/secret-conservateur/gallery/vue-generale-musee.png",
                "./images/projects/secret-conservateur/gallery/exploration-musee.png",
                "./images/projects/secret-conservateur/gallery/detail-oeuvre-le-cri.png"
            ],
            demoEmbed: "./demos/escape-game/index.html",
            demoTitle: "LANCER L'ESCAPE GAME",
            demoDescription: "La démo s'ouvre dans une fenêtre dédiée pour garder tout l'espace à l'exploration. Clique sur Play pour lancer le jeu.",
            demoLabel: "Tester le jeu",
            features: [
                "Exploration d'un musée en vue top-down avec déplacements clavier et contrôles tactiles.",
                "Trois salles thématiques : angoisse intérieure, rêve et visions, rupture et scandale.",
                "Œuvres, biographies, indices et consoles d'analyse pour progresser.",
                "Carnet de progression, mode UV, audio d'ambiance et feedbacks sonores.",
                "Version web locale intégrée au portfolio et version desktop Electron prévue dans le projet original."
            ],
            repoLink: "https://github.com/rfielbal/Escape-Game",
            liveLink: "./demos/escape-game/index.html",
            liveLabel: "Ouvrir la démo"
        },
        {
            id: 1,
            index: "05",
            filter: "client",
            title: "Site Jessica Dew",
            category: "Site vitrine · Client",
            year: "2025 - 2026",
            created: "Décembre 2025",
            role: "Design & intégration",
            status: "Itération client",
            accent: "#43dfff",
            logo: "./images/projects/jessica-dew/logo.png",
            logoAlt: "Monogramme Jessica Dew",
            logoMark: "JD",
            description:
                "Création d'un site vitrine sur mesure pour une photographe.\n\nLe projet est encore en cours d'itération selon les besoins de la cliente.",
            summary: "Direction artistique éditoriale et parcours de conversion simplifié.",
            impact: "Maquette premium et parcours de contact optimisé.",
            techs: ["HTML", "CSS", "JavaScript"],
            cover: "./images/projects/jessica-dew/cover.webp",
            images: [
                "./images/projects/jessica-dew/gallery/page-complete.png",
                "./images/projects/jessica-dew/gallery/portfolio-photographe.png"
            ],
            repoLink: null,
            liveLink: null
        },
        {
            id: 2,
            index: "06",
            filter: "academique",
            title: "Chicken Louisiane Steakhouse",
            category: "Projet académique",
            year: "2025",
            created: "24 octobre 2025",
            role: "Intégration front",
            status: "En ligne",
            accent: "#ccff00",
            logo: "./images/projects/chicken-louisiane/logo.png",
            logoAlt: "Emblème Chicken Louisiane Steakhouse",
            logoMark: "CL",
            description:
                "Premier site web réalisé pendant le BTS SIO pour découvrir et pratiquer les bases HTML/CSS.",
            summary: "Projet fondateur qui a posé mes bases d'intégration web.",
            impact: "Première base d'intégration et logique responsive.",
            techs: ["HTML", "CSS"],
            cover: "./images/projects/chicken-louisiane/cover.webp",
            images: [
                "./images/projects/chicken-louisiane/gallery/accueil.png",
                "./images/projects/chicken-louisiane/gallery/contenu.png"
            ],
            repoLink: "https://github.com/coursierap/AP-Chicken-Louisiane",
            liveLink: "https://4719.s3.nuage-peda.fr/Chicken%20Louisiane/index.html"
        },
        {
            id: 5,
            index: "07",
            filter: "perso",
            title: "Template Dashboard Produit",
            category: "Projet perso",
            year: "2025",
            created: "Décembre 2025",
            role: "Interface produit",
            status: "Concept",
            accent: "#ff5f57",
            logoMark: "DP",
            description: "Template d'interface applicative orientée data, lisibilité et navigation rapide.",
            summary: "Montre un profil orienté produit et UI logicielle.",
            impact: "Hiérarchie data-first et composants réutilisables.",
            techs: ["JavaScript", "UI/UX", "CSS"],
            cover: "./images/projects/dashboard-produit/cover.jpg",
            images: ["./images/projects/dashboard-produit/cover.jpg"],
            repoLink: null,
            liveLink: null
        },
        {
            id: 8,
            index: "08",
            filter: "perso",
            title: "La Citadelle Rouge",
            category: "Map aventure Minecraft Bedrock · Projet perso",
            year: "2019",
            created: "Juillet 2019",
            role: "Game design & automatisation",
            status: "En développement",
            accent: "#ff5f57",
            logo: "./images/projects/citadelle-rouge/logo.svg",
            logoMark: "CR",
            description:
                "La Citadelle Rouge est une map d'aventure Minecraft Bedrock conçue comme un donjon entièrement automatisé. Le joueur pénètre dans une forteresse en ruine, recherche des indices et progresse à travers des parcours, des énigmes, des labyrinthes et des combats contre des mobs hostiles.\n\nLa première partie repose sur un système de jeu autonome : les vagues de mobs spawnent à intervalles définis, les coffres récupèrent automatiquement leur loot et l'équipement nécessaire peut être distribué au joueur au bon moment. Les portes s'ouvrent et se referment selon les actions réalisées dans la salle.\n\nEn coulisses, des circuits de redstone relient boutons, leviers, pistons et blocs de commande. Des chaînes de commandes orchestrent la progression. Lorsqu'une épreuve est validée et que le joueur passe au niveau suivant, le système arrête les spawns, remet les coffres et les objets en place, referme les accès et replace la salle dans son état initial sans intervention manuelle.",
            summary: "Donjon Minecraft Bedrock mêlant exploration, énigmes et combats dans des salles entièrement pilotées par Redstone.",
            impact: "Boucle de jeu autonome, progression scénarisée et réinitialisation complète de chaque épreuve.",
            techs: ["Minecraft Bedrock", "Redstone", "Blocs de commande", "Level design", "Game design", "Automatisation"],
            cover: "./images/projects/citadelle-rouge/cover.webp",
            coverLabel: "Map aventure automatisée",
            galleryLayout: "case-study",
            images: [
                {
                    src: "./images/projects/citadelle-rouge/gallery/citadelle-en-ruine.png",
                    alt: "Forteresse en ruine de la map La Citadelle Rouge",
                    caption: "La citadelle en ruine, point de départ de l'aventure",
                    group: "Expérience joueur",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/citadelle-rouge/gallery/salle-epreuves.png",
                    alt: "Salle d'épreuves décorée de La Citadelle Rouge",
                    caption: "Une salle scénarisée mêlant exploration, indices et accès verrouillés",
                    group: "Expérience joueur",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/citadelle-rouge/gallery/architecture-redstone.png",
                    alt: "Vue d'ensemble des circuits Redstone et blocs de commande",
                    caption: "Architecture générale du système caché sous la map",
                    group: "Automatisation Redstone",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/citadelle-rouge/gallery/reseau-redstone-principal.png",
                    alt: "Réseau de Redstone reliant les blocs de commande",
                    caption: "Circuit principal reliant déclencheurs, séquences et réinitialisations",
                    group: "Automatisation Redstone",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/citadelle-rouge/gallery/automatisation-command-blocks.png",
                    alt: "Matrice de blocs de commande de La Citadelle Rouge",
                    caption: "Blocs de commande enchaînés pour automatiser les mécaniques de jeu",
                    group: "Automatisation Redstone",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/citadelle-rouge/gallery/commande-restauration-clone.png",
                    alt: "Commande clone utilisée pour restaurer une zone Minecraft",
                    caption: "Commande /clone pour remettre une zone dans son état de référence",
                    group: "Commandes Bedrock",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/citadelle-rouge/gallery/commande-recompense-give.png",
                    alt: "Commande give utilisée pour distribuer un objet Minecraft",
                    caption: "Commande /give pour distribuer l'équipement au joueur",
                    group: "Commandes Bedrock",
                    orientation: "landscape"
                }
            ],
            features: [
                "Progression de type map aventure : indices, parkour, énigmes, labyrinthes et combats.",
                "Spawn temporisé de mobs avec arrêt automatique une fois l'épreuve terminée.",
                "Coffres, loot, armures, potions et objets remis en place pour chaque nouvelle partie.",
                "Portes et passages automatisés par Redstone, boutons, leviers et pistons.",
                "Chaînes de blocs de commande pour distribuer les objets et piloter les étapes.",
                "Réinitialisation des salles par /clone sans intervention manuelle entre deux joueurs."
            ],
            repoLink: null,
            liveLink: null
        }
    ];

    const signatureWords = [
        "Architecture clean",
        "Code propre",
        "Expérience marquante",
        "Vision produit"
    ];

    const capabilityCases = {
        product: {
            accent: "#43dfff",
            status: "Wheello / opérationnel",
            index: "01 / 04",
            context: "Client · Full-stack",
            mediaType: "Projet client",
            project: "Wheello",
            title: "Transformer une contrainte terrain en outil quotidien.",
            summary: "Une application métier doit faire disparaître la complexité sans effacer les règles qui sécurisent le travail.",
            need: "Centraliser une flotte, les réservations et les retours sans multiplier les fichiers ni les doubles saisies.",
            decision: "Séparer l'usage terrain sur mobile et l'administration web, reliés par une API sécurisée.",
            proof: "Back-office Symfony, application Flutter, bilans, notifications et gestion complète du cycle véhicule.",
            techs: ["Symfony", "Flutter", "JWT", "Doctrine"],
            image: "./images/projects/wheello/cover.webp",
            imageAlt: "Aperçu de l'application métier Wheello",
            imagePosition: "center",
            projectId: "4",
            action: "Examiner Wheello",
            role: "Conception full-stack",
            nodes: [
                { label: "Terrain", value: "Flutter", icon: "fas fa-mobile-screen-button" },
                { label: "Échange", value: "API + JWT", icon: "fas fa-key" },
                { label: "Métier", value: "Symfony", icon: "fab fa-symfony" },
                { label: "Données", value: "MySQL", icon: "fas fa-database" }
            ]
        },
        backend: {
            accent: "#ccff00",
            status: "StreamCorner / en ligne",
            index: "02 / 04",
            context: "Académique · Full-stack",
            mediaType: "Projet de fin d'année",
            project: "StreamCorner",
            title: "Faire circuler la donnée sans perdre la logique métier.",
            summary: "Le backend ne se résume pas à enregistrer des formulaires\u00a0: il doit garder les règles cohérentes du catalogue jusqu'à la commande.",
            need: "Construire un parcours e-commerce complet avec catalogue, panier, favoris, commandes, comptes et administration.",
            decision: "Modéliser les relations avec Doctrine et concentrer les règles dans une base Symfony structurée, contrôlée par rôles.",
            proof: "Une boutique déployée, un back-office exploitable et un dépôt public permettant d'inspecter l'organisation du code.",
            techs: ["Symfony 6.4", "Doctrine", "MySQL", "Docker"],
            image: "./images/projects/streamcorner/cover.webp",
            imageAlt: "Aperçu de la boutique StreamCorner",
            imagePosition: "center",
            projectId: "3",
            action: "Examiner StreamCorner",
            role: "Développement full-stack",
            nodes: [
                { label: "Interface", value: "Twig + JS", icon: "fas fa-window-maximize" },
                { label: "Application", value: "Symfony 6.4", icon: "fab fa-symfony" },
                { label: "Modèle", value: "Doctrine", icon: "fas fa-layer-group" },
                { label: "Données", value: "MySQL", icon: "fas fa-database" }
            ]
        },
        interaction: {
            accent: "#43dfff",
            status: "Jessica Dew / itération client",
            index: "03 / 04",
            context: "Client · UI/UX",
            mediaType: "Site vitrine sur mesure",
            project: "Jessica Dew",
            title: "Capter l'attention sans détourner le regard du contenu.",
            summary: "Une interface efficace attire l'œil, hiérarchise l'information et conduit naturellement vers la prise de contact.",
            need: "Mettre en valeur l'univers d'une photographe sans laisser la mise en scène visuelle masquer les informations utiles.",
            decision: "Construire une direction éditoriale centrée sur l'image, une navigation courte et des points de contact visibles sur chaque format.",
            proof: "Maquettes sur mesure, galerie responsive, hiérarchie typographique et itérations menées selon les retours de la cliente.",
            techs: ["UI/UX", "HTML", "CSS", "JavaScript"],
            image: "./images/projects/jessica-dew/gallery/accueil.png",
            imageAlt: "Page d'accueil du site de la photographe Jessica Dew",
            imagePosition: "center",
            projectId: "1",
            action: "Examiner Jessica Dew",
            role: "UI/UX & intégration",
            nodes: [
                { label: "Attention", value: "Image d'abord", icon: "fas fa-eye" },
                { label: "Parcours", value: "Navigation claire", icon: "fas fa-route" },
                { label: "Interface", value: "Responsive", icon: "fas fa-display" },
                { label: "Conversion", value: "Prise de contact", icon: "fas fa-envelope" }
            ]
        },
        delivery: {
            accent: "#43dfff",
            status: "Wheello / livré",
            index: "04 / 04",
            context: "Client · Transmission",
            mediaType: "Livraison client",
            project: "Wheello",
            title: "Livrer un produit que d'autres peuvent réellement reprendre.",
            summary: "La qualité se mesure aussi après le développement\u00a0: sécurité, conformité, documentation et procédure de déploiement font partie du produit.",
            need: "Remettre une solution exploitable par l'association, avec des données sensibles et plusieurs profils utilisateurs.",
            decision: "Intégrer tests, rôles, conservation des données, RGPD, documentation et préparation du déploiement dès la conception.",
            proof: "Guides administrateur et utilisateur, procédure de mise en production, APK, archivage et anonymisation documentés.",
            techs: ["PHPUnit", "RGPD", "Docker", "Documentation"],
            image: "./images/projects/wheello/gallery/back-office/bilan-kilometrique.png",
            imageAlt: "Bilan kilométrique dans le back-office Wheello",
            imagePosition: "center",
            projectId: "4",
            action: "Voir la livraison Wheello",
            role: "Livraison & documentation",
            nodes: [
                { label: "Contrôle", value: "PHPUnit", icon: "fas fa-vial-circle-check" },
                { label: "Conformité", value: "RGPD", icon: "fas fa-user-shield" },
                { label: "Déploiement", value: "Docker + APK", icon: "fas fa-box-open" },
                { label: "Transmission", value: "Documentation", icon: "fas fa-book-open" }
            ]
        }
    };

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;

    let activeStageId = "home";
    let lockedScrollY = 0;
    let restoreScrollBehaviorFrame = null;
    let scrollBehaviorBeforeRestore = null;
    let scrollAnimationFrame = null;
    let scrollInterruptHandlers = [];
    let pageMotionFrame = null;
    let terminalBorderResizeObserver = null;

    const getOpenLayers = () =>
        document.querySelectorAll(".modal-overlay.active, .project-modal-wrap.active, .image-lightbox.active, .fs-menu.active").length;

    const clearScrollInterrupts = () => {
        scrollInterruptHandlers.forEach(([type, handler]) => {
            window.removeEventListener(type, handler, true);
        });
        scrollInterruptHandlers = [];
    };

    const cancelSmoothScroll = () => {
        if (scrollAnimationFrame) {
            cancelAnimationFrame(scrollAnimationFrame);
            scrollAnimationFrame = null;
        }

        clearScrollInterrupts();
    };

    const watchScrollInterrupts = () => {
        clearScrollInterrupts();

        ["wheel", "touchstart", "keydown"].forEach((type) => {
            const handler = () => cancelSmoothScroll();
            window.addEventListener(type, handler, { capture: true, passive: true, once: true });
            scrollInterruptHandlers.push([type, handler]);
        });
    };

    const restoreScrollInstantly = (scrollY) => {
        cancelSmoothScroll();

        const root = document.documentElement;

        if (restoreScrollBehaviorFrame) {
            cancelAnimationFrame(restoreScrollBehaviorFrame);
        } else {
            scrollBehaviorBeforeRestore = root.style.scrollBehavior;
        }

        root.style.scrollBehavior = "auto";
        window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });

        restoreScrollBehaviorFrame = requestAnimationFrame(() => {
            if (scrollBehaviorBeforeRestore) {
                root.style.scrollBehavior = scrollBehaviorBeforeRestore;
            } else {
                root.style.removeProperty("scroll-behavior");
            }

            scrollBehaviorBeforeRestore = null;
            restoreScrollBehaviorFrame = null;
        });
    };

    const lockPageScroll = () => {
        if (body.classList.contains("lock-scroll")) return;

        lockedScrollY = window.scrollY || document.documentElement.scrollTop || 0;
        body.style.top = `-${lockedScrollY}px`;
        body.classList.add("lock-scroll");
    };

    const unlockPageScroll = () => {
        if (!body.classList.contains("lock-scroll")) return;

        const targetScrollY = lockedScrollY;
        body.classList.remove("lock-scroll");
        body.style.removeProperty("top");
        restoreScrollInstantly(targetScrollY);
    };

    const syncScrollState = () => {
        if (getOpenLayers() > 0) {
            lockPageScroll();
        } else {
            unlockPageScroll();
        }
    };

    const openLayer = (layer) => {
        if (!layer) return;
        layer.classList.add("active");
        layer.setAttribute("aria-hidden", "false");
        syncScrollState();
    };

    const closeLayer = (layer) => {
        if (!layer) return;
        layer.classList.remove("active");
        layer.setAttribute("aria-hidden", "true");
        syncScrollState();
    };

    const runPreloader = () => {
        if (!preloader || !preloaderCounter || !preloaderFill) return;

        if (prefersReducedMotion) {
            preloaderCounter.textContent = "100";
            preloaderFill.style.width = "100%";
            preloader.classList.add("hide");
            return;
        }

        let count = 0;
        const interval = setInterval(() => {
            count += Math.floor(Math.random() * 10) + 2;
            if (count > 100) count = 100;

            preloaderCounter.textContent = String(count);
            preloaderFill.style.width = `${count}%`;

            if (count === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    preloader.classList.add("hide");
                }, 280);
            }
        }, 48);
    };

    const rotateSignature = () => {
        if (!signatureWord || prefersReducedMotion) return;

        let signatureIndex = 0;
        setInterval(() => {
            signatureIndex = (signatureIndex + 1) % signatureWords.length;
            signatureWord.textContent = signatureWords[signatureIndex];
        }, 1800);
    };

    const updateSectionMotion = () => {
        if (!sectionTitles.length || prefersReducedMotion) return;

        const viewportMid = window.innerHeight * 0.5;

        sectionTitles.forEach((title) => {
            const rect = title.getBoundingClientRect();
            const delta = (rect.top - viewportMid) / viewportMid;
            const shift = Math.max(-12, Math.min(12, -delta * 12));
            const energy = Math.max(0, 1 - Math.abs(delta));
            const borderAlpha = 0.2 + energy * 0.45;

            title.style.transform = `translateX(${shift}px)`;
            title.style.borderColor = `rgba(204, 255, 0, ${borderAlpha.toFixed(2)})`;
        });
    };

    const setActiveNavById = (id) => {
        navAnchors.forEach((anchor) => {
            const href = anchor.getAttribute("href") || "";
            anchor.classList.toggle("active", href === `#${id}`);
        });
    };

    const updateBuildScroll = () => {
        if (!buildSections.length && !homeSection) return;

        const vh = window.innerHeight;
        const railSections = [homeSection, ...Array.from(buildSections)].filter(Boolean);
        const activationLine = vh * 0.34;

        let activeId = homeSection ? "home" : buildSections[0]?.id || "";
        let closest = Infinity;
        let sectionAtActivationLine = null;

        railSections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top - activationLine);

            if (rect.top <= activationLine && rect.bottom > activationLine) {
                sectionAtActivationLine = section;
            }

            if (distance < closest) {
                closest = distance;
                activeId = section.id;
            }
        });

        if (sectionAtActivationLine) {
            activeId = sectionAtActivationLine.id;
        }

        if (activeId !== activeStageId) {
            activeStageId = activeId;
            setActiveNavById(activeId);
        }

        buildSections.forEach((section) => {
            section.classList.toggle("stage-active", section.id === activeId);
        });

        if (storyRail && storyRailFill) {
            const first = railSections[0];
            const last = railSections[railSections.length - 1];
            const firstY = first.offsetTop;
            const lastY = last.offsetTop + last.offsetHeight;
            const currentY = window.scrollY;
            const ratio = clamp((currentY - firstY) / Math.max(1, lastY - firstY), 0, 1);
            storyRailFill.style.transform = `scaleY(${ratio})`;

            storyDots.forEach((dot) => {
                dot.classList.toggle("active", dot.dataset.target === activeId);
            });
        }
    };

    const updateJourneyProgress = () => {
        if (!journeyTrack || !journeyProgress) return;

        if (prefersReducedMotion) {
            journeyProgress.style.transform = "scaleY(1)";
            journeyItems.forEach((item) => {
                item.style.setProperty("--journey-opacity", "1");
                item.style.setProperty("--journey-shift", "0px");
                item.style.setProperty("--journey-scale", "1");
                item.style.setProperty("--journey-dot-scale", "1");
                item.classList.add("is-journey-visible");
            });
            return;
        }

        const rect = journeyTrack.getBoundingClientRect();
        const startAnchor = window.innerHeight * 0.72;
        const endAnchor = window.innerHeight * 0.34;
        const travel = Math.max(1, rect.height + startAnchor - endAnchor);
        const progress = clamp((startAnchor - rect.top) / travel, 0, 1);

        journeyProgress.style.transform = `scaleY(${progress.toFixed(4)})`;

        const revealStart = window.innerHeight * 0.9;
        const revealEnd = window.innerHeight * 0.56;
        const revealDistance = Math.max(1, revealStart - revealEnd);

        journeyItems.forEach((item) => {
            const itemTop = item.getBoundingClientRect().top;
            const rawProgress = clamp((revealStart - itemTop) / revealDistance, 0, 1);
            const itemProgress = rawProgress * rawProgress * (3 - 2 * rawProgress);

            item.style.setProperty("--journey-opacity", itemProgress.toFixed(4));
            item.style.setProperty("--journey-shift", `${((1 - itemProgress) * 58).toFixed(2)}px`);
            item.style.setProperty("--journey-scale", (0.975 + itemProgress * 0.025).toFixed(4));
            item.style.setProperty("--journey-dot-scale", (0.62 + itemProgress * 0.38).toFixed(4));
            item.classList.toggle("is-journey-visible", itemProgress > 0.04);
        });
    };

    const updateNavbar = () => {
        if (navbar) {
            navbar.classList.toggle("sticky", window.scrollY > 20);
        }

        if (isFinePointer) {
            body.style.setProperty("--grid-y", `${window.scrollY * -0.025}px`);
        }

        updateSectionMotion();
        updateBuildScroll();
        updateJourneyProgress();
    };

    const schedulePageMotion = () => {
        if (pageMotionFrame) return;

        pageMotionFrame = requestAnimationFrame(() => {
            pageMotionFrame = null;
            updateNavbar();
        });
    };

    const openMenu = () => {
        if (!fsMenu || !openMenuBtn) return;
        openLayer(fsMenu);
        openMenuBtn.setAttribute("aria-expanded", "true");
    };

    const closeMenu = () => {
        if (!fsMenu || !openMenuBtn) return;
        closeLayer(fsMenu);
        openMenuBtn.setAttribute("aria-expanded", "false");
    };

    if (openMenuBtn) {
        openMenuBtn.addEventListener("click", openMenu);
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener("click", closeMenu);
    }

    if (fsMenu) {
        fsMenu.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener("click", closeMenu);
        });
    }

    const smoothScrollTo = (targetY) => {
        cancelSmoothScroll();

        const to = Math.max(0, targetY);

        if (prefersReducedMotion) {
            window.scrollTo(0, to);
            return;
        }

        const from = window.scrollY;
        const distance = to - from;
        if (Math.abs(distance) < 4) return;

        const duration = clamp(360 + Math.abs(distance) * 0.36, 560, 1020);
        let startTime = null;

        watchScrollInterrupts();

        const frame = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min(1, (timestamp - startTime) / duration);
            const eased = 0.5 - Math.cos(progress * Math.PI) / 2;

            window.scrollTo(0, from + distance * eased);

            if (progress < 1) {
                scrollAnimationFrame = requestAnimationFrame(frame);
            } else {
                scrollAnimationFrame = null;
                clearScrollInterrupts();
            }
        };

        scrollAnimationFrame = requestAnimationFrame(frame);
    };

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const href = anchor.getAttribute("href");
            if (!href || href === "#") return;

            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();
            const offset = href === "#home" ? 0 : (window.innerWidth > 980 ? 88 : 72);
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            smoothScrollTo(top);
        });
    });

    const setupTerminalBorderOrbit = () => {
        const track = document.querySelector(".terminal-border-track");
        const orbit = track?.querySelector(".terminal-border-orbit");
        const borderRects = track ? Array.from(track.querySelectorAll("rect")) : [];

        if (!track || !orbit || borderRects.length === 0) return;

        let resizeFrame = null;

        const updateGeometry = () => {
            resizeFrame = null;

            const inset = 2;
            const width = Math.max(1, track.clientWidth - inset * 2);
            const height = Math.max(1, track.clientHeight - inset * 2);
            const radius = Math.min(18, width / 2, height / 2);

            borderRects.forEach((rect) => {
                rect.setAttribute("x", inset.toFixed(2));
                rect.setAttribute("y", inset.toFixed(2));
                rect.setAttribute("width", width.toFixed(2));
                rect.setAttribute("height", height.toFixed(2));
                rect.setAttribute("rx", radius.toFixed(2));
                rect.setAttribute("ry", radius.toFixed(2));
            });

            const perimeter = orbit.getTotalLength();
            const segment = Math.min(132, Math.max(86, perimeter * 0.07));
            const oppositeGap = Math.max(1, perimeter / 2 - segment);
            const duration = Math.min(9, Math.max(5.5, perimeter / 260));

            track.style.setProperty("--terminal-orbit-segment", `${segment.toFixed(2)}px`);
            track.style.setProperty("--terminal-orbit-gap", `${oppositeGap.toFixed(2)}px`);
            track.style.setProperty("--terminal-orbit-distance", `${(-perimeter).toFixed(2)}px`);
            track.style.setProperty("--terminal-orbit-duration", `${duration.toFixed(2)}s`);
            track.classList.add("is-ready");
        };

        const scheduleGeometry = () => {
            if (resizeFrame) return;
            resizeFrame = requestAnimationFrame(updateGeometry);
        };

        updateGeometry();

        if ("ResizeObserver" in window) {
            terminalBorderResizeObserver = new ResizeObserver(scheduleGeometry);
            terminalBorderResizeObserver.observe(track);
        } else {
            window.addEventListener("resize", scheduleGeometry, { passive: true });
        }
    };

    const setupInteractiveTerminal = () => {
        if (!terminalOutput || !terminalForm || !terminalInput) return;

        const terminalCommands = {
            "/help": {
                lines: [
                    "Je peux répondre comme un mini assistant de portfolio.",
                    "Commandes: /about, /skills, /projects, /minecraft, /formation, /personality, /goals, /contact, /cv, /clear.",
                    "Tu peux aussi écrire: qui es-tu, quels projets, quelle stack, objectif, contact..."
                ]
            },
            "/about": {
                lines: [
                    "Raphaël Coursier, étudiant en BTS SIO option SLAM au lycée Guy Mollet.",
                    "Je construis des interfaces web avec une vraie direction visuelle, mais je garde en priorité la clarté, l'ergonomie et une base technique maintenable.",
                    "Mon cap: évoluer vers un profil d'ingénieur capable de cadrer un besoin, structurer une architecture propre et livrer un produit durable."
                ],
                action: { label: "Voir la section À propos", target: "#manifesto" }
            },
            "/skills": {
                lines: [
                    "Stack actuelle: Symfony, PHP, API REST, JWT, Flutter, MySQL, Doctrine, JavaScript, Stimulus, HTML/CSS et Git.",
                    "Mes points forts: interfaces propres, logique métier, sécurité API, organisation de code, documentation et livraison client.",
                    "Wheello m'a fait progresser sur un vrai périmètre full-stack: back-office, mobile, données, RGPD, tests et mise en production."
                ],
                action: { label: "Voir le savoir-faire", target: "#savoir-faire" }
            },
            "/projects": {
                lines: [
                    "Le portfolio présente 8 projets, avec Wheello en projet client principal et La Citadelle Rouge comme nouvelle map Minecraft automatisée.",
                    "On y retrouve des projets client, des projets académiques, un jeu web jouable et une démo 3D interactive directement dans le site.",
                    "La logique: montrer ma progression, pas juste empiler des maquettes. Chaque projet précise son rôle, son état et son impact."
                ],
                action: { label: "Voir les projets", target: "#projects" }
            },
            "/minecraft": {
                lines: [
                    "La Citadelle Rouge est une map aventure Minecraft Bedrock pensée comme un donjon automatisé.",
                    "Le joueur avance entre indices, parkour, énigmes, labyrinthes et combats pendant que la Redstone et les blocs de commande pilotent les portes, le loot et les vagues de mobs.",
                    "Chaque épreuve peut revenir à son état initial grâce aux chaînes de commandes, notamment /clone pour restaurer les zones et /give pour distribuer l'équipement."
                ],
                action: { label: "Ouvrir La Citadelle Rouge", projectId: 8 }
            },
            "/formation": {
                lines: [
                    "Parcours actuel: BTS SIO option SLAM au lycée Guy Mollet de 2025 à 2027, après une L1 SID LAS et une année de BTS Audiovisuel.",
                    "Expérience: stage de première année chez Habitat Insertion de mai à juillet 2026; le stage de deuxième année est prévu en janvier et février 2027.",
                    "Point de départ: baccalauréat obtenu avec mention assez bien au lycée La Malassise en juillet 2023."
                ],
                action: { label: "Voir mon parcours", target: "#journey-timeline" }
            },
            "/personality": {
                lines: [
                    "Je suis orienté progression: je préfère livrer une base claire, puis l'améliorer par itération.",
                    "J'aime les interfaces avec une identité forte, mais je garde une contrainte centrale: l'utilisateur doit comprendre vite et agir sans friction.",
                    "Mes valeurs de travail: rigueur, créativité, cohérence et delivery concret."
                ]
            },
            "/goals": {
                lines: [
                    "Objectif court terme: consolider mes compétences web, Symfony, SQL, JavaScript et UI/UX.",
                    "Objectif moyen terme: intégrer des projets plus complets, avec architecture propre, logique métier et vraie maintenabilité.",
                    "Objectif long terme: devenir ingénieur logiciel avec une culture produit solide."
                ]
            },
            "/hello": {
                lines: [
                    "Salut, je suis l'assistant rapide du portfolio de Raphaël.",
                    "Je peux te parler de son profil, de sa stack, de ses projets, de sa formation ou de ses objectifs.",
                    "Tape une question courte comme \"quels projets\" ou une commande comme /skills."
                ]
            },
            "/contact": {
                lines: [
                    "Contact: contact@rfielbal.fr",
                    "LinkedIn et GitHub sont disponibles dans la section contact.",
                    "Je suis ouvert aux projets web, stages, collaborations et opportunités liées au développement."
                ],
                action: { label: "Aller au contact", target: "#contact" }
            },
            "/cv": {
                lines: [
                    "Mon CV est disponible sur demande.",
                    "Le bouton ci-dessous prépare directement un email pour le recevoir."
                ],
                action: { label: "Demander le CV", href: "mailto:contact@rfielbal.fr?subject=Demande%20de%20CV" }
            }
        };

        const aliases = {
            "/a propos": "/about",
            "/apropos": "/about",
            "/qui": "/about",
            "/qui es tu": "/about",
            "/qui es-tu": "/about",
            "/qui es tu ?": "/about",
            "/qui es-tu ?": "/about",
            "/presente toi": "/about",
            "/présente toi": "/about",
            "/competences": "/skills",
            "/compétences": "/skills",
            "/stack": "/skills",
            "/technos": "/skills",
            "/technologies": "/skills",
            "/quelles competences": "/skills",
            "/quelles compétences": "/skills",
            "/projets": "/projects",
            "/quels projets": "/projects",
            "/tes projets": "/projects",
            "/travaux": "/projects",
            "/minecraft": "/minecraft",
            "/citadelle": "/minecraft",
            "/citadelle rouge": "/minecraft",
            "/la citadelle rouge": "/minecraft",
            "/redstone": "/minecraft",
            "/ecole": "/formation",
            "/école": "/formation",
            "/formation scolaire": "/formation",
            "/parcours": "/formation",
            "/personnalite": "/personality",
            "/personnalité": "/personality",
            "/qualites": "/personality",
            "/qualités": "/personality",
            "/objectif": "/goals",
            "/objectifs": "/goals",
            "/ambition": "/goals",
            "/bonjour": "/hello",
            "/salut": "/hello",
            "/hello": "/hello",
            "/assistant": "/hello",
            "/mail": "/contact",
            "/email": "/contact",
            "/clear": "/clear",
            "/cls": "/clear"
        };

        const normalizeCommand = (value) => {
            const trimmed = value.trim();
            if (!trimmed) return "";

            const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
            const normalized = withSlash
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, " ");

            return aliases[normalized] || normalized;
        };

        const appendLine = (type, text) => {
            const line = document.createElement("p");
            line.className = `terminal-line ${type}`;

            if (type === "command") {
                const prompt = document.createElement("span");
                prompt.className = "line-prompt";
                prompt.textContent = "$";
                line.append(prompt, document.createTextNode(` ${text}`));
            } else {
                line.textContent = text;
            }

            terminalOutput.appendChild(line);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        };

        const appendAction = (action) => {
            if (!action || !action.label) return;

            const wrapper = document.createElement("div");
            wrapper.className = "terminal-actions";

            const control = document.createElement(action.href || action.target ? "a" : "button");
            control.className = "terminal-action";
            control.textContent = action.label;

            if (action.href) {
                control.href = action.href;
                control.target = "_blank";
                control.rel = "noopener noreferrer";
            } else if (action.target) {
                control.href = action.target;
                control.addEventListener("click", (event) => {
                    event.preventDefault();
                    goToTarget(action.target);
                });
            } else if (action.projectId) {
                control.type = "button";
                control.addEventListener("click", () => openProject(action.projectId));
            } else {
                control.type = "button";
            }

            wrapper.appendChild(control);
            terminalOutput.appendChild(wrapper);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        };

        const goToTarget = (selector) => {
            const target = document.querySelector(selector);
            if (!target) return;

            const offset = window.innerWidth > 980 ? 88 : 72;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            smoothScrollTo(top);
        };

        const runTerminalCommand = (rawValue, echo = true) => {
            const command = normalizeCommand(rawValue);
            if (!command) return;

            if (echo) appendLine("command", rawValue.trim());

            if (command === "/clear") {
                terminalOutput.innerHTML = "";
                appendLine("response", "Terminal réinitialisé. Tape /help pour revoir les commandes.");
                return;
            }

            const entry = terminalCommands[command];

            if (!entry) {
                appendLine("error", `Commande inconnue: ${command}`);
                appendLine("response", "Essaie /help, /about, /skills, /projects ou /contact.");
                return;
            }

            entry.lines.forEach((line, index) => {
                setTimeout(() => appendLine("response", line), index * 70);
            });

            if (entry.action) {
                setTimeout(() => appendAction(entry.action), entry.lines.length * 70 + 90);
            }
        };

        terminalForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const value = terminalInput.value;
            terminalInput.value = "";
            runTerminalCommand(value);
        });

        terminalSuggestions.forEach((button) => {
            button.addEventListener("click", () => {
                const command = button.dataset.terminalCommand || "/help";
                terminalInput.value = command;
                runTerminalCommand(command);
                terminalInput.focus();
            });
        });

        appendLine("response", "Bienvenue. Je peux répondre sur mon profil, ma stack, mes projets et mon parcours.");
        appendLine("response", "Tape /help ou pose une question courte.");
    };

    const bindCapabilityExplorer = () => {
        if (!capabilityStage || !capabilityPanel || capabilityTabs.length === 0) return;

        let transitionTimer = null;

        const renderCapability = (key, immediate = false) => {
            const data = capabilityCases[key];
            const activeTab = capabilityTabs.find((tab) => tab.dataset.capability === key);

            if (!data || !activeTab) return;
            if (!immediate && capabilityStage.dataset.capability === key) return;

            window.clearTimeout(transitionTimer);
            capabilityStage.classList.remove("is-ready");
            capabilityStage.classList.toggle("is-switching", !immediate);

            const commit = () => {
                capabilityStage.dataset.capability = key;
                capabilityStage.style.setProperty("--capability-accent", data.accent);

                capabilityTabs.forEach((tab) => {
                    const isActive = tab === activeTab;
                    tab.classList.toggle("is-active", isActive);
                    tab.setAttribute("aria-selected", String(isActive));
                    tab.tabIndex = isActive ? 0 : -1;
                });

                capabilityPanel.setAttribute("aria-labelledby", activeTab.id);

                if (capabilityStageStatus) capabilityStageStatus.textContent = data.status;
                if (capabilityIndex) capabilityIndex.textContent = data.index;
                if (capabilityContext) capabilityContext.textContent = data.context;
                if (capabilityMediaType) capabilityMediaType.textContent = data.mediaType;
                if (capabilityMediaProject) capabilityMediaProject.textContent = data.project;
                if (capabilityTitle) capabilityTitle.textContent = data.title;
                if (capabilitySummary) capabilitySummary.textContent = data.summary;
                if (capabilityNeed) capabilityNeed.textContent = data.need;
                if (capabilityDecision) capabilityDecision.textContent = data.decision;
                if (capabilityProof) capabilityProof.textContent = data.proof;
                if (capabilityRole) capabilityRole.textContent = data.role;

                if (capabilityImage) {
                    capabilityImage.src = data.image;
                    capabilityImage.alt = data.imageAlt;
                    capabilityImage.style.objectPosition = data.imagePosition || "center";
                }

                capabilityNodes.forEach((node, index) => {
                    const nodeData = data.nodes[index];
                    if (!nodeData) return;

                    const icon = node.querySelector("i");
                    const label = node.querySelector("span");
                    const value = node.querySelector("strong");

                    if (icon) icon.className = nodeData.icon;
                    if (label) label.textContent = nodeData.label;
                    if (value) value.textContent = nodeData.value;
                });

                if (capabilityMap) {
                    capabilityMap.setAttribute("aria-label", `Architecture présentée pour ${data.project}`);
                }

                if (capabilityTechs) {
                    const techElements = data.techs.map((tech) => {
                        const element = document.createElement("span");
                        element.textContent = tech;
                        return element;
                    });
                    capabilityTechs.replaceChildren(...techElements);
                }

                if (capabilityOpenProject) {
                    const icon = document.createElement("i");
                    icon.className = "fas fa-arrow-right";
                    icon.setAttribute("aria-hidden", "true");
                    capabilityOpenProject.dataset.capabilityProject = data.projectId;
                    capabilityOpenProject.setAttribute("aria-label", `${data.action} dans la fenêtre projet`);
                    capabilityOpenProject.replaceChildren(document.createTextNode(data.action), icon);
                }

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        capabilityStage.classList.add("is-ready");
                        capabilityStage.classList.remove("is-switching");
                    });
                });
            };

            if (immediate) {
                commit();
            } else {
                transitionTimer = window.setTimeout(commit, 120);
            }
        };

        capabilityTabs.forEach((tab, index) => {
            tab.addEventListener("click", () => renderCapability(tab.dataset.capability));

            tab.addEventListener("keydown", (event) => {
                const lastIndex = capabilityTabs.length - 1;
                let nextIndex = null;

                if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                    nextIndex = index === lastIndex ? 0 : index + 1;
                } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                    nextIndex = index === 0 ? lastIndex : index - 1;
                } else if (event.key === "Home") {
                    nextIndex = 0;
                } else if (event.key === "End") {
                    nextIndex = lastIndex;
                }

                if (nextIndex === null) return;

                event.preventDefault();
                const nextTab = capabilityTabs[nextIndex];
                nextTab.focus();
                renderCapability(nextTab.dataset.capability);
            });
        });

        if (capabilityOpenProject) {
            capabilityOpenProject.addEventListener("click", () => {
                openProject(capabilityOpenProject.dataset.capabilityProject);
            });
        }

        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            capabilityStage.classList.add("is-in-view");
        } else {
            const capabilityObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        capabilityStage.classList.toggle("is-in-view", entry.isIntersecting);
                    });
                },
                { threshold: 0.14, rootMargin: "80px 0px 80px 0px" }
            );
            capabilityObserver.observe(capabilityStage);
        }

        renderCapability("product", true);
    };

    const revealObserver = "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.17,
                rootMargin: "0px 0px -60px 0px"
            }
        )
        : {
            observe: (element) => element.classList.add("is-visible"),
            unobserve: () => undefined
        };

    const bindRevealElements = () => {
        document.querySelectorAll(".reveal").forEach((element) => {
            if (element.dataset.bound === "1") return;
            element.dataset.bound = "1";
            revealObserver.observe(element);
        });
    };

    const bindMagnetic = (scope = document) => {
        if (!isFinePointer || prefersReducedMotion) return;

        scope.querySelectorAll("[data-magnetic]").forEach((element) => {
            if (element.dataset.magneticBound === "1") return;
            element.dataset.magneticBound = "1";

            let magneticFrame = null;
            let lastEvent = null;

            const reset = () => {
                if (magneticFrame) {
                    cancelAnimationFrame(magneticFrame);
                    magneticFrame = null;
                }

                element.style.setProperty("--mx", "0px");
                element.style.setProperty("--my", "0px");
            };

            element.addEventListener("mousemove", (event) => {
                lastEvent = event;
                if (magneticFrame) return;

                magneticFrame = requestAnimationFrame(() => {
                    if (!lastEvent) {
                        magneticFrame = null;
                        return;
                    }

                    const rect = element.getBoundingClientRect();
                    const offsetX = lastEvent.clientX - (rect.left + rect.width / 2);
                    const offsetY = lastEvent.clientY - (rect.top + rect.height / 2);
                    const moveX = Math.max(-8, Math.min(8, offsetX * 0.16));
                    const moveY = Math.max(-8, Math.min(8, offsetY * 0.16));

                    element.style.setProperty("--mx", `${moveX}px`);
                    element.style.setProperty("--my", `${moveY}px`);
                    magneticFrame = null;
                });
            });

            element.addEventListener("mouseleave", reset);
            element.addEventListener("blur", reset);
        });
    };

    const bindProjectTilt = () => {
        if (!isFinePointer || prefersReducedMotion) return;

        document.querySelectorAll(".project-card").forEach((card) => {
            if (card.dataset.tiltBound === "1") return;
            card.dataset.tiltBound = "1";

            let tiltFrame = null;
            let lastEvent = null;

            const resetTilt = () => {
                if (tiltFrame) {
                    cancelAnimationFrame(tiltFrame);
                    tiltFrame = null;
                }

                card.style.setProperty("--tilt-x", "0deg");
                card.style.setProperty("--tilt-y", "0deg");
                card.style.setProperty("--spot-x", "50%");
                card.style.setProperty("--spot-y", "50%");
            };

            card.addEventListener("mousemove", (event) => {
                lastEvent = event;
                if (tiltFrame) return;

                tiltFrame = requestAnimationFrame(() => {
                    if (!lastEvent) {
                        tiltFrame = null;
                        return;
                    }

                    const rect = card.getBoundingClientRect();
                    const relX = lastEvent.clientX - rect.left;
                    const relY = lastEvent.clientY - rect.top;
                    const ratioX = relX / rect.width;
                    const ratioY = relY / rect.height;

                    const tiltY = (ratioX - 0.5) * 5;
                    const tiltX = (0.5 - ratioY) * 4;

                    card.style.setProperty("--tilt-x", `${tiltX}deg`);
                    card.style.setProperty("--tilt-y", `${tiltY}deg`);
                    card.style.setProperty("--spot-x", `${ratioX * 100}%`);
                    card.style.setProperty("--spot-y", `${ratioY * 100}%`);
                    tiltFrame = null;
                });
            });

            card.addEventListener("mouseleave", resetTilt);
        });
    };

    const animateStats = () => {
        if (!heroStats) return;

        const counters = heroStats.querySelectorAll(".val[data-target]");
        if (!counters.length) return;

        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            counters.forEach((counter) => {
                counter.textContent = `${counter.dataset.target || "0"}${counter.dataset.suffix || ""}`;
                counter.dataset.done = "1";
            });
            return;
        }

        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    counters.forEach((counter) => {
                        if (counter.dataset.done === "1") return;

                        const target = Number(counter.dataset.target || "0");
                        const suffix = counter.dataset.suffix || "";
                        let value = 0;
                        const step = Math.max(1, Math.ceil(target / 36));

                        const timer = setInterval(() => {
                            value += step;
                            if (value >= target) {
                                value = target;
                                clearInterval(timer);
                                counter.dataset.done = "1";
                            }
                            counter.textContent = `${value}${suffix}`;
                        }, 32);
                    });

                    counterObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.45
            }
        );

        counterObserver.observe(heroStats);
    };

    const syncMissionPanel = (step) => {
        if (!step) return;

        manifestoSteps.forEach((item) => item.classList.toggle("is-active", item === step));

        if (missionStepTitle) {
            missionStepTitle.textContent = step.dataset.title || "";
        }

        if (missionStepText) {
            missionStepText.textContent = step.dataset.text || "";
        }

        missionSignals.forEach((signal) => signal.classList.remove("active"));

        const list = (step.dataset.signals || "").split(",").map((value) => value.trim()).filter(Boolean);
        list.forEach((name) => {
            const targetSignal = document.querySelector(`[data-signal="${name}"]`);
            if (targetSignal) targetSignal.classList.add("active");
        });
    };

    const bindManifestoFlow = () => {
        if (!manifestoSteps.length) return;

        syncMissionPanel(manifestoSteps[0]);

        const stepObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    syncMissionPanel(entry.target);
                });
            },
            {
                threshold: 0.52,
                rootMargin: "-20% 0px -24% 0px"
            }
        );

        manifestoSteps.forEach((step) => stepObserver.observe(step));
    };

    const renderProjectVisual = (project) => {
        if (project.cover) {
            return `<img src="${project.cover}" alt="Aperçu du projet ${project.title}" loading="lazy" decoding="async">`;
        }

        return `
            <div class="project-placeholder" aria-label="Emplacement visuel à compléter">
                <i class="fas fa-layer-group" aria-hidden="true"></i>
                <strong>${project.coverLabel || "Visuels à intégrer"}</strong>
                <span>Captures à ajouter</span>
            </div>
        `;
    };

    const renderProjectModalMedia = (data) => {
        let imageMarkup = "";

        if (data.galleryLayout === "case-study") {
            const imagesByGroup = (data.images || []).reduce((groups, image) => {
                const item = typeof image === "string"
                    ? { src: image, alt: `Aperçu ${data.title}`, caption: "Capture du projet", group: "Captures", orientation: "landscape" }
                    : image;

                const groupName = item.group || "Captures";
                groups[groupName] = groups[groupName] || [];
                groups[groupName].push(item);
                return groups;
            }, {});

            imageMarkup = Object.entries(imagesByGroup)
                .map(([groupName, images]) => `
                    <section class="pm-showcase pm-image-showcase">
                        <h4>${groupName}</h4>
                        <div class="pm-image-grid ${images.some((image) => image.orientation === "portrait") ? "has-portrait" : "has-landscape"}">
                            ${images.map((image) => `
                                <figure class="pm-image-card is-${image.orientation || "landscape"}">
                                    <button class="pm-image-zoom js-image-zoom" type="button" data-src="${image.src}" data-alt="${image.alt || `Aperçu ${data.title}`}" data-caption="${image.caption || "Capture du projet"}" aria-label="Afficher cette capture en grand">
                                        <img src="${image.src}" alt="${image.alt || `Aperçu ${data.title}`}" loading="lazy" decoding="async">
                                        <span><i class="fas fa-up-right-and-down-left-from-center"></i> Agrandir</span>
                                    </button>
                                    <figcaption>${image.caption || "Capture du projet"}</figcaption>
                                </figure>
                            `).join("")}
                        </div>
                    </section>
                `)
                .join("");
        } else {
            imageMarkup = (data.images || [])
                .map((image) => {
                    const src = typeof image === "string" ? image : image.src;
                    const alt = typeof image === "string" ? `Aperçu ${data.title}` : image.alt || `Aperçu ${data.title}`;
                    return `<img src="${src}" alt="${alt}" loading="lazy" decoding="async">`;
                })
                .join("");
        }

        const slotMarkup = (data.imageSlots || [])
            .map((slot, index) => `
                <article class="pm-media-slot">
                    <span>Image ${String(index + 1).padStart(2, "0")}</span>
                    <h5>${slot.title}</h5>
                    <p>${slot.description}</p>
                </article>
            `)
            .join("");

        const featureMarkup = (data.features || []).length
            ? `
                <section class="pm-showcase pm-feature-showcase">
                    <h4>RÉALISATIONS CLÉS</h4>
                    <div class="pm-feature-grid">
                        ${data.features.map((feature) => `<p><i class="fas fa-check"></i>${feature}</p>`).join("")}
                    </div>
                </section>
            `
            : "";

        const videoFrameMarkup = data.videoSpot?.localSource
            ? `
                <div class="pm-video-frame has-video">
                    <video class="pm-video-player" controls preload="metadata" playsinline muted>
                        <source src="${data.videoSpot.localSource}" type="video/mp4">
                        Votre navigateur ne peut pas lire cette vidéo.
                    </video>
                </div>
            `
            : `
                <div class="pm-video-frame" aria-label="Emplacement vidéo portrait">
                    <i class="fas fa-play"></i>
                    <span>Format portrait</span>
                    <small>9:16</small>
                </div>
            `;

        const videoActionsMarkup = data.videoSpot
            ? (data.videoSpot.localSource
                ? `
                    <a href="${data.videoSpot.url}" target="_blank" rel="noopener noreferrer" class="btn-simple">
                        Voir sur LinkedIn <i class="fab fa-linkedin-in"></i>
                    </a>
                `
                : `
                    <a href="${data.videoSpot.url}" target="_blank" rel="noopener noreferrer" class="btn-simple">
                        Voir l'épisode <i class="fab fa-linkedin-in"></i>
                    </a>
                `)
            : "";

        const videoHighlightsMarkup = (data.videoSpot?.highlights || []).length
            ? `
                <ul class="pm-video-highlights">
                    ${data.videoSpot.highlights.map((item) => `<li>${item}</li>`).join("")}
                </ul>
            `
            : "";

        const videoEpisodesMarkup = data.videoSpot && (data.vlog || []).length
            ? `
                <div class="pm-video-episodes">
                    <h5>Suivre le vlog du stage</h5>
                    <div class="pm-vlog-grid">
                        ${data.vlog.map((episode) => `
                            <a href="${episode.url}" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-linkedin-in"></i>
                                ${episode.label}
                            </a>
                        `).join("")}
                    </div>
                </div>
            `
            : "";

        const videoMarkup = data.videoSpot
            ? `
                <section class="pm-video-card ${data.videoSpot.orientation === "portrait" ? "is-portrait" : ""}">
                    ${videoFrameMarkup}
                    <div class="pm-video-copy">
                        <h4>${data.videoSpot.title}</h4>
                        <p>${data.videoSpot.description}</p>
                        ${videoHighlightsMarkup}
                        <div class="pm-video-actions">
                            ${videoActionsMarkup}
                        </div>
                        ${videoEpisodesMarkup}
                    </div>
                </section>
            `
            : "";

        const demoPreview = data.demoPreview || data.cover || (data.images || [])[0] || "";
        const demoMarkup = data.demoEmbed
            ? `
                <section class="pm-showcase pm-demo-showcase">
                    <div class="pm-demo-head">
                        <div>
                            <h4>${data.demoTitle || "DÉMO JOUABLE"}</h4>
                            <p>${data.demoDescription || "Le jeu est intégré directement dans le portfolio. Clique dans la fenêtre avant d'utiliser le clavier."}</p>
                        </div>
                    </div>
                    <button class="pm-demo-launch js-demo-launch" type="button" data-demo-url="${data.demoEmbed}" data-demo-title="${data.title}" style="--demo-preview: url('${demoPreview}')">
                        <span class="pm-demo-launch-media" aria-hidden="true"></span>
                        <span class="pm-demo-launch-content">
                            <span class="pm-demo-play"><i class="fas fa-play"></i></span>
                            <strong>${data.demoLabel || "Lancer la démo"}</strong>
                        </span>
                    </button>
                </section>
            `
            : "";

        const vlogMarkup = !data.videoSpot && (data.vlog || []).length
            ? `
                <section class="pm-showcase pm-vlog-showcase">
                    <h4>VLOG LINKEDIN DU STAGE</h4>
                    <p>Suivi public du projet réalisé pendant mon stage de BTS SIO chez Habitat Insertion.</p>
                    <div class="pm-vlog-grid">
                        ${data.vlog.map((episode) => `
                            <a href="${episode.url}" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-linkedin-in"></i>
                                ${episode.label}
                            </a>
                        `).join("")}
                    </div>
                </section>
            `
            : "";

        return [videoMarkup, demoMarkup, imageMarkup, slotMarkup, featureMarkup, vlogMarkup].filter(Boolean).join("");
    };

    const openInteractiveDemo = (url, title = "demo") => {
        if (!url) return;

        const absoluteUrl = new URL(url, window.location.href).href;
        const width = window.screen?.availWidth || window.innerWidth || 1280;
        const height = window.screen?.availHeight || window.innerHeight || 820;
        const windowName = `demo-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "interactive"}`;
        const features = [
            "popup=yes",
            "fullscreen=yes",
            "resizable=yes",
            "scrollbars=no",
            "menubar=no",
            "toolbar=no",
            "location=no",
            "status=no",
            "left=0",
            "top=0",
            `width=${Math.floor(width)}`,
            `height=${Math.floor(height)}`
        ].join(",");

        const demoWindow = window.open(absoluteUrl, windowName, features);

        if (demoWindow) {
            demoWindow.focus();
            try {
                demoWindow.moveTo(0, 0);
                demoWindow.resizeTo(width, height);
            } catch (_error) {
                // Certains navigateurs limitent le redimensionnement des fenêtres.
            }
            return;
        }

        window.open(absoluteUrl, "_blank", "noopener,noreferrer");
    };

    const renderProjects = (filter = "all") => {
        if (!projectGrid) return;

        const isCompact = filter === "all";

        const visibleProjects =
            isCompact
                ? projects
                : projects.filter((project) => project.filter === filter);

        if (!visibleProjects.length) {
            projectGrid.classList.remove("is-compact");
            projectGrid.innerHTML = '<p class="empty-projects">Aucun projet sur ce filtre pour le moment.</p>';
            return;
        }

        projectGrid.classList.toggle("is-compact", isCompact);

        projectGrid.innerHTML = visibleProjects
            .map((project, idx) => {
                const reverseClass = !isCompact && idx % 2 === 1 ? "reverse" : "";
                const buttonContent = isCompact
                    ? "Voir le projet"
                    : reverseClass
                        ? '<i class="fas fa-arrow-left"></i> Voir le projet'
                        : 'Voir le projet <i class="fas fa-arrow-right"></i>';
                const visualContent = renderProjectVisual(project);

                return `
                    <article class="project-card reveal ${reverseClass}" data-id="${project.id}" style="--project-accent: ${project.accent}">
                        <span class="project-index">${project.index}</span>

                        <div class="project-info">
                            <div class="project-meta">
                                <span>${project.index}</span>
                                <p class="project-category">${project.category}</p>
                            </div>
                            <h3>${project.title}</h3>
                            <p class="project-desc">${project.summary}</p>
                            <p class="project-impact"><i class="fas fa-bolt"></i>${project.impact}</p>
                            <p class="project-created">
                                <i class="fas fa-calendar-alt" aria-hidden="true"></i>
                                <span>Création</span>
                                <time>${project.created}</time>
                            </p>

                            <div class="project-specs" aria-label="Informations projet">
                                <span><small>Année</small>${project.year}</span>
                                <span><small>Rôle</small>${project.role}</span>
                                <span><small>État</small>${project.status}</span>
                            </div>

                            <ul class="project-tags">
                                ${project.techs.map((tech) => `<li>${tech}</li>`).join("")}
                            </ul>

                            <div class="project-actions">
                                <button class="btn-simple open-project" data-id="${project.id}" type="button" data-magnetic>
                                    ${buttonContent}
                                </button>
                            </div>
                        </div>

                        <div class="project-visual open-project" data-id="${project.id}" role="button" tabindex="0" aria-label="Voir ${project.title}">
                            ${visualContent}
                            <span class="project-status"><i></i>${project.status}</span>
                        </div>
                    </article>
                `;
            })
            .join("");

        bindRevealElements();
        bindMagnetic(projectGrid);
        bindProjectTilt();
    };

    const openProject = (id) => {
        if (!projectModal) return;

        const data = projects.find((project) => project.id === Number(id));
        if (!data) return;

        projectModal.style.setProperty("--project-accent", data.accent || "#ccff00");
        projectModal.dataset.projectType = data.filter || "";

        const titleTarget = pmTitle || document.getElementById("pm-title");
        const categoryTarget = pmCat || document.getElementById("pm-cat");
        const dateTarget = pmDate || document.getElementById("pm-date");
        const logoTarget = pmLogo || document.getElementById("pm-logo");
        const textTarget = pmText || document.getElementById("pm-text");
        const techsTarget = pmTechs || document.getElementById("pm-techs");
        const galleryTarget = pmGallery || document.getElementById("pm-gallery");
        const liveTarget = pmLive || document.getElementById("pm-live");
        const linkTarget = pmLink || document.getElementById("pm-link");

        if (titleTarget) titleTarget.textContent = data.title;
        if (categoryTarget) categoryTarget.textContent = data.category;
        if (dateTarget) dateTarget.textContent = `Création\u00a0: ${data.created}`;
        if (logoTarget) {
            const showLogoFallback = () => {
                logoTarget.hidden = true;
                logoTarget.removeAttribute("src");
                logoTarget.alt = "";
                if (pmLogoFallback) {
                    pmLogoFallback.hidden = false;
                    pmLogoFallback.textContent = data.logoMark || "PR";
                }
            };

            if (pmLogoSlot) {
                pmLogoSlot.setAttribute("aria-label", data.logo ? `Logo ${data.title}` : `Emplacement prévu pour le logo ${data.title}`);
            }

            if (data.logo) {
                logoTarget.hidden = false;
                logoTarget.src = data.logo;
                logoTarget.alt = data.logoAlt || `Logo ${data.title}`;
                logoTarget.onerror = showLogoFallback;
                if (pmLogoFallback) pmLogoFallback.hidden = true;
            } else {
                showLogoFallback();
            }
        }
        if (textTarget) textTarget.textContent = data.description;

        if (techsTarget) {
            techsTarget.innerHTML = data.techs.map((tech) => `<li>${tech}</li>`).join("");
        }

        if (galleryTarget) {
            galleryTarget.innerHTML = renderProjectModalMedia(data);

            const video = galleryTarget.querySelector(".pm-video-player");
            if (video && !prefersReducedMotion && !navigator.connection?.saveData) {
                video.muted = true;
                video.volume = 1;
                video.play().catch(() => {
                    // Les contrôles restent disponibles si le navigateur bloque l'autoplay.
                });
            }
        }

        if (liveTarget) {
            if (data.liveLink) {
                liveTarget.style.display = "inline-flex";
                liveTarget.href = data.liveLink;
                liveTarget.setAttribute("href", data.liveLink);
                liveTarget.innerHTML = `${data.liveLabel || "Voir le site"} <i class="fas fa-external-link-alt"></i>`;
                if (data.demoEmbed) {
                    liveTarget.classList.add("js-demo-launch");
                    liveTarget.dataset.demoUrl = data.demoEmbed;
                    liveTarget.dataset.demoTitle = data.title;
                } else {
                    liveTarget.classList.remove("js-demo-launch");
                    delete liveTarget.dataset.demoUrl;
                    delete liveTarget.dataset.demoTitle;
                }
            } else {
                liveTarget.style.display = "none";
                liveTarget.setAttribute("href", "javascript:void(0);");
                liveTarget.innerHTML = 'Voir le site <i class="fas fa-external-link-alt"></i>';
                liveTarget.classList.remove("js-demo-launch");
                delete liveTarget.dataset.demoUrl;
                delete liveTarget.dataset.demoTitle;
            }
        }

        if (linkTarget) {
            if (data.repoLink) {
                linkTarget.style.display = "inline-flex";
                linkTarget.href = data.repoLink;
                linkTarget.setAttribute("href", data.repoLink);
            } else {
                linkTarget.style.display = "none";
                linkTarget.setAttribute("href", "javascript:void(0);");
            }
        }

        projectModal.classList.toggle("has-project-actions", Boolean(data.liveLink || data.repoLink));

        openLayer(projectModal);
    };

    if (projectGrid) {
        projectGrid.addEventListener("click", (event) => {
            const trigger = event.target.closest(".open-project");
            if (!trigger) return;

            event.stopPropagation();
            const id = trigger.getAttribute("data-id");
            openProject(id);
        });

        projectGrid.addEventListener("keydown", (event) => {
            const trigger = event.target.closest(".open-project");
            if (!trigger) return;

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                const id = trigger.getAttribute("data-id");
                openProject(id);
            }
        });
    }

    journeyProjectLinks.forEach((button) => {
        button.addEventListener("click", () => {
            openProject(button.dataset.journeyProject);
        });
    });

    if (closeProjectModal && projectModal) {
        closeProjectModal.addEventListener("click", () => closeLayer(projectModal));

        projectModal.addEventListener("click", (event) => {
            const demoTrigger = event.target.closest(".js-demo-launch");
            if (demoTrigger) {
                event.preventDefault();
                event.stopPropagation();
                openInteractiveDemo(demoTrigger.dataset.demoUrl || demoTrigger.getAttribute("href"), demoTrigger.dataset.demoTitle || "demo");
                return;
            }

            const imageTrigger = event.target.closest(".js-image-zoom");
            if (imageTrigger && imageLightbox && imageLightboxImg && imageLightboxCaption) {
                event.preventDefault();
                event.stopPropagation();

                imageLightboxImg.src = imageTrigger.dataset.src || "";
                imageLightboxImg.alt = imageTrigger.dataset.alt || "Capture du projet";
                imageLightboxCaption.textContent = imageTrigger.dataset.caption || "";
                openLayer(imageLightbox);
                return;
            }

            if (event.target === projectModal) {
                closeLayer(projectModal);
            }
        });
    }

    if (imageLightbox && closeImageLightbox) {
        closeImageLightbox.addEventListener("click", () => closeLayer(imageLightbox));

        imageLightbox.addEventListener("click", (event) => {
            const clickedImage = event.target.closest?.("#image-lightbox-img");
            const clickedCloseButton = event.target.closest?.("#close-image-lightbox");

            if (!clickedImage && !clickedCloseButton) {
                closeLayer(imageLightbox);
            }
        });
    }

    const setupModal = (openId, closeId, modalId) => {
        const openBtn = document.getElementById(openId);
        const closeBtn = document.getElementById(closeId);
        const modal = document.getElementById(modalId);

        if (!openBtn || !closeBtn || !modal) return;

        openBtn.addEventListener("click", (event) => {
            event.preventDefault();
            openLayer(modal);
        });

        closeBtn.addEventListener("click", () => closeLayer(modal));

        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                closeLayer(modal);
            }
        });
    };

    setupModal("btn-licenses", "close-licenses", "modal-licenses");
    setupModal("btn-skills", "close-skills", "modal-skills");
    setupModal("btn-diplomas", "close-diplomas", "modal-diplomas");
    setupModal("btn-school", "close-school", "modal-school");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter || "all";
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
            renderProjects(filter);
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;

        if (imageLightbox?.classList.contains("active")) {
            closeLayer(imageLightbox);
            return;
        }

        if (projectModal?.classList.contains("active")) {
            closeLayer(projectModal);
            return;
        }

        if (fsMenu?.classList.contains("active")) {
            closeMenu();
            return;
        }

        const activeModal = document.querySelector(".modal-overlay.active");
        if (activeModal) {
            closeLayer(activeModal);
        }
    });

    if (isFinePointer && !prefersReducedMotion) {
        let rafId = null;
        let lastPointerEvent = null;

        window.addEventListener(
            "pointermove",
            (event) => {
                lastPointerEvent = event;
                if (rafId) return;

                rafId = requestAnimationFrame(() => {
                    if (!lastPointerEvent) {
                        rafId = null;
                        return;
                    }

                    const x = (lastPointerEvent.clientX / window.innerWidth) * 100;
                    const y = (lastPointerEvent.clientY / window.innerHeight) * 100;
                    const fieldX = (x - 50) * 0.16;
                    const fieldY = (y - 50) * 0.12;

                    body.style.setProperty("--pointer-x", `${x}%`);
                    body.style.setProperty("--pointer-y", `${y}%`);
                    body.style.setProperty("--field-x", `${fieldX}px`);
                    body.style.setProperty("--field-y", `${fieldY}px`);

                    rafId = null;
                });
            },
            { passive: true }
        );
    }

    if (contactBox && isFinePointer && !prefersReducedMotion) {
        let contactFrame = null;
        let lastContactEvent = null;

        const resetContactLight = () => {
            if (contactFrame) {
                cancelAnimationFrame(contactFrame);
                contactFrame = null;
            }

            contactBox.style.setProperty("--contact-x", "70%");
            contactBox.style.setProperty("--contact-y", "30%");
        };

        contactBox.addEventListener("mousemove", (event) => {
            lastContactEvent = event;
            if (contactFrame) return;

            contactFrame = requestAnimationFrame(() => {
                if (!lastContactEvent) {
                    contactFrame = null;
                    return;
                }

                const rect = contactBox.getBoundingClientRect();
                const x = ((lastContactEvent.clientX - rect.left) / rect.width) * 100;
                const y = ((lastContactEvent.clientY - rect.top) / rect.height) * 100;
                contactBox.style.setProperty("--contact-x", `${x}%`);
                contactBox.style.setProperty("--contact-y", `${y}%`);
                contactFrame = null;
            });
        });

        contactBox.addEventListener("mouseleave", resetContactLight);
    }

    const cursor = document.getElementById("cursor");
    const follower = document.getElementById("cursor-follower");

    if (cursor && follower && isFinePointer && !prefersReducedMotion) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let followerX = mouseX;
        let followerY = mouseY;
        let cursorFrame = null;

        const renderCursor = () => {
            cursorFrame = null;
            followerX += (mouseX - followerX) * 0.16;
            followerY += (mouseY - followerY) * 0.16;

            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
            follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;

            if (Math.abs(mouseX - followerX) > 0.1 || Math.abs(mouseY - followerY) > 0.1) {
                cursorFrame = requestAnimationFrame(renderCursor);
            }
        };

        const scheduleCursor = () => {
            if (!cursorFrame && !document.hidden) {
                cursorFrame = requestAnimationFrame(renderCursor);
            }
        };

        window.addEventListener("mousemove", (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
            scheduleCursor();
        }, { passive: true });

        document.addEventListener("visibilitychange", () => {
            if (document.hidden && cursorFrame) {
                cancelAnimationFrame(cursorFrame);
                cursorFrame = null;
                return;
            }

            scheduleCursor();
        });

        const isInteractive = (element) =>
            Boolean(
                element?.closest(
                    "a, button, .open-project, .filter-btn, .burger-menu, .close-fs-menu, .close-modal, .pm-close, .legal-trigger"
                )
            );

        document.addEventListener("pointerover", (event) => {
            if (isInteractive(event.target)) {
                body.classList.add("hovering");
            }
        });

        document.addEventListener("pointerout", (event) => {
            if (!isInteractive(event.target)) return;
            if (!isInteractive(event.relatedTarget)) {
                body.classList.remove("hovering");
            }
        });

        scheduleCursor();
    }

    runPreloader();
    rotateSignature();
    setupTerminalBorderOrbit();
    setupInteractiveTerminal();
    bindRevealElements();
    bindCapabilityExplorer();
    bindMagnetic();
    bindManifestoFlow();
    animateStats();
    renderProjects("all");
    updateNavbar();

    window.addEventListener("scroll", schedulePageMotion, { passive: true });
    window.addEventListener("resize", schedulePageMotion);
});
