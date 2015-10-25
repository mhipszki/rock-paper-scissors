'use strict';

var generateDecoratorWith = require('../src/js/outcome-decorator-factory');
var generateComparatorWith = require('../src/js/symbol/comparator/factory');
var validator = require('../src/js/symbol/list/validator');

describe('outcome decorator', function () {

	var compare;
	var decorator;

	var definitions = [
		{ symbol: 'A', beats: [ { symbol: 'B', message: 'A beats B' } ] },
		{ symbol: 'B', beats: [ { symbol: 'C', message: 'B beats C' } ] },
		{ symbol: 'C', beats: [ { symbol: 'A', message: 'C beats A' } ] }
	];

	beforeEach(function () {
		compare = generateComparatorWith(definitions, validator);
		decorator = generateDecoratorWith(definitions);
	});

	describe('when the outcome is a tie', function () {

		it('should return the right message', function () {
			var outcome = compare('A', 'A');
			var result = decorator('A', 'A', outcome);
			expect(result).to.equal('tie!');
		});

	});

	describe('when the outcome is NOT a tie', function () {

		it('should return the right message', function () {
			var message = 'A has won, A beats B!';
			var outcome = compare('A', 'B');
			var result = decorator('A', 'B', outcome);
			expect(result).to.equal(message);
		});

	});

});
