const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  devtool: 'inline-source-map',
  entry: "./src/index.ts",
  output: {
    path: __dirname + '/dist',
    filename: "bundle.js",
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
    extensions: ['.html', '.ts', '.js'],
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
      template: './src/template/index.html'
    }),
  ],
}