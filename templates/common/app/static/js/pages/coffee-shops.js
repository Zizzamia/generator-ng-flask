'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.pages:CoffeeShopsCtrl
 * @description
 * # CoffeeShopsCtrl
 * Controller of <%= scriptAppName %>
 */
angular.module('<%= scriptAppName %>.pages.coffeeShops', [])
.controller('CoffeeShopsCtrl', function($rootScope, $scope, api) {
  $rootScope.activePage = 'coffee-shops';
  $scope.resource = {
    'header': [],
    'rows': []
  };

  api.coffeeShop.list().then(function (response) {
    $scope.resource = {
      'header': response.data.coffee_shops.header,
      'rows': response.data.coffee_shops.rows,
      'sortBy': 'name',
      'sortOrder': 'asc'
    };
  });
});
