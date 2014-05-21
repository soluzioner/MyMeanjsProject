'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Soluzproblem = mongoose.model('Soluzproblem'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Soluzproblem already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Soluzproblem
 */
exports.create = function(req, res) {
	var soluzproblem = new Soluzproblem(req.body);
	soluzproblem.user = req.user;

	soluzproblem.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(soluzproblem);
		}
	});
};

/**
 * Show the current Soluzproblem
 */
exports.read = function(req, res) {
	res.jsonp(req.soluzproblem);
};

/**
 * Update a Soluzproblem
 */
exports.update = function(req, res) {
	var soluzproblem = req.soluzproblem;

	soluzproblem = _.extend(soluzproblem, req.body);

	soluzproblem.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(soluzproblem);
		}
	});
};

/**
 * Delete an Soluzproblem
 */
exports.delete = function(req, res) {
	var soluzproblem = req.soluzproblem;

	soluzproblem.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(soluzproblem);
		}
	});
};

/**
 * List of Soluzproblems
 */
exports.list = function(req, res) {
	Soluzproblem.find().sort('-created').populate('user', 'displayName').exec(function(err, soluzproblems) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(soluzproblems);
		}
	});
};

/**
 * Soluzproblem middleware
 */
exports.soluzproblemByID = function(req, res, next, id) {
	Soluzproblem.findById(id).populate('user', 'displayName').exec(function(err, soluzproblem) {
		if (err) return next(err);
		if (!soluzproblem) return next(new Error('Failed to load Soluzproblem ' + id));
		req.soluzproblem = soluzproblem;
		next();
	});
};

/**
 * Soluzproblem authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.soluzproblem.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};