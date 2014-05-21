'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Soluznode Schema
 */
var SoluznodeSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Soluznode name',
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

mongoose.model('Soluznode', SoluznodeSchema);