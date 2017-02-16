/**
 *
 */
const messages = {
	'Header.title': 'Panel d\'outils RGAA',
	'Header.options': 'Options',
	'Header.themes': 'Référentiel',
	'Header.import': 'Import',
	'ThemesList.title': 'Thématiques',
	'Theme.themesMenu': 'Retourner au menu des thématiques',
	'Theme.disabled': `Cette thématique a été désactivée lors de l\'import
		car tous ses critères sont notés "non applicable".`,
	'Theme.criterion.disabled': `Ce critère et ses tests ont été désactivés lors de l\'import
		car ils sont notés "non applicable".`,
	'Theme.criterion.select.label': 'Aller au critère : ',
	'Theme.criterion.select.emptyOption': 'Choisissez un critère',
	'Criterion.done.label': 'Tous les tests du critère ont été passés',
	'Criterion.todo.label': 'Des tests restent à faire sur ce critère',
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
	'Import.file.label': 'Sélectionnez un fichier d\'import : ',
	'Import.success': 'Vérification du fichier… OK. Vous pouvez lancer l\'import.',
	'Import.failure': 'Votre fichier ne suit pas le format attendu. Veuillez corriger les erreurs :',
	'Import.submit': 'Lancer l\'import',
	'Import.reset': 'Réinitialiser l\'import',
	'Import.versionDifference': `&#9888; La version du référentiel RGAA utilisée par
		l\'extension (configurable dans les options) va être définie à la version {version}
		pour faire fonctionner l\'import.`,
	'ImportResult.c.title': 'Résultat conforme d\'après le fichier importé',
	'ImportResult.nc.title': 'Résultat non conforme d\'après le fichier importé',
	'ImportResult.na.title': 'Résultat non applicable d\'après le fichier importé',
	'ImportResult.nt.title': 'Résultat non testé d\'après le fichier importé',
	'Options.references.label': 'Version du référentiel RGAA à utiliser :',
	'ColorContrastWidget.backgroundColor': 'Couleur du fond',
	'ColorContrastWidget.textColor': 'Couleur du texte',
	'ColorContrastWidget.textSize': 'Taille du texte',
	'ColorContrastWidget.conformity': `Conformité {grade} : {conformity, select,
		true {conforme}
		false {non conforme}
	}`
};



export default messages;
