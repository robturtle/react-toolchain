/* eslint-disable no-console */
import path from 'path';
import express from 'express';
import PrettyError from 'pretty-error';
import models from '../data/models';
import graphqlHTTP from 'express-graphql';
import schema from '../data/graphql';
import restful from '../data/restful';
import bodyParser from 'body-parser';
import session, { MemoryStore } from 'express-session';
import { auth } from '../../config/config';

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: isProduction ? auth.sessionSecret : 'snippetaas',
  // TODO: isProduction ? Session model
  store: new MemoryStore(),
  cookie: {
    maxAge: isProduction ? 1000 * 60 * 60 * 24 * 180 : 1000 * 15,
    httpOnly: true,
    secure: isProduction,
  },
  // TODO: Sequelize only have update() but not touch(), research needed
  // to use "resave: false".
  resave: false,
  saveUninitialized: false,
}));

app.get('/session', (req, res) => {
  const sess = req.session;
  if (sess.views) {
    sess.views++;
    res.setHeader('Content-Type', 'text/html');
    res.write(`<p>views: ${sess.views}</p>`);
    res.write(`<p>expires in ${sess.cookie.maxAge / 1000}s</p>`);
    res.end();
  } else {
    sess.views = 1;
    res.send('new session, try refresh it.');
  }
});

if (!isProduction) {
  app.enable('trust proxy');
}

// Error handling
// ----------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

const modelSynced = models.sync()
  .then(() => console.log('models sync success.'))
  .catch(err => console.error(err.stack));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.use('/restful', restful);

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(pe.render(err));
  res.status(err.status || 500);
  res.send(err);
});

const port = process.env.PORT || 8888;

if (module.hot) {
  app.hot = module.hot;
  module.hot.accept();
} else {
  modelSynced.then(() => app.listen(port, () => {
    // meet the convention in tools/startServer.js
    console.log(`Server started on http://localhost:${port}/`);
  }));
}
