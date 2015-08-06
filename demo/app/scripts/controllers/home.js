'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
    .controller('HomeCtrl', ['$scope', 'ssSideNav', function ($scope, ssSideNav) {

		ssSideNav.changeSectionVisible('link_3');
		ssSideNav.changeSectionVisible(['toogle_1_link_3', 'toogle_1_link_1']);

	}]);