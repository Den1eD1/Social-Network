
socialNetwork.factory('authentication', function ($http, baseServiceUrl) {
    var service = {};

    var serviceUrl = baseServiceUrl + '/users';

    service.login = function (loginData, success, error) {
        $http.post(serviceUrl + '/login', loginData)
            .success(function (data) {
                success(data);
            }).error(error);
    };

    servise.register = function (registerData, success, error) {
        $http.post(serviceUrl + '/register', registerData)
            .success(function (data) {
                success(data)
            }).error(error);
    };
});