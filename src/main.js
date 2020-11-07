import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import toast from 'components/common/toast'

import fastclick from 'fastclick'
import vuelazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()//实例化bus，不然相当于没定义

//安装toast插件,默认调用toast中的install函数，并传入Vue
Vue.use(toast)
//解决移动端300ms点击延迟
fastclick.attach(document.body) 
//使用图片懒加载插件
Vue.use(vuelazyload)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
