angular.module('userFactory', [])
.factory('authFactory', ['$http', function($http){
  return {
    signup: function (user) {
      return $http.post('http://localhost:3000/users', user);
    },
    login: function (user){
      return $http.post('http://localhost:3000/login', user);
    }
  };
}]);