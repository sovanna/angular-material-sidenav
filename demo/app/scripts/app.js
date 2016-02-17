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
                .primaryPalette('blue', {
                    'default': '700'
                });

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
                name: 'common.home',
                url: '/',
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            });

            $stateProvider.state({
                name: 'common.toggle1',
                url: '/toogle1',
                abstract: true,
                template: '<ui-view/>'
            });

            $stateProvider.state({
                name: 'common.toggle1.item1',
                url: '/item1',
                templateUrl: 'views/default.html',
                controller: function ($scope) {
                    $scope.model = {
                        title: 'Hello Toogle 1 Item 1'
                    };
                }
            });

            $stateProvider.state({
                name: 'common.toggle1.item2',
                url: '/item2',
                templateUrl: 'views/default.html',
                controller: function ($scope) {
                    $scope.model = {
                        title: 'Hello Toogle 1 Item 2'
                    };
                }
            });

            $stateProvider.state({
                name: 'common.toggle1.item3',
                url: '/item3',
                templateUrl: 'views/default.html',
                controller: function ($scope) {
                    $scope.model = {
                        title: 'Hello Toogle 1 Item 3'
                    };
                }
            });

            $stateProvider.state({
                name: 'common.link1',
                url: '/link1',
                templateUrl: 'views/default.html',
                controller: function ($scope) {
                    $scope.model = {
                        title: 'Hello Link 1'
                    };
                }
            });

            $stateProvider.state({
                name: 'common.link2',
                url: '/link2',
                templateUrl: 'views/default.html',
                controller: function ($scope) {
                    $scope.model = {
                        title: 'Hello Link 2'
                    };
                }
            });

            $stateProvider.state({
                name: 'common.link2.edit',
                url: '/edit',
                templateUrl: 'views/default.html',
                controller: function ($scope) {
                    $scope.model = {
                        title: 'Hello Link 2'
                    };
                }
            });

            $stateProvider.state({
                name: 'common.link3',
                url: '/link3',
                templateUrl: 'views/default.html',
                controller: function ($scope) {
                    $scope.model = {
                        title: 'Hello Link 3'
                    };
                }
            });

            $stateProvider.state({
                name: 'common.toggle2',
                url: '/toogle2',
                abstract: true,
                template: '<ui-view/>'
            });

            $stateProvider.state({
                name: 'common.toggle2.item1',
                url: '/item1',
                templateUrl: 'views/default.html',
                controller: function ($scope) {
                    $scope.model = {
                        title: 'Hello Toogle 2 Item 1'
                    };
                }
            });

            $stateProvider.state({
                name: 'common.toggle3',
                url: '/toogle3',
                abstract: true,
                template: '<ui-view/>'
            });

            $stateProvider.state({
                name: 'common.toggle3.item1',
                url: '/item1',
                templateUrl: 'views/default.html',
                controller: function ($scope) {
                    $scope.model = {
                        title: 'Hello Toogle 3 Item 1'
                    };
                }
            });

            $stateProvider.state({
                name: 'common.toggle3.item2',
                url: '/item2',
                templateUrl: 'views/default.html',
                controller: function ($scope) {
                    $scope.model = {
                        title: 'Hello Toogle 3 Item 2'
                    };
                }
            });

            ssSideNavSectionsProvider.initWithTheme($mdThemingProvider);
            ssSideNavSectionsProvider.initWithSections([{
                id: 'toogle_1',
                name: 'Section Heading 1',
                type: 'heading',
                children: [{
                    name: 'Toogle 1',
                    type: 'toggle',
                    pages: [{
                        id: 'toogle_1_link_1',
                        name: 'item 1',
                        state: 'common.toggle1.item1'
                    }, {
                        id: 'toogle_1_link_2',
                        name: 'item 2',
                        state: 'common.toggle1.item2',
                        hidden: true
                    }, {
                        id: 'toogle_1_link_3',
                        name: 'item 3',
                        state: 'common.toggle1.item3'
                    }]
                }]
            }, {
                id: 'link_1',
                name: 'Link 1 ',
                state: 'common.link1',
                type: 'link',
                icon: 'fa fa-check'
            }, {
                id: 'link_2',
                name: 'Link 2',
                state: 'common.link2',
                type: 'link'
            }, {
                id: 'link_3',
                name: 'Link 3',
                state: 'common.link3',
                type: 'link',
                hidden: true
            },  {
                id: 'toogle_2',
                name: 'Section Heading 2',
                type: 'heading',
                children: [{
                    name: 'Toogle 2',
                    type: 'toggle',
                    pages: [{
                        id: 'toogle_2_link_1',
                        name: 'item 1',
                        state: 'common.toggle2.item1'
                    }]
                }]
            }]);
        }
    ]);