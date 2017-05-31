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
      .when('/saved', {
        templateUrl: 'views/saved.html',
        controller: 'MainCtrl',
        controllerAs: 'saved'
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
    .controller('MainCtrl', ["$scope", "current", "newsSources", "$localStorage", function ($scope, current, newsSources, $localStorage) {
        $scope.newsSources = newsSources.query();
        $scope.selectedSource = function (source) {
            $scope.current = current.query({
                source: source.id
            });
        };
        $scope.storage = $localStorage;
        $scope.articleSaved = {
            'success': false,
            'duplicate': false
        };
        $scope.saveArticle = function (article) {
            var articleData = {
                'name': article.title,
                'id': article.url,
            };
            if (!$localStorage.savedArticle) {
                $localStorage.savedArticle = [articleData];
            } else {
                // Check to make sure we haven't already saved the current article.
                var save = true; // Initialize the save decision variable.
                // Use this loop to check if we've already saved the article.
                for (var i = 0; i < $localStorage.savedArticle.length; i++) {
                    if ($localStorage.savedArticle[i].id == articleData.id) {
                        // This is a duplicate, so don't save (variable set to false).
                        save = false;
                    }
                }
                if (save == true) {
                    $localStorage.savedArticle.push(articleData);
                    console.log($scope.articleSaved);
                    $scope.articleSaved.success = true;
                    console.log($scope.articleSaved);
                    console.log('Article saved to favorites.');
                } else {
                    $scope.articleSaved.duplicate = true;
                    console.log('Article already saved');
                }
            }
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

'use strict';

/**
 * @ngdoc function
 * @name wats4000FinalApp.controller:SavedCtrl
 * @description
 * # SavedCtrl
 * Controller of the wats4000FinalApp
 */
angular.module('wats4000FinalApp')
  .controller('SavedCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

angular.module('wats4000FinalApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/about.html',
    "<p>This is the about view.</p>"
  );


  $templateCache.put('views/main.html',
    "<!DOCTYPE html><!-- Dropdown menu displays list of available news sources for the user to choose from --> <div class=\"dropdown\" id=\"newsSourcesDropDown\"> <button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"dropdownMenu1\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\"> News Sources <span class=\"caret\"></span> </button> <ul class=\"dropdown-menu scrollable-menu\" role=\"menu\" aria-labelledby=\"dropdownMenu1\"> <div ng-repeat=\"newsSource in newsSources.sources\"> <li> <a ng-init=\"ars-technica\"></a> </li> <li><a ng-click=\"selectedSource(newsSource)\">{{newsSource.name}}</a> <hr> </li> </div> </ul> </div> <!-- Article content including title, image, author, date published, and article summary --> <div ng-app class=\"jumbotron\" ng-controller=\"MainCtrl\"> <h1>The latest headlines from {{current.source}} <hr> </h1> <p class=\"lead\"> <div ng-init=\"limit = 3\"> <div ng-repeat=\"article in current.articles | limitTo: limit as results\"> <!-- Calls results from API and allows for parsing. --> <h4><a href=\"{{article.url}}\" target=\"_blank\">{{article.title}}</a></h4> <img src=\"{{article.urlToImage}}\"> <h3>By: {{article.author}}</h3> <h5>Originally Published: {{article.publishedAt}}</h5> <p>{{article.description}}</p> <button ng-click=\"saveArticle(article)\" class=\"glyphicon\" ng-class=\"{'glyphicon-heart' : isFavorite , 'glyphicon-heart-empty' : !isFavorite }\"></button> <div ng-messages=\"savedArticle\"> <p class=\"article-saved-alert bg-success text-success\" ng-message=\"success\"> {{article.name}} has been saved to your list of favorites. </p> <p class=\"article-saved-alert bg-warning text-warning\" ng-message=\"duplicate\"> {{article.name}} has already been saved to your list of favorites. </p> </div> <!-- I got these buttons from simplesharebuttons.com --> <div id=\"share-buttons\"> <!-- Twitter --> <a href=\"https://twitter.com/share?url={{article.url}}&amp;text={{article.title}}\" target=\"_blank\"> <img src=\"https://simplesharebuttons.com/images/somacro/twitter.png\" alt=\"Twitter\"> </a> <!-- Facebook --> <a href=\"http://www.facebook.com/sharer.php?u={{article.url}}\" target=\"_blank\"> <img src=\"https://simplesharebuttons.com/images/somacro/facebook.png\" alt=\"Facebook\"> </a> <!-- Google+ --> <a href=\"https://plus.google.com/share?url={{article.url}}\" target=\"_blank\"> <img src=\"https://simplesharebuttons.com/images/somacro/google.png\" alt=\"Google\"> </a> <!-- Digg --> <a href=\"http://www.digg.com/submit?url={{article.url}}\" target=\"_blank\"> <img src=\"https://simplesharebuttons.com/images/somacro/diggit.png\" alt=\"Digg\"> </a> <!-- Email --> <a href=\"mailto:?Subject={{article.title}}&amp;Body={{article.url}}\"> <img src=\"https://simplesharebuttons.com/images/somacro/email.png\" alt=\"Email\"> </a> <!-- LinkedIn --> <a href=\"http://www.linkedin.com/shareArticle?mini=true&amp;url={{article.url}}\" target=\"_blank\"> <img src=\"https://simplesharebuttons.com/images/somacro/linkedin.png\" alt=\"LinkedIn\"> </a> <!-- Reddit --> <a href=\"http://reddit.com/submit?url={{article.url}}&amp;title={{article.title}}\" target=\"_blank\"> <img src=\"https://simplesharebuttons.com/images/somacro/reddit.png\" alt=\"Reddit\"> </a> <!-- StumbleUpon--> <a href=\"http://www.stumbleupon.com/submit?url={{article.url}}&amp;title={{article.title}}\" target=\"_blank\"> <img src=\"https://simplesharebuttons.com/images/somacro/stumbleupon.png\" alt=\"StumbleUpon\"> </a> <!-- Tumblr--> <a href=\"http://www.tumblr.com/share/link?url={{article.url}}&amp;title={{article.title}}\" target=\"_blank\"> <img src=\"https://simplesharebuttons.com/images/somacro/tumblr.png\" alt=\"Tumblr\"> </a> </div> <hr> </div> <button class=\"showMore\" ng-click=\"limit = limit +2\">Show More...</button> </div></p> </div> <p><a ng-href=\"#!/saved\" class=\"btn btn-lg btn-primary\">View Favorites</a></p> "
  );


  $templateCache.put('views/saved.html',
    "<div class=\"jumbotron\"> <h4>Favorite Articles</h4> <ul class=\"saved-article-list\"> <li ng-repeat=\"article in storage.savedArticle\"> <span class=\"glyphicon glyphicon-heart\" aria-hidden=\"true\"></span> <a ng-href=\"{{article.id}}\" target=\"_blank\">{{article.name}}</a> </li> </ul> <p><a ng-href=\"#!/\" class=\"btn btn-lg btn-primary\">View Articles</a></p> </div>"
  );

}]);
