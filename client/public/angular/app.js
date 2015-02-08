angular.module('soggyNachos', ['firebase'])

.controller('MainCtrl', ['$scope', '$firebase', function($scope, $firebase){

  // connect to firebase
  var ref = new Firebase("https://amber-heat-3761.firebaseio.com/chat");
  var fb = $firebase(ref);
  // var syncObject = fb.$asArray();

   $scope.messages = fb.$asArray();

  // console.log('firebase sync', syncObject);

  $scope.messages.$add({message: 'test'});

}]);