'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Soluzproblem = mongoose.model('Soluzproblem');

/**
 * Globals
 */
var user, soluzproblem ;

/**
 * Unit tests
 */
describe('Soluzproblem Model Unit Tests:', function() {
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
			soluzproblem = new Soluzproblem ({
				name: 'Soluzproblem Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return soluzproblem .save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			soluzproblem .name = '';

			return soluzproblem .save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Soluzproblem .remove().exec();

		User.remove().exec();
		done();
	});
});