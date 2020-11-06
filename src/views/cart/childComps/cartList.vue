<!-- Page annotation -->
<template>
  <div>
   <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo='item'/>
  </div>
</template>

<script>
import cartListItem from './cartListItem'
//导入方法
import { mapGetters } from 'vuex'//这是vuex自带的辅助函数，功能为将getters的函数映射到计算属性
export default {
  name:"cartList",
    computed:{
    ...mapGetters([
      'cartList'
    ])
  },
  components:{
    cartListItem
  }
}
</script>

<style  scoped>

</style>
