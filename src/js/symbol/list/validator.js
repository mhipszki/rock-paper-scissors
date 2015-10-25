'use strict';

var validateSymbol = require('../definition/validator');
var errors = require('./errors');

module.exports = function validate (list) {

	if (!(list instanceof Array)) {
		throw new Error(errors.invalidType);
	}

	var symbols = Object.keys(list);

	if (symbols.length === 0) {
		throw new Error(errors.empty);
	}

	function exists(symbol) {
		return list.some(function (definition) {
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
