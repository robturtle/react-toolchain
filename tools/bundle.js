import webpack from 'webpack';
import config from '../webpack.config';

const debug = require('debug')('tools:bundle');

const bundler = webpack(config);

async function bundle() {
  return new Promise((resolve, reject) => {
    bundler.run((err, stats) => {
      if (err) {
        return reject(err);
      } if (stats.hasErrors()) {
        return reject(stats.err);
      }
      debug(stats.toString({colors: true}))
      return resolve();
    })
  });
}

export default bundle;
