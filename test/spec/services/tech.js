'use strict';

describe('Service: tech', function () {

  // load the service's module
  beforeEach(module('wats4000FinalApp'));

  // instantiate service
  var tech;
  beforeEach(inject(function (_tech_) {
    tech = _tech_;
  }));

  it('should do something', function () {
    expect(!!tech).toBe(true);
  });

});
