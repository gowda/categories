import * as path from 'path';
import { HotModuleReplacementPlugin, Configuration } from 'webpack';
import merge from 'webpack-merge';
import WriteFilePlugin from 'write-file-webpack-plugin';
import HtmlWebpackTagsPlugin from 'html-webpack-tags-plugin';

import common from './webpack.common';

const config: Configuration = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist/'),
    port: 3000,
    publicPath: 'http://localhost:3000/',
    hotOnly: true,
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new WriteFilePlugin(),
    new HtmlWebpackTagsPlugin({
      tags: ['custom.css'],
      append: true,
      publicPath: '/css',
      metas: [{
        attributes: {
          name: 'base-api-endpoint',
          content: 'http://localhost:3333',
        }
      }]
    }),
  ],
});

export default config;
