'use strict';

// Soluznodes controller
angular.module('soluznodes').controller('SoluznodesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Soluznodes',
    function($scope, $stateParams, $location, Authentication, Soluznodes) {
        $scope.authentication = Authentication;

        // Create new Soluznode
        $scope.create = function() {
        	// Create new Soluznode object
            var soluznode = new Soluznodes({
                name: this.name
            });

            // Redirect after save
            soluznode.$save(function(response) {
                $location.path('soluznodes/' + response._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

            // Clear form fields
            this.name = '';
        };

        // Remove existing Soluznode
        $scope.remove = function(soluznode) {
            if (soluznode) {
                soluznode.$remove();

                for (var i in $scope.soluznodes) {
                    if ($scope.soluznodes[i] === soluznode) {
                        $scope.soluznodes.splice(i, 1);
                    }
                }
            } else {
                $scope.soluznode.$remove(function() {
                    $location.path('soluznodes');
                });
            }
        };

        // Update existing Soluznode
        $scope.update = function() {
            var soluznode = $scope.soluznode;

            soluznode.$update(function() {
                $location.path('soluznodes/' + soluznode._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
        };

        // Find a list of Soluznodes
        $scope.find = function() {
            $scope.soluznodes = Soluznodes.query();
        };

        // Find existing Soluznode
        $scope.findOne = function() {
            $scope.soluznode = Soluznodes.get({
                soluznodeId: $stateParams.soluznodeId
            });
        };
    }
]);