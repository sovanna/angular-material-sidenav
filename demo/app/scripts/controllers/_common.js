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
        '$timeout',
        '$rootScope',
        '$state',
        'ssSideNav',
        'ssSideNavSharedService',
        function (
            $scope,
            $mdSidenav,
            $timeout,
            $rootScope,
            $state,
            ssSideNav,
            ssSideNavSharedService) {

            var _perform_change_for_demo = function () {
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

                $timeout(function () {
                    ssSideNav.sections = [{
                        id: 'toogle_3',
                        name: 'Section Heading 3',
                        type: 'heading',
                        children: [{
                            name: 'Toogle 3',
                            type: 'toggle',
                            pages: [{
                                id: 'toogle_3_link_1',
                                name: 'item 1',
                                state: 'common.toggle3.item1'
                            }, {
                                id: 'toogle_3_link_2',
                                name: 'item 2',
                                state: 'common.toggle3.item2'
                            }]
                        }]
                    }];
                }, 1000 * 6);

                $timeout(function () {
                    ssSideNav.forceSelectionWithId('toogle_3_link_1');
                }, 1000 * 10);
            };

            $scope.onClickMenu = function () {
                $mdSidenav('left').toggle();
            };

            $scope.menu = ssSideNav;

            // Listen event SS_SIDENAV_CLICK_ITEM to close menu
            $rootScope.$on('SS_SIDENAV_CLICK_ITEM', function() {
                console.log('do whatever you want after click on item');
            });

            // _perform_change_for_demo();
        }
    ]);