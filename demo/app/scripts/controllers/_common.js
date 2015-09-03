'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:CommonCtrl
 * @description
 * # CommonCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
    .controller('CommonCtrl', [
        '$scope',
        '$mdSidenav',
        'ssSideNav',
        'ssSideNavSharedService',
        '$rootScope',
        function (
            $scope,
            $mdSidenav,
            ssSideNav,
            ssSideNavSharedService,
            $rootScope) {

            $scope.onClickMenu = function () {
                $mdSidenav('left').toggle();
            };

            $scope.menu = ssSideNav;

            // Listen event SS_SIDENAV_CLICK_ITEM to close menu
            $rootScope.$on('SS_SIDENAV_CLICK_ITEM', function() {
                $mdSidenav('left').close();
            });
        }
    ]);