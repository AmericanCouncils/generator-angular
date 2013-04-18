'use strict';

angular.module('<%= angularAppname %>', [])
.config(
['$routeProvider',
function ($routeProvider) {
  $routeProvider
    .when('/', {controller: 'MainCtrl', templateUrl: 'views/main.html'})
    .otherwise({redirectTo: '/'});
}]);
