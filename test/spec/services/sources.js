'use strict';

describe('Service: sources', function () {

  // load the service's module
  beforeEach(module('wats4000FinalApp'));

  // instantiate service
  var sources;
  beforeEach(inject(function (_sources_) {
    sources = _sources_;
  }));

  it('should do something', function () {
    expect(!!sources).toBe(true);
  });

});
