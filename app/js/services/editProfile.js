socialNetwork.factory('editProfileService', function ($http,baseUrl, $q) {
    var serviceUrl = baseUrl + '/me';

    var editProfileService= {};

    editProfileService.changePassword = function (changePasswordData) {
        var defer = $q.defer();
        $http.put(serviceUrl + '/changePassword',changePasswordData, {headers: this.getHeaders()})
            .success(function (data) {
                defer.resolve(data);
            })
            .error(function (error) {
                defer.reject(error);
            });
        return defer.promise;
    };

    editProfileService.getUserData = function () {
        var defer = $q.defer();
        $http.get(serviceUrl, {headers: this.getHeaders()})
            .success(function (data) {
                $q.resolve(data);
            })
            .error(function (errorData) {
                $q.reject(errorData);
            });
        return defer.promise;
    };

    editProfileService.editProfile = function (editProfileData) {
        var defer = $q.defer();
        $http.put(serviceUrl, editProfileData, {headers:this.getHeaders()})
            .success(function (successData) {
                $q.resolve(successData);
            })
            .error(function (errorData) {
                $q.reject(errorData);
            })
        return defer.promise;
    }


    editProfileService.getHeaders = function () {
        return {
            Authorization: 'Bearer' + localStorage['accessToken']
        };
    }
    return editProfileService;
});