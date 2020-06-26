const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProvidePlugin = require('webpack').ProvidePlugin;
const path = require('path');

module.exports = (env, options) => ({
  entry: {
    index: path.join(__dirname, 'src', 'index.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
  },
  plugins: [
    ...[
      'index.ejs',
      'peace.ejs',
      'events.ejs',
      'joy.ejs',
      'baskets.ejs',
      'bouquets.ejs',
      'casket.ejs',
      'crosses.ejs',
      'eternal.ejs',
      'giftbox.ejs',
      'grandopening.ejs',
      'romance.ejs',
      'spray.ejs',
      'vases.ejs',
      'wreath.ejs',
      'supplies.ejs',
    ].map((file) => {
      return new HtmlWebpackPlugin({
        filename: `${path.basename(file, '.ejs')}.html`,
        template: path.join(__dirname, 'src/pages', file),
      });
    }),
    new ProvidePlugin({
      _: 'underscore',
      jQuery: 'jquery',
      breakpoints: path.join(__dirname, 'src/assets/js/breakpoints.min.js'),
      browser: path.join(__dirname, 'src/assets/js/browser.min.js'),
    }),
  ],
  devtool: options.mode === 'development' ? 'inline-source-map' : undefined,
  devServer: {
    overlay: true,
  },
  module: {
    rules: [{
        test: /\.(png|svg|JPG|jpg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: false,
            esModule: false,
            name: './images/[name].[ext]',
          },
        },
      },
      {
        test: /\.css$/,
        use: [{
            loader: 'file-loader',
            options: {
              name: '[name].css',
              esModule: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: options.mode === 'development' ? [] : [require('cssnano')()],
            },
          },
          'extract-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: false,
            name: './fonts/[name].[ext]',
            esModule: false,
          },
        },
      },
      {
        test: /\.ejs$/,
        use: [
          'extract-loader',
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'video:src', 'video:poster', 'link:href'],
            },
          },
          'ejs-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
    },
  },
});