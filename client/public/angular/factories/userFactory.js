angular.module('userFactory', [])

.factory('authenticationCheck', ['$localStorage', function($localStorage){
  return {

    // isLogged: false,

    check: function() {
      if ($localStorage.user && $localStorage.token) {
        // this.isLogged = true;
        return true;
      } else {
        // this.isLogged = false;
        delete $localStorage.user;
        delete $localStorage.token;
        return false;
      }
    }
  };
}])

.factory('authFactory', ['$http', '$localStorage', '$location', 'authenticationCheck',  function($http, $localStorage, $location, authenticationCheck){
  return {
    signup: function (user) {
      return $http.post('http://localhost:3000/users', user);
    },
    login: function (user){
      return $http.post('http://localhost:3000/login', user);
    },
    logout: function() {
      if (authenticationCheck.check) {
        authenticationCheck.check = false;

        delete $localStorage.user;
        delete $localStorage.token;
        
        $location.path("/");
      }
    }
  };
}]);

