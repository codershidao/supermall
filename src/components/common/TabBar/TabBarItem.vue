<!-- Page annotation -->
<template>
  <div class="tab-bar-item" @click="itemclick">
    <div v-if="isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name:"TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'deepPink'
    }
  },
  computed:{
    isActive() {
      return this.$route.path.indexOf(this.path)
    },
    activeStyle(){
      return this.isActive?{}:{color:this.activeColor}
    }
  },
  methods: {
    itemclick(){
      this.$router.push(this.path)
    
    }
  },
}

</script>

<style  scoped>
.tab-bar-item{
  flex: 1;
  height: 49px;
  text-align: center;
  font-size: 14px;
}
.tab-bar-item img{
  height: 24px;
  width: 24px;
  vertical-align: middle;
  margin-top: 2px;
  margin-bottom: 1px;
}
</style>
