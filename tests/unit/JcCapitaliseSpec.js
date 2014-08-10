(function () {
  'use strict';

  describe("JcCapitalise suite", function() {
    var filter;

    beforeEach(module('JcApp'));

    beforeEach(inject(function($injector) {
      filter = $injector.get('jcCapitaliseFilter');
    }));

    describe('capitalise', function () {
      it('should capitalise the first (and only the first) letter of a string', function () {
        expect(filter('a')).toBe('A');
        expect(filter('A')).toBe('A');
        expect(filter('abc')).toBe('Abc');
        expect(filter('abc, def')).toBe('Abc, def');
      });
    });
  });
}());
