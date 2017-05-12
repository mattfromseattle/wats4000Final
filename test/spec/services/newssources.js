'use strict';

describe('Service: newsSources', function () {

  // load the service's module
  beforeEach(module('wats4000FinalApp'));

  // instantiate service
  var newsSources;
  beforeEach(inject(function (_newsSources_) {
    newsSources = _newsSources_;
  }));

  it('should do something', function () {
    expect(!!newsSources).toBe(true);
  });

});
