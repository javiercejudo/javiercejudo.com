/*global angular:true, browser:true, ENV:true, JS_TEMPLATES_IN_DEV:true */

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
      'ngAnimate',
      'ngRoute',
      'ngSanitize',
      'ngTouch',

      // vendor
      'ngStorage',
      'firebase',

      // local
      'SecretaryProblem'
    ];

  if (ENV !== 'dev' || JS_TEMPLATES_IN_DEV) {
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

        var getTemplatePath = function (templateName) {
          return 'partials' + '/' + templateName + '.html';
        };

        $routeProvider

          // proper routes
          .when('/', {
              templateUrl: getTemplatePath('home'),
              controller: 'HomeCtrl'
          })

          .when('/cv/:language', {
              templateUrl: getTemplatePath('cv'),
              controller: 'CvCtrl'
          })

          .when('/game/:n', {
              templateUrl: getTemplatePath('secretary-problem-standalone'),
              controller: 'SecretaryProblemCtrl'
          })

          // redirections
          .when('/en', {
              redirectTo: '/'
          })

          .when('/es', {
              redirectTo: '/cv/spanish'
          })

          .when('/cv', {
              redirectTo: '/cv/english'
          })

          .when('/game', {
            redirectTo: '/game/10'
          })

          .when('/secretary-problem', {
              redirectTo: '/game'
          })

          // error page
          .otherwise({
              templateUrl: getTemplatePath('404')
          });

        $locationProvider.html5Mode(false).hashPrefix('!');
    }])

    .run(['$window', '$rootScope', function($window, $rootScope) {
      $rootScope.online = $window.navigator.onLine;

      var onlineHandler, offlineHandler;

      onlineHandler = function () {
        $rootScope.$apply(function() {
          $rootScope.online = false;
        });
      };

      offlineHandler = function () {
        $rootScope.$apply(function() {
          $rootScope.online = false;
        });
      };

      if (!$window.addEventListener) {
        $window.attachEvent("offline", offlineHandler);
        $window.attachEvent("online", onlineHandler);
        return;
      }

      $window.addEventListener("offline", offlineHandler, false);
      $window.addEventListener("online", onlineHandler, false);
    }]);
}(angular));
