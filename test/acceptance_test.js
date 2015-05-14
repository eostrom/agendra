let dotenv = require('dotenv');
dotenv.load({path: '.env.test'});

let browserContext = require('./browserContext');

describe('Home page', () => {
  browserContext();

  beforeEach(function() {
    return this.browser.visit('/');
  });

  it('uses the date as a page title', function() {
    this.browser.assert.text('title', '2012-05-06');
  });

  it('displays only the agenda', function() {
    this.browser.assert.element('body > ul');
    this.browser.assert.elements('h1', 0);
    this.browser.assert.text('li', /agenda app refactoring/);
  });
});
