'use strict';

angular.module('<%= _.camelize(appname) %>App')
  .controller('<%= _.classify(name) %>Ctrl', ['$scope', function ($scope) {
    $scope.view = { template: 'views/<%= _.camelize(name) %>.html' };
  }]);
