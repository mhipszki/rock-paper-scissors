'use strict';

function comparatorFactory (rules) {

	return function compare (symbolOne, symbolTwo) {
		if (rules[symbolOne].beats.indexOf(symbolTwo) > -1) {
			return 1;
		}
		if (rules[symbolTwo].beats.indexOf(symbolOne) > -1) {
			return 2;
		}
		return 0;
	};
}

describe('symbol comparator', function () {

	var rules = {
		'A': { beats: ['B'] },
		'B': { beats: ['C'] },
		'C': { beats: ['A'] }
	};

	var compare;

	beforeEach(function () {
		compare = comparatorFactory(rules);
	});

	describe('when provided with the same symbols', function () {

		it('should return 0', function () {
			var outcome = compare('A', 'A');
			expect(outcome).to.equal(0);
		});

	});

	describe('when provided with different symbols', function () {

		describe('and the 1st symbol beats the 2nd', function () {

			it('should return 1', function () {
				var outcome = compare('A', 'B');
				expect(outcome).to.equal(1);
			});

		});

		describe('and the 2st symbol beats the 1nd', function () {

			it('should return 2', function () {
				var outcome = compare('A', 'C');
				expect(outcome).to.equal(2);
			});

		});

	});

});
