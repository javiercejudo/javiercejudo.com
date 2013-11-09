(function () {
  'use strict';

  describe("Secretary Problem suite", function() {
    var scope, controller;

    beforeEach(module('SecretaryProblem'));

    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      controller = $controller;

      // instantiate the controller
      controller('SecretaryProblemCtrl', {
        $scope: scope,
        $routeParams: {}
      });
    }));

    describe('automaticGame', function () {
      it('should win and lose at least a game with n unrealistically big', function () {
        var
          numberOfItems = 7500,
          numberOfGames = 12,
          successRate = scope.automaticGame(numberOfItems, numberOfGames);

        expect(successRate).toBeGreaterThan(0);
        expect(successRate).toBeLessThan(1);
      });

      it('should achieve a ~1/e success rate with n big', function () {
        var
          numberOfItems = 256,
          numberOfGames = 1000, // max: 22500
          expectedRate = 1 / Math.E,
          acceptedMargin = 0.075,
          successRate = scope.automaticGame(numberOfItems, numberOfGames),
          rateDifference = Math.abs(successRate - expectedRate);

        expect(rateDifference).toBeLessThan(acceptedMargin);
      });

      it('should achieve a ~1/2 success rate with n=3', function () {
        var
          numberOfItems = 3,
          numberOfGames = 1000, // max: 500000
          expectedRate = 0.5,
          acceptedMargin = 0.05,
          successRate = scope.automaticGame(numberOfItems, numberOfGames),
          rateDifference = Math.abs(successRate - expectedRate);

        expect(rateDifference).toBeLessThan(acceptedMargin);
      });
    });
  });
}());
