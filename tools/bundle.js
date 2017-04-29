import { run } from 'parallel-webpack';
import path from 'path';

async function bundle() {
  await run(path.resolve(__dirname, 'webpack.config.js'));
}

bundle();
