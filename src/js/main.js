'use strict';

var generateGameWith = require('./game');

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

var game = generateGameWith(symbolDefinitions);

game.play('rock', 'scissors');
console.log('rock', 'scissors', '=>', game.message());

game.play('rock', 'paper');
console.log('rock', 'paper', '=>', game.message());

game.play('rock', 'rock');
console.log('rock', 'rock', '=>', game.message());
