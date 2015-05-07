let express = require('express'),
  Dropbox = require('dropbox');

let client = new Dropbox.Client({
  token: process.env.DROPBOX_AUTH_TOKEN
});
client.authDriver(new Dropbox.AuthDriver.NodeServer(8191));

let app = express();

app.get('/', (req, res) => {
  client.readdir('/', (dirError, entries, dirstat, filestats) => {
    if (dirError) {
      console.log(dirError);
      return res.send(dirError.response.error);
    }

    const journals = filestats.filter(e => /^[0-9-]*\.md$/.test(e.name));
    const latest = journals.pop();

    client.readFile(latest.path, (fileError, contents) => {
      if (fileError) {
        console.log(fileError);
        return res.send(fileError.response.error);
      }

      return res.send(contents);
    });
  });
});

module.exports = app;
