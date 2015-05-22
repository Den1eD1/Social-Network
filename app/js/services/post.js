socialNetwork.factory('postService', function ($http, baseUrl, $q) {

    var postService = {};
    var serviceUrl = baseUrl;

    postService.getNewsFeed = function (success, error) {
        $http.get(serviceUrl + '/me/feed?StartPostId=&PageSize=5', {headers: this.getHeaders()})
            .success(function (data) {
                console.log(data);
                success(data);
            })
            .error(function (data) {
                error(data);
            });
    };

    postService.createNewPost= function (postData) {
        var deferred = $q.defer();
        $http.post(serviceUrl + '/Posts', postData, {headers: this.getHeaders()})
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    postService.getWallPosts = function (user, success, error) {
        $http.get(serviceUrl + '/users/' + user + '/wall?StartPostId=&PageSize=5', {headers: this.getHeaders()})
            .success(function (data) {
                success(data);
            })
            .error(function (errorData) {
                error(errorData);
            })
    }

    postService.likePost = function (id, success, error) {
        $http.post(serviceUrl + '/Posts/' + id + '/Likes',{}, {headers: this.getHeaders()})
            .success(function (data) {
                success(data);
            })
            .error(function (data) {
                error(error);
            });
    };

    postService.unlikePost = function (id, success, error) {
        $http.delete(serviceUrl + '/Posts/' + id + '/likes', {headers:this.getHeaders()})
            .success(function (data) {
                success(data);
            })
            .error(function (data) {
                error(data);
            });
    };

    postService.getHeaders = function () {
        return {
            Authorization: "Bearer " + localStorage['accessToken']
        };
    };

    postService.getUsername = function () {
        return localStorage['username'];
    }

    return postService;
})