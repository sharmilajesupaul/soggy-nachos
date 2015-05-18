angular.module('userRoutes', [])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('landing', {
      url: "/landing",
      templateUrl: "angular/templates/landing/index.html",
      controller: 'LoginCtrl'
    })
      .state('landing.default', {
        url: "/default",
        templateUrl: "angular/templates/landing/default.html"
      })

      .state('landing.signup', {
        url: "/signup",
        templateUrl: "angular/templates/landing/signup.html"
      })

      .state('landing.login', {
        url: "/login",
        templateUrl: "angular/templates/landing/login.html"
      });

    $urlRouterProvider.otherwise("/landing/default");

  }]);
