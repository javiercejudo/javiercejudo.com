/*global angular:true, browser:true */

(function (angular) {
  'use strict';

  angular.module('JcApp')

    .directive('jcPreventDefault', function () {
      return function (scope, element) {
        element.bind('click', function (e) {
          e.preventDefault();
        });
      };
    })

    .directive('jcPageTitle', ['$rootScope', function ($rootScope) {
      return function (scope, element, attrs) {
        if (!attrs.hasOwnProperty('jcPageTitle')) {
          attrs.jcPageTitle = 'Welcome';
        }

        $rootScope.pageTitle = attrs.jcPageTitle;
      };
    }]);

}(angular));

