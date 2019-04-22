const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 打包html打依赖包
const CleanWebpackPlugin = require('clean-webpack-plugin') // 清空dist目录的依赖包
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin') // 打包vue

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
  devtool: 'inline-source-map', // 启用source map 源码地图指示  不启用的话 在控制台打印 的结果后面的行号和文件对不上
  devServer: { // 将dist作为服务的根目录
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(), // 生成新的结果之前先清空  默认的dest目录
    new HtmlWebpackPlugin({ // 将index.html也打包到结果目录中dist文件中  自动在页面中引入打包的结果文件
      // title: 'Output Management', 这个没有用
      template: './index.html' // 这个是自己手写的
    }),
    new webpack.HotModuleReplacementPlugin(), // 配置热更新只能css热更新，js文件不能热更新（热更新即不刷新页面 样式发生变化）
    new VueLoaderPlugin() // 打包vue文件 确保引入这个插件
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
      },
      { // 当加载以.woff|woff2|eot|ttf|otf 结尾打文件的时候， 以file-loader来处理
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.less$/, // 注意less-loader依赖less 所以还得下载less包 npm i -D less less不用配置
        use: [ // 注意：有先后顺序，后面的是最先的 css-loader必须写在style-loader之后
          'style-loader', // style-loader的作用是将样式模块生成一个style节点插入head中
          'css-loader', // css-loader的作用是将css文件转换为一个js模块
          'less-loader', // 将less转换为css
        ]
      },
      {
        enforce: "pre", // 配置eslint语法校验， 强制提前执行，先于babel-loader执行，语法校验后在es6转es5
        test: /\.js$/,
        exclude: /node_modules/, // 不校验第三方包
        loader: "eslint-loader", // 使用eslint-loader来处理
        options: {
          fix: true // 尝试自动修改违背规则的简单格式
        }
      },
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
      },
      {
        test: /\.vue$/, // 以vue结尾的文件，用vue-loader解析
        loader: 'vue-loader'
      }
    ]
  }
}
