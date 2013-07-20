/*global angular:true, browser:true */

(function (angular) {
  'use strict';

  angular.module('JcApp').controller(
    'AppCtrl', 
    ['$scope', '$window',
      function ($scope, $window) {
        $scope.navigateWithFullReload = function (path) {
          $window.location.href = path;
        };
      }
    ]
  );

    
}(angular));

