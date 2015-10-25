'use strict';

function Symbol () {
}

function generateSymbolFrom (definition) {
	return new Symbol(definition);
}

describe.only('symbol factory', function () {

	it('should generate symbols from definitons', function () {
		var definition = { a: 'symbol definition' };
		var symbol = generateSymbolFrom(definition);
		expect(symbol).to.be.an.instanceof(Symbol);
	});

});
