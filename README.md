# RGAA Toolbar

## Development

After cloning the repo, run:

```
npm install
npm start
```

Then load the extension in [Firefox](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox) or [Chrome](https://developer.chrome.com/extensions/getstarted#unpacked).

## Architecture

The extension is based on [WebExtensions](https://developer.mozilla.org/en-US/Add-ons/WebExtensions).

A `manifest.json` exposes the app configuration.

The code is splitted into 3 parts:

* `/extension/background.js`: background script that listens to events from the toolbar and launches the panel.
* `/panel/*`: in-page panel containing the interface.
* `/content/*`: in-page scripts that applies or reverts helpers.

The content is based on two kinds of mappings:

* `references/*.json`: versions of the RGAA spec.
* `helpers/*.json`: mappings from tests to helpers.
