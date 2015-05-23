socialNetwork.factory('friendsService',['$http', 'baseUrl', '$q', function ($http, baseUrl, $q) {
    var friendsService = {};
    var serviceUrl = baseUrl;
    var urlAttachment = '/me/requests';

    friendsService.getFriendsRequests = function (success, error) {
      $http.get(serviceUrl + urlAttachment, {headers: this.getHeaders()})
          .success(function (data, status, headers, config) {
              success(data);
          })
          .error(function (data) {
              error(data);
          });
    };

    friendsService.sendFriendRequest = function (username, success, error) {
        $http.post(serviceUrl + urlAttachment + username, {}, {headers:this.getHeaders()})
            .success(function (data) {
                success(data)
            })
            .error(function (data) {
                error(data);
            });
    };

    friendsService.SearchByName = function (search) {
        var deferred = $q.defer();
        $http.get("http://softuni-social-network.azurewebsites.net/api/users/search?searchTerm=" + search, this.getHeaders())
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };
    friendsService.acceptFriendRequest = function (id, success, error) {
        $http.put(serviceUrl + urlAttachment + id + '?status=approved', {}, {headers: this.getHeaders()})
            .success(function (data) {
                success(data);
            })
            .error(function (data) {
                error(data);
            });
    };

    friendsService.rejectFriendRequest = function (id, sucess, error) {
        $http.put(serviceUrl + urlAttachment + id + '?status=delete', {}, { headers: this.getHeaders()})
            .success(function (data) {
                success(data);
            })
            .error(function (data) {
                error(data);
            });
    };

    friendsService.getFriendsPreview = function (success, error) {
        $http.get(serviceUrl + '/me/friends/preview', {headers:this.getHeaders()})
            .success(function (data) {
                success(data);
            })
            .error(function (data) {
                error(data);
            });
    };

    friendsService.getFriendsDetails = function (success, error) {
        $http.get(serviceUrl + '/me/friends', {headers:this.getHeaders()})
            .success(function (data) {
                success(data);
            })
            .error(function (data) {
                error(data);
            });
    };

    friendsService.getHeaders = function () {
        return {
            Authorization: 'Bearer ' + localStorage['accessToken']
        };
    };

    return friendsService;
}]);