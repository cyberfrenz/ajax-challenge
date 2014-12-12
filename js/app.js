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


        // $scope.refreshComments();
        // $scope.newComment = {score: 0};

        $http.get(commentUrl)
            .success(function(data) {
                $scope.comments = data.results;
            })
            .error(function(err) {
                console.log(err);
            })

            $scope.refreshComments();


		$scope.addComments = function(comment) {
            if(comment.title !== undefined || comment.name !== undefined || commment.comment !== undefined) {
                $http.post(commentUrl, comment)
                    .success(function(responseData) {
                        comment.objectId = responseData.objectId;
                        $scope.comments.push(comment);
                        $scope.newComment = {score: 0};
                    });
            }
		};


        $scope.updateComments = function(comment) {
             $scope.updating = true;
             $http.delete(commentUrl + comment.objectId)
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
            $http.put(url + comment.objectId, comment)
                .success(function(responseData) {
                })
                .error(function(err) {
                    console.log(err);
                });
        };


	});

