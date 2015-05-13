angular.module('authController', [])
  .controller('LoginCtrl', ['$scope', '$http', '$localStorage', '$location', 'authFactory', 'authenticationCheck', function($scope, $http, $localStorage, $location, authFactory, authenticationCheck) {
    $scope.newSkill = {};
    // $scope.toolToggle = false;
    $scope.userData = {};
    $scope.skillData = {};
    $scope.loginData = {};

    $scope.defaultSkills = ['javascript',
      'ruby',
      'python',
      'PHP',
      'scala',
      'HTML5',
      'CSS3',
      'swift',
      'C#',
      'C++',
      'Java',
      'angularjs',
      'emberjs',
      'backbonejs',
      'nodejs',
      'sql'
    ];

    $scope.profileData = {
      user: $scope.userData,
      skills: $scope.skillData
    };

    $scope.addSkill = function() {
      if ($scope.defaultSkills.indexOf($scope.newSkill.name) === -1 && $scope.newSkill.name !== undefined) {
        $scope.defaultSkills.push($scope.newSkill.name);
        $scope.newSkill = {};
      } else if ($scope.newSkill.name === undefined) {
        $scope.signupForm.newSkill.$error.pattern = true;
      } else {
        $scope.signupForm.newSkill.$error.duplicate = true;
      }
    };

    $scope.signup = function() {
      $scope.profileData = {
        user: $scope.userData,
        skills: Object.keys($scope.skillData)
      };
      authFactory.signup($scope.profileData)
        .success(signupSuccessCallback)
        .error(signupErrorCallback);
    };

    function signupSuccessCallback(data) {
      console.log('signup success:', data);
      $localStorage.user = data.user;
      $location.path('/dash');
    }

    function signupErrorCallback(data, status) {
      console.log('error:', status);
    }


    $scope.login = function() {
      console.log($scope.loginData);
      authFactory.login($scope.loginData)
        .success(loginSuccessCallback)
        .error(loginErrorCallback);
    };

    function loginSuccessCallback(data) {
      console.log(data);
      $localStorage.user = data.user;
      $location.path('/dash');
    }

    function loginErrorCallback(data, status) {
      console.log(data);
      console.log('error:', status);
    }

    // Landing Page Tab Controls
    $scope.tabData = {
      selectedIndex: 0,
      signupTabIndex: 0
    };

    $scope.nextTab = function(name) {
      if (name === "inner") {
        $scope.tabData.signupTabIndex = tabForward($scope.tabData.signupTabIndex);
      } else {
        $scope.tabData.selectedIndex = tabForward($scope.tabData.selectedIndex);
      }
    };

    $scope.previousTab = function(name) {
      if (name === "inner") {
        $scope.tabData.signupTabIndex = tabBack($scope.tabData.signupTabIndex);
      } else {
        $scope.tabData.selectedIndex = tabBack($scope.tabData.selectedIndex);
      }
    };

    function tabForward(tabIndex) {
      return Math.min(tabIndex + 1, 2);
    }

    function tabBack(tabIndex) {
      return Math.max(tabIndex - 1, 0);
    }

  }]);
