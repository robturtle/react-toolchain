import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('hello, express!');
});

app.listen(8888, () => {
  console.log('listening on 8888');
});
