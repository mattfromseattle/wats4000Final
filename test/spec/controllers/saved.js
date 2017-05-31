'use strict';

describe('Controller: SavedCtrl', function () {

  // load the controller's module
  beforeEach(module('wats4000FinalApp'));

  var SavedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SavedCtrl = $controller('SavedCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SavedCtrl.awesomeThings.length).toBe(3);
  });
});
