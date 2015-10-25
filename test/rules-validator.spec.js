'use strict';

var errors = {
	invalidType: 'rule definitions must be provieded in an object',
	invalidRuleType: 'each rule must be an object',
	noRulesDefined: 'rules must contain at least one rule',
	rule: {
		missingBeats: 'each rule must define beatable symbols'
	}
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
		var definition = ruleDefinitions[rule];
		if (typeof definition !== 'object') {
			throw new Error(errors.invalidRuleType);
		}
		if (!(definition.beats instanceof Array)) {
			throw new Error(errors.rule.missingBeats);
		}
	});

	return true;
}

describe('rules validator', function () {

	describe('when provided with a valid rules object', function () {

		it('should return true', function () {
			var rules = {
				'symbol': {
					beats: ['other','symbols']
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
					'rule defintion': 'not an object'
				};
				return validate(rules);
			}
			expect(validation).to.throw(errors.invalidRuleType);
		});

		it('must contain a list of symbols can be beaten by a symbol', function () {
			function validation () {
				var rules = {
					'rule definition': {
						does: 'not contain list of beatable symbols'
					}
				};
				return validate(rules);
			}
			expect(validation).to.throw(errors.rule.missingBeats);
		});

	});

});
