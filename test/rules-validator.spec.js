'use strict';

var validate = require('../src/js/rules/validator');
var errors = require('../src/js/rules/errors');

describe('rules validator', function () {

	describe('when provided with a valid rules object', function () {

		it('should return true', function () {
			var rules = {
				'symbol A': {
					beats: ['symbol B']
				},
				'symbol B': {
					beats: ['symbol A']
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
			expect(validation).to.throw(errors.empty);
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
			expect(validation).to.throw(errors.rule.invalidType);
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

	describe('any list of beatable symbols', function () {

		it('must contain at least one symbol', function () {
			function validation () {
				var rules = {
					'symbol A': {
						beats: []
					}
				};
				return validate(rules);
			}
			expect(validation).to.throw(errors.rule.beats.empty);
		});

		it('must only contain defined symbols', function () {
			function validation () {
				var rules = {
					'symbol A': {
						beats: ['symbol B']
					}
				};
				return validate(rules);
			}
			expect(validation).to.throw(errors.rule.beats.nonExistentSymbol);
		});

	});

});
