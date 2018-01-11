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
    },
    devServer: {
      contentBase: './src',
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
