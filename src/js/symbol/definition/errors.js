'use strict';

module.exports = {
	invalidType: 'every symbol must be an object',
	beats: {
		missing: 'every symbol must define beatable symbols',
		empty: 'every symbol must define at least one beatable symbol',
		nonExistentSymbol: 'every symbol must only define existing symbols as beatable'
	}
};
