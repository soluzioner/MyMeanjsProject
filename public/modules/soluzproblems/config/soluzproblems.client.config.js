'use strict';

// Configuring the Articles module
angular.module('soluzproblems').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Soluzproblems', 'soluzproblems');
		Menus.addMenuItem('topbar', 'New Soluzproblem', 'soluzproblems/create');
	}
]);