# Rock-Paper-Scissors

Clone and run `npm install` in the project folder, then `npm run serve` to open the game in your default browser under `localhost:9090`.

The game can be rebuilt from source using `npm run build`.

## Development

There's no Grunt, Gulp, only the most necessary packages has been added to this project.

The project uses [Browserify](http://browserify.org/) for code modularization.

Unit tests are written using [Mocha](https://mochajs.org/) and the [Chai/Expect](http://chaijs.com/api/bdd/) assertion library.

Development is aided with several `npm` scripts (see `package.json` for details):

- `lint`: lints all Javascript files using ESLint
- `test`: runs unit tests via Karma in PhantomJS
- `watch`: listens to file changes, runs `test` and `build` scripts
- `build`: creates app bundle from source to under `dist/` folder
- `serve`: serves `dist/` folder's content on localhost:9090
- `open`: opens app in default browser
- `dev`: starts dev environment, running `serve` and `watch`

## Game definition

The game has only three possible outcomes other than a tie:

1. a player who decides to play rock will beat another player who has chosen scissors: **rock crushes scissors**
- but will lose to one who has played paper: **paper covers rock**
- a play of paper will lose to a play of scissors **scissors cut paper**

If both players throw the same shape, the game is *tied* and is usually immediately replayed to break the tie.

http://en.wikipedia.org/wiki/Rock-paper-scissors

## Acceptance Criteria

- play against the computer
- simulate a game (Computer vs Computer)
- restart the game
- computer generated plays are random
- IE9+

- extensibility e.g. http://en.wikipedia.org/wiki/Rock-paper-scissors-lizard-Spock
- accessible code
- unit tests
- documentation

## Actors

Actors can play against each other by choosing one of the following symbols:

- rock
- paper
- scissors

at the same time.

**Player**

Can select a game type:

- player vs computer
- computer vs computer

**Computer**

Can play against a player or another computer. It makes its choice randomly from the available symbols.

## Game types

### Player vs Computer

When a player is playing against a computer, the player chooses one from the available symbols, the computer waits for the player's choice and makes its choice, then the symbols are compared.

From the player's point of view, the computer makes its choice at the same time the player does.

### Computer vs Computer

When a computer playing against another computer, both computers make their choice, then the symbols are compared.

## Architecture

The architecture has been evolved throughout the development process, thanks to the test-first / TDD approach.

The bulk of the logic validates the game / symbol definitions and compares two given symbols to produce a game outcome.

Only the bare minimum code has been produced, both in case of unit tests and production code.

### Entities

There are a few entities which are working together to provide the necessary functionality.

- **Symbol**: represents a symbol instance, stores definition and is able to tell if the symbol can beat other symbol(s)
- **Symbol Definition Validator**: checks if a symbol definition is correct, throws an error on the first discrepancy
- **Symbol List Validator**: checks if a symbol definition list is correct, throws an error on the first discrepancy
- **Symbol finder**: is able to find a symbol definition in a list of definitions by a symbol name
- **Symbol comparator**: can compare two symbols using their definitions and produces an outcome (0: tie, 1: first symbol won, 2: second symbol won)
- **Outcome decorator**: is able to find the winner and loser symbol definitions, thus generating an outcome message to be shown to the player
- **Computer**: can choose a random symbol from the available list of symbols
- **Game**: can be played, stores outcome and message

All entities are fully unit tested via example based test cases.

### Best practices

The *Factory pattern* is favored in this project, most of the entities are generated to be bound to the game configuration i.e. the symbol definition list.

This would allow us to place multiple games at once on the same page, running independently from each other.

Using the *CommonJS module pattern*, the *Separation of Concerns* principle is being kept.

The *Dependency inversion* principle is also being used, injecting dependencies and easing mocking in unit tests.

### Extensibility

Thanks to the architecture evolved, the game is not limited to the original 3 symbols (rock, paper, scissors) but can be extended with new symbols by simply adding their definition to the game configuration, i.e. to create a Rock, Paper, Scissors, Lizard, Spock game is a matter of minutes.

**Original game configuration**

```javascript
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
```

See the working version in branch `lizard-and-spock` and the following configuration:

```javascript
var symbolDefinitions = [
	{
		symbol: 'rock',
		beats: [{
			symbol: 'scissors',
			message: 'rock crushes scissors'
		},{
			symbol: 'lizard',
			message: 'rock crushes lizard'
		}]
	}, {
		symbol: 'paper',
		beats: [{
			symbol: 'rock',
			message: 'paper covers rock'
		},{
			symbol: 'Spock',
			message: 'paper dispoves Spock'
		}]
	}, {
		symbol: 'scissors',
		beats: [{
			symbol: 'paper',
			message: 'scissors cut paper'
		},{
			symbol: 'lizard',
			message: 'scissors decapitates lizard'
		}]
	}, {
		symbol: 'lizard',
		beats: [{
			symbol: 'Spock',
			message: 'lizard poisons Spock'
		},{
			symbol: 'paper',
			message: 'lizard eats paper'
		}]
	}, {
		symbol: 'Spock',
		beats: [{
			symbol: 'scissors',
			message: 'Spock smashes scissors'
		},{
			symbol: 'rock',
			message: 'Spock vaporizes rock'
		}]
	}
];
```

## User interface

Kind of minimal, provides a dropdown to select a symbol and play a Player vs Computer game, and also a button to simulate a game (Computer vs Computer).

When a symbols is chosen or the button is clicked, the game is set up and played immediately, showing the chosen symbols, the outcome message and the winner.

## Browser compatibility

No library (only vanilla Javascript), but several *Array.prototype* method is being used in the code, which is supported by IE9+ however a shim would be necessary to run this code in IE8 or lower.

## Remaining TODOs and step forwards

Relying on random input in unit tests is *never* a good idea. A possible step forward in the reliability of the codebase is to remove the inline `Math.random()` usage in the `Computer` module, inject in a shuffler function to shuffle the available symbols before the `Computer` chooses and returns the first symbol in the list.

Using an injectable shuffler would allow us to properly unit test the `Computer` module's code e.g. using a predictable `reverse()` shuffler and only use a `random()` shuffler in production. This way the code of the `Computer` module and the shuffler can be tested in separation but composed with confidence.

Another option is to use a PRNG (pseudo random number generator) which would allow us to *store and replay* e.g. a simulated game, by providing the same seed for our `random()` shuffler function.

Run `npm run dev` to start experiment! :)
