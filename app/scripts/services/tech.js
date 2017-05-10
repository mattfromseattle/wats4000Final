'use strict';

/**
 * @ngdoc service
 * @name wats4000FinalApp.tech
 * @description
 * # tech
 * Factory in the wats4000FinalApp.
 */
angular.module('wats4000FinalApp')
  .factory('current', function ($resource) {
    // Service logic
    // ...
    return $resource('https://newsapi.org/v1/articles?source=:source&sortBy=:sortBy&apiKey=:apiKey', {}, {
      query: {
        method: 'GET',
        params: {
          source: 'ars-technica',
          sortBy: 'latest',
          apiKey: '2710c84ddcd04d2dbb72e814cb443962',
        },
        isArray: false
      }
    });
  });