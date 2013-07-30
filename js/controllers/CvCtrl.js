/*global angular:true, browser:true */

(function (angular) {
  'use strict';

  angular.module('JcApp').controller(
    'CvCtrl',
    ['$scope', '$routeParams',
      function ($scope, $routeParams) {
        $scope.cv = {
          params: $routeParams,
          languages: ['english', 'spanish'],
          data: {
            english: {
              name: {
                label: "Name",
                value: "Javier Cejudo"
              }
            },
            spanish: {
              name: {
                label: "Nombre",
                value: "Javier Cejudo Goñi"
              }
            }
          },
          language: null
        };

        $scope.initCv = function () {
          $scope.setLanguage();
        };
        
        $scope.setLanguage = function () {
          var
            cv = $scope.cv,
            params = cv.params,
            languages = cv.languages;

          cv.language = params.language;

          if (!params.language || languages.indexOf(params.language) === -1) {
            params.language = 'english';
            cv.language = params.language;
          }
        };
      }]
  );

}(angular));

