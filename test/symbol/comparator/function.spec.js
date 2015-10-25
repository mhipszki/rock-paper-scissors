'use strict';

var generateComparatorWith = require('../../../src/js/symbol/comparator/factory');
var errors = require('../../../src/js/symbol/comparator/errors');
var validator = require('../../../src/js/symbol/list/validator');

describe('symbol comparator', function () {

	describe('function', function () {

		var symbolDefinitions = [
			{ symbol: 'A', beats: [ { symbol: 'B', message: 'A beats B'}] },
			{ symbol: 'B', beats: [ { symbol: 'C', message: 'B beats C'}] },
			{ symbol: 'C', beats: [ { symbol: 'A', message: 'C beats A'}] }
		];

		var compare;

		beforeEach(function () {
			compare = generateComparatorWith(symbolDefinitions, validator);
		});

		describe('when provided with invalid symbols', function () {

			it('should complain to only accept string symbols', function () {
				function doComparisonWithInvalidFirstArg () {
					var a;
					var b = 'B';
					return compare(a, b);
				}
				expect(doComparisonWithInvalidFirstArg).to.throw(errors.invalidArgs);

				function doComparisonWithInvalidSecondArg () {
					var a = 'A';
					var b;
					return compare(a, b);
				}
				expect(doComparisonWithInvalidSecondArg).to.throw(errors.invalidArgs);
			});

		});

		describe('when provided with the same symbols', function () {

			it('should return 0', function () {
				var outcome = compare('A', 'A');
				expect(outcome).to.equal(0);
			});

		});

		describe('when provided with different symbols', function () {

			describe('and the 1st symbol beats the 2nd', function () {

				it('should return 1', function () {
					var outcome = compare('A', 'B');
					expect(outcome).to.equal(1);
				});

			});

			describe('and the 2st symbol beats the 1nd', function () {

				it('should return 2', function () {
					var outcome = compare('A', 'C');
					expect(outcome).to.equal(2);
				});

			});

		});

	});

});
