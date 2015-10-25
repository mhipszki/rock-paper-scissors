'use strict';

//TODO: replace Math.random() with injectable shuffler
//
//		Math.random() makes the matching unit test semi-predictible
//
//		can be fixed via injecting a shuffler and use a predictible
//		shuffler for testint the functionality in the tests,
//		whilst a random shuffler in a real game

function getRandomIndexBetween(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = function generateComputerOpponentWith (definitions) {
	return {
		chooseSymbol: function () {
			var chosen = getRandomIndexBetween(0, definitions.length-1);
			return definitions[chosen].symbol;
		}
	};
};
