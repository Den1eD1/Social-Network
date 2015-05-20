socialNetwork.controller('mainController',
    ['$scope', 'authentication', 'friendsService', '$routeParams','notifyService',
        function ($scope, authentication, friendsSerice, $routeParams, notifyService) {
            $scope.username = localStorage['username'];
            $scope.profileImage = localStorage['profileImage'];
            $scope.name = localStorage['name'];
            $scope.isLogged = authentication.isLogged();

            $scope.search = function () {
                authentication.searchUsers($routeParams.id, function (serverData) {
                    $scope.searchResults = serverData;
                },
                    function (serverError) {
                        notifyService('There was an error with the search.');
                    });
            };

            $scope.hasLoadedPreview = function () {
                return $scope.userPreviewData != null;
            };

            $scope.isFriendRequest = function () {
                return $scope.userPreviewData.hasPendingRequest;
            };

            $scope.isFriend = function () {
                return $scope.userPreviewData.isFriend;
            };
            
            $scope.sendFriendRequest = function () {
                friendsSerice.sendFriendRequest($scope.userPreviewData.username,
                    function (serverData) {
                        notifyService.showInfo('Friend request send successfully');
                }, function (error) {
                        notifyService.showError('there was an error while trying to send friend request.');
                    });
            };

            
        }]);