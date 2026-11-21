# Démo CookingNinja du portfolio

Source : projet CookingNinja, commit `11b22b57624766023717b35a30d1227599912546`.
La variante est construite avec le mode Vite `portfolio-demo` et le correctif
`portfolio-demo.patch`. Le dépôt original n'est pas modifié ; il n'est pas dupliqué
dans le portfolio.

## Construire

Pré requis : Python 3.12+, Git, Node 22.12+ et les dépendances du projet source déjà
installées conformément à son `package-lock.json`.

```sh
python3 scripts/cooking-demo/build.py /chemin/vers/CookingNinja --output /tmp/cooking-demo-verifiee
```

Le script exporte le commit précis dans un dossier temporaire, applique le correctif,
vérifie TypeScript et le formatage, puis compile le site. Il refuse d'écraser un
dossier de sortie existant. Il ne contacte aucun hébergement et ne publie rien.
Le serveur, les tests et les scripts présents dans le staging servent au contrôle
TypeScript ; seuls les fichiers compilés de `dist` sont destinés au portfolio.

## Fonctionnement

- Trois recettes, moteur, collisions, effets, son, pause et résultats du jeu réel.
- Souris ou pointeur tactile sur le même écran. Aucune manette distante, QR,
  reconnexion WebSocket, API de score ou classement partagé.
- Le pseudo et le score restent en mémoire dans l'onglet. Le choix de lame utilise
  le stockage local déjà prévu par le jeu.
- Atelier accessible avec `?atelier=1` : il explique le projet complet et précise
  que ses fonctions téléphone et classement nécessitent le serveur original.
- Ressources relatives, polices et bruitages locaux. Film du stand exclu.
- Boucles de rendu suspendues lorsque l'onglet est masqué ; partie mise en pause et
  son arrêté. Le jeu consomme naturellement du CPU/GPU lorsqu'il est affiché.

## Intégration

Le dossier public est `demos/cooking-ninja/`. Utiliser un lien avec `target="_blank"`
et `rel="noopener noreferrer"`. Ne pas importer le bundle dans le portfolio, ne pas
utiliser d'iframe, de préchargement ou de service worker. Le jeu ne charge ainsi
aucune ressource pendant la visite du portfolio avant l'ouverture de la démo.

La politique CSP peut conserver les scripts, connexions, polices et médias sur
`'self'`. React/Three.js utilisent des styles en ligne ; la règle `style-src
'unsafe-inline'` déjà présente dans le portfolio les permet. Les textures procédurales
sont créées en mémoire ; aucun serveur Node ni permission gyroscope n'est nécessaire.
Ce dossier doit être servi par HTTP(S), et non ouvert en `file://`.

Les fichiers de licence des bibliothèques et polices sont dans `licenses/` ; les
licences et la provenance des sons restent dans `audio/kitchen/`.

## Validation

Voir le compte rendu `validation.md` pour les contrôles locaux et leurs limites.
