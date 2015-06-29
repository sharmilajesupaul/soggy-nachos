angular.module('soggyNachos', [
  'ui.router',
  'ui.bootstrap',
  'ngStorage',
  'authController',
  'ngMaterial',
  'ngMessages',
  'ngMdIcons',
  'dashController',
  // Fuck you. Theme Config. Fuck You.
  // 'themeConfig',
  'userFactory',
  'dashFactory',
  'userRoutes',
  'dashRoutes',
  'ngEnter'
])

.run(['$location', '$state', 'authenticationCheck', '$localStorage', function($location, $state, authenticationCheck, $localStorage) {
  // console.log($localStorage.user);
  if (authenticationCheck.check()) {
    $location.path('/dash');
  } else {
    $location.path("/");
  }
  // $location.path("/");
}]);
