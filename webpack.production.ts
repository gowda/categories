import merge from 'webpack-merge';
import HtmlWebpackTagsPlugin from 'html-webpack-tags-plugin';
import { Configuration } from 'webpack';

import common from './webpack.common';

const config: Configuration = merge(common, {
  mode: 'production',
  plugins: [
    new HtmlWebpackTagsPlugin({
      tags: ['custom.css'],
      append: true,
      publicPath: '/css',
      metas: [
        {
          attributes: {
            name: 'base-api-endpoint',
            content: 'http://api.categories.supertiny.in',
          }
        }
      ]
    }),
  ],
});

export default config;
