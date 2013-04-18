'use strict';

angular.module('<%= angularAppname %>')
.factory('<%= _.camelize(name) %>', <%= minsafeFuncOpen() %>
  // Service logic
  // ...

  var meaningOfLife = 42;

  // Public API here
  return {
    someMethod: function () {
      return meaningOfLife;
    }
  };
<%= minsafeFuncClose() %>);
