'use strict';

function generateComputerOpponentWith (definitions) {

	//TODO: Math.random() makes the matching unit test semi-predictible
	//		can be fixed via injecting a shuffler and use a predictible
	//		shuffler for testint the functionality in the tests,
	//		whilst a random shuffler in a real game

	function getRandomIndexBetween(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	return {
		chooseSymbol: function () {
			var chosen = getRandomIndexBetween(0, definitions.length-1);
			return definitions[chosen].symbol;
		}
	};
}

describe('computer opponent', function () {

	var definitions = [
		{ symbol: 'A' },
		{ symbol: 'B' },
		{ symbol: 'C' }
	];

	it('should choose a random symbol', function () {
		var computer = generateComputerOpponentWith(definitions);
		var chosenSymbol = computer.chooseSymbol();
		expect(['A','B','C']).to.contain(chosenSymbol);
	});

});
