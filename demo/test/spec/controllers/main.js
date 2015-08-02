'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('demoApp'));

  var MainCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    MainCtrl = $controller('MainCtrl', {
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MainCtrl.awesomeThings.length).toBe(3);
  });
});
