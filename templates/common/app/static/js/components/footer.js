'use strict';

/**
 * @ngdoc directive
 * @name <%= scriptAppName %>.component.footer
 * @description
 * # footer
 */
angular.module('<%= scriptAppName %>.components.footer', [])
.directive('<%= appname %>Footer', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'components/footer.html',
  };
});
