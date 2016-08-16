# Fonctionnement et limites du prototype

## Interface non définitive

Comme vu dans le mail d'il y a qq semaines sur l'avancée de mon travail en solo sur l'extension, l'interface n'est pas une toolbar + un panel mais un panel unique. Après avoir utilisé l'extension à fond depuis quelques semaines on a d'autres idées en tête pour améliorer ça. Vous en aurez aussi. Le mieux est de discuter ça de vive voix.

## "Mono-onglet"

La limite majeure du prototype est qu'on ne gère pas l'utilisation de l'extension sur plusieurs onglets et fenêtres en même temps.
Si vous utilisez l'extension sur un onglet, que vous ouvrez un nouvel onglet et que vous ouvrez l'extension sur ce nouvel onglet, alors l'extension ne fonctionne plus du tout sur le 1er onglet. Si, sur le 1er onglet, vous (dés)activez des tests, alors c'est sur le 2ème onglet que les tests sont (dés)activés.

## Aucune sauvegarde de l'état entre rechargements de page

Si vous travaillez sur une page web, que vous la rechargez et que vous réouvrez l'extension sur cette page, votre travail est perdu : l'import en cours, vos tests actifs, l'état de votre "to-do list" pour savoir où vous en êtes dans vos tests… Rien n'est sauvegardé si ce n'est la version de référentiel choisie dans les options de l'extension.

Je pense que garder en mémoire ce qu'on fait pour une session (en gros, jusqu'à la fermeture du navigateur) est nécessaire.

## Contenu peu accessible dans certaines parties

L'interface n'était pas définitive, on ne s'est pas attardés à rendre accessible à 100% certains composants de l'extension. Vu le temps que ça peut prendre en fonction de la compléxité de l'UI, on s'est dit que c'était mieux de se focaliser sur autre chose le temps du prototype.

## Fonctionnement d'un import

Nous n'avons pas forcément suivi les specs à 100% concernant le fonctionnement avec un fichier d'import. Cela parce qu'après un point avec JP on s'est rendu compte qu'on parlait surtout de critères dans les specs alors qu'on a plutôt besoin des données sur les tests. Bref, on a décidé de ne pas forcément trop s'avancer sur ce point encore un peu flou. Actuellement, un import fonctionne comme ça dans l'extension :

* des exemples de fichiers d'import auxquels l'appli s'attend sont dans le dossier `fixtures/`. En gros, on s'attend à avoir, pour une version de référentiel, une liste de critères ayant chacun un résultat (c/nc/nt/na) et un identifiant de thématique, et une liste de tests pour chaque critère, là encore chacun avec un résultat (c/nc/nt/na).
* les fichiers d'exemple correspondent **à la version 4.2 du référentiel**, version fictive créée pour l'occasion.
* lors d'un import, si on détecte que tous les critères d'une thématique sont "na", la thématique est désactivée dans l'interface.
* lors d'un import, si on détecte un critère comme "na", on désactive tous ses tests dans l'interface
* lors d'un import, on affiche dans l'interface, sur chaque ligne de test qui a un résultat décrit dans l'import, un badge avec le résultat.

## *Scraping* des référentiels

On a développé un robot qui récupère les données de référentiel en allant sur les pages web nécessaires sur http://references.modernisation.gouv.fr. C'est grâce à ce robot que les fichiers de données des référentiels sont remplis (versions 3 et 3-2016). C'était le moyen le plus rapide pour nous d'avoir un référentiel rempli dans l'extension.

À voir si pour la suite on continue de faire comme ça pour récupérer les données de référentiels, ou si des données JSON/XML/autre "officielles" nous seront transmises. Si on continue sur le scraping, le système sera à améliorer car il n'est pas parfait.

## Tests non implémentés

Implémenter un test est relativement long et c'est pourquoi beaucoup ne sont pas intégrés dans le prototype. Dans l'interface, un test où aucune icone de loupe n'est affichée est un test que nous n'avons pas implémenté pour le prototype. **Seuls certains tests de la version 3 du référentiel ont été implémentés**.

## Tests non implémentés

Implémenter un test est relativement long et c'est pourquoi beaucoup ne sont pas intégrés dans le prototype. Dans l'interface, un test où aucune icone de loupe n'est affichée est un test que nous n'avons pas implémenté pour le prototype.

## Nom et icone de l'extension

Des idées pour une icône et un vrai nom pour l'extension ? Ce n'est plus vraiment une toolbar.

## Raccourcis claviers

L'API WebExtensions permet de définir une liste de raccourcis claviers "non dynamique". Dans un fichier de configuration, on décrit les combinaisons de touches à utiliser et on ne peut pas les changer derrière. Par contre, le navigateur lui-même peut proposer aux utilisateurs de redéfinir les raccourcis claviers d'une extension. Chrome le fait, **mais pas Firefox**. Imaginons une extension qui déclare un raccourci clavier "Ctrl+P". L'utilisateur de Chrome peut aller dans les paramètres de Chrome pour changer ce raccourci et mettre ce qu'il veut à la place. L'utilisateur de Firefox est obligé d'être heureux avec "Ctrl+P"... pour l'instant en tout cas. Je ne sais pas si Firefox a prévu d'implémenter la même chose que Chrome. Voir https://developer.chrome.com/extensions/commands#scope

Pour palier au problème de reconfiguration des raccourcis sur Firefox, on peut potentiellement créer notre propre système de raccourcis, paramétrable dans les options. Après de brefs tests, je pense que c'est possible, mais pas forcément une bonne idée par rapport au temps que ça prendrait. L'API WebExtensions nous mâche beaucoup le travail. Est-ce que devoir reconfigurer les raccourcis claviers est primordial ?
