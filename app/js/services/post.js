socialNetwork.factory('postService', function ($http, baseServiceUrl) {

    var postService = {};
    var serviceUrl = baseServiceUrl;

    postService.getNewsFeed = function (sucess, error) {
        $http.get(serviceUrl + '/me/feed?StartPostId=&PageSize=5', {headers: this.getHeaders()})
            .success(function (data) {
                success(data);
            })
            .error(function (data) {
                error(data);
            });
    };



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
            Authorize: 'Bearer ' + localStorage['accessToken']
        };
    };

    return postService;
})