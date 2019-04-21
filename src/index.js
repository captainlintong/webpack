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
import './styles/index.css'
import 'bootstrap/dist/css/bootstrap.css'

foo()
