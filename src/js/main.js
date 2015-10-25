'use strict';

var generateComparatorWith = require('./symbol/comparator/factory');
var validator = require('./symbol/list/validator');

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

var compare = generateComparatorWith(symbolDefinitions, validator);

console.log('rock', 'scissors', compare('rock', 'scissors'));
console.log('rock', 'paper', compare('rock', 'paper'));
console.log('rock', 'rock', compare('rock', 'rock'));
