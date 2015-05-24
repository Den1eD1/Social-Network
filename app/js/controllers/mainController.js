socialNetwork.controller('mainController',
    ['$scope', 'authentication', 'friendsService', '$routeParams','notifyService',
        function ($scope, authentication, friendsService, $routeParams, notifyService) {


            $scope.username = authentication.getUsername();
            $scope.profilePicture = authentication.getProfileImage();

            $scope.name = authentication.getName();
            $scope.isLogged = authentication.isLogged();

            $scope.search = function () {
                $scope.isSearching = true;
                if ($scope.searchParameters === '') {
                    $scope.isSearching = false;
                }else {
                    authentication.searchUsers($scope.searchParameters, function (serverData) {
                            $scope.searchResults = serverData;
                        },
                        function (serverError) {
                            notifyService.showError('There was an error with the search.');
                        });
                };
            }




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
        }]);