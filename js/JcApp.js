/*global angular:true, browser:true, ENV:true */

var ENV = ENV || 'live';

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

  var
    dependencies = [
      // angular
      'ngRoute',
      'ngSanitize',
      'ngTouch',

      // vendor
      'firebase',

      // local
      'SecretaryProblem'
    ];

  if (ENV === 'live') {
    dependencies.push('templates-main');
  }

  /**
   * @doc module
   * @name JcApp
   * @description
   *
   * ## JcApp definition
   *
   * Lists the dependencies for the app and defines the routing.
   */
  angular.module('JcApp',  dependencies)

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
      $rootScope.online = $window.navigator.onLine;

      var
        onlineHandler = function () {
          $rootScope.$apply(function() {
            $rootScope.online = false;
          });
        },
        offlineHandler = function () {
          $rootScope.$apply(function() {
            $rootScope.online = false;
          });
        };

      if ($window.addEventListener) {
        $window.addEventListener("offline", onlineHandler, false);
        $window.addEventListener("online", offlineHandler, false);
      } else {
        $window.attachEvent("offline", offlineHandler);
        $window.attachEvent("online", onlineHandler);
      }
    }]);
}(angular));
