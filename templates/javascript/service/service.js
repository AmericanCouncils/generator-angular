'use strict';

angular.module('<%= angularAppname %>')
.service('<%= _.camelize(name) %>', <%= minsafeFuncOpen() %>
  // AngularJS will instantiate a singleton by calling "new" on this function
<%= misafeFuncClose() %>);
