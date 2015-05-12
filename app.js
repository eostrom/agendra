let express = require('express'),
  markdown = require('markdown').markdown,
  Dropbox = require('dropbox'),
  Journal = require('./journal');

let client = new Dropbox.Client({
  token: process.env.DROPBOX_AUTH_TOKEN
});
client.authDriver(new Dropbox.AuthDriver.NodeServer(8191));

let app = express();
app.set('view engine', 'jade');

app.get('/', (req, res) => {
  client.readdir(process.env.AGENDRA_JOURNAL_PATH, (dirError, entries, dirstat, filestats) => {
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

      let entry = new Journal.Entry(contents);
      let section = entry.section({header: /tomorrow/});

      res.render('show', {
        title: latest.name.replace(/.md$/, ''),
        body: markdown.toHTML(['markdown', ...section])
      });
    });
  });
});

module.exports = app;
