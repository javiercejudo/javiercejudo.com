(function () {
  'use strict';

  describe("CV controller suite", function() {
    var scope, controller;

    beforeEach(module('JcApp'));

    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      controller = $controller;

      // instantiate the controller
      controller('CvCtrl', {
        $scope: scope,
        $routeParams: {}
      });
    }));

    describe('successCallback', function () {
      it('should assign the passed param to the model', function () {
        expect(scope.cv.data).toBe(null);
        scope.successCallback('response');
        expect(scope.cv.data).toBe('response');
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
    });
  });
}());
