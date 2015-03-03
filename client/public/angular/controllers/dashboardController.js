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

.controller('FeedCtrl', ['$scope', '$localStorage', '$http', function($scope, $localStorage, $http){

  currentUserId = $localStorage.user.id

  $scope.sendFriendRequest = function(requested_id) {
    $http.post('http://localhost:3000/friend_requests', {requesting_user_id: currentUserId, requested_user_id: requested_id})
    .success(function(data){
      console.log(data)
    })
    .error(function(data, status){
      console.log(status)
    });
  };

  $http.get('http://localhost:3000/users')
  .success(function(data){
    console.log('success')
    console.log(data)
    $scope.users = data
  })
  .error(function(data, status){
    console.log('failure')
    console.log(status)
  });

  $http.get('http://localhost:3000/friend_requests/'+currentUserId)
  .success(function(data){
    $scope.requestsReceived = data
    console.log('success')
    console.log(data)
  })
  .error(function(data, status){
    console.log('failure')
    console.log(status)
  })

  $http.get('http://localhost:3000/friend_requests_sent/'+currentUserId)
  .success(function(data){
    $scope.requestsSent = data
    console.log('success')
    console.log(data)
  })
  .error(function(data, status){
    console.log('failure')
    console.log('status')
  })


}])