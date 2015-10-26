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
select.addEventListener('change', function (event) {
	var selectedIndex = event.target.selectedIndex;
	var chosenSymbol = event.target.value;
	if (selectedIndex > 0) {
		playAgainstComputer(chosenSymbol);
	}
});

var button = document.querySelector('button');
button.addEventListener('click', computerVsComputer);

var computerChoice = document.querySelector('.outcome h3');
var message = document.querySelector('.outcome p');
var outcome = document.querySelector('.outcome h1');

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

	computerChoice.textContent = 'The computer has chosen '+s2;
	message.textContent = game.message();
	outcome.textContent = playerMessage;

	select.selectedIndex = 0;
}

function computerVsComputer () {
	var game = generateGameWith(symbolDefinitions);
	var computer1 = generateComputerOpponentWith(symbolDefinitions);
	var computer2 = generateComputerOpponentWith(symbolDefinitions);
	var s1 = computer1.chooseSymbol();
	var s2 = computer2.chooseSymbol();

	game.play(s1, s2);

	var playerMessage;

	switch (game.outcome()) {
	case 1:
		playerMessage = 'First computer won!';
		break;
	case 2:
		playerMessage = 'Second computer won!';
		break;
	case 0:
		playerMessage = 'It\'s a tie! Play again? Click the button!';
		break;
	}

	computerChoice.textContent = 'The computer1 has chosen '+s1+', computer2 has chosen '+s2;
	message.textContent = game.message();
	outcome.textContent = playerMessage;
}
