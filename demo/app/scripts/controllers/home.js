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

            ssSideNav.setVisible('link_3', true);

            ssSideNav.setVisibleFor([{
                id: 'toogle_1_link_2',
                value: true
            }, {
                id: 'toogle_1_link_1',
                value: false
            }]);

            $timeout(function () {
                ssSideNav.setVisible('toogle_2', false);
            }, 1000 * 3);
	   }
    ]);