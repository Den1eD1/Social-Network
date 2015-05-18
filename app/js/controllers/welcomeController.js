socialNetwork.controller('welcomeController', ['$scope','$http', function ($scope, $http) {
    var loginUser  = {
        username : $scope.loginUsername,
        password : $scope.loginPassword
    };


    $scope.login = function () {
        $http({method: 'POST', url: 'http://softuni-social-network.azurewebsites.net/api/users/Login', data: loginUser})
            .success(function (data) {
                console.log(data);
            }, function (error) {
                console.log(error);
            })
    }
    var data = {
        username: $scope.regUsername,
        password: $scope.regPassword,
        confirmPassword: $scope.confPassword,
        name: $scope.name,
        email: $scope.email,
        gender: 1
    };
    $scope.register = function () {
        $http({method: 'POST', url: 'http://softuni-social-network.azurewebsites.net/api/users/Register', data: data})
            .then(function (data) {
                console.log(data);
                $scope.regUsername = null;
                $scope.regPassword = null;
                $scope.confPassword = null;
                $scope.name = null;
                $scope.email = null;
            }).error(function (error) {
                console.log(error);
            });



    }
}]);