<!-- Page annotation -->
<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="item" 
    class="tab-control-item" :class="{active: index===currentIndex}" @click="itemclick(index)"> 
      <span>{{item}}
        </span></div>
  </div>
</template>

<script>
export default {
  name:"tabControl",
  props: {
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data (){
    return {
      currentIndex: 0
    }
  },
  methods:{
     itemclick(index){
       this.currentIndex=index;
       this.$emit('tabClick',index);
  }
  }
}
</script>

<style  scoped>
.tab-control{
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 15px;
  background-color: #fff;
}
.tab-control-item{
  flex: 1;
}
.active{
  color: var(--color-hight-text)
}
.active span{
  padding: 5px;
  border-bottom:2px solid var(--color-hight-text)
}
</style>
