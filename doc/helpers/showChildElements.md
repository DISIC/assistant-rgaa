# showChildElements

Affiche les élément enfants d'un élément HTML dans la page.

## Exemples de configuration

```json
["showChildElements", "select", "option"],
["showChildElements", "select", "option", ["value"]],
["showChildElements", "select", "option", ["value"], {
    "showEmpty": true,
    "showMissingAttributes": true,
    "showContent": true
}]
```

## Paramètres

* **Sélecteur** : un sélecteur CSS ciblant l'élément parent, à coté duquel seront affichés les éléments enfants.
* **Sélecteur enfant** : un sélecteur CSS, relatif au précédent, ciblant les éléments enfants à afficher.
* **Attributs** : la liste des attributs à afficher.
* **Options** : 
    - *showEmpty* (bool) - afficher la balise même si elle est vide.
    - *showMissingAttributes* (bool) - afficher les attributs même si ils ne sont pas définis.
    - *showContent* (bool) - affiche le contenu de la balise.
