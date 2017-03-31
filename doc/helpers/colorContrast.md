# colorContrast

Affiche un outil d'analyse des contrastes.

## Exemples de configuration

```json
[
    "colorContrast",
    "Couleur du texte",
    "Couleur du fond",
    {
        "minimumRatio": 4.5,
        "extractor": {
            "label": "Extraire la couleur de texte et de fond depuis une sélection dans la page",
            "left": "color",
            "right": "backgroundColor"
        }
    }
]
```

## Paramètres

* **Couleur 1** : libellé du champ de couleur 1.
* **Couleur 2** : libellé du champ de couleur 2.
* **Options** :
    - *minimumRatio* (bool) - ratio de contraste minimum.
    - *extractor* : (object) - Si renseigné, affiche un bouton d'extraction de styles depuis une sélection.
        - *label* (string) - libellé du bouton.
        - *left* (string) - propriété CSS depuis laquelle extraire la couleur 1 depuis une sélection.
        - *right* (string) - propriété CSS depuis laquelle extraire la couleur 2 depuis une sélection.
