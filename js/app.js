"use strict";

var commentUrl = 'https://api.parse.com/1/classes/comments';

angular.module('CommentApp', ['ui.boostraps'])

	.config(function($httpProvider) {

		$httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'IGgz132nXoTBkqRqanUXp9FKfJsTLXtdcj5bjp8l';
        $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'qSAwS0u8p1kqliptKAZH9vpwlKq5MyO68M4C7ZVw';
	})

	.controller('CommentsController', function($scope, $http){

		$scope.refreshComments = function() {
            $scope.loading = true;
            $http.get(commentUrl + '?where={"done" : false}')
                .success(function(responseData) {
                    $scope.comments = responseData.results;
                })
                .error(function(err) {
                    console.log(err);
                })
                .finally(function(){
                    $scope.loading=false;
                });

        };
        $scope.refreshComments();

        $scope.newComment = { done: false};

		$scope.addComment = function(comment) {
			$http.post(commentUrl, comment)
				.success(function(responseData) {
                    comment.objectId = responseData.objectId;
                    $scope.commments.push(comment);
                    $scope.newComment = {done: false};
                })
					
		};

        $scope.updateComment = function(comment) {
             $scope.updating = true;
             $http.post(commentUrl + comment.objectId, comment)
                .success(function(responseData) {
                })
                .error(function(err) {
                    console.log(err);
                })
        };

	});
