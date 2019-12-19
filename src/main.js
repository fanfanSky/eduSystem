/*
 * @Date: 2019-12-18 13:15:58
 * @LastEditTime: 2019-12-19 15:25:58
 * @Author: 江帆
 * @Github: https://github.com/J-Fan-Fan/
 */
//导入Vue
import Vue from 'vue'
// 导入 根组件
import App from './App.vue'
// 导入接收 路由
import router from './router/router.js'
// 导入 仓库
import store from './store/store.js'

// 导入饿了么 ui
import ElementUI from 'element-ui';
// 导入饿了么 的样式
import 'element-ui/lib/theme-chalk/index.css';
// 注册Element-ui
Vue.use(ElementUI);

//导入全局样式
import './style/base.css';

//是否显示生产提示
Vue.config.productionTip = false

// 测试环境变量
// window.console.log(process.env.VUE_APP_BASEURL)

// 创建 Vue 实例
new Vue({
  render: h => h(App),
  // 挂载到Vue示例上 router
  router, // router:router
  store
}).$mount('#app')
