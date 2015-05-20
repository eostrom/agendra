let express = require('express'),
  Dropbox = require('dropbox'),
  Promisebox = require('./promisebox'),
  Journal = require('./journal');

let client = new Dropbox.Client({
  token: process.env.DROPBOX_AUTH_TOKEN
});
client.authDriver(new Dropbox.AuthDriver.NodeServer(8191));
client = new Promisebox(client);

let app = express();
app.set('view engine', 'jade');

app.get('/', async (req, res) => {
  let entry;

  try {
    const journal = new Journal(client, process.env.AGENDRA_JOURNAL_PATH);
    entry = await journal.latest();
  } catch (error) {
     console.log(error);
     return res.send(error.response ? error.response.error : error);
  }

  const section = entry.section(/tomorrow/);

  res.render('show', {
    title: entry.date.clone().add(1, 'day').format('LL'),
    body: section.simplify().toHTML()
  });
});

module.exports = app;
