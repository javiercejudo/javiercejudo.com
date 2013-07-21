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
  
  describe('navigateWithFullReload', function () {
    it('should change the URL according to the path provided', function () {
      expect(location.path()).toBe('/');
      expect(scope.navigateWithFullReload('/example')).toBe('/example');
    });
  });
});
