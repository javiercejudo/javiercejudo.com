/*global angular:true, browser:true */

(function (angular) {
  'use strict';

  angular.module('JcApp').controller(
    'CvCtrl',
    ['$rootScope', '$scope', '$routeParams', '$location', '$http', '$filter',
      function ($rootScope, $scope, $routeParams, $location, $http, $filter) {
        $scope.cv = {
          loading: true,
          error: false,
          params: $routeParams,
          languages: ['english', 'spanish'],
          data: null,
          language: null
        };
        
        $scope.initCv = function () {
          var cv = $scope.cv;

          cv.loading = true;

          $http.get($scope.firebaseUrl + '/cv.json', {cache: true})
            .success(function (response) {
              cv.loading = false;
              cv.data = response;
              $scope.setLanguage();
            })
            .error(function (error) {
              cv.loading = false;
              cv.error = true;
            });
        };
        
        $scope.setLanguage = function () {
          var
            cv = $scope.cv,
            params = cv.params,
            languages = cv.languages;

          cv.language = params.language;

          if (params.language && languages.indexOf(params.language) !== -1) {
            $rootScope.pageTitle = 'CV: ' + $filter('jcCapitalise')(params.language);
            $scope.cvLocal = cv.data[params.language];
            return;
          }

          $location.path('/cv/english');
          $location.replace();
        };
      }]
  );

}(angular));

