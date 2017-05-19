'use strict';

/**
 * @ngdoc service
 * @name wats4000FinalApp.newsSources
 * @description
 * # newsSources
 * Factory in the wats4000FinalApp.
 */
angular.module('wats4000FinalApp')
    .factory('newsSources', function($resource) {
        return $resource('https://newsapi.org/v1/sources?language=:language', {}, {
            query: {
                method: 'GET',
                params: {
                    language: 'en',
                },
                isArray: false
            }
        });
    });
