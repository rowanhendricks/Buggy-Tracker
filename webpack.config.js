const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let htmlPageNames = ['index', 'createIssue', 'issue', 'project'];

let htmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    scriptLoading: 'module',
    publicPath: 'auto',
    inject: 'body',
    template: `./src/template/${name}.html`,
    filename: `${name}.html`,
    chunks: [`${name}`]
  })
});

module.exports = {
  mode: "development",
  devtool: 'inline-source-map',
  entry: {
    index: './src/ts/index.ts',
    issue: './src/ts/issue.ts',
    createIssue: './src/ts/createIssue.ts',
    project: './src/ts/project.ts',
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
    ...htmlPlugins,
    new MiniCssExtractPlugin({
      filename: '[name].css',
    })
  ],
}