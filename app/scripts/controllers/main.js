'use strict';

/**
 * @ngdoc function
 * @name wats4000FinalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wats4000FinalApp
 */
angular.module('wats4000FinalApp')
  .controller('MainCtrl', function ($scope, current,newsSources) {
    $scope.current = current.query();
    $scope.newsSources = newsSources.query();
  });