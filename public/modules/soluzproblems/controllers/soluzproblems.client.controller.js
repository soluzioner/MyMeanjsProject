'use strict';

// Soluzproblems controller
angular.module('soluzproblems').controller('SoluzproblemsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Soluzproblems',
    function($scope, $stateParams, $location, Authentication, Soluzproblems) {
        $scope.authentication = Authentication;

        // Create new Soluzproblem
        $scope.create = function() {
        	// Create new Soluzproblem object
            var soluzproblem = new Soluzproblems({
                name: this.name
            });

            // Redirect after save
            soluzproblem.$save(function(response) {
                $location.path('soluzproblems/' + response._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

            // Clear form fields
            this.name = '';
        };

        // Remove existing Soluzproblem
        $scope.remove = function(soluzproblem) {
            if (soluzproblem) {
                soluzproblem.$remove();

                for (var i in $scope.soluzproblems) {
                    if ($scope.soluzproblems[i] === soluzproblem) {
                        $scope.soluzproblems.splice(i, 1);
                    }
                }
            } else {
                $scope.soluzproblem.$remove(function() {
                    $location.path('soluzproblems');
                });
            }
        };

        // Update existing Soluzproblem
        $scope.update = function() {
            var soluzproblem = $scope.soluzproblem;

            soluzproblem.$update(function() {
                $location.path('soluzproblems/' + soluzproblem._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
        };

        // Find a list of Soluzproblems
        $scope.find = function() {
            $scope.soluzproblems = Soluzproblems.query();
        };

        // Find existing Soluzproblem
        $scope.findOne = function() {
            $scope.soluzproblem = Soluzproblems.get({
                soluzproblemId: $stateParams.soluzproblemId
            });
        };
    }
]);