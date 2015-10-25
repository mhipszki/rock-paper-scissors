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

	symbols.forEach(function (symbol) {
		var definition = list[symbol];

		validateSymbol(definition);

		var nonExistentSymbolUsed = definition.beats.some(function (beatable) {
			return symbols.indexOf(beatable) === -1;
		});

		if (nonExistentSymbolUsed) {
			throw new Error(errors.symbol.beats.nonExistentSymbol);
		}
	});

	return true;
};
