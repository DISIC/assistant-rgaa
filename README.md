# RGAA Toolbar

# RGAA Toolbar

:warning: projet en construction

Ce projet est une extension de navigateur (Firefox uniquement pour l'instant) destinée à aider à auditer des sites en suivant les règles d'accessibilité RGAA. Elle permet, pour chaque critère défini dans le référentiel RGAA, d'automatiser le plus possible les tests à effectuer pour valider le critère.

## Installation & Usage

Clonez le repo, puis :

```
npm install
npm start
```

Chargez ensuite l'extensions dans [Firefox](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox) ou [Chrome](https://developer.chrome.com/extensions/getstarted#unpacked).

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
