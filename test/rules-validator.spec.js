'use strict';

var errors = {
	invalidType: 'rules must be an object'
};

function validate (rules) {
	if (typeof rules !== 'object') {
		throw new Error(errors.invalidType);
	}
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

	describe('rules', function () {

		it('must be an object', function () {
			function validation () {
				var rules = 'not an object';
				return validate(rules);
			}
			expect(validation).to.throw(errors.invalidType);
		});

	});

});
