# showAttributes

Affiche les attributs d'un élément HTML dans la page.

## Exemples de configuration

```json
// exemple 1
{
    "helper": "showAttributes",
    "selector": "object, embed",
    "attributes": [
        "title"
    ]
}

// exemple 2
{
    "helper": "showAttributes",
    "selector": "object, embed",
    "attributes": [
        "title"
    ],
    "showMissing": true
}
```

## Paramètres

* **selector** : un sélecteur CSS ciblant les éléments dont il faut afficher les attributs.
* **attributs** (array) : la liste des attributs à afficher.
* **showMissing** (bool) : afficher les attributs même si ils ne sont pas définis (affichés barrés). `false` par défaut.
