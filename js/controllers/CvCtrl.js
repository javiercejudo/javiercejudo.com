/*global angular:true, Firebase:true, browser:true */

(function (angular) {
  'use strict';

  angular.module('JcApp').controller(
    'CvCtrl',
    ['$rootScope', '$scope', '$routeParams', '$location', '$http', '$filter', 'angularFire',
      function ($rootScope, $scope, $routeParams, $location, $http, $filter, angularFire) {
        $scope.cv = {
          loading: true,
          error: false,
          params: $routeParams,
          languages: ['english', 'spanish'],
          data: null,
          language: null
        };

        $scope.$watch('cv.data', function (data) {
          if (!data) {
            return;
          }

          $scope.cv.loading = false;
          $scope.setLanguage();
        });

        $scope.firebase = {
          ref: null
        };

        $scope.initCv = function () {
          var cv = $scope.cv;
          var firebaseRef = $scope.firebase.ref;

          cv.loading = true;

          $scope.setCvDataFromBackup();

          if ($rootScope.online) {
            firebaseRef = new Firebase('https://c3jud0.firebaseio.com/cv');
            angularFire(firebaseRef, $scope, 'cv.data');
          }
        };

        $scope.setCvData = function () {
          var cv = $scope.cv;

          $http.get($scope.firebaseUrl + '/cv.json', {cache: true})
            .success(function (response) {
              $scope.successCallback(response);
            })
            .error(function () {
              $scope.setCvDataFromBackup();
            });
        };

        $scope.setCvDataFromBackup = function () {
          var cv = $scope.cv;

          $http.get($scope.firebaseBackupUrl, {cache: true})
            .success(function (response) {
              $scope.successCallback(response.cv);
            })
            .error(function () {
              cv.loading = false;
              cv.error = true;
            });
        };

        $scope.successCallback = function (response) {
          var cv = $scope.cv;

          cv.loading = false;
          cv.data = response;

          $scope.setLanguage();
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

