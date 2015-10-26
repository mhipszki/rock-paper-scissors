'use strict';

var generateGameWith = require('./game-factory');
var generateComputerOpponentWith = require('./computer-factory');

var symbolDefinitions = [
	{
		symbol: 'rock',
		beats: [{
			symbol: 'scissors',
			message: 'rock crushes scissors'
		}]
	}, {
		symbol: 'paper',
		beats: [{
			symbol: 'rock',
			message: 'paper covers rock'
		}]
	}, {
		symbol: 'scissors',
		beats: [{
			symbol: 'paper',
			message: 'scissors cut paper'
		}]
	}
];

var select = document.querySelector('.available-symbols');

function playAgainstComputer (s1) {
	var game = generateGameWith(symbolDefinitions);
	var computer = generateComputerOpponentWith(symbolDefinitions);
	var s2 = computer.chooseSymbol();

	game.play(s1, s2);

	var playerMessage;

	switch (game.outcome()) {
	case 1:
		playerMessage = 'Congrats, you won! :)';
		break;
	case 2:
		playerMessage = 'You lost :( better luck next time!';
		break;
	case 0:
		playerMessage = 'It\'s a tie! Play again?';
		break;
	}

	var outcome = document.querySelector('.outcome h1');
	outcome.textContent = playerMessage;

	var computerChoice = document.querySelector('.outcome h3');
	computerChoice.textContent = 'The computer has chosen '+s2;

	var message = document.querySelector('.outcome p');
	message.textContent = game.message();

	select.selectedIndex = 0;
}

select.addEventListener('change', function (event) {
	var chosenSymbol = event.target.value;
	if (chosenSymbol !== 'null') {
		playAgainstComputer(chosenSymbol);
	}
});
