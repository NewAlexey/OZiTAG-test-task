const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EsLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  entry: {
    app: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js',
    assetModuleFilename: 'assets/[hash][ext]',
  },
  devServer: {
    open: true,
    host: 'localhost',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),

    new MiniCssExtractPlugin({
      filename: '[contenthash].css',
    }),
    new EsLintPlugin({
      extensions: ['ts', 'js'],
    }),
    new CopyPlugin({
      patterns: [{ from: './public', to: './public' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', 'json'],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
