require('dotenv').load('.env');

let browserContext = require('./browserContext');

describe('Temporary home page', () => {
  browserContext();

  beforeEach(function() {
    return this.browser.visit('/');
  });

  it('displays information about the Dropbox folder', function() {
    this.browser.assert.text('body', /Files found: 1/i);
  });
});
