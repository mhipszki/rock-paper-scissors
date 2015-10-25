'use strict';

var errors = require('./errors');

function comparatorFactory (rules, validate) {

	validate(rules);

	return function compare (symbolOne, symbolTwo) {
		if (typeof symbolOne !== 'string' || typeof symbolTwo !== 'string') {
			throw new Error(errors.invalidArgs);
		}

		if (rules[symbolOne].beats.indexOf(symbolTwo) > -1) {
			return 1;
		}
		if (rules[symbolTwo].beats.indexOf(symbolOne) > -1) {
			return 2;
		}
		return 0;
	};
}

module.exports = comparatorFactory;
