angular.module('mainController', [])

.controller('MainCtrl', ['$scope', '$firebase', '$http', function($scope, $firebase, $http) {

  // connect to firebase
  var ref = new Firebase("https://amber-heat-3761.firebaseio.com/chat");
  var fb = $firebase(ref);
  // var syncObject = fb.$asArray();

  $scope.messages = fb.$asArray();
}]);
