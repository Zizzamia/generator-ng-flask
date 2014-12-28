(function(module) {
try {
  module = angular.module('myApp.template');
} catch (e) {
  module = angular.module('myApp.template', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('pow.html',
    '<span pow base="baseNumber" exponent="exponentNumber"></span>');
}]);
})();

(function(module) {
try {
  module = angular.module('myApp.template');
} catch (e) {
  module = angular.module('myApp.template', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('home.html',
    '<div class="content">\n' +
    '  <p>Calculate the pow by AngularJS</p>\n' +
    '  <form>\n' +
    '    <div class="form-group">\n' +
    '      <label for="baseNumber" class="control-label">Base number</label>\n' +
    '      <input type="number" class="form-control" \n' +
    '      id="baseNumber" placeholder="Enter base" ng-model="baseNumber">\n' +
    '    </div>\n' +
    '    <div class="form-group">\n' +
    '      <label for="exponentNumber" class="control-label">Exponent number</label>\n' +
    '      <input type="number" class="form-control" \n' +
    '      id="exponentNumber" placeholder="Enter exponent" ng-model="exponentNumber" >\n' +
    '    </div>\n' +
    '  </form>\n' +
    '  <pow base="baseNumber" exponent="exponentNumber"></pow>\n' +
    '</div>\n' +
    '');
}]);
})();
