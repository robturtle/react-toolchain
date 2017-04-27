var path = require('path');
var webpack = require('webpack');

module.exports = function(env) {
  return {
    context: path.resolve(__dirname, 'lib'),
    entry: {
      main: './try-webpack.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[chunkhash].js'
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
          return module.context && module.context.indexOf('node_modules') !== -1;
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
      })
    ]
  };
};
