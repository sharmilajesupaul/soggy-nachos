angular.module('authController', [])
.controller('LoginCtrl', ['$scope', '$http', 'authFactory', function($scope, $http, authFactory){
  $scope.user = {};

// Simple POST request example (passing data) :
  $scope.createUser = function () {
    authFactory.signup($scope.user)
    .success(function(data, status, headers, config) {
        console.log(data);
      })
    .error(function(data, status, headers, config) {
        console.log(data);
      });
  };
}]);