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

  $scope.sendFriendRequest = function(requestedUser) {
    friends.sendRequest(currentUserId, requestedUser.id)
    .success(function(data){
      // var alreadyRequested = false
      // $scope.requestsSent.forEach(function(request){
      //   if (request.id == requestedUser.id) {
      //     alreadyRequested = true
      //   }
      // })
      // if (alreadyRequested == false){
      //   $scope.requestsSent.push(requestedUser)
      // }
      console.log(data)
    })
    .error(function(data, status){
      console.log(status)
    });
  };

  $scope.removeRequest = function(request){
    var index = $scope.requestsReceived.indexOf(request)
    $scope.requestsReceived.splice(index, 1)
  }

  $scope.confirmRequest = function(request) {
    friends.createFriendship(currentUserId, request.id)
    .success(function(data){
      $scope.removeRequest(request)
      var alreadyFriend = false
      $scope.friends.forEach(function(friend){
        if (friend.id == request.id) {
          alreadyFriend = true
        }
      })
      if (alreadyFriend == false) {
        $scope.friends.push(request)
      }
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