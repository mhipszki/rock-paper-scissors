'use strict';

var Symbol = require('../symbol');
var errors = require('./errors');

function symbol (definition) {
	return new Symbol(definition);
}

function comparatorFactory (symbolDefinitions, validate) {

	validate(symbolDefinitions);

	return function compare (symbolOne, symbolTwo) {
		if (typeof symbolOne !== 'string' || typeof symbolTwo !== 'string') {
			throw new Error(errors.invalidArgs);
		}

		if (symbol(symbolDefinitions[symbolOne]).beats(symbolTwo)) {
			return 1;
		}

		if (symbol(symbolDefinitions[symbolTwo]).beats(symbolOne)) {
			return 2;
		}

		return 0;
	};
}

module.exports = comparatorFactory;
