socialNetwork.controller('welcomeController', ['$scope','authentication', function ($scope, authentication) {

    $scope.login = function () {
        authentication.Login($scope.loginData, function (serverData) {
            authentication.SetCredintials(serverData);
            console.log(localStorage);
        }, function (serverError) {
            console.log(serverError);
        });
    };

    $scope.register = function () {
      authentication.Register($scope.registerData,
          function (serverData) {
          console.log(serverData);
              authentication.SetCredintials(serverData);
              console.log(localStorage);
      }, function (serverError) {
          console.log(serverError);
      });
    };


}]);