'use strict';

var validate = require('../../../src/js/symbol/list/validator');
var errors = require('../../../src/js/symbol/list/errors');

describe('symbol list validator', function () {

	describe('when provided with a valid symbol list', function () {

		it('should return true', function () {
			var list = [{
				symbol: 'A',
				beats: [{
					symbol: 'B',
					message: 'A beats B'
				}]
			}, {
				symbol: 'B',
				beats: [{
					symbol: 'A',
					message: 'B beats A'
				}]
			}];
			var result = validate(list);
			expect(result).to.be.true;
		});

	});

	describe('symbol list', function () {

		it('must be an Array', function () {
			function validation () {
				var list = 'not an array';
				return validate(list);
			}
			expect(validation).to.throw(errors.invalidType);
		});

		it('must contain at least one symbol', function () {
			function validation () {
				var list = [];
				return validate(list);
			}
			expect(validation).to.throw(errors.empty);
		});

	});

	describe('any list of beatable symbols', function () {

		it('must only contain defined symbols', function () {
			function validation () {
				var list = [{
					symbol: 'A',
					beats: [{
						symbol: 'B',
						message: 'A beats B'
					}]
				}];
				return validate(list);
			}
			expect(validation).to.throw(errors.symbol.beats.nonExistentSymbol);
		});

	});

});
