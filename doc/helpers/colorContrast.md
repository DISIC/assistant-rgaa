# colorContrast

Affiche un outil d'analyse des contrastes.

## Exemples de configuration

```json
{
    "helper": "colorContrast",
    "leftLabel": "Couleur du texte",
    "rightLabel": "Couleur du fond",
    "minimumRatio": 4.5,
    "extractor": {
        "label": "Extraire la couleur de texte et de fond depuis une sélection dans la page",
        "left": "color",
        "right": "backgroundColor"
    }
}
```

## Paramètres

* **leftLabel** : libellé du champ de couleur 1.
* **rightLabel** : libellé du champ de couleur 2.
* **minimumRatio** (bool) - ratio de contraste minimum.
* **extractor** : (object) - Si renseigné, affiche un bouton d'extraction de styles depuis une sélection.
    - *label* (string) - libellé du bouton.
    - *left* (string) - propriété CSS depuis laquelle extraire la couleur 1 depuis une sélection.
    - *right* (string) - propriété CSS depuis laquelle extraire la couleur 2 depuis une sélection.
