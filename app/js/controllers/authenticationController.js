socialNetwork.controller('authenticationController',
        ['$scope','authentication', 'notifyService', '$location', '$route',
        function ($scope, authentication, notifyService, $location, $route ) {


            var ClearData = function () {
                $scope.loginData = "";
                $scope.registerData = "";
                $scope.userData = "";
                $scope.passwordData = "";
            };
    $scope.getActiveUser = function () {
        authentication.getMyData(function (serverData) {
                $scope.userData = {
                    'username': serverData.username,
                    'name': serverData.name,
                    'email': serverData.email,
                    'profileImageData': serverData.profileImageData,
                    'coverImageData': serverData.coverImageData
                };

                $('#gender' + serverData.gender).attr('checked', true);
        },
        function () {
          notifyService.showError('Server error','500')
        });
    };

            $scope.login = function () {
                authentication.login($scope.loginData,
                    function(serverData) {

                        authentication.SetCredentials(serverData);
                        authentication.getMyData(function (successData) {
                            authentication.setName(successData.name);
                            $scope.name = localStorage['name'];
                            $location.path('/wall');
                                console.log(successData.name);
                            authentication.setProfileImage(successData.profileImageData);
                            notifyService.showInfo("Successful Login!");
                        }, function (serverError) {
                            notifyService.showError('error with getMyData');
                        })
                        ClearData();

                    },
                    function (serverError) {
                        notifyService.showError("Unsuccessful Login!", serverError)
                    });
    };

    $scope.register = function () {
        var username = $scope.registerData.username;
        var password = $scope.registerData.password;
        var confirmPassword = $scope.registerData.confirmPassword;
        var name = $scope.registerData.name;
        var email = $scope.registerData.email;

        if (username.length < 6 || username.length === 0) {
            notifyService.showError('Username must be at least 6 letters long');
            return;
        } else if (password !== confirmPassword) {
            notifyService.showError('Passwords don\' match with each other.');
            return;
        } else if ( password.length < 6 || password.length === 0) {
            notifyService.showError('Password must be at least 6 symbols long.');
            return;
        }
        else if (!email.indexOf('@') < 0 || email.length < 6) {
            notifyService.showError('Invalid Email adress');
            return;
        }
      authentication.register($scope.registerData,
          function (serverData) {
              //sets accessToken
              authentication.SetCredentials(serverData);

              authentication.getMyData(function (successData) {
                  //sets name and id when regitered
                  authentication.setProfileImage(successData.profileImageData);
                  authentication.setUserId(successData.id);
                  authentication.setName(successData.name);
                  $location.path('/wall');
                  notifyService.showInfo('You have successfully registered!');
                  notifyService.showInfo('successfully logged in!');
              }, function (serverError) {
                  console.log(serverError);
                  notifyService.showError('There was an error with the server');
              });
              ClearData()
          }, function (serverError) {
              console.log(serverError);
          })
    };

    $scope.editProfile = function () {
        var name = $scope.userData.name;
        var email = $scope.userData.email;
        var coverImage = $('#coverPictureData').attr('src');
        var profileImage = $('#profilePictureData').attr('src');
        var gender = $("input:radio[name=gender-radio]:checked").val();

        console.log('cover image');
        console.log(email);
        if (gender !== 'Other' &&
            gender !== 'Male' &&
            gender !== 'Female') {
            notifyService.showError('gender is invalid')
            return;
        } else if (name.length < 6) {
            notifyService.showError('The name must be atleast 6 characters long');
            return;
        } else if (email.indexOf('@') < 0 || email.length < 4) {
            poppy.pop('error', 'Error', 'The email is invalid');
            return;
        }

        var data = {};
        data['name'] = name;
        data['email'] = email;
        data['profileImageData'] = profileImage;
        data['coverImageData'] = coverImage;
        data['gender'] = gender;
        console.log(data);
        authentication.editProfile(data, function (serverData) {
            authentication.setProfileImage(profileImage);
            authentication.setName(name);
            $route.reload();
        }, function (errorMessage) {
            notifyService.showError('An error occured while trying to edit the profile');
        });
    }

    $scope.changePassword = function () {
        //TODO After the template is done finish that!!
    }

    $scope.logout = function () {
        authentication.clearCredentials();
        notifyService.showInfo('you have logout successfully.');
        $route.reload();
    }

    $scope.isLogged = authentication.isLogged() ? true: false;
}]);