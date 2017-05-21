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
    .controller('MainCtrl', ["$scope", "current", "newsSources", "$localStorage", function($scope, current, newsSources, $localStorage) {
        $scope.newsSources = newsSources.query();
        $scope.selectedSource = function(source) {
            console.log(source.id);
            $scope.current = current.query({
                source: source.id
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
    .factory('current', ["$resource", function($resource) {

        return $resource('https://newsapi.org/v1/articles?source=:source&sortBy=:sortBy&apiKey=:apiKey&', {}, {
            query: {
                method: 'GET',
                params: {
                    apiKey: '2710c84ddcd04d2dbb72e814cb443962',
                },
                isArray: false
            }
        });
    }]);

'use strict';

/**
 * @ngdoc service
 * @name wats4000FinalApp.newsSources
 * @description
 * # newsSources
 * Factory in the wats4000FinalApp.
 */
angular.module('wats4000FinalApp')
    .factory('newsSources', ["$resource", function($resource) {
        return $resource('https://newsapi.org/v1/sources?language=:language', {}, {
            query: {
                method: 'GET',
                params: {
                    language: 'en',
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
    "<!DOCTYPE html><!-- Dropdown menu displays list of available news sources for the user to choose from --> <div class=\"dropdown\" id=\"newsSourcesDropDown\"> <button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"dropdownMenu1\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\"> News Sources <span class=\"caret\"></span> </button> <ul class=\"dropdown-menu scrollable-menu\" role=\"menu\" aria-labelledby=\"dropdownMenu1\"> <div ng-repeat=\"newsSource in newsSources.sources\"> <li><a ng-init=\"ars-technica\"></a></li> <li><a ng-click=\"selectedSource(newsSource)\">{{newsSource.name}}</a> <hr> </li> </div> </ul> </div> <div ng-messages=\"myMessages\" class=\"my-messages\" role=\"alert\"> <div ng-message=\"alert\" class=\"some-message\">You have selected the source {{newsSource.name}}</div> </div> <!-- Container to track user Favorited articles --> <div class=\"box\" id=\"favoritedArticles\"> <div class=\"row\"> <div class=\"span4\"> <h3>Favorites</h3> </div> </div> </div> <!-- Article content including title, image, author, date published, and article summary --> <div ng-app class=\"jumbotron\" ng-controller=\"MainCtrl\"> <h1>The latest headlines from {{current.source}} <hr> </h1> <p class=\"lead\"> <div ng-init=\"limit = 3\"> <div ng-repeat=\"article in current.articles | limitTo: limit as results\"> <!-- Calls results from API and allows for parsing. --> <h4><a href=\"{{article.url}}\" target=\"_blank\">{{article.title}}</a></h4> <img src=\"{{article.urlToImage}}\"> <h3>By: {{article.author}}</h3> <h5>Originally Published: {{article.publishedAt}}</h5> <p>{{article.description}}</p> <button ng-click=\"markAs(!isFavorite)\" class=\"glyphicon\" ng-class=\"{'glyphicon-heart' : isFavorite , 'glyphicon-heart-empty' : !isFavorite }\"></button> <!-- I got these buttons from simplesharebuttons.com --> <div id=\"share-buttons\"> <!-- Twitter --> <a href=\"https://twitter.com/share?url={{article.url}}&amp;text={{article.title}}\" target=\"_blank\"> <img src=\"https://simplesharebuttons.com/images/somacro/twitter.png\" alt=\"Twitter\"> </a> <!-- Facebook --> <a href=\"http://www.facebook.com/sharer.php?u={{article.url}}\" target=\"_blank\"> <img src=\"https://simplesharebuttons.com/images/somacro/facebook.png\" alt=\"Facebook\"> </a> <!-- Google+ --> <a href=\"https://plus.google.com/share?url={{article.url}}\" target=\"_blank\"> <img src=\"https://simplesharebuttons.com/images/somacro/google.png\" alt=\"Google\"> </a> <!-- Digg --> <a href=\"http://www.digg.com/submit?url={{article.url}}\" target=\"_blank\"> <img src=\"https://simplesharebuttons.com/images/somacro/diggit.png\" alt=\"Digg\"> </a> <!-- Email --> <a href=\"mailto:?Subject={{article.title}}&amp;Body={{article.url}}\"> <img src=\"https://simplesharebuttons.com/images/somacro/email.png\" alt=\"Email\"> </a> <!-- LinkedIn --> <a href=\"http://www.linkedin.com/shareArticle?mini=true&amp;url={{article.url}}\" target=\"_blank\"> <img src=\"https://simplesharebuttons.com/images/somacro/linkedin.png\" alt=\"LinkedIn\"> </a> <!-- Reddit --> <a href=\"http://reddit.com/submit?url={{article.url}}&amp;title={{article.title}}\" target=\"_blank\"> <img src=\"https://simplesharebuttons.com/images/somacro/reddit.png\" alt=\"Reddit\"> </a> <!-- StumbleUpon--> <a href=\"http://www.stumbleupon.com/submit?url={{article.url}}&amp;title={{article.title}}\" target=\"_blank\"> <img src=\"https://simplesharebuttons.com/images/somacro/stumbleupon.png\" alt=\"StumbleUpon\"> </a> <!-- Tumblr--> <a href=\"http://www.tumblr.com/share/link?url={{article.url}}&amp;title={{article.title}}\" target=\"_blank\"> <img src=\"https://simplesharebuttons.com/images/somacro/tumblr.png\" alt=\"Tumblr\"> </a> </div> <hr> </div> <button class=\"showMore\" ng-click=\"limit = limit +2\">Show More...</button> </div></p> </div> "
  );

}]);
