'use strict';

//Setting up route
angular.module('soluzsessions').config(['$stateProvider',
	function($stateProvider) {
		// Soluzsessions state routing
		$stateProvider.
		state('listSoluzsessions', {
			url: '/soluzsessions',
			templateUrl: 'modules/soluzsessions/views/list-soluzsessions.client.view.html'
		}).
		state('createSoluzsession', {
			url: '/soluzsessions/create',
			templateUrl: 'modules/soluzsessions/views/create-soluzsession.client.view.html'
		}).
		state('viewSoluzsession', {
			url: '/soluzsessions/:soluzsessionId',
			templateUrl: 'modules/soluzsessions/views/view-soluzsession.client.view.html'
		}).
		state('editSoluzsession', {
			url: '/soluzsessions/:soluzsessionId/edit',
			templateUrl: 'modules/soluzsessions/views/edit-soluzsession.client.view.html'
		});
	}
]);