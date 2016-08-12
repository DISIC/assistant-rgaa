# Architecture du code

L'extension se base sur le projet [WebExtensions](https://developer.mozilla.org/en-US/Add-ons/WebExtensions).

Le `manifest.json` décrit la configuration de l'appli et permet d'avoir une vue globale sur quelle partie du code est chargée où.

## Contenu de chaque dossier

* `/bin` : utilitaires en ligne de commande. Contient entre autre de quoi récupérer les référentiels et instructions sur les sites du RGAA et de quoi créer une build.
* `/css` : le CSS de toutes les parties de l'extension, découpée en sous-dossiers similaires à ceux dans `src`.
* `/data` : les données de référentiels utilisées dans l'appli, les fichiers de mapping pour les *helpers*, le schéma à suivre pour un import.
* `/fixtures` : des données de test pour aider lors des développements (fichiers d'import, page web où beaucoup de tests peuvent être appliqués).
* `/img`: les images utilisées dans toute l'extension.
* `/src`: le JS utilisé dans toutes les parties de l'extension.

## Différentes parties du code

Le code en lui-même (dans `src` et `css`) est séparé en plusieurs parties.

### Structure d'une partie

Avant de décrire chaque partie (*background*, *common*, etc.), on peut s'attarder sur la structure qu'une partie du code peut avoir. En général, une partie suit la structure de https://github.com/v-technologies/generator-react-boilerplate-vtech :

* `/actions` : actions [redux](http://redux.js.org/)
* `/api` : code d'"api". En général, le code qui manipule des éléments en dehors de toute la stack react/redux se retrouve ici
* `/components` : composants [React](https://facebook.github.io/react/)
* `/messages` : fichiers de traduction i18n utilisées par [React Intl](https://github.com/yahoo/react-intl)
* `/reducers` : les reducers [redux](http://redux.js.org/) à utiliser
* `/sagas` : les [sagas redux](http://yelouafi.github.io/redux-saga/) à utiliser.
* `/selectors` : les fonctions permettant de récupérer facilement des données du *state* [redux](http://redux.js.org/)

### partie `/background`

C'est le code correspondant au *background script* de l'extension. Ici, on :

* écoute les interactions utilisateur avec le navigateur : clic sur bouton d'extensions, fermeture d'onglet, etc.
* initialise le *store*  utilisé dans toute l'appli. Le store est synchronisé avec les autres parties du code (voir détails plus bas).
* initialise la plupart des *sagas* utilisées dans l'appli.
* ouvre une fenêtre de devtools (décrit dans `/devtools`) quand on est en développement

Un fichier de build `dist/background.js` est généré avec ce code.

### partie `/common`

C'est la plus grosse partie du code. Ici, on a notamment :

* 90% de ce qui est lié au *store* : actions, reducers, sagas, selectors. On le fait ici car les 3/4 des données sont utilisées à la fois dans le *background*, le *panel*, etc.
* les fichiers de traduction pour l'i18n
* de quoi intialiser un store depuis un état sauvegardé dans le chrome storage et synchroniser des stores (voir détails plus bas).

Aucun fichier de build n'est généré avec ce code : c'est dans chaque partie différente du code qu'on utilise les choses dont on a besoin venant du dossier *common*.

### partie `/container`

Ce code correspond à un *content-script* de l'extension. Il est injecté dans chaque page que vous chargez. Dans cette partie :

* on génère (ou détruit) l'`iframe` contenant le *panel* et les quelques `div` l'entourant.
* on s'occupe d'afficher la modal d'import
* on créé un store synchronisé (voir détails plus bas)

:warning: le CSS étant directement injecté sur la page, toutes les règles sont préfixées par `rgaaExt-` et sont déclarées en `!important`.

Des fichier de build `dist/container.{js,css}` sont générés avec ce code. Les deux sont injectés dans la page courante.

### partie `/helpers`

Ce code correspond à un *content-script* de l'extension. Il est injecté dans chaque page que vous chargez.

Un *helper* permet d'appliquer, entre autre, des changements de styles sur la page en cours. Dans cette partie :

* on décrit chaque helper nécessaire aux tests
* via des sagas redux qui écoutent les interactions utilisateur du panel, on applique/enlève sur la page courante les styles correspondant aux tests RGAA. Vous l'aurez compris, pour appliquer ou enlever les styles, on appelle les helpers nécessaires. Les helpers à utiliser sont déduits grâce aux fichiers de mapping présent dans `data` et la référence actuelle choisie dans les options.
* on créé un store synchronisé (voir détails plus bas)

:warning: le CSS étant directement injecté sur la page, toutes les règles sont préfixées par `rgaaExt-` et sont déclarées en `!important`.

Des fichier de build `dist/helpers.{js,css}` sont générés avec ce code. Les deux sont injectés dans la page courante.

### partie `options`

Ce code correspond à la page d'options de l'extension. Ici :

* on utilise directement le store du *background* (voir détails plus bas).
* on sauvegarde les options dans le *storage local* de l'extension quand l'utilisateur change une option

Des fichier de build `dist/options.{js,css}` sont générés avec ce code. Ils sont utilisés dans `/options/content.html` qui est indiqué comme la page d'options dans le `manifest.json` de l'extension.

### partie `panel`

Ce code correspond au panneau latéral affiché ou caché quand on clique sur le bouton de l'extension.

Il est utilisé dans une `iframe` générée dans le *content-script* `container`. Le tout étant dans une iframe, le CSS n'a pas besoin d'être préfixé et déclaré brutalement.

* le store est créé depuis un état sauvegardé auparavant (voir détais plus bas)
* certaines sagas écoutent les interactions utilisateur

## Gestion de l'état via différents stores

Les *background script*, *content script*, *option pages* étant tous des éléments bien distincts dans une extension, on ne peut pas avoir un unique *store* que tout le monde utilisera. Cependant, on souhaite que chaque partie de l'extension soit au courant de tout. Voilà comment tout fonctionne :

* chaque partie du code possède son propre store.
* chaque store utilise le même set de reducers : autrement dit, chaque store utilise tous les reducers de l'extension.
* chaque store est créé avec des middleware de synchronisation pour qu'à tout moment, dans tous les stores, on ai les mêmes données. Quand une action est déclenchée dans un des stores, les middleware déclenchent la même action dans les autres stores, avec les mêmes données (grâce aux api de messages des webextensions). Ceci est fait afin que lors des développements, on puisse travailler comme s'il n'y avait qu'un unique store pour toute l'appli.
* dans le *background script*, le store créé est "persistant". Chaque modification sur l'état est sauvegardé dans le *storage local* de l'extension.
* dans le *panel*, le store créé récupère les données "persistées" venant du store du *background script*. Ceci est fait car, contrairement à toutes les autres parties de l'appli, le panel peut être généré *après* le "démarrage" de l'extension. Si on ouvre le panel dans une popup après l'avoir utilisé 5 minutes, il faut que le panel se souvienne de son état précédent quand il passe dans une nouvelle fenêtre. Il récupère donc un état sauvegardé.
* la page d'options utilise directement le store du *background script*. Contrairement aux *content script*, la page d'options à accès à l'api webextensions `getBackgroundPage` et peut donc éviter d'avoir un store à synchroniser.
