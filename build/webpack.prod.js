/**
 * 生产模式打包配置
 */
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
// const webpack = require('webpack')

module.exports = merge(common, { // 基于common自定义开发环境配置
  mode: 'production',
  devtool: 'source-map', // 发布的时候，建议生成单独的Source map 文件
  module: {
    rules: [
      {
        test: /\.m?js$/, // 当加载以.js 或 .mjs文件的时候，使用babel-loader将代码中的ES6转换为ES5
        exclude: /(node_modules|bower_components)/, // 排出这些文件中的模块不转换，只转换我们自己的ES6代码，因为一般第三方包提供的 都是转换之后的
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // 转换规则
            cacheDirectory: true // babel转换比较耗时，这里是开启结果缓存，它会将每次缓存的结果缓存到node_modules/.cache目录中 ，下次打包如果文件没有变，会直接把缓存拿出来，提高转换效率
          }
        }
      }
    ]
  }
})
