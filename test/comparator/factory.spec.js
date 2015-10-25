'use strict';

var generateComparatorWith = require('../../src/js/comparator/factory');

describe('symbol comparator', function () {

	describe('factory', function () {

		it('should return a comparator function', function () {
			function fakeValidator () {
				return true;
			}
			var compare = generateComparatorWith('some rules', fakeValidator);
			expect(compare).to.be.an.instanceof(Function);
		});

		it('should validate rules', function () {
			var validatorHasBeenCalledWith;

			function validatorSpy (rules) {
				validatorHasBeenCalledWith = rules;
			}
			generateComparatorWith('some rules', validatorSpy);

			expect(validatorHasBeenCalledWith).to.equal('some rules');
		});

	});

});
