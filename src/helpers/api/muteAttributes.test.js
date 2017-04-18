import $ from 'jquery';
import {muteAttribute, restoreAttribute, restoreAllAttributes} from './muteAttributes';



/**
 *
 */
describe('muteAttributes', function() {
	describe('muteAttribute', function() {
		it('should restore an attribute', function() {
			const p = $('<p style="width: 100px">test</p>');

			muteAttribute(p, 'style');

			expect(p.attr('style')).to.be.undefined;
			expect(p.attr('data-rgaa-ext-muted')).to.be.equal('style');
			expect(p.attr('data-rgaa-ext-muted-style')).to.equal('width: 100px');
		});
	});

	describe('restoreAttribute', function() {
		it('should restore an attribute', function() {
			const p = $('<p style="width: 100px">test</p>');

			muteAttribute(p, 'style');
			restoreAttribute(p, 'style');

			expect(p.attr('style')).to.equal('width: 100px');
			expect(p.attr('data-rgaa-ext-muted')).to.be.undefined;
			expect(p.attr('data-rgaa-ext-muted-style')).to.be.undefined;
		});
	});

	describe('restoreAllAttributes', function() {
		it('should restore all muted attributes', function() {
			const p = $('<p lang="en" style="width: 100px">test</p>');

			muteAttribute(p, 'lang');
			muteAttribute(p, 'style');
			restoreAllAttributes(p);

			expect(p.attr('lang')).to.equal('en');
			expect(p.attr('style')).to.equal('width: 100px');
			expect(p.attr('data-rgaa-ext-muted')).to.be.undefined;
			expect(p.attr('data-rgaa-ext-muted-lang')).to.be.undefined;
			expect(p.attr('data-rgaa-ext-muted-style')).to.be.undefined;
		});
	});
});
