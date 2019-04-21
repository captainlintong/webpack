const path = require('path')

module.exports = {
  entry: './src/index.js', // 打包的入口
  output: {
    path: path.join(__dirname, './dist'),  // 将打包结果放到 dist 目录中
    filename: 'main.js' // 自定打包结果的文件名
  },
  /*
 production 生产模式打包 速度慢 有优化 （会压缩代码） 发布上线用
 development 开发模式构建 速度快 没有什么优化
 默认是production
 */
  mode: 'development'
}
