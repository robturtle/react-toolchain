import path from 'path';
import express from 'express';
import PrettyError from 'pretty-error';
import api from './api';
import bodyParser from 'body-parser';

const isProduction = process.env.NODE_ENV === 'production';
const app = express();

// Tell any CSS tooling (such as Material UI) to use all vendor prefixes
// if the user agent is not known.
// ----------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

// Middlewares
// ----------------------------------------------------------------------
if (!isProduction) {
  app.enable('trust proxy');
}

// Routings
// ----------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
// TODO cookie parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', api);

// Let React Router do the rest
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Error handling
// ----------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => {
  console.error(pe.render(err));
  res.status(err.status || 500);
  res.send(err);
});

app.listen(8888, () => {
  // meet the convention in tools/startServer.js
  console.log('Server started on http://localhost:8888/');
});
