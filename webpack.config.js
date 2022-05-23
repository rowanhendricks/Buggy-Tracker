const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.txt', '.html', '.ts', '.js'],
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
      chunks: [
        'index'
      ]
    }),
    new HtmlWebpackPlugin({
      title: 'Create Issue',
      filename: 'createIssue.html',
      template: './src/template/createIssue.html',
      scriptLoading: 'module',
      chunks: [
        'issue'
      ]
    }),
  ],
}