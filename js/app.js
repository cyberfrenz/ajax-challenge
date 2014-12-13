"use strict";

var commentUrl = 'https://api.parse.com/1/classes/comments';

angular.module('CommentApp', ['ui.bootstrap'])

	.config(function($httpProvider) {

		$httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'IGgz132nXoTBkqRqanUXp9FKfJsTLXtdcj5bjp8l';
        $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'qSAwS0u8p1kqliptKAZH9vpwlKq5MyO68M4C7ZVw';
	})

	.controller('CommentsController', function($scope, $http){

        $scope.max = 5;
        $scope.rating = 0;
        $scope.isReadonly = false;

        //refreshes current comments for user to view
		$scope.refreshComments = function() {
            $scope.loading = true;
            $http.get(commentUrl + '?order=-score')
                .success(function(responseData) {
                    $scope.comments = responseData.results;
                })
                .error(function(err) {
                    console.log(err);
                })
                .finally(function() {
                    $scope.loading = false;
                });
        };

        $http.get(commentUrl)
            .success(function(data){
                $scope.comments = data.results;
            })

        $scope.refreshComments();
        $scope.newComment = {score: 0};

        //adds a user's comments if all fields are met
		$scope.addComment = function(comment) {
            if(comment.title !== undefined || comment.name !== undefined || commment.comment !== undefined) {
                $http.post(commentUrl, comment)
                    .success(function(responseData) {
                        comment.objectId = responseData.objectId;
                        $scope.comments.push(comment);
                        $scope.newComment = {score: 0};
                    });
            }
		};

        //update existing comments
        $scope.deleteComment = function(comment) {
             $scope.updating = true;
             $http.delete(commentUrl + '/' + comment.objectId, comment)
                .success(function(responseData) {
                    $scope.refreshComments();
                })
                .error(function(err) {
                    console.log(err);
                });
        };

        $scope.updateScore = function(comment, vote) {
            comment.score = comment.score + vote;
            if (comment.score < 0) {
                comment.score = 0;
            } 
            $http.put(commentUrl + '/' + comment.objectId, comment)
                .success(function(responseData) {
                })
                .error(function(err) {
                    console.log(err);
                });
        };


	});

