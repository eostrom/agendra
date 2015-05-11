let app = require('./app');

let server = app.listen(process.env.PORT || 3000, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});
