'use strict';

//Soluzproblems service used to communicate Soluzproblems REST endpoints
angular.module('soluzproblems').factory('Soluzproblems', ['$resource', function($resource) {
    return $resource('soluzproblems/:soluzproblemId', {
        soluzproblemId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);