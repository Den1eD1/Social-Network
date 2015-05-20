socialNetwork.controller('postController',
    ['$scope', 'postService', '$route', 'notifyService',
    function ($scope, postService, $route, notifyService) {
    
    $scope.getNewsFeed = function () {
        postService.getNewsFeed(function (serverData) {
            $scope.newsFeed = serverData;
        }, function (serverError) {
            notifyService.showError('There was an error recieving your news feed.');
        });
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