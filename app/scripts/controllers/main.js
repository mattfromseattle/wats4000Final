'use strict';

/**
 * @ngdoc function
 * @name wats4000FinalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wats4000FinalApp
 */
angular.module('wats4000FinalApp')
    .controller('MainCtrl', function ($scope, current, newsSources, $localStorage) {
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
    });