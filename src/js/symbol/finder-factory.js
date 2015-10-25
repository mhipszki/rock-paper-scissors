'use strict';

module.exports = function generateFinderWith (definitions) {
	return function findBy (name) {
		return definitions.filter(function (definition) {
			return definition.symbol === name;
		})[0];
	};
};
