# Publier une nouvelle version de l'extension

À la racine du projet, lancer

```
./bin/build
```

Et paf, la branche *publication* est à jour afin de pouvoir [installer](doc/installation.md) l'extension.

# Publication sur les stores

```sh
npm run build-extension
```

Cette commande builde les sources et génère un fichier .zip contenant l'extension dans le dossier `/artifacts`. Ce fichier peut ensuite être uploadé sur le store Chrome pour publication.

```sh
npm run sign-extension -- --api-key user:12345678:123 --api-secret lcygkmao0lk1aj8qqq6ypp2830im8kn2on3i4r4537t11cde9h0o7ljjhm0ex3t1d
```

Cette commande fait le même travail que la précédente, mais signe en plus l'extension sur le store Mozilla. Elle génère un fichier .xpi signé dans le dossier `/artifacts`, qui peut ensuite être uploadé sur le store Mozilla.

Les paramètres `--api-key` et `--api-secret` renseignent les clés publiques et privées associées au compte qui publie l'extension (voir https://developer.mozilla.org/en-US/Add-ons/WebExtensions/web-ext_command_reference#web-ext_sign).
