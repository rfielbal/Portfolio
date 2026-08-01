document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    const preloader = document.getElementById("preloader");
    const preloaderCounter = document.getElementById("preloader-counter");
    const preloaderFill = document.getElementById("preloader-fill");
    let preloaderInterval = null;
    let preloaderExitTimer = null;
    let preloaderHideTimer = null;

    const navbar = document.getElementById("navbar");
    const homeSection = document.getElementById("home");
    const ambientGrid = document.querySelector(".ambient-grid");
    const lightField = document.querySelector(".light-field");
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
    const aboutLanyardStage = document.querySelector("[data-lanyard-stage]");
    const aboutLanyardMotion = document.querySelector("[data-lanyard-motion]");

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
            id: 9,
            index: "03",
            filter: "perso",
            title: "Revaloop",
            category: "Plateforme open source de recette client · Projet perso",
            year: "En cours",
            dateLabel: "Développement",
            created: "En cours",
            role: "Conception produit & pilotage technique",
            status: "Alpha en cours",
            accent: "#9b7cff",
            logo: "./images/projects/revaloop/logo.svg",
            logoAlt: "Logo de Revaloop",
            logoMark: "R",
            description:
                "Revaloop transforme une preview de développement en véritable espace de collaboration entre le développeur et son client. Au lieu de disperser les retours entre e-mails, captures et messages, chaque version dispose d'un environnement de recette dédié, avec son historique et son état de validation.\n\nLe développeur publie une version HTTPS, puis crée une invitation cliente temporaire, à usage unique et révocable. Le client explore le produit sur plusieurs formats, ajoute des retours généraux ou des annotations visuelles et échange dans une discussion persistante. Le workflow suit ensuite chaque remarque de « signalé » à « validé », bloque l'approbation tant qu'un point reste ouvert et conserve la boucle de correction dans le même espace.\n\nRevaloop est toujours en développement, au stade alpha 0.3 pour pilote contrôlé. Je le construis comme un produit : cadrage du besoin, arbitrages UX et sécurité, développement assisté par IA, audits et validation des parcours. Son compagnon Electron sait déjà sélectionner, lancer et surveiller un projet local avec un consentement explicite ; le partage distant automatique de ce localhost reste volontairement présenté comme une prochaine étape, pas comme une fonction terminée.",
            summary: "Espace de recette client pour partager une version, centraliser les retours et piloter sa validation.",
            impact: "Une boucle claire et sécurisée entre développeur et client, de l'invitation à l'approbation finale.",
            techs: ["Next.js", "React", "TypeScript", "Cloudflare Workers", "D1", "Drizzle ORM", "Electron", "Vite"],
            cover: "./images/projects/revaloop/cover.webp",
            coverLabel: "Boucle de recette client",
            galleryLayout: "review-loop",
            galleryEyebrow: "BOUCLE DE RECETTE",
            galleryTitle: "Du partage de la version à la décision finale",
            gallerySummary: "Le parcours matérialise chaque étape de la collaboration pour que le contexte, les corrections et la validation restent dans un seul espace.",
            images: [
                {
                    src: "./images/projects/revaloop/gallery/tableau-de-bord.webp",
                    alt: "Tableau de bord développeur de Revaloop",
                    caption: "Tableau de bord : versions, invitations, retours et décisions réunis dans un seul espace",
                    label: "01 / Préparer",
                    title: "Cadrer la version",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/revaloop/gallery/espace-revue-client.webp",
                    alt: "Espace de revue client Revaloop avec une preview intégrée",
                    caption: "Espace client : exploration de la preview et accès direct aux retours et à la discussion",
                    label: "02 / Explorer",
                    title: "Ouvrir la recette",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/revaloop/gallery/annotation-visuelle.webp",
                    alt: "Mode d'annotation visuelle de Revaloop",
                    caption: "Annotation visuelle : le retour reste associé à un repère précis dans le viewport testé",
                    label: "03 / Signaler",
                    title: "Conserver le contexte",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/revaloop/gallery/discussion-projet.webp",
                    alt: "Discussion entre développeur et client dans Revaloop",
                    caption: "Discussion persistante au niveau de la version, sans imposer la création d'un retour",
                    label: "04 / Décider",
                    title: "Arbitrer ensemble",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/revaloop/gallery/compagnon-local.webp",
                    alt: "Compagnon desktop Electron de Revaloop",
                    caption: "Compagnon local : sélection, lancement et surveillance explicites du projet sur la machine du développeur",
                    label: "05 / Connecter",
                    title: "Relier le projet local",
                    orientation: "landscape"
                }
            ],
            features: [
                "Projets et versions de recette avec historique des retours, messages et décisions.",
                "Invitations clientes à usage unique, expirantes et révocables, échangées contre une session sécurisée.",
                "Preview HTTPS responsive, retours généraux, annotations visuelles et discussion persistante.",
                "Workflow signalé, en cours, à revalider puis validé, avec approbation bloquée tant qu'un retour reste ouvert.",
                "Compagnon Electron sandboxé pour sélectionner, lancer, surveiller et arrêter explicitement un projet local.",
                "Architecture Cloudflare Workers et D1 avec isolation des organisations, limites de débit et migrations versionnées."
            ],
            repoLink: "https://github.com/rfielbal/Revaloop",
            liveLink: null
        },
        {
            id: 7,
            index: "08",
            filter: "perso",
            title: "AetherCore",
            category: "Inspecteur 3D multimodal · Projet perso",
            year: "2026",
            created: "11 février 2026",
            role: "Prototype 3D & WebGL",
            status: "Prototype jouable",
            accent: "#9b7cff",
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
            galleryLayout: "inspection-console",
            galleryEyebrow: "POSTE D'INSPECTION",
            galleryTitle: "Lire un fichier STL comme une pièce à analyser",
            gallerySummary: "L'interface garde le modèle au centre tout en rendant les modes de rendu, les mesures et les interactions immédiatement contrôlables.",
            galleryStats: [
                { label: "Entrée", value: "STL local" },
                { label: "Rendus", value: "3 modes" },
                { label: "Mesures", value: "Dimensions · surface · volume" },
                { label: "Contrôle", value: "Souris · tactile · main" }
            ],
            images: [
                {
                    src: "./images/projects/aethercore/gallery/interface-principale.png",
                    alt: "Interface principale d'AetherCore avec modèle STL en rendu hybride",
                    caption: "Vue principale : modèle, modes de rendu, mesures et état du suivi réunis dans un poste unique",
                    label: "SCAN / 01",
                    title: "Inspection hybride",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/aethercore/gallery/mode-surface.png",
                    alt: "Mode surface du visualiseur STL AetherCore",
                    caption: "Le mode surface complète les lectures hybride et points pour contrôler la géométrie",
                    label: "SCAN / 02",
                    title: "Lecture de surface",
                    orientation: "landscape"
                }
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
            cover: "./images/projects/secret-conservateur/cover.webp?v=day-20260727",
            demoPreview: "./images/projects/secret-conservateur/cover.webp?v=day-20260727",
            galleryLayout: "museum-tour",
            galleryEyebrow: "PARCOURS D'ENQUÊTE",
            galleryTitle: "Explorer, observer puis interpréter",
            gallerySummary: "Les captures suivent la progression du joueur : découvrir les trois salles, révéler certains indices en mode UV puis examiner une œuvre pour résoudre l'énigme.",
            images: [
                {
                    src: "./images/projects/secret-conservateur/gallery/exploration-musee.png?v=day-20260727",
                    alt: "Vue principale des trois salles du musée dans Le Secret du Conservateur",
                    caption: "La vue principale présente les trois salles et leurs œuvres avant l'activation des modes d'observation",
                    label: "SALLE 01",
                    title: "Découvrir le musée",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/secret-conservateur/gallery/vue-generale-musee.png",
                    alt: "Mode UV nocturne dans les trois salles du Secret du Conservateur",
                    caption: "Le mode UV nocturne modifie l'éclairage du musée pour faire apparaître certains indices dissimulés",
                    label: "SALLE 02",
                    title: "Révéler les indices",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/secret-conservateur/gallery/detail-oeuvre-le-cri.png",
                    alt: "Analyse de l'œuvre Le Cri dans Le Secret du Conservateur",
                    caption: "Chaque œuvre devient une pièce de l'énigme grâce à une lecture contextualisée",
                    label: "SALLE 03",
                    title: "Interpréter l'œuvre",
                    orientation: "landscape"
                }
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
            title: "Jessica Dew · Passion Photographie",
            category: "Site vitrine & parcours de contact · Client",
            year: "2025 - 2026",
            dateLabel: "Création",
            created: "Juillet - Août 2026",
            role: "Conception, développement & exploitation",
            status: "Livré",
            accent: "#43dfff",
            logo: "./images/projects/jessica-dew/logo.png",
            logoAlt: "Monogramme Jessica Dew",
            logoMark: "JD",
            description:
                "J'ai pris en charge la création complète du site de Jessica Dewerdt, photographe dans l'Audomarois, depuis la définition du parcours jusqu'à son exploitation technique. L'objectif était de traduire son univers doux et éditorial dans une expérience claire, immersive et rassurante, sans laisser les informations pratiques prendre le dessus sur les images.\n\nJ'ai construit un véritable parcours client : une hero expressive, six univers de séances, des pages détaillées avec tarifs, un portfolio, des avis, des cartes cadeaux, des offres temporaires et des appels à l'action cohérents jusqu'à la prise de contact.\n\nLe formulaire repose sur une application Symfony et ne se limite pas à un simple envoi d'e-mail. Il préremplit le type de séance, valide les données côté navigateur et serveur, bloque les soumissions automatisées avec un challenge signé et un honeypot, limite les abus et évite les doublons. Les demandes sont ensuite transmises par Brevo avec une identité d'envoi authentifiée et l'adresse du visiteur configurée en réponse directe.\n\nJe pilote également toute la chaîne d'exploitation : configuration OVHcloud et PHP, isolation de la racine web, HTTPS et DNS, secrets d'environnement, authentification SMTP, construction des releases, recette avant bascule, surveillance des erreurs, purge des journaux et procédure de retour arrière. Les corrections, contenus et évolutions restent ainsi sous mon contrôle, de la configuration initiale à la maintenance après mise en ligne.",
            summary: "Site photographique conçu, déployé et maintenu de bout en bout, du parcours client à l'infrastructure de production.",
            impact: "Six prestations, portfolio éditorial, formulaire sécurisé et exploitation OVHcloud entièrement pilotée.",
            techs: ["Symfony 7.4", "PHP 8.4", "JavaScript", "HTML / CSS", "Brevo SMTP", "OVHcloud", "Apache", "DNS / TLS", "PHPUnit"],
            cover: "./images/projects/jessica-dew/cover.webp",
            coverLabel: "Création éditoriale & parcours client",
            galleryLayout: "editorial",
            galleryTitle: "Une expérience pensée comme un magazine photographique",
            gallerySummary: "Les écrans alternent respiration, séries d'images et contenus utiles pour guider le regard sans uniformiser le parcours.",
            images: [
                {
                    src: "./images/projects/jessica-dew/gallery/identite-carrousel.webp",
                    alt: "Présentation de Jessica Dew et carrousel photographique sur la page d'accueil",
                    caption: "Identité personnelle, récit de marque et carrousel réunis dans une composition éditoriale",
                    label: "01 / Identité",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/jessica-dew/gallery/portfolio-photographique.webp",
                    alt: "Portfolio photographique actualisé du site Jessica Dew",
                    caption: "Galerie vivante, rail photographique et sélection éditoriale des séries",
                    label: "02 / Portfolio",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/jessica-dew/gallery/mobile-home.webp?v=home-20260727",
                    alt: "Hero du site Jessica Dew affichée sur mobile",
                    caption: "Une direction artistique conservée sur mobile, sans sacrifier la lisibilité ni les actions",
                    label: "03 / Mobile",
                    orientation: "portrait"
                },
                {
                    src: "./images/projects/jessica-dew/gallery/catalogue-prestations.webp",
                    alt: "Catalogue actualisé des prestations photographiques du site Jessica Dew",
                    caption: "Six univers de séances immédiatement identifiables grâce aux nouvelles séries",
                    label: "04 / Prestations",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/jessica-dew/gallery/reportage-mariage.webp",
                    alt: "Page consacrée au reportage de mariage sur le site Jessica Dew",
                    caption: "Chaque prestation associe récit, galerie contrôlable, tarifs et prise de contact",
                    label: "05 / Parcours",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/jessica-dew/gallery/formulaire-contact.webp",
                    alt: "Formulaire de contact du site Jessica Dew",
                    caption: "Le parcours se termine par un formulaire contextuel relié à une chaîne d'envoi sécurisée",
                    label: "06 / Conversion",
                    orientation: "landscape"
                }
            ],
            features: [
                "Hero immersive, identité éditoriale sur mesure et navigation responsive commune à l'ensemble du site.",
                "Six univers de séances avec contenus, galeries, tarifs et appels à l'action adaptés.",
                "Portfolio, visionneuse, avis clients, cartes cadeaux et offres temporaires réunis dans un parcours cohérent.",
                "Carrousels accessibles, navigation clavier, états de focus et réduction des animations pris en charge.",
                "Formulaire prérempli selon la séance, validation client/serveur et conservation des saisies en cas d'erreur.",
                "Protection par challenge signé, honeypot, limites de débit, contrôle d'origine et idempotence.",
                "Envoi transactionnel via Brevo, sans base de données ni cookie pour traiter les demandes.",
                "Configuration complète d'OVHcloud : PHP 8.4, racine web public/, HTTPS, DNS, secrets, droits et caches.",
                "Mise en production par release avec recette, surveillance, purge des journaux et retour arrière documenté.",
                "Site livré et maintenance continue des contenus, des photographies, des dépendances, de la sécurité et du référencement."
            ],
            repoLink: null,
            liveLink: "https://jessicadewerdt.fr",
            liveLabel: "Voir le site"
        },
        {
            id: 2,
            index: "07",
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
            index: "06",
            filter: "perso",
            title: "Responsiver",
            category: "Application desktop open source · Projet perso",
            year: "En cours",
            dateLabel: "Développement",
            created: "En cours",
            role: "Conception produit & pilotage technique",
            status: "Bêta en cours",
            accent: "#9b7cff",
            logo: "./images/projects/responsiver/logo.png",
            logoAlt: "Logo de Responsiver",
            logoMark: "R",
            description:
                "Responsiver est une application desktop open source que je conçois pour aider les développeurs à inspecter, corriger et valider la responsivité d'un projet web sans confier leurs sources à un service cloud.\n\nLe produit réunit dans un même workflow des outils habituellement dispersés : import d'un projet local, audit statique et runtime, prévisualisation multi-appareils, inspection de la cascade CSS, composition visuelle, édition Monaco, comparaison avant/après et matrice anti-régression sur plusieurs routes, tailles et états.\n\nLe projet est toujours en développement. Je le pilote comme un produit : cadrage des besoins, arbitrages UX et architecture, développement assisté par IA, contre-audits et validations unitaires/E2E avant intégration. Sa bêta privilégie une approche local-first et réversible : les propositions restent temporaires tant qu'elles n'ont pas été relues, comparées puis explicitement appliquées. Une assistance IA locale via Ollama ou llama.cpp peut aussi compléter le parcours utilisateur, sans compte ni fournisseur cloud imposé.",
            summary: "Laboratoire desktop local-first pour auditer, corriger et valider un site sur plusieurs écrans.",
            impact: "Un workflow responsive complet, traçable et réversible, de l'inspection jusqu'à la validation anti-régression.",
            techs: ["Electron", "React", "TypeScript", "Node.js", "Chromium", "Playwright", "Monaco Editor", "PostCSS"],
            cover: "./images/projects/responsiver/cover.webp",
            coverLabel: "Studio responsive multi-écrans",
            galleryLayout: "responsive-lab",
            galleryEyebrow: "WORKBENCH LOCAL-FIRST",
            galleryTitle: "Voir, corriger, comparer, valider",
            gallerySummary: "Chaque écran correspond à une étape du même workflow : observer le comportement réel, préparer une correction réversible puis vérifier son impact.",
            galleryStats: [
                { label: "Studio", value: "1 à 5 écrans" },
                { label: "Catalogue", value: "60+ appareils" },
                { label: "Validation", value: "Routes × tailles × états" },
                { label: "Écriture", value: "Après confirmation" }
            ],
            images: [
                {
                    src: "./images/projects/responsiver/gallery/studio-multi-ecrans.webp",
                    alt: "Studio Responsiver affichant cinq formats d'écran synchronisés",
                    caption: "Studio multi-écrans : jusqu'à cinq viewports, avec pilote, navigation et défilement synchronisés",
                    label: "01 / Observer",
                    title: "Studio multi-écrans",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/responsiver/gallery/atelier-avant-apres.webp",
                    alt: "Atelier visuel Responsiver en comparaison avant et après",
                    caption: "Atelier visuel : réglages ciblés, aperçu avant/après, historique et application explicite",
                    label: "02 / Corriger",
                    title: "Atelier avant / après",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/responsiver/gallery/matrice-anti-regression.webp",
                    alt: "Matrice responsive comparant plusieurs routes, tailles et états",
                    caption: "Matrice reproductible : comparaison de la source et du correctif sur mobile, tablette et bureau",
                    label: "03 / Valider",
                    title: "Matrice anti-régression",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/responsiver/gallery/espace-code-monaco.webp",
                    alt: "Éditeur Monaco et aperçu responsive intégrés à Responsiver",
                    caption: "Espace Code : sources locales, diff, aperçu direct et écriture seulement après confirmation",
                    label: "04 / Appliquer",
                    title: "Code sous contrôle",
                    orientation: "landscape"
                }
            ],
            features: [
                "Ouverture d'un projet local, d'un localhost ou d'une URL publique avec des niveaux d'accès clairement séparés.",
                "Studio de un à cinq écrans synchronisés et catalogue local de plus de 60 profils d'appareils.",
                "Audit responsive statique et runtime, inspection de la cascade CSS et restitution des constats avec leurs preuves.",
                "Atelier visuel, édition Monaco, aperçu temporaire, diff, undo/redo et écritures atomiques après validation.",
                "Matrice routes × tailles × états pour vérifier qu'une correction ne crée pas de nouvelle régression.",
                "Architecture Electron/React/TypeScript testée par des suites unitaires et des parcours E2E Playwright."
            ],
            repoLink: "https://github.com/rfielbal/Responsiver",
            liveLink: null
        },
        {
            id: 8,
            index: "09",
            filter: "perso",
            title: "La Citadelle Rouge",
            category: "Map aventure Minecraft Bedrock · Projet perso",
            year: "2019",
            created: "Juillet 2019",
            role: "Game design & automatisation",
            status: "Archivé",
            accent: "#9b7cff",
            logo: "./images/projects/citadelle-rouge/logo.svg",
            logoMark: "CR",
            description:
                "La Citadelle Rouge est une map d'aventure Minecraft Bedrock conçue comme un donjon entièrement automatisé. Le joueur pénètre dans une forteresse en ruine, recherche des indices et progresse à travers des parcours, des énigmes, des labyrinthes et des combats contre des mobs hostiles.\n\nLa première partie repose sur un système de jeu autonome : les vagues de mobs spawnent à intervalles définis, les coffres récupèrent automatiquement leur loot et l'équipement nécessaire peut être distribué au joueur au bon moment. Les portes s'ouvrent et se referment selon les actions réalisées dans la salle.\n\nEn coulisses, des circuits de redstone relient boutons, leviers, pistons et blocs de commande. Des chaînes de commandes orchestrent la progression. Lorsqu'une épreuve est validée et que le joueur passe au niveau suivant, le système arrête les spawns, remet les coffres et les objets en place, referme les accès et replace la salle dans son état initial sans intervention manuelle.",
            summary: "Donjon Minecraft Bedrock mêlant exploration, énigmes et combats dans des salles entièrement pilotées par Redstone.",
            impact: "Boucle de jeu autonome, progression scénarisée et réinitialisation complète de chaque épreuve.",
            techs: ["Minecraft Bedrock", "Redstone", "Blocs de commande", "Level design", "Game design", "Automatisation"],
            cover: "./images/projects/citadelle-rouge/cover.webp",
            coverLabel: "Map aventure automatisée",
            galleryLayout: "redstone-system",
            galleryEyebrow: "SYSTÈME SOUS LA MAP",
            galleryTitle: "L'aventure visible, la logique cachée",
            gallerySummary: "Le parcours révèle les deux faces du projet : les épreuves vécues par le joueur et l'infrastructure Redstone qui orchestre chaque salle sans intervention.",
            galleryGroups: {
                "Expérience joueur": "Ruines, indices et salles verrouillées composent la couche visible du donjon.",
                "Automatisation Redstone": "Déclencheurs, circuits et blocs de commande forment le moteur caché de la progression.",
                "Commandes Bedrock": "Les commandes spécialisées restaurent les zones et distribuent les récompenses au bon moment."
            },
            images: [
                {
                    src: "./images/projects/citadelle-rouge/gallery/citadelle-en-ruine.png",
                    alt: "Forteresse en ruine de la map La Citadelle Rouge",
                    caption: "La citadelle en ruine, point de départ de l'aventure",
                    group: "Expérience joueur",
                    label: "Entrée",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/citadelle-rouge/gallery/salle-epreuves.png",
                    alt: "Salle d'épreuves décorée de La Citadelle Rouge",
                    caption: "Une salle scénarisée mêlant exploration, indices et accès verrouillés",
                    group: "Expérience joueur",
                    label: "Épreuve",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/citadelle-rouge/gallery/architecture-redstone.png",
                    alt: "Vue d'ensemble des circuits Redstone et blocs de commande",
                    caption: "Architecture générale du système caché sous la map",
                    group: "Automatisation Redstone",
                    label: "Architecture",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/citadelle-rouge/gallery/reseau-redstone-principal.png",
                    alt: "Réseau de Redstone reliant les blocs de commande",
                    caption: "Circuit principal reliant déclencheurs, séquences et réinitialisations",
                    group: "Automatisation Redstone",
                    label: "Réseau",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/citadelle-rouge/gallery/automatisation-command-blocks.png",
                    alt: "Matrice de blocs de commande de La Citadelle Rouge",
                    caption: "Blocs de commande enchaînés pour automatiser les mécaniques de jeu",
                    group: "Automatisation Redstone",
                    label: "Séquence",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/citadelle-rouge/gallery/commande-restauration-clone.png",
                    alt: "Commande clone utilisée pour restaurer une zone Minecraft",
                    caption: "Commande /clone pour remettre une zone dans son état de référence",
                    group: "Commandes Bedrock",
                    label: "Restaurer",
                    orientation: "landscape"
                },
                {
                    src: "./images/projects/citadelle-rouge/gallery/commande-recompense-give.png",
                    alt: "Commande give utilisée pour distribuer un objet Minecraft",
                    caption: "Commande /give pour distribuer l'équipement au joueur",
                    group: "Commandes Bedrock",
                    label: "Récompenser",
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
            status: "Jessica Dew / livré",
            index: "03 / 04",
            context: "Client · UX & développement",
            mediaType: "Site photographique complet",
            project: "Jessica Dew",
            title: "Faire de l'image le point de départ d'un parcours complet.",
            summary: "Une interface réussie capte l'attention, rend l'offre compréhensible et accompagne naturellement jusqu'à la prise de contact.",
            need: "Présenter six univers photographiques sans perdre la douceur de la marque ni les informations attendues avant une réservation.",
            decision: "Associer une direction éditoriale centrée sur l'image à des pages structurées, des actions cohérentes et un formulaire contextuel.",
            proof: "Hero immersive, prestations détaillées, portfolio, chaîne de contact sécurisée et exploitation OVHcloud.",
            techs: ["UI/UX", "Symfony", "OVHcloud", "Responsive"],
            image: "./images/projects/jessica-dew/cover.webp",
            imageAlt: "Hero du site Jessica Dew Passion Photographie",
            imagePosition: "center",
            projectId: "1",
            action: "Examiner Jessica Dew",
            role: "Conception, développement & exploitation",
            nodes: [
                { label: "Attention", value: "Hero éditoriale", icon: "fas fa-eye" },
                { label: "Parcours", value: "6 univers", icon: "fas fa-route" },
                { label: "Interface", value: "Accessible", icon: "fas fa-display" },
                { label: "Contact", value: "Symfony + SMTP", icon: "fas fa-envelope" }
            ]
        },
        delivery: {
            accent: "#9b7cff",
            status: "Jessica livré · Revaloop alpha",
            index: "04 / 04",
            context: "Client + produit · Qualité continue",
            mediaType: "Recette & validation",
            project: "Revaloop",
            title: "Mettre la qualité sous contrôle, jusqu'après la mise en ligne.",
            summary: "Un produit fiable ne se résume pas à une version terminée\u00a0: sa recette, sa sécurité, sa livraison et son exploitation doivent rester maîtrisées.",
            need: "Livrer Jessica Dew en production tout en structurant, avec Revaloop, une boucle de validation claire entre développeur et client.",
            decision: "Industrialiser les releases, la recette, le monitoring et le retour arrière côté Jessica\u00a0; versionner les retours, sécuriser les invitations et bloquer l'approbation tant qu'un point reste ouvert côté Revaloop.",
            proof: "Jessica Dew est déployé et maintenu sur OVHcloud. Revaloop centralise déjà versions, annotations, discussions et décisions dans une alpha à accès contrôlé.",
            techs: ["Recette versionnée", "Accès sécurisés", "Monitoring", "Rollback"],
            image: "./images/projects/revaloop/cover.webp",
            imageAlt: "Tableau de bord de recette du projet Revaloop",
            imagePosition: "center",
            projectId: "9",
            action: "Examiner Revaloop",
            role: "Qualité produit & exploitation",
            nodes: [
                { label: "Publier", value: "Release contrôlée", icon: "fas fa-code-branch" },
                { label: "Inviter", value: "Accès temporaire", icon: "fas fa-user-lock" },
                { label: "Valider", value: "Retours traçables", icon: "fas fa-list-check" },
                { label: "Exploiter", value: "Monitoring + rollback", icon: "fas fa-shield-halved" }
            ]
        }
    };

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;

    const motionEngine = window.portfolioMotionEngine;

    let lockedScrollY = 0;
    let restoreScrollBehaviorFrame = null;
    let scrollBehaviorBeforeRestore = null;
    let terminalBorderResizeObserver = null;

    const managedLayers = Array.from(
        document.querySelectorAll(".modal-overlay, .project-modal-wrap, .image-lightbox, .fs-menu")
    );
    const layerStack = [];
    const temporaryInertStates = new Map();
    const focusableSelector = [
        'a[href]:not([tabindex="-1"])',
        'button:not([disabled]):not([tabindex="-1"])',
        'input:not([disabled]):not([tabindex="-1"])',
        'select:not([disabled]):not([tabindex="-1"])',
        'textarea:not([disabled]):not([tabindex="-1"])',
        '[tabindex]:not([tabindex="-1"])'
    ].join(",");

    managedLayers.forEach((layer) => {
        if (!layer.classList.contains("active")) {
            layer.inert = true;
        }
    });

    const getOpenLayers = () =>
        document.querySelectorAll(".modal-overlay.active, .project-modal-wrap.active, .image-lightbox.active, .fs-menu.active").length;

    const getTopLayer = () => layerStack[layerStack.length - 1]?.layer || null;

    const getFocusableElements = (layer) => Array.from(layer.querySelectorAll(focusableSelector)).filter((element) => {
        const styles = window.getComputedStyle(element);
        return !element.hidden && styles.display !== "none" && styles.visibility !== "hidden" && element.getClientRects().length > 0;
    });

    const focusInitialElement = (layer) => {
        const target = layer.querySelector("[data-autofocus]") || getFocusableElements(layer)[0] || layer;

        if (target === layer && !layer.hasAttribute("tabindex")) {
            layer.setAttribute("tabindex", "-1");
        }

        target.focus({ preventScroll: true });
    };

    const scheduleInitialFocus = (layer) => {
        const focusIfTopLayer = () => {
            if (getTopLayer() === layer && layer.classList.contains("active")) {
                focusInitialElement(layer);
            }
        };

        requestAnimationFrame(() => {
            focusIfTopLayer();

            if (!layer.contains(document.activeElement)) {
                window.setTimeout(focusIfTopLayer, 260);
            }
        });
    };

    const restoreTemporaryInertStates = () => {
        temporaryInertStates.forEach((wasInert, element) => {
            element.inert = wasInert;
        });
        temporaryInertStates.clear();
    };

    const setTemporarilyInert = (element) => {
        if (!temporaryInertStates.has(element)) {
            temporaryInertStates.set(element, element.inert);
        }
        element.inert = true;
    };

    const syncBackgroundInertState = () => {
        restoreTemporaryInertStates();

        const topLayer = getTopLayer();
        if (!topLayer) return;
        topLayer.inert = false;

        let current = topLayer;
        while (current && current !== body) {
            const parent = current.parentElement;
            if (!parent) break;

            Array.from(parent.children).forEach((sibling) => {
                if (sibling !== current && sibling instanceof HTMLElement) {
                    setTemporarilyInert(sibling);
                }
            });

            current = parent;
        }
    };

    const trapLayerFocus = (event) => {
        const topLayer = getTopLayer();
        if (!topLayer) return;

        const focusableElements = getFocusableElements(topLayer);
        if (!focusableElements.length) {
            event.preventDefault();
            focusInitialElement(topLayer);
            return;
        }

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement;

        if (event.shiftKey && (activeElement === first || !topLayer.contains(activeElement))) {
            event.preventDefault();
            last.focus({ preventScroll: true });
        } else if (!event.shiftKey && (activeElement === last || !topLayer.contains(activeElement))) {
            event.preventDefault();
            first.focus({ preventScroll: true });
        }
    };

    const cancelSmoothScroll = () => {
        window.SiteSmoothScroll?.cancel();
        window.scrollTo({ top: window.scrollY, left: 0, behavior: "auto" });
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

    const openLayer = (layer, opener = document.activeElement) => {
        if (!layer) return;

        const existingEntry = layerStack.find((entry) => entry.layer === layer);
        if (existingEntry) {
            scheduleInitialFocus(layer);
            return;
        }

        const returnFocus = opener instanceof HTMLElement && opener !== body && opener.isConnected
            ? opener
            : null;

        layer.inert = false;
        layer.classList.add("active");
        layer.setAttribute("aria-hidden", "false");
        layerStack.push({ layer, returnFocus });
        syncBackgroundInertState();
        syncScrollState();
        scheduleInitialFocus(layer);
    };

    const closeLayer = (layer) => {
        if (!layer) return;

        const entryIndex = layerStack.findIndex((entry) => entry.layer === layer);
        const closingEntries = entryIndex >= 0
            ? layerStack.splice(entryIndex)
            : [{ layer, returnFocus: null }];
        const returnFocus = closingEntries[0].returnFocus;
        const activeElement = document.activeElement;

        if (
            activeElement instanceof HTMLElement
            && closingEntries.some((entry) => entry.layer.contains(activeElement))
        ) {
            activeElement.blur();
        }

        closingEntries.slice().reverse().forEach((entry) => {
            entry.layer.classList.remove("active");
            entry.layer.setAttribute("aria-hidden", "true");
            entry.layer.inert = true;
        });

        syncBackgroundInertState();
        syncScrollState();

        const expectedTopLayer = getTopLayer();
        requestAnimationFrame(() => {
            if (getTopLayer() !== expectedTopLayer) return;

            if (returnFocus?.isConnected && !returnFocus.closest("[inert]")) {
                returnFocus.focus({ preventScroll: true });
            } else if (expectedTopLayer) {
                focusInitialElement(expectedTopLayer);
            }
        });
    };

    const clearPreloaderTimers = () => {
        if (preloaderInterval !== null) window.clearInterval(preloaderInterval);
        if (preloaderExitTimer !== null) window.clearTimeout(preloaderExitTimer);
        if (preloaderHideTimer !== null) window.clearTimeout(preloaderHideTimer);
        preloaderInterval = null;
        preloaderExitTimer = null;
        preloaderHideTimer = null;
    };

    const hidePreloader = ({ immediate = false } = {}) => {
        if (!preloader) return;
        clearPreloaderTimers();
        preloader.classList.add("hide");

        if (immediate) {
            preloader.hidden = true;
            return;
        }

        preloaderHideTimer = window.setTimeout(() => {
            preloader.hidden = true;
            preloaderHideTimer = null;
        }, 720);
    };

    const runPreloader = () => {
        if (!preloader || !preloaderCounter || !preloaderFill) return;

        if (window.__portfolioShouldPlayPreloader !== true || prefersReducedMotion) {
            preloaderCounter.textContent = "100";
            preloaderFill.style.width = "100%";
            hidePreloader({ immediate: true });
            return;
        }

        let count = 0;
        preloaderInterval = window.setInterval(() => {
            count += Math.floor(Math.random() * 10) + 2;
            if (count > 100) count = 100;

            preloaderCounter.textContent = String(count);
            preloaderFill.style.width = `${count}%`;

            if (count === 100) {
                window.clearInterval(preloaderInterval);
                preloaderInterval = null;
                preloaderExitTimer = window.setTimeout(() => {
                    hidePreloader();
                }, 280);
            }
        }, 48);
    };

    window.addEventListener("pageshow", (event) => {
        if (!event.persisted) return;
        hidePreloader({ immediate: true });
    });

    const rotateSignature = () => {
        if (!signatureWord || prefersReducedMotion) return;

        let signatureIndex = 0;
        setInterval(() => {
            signatureIndex = (signatureIndex + 1) % signatureWords.length;
            signatureWord.textContent = signatureWords[signatureIndex];
        }, 1800);
    };

    const setActiveNavById = (id) => {
        navAnchors.forEach((anchor) => {
            const href = anchor.getAttribute("href") || "";
            anchor.classList.toggle("active", href === `#${id}`);
        });
    };

    const railSections = [homeSection, ...Array.from(buildSections)].filter(Boolean);
    const titleElements = Array.from(sectionTitles);
    const journeyElements = Array.from(journeyItems);
    const titleRenderCache = new WeakMap();
    const journeyRenderCache = new WeakMap();
    let pageMotionGeometry = null;
    let renderedStageId = "";
    let renderedNavbarSticky = null;
    let renderedStoryRatio = -1;
    let renderedGridOffset = null;
    let renderedJourneyProgress = "";

    const measurePageMotionGeometry = (state) => {
        const measure = (element) => {
            const rect = element.getBoundingClientRect();
            const top = rect.top + state.scrollY;
            return { element, top, bottom: top + rect.height, height: rect.height };
        };

        pageMotionGeometry = {
            layoutVersion: state.layoutVersion,
            titles: titleElements.map(measure),
            sections: railSections.map(measure),
            journeyTrack: journeyTrack ? measure(journeyTrack) : null,
            journeyItems: journeyElements.map(measure)
        };
    };

    const buildJourneyFrame = (state, geometry) => {
        if (!geometry.journeyTrack || !journeyProgress) return null;

        if (prefersReducedMotion) {
            return {
                mode: "after",
                progress: 1,
                items: geometry.journeyItems.map(({ element }) => ({ element, progress: 1 }))
            };
        }

        const { scrollY, viewportHeight } = state;
        const track = geometry.journeyTrack;
        const before = scrollY + (viewportHeight * 0.92) < track.top;
        const after = scrollY + (viewportHeight * 0.28) > track.bottom;

        if (before || after) {
            const progress = after ? 1 : 0;
            return {
                mode: after ? "after" : "before",
                progress,
                items: geometry.journeyItems.map(({ element }) => ({ element, progress }))
            };
        }

        const startAnchor = viewportHeight * 0.72;
        const endAnchor = viewportHeight * 0.34;
        const travel = Math.max(1, track.height + startAnchor - endAnchor);
        const progress = clamp((startAnchor - (track.top - scrollY)) / travel, 0, 1);
        const revealStart = viewportHeight * 0.9;
        const revealEnd = viewportHeight * 0.56;
        const revealDistance = Math.max(1, revealStart - revealEnd);

        return {
            mode: "active",
            progress,
            items: geometry.journeyItems.map(({ element, top }) => {
                const rawProgress = clamp((revealStart - (top - scrollY)) / revealDistance, 0, 1);
                const itemProgress = rawProgress * rawProgress * (3 - 2 * rawProgress);
                return { element, progress: itemProgress };
            })
        };
    };

    const readPageMotion = (state) => {
        const pointerFrame = state.pointer && lightField
            ? {
                x: ((state.pointerX / Math.max(1, state.viewportWidth)) - 0.5) * 16,
                y: ((state.pointerY / Math.max(1, state.viewportHeight)) - 0.5) * 12
            }
            : null;

        if (!(state.scroll || state.layout || state.force)) {
            return { pointerFrame };
        }

        if (!pageMotionGeometry || pageMotionGeometry.layoutVersion !== state.layoutVersion) {
            measurePageMotionGeometry(state);
        }

        const geometry = pageMotionGeometry;
        const activationY = state.scrollY + (state.viewportHeight * 0.34);
        let activeId = geometry.sections[0]?.element.id || "";
        let closestDistance = Infinity;

        geometry.sections.forEach((section) => {
            if (section.top <= activationY && section.bottom > activationY) {
                activeId = section.element.id;
                closestDistance = -1;
                return;
            }

            if (closestDistance < 0) return;
            const distance = Math.abs(section.top - activationY);
            if (distance < closestDistance) {
                closestDistance = distance;
                activeId = section.element.id;
            }
        });

        const viewportMid = state.viewportHeight * 0.5;
        const titles = prefersReducedMotion
            ? []
            : geometry.titles.flatMap(({ element, top }) => {
                const viewportTop = top - state.scrollY;
                if (viewportTop < -state.viewportHeight || viewportTop > state.viewportHeight * 1.8) return [];
                const delta = (viewportTop - viewportMid) / Math.max(1, viewportMid);
                return [{ element, transform: `translate3d(${clamp(-delta * 12, -12, 12).toFixed(2)}px, 0, 0)` }];
            });

        const firstSection = geometry.sections[0];
        const lastSection = geometry.sections[geometry.sections.length - 1];
        const storyRatio = firstSection && lastSection
            ? clamp((state.scrollY - firstSection.top) / Math.max(1, lastSection.bottom - firstSection.top), 0, 1)
            : 0;

        return {
            pointerFrame,
            navbarSticky: state.scrollY > 20,
            gridOffset: isFinePointer ? -((state.scrollY * 0.025) % 72) : 0,
            activeId,
            storyRatio,
            titles,
            journey: buildJourneyFrame(state, geometry)
        };
    };

    const writePageMotion = (_state, frame) => {
        if (!frame) return;

        if (frame.pointerFrame && lightField) {
            lightField.style.transform = `translate3d(${frame.pointerFrame.x.toFixed(2)}px, ${frame.pointerFrame.y.toFixed(2)}px, 0)`;
        }

        if (typeof frame.navbarSticky !== "boolean") return;

        if (navbar && frame.navbarSticky !== renderedNavbarSticky) {
            renderedNavbarSticky = frame.navbarSticky;
            navbar.classList.toggle("sticky", frame.navbarSticky);
        }

        if (ambientGrid && frame.gridOffset !== renderedGridOffset) {
            renderedGridOffset = frame.gridOffset;
            ambientGrid.style.transform = `translate3d(0, ${frame.gridOffset.toFixed(2)}px, 0)`;
        }

        frame.titles.forEach(({ element, transform }) => {
            if (titleRenderCache.get(element) === transform) return;
            titleRenderCache.set(element, transform);
            element.style.transform = transform;
        });

        if (frame.activeId !== renderedStageId) {
            renderedStageId = frame.activeId;
            setActiveNavById(frame.activeId);
            buildSections.forEach((section) => {
                section.classList.toggle("stage-active", section.id === frame.activeId);
            });
            storyDots.forEach((dot) => {
                dot.classList.toggle("active", dot.dataset.target === frame.activeId);
            });
        }

        if (storyRail && storyRailFill && Math.abs(frame.storyRatio - renderedStoryRatio) > 0.0005) {
            renderedStoryRatio = frame.storyRatio;
            storyRailFill.style.transform = `scaleY(${frame.storyRatio.toFixed(4)})`;
        }

        if (!frame.journey) return;

        const journeyProgressValue = `scaleY(${frame.journey.progress.toFixed(4)})`;
        if (journeyProgressValue !== renderedJourneyProgress) {
            renderedJourneyProgress = journeyProgressValue;
            journeyProgress.style.transform = journeyProgressValue;
        }

        frame.journey.items.forEach(({ element, progress }) => {
            const next = {
                opacity: progress.toFixed(4),
                shift: `${((1 - progress) * 58).toFixed(2)}px`,
                scale: (0.975 + progress * 0.025).toFixed(4),
                dotScale: (0.62 + progress * 0.38).toFixed(4),
                visible: progress > 0.04
            };
            const previous = journeyRenderCache.get(element);

            if (!previous || previous.opacity !== next.opacity) element.style.setProperty("--journey-opacity", next.opacity);
            if (!previous || previous.shift !== next.shift) element.style.setProperty("--journey-shift", next.shift);
            if (!previous || previous.scale !== next.scale) element.style.setProperty("--journey-scale", next.scale);
            if (!previous || previous.dotScale !== next.dotScale) element.style.setProperty("--journey-dot-scale", next.dotScale);
            if (!previous || previous.visible !== next.visible) element.classList.toggle("is-journey-visible", next.visible);

            journeyRenderCache.set(element, next);
        });
    };

    const setupMarqueeVisibility = () => {
        const marqueeWrap = document.querySelector(".marquee-wrap");
        if (!marqueeWrap) return;

        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            marqueeWrap.classList.add("is-motion-visible");
            return;
        }

        const marqueeObserver = new IntersectionObserver(([entry]) => {
            marqueeWrap.classList.toggle("is-motion-visible", entry.isIntersecting);
        }, { rootMargin: "120px 0px", threshold: 0 });

        marqueeObserver.observe(marqueeWrap);
    };

    motionEngine.register({
        read: readPageMotion,
        write: writePageMotion
    });

    const openMenu = () => {
        if (!fsMenu || !openMenuBtn) return;
        openLayer(fsMenu, openMenuBtn);
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
                    "Commandes: /about, /skills, /projects, /revaloop, /responsiver, /minecraft, /formation, /veille, /personality, /goals, /contact, /cv, /clear.",
                    "Tu peux aussi écrire: qui es-tu, quels projets, quelle stack, quelle veille, objectif, contact..."
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
                    "Le portfolio présente 9 projets, avec Wheello comme réalisation client principale et Revaloop comme nouvelle plateforme open source en développement.",
                    "On y retrouve des projets client, des projets académiques, deux produits Electron, un jeu web jouable, une démo 3D et une map Minecraft automatisée.",
                    "La logique: montrer ma progression, pas juste empiler des maquettes. Chaque projet précise son rôle, son état et son impact."
                ],
                action: { label: "Voir les projets", target: "#projects" }
            },
            "/revaloop": {
                lines: [
                    "Revaloop est une plateforme open source de recette client actuellement en alpha.",
                    "Elle rassemble une preview HTTPS, des invitations temporaires, des annotations visuelles, une discussion et un workflow de revalidation jusqu'à l'approbation finale.",
                    "Son compagnon Electron lance et surveille déjà un projet local de façon explicite. Le tunnel de partage distant reste une étape à venir, clairement séparée des fonctions déjà opérationnelles."
                ],
                action: { label: "Ouvrir Revaloop", projectId: 9 }
            },
            "/responsiver": {
                lines: [
                    "Responsiver est une application desktop open source en cours de développement pour auditer, corriger et valider la responsivité d'un site.",
                    "Son Studio compare jusqu'à cinq écrans synchronisés; l'Atelier visuel, Monaco et la Matrice anti-régression encadrent ensuite les corrections.",
                    "Le projet repose sur Electron, React, TypeScript, Chromium et Playwright, avec une approche local-first: les sources restent sur la machine et rien n'est appliqué sans validation."
                ],
                action: { label: "Ouvrir Responsiver", projectId: 5 }
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
            "/veille": {
                lines: [
                    "Ma veille couvre l'IA et les agents, le développement web, les interfaces, l'écosystème Apple et les outils de conception.",
                    "Je pars de signaux repérés sur X ou dans ma bibliothèque Notion, puis je remonte aux sources officielles avant de tester l'idée dans un contexte maîtrisé.",
                    "La page dédiée montre la méthode, les sujets récents et leur impact concret sur Revaloop, Responsiver et Jessica Dew."
                ],
                action: { label: "Ouvrir la veille technologique", href: "./veille.html" }
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
                    "Mon CV est disponible en PDF.",
                    "Tu peux l'ouvrir quand tu veux avec le bouton ci-dessous."
                ],
                action: { label: "Ouvrir le CV", href: "./documents/cv-raphael-coursier.pdf" }
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
            "/revaloop": "/revaloop",
            "/recette": "/revaloop",
            "/recette client": "/revaloop",
            "/validation client": "/revaloop",
            "/responsiver": "/responsiver",
            "/responsive": "/responsiver",
            "/application responsiver": "/responsiver",
            "/minecraft": "/minecraft",
            "/citadelle": "/minecraft",
            "/citadelle rouge": "/minecraft",
            "/la citadelle rouge": "/minecraft",
            "/redstone": "/minecraft",
            "/ecole": "/formation",
            "/école": "/formation",
            "/formation scolaire": "/formation",
            "/parcours": "/formation",
            "/veille": "/veille",
            "/veille techno": "/veille",
            "/veille technologique": "/veille",
            "/quelle veille": "/veille",
            "/technologie": "/veille",
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

            if (window.SiteSmoothScroll) {
                window.SiteSmoothScroll.toElement(target, { hash: selector });
                return;
            }

            target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
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
                appendLine("response", "Essaie /help, /about, /skills, /projects, /veille, /revaloop, /responsiver ou /contact.");
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
        appendLine("response", "Tape /help pour commencer");
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

    const setupAboutLanyard = () => {
        if (!aboutLanyardStage || !aboutLanyardMotion) return;

        let isActive = false;
        let hasRevealed = false;
        let lastScrollY = window.scrollY;
        let settleTimer = null;
        let pointerInside = false;
        let pointerBounds = null;
        let pointerSwing = 0;
        const renderedMotion = {
            x: "",
            y: "",
            swing: ""
        };

        const revealLanyard = () => {
            if (hasRevealed) return;
            hasRevealed = true;
            aboutLanyardStage.classList.add("is-lanyard-visible");
        };

        const setActive = (active) => {
            isActive = active;
            aboutLanyardStage.classList.toggle("is-lanyard-active", active);
            if (active) revealLanyard();
        };

        if (prefersReducedMotion) {
            revealLanyard();
            return;
        }

        if (!("IntersectionObserver" in window)) {
            setActive(true);
        } else {
            const lanyardObserver = new IntersectionObserver(
                ([entry]) => setActive(entry.isIntersecting),
                { threshold: 0.08, rootMargin: "100px 0px 100px 0px" }
            );
            lanyardObserver.observe(aboutLanyardStage);
        }

        if (!motionEngine) return;

        const resetPointer = () => {
            pointerInside = false;
            pointerBounds = null;
            pointerSwing = 0;
            motionEngine.request();
        };

        if (isFinePointer) {
            aboutLanyardStage.addEventListener("pointerenter", () => {
                pointerBounds = aboutLanyardStage.getBoundingClientRect();
                pointerInside = true;
                motionEngine.request();
            });
            aboutLanyardStage.addEventListener("pointerleave", resetPointer);
            aboutLanyardStage.addEventListener("blur", resetPointer, true);
        }

        motionEngine.register({
            read(state) {
                const scrollDelta = state.scroll ? state.scrollY - lastScrollY : 0;
                lastScrollY = state.scrollY;
                if (!isActive) return null;
                if (!state.scroll && !state.force && !(pointerInside && state.pointer)) return null;

                let localX = 0;
                let localY = 0;

                if (pointerInside && pointerBounds && (state.pointer || state.force)) {
                    const ratioX = clamp((state.pointerX - pointerBounds.left) / Math.max(1, pointerBounds.width), 0, 1);
                    const ratioY = clamp((state.pointerY - pointerBounds.top) / Math.max(1, pointerBounds.height), 0, 1);
                    localX = (ratioX - 0.5) * 2;
                    localY = (ratioY - 0.5) * 2;
                }

                pointerSwing = localX * 0.48;

                return {
                    x: localX * 2,
                    y: localY * 0.8,
                    swing: clamp(pointerSwing + scrollDelta * 0.045, -3.6, 3.6),
                    hasScrollKick: Math.abs(scrollDelta) > 0.25
                };
            },
            write(_state, frame) {
                if (!frame) return;

                const x = `${frame.x.toFixed(2)}px`;
                const y = `${frame.y.toFixed(2)}px`;
                const swing = `${frame.swing.toFixed(2)}deg`;

                if (x !== renderedMotion.x) {
                    renderedMotion.x = x;
                    aboutLanyardStage.style.setProperty("--lanyard-x", x);
                }
                if (y !== renderedMotion.y) {
                    renderedMotion.y = y;
                    aboutLanyardStage.style.setProperty("--lanyard-y", y);
                }
                if (swing !== renderedMotion.swing) {
                    renderedMotion.swing = swing;
                    aboutLanyardStage.style.setProperty("--lanyard-swing", swing);
                }

                if (!frame.hasScrollKick) return;
                window.clearTimeout(settleTimer);
                settleTimer = window.setTimeout(() => {
                    const settledSwing = `${pointerSwing.toFixed(2)}deg`;
                    renderedMotion.swing = settledSwing;
                    aboutLanyardStage.style.setProperty("--lanyard-swing", settledSwing);
                }, 90);
            }
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

    const renderProjectVisual = (project, compact = false) => {
        if (project.cover) {
            const source = compact
                ? project.cover.replace(/cover\.webp(?=([?#]|$))/, "thumb.webp")
                : project.cover;
            return `<img src="${source}" alt="Aperçu du projet ${project.title}" loading="lazy" decoding="async">`;
        }

        return `
            <div class="project-placeholder" aria-label="Emplacement visuel à compléter">
                <i class="fas fa-layer-group" aria-hidden="true"></i>
                <strong>${project.coverLabel || "Visuels à intégrer"}</strong>
                <span>Captures à ajouter</span>
            </div>
        `;
    };

    const normalizeProjectGalleryImages = (data) => (data.images || []).map((image, index) => (
        typeof image === "string"
            ? {
                src: image,
                alt: `Aperçu ${data.title}`,
                caption: "Capture du projet",
                label: `${String(index + 1).padStart(2, "0")} / Écran`,
                title: `Vue ${String(index + 1).padStart(2, "0")}`,
                orientation: "landscape"
            }
            : {
                label: `${String(index + 1).padStart(2, "0")} / Écran`,
                title: `Vue ${String(index + 1).padStart(2, "0")}`,
                caption: "Capture du projet",
                orientation: "landscape",
                ...image
            }
    ));

    const renderProjectGalleryHeading = (data, fallbackEyebrow) => `
        <div class="pm-gallery-heading">
            <span>${data.galleryEyebrow || fallbackEyebrow}</span>
            <div>
                <h4>${data.galleryTitle || "Une expérience construite écran par écran"}</h4>
                <p>${data.gallerySummary || "Une sélection de vues représentatives du projet."}</p>
            </div>
        </div>
    `;

    const renderProjectGalleryImage = (data, image, extraClass = "") => `
        <button class="pm-image-zoom js-image-zoom ${extraClass}" type="button" data-src="${image.src}" data-alt="${image.alt || `Aperçu ${data.title}`}" data-caption="${image.caption}" aria-label="Afficher cette capture en grand">
            <img src="${image.src}" alt="${image.alt || `Aperçu ${data.title}`}" loading="lazy" decoding="async">
            <span><i class="fas fa-up-right-and-down-left-from-center"></i> Agrandir</span>
        </button>
    `;

    const renderProjectModalMedia = (data) => {
        let imageMarkup = "";

        if (data.galleryLayout === "editorial") {
            const editorialImages = (data.images || []).map((image, index) => (
                typeof image === "string"
                    ? {
                        src: image,
                        alt: `Aperçu ${data.title}`,
                        caption: "Capture du projet",
                        label: `${String(index + 1).padStart(2, "0")} / Écran`,
                        orientation: "landscape"
                    }
                    : image
            ));

            imageMarkup = `
                <section class="pm-editorial-showcase">
                    <div class="pm-editorial-heading">
                        <span>PARCOURS VISUEL</span>
                        <div>
                            <h4>${data.galleryTitle || "Une expérience construite écran par écran"}</h4>
                            <p>${data.gallerySummary || "Une sélection de vues représentatives du projet."}</p>
                        </div>
                    </div>
                    <div class="pm-editorial-mosaic">
                        ${editorialImages.map((image, index) => `
                            <figure class="pm-editorial-frame pm-editorial-slot-${index + 1} is-${image.orientation || "landscape"}">
                                <button class="pm-image-zoom js-image-zoom" type="button" data-src="${image.src}" data-alt="${image.alt || `Aperçu ${data.title}`}" data-caption="${image.caption || "Capture du projet"}" aria-label="Afficher cette capture en grand">
                                    <img src="${image.src}" alt="${image.alt || `Aperçu ${data.title}`}" loading="lazy" decoding="async">
                                    <span><i class="fas fa-up-right-and-down-left-from-center"></i> Agrandir</span>
                                </button>
                                <figcaption>
                                    <span>${image.label || `${String(index + 1).padStart(2, "0")} / Écran`}</span>
                                    <p>${image.caption || "Capture du projet"}</p>
                                </figcaption>
                            </figure>
                        `).join("")}
                    </div>
                </section>
            `;
        } else if (data.galleryLayout === "review-loop") {
            const reviewImages = normalizeProjectGalleryImages(data);

            imageMarkup = `
                <section class="pm-project-gallery pm-review-loop">
                    ${renderProjectGalleryHeading(data, "BOUCLE DE RECETTE")}
                    <div class="pm-review-flow">
                        ${reviewImages.map((image, index) => `
                            <figure class="pm-review-step pm-review-step-${index + 1}">
                                <div class="pm-review-step-head">
                                    <span>${image.label}</span>
                                    <strong>${image.title}</strong>
                                </div>
                                ${renderProjectGalleryImage(data, image)}
                                <figcaption>${image.caption}</figcaption>
                            </figure>
                        `).join("")}
                    </div>
                </section>
            `;
        } else if (data.galleryLayout === "museum-tour") {
            const museumImages = normalizeProjectGalleryImages(data);

            imageMarkup = `
                <section class="pm-project-gallery pm-museum-tour">
                    ${renderProjectGalleryHeading(data, "VISITE NOCTURNE")}
                    <div class="pm-museum-route" aria-hidden="true">
                        ${museumImages.map((image, index) => `
                            <span class="${index === 0 ? "active" : ""}">
                                <i></i>
                                ${image.label}
                            </span>
                        `).join("")}
                    </div>
                    <div class="pm-museum-rooms">
                        ${museumImages.map((image, index) => `
                            <figure class="pm-museum-room pm-museum-room-${index + 1}">
                                <div class="pm-museum-frame">
                                    ${renderProjectGalleryImage(data, image)}
                                </div>
                                <figcaption>
                                    <span>${image.label}</span>
                                    <strong>${image.title}</strong>
                                    <p>${image.caption}</p>
                                </figcaption>
                            </figure>
                        `).join("")}
                    </div>
                </section>
            `;
        } else if (data.galleryLayout === "responsive-lab") {
            const labImages = normalizeProjectGalleryImages(data);
            const labStats = (data.galleryStats || []).map((stat) => (
                typeof stat === "string" ? { label: "Signal", value: stat } : stat
            ));

            imageMarkup = `
                <section class="pm-project-gallery pm-responsive-lab">
                    ${renderProjectGalleryHeading(data, "WORKBENCH LOCAL-FIRST")}
                    <div class="pm-lab-readouts">
                        ${labStats.map((stat) => `
                            <div>
                                <span>${stat.label}</span>
                                <strong>${stat.value}</strong>
                            </div>
                        `).join("")}
                    </div>
                    <div class="pm-lab-stage">
                        ${labImages.map((image, index) => `
                            <figure class="pm-lab-panel pm-lab-panel-${index + 1}">
                                <div class="pm-lab-panel-bar">
                                    <span>${image.label}</span>
                                    <strong>${image.title}</strong>
                                    <i aria-hidden="true"></i>
                                </div>
                                ${renderProjectGalleryImage(data, image)}
                                <figcaption>${image.caption}</figcaption>
                            </figure>
                        `).join("")}
                    </div>
                </section>
            `;
        } else if (data.galleryLayout === "inspection-console") {
            const inspectionImages = normalizeProjectGalleryImages(data);
            const inspectionStats = (data.galleryStats || []).map((stat) => (
                typeof stat === "string" ? { label: "Mesure", value: stat } : stat
            ));

            imageMarkup = `
                <section class="pm-project-gallery pm-inspection-console">
                    ${renderProjectGalleryHeading(data, "POSTE D'INSPECTION")}
                    <div class="pm-inspection-readouts">
                        ${inspectionStats.map((stat) => `
                            <div>
                                <span>${stat.label}</span>
                                <strong>${stat.value}</strong>
                            </div>
                        `).join("")}
                    </div>
                    <div class="pm-inspection-stage">
                        ${inspectionImages.map((image, index) => `
                            <figure class="pm-inspection-view pm-inspection-view-${index + 1}">
                                <div class="pm-inspection-view-head">
                                    <span>${image.label}</span>
                                    <strong>${image.title}</strong>
                                    <i>${index === 0 ? "LIVE" : "MODE"}</i>
                                </div>
                                <div class="pm-inspection-media">
                                    ${renderProjectGalleryImage(data, image)}
                                    ${index === 0 ? '<span class="pm-inspection-scan" aria-hidden="true"></span>' : ""}
                                </div>
                                <figcaption>${image.caption}</figcaption>
                            </figure>
                        `).join("")}
                    </div>
                </section>
            `;
        } else if (data.galleryLayout === "redstone-system") {
            const redstoneImages = normalizeProjectGalleryImages(data);
            const redstoneGroups = redstoneImages.reduce((groups, image) => {
                const groupName = image.group || "Système";
                groups[groupName] = groups[groupName] || [];
                groups[groupName].push(image);
                return groups;
            }, {});

            imageMarkup = `
                <section class="pm-project-gallery pm-redstone-system">
                    ${renderProjectGalleryHeading(data, "SYSTÈME SOUS LA MAP")}
                    <div class="pm-redstone-layers">
                        ${Object.entries(redstoneGroups).map(([groupName, images], groupIndex) => `
                            <section class="pm-redstone-layer pm-redstone-layer-${groupIndex + 1}">
                                <div class="pm-redstone-layer-head">
                                    <span>${String(groupIndex + 1).padStart(2, "0")}</span>
                                    <div>
                                        <h5>${groupName}</h5>
                                        <p>${data.galleryGroups?.[groupName] || "Une couche essentielle du système de jeu."}</p>
                                    </div>
                                </div>
                                <div class="pm-redstone-grid has-${images.length}">
                                    ${images.map((image, imageIndex) => `
                                        <figure class="pm-redstone-node pm-redstone-node-${imageIndex + 1}">
                                            ${renderProjectGalleryImage(data, image)}
                                            <figcaption>
                                                <span>${image.label}</span>
                                                <p>${image.caption}</p>
                                            </figcaption>
                                        </figure>
                                    `).join("")}
                                </div>
                            </section>
                        `).join("")}
                    </div>
                </section>
            `;
        } else if (data.galleryLayout === "case-study") {
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
        const orderedProjects = [...projects].sort(
            (first, second) => Number.parseInt(first.index, 10) - Number.parseInt(second.index, 10)
        );

        const visibleProjects =
            isCompact
                ? orderedProjects
                : orderedProjects.filter((project) => project.filter === filter);

        if (!visibleProjects.length) {
            projectGrid.classList.remove("is-compact");
            projectGrid.innerHTML = '<p class="empty-projects">Aucun projet sur ce filtre pour le moment.</p>';
            motionEngine.invalidateLayout();
            return;
        }

        projectGrid.classList.toggle("is-compact", isCompact);

        projectGrid.innerHTML = visibleProjects
            .map((project, idx) => {
                const reverseClass = !isCompact && idx % 2 === 1 ? "reverse" : "";
                const buttonContent = '<span>Voir le projet</span><i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>';
                const visualContent = renderProjectVisual(project, isCompact);

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
                                <span>${project.dateLabel || "Création"}</span>
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
                                <button class="btn-simple open-project project-cta" data-id="${project.id}" type="button">
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
        motionEngine.invalidateLayout();
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
        if (dateTarget) dateTarget.textContent = `${data.dateLabel || "Création"}\u00a0: ${data.created}`;
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
        if (textTarget) {
            const paragraphs = data.description
                .split(/\n{2,}/)
                .map((paragraph) => paragraph.trim())
                .filter(Boolean)
                .map((paragraph) => {
                    const element = document.createElement("p");
                    element.textContent = paragraph;
                    return element;
                });

            textTarget.replaceChildren(...paragraphs);
        }

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
                liveTarget.innerHTML = `<span>${data.liveLabel || "Voir le site"}</span><i class="fas fa-external-link-alt"></i>`;
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
                liveTarget.innerHTML = '<span>Voir le site</span><i class="fas fa-external-link-alt"></i>';
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

    document.addEventListener("portfolio:open-project", (event) => {
        openProject(event.detail?.id);
    });

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
                openLayer(imageLightbox, imageTrigger);
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
            openLayer(modal, openBtn);
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
        if (event.key === "Tab") {
            trapLayerFocus(event);
            return;
        }

        if (event.key !== "Escape") return;

        const topLayer = getTopLayer();
        if (!topLayer) return;

        event.preventDefault();
        if (topLayer === fsMenu) {
            closeMenu();
            return;
        }

        closeLayer(topLayer);
    });

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
        let lastCursorTimestamp = 0;

        const renderCursor = (timestamp) => {
            cursorFrame = null;
            const deltaSeconds = lastCursorTimestamp
                ? Math.min(0.05, (timestamp - lastCursorTimestamp) / 1000)
                : 1 / 60;
            const followAlpha = 1 - Math.exp(-10.5 * deltaSeconds);
            lastCursorTimestamp = timestamp;
            followerX += (mouseX - followerX) * followAlpha;
            followerY += (mouseY - followerY) * followAlpha;

            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
            follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;

            if (Math.abs(mouseX - followerX) > 0.1 || Math.abs(mouseY - followerY) > 0.1) {
                cursorFrame = requestAnimationFrame(renderCursor);
            } else {
                lastCursorTimestamp = 0;
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
    setupAboutLanyard();
    bindCapabilityExplorer();
    bindMagnetic();
    bindManifestoFlow();
    setupMarqueeVisibility();
    renderProjects("all");
    motionEngine.invalidateLayout();
    document.documentElement.classList.add("portfolio-ready");
});
