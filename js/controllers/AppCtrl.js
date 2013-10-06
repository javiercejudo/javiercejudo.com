/*global angular:true, Firebase:true, browser:true */

(function (angular) {
  'use strict';

  angular.module('JcApp').controller(
    'AppCtrl',
    ['$scope', '$window', '$location',
      function ($scope, $window, $location) {

        // leave empty if using html5mode; otherwise it should be #[hashPrefix]
        $scope.prefixLink = '';

        // firebase root URL
        $scope.firebaseUrl = 'https://c3jud0.firebaseio.com';

        $scope.$on('$routeChangeSuccess', function() {
          $scope.path = $location.path();

          if ($window.hasOwnProperty('ga')) {
            $window.ga('send', 'pageview', $location.path());
          }
        });
      }
    ]
  );

}(angular));

