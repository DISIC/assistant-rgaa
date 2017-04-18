import $ from 'jquery';
import {muteAttribute, restoreAttribute, restoreAllAttributes} from './muteAttributes';



/**
 *
 */
describe('muteAttributes', function() {
	describe('muteAttribute', function() {
		it('should restore an attribute', function() {
			const element = $('<div><p style="width: 100px">test</p></div>');
			const p = element.find('p');

			muteAttribute('style', element);

			expect(p.attr('style')).to.be.undefined;
			expect(p.attr('data-rgaa-ext-muted')).to.be.equal('style');
			expect(p.attr('data-rgaa-ext-muted-style')).to.equal('width: 100px');
		});
	});

	describe('restoreAttribute', function() {
		it('should restore an attribute', function() {
			const element = $('<div><p style="width: 100px">test</p></div>');
			const p = element.find('p');

			muteAttribute('style', element);
			restoreAttribute('style', element);

			expect(p.attr('style')).to.equal('width: 100px');
			expect(p.attr('data-rgaa-ext-muted')).to.be.undefined;
			expect(p.attr('data-rgaa-ext-muted-style')).to.be.undefined;
		});
	});

	describe('restoreAllAttributes', function() {
		it('should restore all muted attributes', function() {
			const element = $('<div><p lang="en" style="width: 100px">test</p></div>');
			const p = element.find('p');

			muteAttribute('lang', element);
			muteAttribute('style', element);
			restoreAllAttributes(element);

			expect(p.attr('lang')).to.equal('en');
			expect(p.attr('style')).to.equal('width: 100px');
			expect(p.attr('data-rgaa-ext-muted')).to.be.undefined;
			expect(p.attr('data-rgaa-ext-muted-style')).to.be.undefined;
		});
	});
});
