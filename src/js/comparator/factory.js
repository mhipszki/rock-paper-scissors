'use strict';

var Symbol = require('../symbol');
var errors = require('./errors');

function symbol (definition) {
	return new Symbol(definition);
}

function comparatorFactory (rules, validate) {

	validate(rules);

	return function compare (symbolOne, symbolTwo) {
		if (typeof symbolOne !== 'string' || typeof symbolTwo !== 'string') {
			throw new Error(errors.invalidArgs);
		}

		if (symbol(rules[symbolOne]).beats(symbolTwo)) {
			return 1;
		}

		if (symbol(rules[symbolTwo]).beats(symbolOne)) {
			return 2;
		}

		return 0;
	};
}

module.exports = comparatorFactory;
