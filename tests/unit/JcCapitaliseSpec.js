'use strict';

describe("JcCapitalise suite", function() {
  var filter;

  beforeEach(module('JcApp'));

  beforeEach(inject(function($injector) {
    filter = $injector.get('jcCapitaliseFilter');
  }));
  
  describe('capitalise', function () {
    it('should capitalise the first letter of a string', function () {
      expect(filter('a')).toBe('A');
      expect(filter('abc')).toBe('Abc');
      expect(filter('abc def')).toBe('Abc def');
      expect(filter('abc, def')).toBe('Abc, def');
      
      expect(filter('ábc')).toBe('Ábc');
      expect(filter('άbc')).toBe('Άbc');
      
      expect(filter('1')).toBe('1');
      expect(filter('!')).toBe('!');
    });
  });
});
