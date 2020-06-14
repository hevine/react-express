const base = require('./webpack.base.conf');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = Object.assign({}, base, {
    mode: 'production',
    optimization: {
        //优化项
        minimizer: [
            new UglifyJsPlugin({
                cache: true, //缓冲
                parallel: true, //并发打包,一次打包多个
                sourceMap: true, //源码调试
            }),
            new OptimizeCSSAssetsPlugin(), //优化css为压缩格式
        ],
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new CleanWebpackPlugin(), // 清空原有dist打包文件
        new OptimizeCSSAssetsPlugin(), //优化css为压缩格式
        ...base.plugins,
    ],
});