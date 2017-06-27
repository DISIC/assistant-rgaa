## Installation de l'extension sur votre navigateur

Vous pouvez installer l'extension de différentes façons.

*Note : pour voir comment installer l'extension afin de contribuer à son développement, voir la doc [Installation (développement)](/doc/installation-dev.md).*

### Installer depuis un un fichier zip ou xpi

* sur Chrome (version 52 et plus) :
    * Sur le projet GitHub, allez sur [la liste des versions](https://github.com/DISIC/assistant-rgaa/releases) et téléchargez le fichier `.zip` correspondant à la version souhaitée.
    * faites un glisser-déposer du fichier `.zip` sur la page [chrome://extensions](chrome://extensions) : l'extension doit apparaitre dans la liste (si un message en rouge apparaît dans la description de l'extension, ce n'est pas grave)
    * S'il y a une erreur, essayez d'extraire le fichier `.zip` d'abord, puis de glisser-déposer le dossier extrait.
    * ouvrez une nouvelle page web pour pouvoir utiliser l'extension dessus
    * si au bout de quelques minutes, heures ou jours, Chrome désactive l'extension par sécurité, essayez d'installer l'extension via la méthode développeur (voir ci-dessous)
* sur Firefox (version 52 et plus) :
    * Sur le projet GitHub, allez sur [la liste des versions](https://github.com/DISIC/assistant-rgaa/releases) et téléchargez le fichier `.xpi` correspondant à la version souhaitée. Si vous n'êtes pas sûr, prenez la version la plus récente.
    * faites un glisser-déposer du fichier sur n'importe quel onglet ouvert sur Firefox : une boîte de dialogue apparait, vous demandant si vous voulez installer l'extension.
    * redémarrez firefox et ouvrez une nouvelle page web pour pouvoir utiliser l'extension dessus

### Installer en mode développeur

* Sur le projet GitHub, allez sur [la liste des versions](https://github.com/DISIC/assistant-rgaa/releases) et téléchargez le fichier `.zip` correspondant à la version souhaitée. Si vous n'êtes pas sûr, prenez la version la plus récente.
* extrayez l'archive où bon vous semble sur votre machine
* sur Chrome (version 52 et plus) :
    * allez sur la page [chrome://extensions](chrome://extensions) et activez le "Mode développeur" (case en haut à droite)
    * cliquez sur le nouveau bouton "Charger l'extension non empaquetée..."
    * sélectionnez le dossier que vous venez d'extraire. Ce dossier contient les dossiers `bin/`, `css/`, `data/`, `dist/`, etc.
    * l'extension apparait !
    * ouvrez une nouvelle page web pour pouvoir utiliser l'extension dessus
* sur Firefox (version 52 et plus) :
    * allez sur la page [about:addons](about:addons), cliquez sur la roue en haut à droite, puis sur "Deboguer des modules"
    * sélectionnez le fichier `manifest.json` contenu dans le dossier que vous avez extrait
    * l'extension apparait !
    * ouvrez une nouvelle page web pour pouvoir utiliser l'extension dessus
    * :warning: l'extension n'est chargée que pour la session actuelle; fermer le navigateur désinstallera l'extension
