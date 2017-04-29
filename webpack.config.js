/**
 * Adjusted based on React Starter Kit (https://www.reactstarterkit.com/)
 * 
 * Licensed under MIT license.
 */
var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ManifestPlugin = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var WebpackChunkHash = require('webpack-chunk-hash');

var isProduction = process.env.NODE_ENV === 'production';
var srcRoot = path.resolve(__dirname, 'src');

var baseConfig = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: srcRoot,
        loader: 'babel-loader'
      }
    ]
  }
};

var clientConfig = webpackMerge(baseConfig, {
  context: path.resolve(srcRoot, 'client'),

  entry: {
    client: './try-webpack.js'
  },

  output: {
    filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
    chunkFilename: isProduction ? '[name].[chunkhash].js' : '[name].js',
    path: path.resolve(__dirname, 'dist', 'public', 'assets'),
    publicPath: '/assets/'
  },

  devtool: isProduction ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new ManifestPlugin(),
    new WebpackChunkHash(),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest'
    }),
  ],

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  // https://webpack.github.io/docs/configuration.html#node
  // https://github.com/webpack/node-libs-browser/tree/master/mock
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
});

var serverConfig = webpackMerge(baseConfig, {
  target: 'node',

  context: path.resolve(srcRoot, 'server'),

  entry: {
    server: './server.js'
  },

  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist')
  }
});

module.exports = [clientConfig, serverConfig];
