'use strict';

angular.module('<%= angularAppname %>')
.filter('<%= _.camelize(name) %>', <%= minsafeFuncOpen('$routeProvider') %>
  return function (input) {
    return '<%= _.camelize(name) %> filter: ' + input;
  };
<%= minsafeFuncClose() %>);
