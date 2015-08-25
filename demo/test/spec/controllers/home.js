'use strict';

describe('Controller: HomeCtrl', function () {

    // load the controller's module
    beforeEach(module('demoApp'));

    var HomeCtrl, scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        HomeCtrl = $controller('HomeCtrl', {
            // place here mocked dependencies
            $scope: scope
        });
    }));

    // it('should attach a list of awesomeThings to the scope', function () {
    //   expect(HomeCtrl.awesomeThings.length).toBe(3);
    // });
});
