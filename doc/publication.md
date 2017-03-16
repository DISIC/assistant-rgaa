# Publier une nouvelle version de l'extension

## Prérequis: utiliser une version de dev de web-ext

Avant de pouvoir publier, il faut régler vos dépendances. La dépendance [web-ext](https://github.com/mozilla/web-ext), nécessaire pour construire l'extension, n'a actuellement pas de version stable avec un fix qu'il nous faut. Il faut donc que vous cloniez en local le projet, que vous l'installiez en suivant la doc et que vous le linkiez dans votre projet :

```
git clone https://github.com/mozilla/web-ext.git
# lancer les commandes en suivant la doc d'install https://github.com/mozilla/web-ext#installation-from-source
# faire un 'cd' vers le projet rgaa-toolbar
npm uninstall web-ext
npm link web-ext
```

## 1. Augmenter le n° de version

Avant de construire la build, n'oubliez pas de changer la version de l'appli dans le package.json et le manifest.json.

## 2. Taguer

N'oubliez pas de taguer, sur master, l'état de l'application avec le nouveau n° de version.

## 3. Construire la build

À la racine du projet, lancer

```
./bin/build [--api-key clé --api-secret secret]
```

Cette commande fait plusieurs choses :

* elle construit une branche locale *publication*
* elle ajoute en *staging* dans le dossier `/dist` les sources buildées : js, css, svg
* elle ajoute en *staging* dans le dossier `/artifacts` un fichier zip contenant l'extension . Ce fichier peut être uploadé sur le store Chrome pour publication. Il peut aussi être utilisé pour installer l'extension à la main en local, sur Chrome et Firefox.
* **si les clés d'API sont renseignées**, elle ajoute en *staging* dans le dossier `/artifacts` un fichier xpi contenant l'extension. Ce fichier peut être uploadé sur le store Firefox pour publication.

Les paramètres `--api-key` et `--api-secret` renseignent les clés publiques et privées associées au compte qui publie l'extension (voir https://developer.mozilla.org/en-US/Add-ons/WebExtensions/web-ext_command_reference#web-ext_sign). Demandez à Félix les clés pour l'instant !

**La commande ne commit et ne push rien, c'est à vous de le faire**. Quand vous vous dites que tout est OK, commitez les fichiers buildés sur votre branche publication locale, et remplacez celle distante par la votre :

```
git commit -m "new build"
git push -f origin publication
```

