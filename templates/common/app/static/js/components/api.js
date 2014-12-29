'use strict';

/**
 * @ngdoc service
 * @name <%= scriptAppName %>.components.api
 * @description
 *
 */
angular.module('<%= scriptAppName %>.components.api', [])
.factory('api', function(coffeeShop) {
  return {
    'coffeeShop': coffeeShop
  };
})
.factory('coffeeShop', function($http) {
  var list = function (params) {
    return $http.get('/api/coffee-shop/list.json', { 'params': params });
  };
  return {
    'list': list
  };
});
