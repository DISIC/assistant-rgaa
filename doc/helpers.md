# Helpers

Les helpers sont utilisés pour appliquer des modifications à la page en cours d'audit.

Chaque helper est un module exportant deux fonctions, `apply()` et `revert()`. permettant respectivement d'appliquer et d'annuler une modification.

Chacune de ces fonctions doit accepter en premier paramètre un identifiant unique pouvant être utilisé pour identifier des éléments créés dans le DOM afin de les retrouver par la suite.

```js
export const apply = (id) => // ...
```

Les fonctions `apply()` et `revert()` peuvent ensuite définir un certain nombre de paramètres obligatoires, ainsi qu'un tableau d'options.

```js
export const apply = (id) => // aucun paramètre
export const apply = (id, arg1, arg2) => // n paramètres
export const apply = (id, arg1, arg2, options = {}) => // n paramètres + options
export const apply = (id, options = {}) => // options
```

Les configuration des helpers à appliquer suivant les tests RGAA sont définies dans les fichiers `/data/helpers/*.json`. Chaque fichier correspond à une version de référentiel et est nommé en fonction.

Ces fichiers définissent une liste de helpers pour chaque test, sous cette forme :

```json
{
    // identifiant du test
    "1.1.1" : {
        // helper sans argument
        "helper1",
        // helper avec deux arguments
        ["helper3", "arg1", "arg2"],
        // helper avec un argument et des options
        ["helper3", "arg1", {
            "option1": "...",
            "option2": "..."
        }],
    }
}
```
