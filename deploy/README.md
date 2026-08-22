# Déploiement OVH

Le script prépare un paquet à partir de `deploy/ovh-allowlist.txt`. Les dossiers de travail (`.git`, `.playwright-cli`, `.vscode`, `output`, `tmp` et `source`) sont refusés, et seuls les trois PDF publics nommés dans la liste peuvent sortir de `documents`.

## Vérifier le paquet

```sh
./scripts/deploy-ovh.sh
```

La simulation est le mode par défaut : elle valide les chemins, les empreintes CSP des scripts inline, refuse tout fichier non suivi par Git, affiche tous les fichiers retenus et n’envoie rien.

## Publier explicitement

```sh
OVH_FTP_HOST="ftp.clusterXXX.hosting.ovh.net" \
OVH_FTP_USER="utilisateur" \
OVH_FTP_PASSWORD="mot-de-passe" \
./scripts/deploy-ovh.sh --apply
```

Le port `21` et le dossier `/www` sont utilisés par défaut. Ils peuvent être adaptés avec `OVH_FTP_PORT` et `OVH_REMOTE_DIR`. Les identifiants restent dans l’environnement et ne doivent jamais être ajoutés au dépôt.

Le mode `--apply` refuse un worktree Git contenant des changements non commités. Il envoie d’abord les ressources, puis `index.html`, `veille.html` et enfin `.htaccess` pour éviter qu’une page ne référence une ancienne ressource sous une nouvelle clé de cache. Le code d’amorçage est externalisé : le basculement final de la CSP ne dépend plus d’un script exécutable inline.

Le transfert FTPS ajoute ou remplace les fichiers de la liste blanche, mais ne supprime jamais de fichier distant. Toute suppression sur l’hébergement doit donc rester une opération séparée et ciblée après vérification du chemin exact.
