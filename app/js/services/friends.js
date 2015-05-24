socialNetwork.factory('friendsService',['$http', 'baseUrl', '$q', function ($http, baseUrl, $q) {
    var friendsService = {};
    var serviceUrl = baseUrl;
    var urlAttachment = '/me/requests';



    friendsService.SearchByName = function (search) {
        var deferred = $q.defer();
        $http.get(serviceUrl + '/users/search?searchTerm=' + search, this.getHeaders())
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    friendsService.getFriendsPreview = function (friendUsername,success, error) {
        $http.get(serviceUrl + '/users/' + friendUsername +'/friends/preview', {headers:this.getHeaders()})
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