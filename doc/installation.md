## Installation de l'extension sur votre navigateur

Pour installer et utiliser l'extension, il y a actuellement deux façons de faire. À l'avenir, l'extension sera disponible dans les catalogues d'extension de Chrome et Firefox.

*Note : pour voir comment installer l'extension afin de contribuer à son développement, voir la doc [Installation (développement)](doc/installation-dev.md).*

### Installer directement un fichier zip

* téléchargez le fichier de l'extension (*rgaa_toolbar-version.zip*) présent dans le dossier *dist* de la branche *publication* https://git.vtech.fr/sgmap/rgaa-toolbar/tree/publication/dist
* sur Chrome (version 52 et plus) :
    * faites un drag&drop du fichier sur la page *chrome://extensions* : l'extension apparait
    * ouvrez un nouvel onglet pour pouvoir utiliser l'extension dessus
    * si au bout de quelques minutes, heures ou jours, Chrome désactive l'extension par sécurité, je sais pas trop ce que vous pouvez faire à part passer par la [méthode développeur](#installer-en-mode-d%C3%A9veloppeur)
* sur Firefox : il semble y avoir des bugs avec Firefox Dev en ce moment, il faut donc installer l'extension en mode développeur sur Firefox le temps de tester

### Installer en mode développeur

* téléchargez le zip de la branche *publication* entière https://git.vtech.fr/sgmap/rgaa-toolbar/repository/archive.zip?ref=publication
* extrayez l'archive où bon vous semble sur votre machine
* sur Chrome (version 52 et plus) :
    * allez sur la page *chrome://extensions* et activez le "Mode développeur" (case en haut à droite)
    * cliquez sur le nouveau bouton "Charger l'extension non empaquetée..."
    * sélectionnez le dossier que vous venez d'extraire. Ce dossier contient les dossiers *bin*, *css*, *data*, *dist*, etc.
    * l'extension apparait !
    * ouvrez un nouvel onglet pour pouvoir utiliser l'extension dessus
* sur Firefox (version 48 et plus, pas Developer Edition) :
    * allez sur la page *about:addons*, cliquez sur la roue en haut à droite, puis sur "Deboguer des modules"
    * sélectionnez le fichier *manifest.json* contenu dans le dossier que vous avez extrait
    * l'extension apparait !
    * ouvrez un nouvel onglet pour pouvoir utiliser l'extension dessus
    * :warning: l'extension n'est chargée que pour la session actuelle ; fermer le navigateur désinstallera l'extension
