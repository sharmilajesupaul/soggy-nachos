angular.module('userRoutes', [])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('landing', {
    url           : "/",
    templateUrl   : "angular/templates/landing.html",
    controller    : 'LoginCtrl'
  })

}]);