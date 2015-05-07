require('dotenv').load('.env');

let browserContext = require('./browserContext');

describe('Temporary home page', () => {
  browserContext();

  beforeEach(function() {
    return this.browser.visit('/');
  });

  it('finds the latest journal entry', function() {
    this.browser.assert.text('body', '2012-05-06.md');
  });
});
