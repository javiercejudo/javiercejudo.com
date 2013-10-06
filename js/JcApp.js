/*global angular:true, browser:true */

/**
 * @doc overview
 * @name index
 * @description
 *
 * #JcApp
 *
 * My personal website.
 */

(function (angular) {
  'use strict';

  /**
   * @doc module
   * @name JcApp
   * @description
   *
   * ## JcApp definition
   *
   * Lists the dependencies for the app and defines the routing.
   */
  angular.module(
    'JcApp',
    [
      'ngSanitize',
      'templates-main',
      'SecretaryProblem'
    ]
  )
    .config([
      '$routeProvider', '$locationProvider',
      function ($routeProvider, $locationProvider) {
        $routeProvider

          .when('/', {
              templateUrl: 'partials/home.html',
              controller: 'HomeCtrl'
          })

          .when('/cv/:language', {
              templateUrl: 'partials/cv.html',
              controller: 'CvCtrl'
          })

          .when('/game/:n', {
              templateUrl: 'partials/secretary-problem-standalone.html'
          })

          .when('/game', {
              redirectTo: '/game/10'
          })

          .when('/en', {
              redirectTo: '/'
          })

          .when('/es', {
              redirectTo: '/cv/spanish'
          })

          .when('/cv', {
              redirectTo: '/cv/english'
          })

          .otherwise({
              templateUrl: 'partials/404.html'
          });

        $locationProvider.html5Mode(true).hashPrefix('!');
    }])

    .run(['$window', '$rootScope', function($window, $rootScope) {
      $rootScope.online = navigator.onLine;

      $window.addEventListener("offline", function () {
        $rootScope.$apply(function() {
          $rootScope.online = false;
        });
      }, false);

      $window.addEventListener("online", function () {
        $rootScope.$apply(function() {
          $rootScope.online = true;
        });
      }, false);
    }]);
}(angular));

