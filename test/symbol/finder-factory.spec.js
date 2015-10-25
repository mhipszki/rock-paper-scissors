'use strict';

var generateFinderWith = require('../../src/js/symbol/finder-factory');

describe('symbol definition finder', function () {

	var definitions = [
		{ symbol: 'A' },
		{ symbol: 'B' },
		{ symbol: 'C' }
	];

	it('should find a symbol by name', function () {
		var findByName = generateFinderWith(definitions);
		var definition = findByName('B');
		expect(definition.symbol).to.equal('B');
	});

});
