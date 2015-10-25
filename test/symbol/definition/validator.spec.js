'use strict';

var validate = require('../../../src/js/symbol/definition/validator');
var errors = require('../../../src/js/symbol/definition/errors');

describe('symbol definition validator', function () {

	describe('when provided with a valid definition', function () {

		it('should return true', function () {
			var definition = {
				symbol: 'a symbol',
				beats: ['another symbol']
			};
			var valid = validate(definition);
			expect(valid).to.be.true;
		});

	});

	describe('every symbol definition', function () {

		it('must be an object', function () {
			function validation () {
				var definition = 'not an object';
				return validate(definition);
			}
			expect(validation).to.throw(errors.invalidType);
		});

		it('must contain a list of symbols can be beaten by a symbol', function () {
			function validation () {
				var definition = {
					does: 'not contain list of beatable symbols'
				};
				return validate(definition);
			}
			expect(validation).to.throw(errors.beats.missing);
		});

		it('must define at least one beatable symbol', function () {
			function validation () {
				var definition = {
					beats: []
				};
				return validate(definition);
			}
			expect(validation).to.throw(errors.beats.empty);
		});

	});

});
