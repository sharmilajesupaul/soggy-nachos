angular.module('authController', [])
.controller('LoginCtrl', ['$scope', '$http', '$localStorage', 'authFactory', function($scope, $http, $localStorage, authFactory){
    $scope.userData = {};
    $scope.skillData = {};
    $scope.loginData = {};

    var profileData = {user: $scope.userData, skills: $scope.skillData};

    $scope.signup = function () {
      authFactory.signup(profileData)
      .success(signupSuccessCallback)
      .error(signupErrorCallback);
    };

    function signupSuccessCallback (data, status, headers, config) {
      $localStorage.user = data.user;
      $localStorage.token = data.token;
    }

    function signupErrorCallback (data, status, headers, config) {
      console.log('error:', status);
    }


    $scope.login = function(){
      authFactory.login($scope.loginData)
      .success(loginSuccessCallback)
      .error(loginErrorCallback);
    };

    function loginSuccessCallback (data, status, headers, config){
      console.log(data);
    }
    function loginErrorCallback (data, status, headers, config) {
      console.log('error:', status);
    }

    // Landing Page Tab Controls
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

}]);