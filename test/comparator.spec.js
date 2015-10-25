'use strict';

var comparatorFactory = require('../src/js/comparator-factory');

describe('symbol comparator', function () {

	var rules = {
		'A': { beats: ['B'] },
		'B': { beats: ['C'] },
		'C': { beats: ['A'] }
	};

	var compare;

	beforeEach(function () {
		compare = comparatorFactory(rules);
	});

	describe('factory', function () {

		it('should return a comparator function', function () {
			expect(compare).to.be.an.instanceof(Function);
		});

	});

	describe('when provided with invalid symbols', function () {

		it('should complain to only accept string symbols', function () {
			function doComparisonWithInvalidFirstArg () {
				var a;
				var b = 'B';
				return compare(a, b);
			}
			expect(doComparisonWithInvalidFirstArg).to.throw('invalid arguments, symbols must be strings');

			function doComparisonWithInvalidSecondArg () {
				var a = 'A';
				var b;
				return compare(a, b);
			}
			expect(doComparisonWithInvalidSecondArg).to.throw('invalid arguments, symbols must be strings');
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
