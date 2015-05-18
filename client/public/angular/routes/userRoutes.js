angular.module('userRoutes', [])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('landing', {
      url: "/landing",
      templateUrl: "angular/templates/landing.html",
      controller: 'LoginCtrl'
    })
      .state('landing.default', {
        url: "/default",
        templateUrl: "angular/templates/default-form.html"
      })

      .state('landing.signup', {
        url: "/signup",
        templateUrl: "angular/templates/signup-form.html"
      })

      .state('landing.login', {
        url: "/login",
        templateUrl: "angular/templates/login-form.html"
      });

    $urlRouterProvider.otherwise("/landing/default");

  }]);
