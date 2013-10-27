(function () {
  'use strict';

  describe("Secretary Problem suite", function() {
    var scope, controller;

    beforeEach(module('SecretaryProblem'));

    beforeEach(inject(function($injector) {
      scope = $injector.get('$rootScope');
      controller = $injector.get('$controller');

      // instantiate the controller
      controller('SecretaryProblemCtrl', {$scope: scope});
    }));

    describe('automaticGame', function () {
      it('should achieve a ~1/e success rate with n big', function () {
        var numberOfItems = 256;
        var numberOfGames = 1000; // max: 22500
        var expectedRate = 1 / Math.E;
        var acceptedMargin = 0.075;
        var successRate = scope.automaticGame(numberOfItems, numberOfGames);
        var rateDifference = Math.abs(successRate - expectedRate);

        // console.info('numberOfItems', numberOfItems);
        // console.info('numberOfGames', numberOfGames);
        // console.info('successRate', successRate);

        expect(rateDifference).toBeLessThan(acceptedMargin);
      });

      it('should achieve a ~1/2 success rate with n=3', function () {
        var numberOfItems = 3;
        var numberOfGames = 1000; // max: 500000
        var expectedRate = 0.5;
        var acceptedMargin = 0.05;
        var successRate = scope.automaticGame(numberOfItems, numberOfGames);
        var rateDifference = Math.abs(successRate - expectedRate);

        // console.info('numberOfItems', numberOfItems);
        // console.info('numberOfGames', numberOfGames);
        // console.info('successRate', successRate);

        expect(rateDifference).toBeLessThan(acceptedMargin);
      });
    });
  });
}());
