'use strict';

var errors = require('./errors');

module.exports = function validate (definition) {
	if (typeof definition !== 'object') {
		throw new Error(errors.invalidType);
	}

	if (typeof definition.symbol === 'undefined') {
		throw new Error(errors.name.missing);
	}

	if (typeof definition.symbol !== 'string') {
		throw new Error(errors.name.invalidType);
	}

	if (typeof definition.beats === 'undefined') {
		throw new Error(errors.beats.missing);
	}

	if (!(definition.beats instanceof Array)) {
		throw new Error(errors.beats.invalidType);
	}

	if (definition.beats.length === 0) {
		throw new Error(errors.beats.empty);
	}

	definition.beats.forEach(function (beatable) {
		if (typeof beatable !== 'object') {
			throw new Error(errors.beatable.invalidType);
		}

		if (typeof beatable.symbol === 'undefined') {
			throw new Error(errors.beatable.missingReference);
		}

		if (typeof beatable.message === 'undefined') {
			throw new Error(errors.beatable.missingMessage);
		}
	});

	return true;
};
