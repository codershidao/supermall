import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()//实例化bus，不然相当于没定义
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
