let browserContext = require('./browserContext');

describe('Temporary home page', () => {
  browserContext();

  beforeEach(function() {
    return this.browser.visit('/');
  });

  it('renders a Hello World page', function() {
    this.browser.assert.text('body', /Hello,? world!/i);
  });
});
