'use strict';

angular.module('<%= angularAppname %>')
.directive('<%= _.camelize(name) %>', <%= minsafeFuncOpen('$scope') %>
  return {
    template: '<div></div>',
    restrict: 'EACM',
    link: function postLink(scope, element, attrs) {
      element.text('this is the <%= _.camelize(name) %> directive');
    }
  };
<%= minsafeFuncClose() %>);
