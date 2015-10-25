'use strict';

var validate = require('../src/js/rules/validator');
var errors = require('../src/js/rules/errors');

describe('rules validator', function () {

	describe('when provided with a valid rules object', function () {

		it('should return true', function () {
			var rules = {
				'symbol A': {
					symbol: 'symbol A',
					beats: ['symbol B']
				},
				'symbol B': {
					symbol: 'symbol B',
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

	describe('any list of beatable symbols', function () {

		it('must only contain defined symbols', function () {
			function validation () {
				var rules = {
					'symbol A': {
						symbol: 'symbol A',
						beats: ['symbol B']
					}
				};
				return validate(rules);
			}
			expect(validation).to.throw(errors.symbol.beats.nonExistentSymbol);
		});

	});

});
