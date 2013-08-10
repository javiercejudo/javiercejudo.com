/*global angular:true, browser:true */

(function (angular) {
  'use strict';

  angular.module('JcApp').controller(
    'AppCtrl', 
    ['$scope', '$window', '$location',
      function ($scope, $window, $location) {
        $scope.$on('$routeChangeSuccess', function() { 
          $scope.path = $location.path();
          $window._gaq.push(['_trackPageview', $location.path()]);
        });
      }
    ]
  );

    
}(angular));

