# Validation locale — 21 novembre 2026

Source CookingNinja : `11b22b57624766023717b35a30d1227599912546`.
Construction par `build.py`, Node 22.20.0, Vite 7.3.8.
Le correctif a été réappliqué à un export Git neuf avant la compilation finale.
TypeScript, formatage Prettier et compilation Vite réussis.

Le dossier public contient 62 fichiers, 1 674 689 octets (environ 1,67 Mo).
Les cinq fichiers JavaScript totalisent environ 271 ko après gzip et les trois
feuilles CSS environ 28 ko après gzip. Ce sont des tailles calculées localement,
pas une mesure de compression ou de temps de transfert sur OVH.
Le film de 30 885 190 octets n'est pas inclus.

## Chromium

- Chargement sous `/demos/cooking-ninja/` avec les chemins relatifs.
- Politique CSP du portfolio appliquée aux réponses HTML de test : aucune violation.
- Aucun appel `/api/`, aucune connexion WebSocket, aucune ressource demandée hors du
  sous-dossier de la démo pendant le parcours observé.
- Coupe à la souris : score et nombre d'ingrédients progressent, pause fonctionnelle.
- Une partie Burger complète atteint la victoire : découpe, événements, mélange,
  résultat, 47 coupes et 10 500 points. Le tirage aléatoire a été fixé dans le seul
  navigateur de test afin de couvrir les étapes ; les règles, collisions et
  chronomètres du bundle n'ont pas été modifiés. Ce test valide le parcours, pas
  l'équilibrage ou un niveau de joueur.
- « Joueur suivant » conserve le mode local. Préparation Tacos et Choco vérifiée.
- Tactile simulé à 390 × 844 par les événements tactiles Chromium : deux coupes,
  210 points, aucun débordement horizontal. Cela ne remplace pas un essai physique.
- Les six étapes de l'atelier, le panneau de code et le retour au jeu fonctionnent.

## WebKit

Une session neuve du moteur WebKit a vérifié le lancement, une coupe réelle
(100 points et 1 ingrédient), la progression de la partie et la pause, sans erreur
JavaScript, appel API ni WebSocket.

Ce parcours a été contrôlé sans injection de CSP dans le serveur HTTP de test :
l'injection initiale de `upgrade-insecure-requests` faisait demander les ressources
en HTTPS à ce serveur HTTP, avec une erreur TLS ensuite conservée en cache.
Il s'agit d'une limite du montage local, pas d'un changement requis pour le site
HTTPS. La CSP complète a été validée dans Chromium. Le moteur WebKit automatisé
ne remplace pas un essai dans l'application Safari ni sur iPhone physique.

## Masquage de l'onglet

Le test de changement d'onglet de l'outil n'a pas fait passer `document.hidden` à
`true` ; il ne permet donc pas de conclure sur la gestion réelle des fenêtres du
système. Un événement de visibilité avec `document.hidden = true`, simulé dans le
navigateur, a vérifié l'arrêt des callbacks RAF du jeu et de l'atelier : aucun
callback supplémentaire pendant l'intervalle mesuré. La reprise et la pause de
partie restent pilotées par les contrôles du jeu.

## Limites

Ces contrôles portent sur le bundle servi localement, pas sur OVH. Ils ne mesurent
ni les performances de tous les GPU Windows/Linux, ni le confort sur téléphone
physique. Le jeu nécessite WebGL et consomme du CPU/GPU lorsqu'il est ouvert. Son
isolation dans un nouvel onglet évite de charger son code dans le portfolio ; le
contrôle de cette intégration relève du test réseau du portfolio.
