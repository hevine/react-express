const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: ['@babel/polyfill', path.resolve(__dirname, '../www/index.js')],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: `[name].[chunkhash:8].js`,
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(jsx|js)$/,
                exclude: /(node_modules)/,
                use: ['babel-loader', 'eslint-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'images/[hash:8].[name].[ext]',
                            limit: 20,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            entername: 'index',
            filename: 'index.html',
            template: path.resolve(__dirname, '../www/index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: isDev ? '[name].css' : `[name].[hash:8].css`,
            chunkFilename: isDev ? '[id].css' : `[id].[hash:8].css`,
        }),
    ],
};