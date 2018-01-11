const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
    entry: [
      './src/quill.mention.js',
    ],
    output: {
      filename: 'quill.mention.min.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/assets/',
    },
    devServer: {
      contentBase: './dist',
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
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
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
  },
];
