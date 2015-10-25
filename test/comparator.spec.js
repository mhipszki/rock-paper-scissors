'use strict';

var rules = {
	'A': {
		beats: ['B']
	}
};

function compare (symbolOne, symbolTwo) {
	if (rules[symbolOne].beats.indexOf(symbolTwo) > -1) {
		return 1;
	}
	return 0;
}

describe('symbol comparator', function () {

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

	});

});
