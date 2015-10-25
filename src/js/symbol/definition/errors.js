'use strict';

module.exports = {
	invalidType: 'every symbol must be an object',
	name: {
		missing: 'every symbol must have a name',
		invalidType: 'every symbol name must be a string'
	},
	beats: {
		missing: 'every symbol must define beatable symbols',
		empty: 'every symbol must define at least one beatable symbol',
		nonExistentSymbol: 'every symbol must only define existing symbols as beatable'
	},
	beatable: {
		invalidType: 'every beatable symbol definition must be an object',
		missingReference: 'every beatable symbol definition must refere to a symbol',
		missingMessage: 'every beatable symbol definition must define a winning message'
	}
};
