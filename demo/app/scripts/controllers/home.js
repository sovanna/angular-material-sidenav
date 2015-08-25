'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')

    .controller('HomeCtrl', [
        '$scope',
        '$timeout',
        'ssSideNav',
        function (
            $scope,
            $timeout,
            ssSideNav) {

            ssSideNav.setVisible('link_3', false);

            ssSideNav.setVisibleFor([{
                id: 'toogle_1_link_3',
                value: true
            }, {
                id: 'toogle_1_link_1',
                value: false
            }]);

            $timeout(function () {
                ssSideNav.setVisible('link_3', true);
            }, 1000 * 3);
	   }
    ]);