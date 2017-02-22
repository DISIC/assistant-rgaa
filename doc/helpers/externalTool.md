# externalTool

Ouvre la page courante dans un service externe.

## Exemples de configuration

```json
["externalTool", "Validateur W3C", "https://validator.w3.org/check?uri=:url"]
```

## Paramètres

* **Nom** : le nom du service qui sera affiché dans l'interface.
* **Url** : l'URL du service externe (dans cette chaîne, `:url` sera remplacé par l'URL de la page courante).
