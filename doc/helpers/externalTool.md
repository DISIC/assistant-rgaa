# externalTool

Ouvre la page courante dans un service externe.

## Exemples de configuration

```json
{
    "helper": "externalTool",
    "name": "Validateur W3C",
    "url": "https://validator.w3.org/check?uri=:url"
}
```

## Paramètres

* **name** : le nom du service qui sera affiché dans l'interface.
* **url** : l'URL du service externe (dans cette chaîne, `:url` sera remplacé par l'URL de la page courante).
