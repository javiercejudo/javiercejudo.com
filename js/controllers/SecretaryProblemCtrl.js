/*global angular:true, browser:true */

(function (angular) {
  'use strict';

  angular.module('JcApp')

    .controller(
      'SecretaryProblemCtrl',
      ['$scope', '$routeParams', '$location',
        function ($scope, $routeParams, $location) {
          $scope.game = {
            info: {
              name: 'Secretary Problem',
              version: '0.0.1',
              author: 'Javier Cejudo'
            },
            numDigits: {
              min: 1,
              max: 11
            },
            numDigitsThis: {
              min: null,
              max: null
            },
            n: 10,
            items: [],
            unknownValue: '?',
            numItemsShown: null,
            lastItemShown: null,
            itemSelected: null,
            won: null
          };

          $scope.$watch('game.numItemsShown', function (numItemsShown) {
            console.log(numItemsShown);
            console.log($scope.game.n);
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

            randomNumDigitsArray = [
              $scope.getRandomInt(1, numDigits.max),
              $scope.getRandomInt(1, numDigits.max)
            ];

            numDigitsThis.min = Math.min.apply(null, randomNumDigitsArray);
            numDigitsThis.max = Math.max.apply(null, randomNumDigitsArray);

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

            if (!isNaN(candidateN)) {
              if (candidateN > 256) {
                candidateN = 256;
              }
              if (candidateN < 2) {
                candidateN = 2;
              }
              if (candidateN.toString() === $routeParams.n) {
                game.n = candidateN;
              } else {
                $location.path('/game/' + candidateN);
                $location.replace();
              }
            } else {
              $location.path('/game/10');
              $location.replace();
            }
          };

          $scope.generateItemValue = function (index) {
            var game = $scope.game;
            var items = game.items;
            var numDigits = game.numDigitsThis;
            var n = game.n;
            var digits;
            var base;
            var min;
            var max;

            if (items[index] !== -1) {
              if (!$scope.isRejected(index)) {
                $scope.selectItem(index, true);
              }
              return;
            }

            digits = $scope.getRandomInt(numDigits.min, numDigits.max);

            // numDigits does not mean actual num digits as we are playing
            // with the base of the power :)
            base = $scope.getRandomInt(2, 9);
            min = Math.pow(base, digits - 1);
            max = Math.pow(base, digits);
            items[index] = $scope.getRandomInt(min, max);

            game.lastItemShown = index;
            game.numItemsShown += 1;
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

          $scope.selectItem = function (index, generateRest) {
            if (!$scope.canSelectItem()) {
              return;
            }

            $scope.game.itemSelected = index;

            if (generateRest) {
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

            return (game.items[index] >= Math.max.apply(null, game.items));
          };

          $scope.endGame = function () {
            var game = $scope.game;

            console.log(game.itemSelected);

            if (game.itemSelected === -1) {
              $scope.selectItem(game.lastItemShown, false);
            }

            if ($scope.isMax(game.itemSelected)) {
              game.won = true;
              return;
            }

            game.won = false;
          };

          $scope.getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          };
        }
      ]
    );
}(angular));
