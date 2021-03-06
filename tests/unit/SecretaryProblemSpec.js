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
      it('requires numberOfGames to not be a negative integer', function () {
        spyOn(scope, 'findBestStrategy').and.returnValue(0);

        var
          numberOfItems = 2,
          numberOfGames = -1,
          successRate = scope.automaticGame(numberOfItems, numberOfGames);

        expect(successRate).toBe(null);
      });

      // it('should win and lose at least a game with n unrealistically big', function () {
      //   spyOn(scope, 'findBestStrategy').and.returnValue(2759);

      //   var
      //     numberOfItems = 7500,
      //     numberOfGames = 15,
      //     successRate = scope.automaticGame(numberOfItems, numberOfGames);

      //   expect(successRate).toBeGreaterThan(0);
      //   expect(successRate).toBeLessThan(1);
      // });

      it('should achieve a ~1/e success rate with n=30', function () {
        spyOn(scope, 'findBestStrategy').and.returnValue(11);

        var
          numberOfItems = 30,
          numberOfGames = 2000,
          expectedRate = 1 / Math.E,
          acceptedMargin = 0.06,
          successRate = scope.automaticGame(numberOfItems, numberOfGames),
          rateDifference = Math.abs(successRate - expectedRate);

        expect(rateDifference).toBeLessThan(acceptedMargin);
      });

      it('should achieve ~20% success rate with n=5 if selecting the first box', function () {
        spyOn(scope, 'findBestStrategy').and.returnValue(0);

        var
          numberOfItems = 5,
          numberOfGames = 3000,
          expectedRate = 1 / numberOfItems,
          acceptedMargin = 0.05,
          successRate = scope.automaticGame(numberOfItems, numberOfGames),
          rateDifference = Math.abs(successRate - expectedRate);

        expect(rateDifference).toBeLessThan(acceptedMargin);
      });

      it('should achieve a ~1/2 success rate with n=3', function () {
        spyOn(scope, 'findBestStrategy').and.returnValue(1);

        var
          numberOfItems = 3,
          numberOfGames = 5000,
          expectedRate = 0.5,
          acceptedMargin = 0.05,
          successRate = scope.automaticGame(numberOfItems, numberOfGames),
          rateDifference = Math.abs(successRate - expectedRate);

        expect(rateDifference).toBeLessThan(acceptedMargin);
      });
    });

    describe('initialisation', function () {
      beforeEach(function () {
        spyOn(scope, 'processN').and.callThrough();
        scope.initSecretaryProblem();
        scope.initSecretaryProblem();
      });

      it('never initialises if the game just started', function () {
        expect(scope.processN.calls.count()).toEqual(1);
      });
    });

    describe('game logic', function () {
      describe('resetRecord', function () {
        it('resets the record', function () {
          scope.game.record = {a: 'b'};

          scope.resetRecord();

          expect(scope.game.record.hasOwnProperty('a')).toBe(false);
        });
      });

      describe('findBestStrategy', function () {
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
              // 271     : 100,
              // 543     : 200,
              // 815     : 300,
              // 1087    : 400,
              // 1359    : 500,
              // 1631    : 600,
              // 1902    : 700,
              // 2174    : 800,
              // 2446    : 900,
              // 2718    : 1000,
              // 5436    : 2000,
              // 8154    : 3000,
              // 10873   : 4000,
              // 13591   : 5000,
              // 16309   : 6000,
              // 19028   : 7000,
              // 21746   : 8000,
              // 24464   : 9000,
              // 27182   : 10000,
              // 54365   : 20000,
              // 81548   : 30000,
              // 108731  : 40000,
              // 135914  : 50000,
              // 163097  : 60000,
              // 190279  : 70000,
              // 217462  : 80000,
              // 244645  : 90000,
              // 271828  : 100000,
              // 543656  : 200000,
              // 815484  : 300000,
              // 1087312 : 400000,
              // 1359141 : 500000,
              // 1630969 : 600000,
              // 1902797 : 700000,
              // 2174625 : 800000,
              // 2446453 : 900000,
              2718281 : 1000000,
              5436563 : 2000000
            };

          angular.forEach(optimalStrategies, function (r, n) {
            computedR = scope.findBestStrategy(n);

            expect(computedR).toBe(r);
          });
        });
      });

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

        it('converts to 500 any n higher than that', function () {
          routeParamsStub.n = '501';

          var n = scope.processN();

          expect(n).toBe(500);
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

      describe('generateItemValue', function () {
        beforeEach(function () {
          scope.initSecretaryProblem();
        });

        it('generates value for not shown items', function () {
          expect(scope.game.items[0]).toBe(-1);
          scope.generateItemValue(0);
          expect(scope.game.items[0]).not.toBe(-1);
        });

        it('re-initiates game if it was finished', function () {
          spyOn(scope, 'initSecretaryProblem').and.callThrough();
          scope.generateItemValue(0);
          scope.game.itemSelected = 0;
          scope.generateItemValue(0);

          expect(scope.initSecretaryProblem).toHaveBeenCalled();
        });

        it('selects the item if it was the current option', function () {
          spyOn(scope, 'selectItem').and.callThrough();
          scope.generateItemValue(1);
          scope.generateItemValue(1);

          expect(scope.selectItem).toHaveBeenCalledWith(1);
        });
      });
    });
  });
}());
