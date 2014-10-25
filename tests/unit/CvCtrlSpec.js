(function () {
  'use strict';

  describe("CV controller suite", function() {
    var scope, rootScope, controller, location, sLocalStorage;

    beforeEach(module('JcApp'));

    beforeEach(inject(function($rootScope, $controller, $location, $localStorage) {
      scope = $rootScope.$new();
      rootScope = $rootScope;
      controller = $controller;
      location = $location;
      sLocalStorage = $localStorage;

      // instantiate the controller
      controller('CvCtrl', {
        $rootScope: rootScope,
        $scope: scope,
        $location: location,
        $routeParams: {},
        $localStorage: sLocalStorage
      });
    }));

    describe('successCallback', function () {
      it('should assign the passed param to the model', function () {
        expect(scope.cv.data).toBe(null);
        scope.successCallback('response');
        expect(scope.cv.data).toBe('response');
      });
    });

    describe('retrieveFromLocalStorage', function () {
      it('should retrieve data from localStorage', function () {
        sLocalStorage['cv-data'] = 'abc';
        var infoRetrieved = scope.retrieveFromLocalStorage();
        expect(infoRetrieved).toBe('abc');
      });
    });

    describe('saveToLocalStorage', function () {
      it('should save data to localStorage', function () {
        scope.cv.data = 'abc';
        scope.saveToLocalStorage();
        expect(sLocalStorage['cv-data']).toBe('abc');
      });
    });

    describe('initCv', function () {
      it('should initialise CV data', function () {
        spyOn(scope, 'retrieveFromLocalStorage');
        scope.initCv();
        expect(scope.retrieveFromLocalStorage).toHaveBeenCalled();
      });

      it('should use firebase if online', function () {
        scope.firebaseUrl = 'https://c3jud0.firebaseio.com';
        rootScope.online = true;
        scope.firebase.ref = null;
        scope.$apply();

        scope.initCv();
        expect(scope.firebase.ref).not.toBe(null);
      });
    });

    describe('watchCvData', function () {
      beforeEach(function () {
        spyOn(scope, 'setAvailableLanguages');
        spyOn(scope, 'setLanguage');
        spyOn(scope, 'saveToLocalStorage');

        scope.cv.loading = true;
      });

      it('should watch the CV data and act on it', function () {
        scope.cv.data = 'abc';
        scope.$apply();

        expect(scope.cv.loading).toBe(false);
        expect(scope.setAvailableLanguages).toHaveBeenCalled();
        expect(scope.setLanguage).toHaveBeenCalled();
        expect(scope.saveToLocalStorage).toHaveBeenCalled();
      });

      it('should watch the CV data and act on it', function () {
        scope.cv.data = null;
        scope.$apply();

        expect(scope.cv.loading).toBe(true);
        expect(scope.setAvailableLanguages).not.toHaveBeenCalled();
        expect(scope.setLanguage).not.toHaveBeenCalled();
        expect(scope.saveToLocalStorage).not.toHaveBeenCalled();
      });
    });

    describe('setCvDataFromBackup', function () {
      it('should start loading CV data from backup', function () {
        scope.setCvDataFromBackup(0);
        expect(scope.cv.loading).toBe(true);
      });
    });

    describe('setAvailableLanguages', function () {
      it('should detect relevant keys from cv.data', function () {
        scope.cv.data = {
          language1: {pos: 1},
          $irrelevantKey: 'xyz',
          language2: {pos: 3}
        };

        scope.setAvailableLanguages();

        expect(scope.cv.languages).toEqual([
          { url: 'language1', pos: 1 },
          { url: 'language2', pos: 3 }
        ]);
      });
    });

    describe('setLanguage', function () {
      it('should assign the selected language to cvLocal', function () {
        var cv = scope.cv;

        cv.data = {'language1': 1};
        cv.params = {language: 'language1'};

        scope.setLanguage();

        expect(scope.pageTitle).toBe('CV: Language1');
        expect(scope.cvLocal).toBe(1);
      });

      it('should redirect to english when there is no data', function () {
        var cv = scope.cv;

        cv.data = {'language1': 1};
        cv.params = {language: 'language2'};

        scope.setLanguage();

        expect(location.path()).toBe('/cv/english');
      });
    });
  });
}());
