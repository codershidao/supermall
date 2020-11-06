<!-- Page annotation -->
<template>
  <div>
      <Swiper>
        <swiper-item v-for="item in banner" :key="item.title">
          <a :href="item.link">
            <img :src="item.image" alt="" @load='imageLoad'>
          </a>
        </swiper-item>
    </Swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name:"homeSwiper",
  props: {
    banner:{
      type:Array, 
      default(){
        return []
      }     
    }
  },
  data(){
    return {
      isLoaded:false    
    }    
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods: {
   
    imageLoad(){
       if (!this.isLoaded) {      
      this.$emit('swiperimageLoad')
      this.isLoaded = true
    }
    }
  }
}
</script>

<style  scoped>
</style>