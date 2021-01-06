const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';

  const config = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'none' : 'source-map',
    watch: !isProduction,
    entry: {
      index: ['./src/index.jsx'],
    },
    output: {
      path: path.join(__dirname, '/dist'),
      filename: './src/js/[name].js',
      publicPath: '/',
    },
    devServer: {
      historyApiFallback: true,
      contentBase: './',
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.(png|svg|ico|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(css|scss|sass)$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { url: false, sourceMap: true } },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
      ],
    },

    resolve: {
      extensions: ['.js', '.jsx'],
    },

    devServer: {
      contentBase: './dist',
      open: true,
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'public', 'index.html'),
        chunks: ['index'],
      }),
      new CopyPlugin({
        patterns: [{ from: 'src/icons', to: 'src/icons' }],
      }),
      new MiniCssExtractPlugin({
        filename: './src/css/[name].css',
      }),
    ],
  };

  return config;
};
