let express = require('express'),
  Dropbox = require('dropbox');

let client = new Dropbox.Client({
  token: process.env.DROPBOX_AUTH_TOKEN
});
client.authDriver(new Dropbox.AuthDriver.NodeServer(8191));

let app = express();

app.get('/', (req, res) => {
  client.readdir('/', function(error, entries) {
    if (error) {
      console.log(error);
      return res.send(error.response.error);
    }

    return res.send(`Files found: ${entries.length}`);
  });
});

module.exports = app;
