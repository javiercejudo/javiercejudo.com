/*global angular:true, Firebase:true, browser:true */

(function (angular) {
  'use strict';

  angular.module('JcApp').controller(
    'AppCtrl',
    ['$scope', '$window', '$location', '$timeout',
      function ($scope, $window, $location, $timeout) {

        // leave empty if using html5mode; otherwise it should be #[hashPrefix]
        $scope.prefixLink = '#!';

        // offline

        // firebase root URL
        $scope.firebaseUrl = 'https://c3jud0.firebaseio.com';

        // firebase local backup
        $scope.firebaseBackupUrl = 'data/min/c3jud0-export.json';

        $scope.$on('$routeChangeSuccess', function() {
          $scope.path = $location.path();

          $scope.sendPageView($scope.path);

          $timeout(function () {
            $scope.scrollToTop();
            $scope.hideMainNavBar();
          });
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
          var mainNavBar = angular.element('#main-navbar');

          if (mainNavBar.is(':visible')) {
            mainNavBar.collapse('hide');
          }
        };
      }
    ]
  );

}(angular));

