'use strict';

var validate = require('./symbol/list/validator');

module.exports = function gameFactory (definitions) {

	validate(definitions);

	return {};
};
