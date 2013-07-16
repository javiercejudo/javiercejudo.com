/*global angular:true, browser:true */

(function () {
  'use strict';

  angular.module('cejudoApp', [])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
      $routeProvider.when('/', {
          templateUrl: '/partials/home.html'
      }).otherwise({
          redirectTo: '/'
      });
    
      // configure routes
      $locationProvider.html5Mode(false).hashPrefix('!');
    }]);
}());

