import Toast from './toast.vue'

const obj = {}
obj.install = function(Vue){
  //创建组件构造器
  const toastContrustor = Vue.extend(Toast);
  //new的方式，根据组件构造器创建一个组件
  const toast = new toastContrustor();
  //将组件对象手动挂载到某个元素上
  toast.$mount(document.createElement('div'));
  //toast.$el对应的就是div,真正将这个div添加到dom中
  document.body.appendChild(toast.$el);
  //将toast组件在vue原型中注册
  Vue.prototype.$toast = toast;
}

export default obj