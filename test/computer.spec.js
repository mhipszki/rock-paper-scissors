'use strict';

var generateComputerOpponentWith = require('../src/js/computer-factory');

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
