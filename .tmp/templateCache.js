angular.module('wats4000FinalApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/about.html',
    "<p>This is the about view.</p>"
  );


  $templateCache.put('views/main.html',
    "<div class=\"dropdown\"> <button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"dropdownMenu1\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\"> News Sources <span class=\"caret\"></span> </button> <ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu1\"> <div ng-repeat=\"newsSources in newsSources.sources\"> <li><a>{{newsSources.name}}</a><hr></li> </div> </ul> </div> <div ng-app class=\"jumbotron\" ng-controller=\"MainCtrl\"> <h1>The latest headlines from <hr> </h1> <p class=\"lead\"> <div ng-init=\"limit = 5\"> <div ng-repeat=\"article in current.articles | limitTo: limit as results\"> <!-- Calls results from API and allows for parsing. --> <h4>{{article.title}}</h4> <img src=\"{{article.urlToImage}}\"> <h3>By: {{article.author}}</h3> <h5>Originally Published: {{article.publishedAt}}</h5> <p>{{article.description}}</p> <a href=\"{{article.url}}\" target=\"_blank\">Full Article</a> <hr> </div> </div></p> </div> <button class=\"showMore\" ng-show=\"results.limit === limit.limit\" ng-click=\"limit = limit +5\">Show More...</button> "
  );

}]);
