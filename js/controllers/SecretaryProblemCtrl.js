/*global angular:true, browser:true */

(function (angular) {
  'use strict';

  angular.module('SecretaryProblem', ['LocalStorageModule'])

    .controller(
      'SecretaryProblemCtrl',
      ['$scope', '$routeParams', '$location', '$filter', 'localStorageService',
        function ($scope, $routeParams, $location, $filter, localStorageService) {
          $scope.game = {
            info: {
              name: 'Secretary Problem',
              version: '0.0.1',
              author: 'Javier Cejudo'
            },
            numDigits: {
              min: 3,
              max: 9
            },
            numDigitsThis: {
              min: null,
              max: null
            },
            base: {
              min: 6,
              max: 14
            },
            baseThis: null,
            n: 10,
            items: [],
            unknownValue: '?',
            numItemsShown: null,
            lastItemShown: null,
            itemSelected: null,
            won: null,
            record: {}
          };

          $scope.$watch('game.numItemsShown', function (numItemsShown) {
            if (numItemsShown === $scope.game.n) {
              $scope.endGame();
            }
          });

          $scope.initSecretaryProblem = function () {
            var game = $scope.game;
            var items = game.items;
            var numDigits = game.numDigits;
            var numDigitsThis = game.numDigitsThis;
            var randomNumDigitsArray = [];
            var i;

            if (game.lastItemShown === -1) {
              return;
            }

            $scope.processN();

            game.numItemsShown = 0;
            game.lastItemShown = -1;
            game.itemSelected = -1;
            game.won = null;
            $scope.setRecord();

            randomNumDigitsArray = [
              $scope.getRandomInt(numDigits.min, numDigits.max),
              $scope.getRandomInt(numDigits.min, numDigits.max)
            ];

            numDigitsThis.min = Math.min.apply(null, randomNumDigitsArray);
            numDigitsThis.max = Math.max.apply(null, randomNumDigitsArray);

            game.baseThis = $scope.getRandomInt(game.base.min, game.base.max);

            for (i = 0; i < game.n; i++) {
              items[i] = -1;
            }
          };

          $scope.processN = function () {
            var game = $scope.game;
            var candidateN;

            if (!$routeParams.hasOwnProperty('n')) {
              return;
            }

            candidateN = parseInt($routeParams.n, 10);

            if (isNaN(candidateN)) {
              $location.path('/game');
              $location.replace();
              return;
            }

            if (candidateN < 2) {
              candidateN = 2;
            } else if (candidateN > 256) {
              candidateN = 256;
            }

            if (candidateN.toString() === $routeParams.n) {
              game.n = candidateN;
              return;
            }

            $location.path('/game/' + candidateN);
            $location.replace();
          };

          $scope.generateItemValue = function (index) {
            var game = $scope.game;
            var items = game.items;
            var numDigits = game.numDigitsThis;
            var willBeMax;
            var digits;
            var value;
            var gamesPlayed;

            if (items[index] !== -1) {
              if (game.itemSelected !== -1) {
                $scope.initSecretaryProblem();
                $scope.generateItemValue(index);
              } else if (!$scope.isRejected(index)) {
                $scope.selectItem(index);
              }
              return;
            }

            if (game.numItemsShown > 0) {
              willBeMax = (1 === $scope.getRandomInt(1, game.numItemsShown + 1) / (game.numItemsShown + 1));

              if (willBeMax) {
                value = $scope.getRandomInt(
                  $scope.getMax(),
                  Math.pow(game.baseThis, numDigits.max)
                );
              } else {
                value = $scope.getRandomInt(
                  Math.pow(game.baseThis, numDigits.min - 1),
                  $scope.getMax()
                );
              }
            } else {
              value = $scope.getRandomInt(
                Math.pow(game.baseThis, numDigits.min - 1),
                Math.pow(game.baseThis, numDigits.max)
              );
            }

            items[index] = value;

            game.lastItemShown = index;
            game.numItemsShown += 1;

            if (game.numItemsShown > 1) {
              return;
            }

            gamesPlayed = localStorageService.get('sp-games-played-' + game.n) || 0;
            localStorageService.set('sp-games-played-' + game.n, parseInt(gamesPlayed, 10) + 1);
          };

          $scope.generateRestOfItemValues = function () {
            var game = $scope.game;
            var items = game.items;
            var n = game.n;
            var i;

            for (i = 0; i < n; i++) {
              if (items[i] === -1) {
                $scope.generateItemValue(i);
              }
            }
          };

          $scope.selectItem = function (index) {
            if (!$scope.canSelectItem()) {
              return;
            }

            var game = $scope.game;

            game.itemSelected = index;

            if (game.numItemsShown < game.n) {
              $scope.generateRestOfItemValues();
            }
          };

          $scope.canSelectItem = function () {
            var game = $scope.game;

            return (game.itemSelected === -1 && game.numItemsShown !== 0);
          };

          $scope.isCurrent = function (index) {
            var game = $scope.game;

            return (game.lastItemShown === index && game.itemSelected === -1);
          };

          $scope.isRejected = function (index) {
            var game = $scope.game;

            return (game.items[index] !== -1 && !$scope.isCurrent(index) && game.itemSelected == -1);
          };

          $scope.isMax = function (index) {
            var game = $scope.game;

            if (game.itemSelected === -1) {
              return false;
            }

            return (game.items[index] >= $scope.getMax());
          };

          $scope.getMax = function () {
            var game = $scope.game;

            return Math.max.apply(null, game.items);
          };

          $scope.endGame = function () {
            var game = $scope.game;
            var gamesPlayed;
            var gamesWon;

            if (game.itemSelected === -1) {
              $scope.selectItem(game.lastItemShown);
            }

            if (!localStorageService.get('sp-games-played-' + game.n)) {
              localStorageService.set('sp-games-played-' + game.n, 1);
            }

            if ($scope.isMax(game.itemSelected)) {
              game.won = true;

              gamesWon = localStorageService.get('sp-games-won-' + game.n) || 0;
              localStorageService.set('sp-games-won-' + game.n, parseInt(gamesWon, 10) + 1);
            } else {
              game.won = false;
            }

            $scope.setRecord();
          };

          $scope.setRecord = function () {
            var game = $scope.game;
            var gamesPlayed = localStorageService.get('sp-games-played-' + game.n) || 0;
            var gamesWon = localStorageService.get('sp-games-won-' + game.n) || 0;
            var record = $scope.game.record;

            gamesWon = parseInt(gamesWon, 10);
            gamesPlayed = parseInt(gamesPlayed, 10);

            // don't account for the ongoing game
            if (game.numItemsShown > 1 && game.itemSelected === -1) {
              gamesPlayed -= 1;
            }

            if (gamesPlayed > 0) {
              record.gamesWon = gamesWon;
              record.gamesPlayed = gamesPlayed;
            }
          };

          $scope.resetRecord = function () {
            var game = $scope.game;

            localStorageService.remove('sp-games-won-' + game.n);
            localStorageService.remove('sp-games-played-' + game.n);
            $scope.game.record = {};
          };

          $scope.getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          };
        }
      ]
    );
}(angular));
