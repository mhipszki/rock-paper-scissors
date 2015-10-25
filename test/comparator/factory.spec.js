'use strict';

var generateComparatorWith = require('../../src/js/comparator/factory');

describe('symbol comparator', function () {

	describe('factory', function () {

		it('should return a comparator function', function () {
			function fakeValidator () {
				return true;
			}
			var compare = generateComparatorWith('symbol definitions', fakeValidator);
			expect(compare).to.be.an.instanceof(Function);
		});

		it('should validate symbol definitions', function () {
			var validatorHasBeenCalledWith;

			function validatorSpy (symbolDefinitions) {
				validatorHasBeenCalledWith = symbolDefinitions;
			}
			generateComparatorWith('symbol definitions', validatorSpy);

			expect(validatorHasBeenCalledWith).to.equal('symbol definitions');
		});

	});

});
