'use strict';

var generateFinderWith = require('./symbol/finder-factory');

module.exports = function generateDecoratorWith (definitions) {
	return function decorator (symbolOne, symbolTwo, outcome) {
		if (outcome === 0) {
			return 'tie!';
		}
		var winner = outcome === 1 ? symbolOne : symbolTwo;
		var loser = outcome === 2 ? symbolOne : symbolTwo;

		var findWinningDefinition = generateFinderWith(definitions);
		var winningDefinition = findWinningDefinition(winner);

		var findBeatedDefinition = generateFinderWith(winningDefinition.beats);
		var beated = findBeatedDefinition(loser);

		var message = beated.message;

		return winner+' has won, '+message+'!';
	};
};
