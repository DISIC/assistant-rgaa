# Publier une nouvelle version de l'extension

À la racine du projet, lancer

```
./bin/build
```

Et paf, la branche *publication* est à jour afin de pouvoir [installer](doc/installation.md) l'extension.

# Publication sur les stores

## Utiliser une version de dev de web-ext

La dépendance [web-ext](https://github.com/mozilla/web-ext), nécessaire pour construire l'extension, n'a actuellement pas de version stable avec un fix qu'il nous faut. Il faut donc que vous cloniez en local le projet, que vous l'installiez en suivant la doc et que vous le linkiez dans votre projet :

```
git clone https://github.com/mozilla/web-ext.git
# lancer les commandes en suivant la doc d'install https://github.com/mozilla/web-ext#installation-from-source
# faire un 'cd' vers le projet rgaa-toolbar
npm uninstall web-ext
npm link web-ext
```

## Publication

Lancer d'abord :

```sh
npm run build-extension
```

Cette commande builde les sources et génère un fichier .zip contenant l'extension dans le dossier `/artifacts`. Ce fichier peut ensuite être uploadé sur le store Chrome pour publication.

Lancer ensuite une commande comme celle-ci, avec les api-key et api-secret changées avec les bonnes :

```sh
npm run sign-extension -- --api-key user:12345678:123 --api-secret lcygkmao0lk1aj8qqq6ypp2830im8kn2on3i4r4537t11cde9h0o7ljjhm0ex3t1d
```

Cette commande fait le même travail que la précédente, mais signe en plus l'extension sur le store Mozilla. Elle génère un fichier .xpi signé dans le dossier `/artifacts`, qui peut ensuite être uploadé sur le store Mozilla.

Les paramètres `--api-key` et `--api-secret` renseignent les clés publiques et privées associées au compte qui publie l'extension (voir https://developer.mozilla.org/en-US/Add-ons/WebExtensions/web-ext_command_reference#web-ext_sign).
