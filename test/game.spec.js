'use strict';

var generateGameWith = require('../src/js/game');
var errors = require('../src/js/symbol/list/errors');

describe('game', function () {

	describe('factory', function () {

		it('should validate symbol definitions', function () {
			function generate () {
				return generateGameWith('invalid definitions');
			}
			expect(generate).to.throw(errors.invalidType);
		});

	});

	describe('when played', function () {

		var game;

		var definitions = [
			{ symbol: 'A', beats: [ { symbol: 'B', message: 'A beats B' } ] },
			{ symbol: 'B', beats: [ { symbol: 'C', message: 'B beats C' } ] },
			{ symbol: 'C', beats: [ { symbol: 'A', message: 'C beats A' } ] }
		];

		beforeEach(function () {
			game = generateGameWith(definitions);
			game.play('A', 'B');
		});

		it('should determine the outcome', function () {
			expect(game.outcome()).to.equal(1);
		});

		it('should provide an outcome message', function () {
			expect(game.message()).to.match(/A beats B/);
		});

	});

});
