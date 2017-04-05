# showElement

Affiche un élément HTML dans la page.

## Exemple de configuration

```json
{
    "helper": "showElement",
    "selector": "canvas",
    "attributes": [
        "title",
        "aria-label",
        "aria-labelledby"
    ],
    "showContent": true
}
```

## Paramètres

* **selector** : un sélecteur CSS ciblant les éléments à afficher.
* **attributes** : la liste des attributs à afficher.
* **showEmpty** (bool) : afficher la balise même si elle est vide. `false` par défaut.
* **showMissingAttributes** (bool) : afficher les attributs même si ils ne sont pas définis. `false` par défaut.
* **showContent** (bool) : affiche le contenu de la balise. `false` par défaut.
