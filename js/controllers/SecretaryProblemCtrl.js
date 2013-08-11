/*global angular:true, browser:true */

(function (angular) {
  'use strict';

  angular.module('JcApp').controller(
    'SecretaryProblemCtrl', 
    ['$scope',
      function ($scope) {
        $scope.game = {
          title: 'world'
        };
      }
    ]
  );

    
}(angular));

