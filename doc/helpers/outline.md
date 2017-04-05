# outline

Entoure un élément HTML dans la page.

## Exemples de configuration

```json
// exemple 1
{
    "helper": "outline",
    "selector": "img"
}

// exemple 2
{
    "helper": "outline",
    "selector": "img",
    "showTag": true
}
```

## Paramètres

* **selector** : un sélecteur CSS ciblant les éléments à entourer.
* **showTag** (bool) : affiche le nom des balises entourées. `false` par défaut.
