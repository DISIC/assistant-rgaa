# showElement

Affiche un élément HTML dans la page.

## Exemples de configuration

```json
["showElement", "img"],
["showElement", "img", ["src", "alt"]],
["showElement", "img", ["src", "alt"], {
    "showEmpty": true,
    "showMissingAttributes": true,
    "showContent": true
}]
```

## Paramètres

* **Sélecteur** : un sélecteur CSS ciblant les éléments à afficher.
* **Attributs** : la liste des attributs à afficher.
* **Options** : 
    - *showEmpty* (bool) - afficher la balise même si elle est vide.
    - *showMissingAttributes* (bool) - afficher les attributs même si ils ne sont pas définis.
    - *showContent* (bool) - affiche le contenu de la balise.
