/*global angular:true, browser:true */

(function (angular) {
  'use strict';

  angular.module('JcApp')

    .filter('jcCapitalise', [function () {
      return function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };
    }]);

}(angular));

