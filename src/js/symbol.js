'use strict';

var validate = require('./symbol/definition/validator');

function Symbol (definition) {
	validate(definition);
	this.definition = definition;
}

Symbol.prototype.beats = function beats (symbol) {
	return this.definition.beats.indexOf(symbol) > -1;
};

module.exports = Symbol;
