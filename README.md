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
		name: 'Section Heading 1',
		type: 'heading',
		children: [{
			name: 'Toogle 1',
			type: 'toggle',
			pages: [{
				name: 'item 1',
				state: 'common.toggle.item1'
			}, {
				name: 'item 2',
				state: 'common.toggle.item2'
			}]
		}]
	}, {
		name: 'Simple link to Index state',
		state: 'common.index,
		type: 'link'
	}]);
	
Also, provide to module the `$mdThemingProvider` in order to get same colors

	ssSideNavSectionsProvider.initWithTheme($mdThemingProvider);
	
You can check the [demo source code of app.js](https://github.com/sovanna/angular-material-sidenav/blob/master/demo/app/scripts/app.js) to see more on how you can add items
	
##### 3. Usage

In order to display your sidenav menu, use the factory `ssSideNav` to get **all sections** and send them into the directive , example :

	// in your controller, add the factory ssSideNav
	angular.module('app.controller', [
	  'ssSideNav',
	  function (ssSideNav) {
	    $scope.menu = ssSideNav;
	  }
	]);

and of course, in your html view:

	<ss-sidenav menu="menu"></ss-sidenav>

##### 4. Customization

Colors are handle using a **directive** from the gist [dh94 mdStyleColor](https://gist.github.com/dh94/517187e03fdde3c18103)

All sidenav is builded using the **primary** color configured with `$mdThemingProvider.

If you look the source code, you can easily add new template item, new kind of items and so on...
