angular.module('authController', [])
.controller('LoginCtrl', ['$scope', '$http', '$localStorage', 'authFactory', function($scope, $http, $localStorage, authFactory){
    $scope.data = {};
    console.log($scope.data);
    $scope.tabData = {
      selectedIndex : 0,
      signupTabIndex : 0
    };

    $scope.nextTab = function() {
      $scope.tabData.selectedIndex = Math.min($scope.tabData.selectedIndex + 1, 2) ;
    };
    $scope.previousTab = function() {
      $scope.tabData.selectedIndex = Math.max($scope.tabData.selectedIndex - 1, 0);
    };

    $scope.nextInnerTab = function() {
      $scope.tabData.signupTabIndex = Math.min($scope.tabData.signupTabIndex + 1, 2) ;
    };
    $scope.previousInnerTab = function() {
      $scope.tabData.signupTabIndex = Math.max($scope.tabData.signupTabIndex - 1, 0);
    };

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