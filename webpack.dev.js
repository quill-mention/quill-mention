const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  output: {
    filename: 'quill.mention.min.js',
    path: path.resolve(__dirname, 'docs'),
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './docs',
    writeToDisk: true,
  },
});
