/*global angular:true, browser:true */

(function (angular) {
  'use strict';

  angular.module('JcApp').controller(
    'SecretaryProblemCtrl',
    ['$scope',
      function ($scope) {
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
          var n = game.n;
          var i;

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

          for (i = 0; i < n; i++) {
            items[i] = -1;
          }
        };

        $scope.generateItemValue = function (index) {
          var game = $scope.game;
          var items = game.items;
          var numDigits = game.numDigitsThis;
          var n = game.n;
          var digits;
          var min;
          var max;

          if (items[index] !== -1) {
            return;
          }

          digits = $scope.getRandomInt(numDigits.min, numDigits.max);
          min = Math.pow(10, digits - 1);
          max = Math.pow(10, digits);
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

          return (game.lastItemShown == index && game.itemSelected == -1);
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
