'use strict';

angular.module('<%= angularAppname %>')
.controller('<%= _.classify(name) %>Ctrl', <%= minsafeFuncOpen('$scope') %>
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Testacular'
  ];
<%= minsafeFuncClose() %>);
