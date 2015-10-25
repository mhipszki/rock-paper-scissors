'use strict';

var generateGameWith = require('./game-factory');

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

function play (s1, s2) {
	var game = generateGameWith(symbolDefinitions);
	game.play(s1, s2);
	console.log(s1, s2, '=>', game.message());
}

play('rock', 'scissors');
play('rock', 'paper');
play('rock', 'rock');
