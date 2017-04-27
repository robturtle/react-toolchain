module.exports = {
  context: __dirname + "/lib",
  entry: "./try-webpack.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
    chunkFilename: "[id].bundle.js"
  }
};
