import pg, { Pool } from 'pg';
import config from './db.config';

const pool = new Pool(config);

pool.on('error', (err, client) => {
  console.error('idle client error', err.message, err.stack);
});

export const query = (text, values) => {
  console.log(`query: ${text}, values: ${values}`);
  return pool.query(text, values/*, (err, result) => {
    if (err) {
      console.log('ERROR: ' + err);
    }
    console.log(`result: ${result}`);
  }*/);
};

export const connect = () => pool.connect();

export default query;