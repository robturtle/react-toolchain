const DATABASE_URL = require('../config/config').DATABASE_URL;
const Client = require('pg').Client;

const client = new Client(DATABASE_URL);
client.connect();
client.query('select * from test_table', (err, result) => {
  console.log(JSON.stringify(result.rows));
  client.end();
});
