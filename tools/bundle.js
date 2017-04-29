import webpack from 'webpack';
import config from '../webpack.config';

const bundler = webpack(config);

async function bundle() {
  return new Promise((resolve, reject) => {
    bundler.run((err, stats) => {
      if (err) {
        return reject(err);
      } if (stats.hasErrors()) {
        return reject(stats.err);
      }
      console.log(stats.toString({
        colors: true
      }))
      return resolve();
    })
  });
}

bundle();
