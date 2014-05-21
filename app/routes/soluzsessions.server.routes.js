'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var soluzsessions = require('../../app/controllers/soluzsessions');

	// Soluzsessions Routes
	app.route('/soluzsessions')
		.get(soluzsessions.list)
		.post(users.requiresLogin, soluzsessions.create);
	
	app.route('/soluzsessions/:soluzsessionId')
		.get(soluzsessions.read)
		.put(users.requiresLogin, soluzsessions.hasAuthorization, soluzsessions.update)
	    .delete(users.requiresLogin, soluzsessions.hasAuthorization, soluzsessions.delete);

	// Finish by binding the Soluzsession middleware
	app.param('soluzsessionId', soluzsessions.soluzsessionByID);
};