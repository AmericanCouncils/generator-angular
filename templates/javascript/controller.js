'use strict';

angular.module('<%= _.camelize(appname) %>App')
  .controller('<%= _.classify(name) %>Ctrl', function ($scope) {
    $scope.view = {
        template: 'views/main.html'
    }
  });
