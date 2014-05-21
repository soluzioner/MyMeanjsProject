'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Soluzproblem Schema
 */
var SoluzproblemSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Soluzproblem name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Soluzproblem', SoluzproblemSchema);