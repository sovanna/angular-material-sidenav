# angular-material-sidenav

A simple component that takes all pieces of angular doc source code to build in a single file the **sidenav menu** they used in their own website.


##### 1. install

	bower install angular-material-sidenav --save
	
##### 2. configuration

add `sasrio.angular-material-sidenav` as a dep on your app
	
	angular.module('myApp', ['sasrio.angular-material-sidenav']).config..etc
	
use the `ssSideNavSectionsProvider` to config your menu

	ssSideNavSectionsProvider.initWithSections([{
		name: 'Section Heading 1',
		type: 'heading',
		children: [{
			name: 'Toogle 1',
			type: 'toggle',
			pages: [{
				name: 'item 1',
				state: 'common.index'
			}, {
				name: 'item 2',
				state: 'common.index'
			}]
		}]
	}, {
		name: 'Simple link to Index state',
		state: 'common.index,
		type: 'link'
	}]);
	
##### 3. use

in your main controller, simply use the factory `ssSideNav` (add the dep in your controller as usual), then :

	$scope.menu = ssSideNav;
	
and of course, in your html view,

	<ss-sidenav menu="menu"></ss-sidenav>

##### 4. customization

the default color used is the blue as a primaryPalette.

I suggest you to also override the css to really do what you want.