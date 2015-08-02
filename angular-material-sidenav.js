/*global console*/

/**
 *
 * Angular Material Sidenav
 * https://github.com/sovanna/angular-material-sidenav
 * Licence MIT
 * (c) 2015 Sovanna Hing <sovanna.hing@gmail.com>
 *
 */
(function(window, angular, undefined) {
    'use strict';

    angular.module('sasrio.angular-material-sidenav', [])

    .provider('ssSideNavSections', function SSSideNavSectionsProvider() {
        var _sections = [];

        this.initWithSections = function(value) {
            _sections = value ? value : [];
        };

        this.$get = [function ssSideNavSectionsFactory()  {
            var SSSideNavSections = function() {
                this.sections = _sections;
            };

            return new SSSideNavSections();
        }];
    })

    .factory('ssSideNavSharedService', [
        '$rootScope',
        function($rootScope) {
            var _sharedService = {};

            _sharedService.broadcast = function(eventName, eventData) {
                $rootScope.$broadcast(eventName, eventData);
            };

            _sharedService.emit = function(eventName, eventData) {
                $rootScope.$emit(eventName, eventData);
            };

            return _sharedService;
        }
    ])

    .factory('ssSideNav', [
        '$rootScope',
        '$location',
        '$state',
        '$stateParams',
        'ssSideNavSections',
        function(
            $rootScope,
            $location,
            $state,
            $stateParams,
            ssSideNavSections) {

            var self,
                sections = ssSideNavSections.sections;

            var matchPage = function(section, page, newState) {
                var toParams = newState ? newState.toParams : null,
                    toState = newState ? newState.toState : null,
                    state_check;

                if (!toState) {
                    return console.warn('ss-sidenav: `toState` key not found');
                }

                if (!toParams) {
                    return console.warn('ss-sidenav: `toParams` key not found');
                }

                state_check = toState.name;

                if (Object.keys(toParams).length) {
                    state_check += '(' + JSON.stringify(toParams) + ')';
                } else {
                    state_check += '()';
                }

                if (state_check !== page.state) {
                    return;
                }

                if (!self) {
                    return;
                }

                self.selectSection(section);
                self.selectPage(section, page);
            };

            var onStateChangeStart = function(event, toState, toParams) {
                var newState = {
                    toState: toState,
                    toParams: toParams
                };

                sections.forEach(function(section) {
                    if (section.children) {
                        section.children.forEach(function(child) {
                            if (child.pages) {
                                child.pages.forEach(function(page) {
                                    matchPage(child, page, newState);
                                });
                            }
                        });
                    } else if (section.pages) {
                        section.pages.forEach(function(page) {
                            matchPage(section, page, newState);
                        });
                    } else if (section.type === 'link') {
                        matchPage(section, section, newState);
                    }
                });
            };

            self = {
                sections: sections,
                selectSection: function(section) {
                    self.openedSection = section;
                },
                toggleSelectSection: function(section) {
                    self.openedSection = (self.openedSection === section) ? null : section;
                },
                isSectionSelected: function(section) {
                    return self.openedSection === section;
                },
                selectPage: function(section, page) {
                    self.currentSection = section;
                    self.currentPage = page;
                },
                isPageSelected: function(page) {
                    return self.currentPage === page;
                }
            };

            $rootScope.$on('$stateChangeStart', onStateChangeStart);

            onStateChangeStart(null, $state.current, $stateParams);

            return self;
        }
    ])

    .controller('menuToggleCtrl', [
        '$scope',
        'ssSideNav',
        function(
            $scope,
            ssSideNav) {

            $scope.isOpen = function(section) {
                return ssSideNav.isSectionSelected(section);
            };

            $scope.toggle = function(section) {
                ssSideNav.toggleSelectSection(section);
            };

            this.isOpen = $scope.isOpen;
        }
    ])

    .controller('menuLinkCtrl', [
        '$scope',
        'ssSideNav',
        'ssSideNavSharedService',
        function(
            $scope,
            ssSideNav,
            ssSideNavSharedService) {

            $scope.isSelected = function(page) {
                return ssSideNav.isPageSelected(page);
            };

            $scope.focusSection = function(item) {
                ssSideNavSharedService.broadcast('SS_SIDENAV_CLICK_ITEM', item);
            };
        }
    ])

    .directive('menuLink', [
        function() {
            return {
                scope: {
                    section: '='
                },
                templateUrl: 'views/ss/menu-link.tmpl.html',
                controller: 'menuLinkCtrl'
            };
        }
    ])

    .directive('menuToggle', [
        '$timeout',
        '$animateCss',
        function(
            $timeout,
            $animateCss) {

            var link = function($scope, $element, $attr, $ctrl) {
                var _el_ul = $element.find('ul');

                var getTargetHeight = function() {
                    var _targetHeight;

                    _el_ul.addClass('no-transition');
                    _el_ul.css('height', '');

                    _targetHeight = _el_ul.prop('clientHeight');

                    _el_ul.css('height', 0);
                    _el_ul.removeClass('no-transition');

                    return _targetHeight;
                };

                if (!_el_ul) {
                    return console.warn('ss-sidenav: `menuToggle` cannot find ul element');
                }

                $scope.$watch(function() {
                    return $ctrl.isOpen($scope.section);
                }, function(open) {
                    $timeout(function() {
                        $animateCss(_el_ul, {
                            from: {
                                height: open ? 0 : (getTargetHeight() + 'px')
                            },
                            to: {
                                height: open ? (getTargetHeight() + 'px') : 0
                            },
                            duration: 0.3
                        }).start();
                    }, 0, false);
                });
            };

            return {
                scope: {
                    section: '='
                },
                templateUrl: 'views/ss/menu-toggle.tmpl.html',
                controller: 'menuToggleCtrl',
                link: link
            };
        }
    ])

    .directive('ssSidenav', [
        function () {
            return {
                restrict: 'E',
                scope: {
                    menu: '='
                },
                templateUrl: 'views/ss/menu-sidenav.tmpl.html'
            };
        }
    ])

    .run(['$templateCache', function($templateCache) {
        $templateCache.put('views/ss/menu-link.tmpl.html',
            '<md-button\n' +
            '   ng-class="{\'active\' : isSelected(section)}"\n' +
            '   class="md-raised md-primary"' +
            '   ui-sref="{{section.state}}"\n' +
            '   ng-click="focusSection(section)">\n' +
            '   {{section.name}}\n' +
            '   <span class="md-visually-hidden"\n' +
            '       ng-if="isSelected(section)">\n' +
            '       current page\n' +
            '   </span>\n' +
            '</md-button>\n'
        );

        $templateCache.put('views/ss/menu-toggle.tmpl.html',
            '<md-button class="md-raised md-primary md-button-toggle"\n' +
            '   ng-click="toggle(section)"\n' +
            '   aria-controls="docs-menu-{{section.name}}"\n' +
            '   aria-expanded="{{isOpen(section)}}">\n' +
            '   <div flex layout="row">\n' +
            '       {{section.name}}\n' +
            '       <span flex></span>\n' +
            '       <span aria-hidden="true" class="md-toggle-icon"\n' +
            '           ng-class="{\'toggled\' : isOpen(section)}">\n' +
            '           <md-icon md-svg-src="md-toggle-arrow"></md-icon>\n' +
            '       </span>\n' +
            '   </div>\n' +
            '   <span class="md-visually-hidden">\n' +
            '       Toggle {{isOpen(section)? \'expanded\' : \'collapsed\'}}\n' +
            '   </span>\n' +
            '</md-button>\n' +
            '\n' +
            '<ul id="docs-menu-{{section.name}}" class="menu-toggle-list">\n' +
            '   <li ng-repeat="page in section.pages">\n' +
            '       <menu-link section="page"></menu-link>\n' +
            '   </li>\n' +
            '</ul>\n'
        );

        $templateCache.put('views/ss/menu-sidenav.tmpl.html',
            '<ul class="menu">' +
            '    <li ng-repeat="section in menu.sections">' +
            '        <h2 class="menu-heading md-subhead" ng-if="section.type === \'heading\'">{{section.name}}</h2>' +
            '        <menu-link section="section" ng-if="section.type === \'link\'"></menu-link>' +
            '        <menu-toggle section="section" ng-if="section.type === \'toggle\'"></menu-toggle>' +
            '        <ul ng-if="section.children">' +
            '            <li ng-repeat="child in section.children">' +
            '                <menu-link section="child" ng-if="child.type === \'link\'"></menu-link>' +
            '                <menu-toggle section="child" ng-if="child.type === \'toggle\'"></menu-toggle>' +
            '            </li>' +
            '        </ul>' +
            '    </li>' +
            '</ul>'
        );
    }]);
})(window, window.angular);