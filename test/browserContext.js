var app = require('../app');
var Browser = require('zombie');

module.exports = function() {
  before(function() {
    this.server = app.listen(3030);
  });

  beforeEach(function() {
    this.browser = new Browser({site: 'http://localhost:3030/'});
  });

  after(function(done) {
    this.server.close(done);
  });
};
