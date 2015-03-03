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

.controller('FeedCtrl', ['$scope', '$localStorage', '$http', 'friends', 'userData', function($scope, $localStorage, $http, friends, userData){

  currentUserId = $localStorage.user.id

  $scope.sendFriendRequest = function(requested_id) {
    friends.sendRequest(currentUserId, requested_id)
    .success(function(data){
      console.log(data)
    })
    .error(function(data, status){
      console.log(status)
    });
  };

  $scope.confirmFriend = function(friend_id) {
    console.log('friend id: ', friend_id)
    friends.createFriendship(currentUserId, friend_id)
    .success(function(data){
      console.log('friendship created')
      console.log(data)
    })
    .error(function(data, status){
      console.log(status)
    })
  }

  friends.getFriends(currentUserId)
  .success(function(data){
    console.log('success')
    console.log('friends: ', data)
    $scope.friends = data 
  })
  .error(function(data, status){
    console.log(status)
  })

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

  friends.getRequests(currentUserId)
  .success(function(data){
    $scope.requestsReceived = data
    console.log('success')
    console.log(data)
  })
  .error(function(data, status){
    console.log('failure')
    console.log(status)
  })

  friends.getSentRequests(currentUserId)
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