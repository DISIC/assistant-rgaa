# Helpers

Les helpers sont utilisés pour appliquer des modifications à la page en cours d'audit.

Chaque helper est un module exportant deux fonctions, `apply()` et `revert()`. permettant respectivement d'appliquer et d'annuler une modification.

Chacune de ces fonctions doit accepter en premier paramètre un identifiant unique pouvant être utilisé pour identifier des éléments créés dans le DOM afin de les retrouver par la suite.

```js
export const apply = (id) =>  {/*... */}
```

Les fonctions `apply()` et `revert()` peuvent ensuite définir un certain nombre d'options, requises ou non (voir détails de chaque helper).

```js
export const apply = (id) => {} /* aucune option */
export const apply = (id, options) => {} /* n options */
```

Les configuration des helpers à appliquer suivant les tests RGAA sont définies dans les fichiers `/data/helpers/*.json`. Chaque fichier correspond à une version de référentiel et est nommé en fonction.

Ces fichiers définissent une liste de helpers pour chaque test, sous cette forme :

```json
{
    // identifiant du test
    "1.1.1" : [
        {
            // nom d'un helper à utiliser avec plusieurs options
            "helper": "something",
            "option1": "valeur",
            "option2": "valeur"
        },
        {
            // deuxième helper à utiliser sur le même test
            "helper": "something2",
            "option1": "valeur"
        },
        {
            // troisième helper à utiliser sur le même test, sans option
            "helper": "something3"
        }
    ]
}
```
