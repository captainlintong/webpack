import Vue from 'vue'
import App from './App.vue'
// 下面这行代码临时关闭不能以new开头的校验规则 在eslint官网 用户指南的规则里找
/* eslint no-new: "off" */
new Vue({
  el: '#app',
  render: h => h(App) // 渲染App组件，替换到入口节点
})
