# colorContrast

Affiche un outil d'analyse des contrastes.

## Exemples de configuration

```json
{
    "helper": "colorContrast",
    "left": {
        "label": "Couleur de texte",
        "pixelPicker": false,
        "textPicker": true
    },
    "right": {
        "label": "Couleur d'arrière-plan",
        "pixelPicker": true,
        "textPicker": false
    },
    "minimumRatio": 4.5,
    "extractor": {
        "label": "Extraire la couleur de texte et de fond depuis une sélection dans la page",
        "left": "color",
        "right": "backgroundColor"
    }
}
```

## Paramètres

* **left** : (object) - champ de couleur 1.
    - *label* (string) - libellé du champ.
    - *pixelPicker* (bool) - Afficher ou non l'extracteur de couleur de pixel.
    - *textPicker* (bool) - Afficher ou non l'extracteur de couleur de texte.
* **right** : (object) - champ de couleur 2.
    - Mêmes options que *left*
* **minimumRatio** (bool) - ratio de contraste minimum.
* **extractor** : (object) - Si renseigné, affiche un bouton d'extraction de styles depuis une sélection.
    - *label* (string) - libellé du bouton.
    - *left* (string) - propriété CSS depuis laquelle extraire la couleur 1 depuis une sélection.
    - *right* (string) - propriété CSS depuis laquelle extraire la couleur 2 depuis une sélection.
