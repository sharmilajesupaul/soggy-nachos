angular.module('dashController', [])
.controller('DashCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', 'authFactory', '$localStorage', function($scope, $timeout, $mdSidenav, $log, authFactory, $localStorage){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  }

  $scope.logout = function() {
    authFactory.logout()
  }

  $scope.destroy = function() {
    authFactory.destroy()
  }

}])

.controller('FeedCtrl', ['$scope', '$localStorage', '$http', 'friendRequests', 'userData', function($scope, $localStorage, $http, friendRequests, userData){

  currentUserId = $localStorage.user.id

  $scope.sendFriendRequest = function(requested_id) {
    friendRequests.sendRequest(currentUserId, requested_id)
    .success(function(data){
      console.log(data)
    })
    .error(function(data, status){
      console.log(status)
    });
  };

  userData.getAllUsers()
  .success(function(data){
    console.log('success')
    console.log(data)
    $scope.users = data
  })
  .error(function(data, status){
    console.log('failure')
    console.log(status)
  });

  friendRequests.getRequests(currentUserId)
  .success(function(data){
    $scope.requestsReceived = data
    console.log('success')
    console.log(data)
  })
  .error(function(data, status){
    console.log('failure')
    console.log(status)
  })

  friendRequests.getSentRequests(currentUserId)
  .success(function(data){
    $scope.requestsSent = data
    console.log('success')
    console.log(data)
  })
  .error(function(data, status){
    console.log('failure')
    console.log(status)
  })


}])