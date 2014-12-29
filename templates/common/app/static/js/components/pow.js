/**
 * @ngdoc directive
 * @name <%= scriptAppName %>.component.pow
 * @description
 * # pow
 */
angular.module('<%= scriptAppName %>.components.pow', [])
.directive('pow', function () {
  return {
    restrict: 'E',
    scope: {
      base: '=',
      exponent: '='
    },
    templateUrl: 'components/pow.html',
    link: function postLink(scope, element, attrs) {
      var calculatePow, powResult;

      element.text(0);

      calculatePow = function (base, exponent) {
        if (base && exponent) {
          powResult = Math.pow(base, exponent);
          element.text(powResult);
        }
      };
      
      scope.$watch('base', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          calculatePow(scope.base,scope.exponent )
        }
      });
      scope.$watch('exponent', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          calculatePow(scope.base,scope.exponent )
        }
      });
    }
  };
});
