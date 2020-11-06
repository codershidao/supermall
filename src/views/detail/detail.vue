<!-- Page annotation -->
<template>
  <div id="detail">
    <detailNavBar class="detail-nav" @itemClick='itemClick' ref="nav"/>
    <scroll 
    class="content" 
    ref="scroll" 
    :probe-type='3'
    @scroll='contentScroll' > 
    
      <detailSwiper :topImage='topImage'/>
      <baseInfo :goods='goods'/>
      <shopInfo :shop='shop'/>
      <goodsInfo :detailInfo='detailInfo' @imageLoad='imageLoad'/>
      <paramInfo ref="param" :paramInfo='paramInfo'/>
      <commentInfo ref="comment" :commentInfo='commentInfo'/>
      <goodsList ref="recommend" :goods='recommend'/>
    </scroll>
    <bottom-bar @addToCart='addToCart'></bottom-bar>
    <backTop @click.native="backTop" v-show="isShow"></backTop>
  </div>
</template>

<script>
//请求公共组件
import Scroll from "components/common/scroll/Scroll"
import goodsList from "components/content/goods/goodsList"
//請求子組件
import detailNavBar from './childComps/detailNavBar'
import detailSwiper from './childComps/detailSwiper'
import baseInfo from './childComps/baseInfo'
import shopInfo from './childComps/shopInfo'
import goodsInfo from './childComps/goodsInfo'
import paramInfo from './childComps/paramInfo'
import commentInfo from './childComps/commentInfo'
import bottomBar from './childComps/bottomBar'
//請求方法
import {getDetailMultidata,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import {debounce} from 'common/utils'
import {backTopMixin} from 'common/mixin'

export default {
  name:"detail",
  data(){
    return {
      iid: null,
      topImage: [], 
      goods: {},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommend:[],
      themeTopys:[],
      getThemeTopy:null,
      currentIndex:0
    }
  },
  mixins:[backTopMixin],
  created(){
    this.iid=this.$route.params.iid;
    getDetailMultidata(this.iid).then(res => {
      //console.log(res);
      const data = res.result;
      //获取顶部的图片数据
      this.topImage = data.itemInfo.topImages;
      //获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
      //获取店家信息
      this.shop = new Shop(data.shopInfo);
      //获取商品信息
      this.detailInfo = data.detailInfo;
      //获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //获取评论信息
      if(data.rate.cRate){
        this.commentInfo = data.rate.list[0];
      }
      //当数据被渲染好后回调这个函数，这些dom被渲染好了，但是不包含图片，所以这里的高度也不对
      //初始化详情页nav的y值
      // this.$nextTick(()=>{
      //   this.themeTopys = [];
      //   this.themeTopys.push(0);
      //   this.themeTopys.push(this.$refs.param.$el.offsetTop);
      //   this.themeTopys.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopys.push(this.$refs.recommend.$el.offsetTop);
      // })
    })

      //获取推荐数据
      getRecommend().then(res=>{ 
        this.recommend = res.data.list;
      })    
  },  
  updated(){
  //给getThemeTopy赋值,并对这个操作进行防抖
      this.getThemeTopy = debounce(()=>{      
        // if(this.$refs.param && this.$refs.comment && $refs.recommend)  
        // {
          this.themeTopys = [];
          this.themeTopys.push(0);
          this.themeTopys.push(this.$refs.param.$el.offsetTop);//减去nav的44px高度
          this.themeTopys.push(this.$refs.comment.$el.offsetTop);
          this.themeTopys.push(this.$refs.recommend.$el.offsetTop);
          this.themeTopys.push(Number.MAX_VALUE);//多加一个最大的值，方便判断
       // }        
      },500)
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,500)
    this.$bus.$on('detailImageLoad',()=>{
      refresh()
    })
  },
  methods: {  
    //监听购物车
    addToCart(){
      const product={}
      product.image = this.topImage[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      this.$store.dispatch('addCart',product)
    },
    //监听滚动，并改变nav和topback
    contentScroll(position){
      //当isShow为true时显示返回顶部的箭头
      this.isShow= (-position.y) > 1000

      const positionY = -position.y;
      let length = this.themeTopys.length;
      for(let i = 0; i < length-1; i++){
        if(this.currentIndex !==i && (positionY >= this.themeTopys[i] && positionY < this.themeTopys[i+1])){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    //监听图片是否加载完
    imageLoad(){
      this.$refs.scroll.refresh();
      //获取详情页nav的y值
      this.getThemeTopy();
    },
    //监听详情页nav
    itemClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopys[index],500)
    }
  },

  components:{
    detailNavBar,
    detailSwiper,
    baseInfo,
    shopInfo,
    Scroll,
    goodsInfo,
    paramInfo,
    commentInfo,
    goodsList,
    bottomBar
  }
}
</script>

<style  scoped>
#detail{
  position: relative;
  z-index: 9;
  height :100vh;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
  /* overflow: hidden; */
  /* position: absolute;
  top: 44px;
  right: 0;
  left: 0;
  bottom: 60px; */
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
