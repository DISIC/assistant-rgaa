/**
 *
 */
const messages = {
	'Header.title': 'Panel d\'outils RGAA',
	'Header.options': 'Options',
	'Header.themes': 'Référentiel',
	'Header.import': 'Import',
	'ThemesList.title': 'Voir les thématiques',
	'Theme.themesMenu': 'Retourner au menu des thématiques',
	'Theme.criterion.select.label': 'Aller au critère : ',
	'Theme.criterion.select.emptyOption': 'Choisissez un critère',
	'Criterion.done.label': 'Tous les tests du critère sont faits - Cliquer pour marquer les tests comme "à faire"',
	'Criterion.todo.label': 'Des tests restent à faire sur ce critère - Cliquer pour marquer les tests comme "fait"',
	'Test.apply.check.title': 'Appliquer les CSS et JS liés au test',
	'Test.apply.uncheck.title': 'Enlever les CSS et JS liés au test',
	'Test.apply.check.alt': 'Loupe',
	'Test.apply.uncheck.alt': 'Interdit',
	'Test.done': 'Test fait - Cliquer pour marquer le test comme "à faire"',
	'Test.todo': 'Test à faire - Cliquer pour marquer le test comme "fait"',
	'Test.instructions': 'Instructions',
	'TestHelpers.intro': 'Ce test...',
	'DockMenu.button': 'Dock',
	'DockMenu.bottom': 'En bas',
	'DockMenu.left': 'À gauche',
	'DockMenu.right': 'À droite',
	'DockMenu.popup': 'Popup',
	'Import.title': 'Import d\'un fichier d\'audit',
	'Import.delimiter.label': 'Caractère délimitant les colonnes',
	'Import.quoteChar.label': 'Caractère délimitant les chaînes de caractères',
	'Import.file.label': 'Sélectionnez un fichier d\'import : ',
	'Import.success': 'Vérification du fichier… OK. Vous pouvez lancer l\'import.',
	'Import.failure': 'Votre fichier ne suit pas le format attendu. Veuillez corriger les erreurs :',
	'Import.submit': 'Lancer l\'import',
	'Import.reset': 'Réinitialiser',
	'Import.singleReset': 'Réinitialiser les données d\'import actuelles',
	'Import.versionDifference': `&#9888; La version du référentiel RGAA utilisée par
		l'extension (configurable dans les options) va être définie à la version {version}
		pour faire fonctionner l'import.`,
	'ImportResults.c.title': `
		{count, plural,
			one {# test conforme d'après le fichier importé}
			other {# tests conformes d'après le fichier importé}
		}
	`,
	'ImportResults.nc.title': `
		{count, plural,
			one {# test non conforme d'après le fichier importé}
			other {# tests non conformes d'après le fichier importé}
		}
	`,
	'ImportResults.na.title': `
		{count, plural,
			one {# test non applicable d'après le fichier importé}
			other {# tests non applicables d'après le fichier importé}
		}
	`,
	'ImportResults.nt.title': `
		{count, plural,
			one {# test non testé d'après le fichier importé}
			other {# tests non testés d'après le fichier importé}
		}
	`,
	'ImportResult.c.title': 'Résultat conforme d\'après le fichier importé',
	'ImportResult.nc.title': 'Résultat non conforme d\'après le fichier importé',
	'ImportResult.na.title': 'Résultat non applicable d\'après le fichier importé',
	'ImportResult.nt.title': 'Résultat non testé d\'après le fichier importé',
	'Options.references.label': 'Version du référentiel RGAA à utiliser :',
	'Options.references.submit': 'Valider',
	'Options.references.successMessage': 'Version mise à jour',
	'ColorInput.pickButtonTitle': 'Prélever une couleur dans la page',
	'ColorContrast.backgroundColor': 'Couleur du fond',
	'ColorContrast.color': 'Couleur du texte',
	'ColorContrast.switchColorsButtonTitle': 'Inverser les couleurs',
	'ColorContrast.textSize': 'Taille du texte',
	'ColorContrast.pickTextButton': 'Prélever les informations de couleur dans la page à partir d\'une sélection de texte',
	'ColorContrast.ratio': 'Ratio de contraste',
	'ExternalTool.linkTitle': 'Ouvrir l\'outil (s\'ouvre dans une nouvelle fenêtre)',
	'HeadingsHierarchy.title': 'Hiérarchie de titres',
	'HeadingsHierarchy.noItems': 'Aucun titre trouvé dans la page.'
};



export default messages;
