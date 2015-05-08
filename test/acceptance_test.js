require('dotenv').load('.env');

let browserContext = require('./browserContext');

describe('Temporary home page', () => {
  browserContext();

  beforeEach(function() {
    return this.browser.visit('/');
  });

  it('displays the latest journal entry', function() {
    this.browser.assert.text('body', /Zombie, Casper, and Nightmare/);
    this.browser.assert.text('h1', /What about tomorrow\?/);
    this.browser.assert.text('title', '2012-05-06');
  });
});
