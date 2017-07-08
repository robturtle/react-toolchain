import path from 'path';
import express from 'express';
import PrettyError from 'pretty-error';

const isProduction = process.env.NODE_ENV === 'production';
const app = express();

// Tell any CSS tooling (such as Material UI) to use all vendor prefixes
// if the user agent is not known.
// ----------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

// Middlewares
// ----------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
// TODO cookie parser
// TODO body parser

if (!isProduction) {
  app.enable('trust proxy');
}

// Error handling
// ----------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((error, req, res, next) => {
  console.error(pe.render(err));
  res.status(err.status || 500);
  res.send(err);
});

var pg = require('pg');

//pg.defaults.ssl = true;
app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('select * from test_table', function(err, result) {
      done();
      if (err) { console.error(err); response.send("[ERROR] " + err); }
      else { response.send(JSON.stringify(result.rows)); }
    });
  });
});

let port = process.env.PORT || 8888;
app.listen(port, () => {
  // meet the convention in tools/startServer.js
  console.log(`Server started on http://localhost:${port}/`);
});

app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    console.log(r.route.path)
  }
});
