'use strict';

describe("AppCtrl suite", function() {
  var scope, location, window;

  beforeEach(module('JcApp'));

  beforeEach(inject(function($controller, $injector) {
    scope = $injector.get('$rootScope');
    location = $injector.get('$location');

    // instantiate the controller
    $controller('AppCtrl', {$scope: scope});
    
    jasmine.Clock.useMock();
  }));
  
  describe('test', function () {
    it('should be true', function () {
      expect(true).toBe(true);
    });
  });
});
