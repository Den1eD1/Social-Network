socialNetwork.controller('friendsController', ['$scope', 'friendsService', 'notifyService', '$routeParams',
    function ($scope, friendsService, notifyService, $routeParams) {

        $scope.setCurrentUser = function () {
            $scope.currentUser = $routeParams.id;
        }



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