'use strict';

(function() {
	// Soluzsessions Controller Spec
	describe('Soluzsessions Controller Tests', function() {
		// Initialize global variables
		var SoluzsessionsController,
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

			// Initialize the Soluzsessions controller.
			SoluzsessionsController = $controller('SoluzsessionsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Soluzsession object fetched from XHR', inject(function(Soluzsessions) {
			// Create sample Soluzsession using the Soluzsessions service
			var sampleSoluzsession = new Soluzsessions({
				name: 'New Soluzsession'
			});

			// Create a sample Soluzsessions array that includes the new Soluzsession
			var sampleSoluzsessions = [sampleSoluzsession];

			// Set GET response
			$httpBackend.expectGET('soluzsessions').respond(sampleSoluzsessions);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.soluzsessions).toEqualData(sampleSoluzsessions);
		}));

		it('$scope.findOne() should create an array with one Soluzsession object fetched from XHR using a soluzsessionId URL parameter', inject(function(Soluzsessions) {
			// Define a sample Soluzsession object
			var sampleSoluzsession = new Soluzsessions({
				name: 'New Soluzsession'
			});

			// Set the URL parameter
			$stateParams.soluzsessionId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/soluzsessions\/([0-9a-fA-F]{24})$/).respond(sampleSoluzsession);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.soluzsession).toEqualData(sampleSoluzsession);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Soluzsessions) {
			// Create a sample Soluzsession object
			var sampleSoluzsessionPostData = new Soluzsessions({
				name: 'New Soluzsession'
			});

			// Create a sample Soluzsession response
			var sampleSoluzsessionResponse = new Soluzsessions({
				_id: '525cf20451979dea2c000001',
				name: 'New Soluzsession'
			});

			// Fixture mock form input values
			scope.name = 'New Soluzsession';

			// Set POST response
			$httpBackend.expectPOST('soluzsessions', sampleSoluzsessionPostData).respond(sampleSoluzsessionResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Soluzsession was created
			expect($location.path()).toBe('/soluzsessions/' + sampleSoluzsessionResponse._id);
		}));

		it('$scope.update() should update a valid Soluzsession', inject(function(Soluzsessions) {
			// Define a sample Soluzsession put data
			var sampleSoluzsessionPutData = new Soluzsessions({
				_id: '525cf20451979dea2c000001',
				name: 'New Soluzsession'
			});

			// Mock Soluzsession in scope
			scope.soluzsession = sampleSoluzsessionPutData;

			// Set PUT response
			$httpBackend.expectPUT(/soluzsessions\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/soluzsessions/' + sampleSoluzsessionPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid soluzsessionId and remove the Soluzsession from the scope', inject(function(Soluzsessions) {
			// Create new Soluzsession object
			var sampleSoluzsession = new Soluzsessions({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Soluzsessions array and include the Soluzsession
			scope.soluzsessions = [sampleSoluzsession];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/soluzsessions\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSoluzsession);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.soluzsessions.length).toBe(0);
		}));
	});
}());