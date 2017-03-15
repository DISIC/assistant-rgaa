import join from './join';



/**
 *
 */
describe('join', function() {
	it('should join strings in natural language', function() {
		expect(join(['a', 'b'], ', ', ' and ')).to.equal('a and b');
		expect(join(['a', 'b', 'c'], ', ', ' and ')).to.equal('a, b and c');
	});
});
