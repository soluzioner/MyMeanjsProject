'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Soluzsession = mongoose.model('Soluzsession');

/**
 * Globals
 */
var user, soluzsession ;

/**
 * Unit tests
 */
describe('Soluzsession Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			soluzsession = new Soluzsession ({
				name: 'Soluzsession Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return soluzsession .save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			soluzsession .name = '';

			return soluzsession .save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Soluzsession .remove().exec();

		User.remove().exec();
		done();
	});
});