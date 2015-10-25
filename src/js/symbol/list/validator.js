'use strict';

var validateSymbol = require('../definition/validator');
var errors = require('./errors');

module.exports = function validate (list) {

	if (typeof list !== 'object') {
		throw new Error(errors.invalidType);
	}

	var symbols = Object.keys(list);

	if (symbols.length === 0) {
		throw new Error(errors.empty);
	}

	function exists(symbol) {
		// TODO: remove when symbol list becomes an array
		var definitions = symbols.map(function (key) {
			return list[key];
		});
		return definitions.some(function (definition) {
			return definition.symbol === symbol;
		});
	}

	symbols.forEach(function (symbol) {
		var definition = list[symbol];

		validateSymbol(definition);

		var nonExistentSymbolUsed = definition.beats.some(function (beatable) {
			return !exists(beatable.symbol);
		});

		if (nonExistentSymbolUsed) {
			throw new Error(errors.symbol.beats.nonExistentSymbol);
		}
	});

	return true;
};
