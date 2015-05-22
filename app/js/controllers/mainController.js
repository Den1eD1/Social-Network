socialNetwork.controller('mainController',
    ['$scope', 'authentication', 'friendsService', '$routeParams','notifyService',
        function ($scope, authentication, friendsService, $routeParams, notifyService) {


            $scope.username = authentication.getUsername();
            $scope.profileImage = localStorage['profileImage'];
            $scope.name = authentication.getName();
            $scope.isLogged = authentication.isLogged();

            $scope.search = function () {
                authentication.searchUsers($routeParams.id, function (serverData) {
                    $scope.searchResults = serverData;
                },
                    function (serverError) {
                        notifyService('There was an error with the search.');
                    });
            };

            $scope.wallData = function () {
                authentication.getUserFullData($scope.username, function (serverData) {
                    $scope.wall = serverData;
                }, function (error) {
                    console.log(error);
                    notifyService.showError('there was an error showing your wall.');
                })
            }

            $scope.initialiseWallOwnerData = function () {

                authentication.getUserFullData($routeParams.id, function(serverData) {
                    $scope.wallOwner = serverData;
                    //$('#header').css('background-image', 'url(' + serverData.coverImageData + ')');
                    $('.header').css('background-image', 'url(' + serverData.coverImageData + ')');
                }, function (error) {
                    if (error.message === "Session token expired or not valid.") {
                        $scope.clearCredentials();
                        $scope.navigateToPage("Your session has expired. Please login again");
                    }
                    console.log(error);
                });
            }
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