(function () {
  'use strict';

  describe("CV controller suite", function() {
    var scope, controller, location;

    beforeEach(module('JcApp'));

    beforeEach(inject(function($controller, $rootScope, $location) {
      scope = $rootScope.$new();
      location = $location;
      controller = $controller;

      // instantiate the controller
      controller('AppCtrl', {
        $scope: scope,
        $location: location
      });
    }));

    describe('instantiation', function () {
      it('should assign some properties to the scope', function () {
        expect(scope.prefixLink).toBe('#!');
      });
    });

    describe('instantiation', function () {
      beforeEach(function () {
        scope.$emit('$routeChangeSuccess');
      });

      it('should change the path', function () {
        expect(scope.path).toBe(location.path());
      });
    });
  });
}());
