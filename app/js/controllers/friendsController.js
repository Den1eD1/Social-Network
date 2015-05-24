socialNetwork.controller('friendsController', ['$scope', 'friendsService', 'notifyService', '$routeParams',
    function ($scope, friendsService, notifyService, $routeParams) {

        $scope.setCurrentUser = function () {
            $scope.currentUser = $routeParams.id;
        }

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

        $scope.search = function(){
            friendsService.SearchByName($scope.search.searchTerm)
                .then(function(data){
                    console.log(data);
                    $scope.findedUsers = data;
                }, function(err){
                    console.log(err);
                })
        };

        //should get info about the searched user
        $scope.getWallOwnerFriendsDetails = function () {
            if ($routeParams.id === localStorage['username']) {
                $scope.getFriendsDetails();
                return;
            }
            friendsService.getFriendsDetails($routeParams.id, function (serverData) {
                $scope.friendsDetails = serverData;
                console.log(serverData);
            }, function (error) {
                if (error.message === "Session token expired or not valid.") {
                    $scope.clearCredentials();
                    $scope.navigateToPage("Your session has expired. Please login again");
                    return;
                }
                poppy.pop('error', 'Error', 'There was an error getting the friends details');
            });
        }

    $scope.getFriendsDetails = function () {
        friendsService.getFriendsDetails(function (serverData) {
            $scope.friendsData = serverData;
        },
            function (serverError) {
                notifyService('There was an error recieving your friends data.');
            });
    };
}]);