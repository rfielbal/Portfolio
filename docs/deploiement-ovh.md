# Publication du Portfolio sur OVH

Le dépôt `rfielbal/Portfolio` contient le site statique publié sur `https://rfielbal.fr`.
La branche `main` est la source des publications. Une pull request exécute les
vérifications, sans identifiants OVH et sans modifier le site.

## Première activation

L’association **Git** de l’espace OVH n’est pas nécessaire. Le workflow utilise
SFTP sur le compte existant, sans accès shell SSH.

1. Créer l’environnement GitHub **production** dans les réglages du dépôt.
2. Ajouter les variables ci-dessous dans **Settings → Secrets and variables →
   Actions → Variables** du dépôt ou dans l’environnement **production**.
   `OVH_DEPLOY_ENABLED` doit être une variable
   **du dépôt** : une variable limitée à l’environnement n’est pas disponible
   lors de l’évaluation de la condition du job.
3. Ajouter les deux secrets dans l’environnement **production**. Ne jamais
   coller un mot de passe dans un fichier, une issue, une PR ou un journal.
4. Fusionner la PR après les vérifications. Tant que l’activation vaut `false`,
   les vérifications passent et la publication est ignorée.
5. Lorsque les paramètres sont vérifiés, passer `OVH_DEPLOY_ENABLED` à `true`,
   ouvrir **Actions → Portfolio · Vérifier et publier OVH → Run workflow**, choisir
   `main` et cocher **Publier le commit de main sur rfielbal.fr**.
6. Après ce premier contrôle, les nouveaux commits de `main` sont publiés
   automatiquement. Utiliser les PR pour relire les modifications avant fusion.

| Variable (`OVH_DEPLOY_ENABLED` au niveau du dépôt) | Valeur attendue |
| --- | --- |
| `OVH_DEPLOY_ENABLED` | `false` pour préparer, puis `true` pour activer |
| `OVH_SFTP_HOST` | Serveur `ftp.cluster…hosting.ovh.net` fourni par OVH |
| `OVH_SFTP_PORT` | `22` |
| `OVH_SFTP_USER` | Identifiant FTP/SFTP OVH, distinct du compte client OVH |
| `OVH_WEB_ROOT` | `rfielbal` |
| `OVH_PRIVATE_ROOT` | `.visionbuild-deployments/portfolio` |
| `SITE_URL` | `https://rfielbal.fr` |

| Secret de l’environnement production | Contenu |
| --- | --- |
| `OVH_SFTP_PASSWORD` | Mot de passe du compte FTP/SFTP |
| `OVH_KNOWN_HOSTS` | Ligne OpenSSH `serveur type-de-cle cle-publique` vérifiée |

La clé SSH du serveur doit provenir d’une connexion SFTP déjà reconnue comme
fiable ou d’une confirmation OVH. `ssh-keyscan` seul ne prouve pas l’identité du
serveur. Le script refuse les clés inconnues ou différentes ; il ne les accepte
jamais automatiquement. Une clé ajoutée dans FileZilla n’est pas forcément au
format OpenSSH : vérifier le format avant de renseigner le secret.

Le dossier privé doit rester **hors de tous les dossiers publiés**. Les racines
relevées dans OVH pour cet hébergement sont `rfielbal`, `www` et
`ecommerce/public`. Les sauvegardes sont à côté de ces dossiers, dans
`.visionbuild-deployments/portfolio`, avec permissions 700. Si les associations
de domaines changent, vérifier de nouveau cette séparation avant de publier.

## Ce que fait une publication

- Vérification syntaxique des scripts publics, vérification CSP et tests du
  client de déploiement, dont une connexion SSH/SFTP locale réelle.
- Préparation des seuls fichiers publics suivis par Git. Les scripts de
  déploiement, fichiers Git, paramètres d’éditeur, images `source/` et documents
  non autorisés restent exclus. Les fichiers non suivis ne sont jamais envoyés.
- Vérification du commit actuel de `main` avant le transfert, puis après la
  préparation distante. Une ancienne exécution ne peut pas écraser une version
  plus récente. Les publications ne tournent pas simultanément.
- Préparation des fichiers et copies de secours dans un dossier privé propre à
  la tentative. Chaque fichier remplacé conserve ses permissions. Un fichier
  inchangé n’est pas réécrit. Les liens symboliques sont refusés.
- Remplacement atomique **par fichier** (extension SFTP `posix-rename` pour un
  fichier existant), ressources avant pages HTML, manifeste de version en dernier.
- Vérification HTTPS du manifeste exact et du contenu des pages et fichiers
  essentiels par SHA-256. Le statut GitHub `success` est émis après ce contrôle.

Le manifeste public est `/.well-known/visionbuild-release.json`. Il contient le
commit, le lien vers l’exécution GitHub et les empreintes des fichiers publics ;
aucun identifiant OVH ou secret. VisionBuild peut ainsi afficher la publication
confirmée par le workflow, sa date, son commit et les détails de l’exécution.

## En cas d’échec

Avant la validation HTTPS, le script tente de restaurer les fichiers remplacés
et de retirer uniquement les fichiers créés par **cette tentative**. Un fichier
modifié entre-temps par une autre intervention est conservé et signalé. Si la
connexion est perdue, la restauration peut nécessiter une intervention : le
journal le dit explicitement et les sauvegardes restent sur le compte.

Une interruption SIGINT/SIGTERM déclenche aussi une tentative de restauration,
limitée à huit secondes avant la notification d’échec. Un arrêt forcé du runner,
une panne de la machine ou une connexion totalement perdue peuvent empêcher
ce traitement : vérifier alors le journal, le manifeste et les sauvegardes.

Si le site est vérifié mais que l’enregistrement du succès dans GitHub échoue,
le site n’est pas annulé. Le workflow signale que la notification est incertaine :
comparer le manifeste public au commit de l’exécution avant toute nouvelle action.

Un retour à une version antérieure se prépare par une **PR de revert**, puis une
nouvelle publication du commit résultant sur `main`. Relancer une ancienne
exécution est volontairement refusé si son commit n’est plus celui de `main`.

## Limites à connaître

- Le remplacement de plusieurs fichiers n’est pas globalement atomique. Une
  brève transition entre fichiers reste possible ; choisir un moment approprié
  pour les changements importants.
- Les fichiers distants absents du dépôt ne sont pas supprimés. Retirer un ancien
  fichier du serveur nécessite une opération dédiée après vérification.
- Les sauvegardes ne sont pas purgées automatiquement. Surveiller le quota OVH
  et conserver une copie avant toute suppression volontaire.
- Le contrôle HTTP couvre toutes les pages HTML et les ressources de premier
  niveau, pas tous les médias volumineux. Il ne remplace pas une vérification
  visuelle ou fonctionnelle du site.
- La branche doit être protégée sur GitHub pour imposer les PR et les contrôles.
  Le workflow seul n’interdit pas les pushes directs sur `main`.

## Vérifications locales

```sh
python3 -m venv /tmp/portfolio-ovh-check
/tmp/portfolio-ovh-check/bin/pip install --require-hashes -r scripts/deployment/requirements.txt
/tmp/portfolio-ovh-check/bin/python -m unittest discover -s scripts/deployment -p 'test_*.py' -v
node scripts/verify-csp.mjs
python3 scripts/deployment/check.py
python3 scripts/deployment/deploy.py pack
```

La dernière commande crée `output/ovh-site` et refuse d’écraser un paquet déjà
présent. Elle n’ouvre aucune connexion distante. Les tests SFTP utilisent
uniquement une adresse de boucle locale et des identifiants fictifs.
