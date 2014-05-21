'use strict';

(function() {
	// Soluzproblems Controller Spec
	describe('Soluzproblems Controller Tests', function() {
		// Initialize global variables
		var SoluzproblemsController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Soluzproblems controller.
			SoluzproblemsController = $controller('SoluzproblemsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Soluzproblem object fetched from XHR', inject(function(Soluzproblems) {
			// Create sample Soluzproblem using the Soluzproblems service
			var sampleSoluzproblem = new Soluzproblems({
				name: 'New Soluzproblem'
			});

			// Create a sample Soluzproblems array that includes the new Soluzproblem
			var sampleSoluzproblems = [sampleSoluzproblem];

			// Set GET response
			$httpBackend.expectGET('soluzproblems').respond(sampleSoluzproblems);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.soluzproblems).toEqualData(sampleSoluzproblems);
		}));

		it('$scope.findOne() should create an array with one Soluzproblem object fetched from XHR using a soluzproblemId URL parameter', inject(function(Soluzproblems) {
			// Define a sample Soluzproblem object
			var sampleSoluzproblem = new Soluzproblems({
				name: 'New Soluzproblem'
			});

			// Set the URL parameter
			$stateParams.soluzproblemId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/soluzproblems\/([0-9a-fA-F]{24})$/).respond(sampleSoluzproblem);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.soluzproblem).toEqualData(sampleSoluzproblem);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Soluzproblems) {
			// Create a sample Soluzproblem object
			var sampleSoluzproblemPostData = new Soluzproblems({
				name: 'New Soluzproblem'
			});

			// Create a sample Soluzproblem response
			var sampleSoluzproblemResponse = new Soluzproblems({
				_id: '525cf20451979dea2c000001',
				name: 'New Soluzproblem'
			});

			// Fixture mock form input values
			scope.name = 'New Soluzproblem';

			// Set POST response
			$httpBackend.expectPOST('soluzproblems', sampleSoluzproblemPostData).respond(sampleSoluzproblemResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Soluzproblem was created
			expect($location.path()).toBe('/soluzproblems/' + sampleSoluzproblemResponse._id);
		}));

		it('$scope.update() should update a valid Soluzproblem', inject(function(Soluzproblems) {
			// Define a sample Soluzproblem put data
			var sampleSoluzproblemPutData = new Soluzproblems({
				_id: '525cf20451979dea2c000001',
				name: 'New Soluzproblem'
			});

			// Mock Soluzproblem in scope
			scope.soluzproblem = sampleSoluzproblemPutData;

			// Set PUT response
			$httpBackend.expectPUT(/soluzproblems\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/soluzproblems/' + sampleSoluzproblemPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid soluzproblemId and remove the Soluzproblem from the scope', inject(function(Soluzproblems) {
			// Create new Soluzproblem object
			var sampleSoluzproblem = new Soluzproblems({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Soluzproblems array and include the Soluzproblem
			scope.soluzproblems = [sampleSoluzproblem];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/soluzproblems\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSoluzproblem);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.soluzproblems.length).toBe(0);
		}));
	});
}());