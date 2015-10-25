# Rock-Paper-Scissors

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

### Player

Can select a game type:

- player vs computer
- computer vs computer

### Computer

Can play against a player or another computer. It makes its choice randomly from the available symbols.

## Game types

### Player vs Computer

When a player is playing against a computer, the player chooses one from the available symbols, the computer waits for the player's choice and makes its choice, then the symbols are compared.

From the player's point of view, the computer makes its choice at the same time the player does.

### Computer vs Computer

When a computer playing against another computer, both computers make their choice, then the symbols are compared.
