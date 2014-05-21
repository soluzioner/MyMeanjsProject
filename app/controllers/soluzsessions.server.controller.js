'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Soluzsession = mongoose.model('Soluzsession'),
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
				message = 'Soluzsession already exists';
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
 * Create a Soluzsession
 */
exports.create = function(req, res) {
	var soluzsession = new Soluzsession(req.body);
	soluzsession.user = req.user;

	soluzsession.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(soluzsession);
		}
	});
};

/**
 * Show the current Soluzsession
 */
exports.read = function(req, res) {
	res.jsonp(req.soluzsession);
};

/**
 * Update a Soluzsession
 */
exports.update = function(req, res) {
	var soluzsession = req.soluzsession;

	soluzsession = _.extend(soluzsession, req.body);

	soluzsession.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(soluzsession);
		}
	});
};

/**
 * Delete an Soluzsession
 */
exports.delete = function(req, res) {
	var soluzsession = req.soluzsession;

	soluzsession.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(soluzsession);
		}
	});
};

/**
 * List of Soluzsessions
 */
exports.list = function(req, res) {
	Soluzsession.find().sort('-created').populate('user', 'displayName').exec(function(err, soluzsessions) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(soluzsessions);
		}
	});
};

/**
 * Soluzsession middleware
 */
exports.soluzsessionByID = function(req, res, next, id) {
	Soluzsession.findById(id).populate('user', 'displayName').exec(function(err, soluzsession) {
		if (err) return next(err);
		if (!soluzsession) return next(new Error('Failed to load Soluzsession ' + id));
		req.soluzsession = soluzsession;
		next();
	});
};

/**
 * Soluzsession authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.soluzsession.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};