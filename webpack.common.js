const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: './src/quill.mention.js',
  },
  externals: {
    quill: 'Quill',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          }],
        }),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new UglifyJSPlugin({
      extractComments: true,
    }),
    new ExtractTextPlugin('quill.mention.min.css'),
  ],
};
