angular.module('wats4000FinalApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/about.html',
    "<p>This is the about view.</p>"
  );


  $templateCache.put('views/main.html',
    "<!-- Dropdown menu displays list of available news sources for the user to choose from --> <div class=\"dropdown\" id=\"newsSourcesDropDown\"> <button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"dropdownMenu1\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\"> News Sources <span class=\"caret\"></span> </button> <ul class=\"dropdown-menu scrollable-menu\" role=\"menu\" aria-labelledby=\"dropdownMenu1\"> <div ng-repeat=\"newsSource in newsSources.sources\"> <li><a ng-init=\"ars-technica\"></a></li> <li><a ng-click=\"selectedSource(newsSource)\">{{newsSource.name}}</a> <hr> </li> </div> </ul> </div> <!-- Article content including title, image, author, date published, and article summary --> <div ng-app class=\"jumbotron\" ng-controller=\"MainCtrl\"> <h1>The latest headlines from {{current.source}} <hr> </h1> <p class=\"lead\"> <div ng-init=\"limit = 10\"> <div ng-repeat=\"article in current.articles | limitTo: limit as results\"> <!-- Calls results from API and allows for parsing. --> <h4>{{article.title}}</h4> <img src=\"{{article.urlToImage}}\"> <h3>By: {{article.author}}</h3> <h5>Originally Published: {{article.publishedAt}}</h5> <p>{{article.description}}</p> <a href=\"{{article.url}}\" target=\"_blank\">Full Article</a> <hr> </div> <button class=\"showMore\" ng-click=\"limit = limit +10\">Show More...</button> </div></p> </div> "
  );

}]);
