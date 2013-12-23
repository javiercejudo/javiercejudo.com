(function () {
  'use strict';

  describe("Secretary Problem suite", function() {
    var scope, controller, routeParamsStub;

    beforeEach(module('SecretaryProblem'));

    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      controller = $controller;
      routeParamsStub = {};

      // instantiate the controller
      controller('SecretaryProblemCtrl', {
        $scope: scope,
        $routeParams: routeParamsStub
      });
    }));

    describe('automaticGame', function () {
      it('should choose the optimal strategy', function () {
        var
          computedR,
          optimalStrategies = {
            1       : 0,
            2       : 0,
            3       : 1,
            4       : 1,
            5       : 2,
            6       : 2,
            7       : 2,
            8       : 3,
            9       : 3,
            10      : 3,
            11      : 4,
            12      : 4,
            13      : 5,
            14      : 5,
            15      : 5,
            16      : 6,
            17      : 6,
            18      : 6,
            19      : 7,
            20      : 7,
            271     : 100,
            543     : 200,
            815     : 300,
            1087    : 400,
            1359    : 500,
            1631    : 600,
            1902    : 700,
            2174    : 800,
            2446    : 900,
            2718    : 1000,
            5436    : 2000,
            8154    : 3000,
            10873   : 4000,
            13591   : 5000,
            16309   : 6000,
            19028   : 7000,
            21746   : 8000,
            24464   : 9000,
            27182   : 10000,
            54365   : 20000,
            81548   : 30000,
            108731  : 40000,
            135914  : 50000,
            163097  : 60000,
            190279  : 70000,
            217462  : 80000,
            244645  : 90000,
            271828  : 100000,
            543656  : 200000,
            815484  : 300000,
            1087312 : 400000,
            1359141 : 500000,
            1630969 : 600000,
            1902797 : 700000,
            2174625 : 800000,
            2446453 : 900000,
            2718281 : 1000000,
            5436563 : 2000000
          };

        angular.forEach(optimalStrategies, function (r, n) {
          computedR = scope.findBestStrategy(n);

          expect(computedR).toBe(r);
        });
      });

      it('should win and lose at least a game with n unrealistically big', function () {
        spyOn(scope, 'findBestStrategy').andReturn(2759);

        var
          numberOfItems = 7500,
          numberOfGames = 15,
          successRate = scope.automaticGame(numberOfItems, numberOfGames);

        expect(successRate).toBeGreaterThan(0);
        expect(successRate).toBeLessThan(1);
      });

      it('should achieve a ~1/e success rate with n big', function () {
        spyOn(scope, 'findBestStrategy').andReturn(94);

        var
          numberOfItems = 256,
          numberOfGames = 1000, // max: 22500
          expectedRate = 1 / Math.E,
          acceptedMargin = 0.075,
          successRate = scope.automaticGame(numberOfItems, numberOfGames),
          rateDifference = Math.abs(successRate - expectedRate);

        expect(rateDifference).toBeLessThan(acceptedMargin);
      });

      it('should achieve ~20% success rate with n=5 if selecting the first box', function () {
        spyOn(scope, 'findBestStrategy').andReturn(0);

        var
          numberOfItems = 5,
          numberOfGames = 1000,
          expectedRate = 1 / numberOfItems,
          acceptedMargin = 0.05,
          successRate = scope.automaticGame(numberOfItems, numberOfGames),
          rateDifference = Math.abs(successRate - expectedRate);

        expect(rateDifference).toBeLessThan(acceptedMargin);
      });

      it('should achieve a ~1/2 success rate with n=3', function () {
        spyOn(scope, 'findBestStrategy').andReturn(1);

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

    describe('initialisation', function () {
      beforeEach(function () {
        spyOn(scope, 'processN').andCallThrough();
        scope.initSecretaryProblem();
        scope.initSecretaryProblem();
      });

      it('never initialises if the game just started', function () {
        expect(scope.processN.callCount).toBe(1);
      });
    });

    describe('game logic', function () {
      describe('processN', function () {
        it('requires routeParams to have an n param', function () {
          delete routeParamsStub.n;

          var n = scope.processN();

          expect(n).toBe(false);
        });

        it('requires n to be a number', function () {
          routeParamsStub.n = 'string';

          var n = scope.processN();

          expect(n).toBe(false);
        });

        it('converts to 2 any n lower than that', function () {
          routeParamsStub.n = '1';

          var n = scope.processN();

          expect(n).toBe(2);
        });

        it('converts to 256 any n higher than that', function () {
          routeParamsStub.n = '257';

          var n = scope.processN();

          expect(n).toBe(256);
        });

        it('coverts n to int', function () {
          routeParamsStub.n = '5string';

          var n = scope.processN();

          expect(n).toBe(5);
        });

        it('even processes normal values correctly!', function () {
          routeParamsStub.n = '15';

          var n = scope.processN();

          expect(n).toBe(15);
        });
      });
    });
  });
}());
