let express = require('express'),
  Dropbox = require('dropbox');

let client = new Dropbox.Client({
  token: process.env.DROPBOX_AUTH_TOKEN
});
client.authDriver(new Dropbox.AuthDriver.NodeServer(8191));

let app = express();

app.get('/', (req, res) => {
  client.readdir('/', (error, entries) => {
    if (error) {
      console.log(error);
      return res.send(error.response.error);
    }

    const journals = entries.filter(e => /^[0-9-]*\.md$/.test(e));
    return res.send(journals.pop());
  });
});

module.exports = app;
