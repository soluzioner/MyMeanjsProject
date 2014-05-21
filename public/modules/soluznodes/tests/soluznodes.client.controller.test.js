'use strict';

(function() {
	// Soluznodes Controller Spec
	describe('Soluznodes Controller Tests', function() {
		// Initialize global variables
		var SoluznodesController,
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

			// Initialize the Soluznodes controller.
			SoluznodesController = $controller('SoluznodesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Soluznode object fetched from XHR', inject(function(Soluznodes) {
			// Create sample Soluznode using the Soluznodes service
			var sampleSoluznode = new Soluznodes({
				name: 'New Soluznode'
			});

			// Create a sample Soluznodes array that includes the new Soluznode
			var sampleSoluznodes = [sampleSoluznode];

			// Set GET response
			$httpBackend.expectGET('soluznodes').respond(sampleSoluznodes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.soluznodes).toEqualData(sampleSoluznodes);
		}));

		it('$scope.findOne() should create an array with one Soluznode object fetched from XHR using a soluznodeId URL parameter', inject(function(Soluznodes) {
			// Define a sample Soluznode object
			var sampleSoluznode = new Soluznodes({
				name: 'New Soluznode'
			});

			// Set the URL parameter
			$stateParams.soluznodeId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/soluznodes\/([0-9a-fA-F]{24})$/).respond(sampleSoluznode);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.soluznode).toEqualData(sampleSoluznode);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Soluznodes) {
			// Create a sample Soluznode object
			var sampleSoluznodePostData = new Soluznodes({
				name: 'New Soluznode'
			});

			// Create a sample Soluznode response
			var sampleSoluznodeResponse = new Soluznodes({
				_id: '525cf20451979dea2c000001',
				name: 'New Soluznode'
			});

			// Fixture mock form input values
			scope.name = 'New Soluznode';

			// Set POST response
			$httpBackend.expectPOST('soluznodes', sampleSoluznodePostData).respond(sampleSoluznodeResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Soluznode was created
			expect($location.path()).toBe('/soluznodes/' + sampleSoluznodeResponse._id);
		}));

		it('$scope.update() should update a valid Soluznode', inject(function(Soluznodes) {
			// Define a sample Soluznode put data
			var sampleSoluznodePutData = new Soluznodes({
				_id: '525cf20451979dea2c000001',
				name: 'New Soluznode'
			});

			// Mock Soluznode in scope
			scope.soluznode = sampleSoluznodePutData;

			// Set PUT response
			$httpBackend.expectPUT(/soluznodes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/soluznodes/' + sampleSoluznodePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid soluznodeId and remove the Soluznode from the scope', inject(function(Soluznodes) {
			// Create new Soluznode object
			var sampleSoluznode = new Soluznodes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Soluznodes array and include the Soluznode
			scope.soluznodes = [sampleSoluznode];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/soluznodes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSoluznode);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.soluznodes.length).toBe(0);
		}));
	});
}());