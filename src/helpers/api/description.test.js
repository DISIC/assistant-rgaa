import {cond, join, list} from './description';



/**
 *
 */
describe('description', function() {

	/**
	 *
	 */
	describe('cond', function() {
		it('should return the proper string depending on a condition', function() {
			expect(cond(true, 'a', 'b')).to.equal('a');
			expect(cond(false, 'a', 'b')).to.equal('b');
		});
	});

	/**
	 *
	 */
	describe('join', function() {
		it('should join strings in natural language', function() {
			expect(join(['a', 'b'], ', ', ' and ')).to.equal('a and b');
			expect(join(['a', 'b', 'c'], ', ', ' and ')).to.equal('a, b and c');
		});
	});

	/**
	 *
	 */
	describe('list', function() {
		it('should filter out empty strings', function() {
			expect(list('', '   ')).to.equal('');
		});
	});
});
