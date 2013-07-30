/*global angular:true, browser:true */

(function (angular) {
  'use strict';

  angular.module('JcApp', [])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
      $routeProvider.when('/', {
          templateUrl: '/partials/home.html',
          controller: 'HomeCtrl'
      //}).when('/cv', {
      //    redirectTo: '/cv/english'
      //}).when('/cv/:language', {
      //    templateUrl: '/partials/cv.html',
      //    controller: 'CvCtrl'
      }).otherwise({
          redirectTo: '/'
      });
    
      // configure routes
      $locationProvider.html5Mode(true).hashPrefix('!');
    }]);
}(angular));

