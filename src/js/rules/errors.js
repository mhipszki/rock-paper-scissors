'use strict';

module.exports = {
	invalidType: 'rule definitions must be provided in an object',
	empty: 'rules must contain at least one rule',
	rule: {
		invalidType: 'each rule must be an object',
		missingBeats: 'each rule must define beatable symbols',
		beats: {
			empty: 'each rule must define at least one beatable symbol',
			nonExistentSymbol: 'each rule must define existing symbols as beatable'
		}
	}
};
