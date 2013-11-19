/*global angular:true, Firebase:true, browser:true, jQuery:true */

(function (angular, $) {
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

        $scope.firebase = {
          ref: null
        };

        $scope.$watch('cv.data', function (data) {
          if (!data) {
            return;
          }

          $scope.cv.loading = false;
          $scope.setLanguage();
        });

        $scope.initCv = function () {
          var cv = $scope.cv;
//          var firebase = $scope.firebase;
//          var firebasePromise;

          cv.loading = true;

          if (!$rootScope.online || true) {
            $scope.setCvDataFromBackup();
          }

//          firebase.ref = new Firebase('https://c3jud0.firebaseio.com/cv');
//          firebasePromise = angularFire(firebase.ref, $scope, 'cv.data');
//
//          firebasePromise.then(function () {
//            cv.loading = false;
//            $scope.setLanguage();
//          }, function () {
//            $scope.setCvDataFromBackup();
//          });
        };

//        $scope.setCvData = function () {
//          var cv = $scope.cv;
//
//          $http.get($scope.firebaseUrl + '/cv.json', {cache: true})
//            .success(function (response) {
//              $scope.successCallback(response);
//            })
//            .error(function () {
//              $scope.setCvDataFromBackup();
//            });
//        };

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

          // uses jQuery's inArray instead of indexOf dure to IE < 9 issues
          if (params.language && $.inArray(params.language, languages) !== -1) {
            $rootScope.pageTitle = 'CV: ' + $filter('jcCapitalise')(params.language);
            $scope.cvLocal = cv.data[params.language];
            return;
          }

          $location.path('/cv/english');
          $location.replace();
        };
      }]
  );

}(angular, jQuery));
