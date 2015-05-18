angular.module('dashController', [])
  .controller('DashCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', 'authFactory', '$localStorage', function($scope, $timeout, $mdSidenav, $log, authFactory, $localStorage) {
    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };

    $scope.logout = function() {
      authFactory.logout();
    };

    $scope.destroy = function() {
      authFactory.destroy();
    };

  }])

.controller('FeedCtrl', ['$scope', '$localStorage', '$http', 'collaborators', 'userData', function($scope, $localStorage, $http, collaborators, userData) {

  $scope.currentUserId = $localStorage.user._id;

  $scope.sendCollaborationRequest = function(requestedUser) {
    collaborators.sendRequest($scope.currentUserId, requestedUser._id)
      .success(function(data) {
        $scope.requestsSent.push(requestedUser);
        console.log(data);
      })
      .error(function(data, status) {
        console.log(status);
      });
  };

  $scope.removeRequest = function(request) {
    var index = $scope.requestsReceived.indexOf(request);
    $scope.requestsReceived.splice(index, 1);
  };

  $scope.confirmRequest = function(request) {
    collaborators.createCollaboration($scope.currentUserId, request.requestSender)
      .success(function(data) {
        $scope.removeRequest(request);
        var alreadyCollaborators = false;
        $scope.collaborators.forEach(function(collaborator) {
          if (collaborator._id === request.requestSender) {
            alreadyCollaborators = true;
          }
        });
        if (alreadyCollaborators === false) {
          $scope.collaborators.push(request);
        }
        console.log(data);
      })
      .error(function(data, status) {
        console.log(status);
      });
  };

  $scope.declineCollaboration = function(request) {
    collaborators.declineCollaboration($scope.currentUserId, request.requestSender)
      .success(function(data) {
        $scope.removeRequest(request);
      })
      .error(function(data, status) {
        console.log(status);
      });
  };

  collaborators.getCollaborations($scope.currentUserId)
    .success(function(data) {
      console.log('success');
      console.log('collaborators: ', data);
      $scope.collaborators = data;
    })
    .error(function(data, status) {
      console.log(status);
    });

  userData.getAllUsers($scope.currentUserId)
    .success(function(data) {
      console.log('success');
      var userData = data;
      $scope.users = [];
      userData.forEach(function(user) {
        if (user._id != $scope.currentUserId) {
          $scope.users.push(user);
        }
      });
    })
    .error(function(data, status) {
      console.log('failure');
      console.log(status);
    });

  collaborators.getRequests($scope.currentUserId)
    .success(function(data) {
      $scope.requestsReceived = data;
      console.log('success');
    })
    .error(function(data, status) {
      console.log('failure');
      console.log(status);
    });

  collaborators.getSentRequests($scope.currentUserId)
    .success(function(data) {
      $scope.requestsSent = data;
      console.log('success');
    })
    .error(function(data, status) {
      console.log('failure');
      console.log(status);
    });

}]);
