'use strict';

// Configuring the Articles module
angular.module('soluzsessions').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Soluzsessions', 'soluzsessions');
		Menus.addMenuItem('topbar', 'New Soluzsession', 'soluzsessions/create');
	}
]);