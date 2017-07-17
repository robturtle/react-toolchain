/* eslint-disable no-console */
import path from 'path';
import express from 'express';
import PrettyError from 'pretty-error';
import models from '../data/models';
import graphqlHTTP from 'express-graphql';
import { schema, rootValue } from '../data/graphql';

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

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(pe.render(err));
  res.status(err.status || 500);
  res.send(err);
});

models.sync()
  .then(() => console.log('models sync success.'))
  .catch(err => console.error(err.stack));

console.log(rootValue);

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}))

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
