socialNetwork.controller('postController',
    ['$scope', 'postService', '$route', 'notifyService', '$routeParams', 'authentication',
    function ($scope, postService, $route, notifyService, $routeParams, authentication) {
    $scope.getNewsFeed = function () {
        postService.getNewsFeed(function (serverData) {
            $scope.newsFeed = serverData;
            console.log(serverData);
        }, function (serverError) {
            notifyService.showError('There was an error receiving your news feed.');
        });
    };

    $scope.getOwnerPosts= function (username) {
        postService.getWallPosts(localStorage['username'], function (serverData) {
            $scope.wallPosts = serverData;
        }, function (error) {
            console.log(error);
            notifyService.showError('There was an error showing wall posts')
        })
    }

        $scope.createPost= function () {
            var postData = {
                Username:postService.getUsername(),
                postContent:$scope.postContent
            }
            postService.createNewPost(postData)
                .then(function (data) {
                    $route.reload();
                    postData = {};
                }, function (err) {
                    console.log(err);
                })
        };

     $scope.likePost = function (id) {
         postService.likePost(id, function (serverData) {
             //TODO $Route
         }, function (serverError) {
             notifyService.showError('there was an error liking the post.');
         });
     };

     $scope.unlikePost = function (id) {
         postService.unlikePost(id, function (serverData) {
             //TODO Route
         }, function (serverError) {
             notifyService.showError('There was an error unliking that post.');
         });
     };
}]);