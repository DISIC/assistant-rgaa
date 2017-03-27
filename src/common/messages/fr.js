/**
 *
 */
const messages = {
	'Header.title': 'Panel d\'outils RGAA',
	'Header.options': 'Options',
	'Header.themes': 'Référentiel',
	'Header.import': 'Import',
	'Header.minimize': 'Minimiser le panneau',
	'Header.close': 'Fermer l\'extension',
	'ThemesList.title': 'Voir les thématiques',
	'Theme.themesMenu': 'Retourner au menu des thématiques',
	'Theme.criterion.select.label': 'Aller au critère : ',
	'Theme.criterion.select.emptyOption': 'Choisissez un critère',
	'Criterion.title': 'Critère {id}',
	'Criterion.activeTest': 'Test {id} activé',
	'Criterion.level': 'niveau {lvl}',
	'Criterion.done.label': 'Tous les tests du critère sont faits - Cliquer pour marquer les tests comme "à faire"',
	'Criterion.todo.label': 'Des tests restent à faire sur ce critère - Cliquer pour marquer les tests comme "fait"',
	'Criterion.toggle.show': 'Afficher les tests du critère {id}',
	'Criterion.toggle.hide': 'Cacher les tests du critère {id}',
	'Test.title': 'Test {id}',
	'Test.apply.check.title': 'Activer le test {id}',
	'Test.apply.uncheck.title': 'Désactiver le test {id}',
	'Test.apply.check.alt': 'Loupe',
	'Test.apply.uncheck.alt': 'Interdit',
	'Test.done': 'Test fait - Cliquer pour marquer le test comme "à faire"',
	'Test.todo': 'Test à faire - Cliquer pour marquer le test comme "fait"',
	'Test.instructions': 'Instructions',
	'TestHelpers.title': 'Description du test',
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
	'Import.submit': 'Importer',
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
	'ColorInput.invalidFormatError': 'Cette couleur est invalide. Veuillez utiliser un code hexadécimal (#f00, #a2a2a2, ...) ou un nom de couleur HTML (red, yellow, ...)',
	'ColorContrast.backgroundColor': 'Couleur du fond',
	'ColorContrast.color': 'Couleur du texte',
	'ColorContrast.switchColorsButtonTitle': 'Inverser les couleurs',
	'ColorContrast.textSize': 'Taille du texte',
	'ColorContrast.pickTextButton': 'Prélever les informations de couleur dans la page à partir d\'une sélection de texte',
	'ColorContrast.ratio': 'Ratio de contraste',
	'ColorContrast.invalidResult': 'invalide',
	'ExternalTool.linkTitle': 'Ouvrir l\'outil (s\'ouvre dans une nouvelle fenêtre)',
	'HeadingsHierarchy.title': 'Hiérarchie de titres',
	'HeadingsHierarchy.noItems': 'Aucun titre trouvé dans la page.',
	'Helper.addClassName': `
		Ajoute une classe <code>{className}</code>
		aux éléments <code>{selector}</code>
	`,
	'Helper.colorContrast': 'Affiche un outil d\'analyse des contrastes',
	'Helper.disableAllStyles': 'Désactive tous les styles de la page',
	'Helper.externalTool': `
		{hasName, select,
			true {Ouvre l'outil externe "{name}"}
			other {Ouvre un outil externe}
		}
	`,
	'Helper.headingsHierarchy': 'Affiche la hiérarchie de titres de la page',
	'Helper.outline': `Entoure les éléments <code>{selector}</code> {showTag, select,
		true {et affiche leur type}
		other {}
	}`,
	'Helper.showAttributes': `
		{attributeCount, plural,
			one {Affiche l'attribut <code>{attributes}</code>}
			other {Affiche les attributs <code>{attributes}</code>}
		}
		des éléments <code>{selector}</code>
		{showMissing, select,
			true {
				{attributeCount, plural,
					one {(y compris si n'est pas défini)}
					other {(y compris si ils ne sont pas définis)}
				}
			}
			other {}
		}
	`,
	'Helper.showChildElements': `
		Dans les éléments <code>{selector}</code>,
		pour chaque élément enfant <code>{childrenSelector}</code> :
		<ul>
			{showName, select,
				true {
					<li>Affiche le type {showMissingAttributes, select,
						true {(y compris si l'élément est vide)}
						other {}
					}</li>
				}
				other {}
			}
			{attributeCount, select,
				0 {}
				1 {
					<li>Affiche l'attribut <code>{attributes}</code> {showMissingAttributes, select,
						true {(y compris si il n'est pas défini)}
						other {}
					}</li>
				}
				other {
					<li>Affiche les attributs <code>{attributes}</code> {showMissingAttributes, select,
						true {(y compris si ils ne sont pas définis)}
						other {}
					}</li>
				}
			}
			{showContent, select,
				true {
					<li>Affiche le contenu</li>
				}
				other {}
			}
		</ul>
	`,
	'Helper.showElement': `
		Pour chaque élément <code>{selector}</code> :
		<ul>
			{showName, select,
				true {
					<li>Affiche le type {showMissingAttributes, select,
						true {(y compris si l'élément est vide)}
						other {}
					}</li>
				}
				other {}
			}
			{attributeCount, select,
				0 {}
				1 {
					<li>Affiche l'attribut <code>{attributes}</code> {showMissingAttributes, select,
						true {(y compris si il n'est pas défini)}
						other {}
					}</li>
				}
				other {
					<li>Affiche les attributs <code>{attributes}</code> {showMissingAttributes, select,
						true {(y compris si ils ne sont pas définis)}
						other {}
					}</li>
				}
			}
			{showContent, select,
				true {
					<li>Affiche le contenu</li>
				}
				other {}
			}
		</ul>
	`,
	'Helper.showTag': 'Affiche les éléments <code>{selector}</code>',
	'Helper.style': `
		{hasDescription, select,
			true {{description}}
			other {Ajoute des styles dans la page}
		}
	`,
	'Helper.validateLocalPage': 'Ouvre l\'outil externe "Validateur W3C pour HTML local"',
	'Helper.viewSource': 'Ouvre l\'outil "Voir les sources".'
};



export default messages;
