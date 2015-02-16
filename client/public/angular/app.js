angular.module('soggyNachos', ['firebase'])

.controller('MainCtrl', ['$scope', '$firebase', '$http', function($scope, $firebase, $http){

  // connect to firebase
  var ref = new Firebase("https://amber-heat-3761.firebaseio.com/chat");
  var fb = $firebase(ref);
  // var syncObject = fb.$asArray();

 $scope.messages = fb.$asArray();
}])


.controller('LoginCtrl', ['$scope', '$http', function($scope, $http){
  $scope.user = {};

// Simple POST request example (passing data) :
  $scope.createUser = function () {
    $http.post('http://localhost:3000/users', $scope.user)
    .success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(data);
      })
    .error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(data);
      });
  };
}])

