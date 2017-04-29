import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('hello, express!');
});

app.listen(8888, () => {
  // meet the convention in tools/startServer.js
  console.log('Server started on http://localhost:8888/');
});
