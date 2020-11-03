<!-- Page annotation -->
<template>
  <div id="home">
    <nav-bar  class="home-nav"><div slot="center"><h4>购物街</h4></div></nav-bar>
    <TabControl :titles="['流行','新款','精选']" 
      @tabClick="tabClick" 
      ref="tabcontrol1" 
      class='tabcontrol' v-show="istabShow"/>
      
    <Scroll class="content" ref="scroll" 
    :probetype='3' 
    @scroll='contentScroll' 
    :pullUpLoad='true' 
    @pullingUp='pullingUp' 
    > 
      <homeSwiper :banner="banner"  @swiperimageLoad='swiperimageLoad'/>
      <homeRecommendView :recommend="recommend"/>
      <featureView/>
      <TabControl :titles="['流行','新款','精选']" 
      @tabClick="tabClick" 
      ref="tabcontrol2" />
      <goodsList :goods="showgoods"/>
    </Scroll>
    <!-- //监听组件的方法 .native -->
    <backTop @click.native="backTop" v-show="isShow"></backTop>
  </div>
</template>

<script>
//导入公共独立组件
import NavBar from "components/common/navbar/NavBar"
import Scroll from "components/common/scroll/Scroll"

//导入公共业务组件
import TabControl from "components/content/tabControl/tabControl"
import goodsList from "components/content/goods/goodsList"
import backTop from "components/content/backtop/backTop"

//导入home子组件
import homeSwiper from "./childComps/homeSwiper"
import homeRecommendView from "./childComps/homeRecommendView"
import featureView from "./childComps/featureView"

//导入方法
import { getHomeMultidata, getHomeGoods } from 'network/home'
import {debounce} from 'common/utils'

export default {
  name:"home",
  data(){
    return {
      isShow:false,
      banner:[],
      recommend:[],
      goods:{
        'pop':{page:0, list:[]},//流行数据
        'new':{page:0, list:[]},//新款数据
        'sell':{page:0, list:[]},//精品数据
      },
      currentTab:'pop',
      istabShow:false,
      tabosffsetTop:534
    }
  },
  created(){
    //请求轮播数据和推荐数据
    this.getHomeMultidata()

    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('sell')
    this.getHomeGoods('new')
    
  },
  mounted(){
    //监听item中图片加载完成,那refs中的东西要遭mounted中做，在created中可能组件还没初始化好，只是创建好了
    // this.$bus.$on('imageLoad',()=>{
    //   this.$refs.scroll.refresh();//完成了就重新计算高度
    // })
    //但是这个函数调用的太频繁了,所以要使用防抖动函数
    const refresh = debounce(this.$refs.scroll.refresh,500)
    this.$bus.$on('imageLoad',()=>{
      refresh()
    })
  },
  destroyed(){
    console.log('homedestroyed');
  },
  methods: {  
    //网络请求相关函数
    getHomeMultidata(){
       getHomeMultidata().then(result =>{
      this.banner = result.data.banner.list;
      this.recommend = result.data.recommend.list;
    })  
    },
    getHomeGoods(type){
      const page=this.goods[type].page+1;
      getHomeGoods(type, page).then(result=>{
        this.goods[type].list.push(...result.data.list);//一个一个添加进去
        this.goods[type].page +=1;
      })
    },
   //事件监听相关函数
   swiperimageLoad(){
    //console.log(this.$refs.tabcontrol2.$el.offsetTop);
   },
    pullingUp(){
      this.getHomeGoods(this.currentTab)
      this.$refs.scroll.finishPullUp();
    },
    tabClick(index){
      switch (index){
        case 0:
          this.currentTab='pop'
          break
        case 1:
          this.currentTab='new'
          break
         case 2:
           this.currentTab='sell'
           break
      }
      this.$refs.tabcontrol1.currentIndex=index;
      this.$refs.tabcontrol2.currentIndex=index
    },
    backTop(){
      this.$refs.scroll.scrollTo(0,0);//回到顶部
    },
    contentScroll(position){
    //判断backtop是否显示
      this.isShow = (-position.y) >1000
    //判断tabcontrol是否吸顶
    this.istabShow = (-position.y) > this.tabosffsetTop
    
    }
  },
  computed:{
    showgoods(){
     return this.goods[this.currentTab].list
    },
  },
  components:{
    NavBar,
    homeSwiper,
    homeRecommendView,
    featureView,
    TabControl,
    goodsList,
    Scroll,
    backTop
  },
}
</script>

<style  scoped>
#home{
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 9; */
}
.content{
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.tabcontrol{
  position: relative;
  z-index: 9;
}
</style>
