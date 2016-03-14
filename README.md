# angular-material-sidenav

Simple component that reproduce the Angular Material Style SideNav Menu from their own website [material.angularjs.org](https://material.angularjs.org/).
Available [Demo](http://sovanna.github.io/angular-material-sidenav/demo/dist)

##### 1. Installation

	bower install angular-material-sidenav --save

##### 2. Configuration

add `sasrio.angular-material-sidenav`  to your main module's list of dependencies

	angular.module('myApp', ['sasrio.angular-material-sidenav'])

use the `ssSideNavSectionsProvider` as a **provider** to config your menu items

	ssSideNavSectionsProvider.initWithSections([{
		id:		'toogle_1',
		name:	'Section Heading 1',
		type:	'heading',
		children: [{
			name:	'Toogle 1',
			type:	'toggle',
			pages:	[{
				id:		'toggle_item_1',
				name:	'item 1',
				state:	'common.toggle.item1'
			}, {
				id:		'toggle_item_2',
				name:	'item 2',
				state:	'common.toggle.item2'
			}]
		}]
	}, {
		id:			'link_1',
		name:		'Simple link to Index state',
		state:		'common.index',
		type:		'link',
		hidden:	true // show menu ('true' for hide menu)
	}]);

**by default, if hidden property is not set, item will be displayed. So to hide one, just pass property to true.**

Also, provide to module the `$mdThemingProvider` in order to get same colors

	ssSideNavSectionsProvider.initWithTheme($mdThemingProvider);

You can check the [demo source code of app.js](https://github.com/sovanna/angular-material-sidenav/blob/master/demo/app/scripts/app.js) to see more on how you can add items

##### 3. Usage

In order to display your sidenav menu, use the factory `ssSideNav` to get **all sections** and send them into the directive , example :

**note: update the components to the lastest as some of the implementations have changed (e.g method changeSectionVisible no more exist)**)

	// in your controller, add the factory ssSideNav
	angular.module('app.controller', [
		'$timeout',
	  	'ssSideNav',
	  	function ($timeout, ssSideNav) {
	    	$scope.menu = ssSideNav;

			// Show or Hide menu
			ssSideNav.setVisible('link_1');
			ssSideNav.setVisibleFor([{
			  id: 'toggle_item_1',
			  value: true
			}, {
			  id: 'link_1',
			  value: false
			}]);

			$timeout(function () {
			  ssSideNav.setVisible('toogle_2', false);
			});

			$timeout(function () {
				// force selection on child dropdown menu item and select its state too.
				ssSideNav.forceSelectionWithId('toogle_1_link_2');
			}, 1000 * 3);
	  }
	]);

and of course, in your html view:

	<ss-sidenav menu="menu"></ss-sidenav>

##### 4. Customization

Colors are handle using a **directive** from the gist [dh94 mdStyleColor](https://gist.github.com/dh94/517187e03fdde3c18103)

All sidenav is builded using the **primary** color configured with `$mdThemingProvider.

If you look the source code, you can easily add new template item, new kind of items and so on...
