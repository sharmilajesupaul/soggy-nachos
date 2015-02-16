angular.module('soggyNachos', ['firebase', 'authController', 'userFactory'])

.controller('MainCtrl', ['$scope', '$firebase', '$http', function($scope, $firebase, $http){

  // connect to firebase
  var ref = new Firebase("https://amber-heat-3761.firebaseio.com/chat");
  var fb = $firebase(ref);
  // var syncObject = fb.$asArray();

 $scope.messages = fb.$asArray();
}])

.controller('UserCtrl', ['$scope', 'authFactory', function($scope, authFactory){
	$scope.userData = {}
	$scope.onSubmit = function(){
		authFactory.login($scope.userData)
	}
}])

.factory('authFactory', function($http) {
	return {
		login: function(loginData){
			$http.post('http://localhost:3000/login', loginData)
		}
	}
})
