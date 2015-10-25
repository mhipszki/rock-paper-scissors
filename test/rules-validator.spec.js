'use strict';

function validate () {
	return true;
}

describe('rules validator', function () {

	describe('when provided with a valid rules object', function () {

		it('should return true', function () {
			var rules = {};
			var result = validate(rules);
			expect(result).to.be.true;
		});

	});

});
