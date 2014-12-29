'use strict';

/**
 * @ngdoc directive
 * @name <%= scriptAppName %>.component.header
 * @description
 * # header
 */
angular.module('<%= scriptAppName %>.components.header', [])
.directive('<%= appname %>Header', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'components/header.html',
  };
});
