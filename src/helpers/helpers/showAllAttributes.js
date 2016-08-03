import $ from 'jquery';
import {toArray} from 'lodash';



/**
 *
 */
const createTable = (id) =>
	$(`
		<table class="${id} rgaa-Helper rgaa-ShowAllAttributesHelper">
			<thead>
				<tr>
					<th>Attribut</th>
					<th>Valeur</th>
				</tr>
			</thead>
		</table>
	`);

/**
 *
 */
const createRow = ({name, value}) =>
	$(`
		<tr>
			<td>${name}</td>
			<td>${value}</td>
		</tr>
	`);



/**
 *
 */
export const apply = (id, selector) => {
	$(selector).each((i, element) => {
		if (!element.hasAttributes()) {
			return;
		}

		const attributes = toArray(element.attributes);
		const table = createTable(id);
		const body = $('<tbody />').appendTo(table);

		attributes.forEach((attribute) =>
			body.append(createRow(attribute))
		);

		$(element).after(table);
	});
};

/**
 *
 */
export const revert = (id) =>
	$(`.${id}`).remove();
