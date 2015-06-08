angular.module('dashRoutes', [])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('mainDash', {
      url: '/dash',
      templateUrl: "angular/templates/mainDash.html",
      controller: 'DashCtrl',
      abstract: true
    })

    .state('mainDash.feed', {
      url: '',
      templateUrl: "angular/templates/dashFeed.html",
      controller: 'DashCtrl'
    });


    $urlRouterProvider.otherwise('/landing/default');

  }]);
