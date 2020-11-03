import Vue from 'vue'
import VueRouter from 'vue-router'

const home = ()=>import('views/home/home.vue')
const cart = ()=>import('views/cart/cart.vue')
const category = ()=>import('views/category/category.vue')
const profile = ()=>import('views/profile/profile.vue')
const detail = ()=>import('views/detail/detail.vue')

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}


const routes =[
  {
    path:'',
    redirect: '/home'
  },
  {
    path:'/home',
    component:home,
    meta:{
      title: '首页'
    }
  },
  {
    path:'/cart',
    component:cart,
    meta: { 
      title: '购物车'
     }
  },
  {
    path:'/profile',
    component:profile,
    meta: { 
      title: '我的'
     }
  },
  {
    path:'/category',
    component:category,
    meta: { 
      title: '分类'
     }
  },
  {
    path:'/detail/:iid',
    component:detail,
    meta: { 
      title: '详情'
     }
  }
]


Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router