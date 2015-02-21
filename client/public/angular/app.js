angular.module('soggyNachos', ['firebase',
                               'ui.router',
                               'ngStorage',
                               'authController',
                               'ngMaterial',
                               'ngMessages',
                               'ngMdIcons',
                               'dashController',
                               'themeConfig',
                               'userFactory',
                               'userRoutes',
                               'dashRoutes'])

.run(['$location', '$state', 'authenticationCheck', '$localStorage', function($location, $state, authenticationCheck, $localStorage){
    // console.log($localStorage.user);


    if (authenticationCheck.check()) {
      $location.path('/dash');
    } else {
      $location.path("/");
    }


    // $location.path("/");
}])

.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
})

.controller('MainCtrl', ['$scope', '$firebase', '$http', function($scope, $firebase, $http){

  // connect to firebase
  var ref = new Firebase("https://amber-heat-3761.firebaseio.com/chat");
  var fb = $firebase(ref);
  // var syncObject = fb.$asArray();

 $scope.messages = fb.$asArray();
}]);
