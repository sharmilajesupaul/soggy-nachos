angular.module('userFactory', [])

.factory('authenticationCheck', ['$localStorage', function($localStorage) {
  return {

    // isLogged: false,

    check: function() {
      if ($localStorage.user) {
        // this.isLogged = true;
        return true;
      } else {
        // this.isLogged = false;
        delete $localStorage.user;
        return false;
      }
    }
  };
}])

.factory('authFactory', ['$http', '$localStorage', '$location', 'authenticationCheck', function($http, $localStorage, $location, authenticationCheck) {
  return {
    signup: function(user) {
      return $http.post('http://localhost:8080/signup', user);
    },
    login: function(user) {
      return $http.post('http://localhost:8080/login', user);
    },
    logout: function() {
      if (authenticationCheck.check) {
        authenticationCheck.check = false;

        delete $localStorage.user;

        $location.path("/");
      }
    },
    destroy: function() {
      if (authenticationCheck.check) {
        $http.delete('http://localhost:8080/users/' + $localStorage.user._id)
          .success(function(data, status) {
            delete $localStorage.user;


            $location.path("/");
          })
          .error(function(data, status) {
            console.log(status);
          });
      }
    }
  };
}]);
