const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 打包html打依赖包

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
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({ // 将index.html也打包到结果目录中dist文件中  自动在页面中引入打包的结果文件
      // title: 'Output Management', 这个没有用
      template: './index.html' // 这个是自己手写的
    })
  ],
  module: {
    rules: [ // 当加载以.css结尾的文件的时候，使用css-loader、style-loader进行转换
      {
        test: /\.css$/,
        use: [ // 注意：有先后顺序，后面的是最先的 css-loader必须写在style-loader之后
          'style-loader', // style-loader的作用是将样式模块生成一个style节点插入head中
          'css-loader' // css-loader的作用是将css文件转换为一个js模块
        ]
      }, { // 当加载以.png|svg|jpg|gif 结尾打文件的时候， 以file-loader来处理
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ] // 注意：打开index.html不会看见图片，把index.html复制到dist目录里，并且更改js引入的路径，才能看见图片，解决办法是打包html文件
      }
    ]
  }
}
