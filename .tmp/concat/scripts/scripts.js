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
    'ngTouch'
  ])
  .config(["$routeProvider", function ($routeProvider) {
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
      .otherwise({
        redirectTo: '/'
      });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name wats4000FinalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wats4000FinalApp
 */
angular.module('wats4000FinalApp')
  .controller('MainCtrl', ["$scope", "current", function ($scope, current) {
    $scope.current = current.query();

    $scope.refreshCurrent = function () {
      $scope.current = current.query({
        source: $scope.source
      });
    };
  }]);

'use strict';

/**
 * @ngdoc function
 * @name wats4000FinalApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the wats4000FinalApp
 */
angular.module('wats4000FinalApp')
  .controller('AboutCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

/**
 * @ngdoc service
 * @name wats4000FinalApp.tech
 * @description
 * # tech
 * Factory in the wats4000FinalApp.
 */
angular.module('wats4000FinalApp')
  .factory('current', ["$resource", function ($resource) {
    // Service logic
    // ...
    return $resource('https://newsapi.org/v1/articles?source=:source&sortBy=:sortBy&apiKey=:apiKey&', {}, {
      query: {
        method: 'GET',
        params: {
          source: 'bloomberg',
          apiKey: '2710c84ddcd04d2dbb72e814cb443962',
        },
        isArray: false
      }
    });
  }]);

  angular.module('wats4000FinalApp')
  .factory('source', ["$resource", function ($resource) {
    // Service logic
    // ...
    return $resource('https://newsapi.org/v1/sources?sortBy=:sortBy&apiKey=:apiKey&', {}, {
      query: {
        method: 'GET',
        params: {
          apiKey: '2710c84ddcd04d2dbb72e814cb443962',
          sortBy: 'latest'
        },
        isArray: false
      }
    });
  }]);
angular.module('wats4000FinalApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/about.html',
    "<p>This is the about view.</p>"
  );


  $templateCache.put('views/main.html',
    "<div class=\"container\" id=\"newsSources\"> <h2>Select a News Source</h2> <select ng-model=\"selectSource\" ng-options=\"x.source for x in sources\"></select> </div> <br> <div ng-app class=\"jumbotron\" ng-controller=\"MainCtrl\"> <h1>The latest headlines from {{current.source}} <hr> </h1> <p class=\"lead\"> <div ng-init=\"limit = 5\"> <div ng-repeat=\"article in current.articles | limitTo: limit as results\"> <!-- Calls results from API and allows for parsing. --> <h4>{{article.title}}</h4> <img src=\"{{article.urlToImage}}\"> <h3>By: {{article.author}}</h3> <h5>Originally Published: {{article.publishedAt}}</h5> <p>{{article.description}}</p> <a href=\"{{article.url}}\" target=\"_blank\">Full Article</a> <hr> </div> </div></p> </div> <button class=\"showMore\" ng-hide=\"results.length === items.length\" ng-click=\"limit = limit +5\">Show More...</button> "
  );

}]);
