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
    });

}(angular));

