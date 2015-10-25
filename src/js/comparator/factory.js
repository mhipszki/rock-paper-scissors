'use strict';

var Symbol = require('../symbol');
var errors = require('./errors');

function comparatorFactory (symbolDefinitions, validate) {

	validate(symbolDefinitions);

	function symbol (name) {
		var definition = symbolDefinitions[name];
		return new Symbol(definition);
	}

	return function compare (symbolOne, symbolTwo) {
		if (typeof symbolOne !== 'string' || typeof symbolTwo !== 'string') {
			throw new Error(errors.invalidArgs);
		}

		if (symbol(symbolOne).beats(symbolTwo)) {
			return 1;
		}

		if (symbol(symbolTwo).beats(symbolOne)) {
			return 2;
		}

		return 0;
	};
}

module.exports = comparatorFactory;
