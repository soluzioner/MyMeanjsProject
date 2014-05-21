'use strict';

// Soluzsessions controller
angular.module('soluzsessions').controller('SoluzsessionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Soluzsessions',
    function($scope, $stateParams, $location, Authentication, Soluzsessions) {
        $scope.authentication = Authentication;

        // Create new Soluzsession
        $scope.create = function() {
        	// Create new Soluzsession object
            var soluzsession = new Soluzsessions({
                name: this.name
            });

            // Redirect after save
            soluzsession.$save(function(response) {
                $location.path('soluzsessions/' + response._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

            // Clear form fields
            this.name = '';
        };

        // Remove existing Soluzsession
        $scope.remove = function(soluzsession) {
            if (soluzsession) {
                soluzsession.$remove();

                for (var i in $scope.soluzsessions) {
                    if ($scope.soluzsessions[i] === soluzsession) {
                        $scope.soluzsessions.splice(i, 1);
                    }
                }
            } else {
                $scope.soluzsession.$remove(function() {
                    $location.path('soluzsessions');
                });
            }
        };

        // Update existing Soluzsession
        $scope.update = function() {
            var soluzsession = $scope.soluzsession;

            soluzsession.$update(function() {
                $location.path('soluzsessions/' + soluzsession._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
        };

        // Find a list of Soluzsessions
        $scope.find = function() {
            $scope.soluzsessions = Soluzsessions.query();
        };

        // Find existing Soluzsession
        $scope.findOne = function() {
            $scope.soluzsession = Soluzsessions.get({
                soluzsessionId: $stateParams.soluzsessionId
            });
        };
    }
]);