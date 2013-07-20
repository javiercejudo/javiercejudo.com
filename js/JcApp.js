/*global angular:true, browser:true */

(function (angular) {
  'use strict';

  angular.module('JcApp', [])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
      $routeProvider.when('/', {
          templateUrl: '/partials/home.html'
      }).otherwise({
          redirectTo: '/'
      });
    
      // configure routes
      $locationProvider.html5Mode(true).hashPrefix('!');
    }]);
}(angular));

