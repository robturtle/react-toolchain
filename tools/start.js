import BrowserSync from 'browser-sync';
import webpack from 'webpack';
import WriteFilePlugin from 'write-file-webpack-plugin';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import 'react-hot-loader';
import webpackConfig from '../webpack.config';
import run from './runner';
import clean from './clean';
import copy from './copy';
import startServer from './startServer';

const [clientConfig, serverConfig] = webpackConfig;

const debug = require('debug')('tools:start');

async function start() {
  await run(clean);
  await run(copy.bind(undefined, {watch: true}))

  await new Promise(resolve => {
    debug('patching webpack HMR');
    // Save the server-side bundle files to the file system after compilation
    // https://github.com/webpack/webpack-dev-server/issues/62
    serverConfig.plugins = serverConfig.plugins || [];
    serverConfig.plugins.push(new WriteFilePlugin({ log: false }));

    // Hot Module Replacement + React Hot Reload
    clientConfig.entry.client = [...new Set([
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client'
    ].concat(clientConfig.entry.client))];
    const rule = clientConfig
      .module.rules.find(r => r.loader === 'babel-loader');
    rule.query = rule.query || {};
    rule.query.plugins = ['react-hot-loader/babel']
      .concat(rule.query.plugins || []);
    clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    // provide readable module names on HMR
    clientConfig.plugins.push(new webpack.NamedModulesPlugin());
    clientConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());

    const bundler = webpack(webpackConfig);
    const devMiddleware = webpackDevMiddleware(bundler, {
      publicPath: clientConfig.output.publicPath,
      stats: clientConfig.stats
    });
    const hotMiddleware = webpackHotMiddleware(bundler.compilers[0]);

    let onBundleComplete = async () => {
      debug('Initial patching done.');
      onBundleComplete = stats => {
        const hasErros = !stats.stats[1].compilation.errors.length;
        if (hasErros) {
          debug('Server compiled success. Restarting the server...');
          startServer();
        }
      };
      const server = await startServer();
      BrowserSync.create().init({
        proxy: {
          target: server.host,
          middleware: [devMiddleware, hotMiddleware],
          proxyOptions: {
            xfwd: true
          }
        }
      }, resolve);
    }

    bundler.plugin('done', stats => onBundleComplete(stats));
  });
}

export default start;