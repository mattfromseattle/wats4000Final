'use strict';

/**
 * @ngdoc overview
 * @name wats4000FinalApp
 * @description
 * # wats4000FinalApp
 *
 * Main module of the application.
 */
angular
  .module('wats4000FinalApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngStorage', //added to enable localStorage features
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/saved', {
        templateUrl: 'views/saved.html',
        controller: 'MainCtrl',
        controllerAs: 'saved'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
