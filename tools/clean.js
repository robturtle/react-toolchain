import path from 'path';
import { cleandir } from './lib/fs';

async function clean() {
  return Promise.all([
    cleandir(path.resolve(__dirname, '../dist/*')) 
  ]);
}

export default clean;