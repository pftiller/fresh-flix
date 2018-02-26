var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);
myApp.config(['$routeProvider','$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
    console.log('myApp loaded');
    $routeProvider
        .when('/', {
            redirectTo: '/home'
          })
        .when('/home', {
            templateUrl: '/views/templates/home.html'
          })
          .when('/titledetails/:id', {
            templateUrl: '/views/templates/titledetails.html'
          })
            .when('/login', {
            templateUrl: '/views/modals/login.html'
        })
        .when('/register', {
            templateUrl: '/views/modals/register.html'
          })
          .when('/watchlist', {
            templateUrl: '/views/templates/watchlist.html',
            resolve: {
              getuser: function (UserService) {
                return UserService.getuser();
              }
            }
          })
          .when('/technologies', {
            templateUrl: '/views/templates/technologies.html'
          })

        .otherwise({ redirectTo: '<h1>404</h1>' });       
}])