'use strict';

// Configuring the Articles module
angular.module('groups').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Groups', 'groups');
		Menus.addMenuItem('topbar', 'New Group', 'groups/create');
	}
]);