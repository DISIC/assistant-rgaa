---
title: Aide
---

Cet extension propose une liste complète des tests du référentiel RGAA.
Pour chacun de ces tests, l'extension permet d'appliquer des modifications à la page courante (modifications de style, ajout d'informations, outils), permettant d'effectuer plus simplement les tests.

# Interface

## Menu principal

![Vue à l'ouverture de la page](page://menu.png)

* *version du référentiel utilisée* : à l'heure actuelle, seule la version 3-2016 est supportée, mais l'extension est conçue pour en supporter plusieurs.
* *référentiel* : la page principale de l'extension, qui liste tous les tests du référentiel.
* icône *position* : grâce à ce menu, l'extension peut-être positionnée à différents endroits de la page, ou ouverte dans une fenêtre séparée.
* icône *options* : options globales de l'extension, permettant notamment de configurer la version du référentiel à utiliser.
* icône *aide* : vous y êtes !
* icône *minimiser* : cache l'extension. Si un test est actif, il n'est pas désactivé.
* icône *fermer* : cache l'extension. Si un test est actif, il est désactivé.

Quand vous cachez l'icône via le bouton *minimiser*, un bouton apparaît en haut à droite de la page pour ouvrir de nouveau l'extension :

![Extension minimisée](page://minimized.png)


## Navigation

![Vue à l'ouverture de la page](page://reference.png)

Comme dans le référentiel, les tests sont d'abord organisés par thèmes.
Ces thèmes sont visibles au premier niveau de la liste des tests, et accessibles par un menu global présent en début de page.

![Menu de navigation dans les thèmes](page://themes.png)

Sous chaque thème se trouve une liste de critères, qui peuvent être dépliés pour révéler la liste de tests qu'ils contiennent.

![Critère ouvert](page://criterion.png)

# Tests

Pour chaque test, une case à cocher permet d'appliquer les modifications associées dans la page. Une fois cochée, les modifications s'appliquent, et les instructions à suivre pour valider le test s'affichent. Pour plus de détail, une zone "description du test" liste les modifications exactes apportées à la page.

![Test actif](page://test.png)

Un petit drapeau permet de marquer chaque test comme déjà effectué.
Ce drapeau n'a pas d'effet direct dans l'extension, mais permet de se rappeler des tests déjà fait pour ne pas les refaire par erreur.

![Drapeau](page://flag.png)

# Outils

Lors de l'application de certains tests, différents outils peuvent être affichés dans l'interface.

## Analyseur de contraste

Cet outil permet de calculer le ratio de contraste entre 2 couleurs.

![Outil d'analyse de contraste](page://color-contrast.png)

Pour chaque couleur, il est possible d'éditer directement son code hexadécimal ou son nom (par exemple #fff, #bada55, green), ou de la sélectionner dans la page de deux manières diférentes :
* *sélecteur de pixel* : cliquez dessus, puis cliquez dans la page pour extraire ka couleur du pixel sous le curseur.
* *sélecteur de texte* : cliquez-dessus, puis sélectionnez une zone de texte dans la page pour extraire sa couleur.

Pour certains tests, vous trouverez également un bouton permettant d'extraire les deux couleurs d'un seul coup depuis une sélection de texte. Dans l'exemple ci-dessus, il extraiera la couleur de texte et d'arrière-plan.

## Validateur W3C

![Boutons Validateur W3C](page://w3c-validator.png)

Le bouton "Validateur W3C" sert à valider le code source d'un site en ligne via https://validator.w3.org.

Le bouton "Validateur W3C (HTML local)" sert à valider le code source d'un site non disponible en ligne (*http://localhost*, intranet, site protégé par .htaccess, etc.). *Note : valider le code source d'un fichier (`file://...` dans la barre d'adresse du navigateur) n'est pas supporté*.

## Validateur de liens

![Boutons Validateur de liens](page://link-checker.png)

Le bouton "Validateur de liens" sert à vérifier que les liens de la page courante sont fonctionnels via https://validator.w3.org/checklink.

## Hiérarchie de titres

![Hiérarchie de titres : erreur](page://titles-error.png)

Cet outil, utilisé dans le test 3-2016 n°9.1.2, affiche la hiérarchie de titres de la page. Chaque titre (balises `h1` à `h6`, ou élément avec attribut `aria-level`) est listé ici dans l'ordre d'apparition des éléments dans le DOM. Si une erreur dans la hiérarchie est détectée, les titres manquants et leur niveau sont affichés dans la liste.

## Voir les sources

![Voir les sources](page://view-sources.png)

Le bouton "Voir les sources" affiche le code source de la page dans un nouvel onglet.
