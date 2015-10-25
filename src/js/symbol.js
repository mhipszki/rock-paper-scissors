'use strict';

function Symbol (definition) {
	this.definition = definition;
}

Symbol.prototype.beats = function beats (symbol) {
	return this.definition.beats.indexOf(symbol) > -1;
};

module.exports = Symbol;
