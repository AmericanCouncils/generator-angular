'use strict';

angular.module('<%= angularAppname %>', [
  // Angular modules that your app depends on
]).config(<%= minsafeFuncOpen('$routeProvider') %>
  $routeProvider
    .when('/', {controller: 'MainCtrl', templateUrl: 'views/main.html'})
    .otherwise({redirectTo: '/'});
<%= minsafeFuncClose() %>);
