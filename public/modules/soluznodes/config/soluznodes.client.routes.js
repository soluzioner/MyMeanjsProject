'use strict';

//Setting up route
angular.module('soluznodes').config(['$stateProvider',
	function($stateProvider) {
		// Soluznodes state routing
		$stateProvider.
		state('listSoluznodes', {
			url: '/soluznodes',
			templateUrl: 'modules/soluznodes/views/list-soluznodes.client.view.html'
		}).
		state('createSoluznode', {
			url: '/soluznodes/create',
			templateUrl: 'modules/soluznodes/views/create-soluznode.client.view.html'
		}).
		state('viewSoluznode', {
			url: '/soluznodes/:soluznodeId',
			templateUrl: 'modules/soluznodes/views/view-soluznode.client.view.html'
		}).
		state('editSoluznode', {
			url: '/soluznodes/:soluznodeId/edit',
			templateUrl: 'modules/soluznodes/views/edit-soluznode.client.view.html'
		});
	}
]);