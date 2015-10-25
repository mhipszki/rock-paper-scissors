'use strict';

var Symbol = require('../src/js/symbol');
var errors = require('../src/js/symbol/definition/errors');

describe('symbol', function () {

	function generateSymbolFrom (definition) {
		return new Symbol(definition);
	}

	it('should validate its definition', function () {
		function instantiation () {
			return generateSymbolFrom('invalid definition');
		}
		expect(instantiation).to.throw(errors.invalidType);
	});

	it('should store its definition', function () {
		var definition = {
			symbol: 'a symbol',
			beats: ['another symbol']
		};
		var symbol = generateSymbolFrom(definition);
		expect(symbol.definition).to.deep.equal(definition);
	});

	it('should not alter the definition', function () {
		var definition = {
			symbol: 'a symbol',
			beats: ['another symbol']
		};
		var originalDefinition = JSON.stringify(definition);
		var symbol = generateSymbolFrom(definition);
		expect(JSON.stringify(symbol.definition)).to.equal(originalDefinition);
	});

	describe('beats(symbol) method', function () {

		describe('when the symbol can be beaten', function () {

			it('should return true', function () {
				var definition = {
					symbol: 'a symbol',
					beats: ['another symbol']
				};
				var symbol = generateSymbolFrom(definition);
				var canBeBeaten = symbol.beats('another symbol');
				expect(canBeBeaten).to.be.true;
			});

		});

		describe('when the symbol is not beatable', function () {

			it('should return false', function () {
				var definition = {
					symbol: 'a symbol',
					beats: ['a beatable symbol']
				};
				var symbol = generateSymbolFrom(definition);
				var canBeBeaten = symbol.beats('another symbol');
				expect(canBeBeaten).to.be.false;
			});

		});

	});

});
