/**
 * 开发环境配置
 */
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

module.exports = merge(common, { // 基于common自定义开发环境配置
  mode: 'development',
  devtool: 'inline-source-map', // 源码映射会和具体代码文件生产到一起
  devServer: { // 将dist作为服务的根目录
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
