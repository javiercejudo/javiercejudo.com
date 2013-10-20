'use strict';

var linkPrefix = '/#!';

describe("E2E: Testing Routes", function() {

  beforeEach(function() {
    browser().navigateTo(linkPrefix + '/');
  });

  it('should jump to the / path when /en is accessed', function() {
    browser().navigateTo(linkPrefix + '/en');
    expect(browser().location().path()).toBe("/");
  });

  it('should jump to the /cv/english path when /cv is accessed', function() {
    browser().navigateTo(linkPrefix + '/cv');
    expect(browser().location().path()).toBe("/cv/english");
  });

  it('should jump to the /cv/spanish path when /es is accessed', function() {
    browser().navigateTo(linkPrefix + '/es');
    expect(browser().location().path()).toBe("/cv/spanish");
  });

  it('should show the 404 page when an invalid URL is requested, but keep the path', function() {
    browser().navigateTo(linkPrefix + '/invalidURL');
    expect(element('.error-page').count()).toEqual(1);
  });

  it('should jump to the /game/10 path when /game is accessed', function() {
    browser().navigateTo(linkPrefix + '/game');
    expect(browser().location().path()).toBe("/game/10");
  });

  it('should jump to the /game/10 path when /game/[invalid] is accessed', function() {
    browser().navigateTo(linkPrefix + '/game/xyz');
    expect(browser().location().path()).toBe("/game/10");
  });

  it('should jump to the /game/2 path when /game/X is accessed, with X < 2', function() {
    browser().navigateTo(linkPrefix + '/game/1');
    expect(browser().location().path()).toBe("/game/2");

    browser().navigateTo(linkPrefix + '/game/-42');
    expect(browser().location().path()).toBe("/game/2");
  });

  it('should jump to the /game/256 path when /game/X is accessed, with X > 256', function() {
    browser().navigateTo(linkPrefix + '/game/257');
    expect(browser().location().path()).toBe("/game/256");

    browser().navigateTo(linkPrefix + '/game/4242');
    expect(browser().location().path()).toBe("/game/256");
  });

  it('should jump to the /game/[int] path when /game/[int][string] is accessed, with X an integer', function() {
    browser().navigateTo(linkPrefix + '/game/5xyz');
    expect(browser().location().path()).toBe("/game/5");
  });

});
