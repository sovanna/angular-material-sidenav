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
        '$rootScope',
        '$mdColorPalette',
        '$mdSidenav',
        'ssSideNav',
        function (
            $scope,
            $rootScope,
            $mdColorPalette,
            $mdSidenav,
            ssSideNav) {

            $rootScope.getMaterialColor = function (base, shade) {
                var color = $mdColorPalette[base][shade].value;
                return 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
            };

            $scope.onClickMenu = function () {
                $mdSidenav('left').toggle();
            };

            $scope.menu = ssSideNav;

            $scope.primaryColor = $rootScope.getMaterialColor('blue', 500);
        }
    ]);