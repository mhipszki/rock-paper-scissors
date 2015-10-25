'use strict';

function comparatorFactory (rules) {

	return function compare (symbolOne, symbolTwo) {
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
