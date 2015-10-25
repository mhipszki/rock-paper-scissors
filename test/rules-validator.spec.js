'use strict';

var errors = {
	invalidType: 'rules must be an object',
	noRulesDefined: 'rules must contain at least one rule'
};

function validate (rules) {
	if (typeof rules !== 'object') {
		throw new Error(errors.invalidType);
	}
	if (Object.keys(rules).length === 0) {
		throw new Error(errors.noRulesDefined);
	}
	return true;
}

describe('rules validator', function () {

	describe('when provided with a valid rules object', function () {

		it('should return true', function () {
			var rules = { a: 'rule' };
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

		it('must contain at least one rule', function () {
			function validation () {
				var rules = {};
				return validate(rules);
			}
			expect(validation).to.throw(errors.noRulesDefined);
		});

	});

});
