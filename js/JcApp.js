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
      'ngRoute',
      'ngSanitize',
      'firebase',
      'templates-main',
      'SecretaryProblem'
    ]
  )
    .config([
      '$routeProvider', '$locationProvider',
      function ($routeProvider, $locationProvider) {
        var partialsPath = '/partials';

        $routeProvider

          .when('/', {
              templateUrl: partialsPath + '/home.html',
              controller: 'HomeCtrl'
          })

          .when('/cv/:language', {
              templateUrl: partialsPath + '/cv.html',
              controller: 'CvCtrl'
          })

          .when('/game/:n', {
              templateUrl: partialsPath + '/secretary-problem-standalone.html',
              controller: 'SecretaryProblemCtrl'
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
              templateUrl: partialsPath + '/404.html'
          });

        $locationProvider.html5Mode(false).hashPrefix('!');
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

