'use strict';

var generateComparatorWith = require('./symbol/comparator/factory');
var generateDecoratorWith = require('./outcome-decorator-factory');
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
var decorate = generateDecoratorWith(symbolDefinitions);

console.log('rock', 'scissors', '=>', decorate('rock', 'scissors', compare('rock', 'scissors')));
console.log('rock', 'paper', '=>', decorate('rock', 'paper', compare('rock', 'paper')));
console.log('rock', 'rock', '=>', decorate('rock', 'rock', compare('rock', 'rock')));
