(function(module) {
try {
  module = angular.module('myApp.template');
} catch (e) {
  module = angular.module('myApp.template', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('pow.html',
    '<div>mare</div>');
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
    'ciao');
}]);
})();
