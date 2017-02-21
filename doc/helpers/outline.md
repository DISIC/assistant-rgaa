# outline

Entoure un élément HTML dans la page.

## Exemples de configuration

```json
["outline", "img"],
["outline", "img", {
    "showTag": true
}]
```

## Paramètres

* **Sélecteur** : un sélecteur CSS ciblant les éléments à afficher.
* **Attributs** : la liste des attributs à afficher.
* **Options** : 
    - *showMissing* (bool) - afficher les attributs même si ils ne sont pas définis.
