'use strict';

describe('Controller: AboutCtrl', function () {

  // load the controller's module
  beforeEach(module('demoApp'));

  var AboutCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    AboutCtrl = $controller('AboutCtrl', {
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AboutCtrl.awesomeThings.length).toBe(3);
  });
});
