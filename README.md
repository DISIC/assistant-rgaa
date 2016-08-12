# RGAA Toolbar

Ce projet est une extension de navigateur (Firefox et Chrome) destinée à aider à auditer des sites en suivant les règles d'accessibilité RGAA. Elle permet, pour chaque critère défini dans le référentiel RGAA, d'automatiser le plus possible les tests à effectuer pour valider le critère.

## Auditeur : installation

### Méthode facile

* téléchargez le fichier de l'extension (*rgaa_toolbar-version.zip*) présent dans le dossier *dist* de la branche *publication* https://git.vtech.fr/sgmap/rgaa-toolbar/tree/publication/dist
* sur Chrome :
    * faites un drag&drop du fichier sur la page *chrome://extensions* : l'extension apparait
    * ouvrez un nouvel onglet pour pouvoir utiliser l'extension dessus
    * si au bout de quelques minutes, heures ou jours, Chrome désactive l'extension par sécurité, je sais pas trop ce que vous pouvez faire à part passer par la [méthode pas facile](#m%C3%A9thode-pas-facile)
* sur Firefox :
    * allez sur la page *about:config* et mettez l'option `xpinstall.signatures.required` à `false`
    * allez sur la page *about:addons*, cliquez sur la roue en haut à droite, puis sur "Installer depuis un fichier" et sélectionnez le zip
    * Firefox vous demande de confirmer que vous voulez vraiment installer une application non sécurisée : DITES OUI
    * si ça marche pas, passez par la méthode [méthode pas facile](#m%C3%A9thode-pas-facile)

### Méthode pas facile

* téléchargez le zip de la branche *publication* entière https://git.vtech.fr/sgmap/rgaa-toolbar/repository/archive.zip?ref=publication
* extrayez l'archive où bon vous semble sur votre machine
* sur Chrome :
    * allez sur la page *chrome://extensions* et activez le "Mode développeur" (case en haut à droite)
    * cliquez sur le nouveau bouton "Charger l'extension non empaquetée..."
    * sélectionnez le dossier que vous venez d'extraire. Ce dossier contient les dossiers *bin*, *css*, *data*, *dist*, etc.
    * l'extension apparait !
    * ouvrez un nouvel onglet pour pouvoir utiliser l'extension dessus
* sur Firefox :
    * allez sur la page *about:addons*, cliquez sur la roue en haut à droite, puis sur "Deboguer des modules"
    * sélectionnez le fichier *manifest.json* contenu dans le dossier que vous avez extrait
    * l'extension apparait !
    * ouvrez un nouvel onglet pour pouvoir utiliser l'extension dessus
    * :warning: l'extension n'est chargée que pour la session actuelle ; fermer le navigateur désinstallera l'extension

## Développeur : installation

Clonez le repo, puis :

```
npm install
npm start
```

Chargez ensuite l'extension via la [méthode pas facile](#m%C3%A9thode-pas-facile) décrite plus haut, ou en suivant directement les docs officielles : dans [Firefox](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox) ou [Chrome](https://developer.chrome.com/extensions/getstarted#unpacked).

## Architecture

L'extension se base sur le projet [WebExtensions](https://developer.mozilla.org/en-US/Add-ons/WebExtensions).

Le `manifest.json` décrit la configuration de l'appli.

Le code est découpé en 3 parties :

* `/extension/background.js`: script en tâche de fond qui écoute les évènements de la barre d'outils (sur Chrome, c'est la où il y a l'icone de l'extension en haut à droite du navigateur). C'est lui qui lance le "panel".
* `/panel/*`: le panel, inclus dans la page courante, contient l'interface.
* `/content/*`: les scripts, inclus dans la page, qui activent/désactivent les "helpers".

Les helpers sont des scripts permettant de modifier le CSS de la page courante pour aider l'auditeur. Exemple : encadrer en rouge les img sans alt, désactiver les styles.

Il y a deux sortes de mapping importants :

* `references/*.json`: les versions de la spec RGAA.
* `helpers/*.json`: lien entre les tests RGAA et les "helpers" à utiliser.
