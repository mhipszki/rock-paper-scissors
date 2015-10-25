'use strict';

var validate = require('./definition/validator');

function Symbol (definition) {
	validate(definition);
	this.definition = definition;
}

Symbol.prototype.beats = function beats (symbol) {
	return this.definition.beats.some(function (beatable) {
		return beatable.symbol === symbol;
	});
};

module.exports = Symbol;
