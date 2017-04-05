# showChildElements

Affiche les élément enfants d'un élément HTML dans la page.

## Exemple de configuration

```json
{
    "helper": "showChildElements",
    "selector": "svg",
    "childrenSelector": "desc",
    "attributes": [
        "role",
        "title",
        "aria-label"
    ],
    "showContent": true
}
```

## Paramètres

* **selector** : un sélecteur CSS ciblant l'élément parent, à coté duquel seront affichés les éléments enfants.
* **childrenSelector** : un sélecteur CSS, relatif au précédent, ciblant les éléments enfants à afficher. Dans l'exemple, c'est donc les `desc` présents dans les `svg` qui seront affichés.
* **attributs** : la liste des attributs à afficher.
* **showEmpty** (bool) : afficher la balise même si elle est vide. `false` par défaut.
* **showMissingAttributes** (bool) : afficher les attributs même si ils ne sont pas définis. `false` par défaut.
* **showContent** (bool) : affiche le contenu html de la balise. `false` par défaut.
