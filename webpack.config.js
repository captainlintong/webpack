const path = require('path')

module.exports = {
  entry: './src/index.js', // 打包的入口
  output: {
    path: path.join(__dirname, './dist'),  // 将打包结果放到 dist 目录中
    filename: 'main.js' // 自定打包结果的文件名
  }
}
