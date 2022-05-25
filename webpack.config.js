const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  devtool: 'inline-source-map',
  entry: {
    index: './src/ts/index.ts',
    issue: './src/ts/issue.ts',
  },
  output: {
    path: __dirname + '/dist',
    filename: "[name].bundle.js",
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer: {
    static: __dirname + '/dist',
    historyApiFallback: true,
    port: 8080
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Buggy Tracker',
      filename: 'index.html',
      template: './src/template/index.html',
      scriptLoading: 'module',
      publicPath: 'auto',
      inject: 'body',
      chunks: [
        'index',
      ]
    }),
    new HtmlWebpackPlugin({
      title: 'Create Issue',
      filename: 'createIssue.html',
      template: './src/template/createIssue.html',
      scriptLoading: 'module',
      inject: 'body',
      chunks: [
        'issue',
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    })
  ],
}