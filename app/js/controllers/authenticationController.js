socialNetwork.controller('authenticationController',
        ['$scope','authentication', 'notifyService',
        function ($scope, authentication, notifyService) {

    $scope.getActiveUser = function () {
        authentication.getMyData(
            function (serverData) {
        },
        function () {
          notifyService.showError('Server error','500')
        });
    };
    
    $scope.login = function () {
        authentication.login($scope.loginData, function (serverData) {
            authentication.SetCredentials(serverData);
            authentication.getMyData(function (successData) {
                authentication.setProfileImage(successData.profileImageData);
                authentication.setName(successData.name);
                notifyService.showInfo('successfully logged in!');
            }, function () {
                notifyService.showError('An error occured while trying to connect with the server', '500');
            });
        }, function (serverError) {
           notifyService.showError('wrong username/password','ERROR 400')
        });
    };

    $scope.register = function () {
        var username = $scope.registerData.username;
        var password = $scope.registerData.password;
        var confirmPassword = $scope.registerData.confirmPassword;
        var name = $scope.registerData.name;
        var email = $scope.registerData.email;

        if (username.length < 6) {
            notifyService.showError('Username must be at least 6 letters long');
            return;
        } else if (password !== confirmPassword) {
            notifyService.showError('Passwords don\' match with each other.');
            return;
        } else if ( password.length < 6) {
            notifyService.showError('Password must be at least 6 symbols long.');
            return;
        }
        else if (!email.indexOf('@') < 0 || email.length < 6) {
            notifyService.showError('Invalid Email adress');
            return;
        }
      authentication.register($scope.registerData,
          function (serverData) {
          console.log(serverData);
              authentication.SetCredentials(serverData);
              console.log(localStorage);
              notifyService.showInfo('You have successfully registered!');
      }, function (serverError) {
          console.log(serverError);
              notifyService.showError('There was an error with the server');
      });
    };

    $scope.editProfile = function () {
        //TODO!!! IMPORTANT
    }

    $scope.changePassword = function () {
        //TODO After the template is done finish that!!
    }

    $scope.logout = function () {
        authentication.clearCredentials();
        //TODO notification for success logout
    }

    $scope.isLogged = authentication.isLogged() ? true: false;
}]);