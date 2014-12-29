'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>
 */
angular.module('<%= scriptAppName %>', [
  'ngRoute',
  'ngTasty',
  '<%= scriptAppName %>.components.api',
  '<%= scriptAppName %>.components.pow',
  '<%= scriptAppName %>.pages.home',
  '<%= scriptAppName %>.pages.coffeeShops'
])
.config(function ($interpolateProvider, $locationProvider, $routeProvider) {
  $routeProvider
  .when('/', {
    controller: 'HomeCtrl',
    templateUrl: 'pages/home.html',
    title: '<%= scriptAppName %>'
  })
  .when('/coffee-shops', {
    controller: 'CoffeeShopsCtrl',
    templateUrl: 'pages/coffee-shops.html',
    title: '<%= scriptAppName %> - coffeeShops'
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
  $rootScope.template = {
    'header': 'partials/header.html',
    'footer': 'partials/footer.html'
  };
});
