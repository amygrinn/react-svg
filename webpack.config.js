/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('./html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const PROD = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  mode: PROD ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /[\\/]node_modules[\\/]/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?[ac]ss$/i,
        exclude: /[\\/]node_modules[\\/]/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: '@import "_variables";\n',
              sassOptions: {
                includePaths: 'src/styles',
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  devtool: PROD ? false : 'inline-cheap-source-map',
  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/index.svg' }],
    },
    clientLogLevel: 'silent',
    writeToDisk: true,
    host: '0.0.0.0',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.svg',
      filename: 'index.svg',
      inject: false,
      svg: true,
      minify: false,
    }),
    ...(PROD
      ? [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: 'build-report.html',
          }),
        ]
      : []),
  ],
};
