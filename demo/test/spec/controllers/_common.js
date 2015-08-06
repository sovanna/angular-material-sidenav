'use strict';

describe('Controller: CommonCtrl', function () {

    var controller, scope;

    // load the controller's module
    beforeEach(module('demoApp'));

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        controller = $controller('CommonCtrl', {
            $scope: scope
        });
    }));

    it('Assign a menu to the controller', function () {
        expect(scope.menu).toBeDefined();
    });

});
