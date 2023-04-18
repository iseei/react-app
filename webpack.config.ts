import Webpack from 'webpack';
import Server from 'webpack-dev-server';
import HtmlPlugin from 'html-webpack-plugin';
import InterpolateHtmlPlugin from 'interpolate-html-plugin';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import path from 'path';
// const HtmlPlugin = require('html-webpack-plugin');
// import cssLoader from 'css-loader';
// import { IncomingMessage } from 'http';

const smp = new SpeedMeasurePlugin();
const isDevelopment = process.env.NODE_ENV !== 'production';

const config: Webpack.Configuration & Server.Configuration = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: "tsconfig.webpack.json"
          }
        }],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDevelopment,
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      }, {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/resource',
      }
    ]
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.cache'),
    version: '1.0.0'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Webpack.DefinePlugin({
      'process.env.isDevelopment': isDevelopment,
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: '',
    }),
    new HtmlPlugin({
      template: './public/index.html'
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devServer: {
    port: 4200,
    compress: true,
    historyApiFallback: true,
  }
}

export default smp.wrap(config);
