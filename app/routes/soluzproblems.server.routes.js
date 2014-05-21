'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var soluzproblems = require('../../app/controllers/soluzproblems');

	// Soluzproblems Routes
	app.route('/soluzproblems')
		.get(soluzproblems.list)
		.post(users.requiresLogin, soluzproblems.create);
	
	app.route('/soluzproblems/:soluzproblemId')
		.get(soluzproblems.read)
		.put(users.requiresLogin, soluzproblems.hasAuthorization, soluzproblems.update)
	    .delete(users.requiresLogin, soluzproblems.hasAuthorization, soluzproblems.delete);

	// Finish by binding the Soluzproblem middleware
	app.param('soluzproblemId', soluzproblems.soluzproblemByID);
};