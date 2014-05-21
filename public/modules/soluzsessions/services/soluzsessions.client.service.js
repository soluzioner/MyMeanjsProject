'use strict';

//Soluzsessions service used to communicate Soluzsessions REST endpoints
angular.module('soluzsessions').factory('Soluzsessions', ['$resource', function($resource) {
    return $resource('soluzsessions/:soluzsessionId', {
        soluzsessionId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);