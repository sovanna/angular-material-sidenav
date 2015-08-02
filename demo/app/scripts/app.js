'use strict';

/**
 * @ngdoc overview
 * @name demoApp
 * @description
 * # demoApp
 *
 * Main module of the application.
 */
angular
    .module('demoApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngMaterial',
        'ui.router',
        'sasrio.angular-material-sidenav'
    ])
    .config([
        '$mdThemingProvider',
        '$locationProvider',
        '$urlRouterProvider',
        '$stateProvider',
        'ssSideNavSectionsProvider',
        function (
            $mdThemingProvider,
            $locationProvider,
            $urlRouterProvider,
            $stateProvider,
            ssSideNavSectionsProvider) {

            $mdThemingProvider
                .theme('default')
                .primaryPalette('blue');

            $urlRouterProvider.otherwise(function () {
                return '/';
            });

            $stateProvider.state({
                name: 'common',
                abstract: true,
                templateUrl: 'views/_common.html',
                controller: 'CommonCtrl'
            });

            $stateProvider.state({
                name: 'common.index',
                url: '/',
                templateUrl: 'views/index.html',
                controller: 'IndexCtrl'
            });

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
                name: 'Link to index 1 ',
                state: 'common.index',
                type: 'link'
            }, {
                name: 'Link to index 2',
                state: 'common.index',
                type: 'link'
            }, {
                name: 'Toogle 2',
                type: 'toggle',
                pages: [{
                    name: 'item 1',
                    state: 'common.index'
                }, {
                    name: 'item 2',
                    state: 'common.index'
                }, {
                    name: 'item 3',
                    state: 'common.index'
                }]
            }, {
                name: 'Link to index 1',
                state: 'common.index',
                type: 'link'
            }, {
                name: 'Section Heading 2',
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
                    }, {
                        name: 'item 3',
                        state: 'common.index'
                    },]
                }]
            }]);
        }
    ]);