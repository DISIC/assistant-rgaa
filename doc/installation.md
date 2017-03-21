## Installation de l'extension sur votre navigateur

Vous avez plusieurs façons différentes de faire pour installer l'extension

*Note : pour voir comment installer l'extension afin de contribuer à son développement, voir la doc [Installation (développement)](doc/installation-dev.md).*

### Installer depuis le Chrome Web Store

Sur Chrome, vous pouvez installer l'extension directement depuis le Chrome Web Store : https://chrome.google.com/webstore/detail/rgaa-toolbar/cgpmofepeeiaaljkcclfldhaalfpcand

### Installer depuis un un fichier zip ou xpi

* sur Chrome (version 52 et plus) :
    * Sur le projet Gitlab, allez dans *Repository > Tags* et téléchargez le fichier **zip** correspondant à la version souhaitée.
    * faites un drag&drop du fichier zip sur la page *chrome://extensions* : l'extension apparait (si y'a un message en rouge dans la description de l'extension, ce n'est pas grave)
    * S'il y a une erreur, essayez d'extraire le zip d'abord, puis de drag&drop le dossier extrait.
    * ouvrez un nouvel onglet pour pouvoir utiliser l'extension dessus
    * si au bout de quelques minutes, heures ou jours, Chrome désactive l'extension par sécurité, essayez d'installer l'extension via la méthode développeur](#installer-en-mode-d%C3%A9veloppeur)
* sur Firefox (version 52 et plus) :
    * Sur le projet Gitlab, allez dans *Repository > Tags* et téléchargez le fichier **xpi** correspondant à la version souhaitée. Si vous n'êtes pas sûr, prenez la version la plus récente.
    * faites un drag&drop du fichier sur n'importe quel onglet ouvert sur Firefox : une boîte de dialogue apparait, vous demandant si vous voulez installer l'extension.
    * redémarrez firefox et ouvrez un nouvel onglet pour pouvoir utiliser l'extension dessus

### Installer en mode développeur

* Sur le projet Gitlab, allez dans *Repository > Tags* et téléchargez le fichier **zip** correspondant à la version souhaitée. Si vous n'êtes pas sûr, prenez la version la plus récente.
* extrayez l'archive où bon vous semble sur votre machine
* sur Chrome (version 52 et plus) :
    * allez sur la page *chrome://extensions* et activez le "Mode développeur" (case en haut à droite)
    * cliquez sur le nouveau bouton "Charger l'extension non empaquetée..."
    * sélectionnez le dossier que vous venez d'extraire. Ce dossier contient les dossiers *bin*, *css*, *data*, *dist*, etc.
    * l'extension apparait !
    * ouvrez un nouvel onglet pour pouvoir utiliser l'extension dessus
* sur Firefox (version 52 et plus) :
    * allez sur la page *about:addons*, cliquez sur la roue en haut à droite, puis sur "Deboguer des modules"
    * sélectionnez le fichier *manifest.json* contenu dans le dossier que vous avez extrait
    * l'extension apparait !
    * ouvrez un nouvel onglet pour pouvoir utiliser l'extension dessus
    * :warning: l'extension n'est chargée que pour la session actuelle ; fermer le navigateur désinstallera l'extension
