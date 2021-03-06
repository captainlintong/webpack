/**
 * babel-polyfill一定要引入到模块系统入口的顶部
 *
 */
import "@babel/polyfill"

import foo from './foo'
/**
 * webpack本身只能打包js模块
 * 如需打包其他资源
 * css
 * less
 * sass
 * 图片
 * json
 * .....
 * 则需要第三方Loader进行处理
 */
import 'bootstrap/dist/css/bootstrap.css'
import './styles/index.css'

import './styles/main.less'

foo()
const msg = '你好啊'
/**
 * babel默认智能转换核心语法 例如 const  let 箭头函数、类.....
 * 无法转换新增的函数，例如数组的includes， 字符串的startsWith， endsWith
 *
 */
console.log([1, 2, 3].includes(3))
