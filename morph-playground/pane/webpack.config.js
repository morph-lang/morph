const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // context: __dirname,
  // entry: './src/index.js',
  // output: {
  //   publicPath: '',
  //   filename: 'main.js'
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      { test: /\.pug$/, loader: 'pug-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      cache: false,
      template: './src/template.pug',
      filename: './build/index.html',
      title: 'Morph Playground'
    }),
  ]
};