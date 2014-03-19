/*global angular, Firebase */

(function (angular) {
  'use strict';

  angular.module('JcApp').controller(
    'AppCtrl',
    ['$scope', '$window', '$location', '$timeout',
      function ($scope, $window, $location, $timeout) {

        // leave empty if using html5mode; otherwise it should be #[hashPrefix]
        $scope.prefixLink = '#!';

        // firebase root URL
        $scope.firebaseUrl = 'https://c3jud0.firebaseio.com';

        // firebase local backup
        $scope.firebaseBackupUrl = 'data/min/c3jud0-export.json';

        $scope.$on('$routeChangeSuccess', function() {
          $scope.path = $location.path();

          $scope.sendPageView($scope.path);

          $scope.scrollToTop();
          $scope.hideMainNavBar();
        });

        $scope.sendPageView = function (path) {
          if ($window.hasOwnProperty('ga')) {
            $window.ga('send', 'pageview', path);
          }
        };

        $scope.scrollToTop = function () {
          $window.scrollTo(0, 0);
        };

        $scope.hideMainNavBar = function () {
          var
            navBar = angular.element('#main-navbar'),
            collapsible = navBar.find('.navbar-collapse'),
            toggle = navBar.find('.navbar-toggle');

          if (collapsible.is(':visible') && toggle.is(':visible')) {
            collapsible.collapse('hide');
          }
        };
      }
    ]
  );

}(angular));

