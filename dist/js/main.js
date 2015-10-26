(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

var generateComparatorWith = require('./symbol/comparator/factory');
var generateDecoratorWith = require('./outcome-decorator-factory');
var validate = require('./symbol/list/validator');

module.exports = function gameFactory (definitions) {

	validate(definitions);

	var compare = generateComparatorWith(definitions, validate);
	var decorate = generateDecoratorWith(definitions);

	var outcome;
	var message;

	return {
		play: function (symbolOne, symbolTwo) {
			outcome = compare(symbolOne, symbolTwo);
			message = decorate(outcome, symbolOne, symbolTwo);
		},
		outcome: function () {
			return outcome;
		},
		message: function () {
			return message;
		}
	};
};

},{"./outcome-decorator-factory":4,"./symbol/comparator/factory":6,"./symbol/list/validator":11}],3:[function(require,module,exports){
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

},{"./computer-factory":1,"./game-factory":2}],4:[function(require,module,exports){
'use strict';

var generateFinderWith = require('./symbol/finder-factory');

module.exports = function generateDecoratorWith (definitions) {
	return function decorator (outcome, symbolOne, symbolTwo) {
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

},{"./symbol/finder-factory":9}],5:[function(require,module,exports){
'use strict';

module.exports = {
	invalidArgs: 'invalid arguments, symbols must be strings'
};

},{}],6:[function(require,module,exports){
'use strict';

var Symbol = require('../symbol');
var errors = require('./errors');
var generateFinderWith = require('../finder-factory');

function comparatorFactory (symbolDefinitions, validate) {

	validate(symbolDefinitions);

	var findBy = generateFinderWith(symbolDefinitions);

	function symbol (name) {
		var definition = findBy(name);
		return new Symbol(definition);
	}

	return function compare (symbolOne, symbolTwo) {
		if (typeof symbolOne !== 'string' || typeof symbolTwo !== 'string') {
			throw new Error(errors.invalidArgs);
		}

		if (symbol(symbolOne).beats(symbolTwo)) {
			return 1;
		}

		if (symbol(symbolTwo).beats(symbolOne)) {
			return 2;
		}

		return 0;
	};
}

module.exports = comparatorFactory;

},{"../finder-factory":9,"../symbol":12,"./errors":5}],7:[function(require,module,exports){
'use strict';

module.exports = {
	invalidType: 'every symbol must be an object',
	name: {
		missing: 'every symbol must have a name',
		invalidType: 'every symbol name must be a string'
	},
	beats: {
		missing: 'every symbol must define a list beatable symbols',
		invalidType: 'list of beatable symbols must be an Array',
		empty: 'every symbol must define at least one beatable symbol',
		nonExistentSymbol: 'every symbol must only define existing symbols as beatable'
	},
	beatable: {
		invalidType: 'every beatable symbol definition must be an object',
		missingReference: 'every beatable symbol definition must refere to a symbol',
		missingMessage: 'every beatable symbol definition must define a winning message'
	}
};

},{}],8:[function(require,module,exports){
'use strict';

var errors = require('./errors');

module.exports = function validate (definition) {
	if (typeof definition !== 'object') {
		throw new Error(errors.invalidType);
	}

	if (typeof definition.symbol === 'undefined') {
		throw new Error(errors.name.missing);
	}

	if (typeof definition.symbol !== 'string') {
		throw new Error(errors.name.invalidType);
	}

	if (typeof definition.beats === 'undefined') {
		throw new Error(errors.beats.missing);
	}

	if (!(definition.beats instanceof Array)) {
		throw new Error(errors.beats.invalidType);
	}

	if (definition.beats.length === 0) {
		throw new Error(errors.beats.empty);
	}

	definition.beats.forEach(function (beatable) {
		if (typeof beatable !== 'object') {
			throw new Error(errors.beatable.invalidType);
		}

		if (typeof beatable.symbol === 'undefined') {
			throw new Error(errors.beatable.missingReference);
		}

		if (typeof beatable.message === 'undefined') {
			throw new Error(errors.beatable.missingMessage);
		}
	});

	return true;
};

},{"./errors":7}],9:[function(require,module,exports){
'use strict';

module.exports = function generateFinderWith (definitions) {
	return function findBy (name) {
		return definitions.filter(function (definition) {
			return definition.symbol === name;
		})[0];
	};
};

},{}],10:[function(require,module,exports){
'use strict';

module.exports = {
	invalidType: 'symbol list must be an Array',
	empty: 'symbol list must contain at least one symbol definition',
	symbol: {
		beats: {
			nonExistentSymbol: 'each symbol definition must refer to existing symbols as beatable'
		}
	}
};

},{}],11:[function(require,module,exports){
'use strict';

var validateSymbol = require('../definition/validator');
var errors = require('./errors');

module.exports = function validate (list) {

	if (!(list instanceof Array)) {
		throw new Error(errors.invalidType);
	}

	var symbols = Object.keys(list);

	if (symbols.length === 0) {
		throw new Error(errors.empty);
	}

	function exists(symbol) {
		return list.some(function (definition) {
			return definition.symbol === symbol;
		});
	}

	symbols.forEach(function (symbol) {
		var definition = list[symbol];

		validateSymbol(definition);

		var nonExistentSymbolUsed = definition.beats.some(function (beatable) {
			return !exists(beatable.symbol);
		});

		if (nonExistentSymbolUsed) {
			throw new Error(errors.symbol.beats.nonExistentSymbol);
		}
	});

	return true;
};

},{"../definition/validator":8,"./errors":10}],12:[function(require,module,exports){
'use strict';

var validate = require('./definition/validator');

function Symbol (definition) {
	validate(definition);
	this.definition = definition;
}

Symbol.prototype.beats = function beats (symbol) {
	return this.definition.beats.some(function (beatable) {
		return beatable.symbol === symbol;
	});
};

module.exports = Symbol;

},{"./definition/validator":8}]},{},[3])
//# sourceMappingURL=main.js.map
