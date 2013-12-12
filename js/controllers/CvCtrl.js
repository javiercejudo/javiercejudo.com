/*global angular:true, Firebase:true, browser:true */

(function (angular) {
  'use strict';

  angular.module('JcApp').controller(
    'CvCtrl',
    ['$rootScope', '$scope', '$routeParams', '$location', '$http', '$filter', '$timeout', 'angularFire', '$localStorage',
      function ($rootScope, $scope, $routeParams, $location, $http, $filter, $timeout, angularFire, $localStorage) {
        $scope.cv = {
          loading: true,
          error: false,
          params: $routeParams,
          languages: [],
          data: null
        };

        $scope.storage = $localStorage;

        $scope.firebase = {
          ref: null
        };

        $scope.$watch('cv.data', function (data) {
          if (!data) {
            return;
          }

          $scope.cv.loading = false;
          $scope.setAvailableLanguages();
          $scope.setLanguage();
          $scope.saveToLocalStorage();
        });

        $scope.initCv = function () {
          var
            cv = $scope.cv,
            firebase = $scope.firebase,
            firebasePromise,
            localStorageContent;

          localStorageContent = $scope.retrieveFromLocalStorage();

          if (!localStorageContent) {
            $scope.setCvData();
          } else {
            cv.data = localStorageContent;
            cv.loading = false;
          }

          if (!$rootScope.online) {
            return;
          }

          firebase.ref = new Firebase($scope.firebaseUrl + '/cv');
          firebasePromise = angularFire(firebase.ref, $scope, 'cv.data');

          firebasePromise.then(function () {
            cv.loading = false;
          }, function () {
            cv.loading = false;
            // no need to do anything else as data from either
            // local storage or back up is already loaded at this point
          });
        };

        $scope.setCvData = function () {
          var cv = $scope.cv;

          $http.get($scope.firebaseUrl + '/cv.json', {cache: true})
            .success(function (response) {
              cv.loading = false;
              $scope.successCallback(response);
            })
            .error(function () {
              $scope.setCvDataFromBackup(500);
            });
        };

        $scope.setCvDataFromBackup = function (fakeDelay) {
          var
            cv = $scope.cv,
            requestOptions = {
              cache: true
            };

          fakeDelay = fakeDelay || 0;

          cv.loading = true;

          $timeout(function () {
            $http.get($scope.firebaseBackupUrl, requestOptions)
              .success(function (response) {
                cv.loading = false;
                $scope.successCallback(response.cv);
              })
              .error(function () {
                cv.loading = false;
                cv.error = true;
              });
          }, fakeDelay);
        };

        $scope.successCallback = function (response) {
          var cv = $scope.cv;

          cv.data = response;
        };

        $scope.retrieveFromLocalStorage = function () {
          return $scope.storage['cv-data'];
        };

        $scope.saveToLocalStorage = function () {
          $scope.storage['cv-data'] = $scope.cv.data;
        };
        
        $scope.setAvailableLanguages = function () {
          var
            cv = $scope.cv,
            languages = [];

          angular.forEach(cv.data, function (language, key) {
            languages.push({
              url: key,
              pos: language.pos
            });
          });

          cv.languages = $filter('orderBy')(languages, 'pos');
        };

        $scope.setLanguage = function () {
          var
            cv = $scope.cv,
            params = cv.params;

          if (params.language && Object.prototype.hasOwnProperty.call(cv.data, params.language)) {
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
