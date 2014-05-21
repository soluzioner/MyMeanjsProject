'use strict';

//Setting up route
angular.module('soluzproblems').config(['$stateProvider',
	function($stateProvider) {
		// Soluzproblems state routing
		$stateProvider.
		state('listSoluzproblems', {
			url: '/soluzproblems',
			templateUrl: 'modules/soluzproblems/views/list-soluzproblems.client.view.html'
		}).
		state('createSoluzproblem', {
			url: '/soluzproblems/create',
			templateUrl: 'modules/soluzproblems/views/create-soluzproblem.client.view.html'
		}).
		state('viewSoluzproblem', {
			url: '/soluzproblems/:soluzproblemId',
			templateUrl: 'modules/soluzproblems/views/view-soluzproblem.client.view.html'
		}).
		state('editSoluzproblem', {
			url: '/soluzproblems/:soluzproblemId/edit',
			templateUrl: 'modules/soluzproblems/views/edit-soluzproblem.client.view.html'
		});
	}
]);