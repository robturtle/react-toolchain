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
    main: './try-webpack.js'
  },

  output: {
    filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
    chunkFilename: isProduction ? '[name].[chunkhash].js' : '[name].js',
    path: path.resolve(__dirname, 'dist', 'public'),
    publicPath: '/'
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
});

var serverConfig = webpackMerge(baseConfig, {
  target: 'node',

  context: path.resolve(srcRoot, 'server'),

  entry: {
    server: './server.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
});

module.exports = [clientConfig, serverConfig];
