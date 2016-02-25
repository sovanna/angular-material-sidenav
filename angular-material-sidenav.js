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
        var _sections = [],
            _theme,
            _palettes;

        this.initWithSections = function(value) {
            _sections = value ? value : [];
        };

        this.initWithTheme = function (value) {
            _theme = value.theme();
            _palettes = value._PALETTES;
        };

        this.$get = [function ssSideNavSectionsFactory() {
            var SSSideNavSections = function() {
                this.sections = _sections;
                this.theme = _theme;
                this.palettes = _palettes;
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
        'ssSideNavSharedService',
        function(
            $rootScope,
            $location,
            $state,
            $stateParams,
            ssSideNavSections,
            ssSideNavSharedService) {

            var self,
                sections = ssSideNavSections.sections;

            var matchPage = function(section, page, newState) {
                var toState = newState ? newState.toState : null;

                if (!toState) {
                    return console.warn('ss-sidenav: `toState` key not found');
                }

                if (toState.name !== page.state) {
                    return;
                }

                if (!self) {
                    console.warn('ss-sidenav: strange `self` is undef');
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
                            } else if (child.type === 'link') {
                                matchPage(child, child, newState);
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
                forceSelectionWithId: function (id) {
                    ssSideNavSharedService.broadcast('SS_SIDENAV_FORCE_SELECTED_ITEM', id);
                },
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
                    return self.currentPage ? self.currentPage.state === page : false;
                },
                setVisible: function (id, value) {
                    if (!Array.prototype.every) {
                        // TODO prototyp for every,
                        // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every;
                        return console.error('every funct not implemented');
                    }

                    self.sections.every(function (section) {
                        if (section.id === id) {
                            section.hidden = !value;
                            return false;
                        }

                        if (section.children) {
                            section.children.every(function (child) {
                                if (child.id === id) {
		                            child.hidden = !value;
		                            return false;
		                        };

                                if (child.pages) {
                                    child.pages.every(function (page) {
                                        if (page.id === id) {
                                            page.hidden = !value;
                                            return false;
                                        }

                                        return true;
                                    });
                                }

                                return true;
                            });
                        }

                        return true;
                    });
                },
                setVisibleFor: function (ids) {
                    if (!Array.prototype.every) {
                        // TODO prototyp for every,
                        // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every;
                        return console.error('every funct not implemented');
                    }

                    ids.forEach(function (id) {
                        self.setVisible(id.id, id.value);
                    });
                }
            };

            $rootScope.$on('$stateChangeStart', onStateChangeStart);

            onStateChangeStart(null, $state.current, $stateParams);

            return self;
        }
    ])

    .controller('menuToggleCtrl', [
        '$scope',
        '$state',
        'ssSideNav',
        function(
            $scope,
            $state,
            ssSideNav) {

            $scope.isOpen = function(section) {
                return ssSideNav.isSectionSelected(section);
            };

            $scope.toggle = function(section) {
                ssSideNav.toggleSelectSection(section);
            };

            this.isOpen = $scope.isOpen;

            $scope.$on('SS_SIDENAV_FORCE_SELECTED_ITEM', function (event, args) {
                if ($scope.section && $scope.section.pages) {
                    for (var i = $scope.section.pages.length - 1; i >= 0; i--) {
                        var _e = $scope.section.pages[i];

                        if (args === _e.id) {
                            $scope.toggle($scope.section);
                            $state.go(_e.state);
                        }
                    };
                }
            });
        }
    ])

    .controller('menuLinkCtrl', [
        '$scope',
        '$state',
        '$mdSidenav',
        'ssSideNav',
        'ssSideNavSharedService',
        function(
            $scope,
            $state,
            $mdSidenav,
            ssSideNav,
            ssSideNavSharedService) {

            $scope.isSelected = function(page) {
                return ssSideNav.isPageSelected(page);
            };

            $scope.focusSection = function(item) {
                $mdSidenav('left').close();
                ssSideNavSharedService.broadcast('SS_SIDENAV_CLICK_ITEM', item);
            };

            $scope.$state = $state;
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
        '$mdSidenav',
        '$mdMedia',
        function(
            $timeout,
            $animateCss,
            $mdSidenav,
            $mdMedia) {

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
                        if (!$mdMedia('gt-sm') && !$mdSidenav('left').isOpen() && open) {
                            return;
                        }

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
                replace: true,
                scope: {
                    menu: '='
                },
                templateUrl: 'views/ss/menu-sidenav.tmpl.html'
            };
        }
    ])

    .directive('ssStyleColor', [
        'ssSideNavSections',
        function (ssSideNavSections) {
            return {
                restrict: 'A',
                scope: {
                    ssStyleColor: '='
                },
                link: function ($scope, $el) {

                    var _apply_color = function () {
                        for (var p in $scope.ssStyleColor) {
                            if ($scope.ssStyleColor.hasOwnProperty(p)) {
                                var themeColors = ssSideNavSections.theme.colors,
                                    split = ($scope.ssStyleColor[p] || '').split('.'),
                                    hueR,
                                    colorR,
                                    colorA,
                                    hueA,
                                    colorValue;

                                if (split.length < 2) {
                                    split.unshift('primary');
                                }

                                hueR = split[1] || 'hue-1'; // 'hue-1'
                                colorR = split[0] || 'primary'; // 'warn'

                                // Absolute color: 'orange'
                                colorA = themeColors[colorR] ? themeColors[colorR].name : colorR;

                                // Absolute Hue: '500'
                                hueA = themeColors[colorR] ? (themeColors[colorR].hues[hueR] || hueR) : hueR;

                                colorValue = ssSideNavSections.palettes[colorA][hueA] ? ssSideNavSections.palettes[colorA][hueA].value : ssSideNavSections.palettes[colorA]['500'].value;

                                $el.css(p, 'rgb(' + colorValue.join(',') + ')');

                                // Add color to md-sidenav
                                if($el.parent().attr('md-component-id')) $el.parent().css(p, 'rgb(' + colorValue.join(',') + ')');
                            }
                        }
                    };

                    if (!ssSideNavSections.theme || !ssSideNavSections.palettes) {
                        return console.warn('ss-sidenav: you probably want to ssSideNavSectionsProvider.initWithTheme($mdThemingProvider)');
                    }

                    $scope.$watch('ssStyleColor', function (oldVal, newVal) {
                        if ((oldVal && newVal) && oldVal !== newVal) {
                            _apply_color();
                        }
                    });

                    _apply_color();
                }
            };
        }
    ])

    .run(['$templateCache', function($templateCache) {
        $templateCache.put('views/ss/menu-link.tmpl.html',
            '<md-button\n' +
            '   ss-style-color="{\'background-color\': (isSelected(section.state) || $state.includes(section.state)) ? \'primary.800\': \'primary.default\'}"' +
            '   class="md-raised md-primary"' +
            '   ui-sref="{{section.state}}"\n' +
            '   ng-click="focusSection(section)">\n' +
            '   <span ng-if="section.icon" class="{{section.icon}}">&nbsp;&nbsp;</span>{{section.name}}\n' +
            '   <span class="md-visually-hidden"\n' +
            '       ng-if="isSelected(section.state)">\n' +
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
            '       <span ng-if="section.icon" class="{{section.icon}}">&nbsp;&nbsp;</span>{{section.name}}\n' +
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
            '   <li ng-repeat="page in section.pages" ng-if="!page.hidden">\n' +
            '       <menu-link section="page"></menu-link>\n' +
            '   </li>\n' +
            '</ul>\n'
        );

        $templateCache.put('views/ss/menu-sidenav.tmpl.html',
            '<ul class="menu">' +
            '    <li ss-style-color="{\'border-bottom-color\': \'primary.600\'}" ng-repeat="section in menu.sections" ng-if="!section.hidden">' +
            '        <h2 ss-style-color="{\'color\': \'primary.A100\'}" class="menu-heading md-subhead" ng-if="section.type === \'heading\'">' +
            '            <span ng-if="section.icon" class="{{section.icon}}">&nbsp;&nbsp;</span>{{section.name}}\n' +
            '        </h2>' +
            '        <menu-link section="section" ng-if="section.type === \'link\'"></menu-link>' +
            '        <menu-toggle section="section" ng-if="section.type === \'toggle\'"></menu-toggle>' +
            '        <ul ng-if="section.children">' +
            '            <li ng-repeat="child in section.children" ng-if="!child.hidden">' +
            '                <menu-link section="child" ng-if="child.type === \'link\'"></menu-link>' +
            '                <menu-toggle section="child" ng-if="child.type === \'toggle\'"></menu-toggle>' +
            '            </li>' +
            '        </ul>' +
            '    </li>' +
            '</ul>'
        );
    }]);
})(window, window.angular);
