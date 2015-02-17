angular.module('authController', [])
.controller('LoginCtrl', ['$scope', '$http', '$localStorage', 'authFactory', function($scope, $http, $localStorage, authFactory){

  $scope.userData = {};
  $scope.createUser = function () {
    authFactory.signup($scope.userData)
    .success(function(data, status, headers, config) {
        console.log(data);
        $localStorage.user = $scope.userData;
    })
    .error(function(data, status, headers, config) {
        console.log(data);
    });
  };

  $scope.loginData = {};
  $scope.login = function(){
    authFactory.login($scope.loginData)
    .success(function(data, status, headers, config) {
        console.log(data);
    })
    .error(function(data, status, headers, config) {
        console.log(data);
    });
  };
}]);