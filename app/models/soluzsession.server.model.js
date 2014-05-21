'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Soluzsession Schema
 */
var SoluzsessionSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Soluzsession name',
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

mongoose.model('Soluzsession', SoluzsessionSchema);