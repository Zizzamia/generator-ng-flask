angular.module('myApp', [
  'ngRoute',
  'ngTasty',
  'myApp.components.api',
  'myApp.components.pow',
  'myApp.pages.home',
  'myApp.pages.about'
])
.config(function ($interpolateProvider, $locationProvider, $routeProvider) {
  $routeProvider
  .when('/', {
    controller: 'HomeCtrl',
    templateUrl: 'pages/home.html',
    title: 'myApp'
  })
  .when('/about', {
    controller: 'AboutCtrl',
    templateUrl: 'pages/about.html',
    title: 'myApp - About'
  })
  .otherwise({ redirectTo: '/' });

  $locationProvider.html5Mode(true);

  // We need replace {{ }} with  [[ ]]
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
})
.run(function ($rootScope, $route) {
  $rootScope.$on('$routeChangeSuccess', function(currentRoute, previousRoute){
    //Change page title, based on Route information
    $rootScope.title = $route.current.title;
  });
});
