var path = require('path');
var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var WebpackChunkHash = require('webpack-chunk-hash');

var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  context: path.resolve(__dirname, 'lib'),

  entry: {
    main: './try-webpack.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/assets/',
    filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
    chunkFilename: isProduction ? '[name].[chunkhash].js' : '[name].js'
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
  ]
};
