var socialNetwork = angular.module('socialNetwork', ['ngRoute']);

socialNetwork.constant('baseUrl', 'http://softuni-social-network.azurewebsites.net/api');

socialNetwork.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl:'templates/welcome.html',
                controller: 'mainController'
            });
        $routeProvider
            .when('/login', {
                templateUrl:'templates/login.html',
                controller:'mainController'
            });

        $routeProvider
            .when('/register', {
                templateUrl: 'templates/register.html',
                controller: 'mainController'
            });
        $routeProvider
            .when('/wall', {
                templateUrl: 'templates/wall.html',
                controller: 'mainController'
            });
        $routeProvider
            .when('/friends',
            {
                templateUrl:'templates/friends.html',
                controller: 'mainController'
            })
        $routeProvider
            .when('/editProfile',
            {
                templateUrl: 'templates/editProfile.html',
                controller: 'mainController'
            })
        $routeProvider
            .when('/changePassword', {
                templateUrl:'templates/changePassword.html',
                controller: 'mainController'
            })
        $routeProvider
            .when('/search' , {
                templateUrl: 'templates/search.html',
                controller: 'mainController'
            })
        $routeProvider
            .when('/addPost', {
                templateUrl: 'templates/addPost.html',
                controller: 'mainController'
            })
        $routeProvider
            .when('/User/:id',{
                templateUrl: 'templates/userWall.html',
                controller: 'mainController'
            })
    }
]);
