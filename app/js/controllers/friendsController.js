socialNetwork.controller('friendsController', ['$scope', 'friendsService', 'notifyService', function ($scope, friendsService, notifyService) {

    $scope.getFriendsRequests = function () {
        friendsService.getFriendsRequests(function (serverData) {
            $scope.friendRequests = serverData;
        },
            function (data) {
                notifyService.showError('there was an error showing the request.');
            });
    };
    
    $scope.acceptFriendsRequest = function (id) {
        friendsService.acceptFriendRequest(id, function (serverData) {
            notifyService.showInfo('request accept successfully');
        }, function (serverError) {
            notifyService.showError('There was an error approving the request.');
        });
    };

    $scope.rejectFriendRequest = function (id, sucess, error) {
        friendsService.rejectFriendRequest(id, function (serverData) {
            notifyService.showInfo('Request rejected.');
        },
            function (serverError) {
                notifyService.showError('There was an error rejecting the request.');
            });
    };

    $scope.getFriendsPreview = function () {
        friendsService.getFriendsPreview(function (serverData) {
            $scope.friendsReview = serverData;
        },
            function (serverError) {
                notifyService('There was an error recieving friends review.');
            });
    };

    $scope.getFriendsDetails = function () {
        friendsService.getFriendsDetails(function (sercerData) {
            $scope.friendsData = serverData;
        },
            function (serverError) {
                notifyService('There was an error recieving your friends data.');
            });
    };
}]);