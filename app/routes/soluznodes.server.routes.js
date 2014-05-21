'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var soluznodes = require('../../app/controllers/soluznodes');

	// Soluznodes Routes
	app.route('/soluznodes')
		.get(soluznodes.list)
		.post(users.requiresLogin, soluznodes.create);
	
	app.route('/soluznodes/:soluznodeId')
		.get(soluznodes.read)
		.put(users.requiresLogin, soluznodes.hasAuthorization, soluznodes.update)
	    .delete(users.requiresLogin, soluznodes.hasAuthorization, soluznodes.delete);

	// Finish by binding the Soluznode middleware
	app.param('soluznodeId', soluznodes.soluznodeByID);
};