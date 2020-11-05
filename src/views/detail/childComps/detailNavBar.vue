<!-- Page annotation -->
<template>
  <div>
    <nav-bar>
      <div slot="left" class='back' @click="backClick"><img src="~assets/img/common/back.svg" alt="" ></div>
      <div slot="center" class="nav-bar">
        <div v-for="(item,index) in title" 
        class="nav-bar-item" 
        :class="{active:index === currentIndex}"
        @click='itemClick(index)'>{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name:"detailNavBar",
  data(){
    return {
      title:['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index){
      this.currentIndex =index
      this.$emit('itemClick',index);
    }
    ,
  backClick(){
    this.$router.back()
  },
  },
  components:{
    NavBar
  }
}
</script>

<style  scoped>
.nav-bar{
  display: flex;
  font-size: 14px
}
.nav-bar-item{
  flex: 1;
}
.active{
  color: var(--color-hight-text)
}
.back img{
  height: 15px;
  width: 15px;
  margin-left: 15px;
  margin-top: 14px;
}
</style>
