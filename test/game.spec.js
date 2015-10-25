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

});
