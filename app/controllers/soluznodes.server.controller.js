'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Soluznode = mongoose.model('Soluznode'),
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
				message = 'Soluznode already exists';
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
 * Create a Soluznode
 */
exports.create = function(req, res) {
	var soluznode = new Soluznode(req.body);
	soluznode.user = req.user;

	soluznode.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(soluznode);
		}
	});
};

/**
 * Show the current Soluznode
 */
exports.read = function(req, res) {
	res.jsonp(req.soluznode);
};

/**
 * Update a Soluznode
 */
exports.update = function(req, res) {
	var soluznode = req.soluznode;

	soluznode = _.extend(soluznode, req.body);

	soluznode.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(soluznode);
		}
	});
};

/**
 * Delete an Soluznode
 */
exports.delete = function(req, res) {
	var soluznode = req.soluznode;

	soluznode.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(soluznode);
		}
	});
};

/**
 * List of Soluznodes
 */
exports.list = function(req, res) {
	Soluznode.find().sort('-created').populate('user', 'displayName').exec(function(err, soluznodes) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(soluznodes);
		}
	});
};

/**
 * Soluznode middleware
 */
exports.soluznodeByID = function(req, res, next, id) {
	Soluznode.findById(id).populate('user', 'displayName').exec(function(err, soluznode) {
		if (err) return next(err);
		if (!soluznode) return next(new Error('Failed to load Soluznode ' + id));
		req.soluznode = soluznode;
		next();
	});
};

/**
 * Soluznode authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.soluznode.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};