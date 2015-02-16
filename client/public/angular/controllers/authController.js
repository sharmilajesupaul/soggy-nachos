angular.module('authController', [])
.controller('LoginCtrl', ['$scope', '$http', 'authFactory', function($scope, $http, authFactory){
  
  $scope.user = {};
  $scope.createUser = function () {
    authFactory.signup($scope.user)
    .success(function(data, status, headers, config) {
        console.log(data);
    })
    .error(function(data, status, headers, config) {
        console.log(data);
    });
  };

  $scope.loginData = {}
  $scope.login = function(){
    authFactory.login($scope.loginData)
    .success(function(data, status, headers, config) {
        console.log(data);
    })
    .error(function(data, status, headers, config) {
        console.log(data);
    });
  }
}]);