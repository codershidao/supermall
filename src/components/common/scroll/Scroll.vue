<!-- Page annotation -->
<template>
  <div  class="wrapper" ref="wrapper">
    <div  class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BSscroll from 'better-scroll'
export default {
  name:"Scroll",
  props: {
    probetype:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      scroll:null
    }
  },
  mounted(){
    this.scroll = new BSscroll(this.$refs.wrapper,{//第一个参数表示挂载在哪个作用域上，在这个作用域下只能有一个总标签！，但在这个标签下可以嵌套很多标签
      click:true,//可以监听div中的点击事件
      probeType: this.probeType,
      pullUpLoad:this.pullUpLoad,
    })

     
        this.scroll.on("scroll",(position)=>{//配合probetype属性使用，监听当前坐标，当probetype 0或1：不监听 2：监听手动滑到的坐标（不包括惯性） 3.监听目前的坐标
        this.$emit('scroll',position)
    })
      
      
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{//配合pullupload属性使用，拉到底时加载的操作
        this.$emit('pullingUp')
    })
      }
   
  },
  methods: {
    refresh(){
     this.scroll && this.scroll.refresh();//重新计算高度
     //console.log('------');
    },
    scrollTo(x,y,time=300){
     this.scroll && this.scroll.scrollTo(x,y,time);//封装scrollto方法
    },
    finishPullUp(){
    this.scroll && this.scroll.finishPullUp();
    }
  }
}
</script>

<style  scoped>

</style>
