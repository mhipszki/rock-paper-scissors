'use strict';

var errors = require('./errors');

module.exports = function validate (rules) {
	if (typeof rules !== 'object') {
		throw new Error(errors.invalidType);
	}

	var symbols = Object.keys(rules);
	if (symbols.length === 0) {
		throw new Error(errors.empty);
	}

	symbols.forEach(function (symbol) {
		var rule = rules[symbol];
		if (typeof rule !== 'object') {
			throw new Error(errors.rule.invalidType);
		}
		if (!(rule.beats instanceof Array)) {
			throw new Error(errors.rule.missingBeats);
		}

		if (rule.beats.length === 0) {
			throw new Error(errors.rule.beats.empty);
		}

		var nonExistentSymbolUsed = rule.beats.some(function (beatable) {
			return symbols.indexOf(beatable) === -1;
		});

		if (nonExistentSymbolUsed) {
			throw new Error(errors.rule.beats.nonExistentSymbol);
		}
	});

	return true;
};
