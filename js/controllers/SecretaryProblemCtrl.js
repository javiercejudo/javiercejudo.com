/*global angular:true, browser:true */

(function (angular) {
  'use strict';

  angular.module('SecretaryProblem', ['LocalStorageModule'])

    .controller(
      'SecretaryProblemCtrl', [
        '$scope', '$routeParams', '$location', '$filter', '$log', '$timeout', 'localStorageService',
        function ($scope, $routeParams, $location, $filter, $log, $timeout, localStorageService) {
          $scope.game = {
            info: {
              name: 'Secretary Problem',
              version: '1.0.5',
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
            record: {},
            automaticGame: false
          };

          $scope.$watch('game.numItemsShown', function (numItemsShown) {
            if (numItemsShown === $scope.game.n) {
              $scope.endGame();
            }
          });

          $scope.initSecretaryProblem = function () {
            var game = $scope.game;

            if (game.lastItemShown === -1) {
              return;
            }

            $scope.processN();
            $scope.initContext();
          };

          $scope.initContext = function () {
            var game = $scope.game;
            var items = game.items;
            var numDigits = game.numDigits;
            var numDigitsThis = game.numDigitsThis;
            var randomNumDigitsArray;
            var i;

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

          $scope.showNext = function () {
            if (!$scope.canShowNext()) {
              return;
            }

            var game = $scope.game;

            $scope.generateItemValue(game.items.indexOf(-1));
          };

          $scope.canShowNext = function () {
            var game = $scope.game;

            return (game.itemSelected === -1);
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

            return (game.items[index] !== -1 && !$scope.isCurrent(index) && game.itemSelected === -1);
          };

          $scope.isMax = function (index) {
            var game = $scope.game;

            if (game.itemSelected === -1) {
              return false;
            }

            return (game.items[index] >= $scope.getMax());
          };

          $scope.getCurrentValue = function () {
            var game = $scope.game;

            if (game.itemSelected !== -1) {
              return game.items[game.itemSelected];
            }

            if (game.lastItemShown !== -1) {
              return game.items[game.lastItemShown];
            }

            return -1;
          };

          $scope.getMax = function () {
            var game = $scope.game;

            return Math.max.apply(null, game.items);
          };

          $scope.endGame = function () {
            var game = $scope.game;
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

          $scope.automaticGame = function (n, numberOfGames) {
            var game = $scope.game;
            var strategyCandidate;
            var strategy;
            var sum = 0;
            var sumIndex;
            var itemIndex;
            var gameIndex;
            var currentValue;
            var maxValue;
            var wonGamesCount = 0;

            numberOfGames = numberOfGames || 1;
            game.n = n || game.n;

            if (isNaN(parseInt(game.n, 10))) {
              $log.warn('The parameter "n" must be an integer number');
              return null;
            }

            if (isNaN(parseInt(numberOfGames, 10))) {
              $log.warn('The parameter "numberOfGames" must be an integer number');
              return null;
            }

            $routeParams.n = game.n;

            strategyCandidate = Math.floor(game.n / Math.E);

            $scope.$digest();

            for(sumIndex = strategyCandidate + 2; sumIndex <= game.n; sumIndex += 1) {
              sum += 1 / (sumIndex - 1);
            }

            strategy = sum > 1 ? strategyCandidate + 1 : strategyCandidate;

            for(gameIndex = 0; gameIndex < numberOfGames; gameIndex += 1) {
              if ((gameIndex + 1) % 10 === 0) {
                $log.log('Game ' + (gameIndex + 1) + ' completed.');
              }

              $scope.initSecretaryProblem();

              $scope.$digest();

              for(itemIndex = 0; itemIndex < strategy; itemIndex += 1) {
                $scope.showNext();
              }

              for(itemIndex = strategy; itemIndex < game.n; itemIndex += 1) {
                $scope.showNext();

                currentValue = $scope.getCurrentValue();
                maxValue = $scope.getMax();

                if (currentValue === maxValue && itemIndex + 1 !== game.n) {
                  $scope.selectItem(itemIndex);
                }
              }

              $scope.$digest();

              if (game.won) {
                wonGamesCount += 1;
              }
            }

            $log.log('Success rate:', wonGamesCount / numberOfGames);

            return wonGamesCount / numberOfGames;
          };
        }
      ]
    );
}(angular));
