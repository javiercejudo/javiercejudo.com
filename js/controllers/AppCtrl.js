/*global angular:true, browser:true */

(function (angular) {
  'use strict';

  angular.module('JcApp').controller(
    'AppCtrl', 
    ['$scope', '$location',
      function ($scope, $location) {
        $scope.$on('$routeChangeSuccess', function() { 
          $scope.path = $location.path();
        });
      }
    ]
  );

    
}(angular));

