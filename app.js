let express = require('express'),
  moment = require('moment'),
  markdown = require('markdown').markdown,
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
  let contents, date;

  try {
    const [entries, dirstat, filestats] =
      await client.readdir(process.env.AGENDRA_JOURNAL_PATH);
    const journals = filestats.filter(e => /^[0-9-]*\.md$/.test(e.name)),
      latest = journals.pop();

    date = moment.utc(latest.name.replace(/.md$/, ''));
    contents =
      await client.readFile(latest.path);
  } catch (error) {
     console.log(error);
     return res.send(error.response ? error.response.error : error);
  }

  let entry = new Journal.Entry({contents, date});
  let section = entry.section(/tomorrow/);

  res.render('show', {
    title: entry.date.format('LL'),
    body: section.simplify().toHTML()
  });
});

module.exports = app;
