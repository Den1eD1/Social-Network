socialNetwork.factory('authentication', function ($http, baseUrl) {
    var service = {};

    var serviceUrl = baseUrl;

    service.login = function (loginData, success, error) {
        $http.post(serviceUrl + '/users/Login', loginData)
            .success(function (data) {
                console.log(data);
                success(data);
            }).error(error);
    };

    service.register = function (registerData, success, error) {
        $http.post(serviceUrl + '/users/Register', registerData)
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };



    service.editProfile = function(editData, success, error) {
        $http.put(serviceUrl + '/me', editData, { headers: this.getHeaders() })
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    };

    service.changePassword = function(data, success, error) {
        $http.put(serviceUrl + '/me/changepassword', data, { headers: this.getHeaders() })
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    };

    service.getMyData = function (success, error) {
        $http.get(serviceUrl + '/me', { headers: this.getHeaders() })
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    };
    
    service.searchUsers = function (id, success, error) {
        var urlAttachment = 'search?searchTerm=' + id;
        $http.get(serviceUrl + urlAttachment, {headers: this.getHeaders()})
            .success(function (data, status, headers, config) {
                success(data)
            })
            .error(function (errorData) {
                error(errorData)
                console.log(errorData);
            })
    };

    service.getUserFullData = function (id, success, error) {
      $http.get(serviceUrl +'/users/' + id,{headers: this.getHeaders()})
          .success(function (data) {
              success(data);
          })
          .error(function (errorData) {
              error(errorData);
              console.log(errorData);
          })
    };

    service.SetCredentials = function (serverData) {
        localStorage['accessToken'] = serverData.access_token;
        console.log(serverData.access_Token);
        localStorage['username'] = serverData.userName;
    };

    service.getHeaders = function () {
        return {
            Authorization: "Bearer " + localStorage['accessToken']
        };
    };

    service.getUsername  = function () {
        return localStorage['userName'];
    };

    service.clearCredentials = function () {
        localStorage.clear();
    };

    service.setName = function (name) {

        localStorage['name'] = name;
    }

    service.getName = function () {
        return localStorage['name'];
    }
    service.setProfileImage = function (profileImage) {
        localStorage['profileImage'] = profileImage;
    }

    service.setUserId = function (id) {
        console.log(id);
        console.log('trqbva gornoto da e ID');
        localStorage['userId'] = id;
    }

    service.getUserId = function () {
        return localStorage['userId'];
    }

    service.isLogged = function () {
        return localStorage['accessToken'];
    };

    return service;
});