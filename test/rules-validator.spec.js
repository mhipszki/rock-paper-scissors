'use strict';

var errors = {
	invalidType: 'rule definitions must be provieded in an object',
	invalidRuleType: 'each rule must be an object',
	noRulesDefined: 'rules must contain at least one rule'
};

function validate (ruleDefinitions) {
	if (typeof ruleDefinitions !== 'object') {
		throw new Error(errors.invalidType);
	}

	var rules = Object.keys(ruleDefinitions);
	if (rules.length === 0) {
		throw new Error(errors.noRulesDefined);
	}

	rules.forEach(function (rule) {
		if (typeof ruleDefinitions[rule] !== 'object') {
			throw new Error(errors.invalidRuleType);
		}
	});

	return true;
}

describe('rules validator', function () {

	describe('when provided with a valid rules object', function () {

		it('should return true', function () {
			var rules = {
				'rule': {
					a: 'rule'
				}
			};
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

	describe('each rule', function () {

		it('must be an object', function () {
			function validation () {
				var rules = {
					'rule': 'not an object'
				};
				return validate(rules);
			}
			expect(validation).to.throw(errors.invalidRuleType);
		});

	});

});
