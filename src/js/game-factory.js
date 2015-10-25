'use strict';

var generateComparatorWith = require('./symbol/comparator/factory');
var generateDecoratorWith = require('./outcome-decorator-factory');
var validate = require('./symbol/list/validator');

module.exports = function gameFactory (definitions) {

	validate(definitions);

	var compare = generateComparatorWith(definitions, validate);
	var decorate = generateDecoratorWith(definitions);

	var outcome;
	var message;

	return {
		play: function (symbolOne, symbolTwo) {
			outcome = compare(symbolOne, symbolTwo);
			message = decorate(symbolOne, symbolTwo, outcome);
		},
		outcome: function () {
			return outcome;
		},
		message: function () {
			return message;
		}
	};
};
