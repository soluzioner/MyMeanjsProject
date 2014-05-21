'use strict';

//Soluznodes service used to communicate Soluznodes REST endpoints
angular.module('soluznodes').factory('Soluznodes', ['$resource', function($resource) {
    return $resource('soluznodes/:soluznodeId', {
        soluznodeId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);