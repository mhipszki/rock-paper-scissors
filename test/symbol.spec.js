'use strict';

var Symbol = require('../src/js/symbol');

describe('symbol', function () {

	function generateSymbolFrom (definition) {
		return new Symbol(definition);
	}

	it('should store its definition', function () {
		var definition = { a: 'symbol definition' };
		var symbol = generateSymbolFrom(definition);
		expect(symbol.definition).to.deep.equal(definition);
	});

	it('should not alter the definition', function () {
		var definition = { a: 'symbol definition' };
		var originalDefinition = JSON.stringify(definition);
		var symbol = generateSymbolFrom(definition);
		expect(JSON.stringify(symbol.definition)).to.equal(originalDefinition);
	});

	describe('beats(symbol) method', function () {

		describe('when the symbol can be beaten', function () {

			it('should return true', function () {
				var definition = {
					beats: ['other symbol']
				};
				var symbol = generateSymbolFrom(definition);
				var canBeBeaten = symbol.beats('other symbol');
				expect(canBeBeaten).to.be.true;
			});

		});

		describe('when the symbol is not beatable', function () {

			it('should return false', function () {
				var definition = {
					beats: ['a beatable symbol']
				};
				var symbol = generateSymbolFrom(definition);
				var canBeBeaten = symbol.beats('other symbol');
				expect(canBeBeaten).to.be.false;
			});

		});

	});

});
