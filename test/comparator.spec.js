'use strict';

function compare () {
	return 0;
}

describe('symbol comparator', function () {

	describe('when provided with the same symbols', function () {

		it('should return 0', function () {
			var outcome = compare('A', 'A');
			expect(outcome).to.equal(0);
		});

	});

});
