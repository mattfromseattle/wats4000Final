'use strict';

/**
 * @ngdoc function
 * @name wats4000FinalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wats4000FinalApp
 */
angular.module('wats4000FinalApp')
  .controller('MainCtrl', function ($scope, current, newsSources) {
    $scope.newsSources = newsSources.query();
    $scope.selectedSource = function(source) {
      console.log(source.id);
      $scope.current = current.query({
        source: source.id
      });
    };
  });