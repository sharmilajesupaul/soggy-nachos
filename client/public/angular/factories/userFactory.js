angular.module('userFactory', [])

.factory('authenticationCheck', ['$localStorage', function($localStorage){
  var auth = {

    isLogged: false,

    check: function() {
      if ($localStorage.user) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
        delete $localStorage.user;
        delete $localStorage.token;
      }
    }
  };

  return auth;
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
      if (authenticationCheck.isLogged) {
        authenticationCheck.isLogged = false;

        delete $localStorage.user;

        // if we choose to store token in local storage
        // delete $localStorage.token;

        $location.path("/landing");
      }
    }
  };
}]);

