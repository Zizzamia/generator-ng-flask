'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.pages:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of <%= scriptAppName %>
 */
angular.module('<%= scriptAppName %>.pages.home', [])
.controller('HomeCtrl', function($rootScope) {
  $rootScope.activePage = 'home';
});
