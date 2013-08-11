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
  angular.module('JcApp', ['ngSanitize'])
    .config([
      '$routeProvider', '$locationProvider',
      function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: '/partials/home.html',
            controller: 'HomeCtrl'
        }).when('/cv', {
            redirectTo: '/cv/english'
        }).when('/curriculum', {
            redirectTo: '/cv/english'
        }).when('/cv/:language', {
            templateUrl: '/partials/cv.html',
            controller: 'CvCtrl'
        }).otherwise({
            templateUrl: '/partials/404.html'
        });
      
        $locationProvider.html5Mode(true).hashPrefix('!');
    }]);
}(angular));

