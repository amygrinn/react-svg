require('dotenv').config();
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlInjectReactDomRenderPlugin = require('./html-inject-react-dom-render-plugin');
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin')
  .default;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
        test: /\.jsx?$/,
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
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.svg',
      filename: 'index.svg',
      inject: false,
      svg: true,
    }),
    new HtmlInjectReactDomRenderPlugin({
      elementId: 'app',
      componentFile: path.resolve(__dirname, 'src', 'App.jsx'),
    }),
    new HTMLInlineCSSWebpackPlugin({
      replace: {
        target: '<style id="styles"></style>',
        removeTarget: true,
      },
    }),
    ...(PROD
      ? [
          new OptimizeCssAssetsPlugin(),
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: 'build-report.html',
          }),
        ]
      : []),
  ],
};
