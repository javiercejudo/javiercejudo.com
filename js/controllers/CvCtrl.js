/*global angular:true, Firebase:true, browser:true */

(function (angular) {
  'use strict';

  angular.module('JcApp').controller(
    'CvCtrl',
    ['$rootScope', '$scope', '$routeParams', '$location', '$http', '$filter', '$timeout', '$firebase', '$localStorage',
      function ($rootScope, $scope, $routeParams, $location, $http, $filter, $timeout, $firebase, $localStorage) {
        $scope.cv = {
          loading: null,
          error: null,
          params: $routeParams,
          languages: [],
          data: null,
          dataRemote: null
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
        }, true);

        $scope.initCv = function () {
          var
            cv = $scope.cv,
            firebase = $scope.firebase,
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
          cv.dataRemote = $firebase(firebase.ref);

          cv.dataRemote.$on("loaded", function() {
            $timeout(function () {
              cv.loading = false;
              cv.data = cv.dataRemote;
            });
          });

          cv.dataRemote.$on("change", function() {
            $timeout(function () {
              cv.data = cv.dataRemote;
            });
          });
        };

        $scope.setCvData = function () {
          var cv = $scope.cv;

          cv.loading = true;

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
            if (key.substr(0, 1) !== '$') {
              languages.push({
                url: key,
                pos: language.pos
              });
            }
          });

          cv.languages = $filter('orderBy')(languages, 'pos');
        };

        $scope.setLanguage = function () {
          var
            cv = $scope.cv,
            params = cv.params;

          $rootScope.pageTitle = 'CV: ' + $filter('jcCapitalise')(params.language);
          $scope.cvLocal = cv.data[params.language];

          if (!$scope.cvLocal) {
            $location.path('/cv/english');
            $location.replace();
          }
        };
      }]
  );

}(angular));
