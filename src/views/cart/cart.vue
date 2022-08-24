<!-- Page annotation -->
<template>
  <div class="cart-list">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <Scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </Scroll>
    <bottomBar/>
  </div>
</template>

<script>
//导入公共组件
import NavBar from 'components/common/navbar/NavBar'
import Scroll from "components/common/scroll/Scroll"
import bottomBar from './childComps/bottomBar'

//导入子组件
import cartList from './childComps/cartList'

import { mapGetters } from 'vuex'//这是vuex自带的辅助函数，功能为将getters的函数映射到计算属性

export default {
  name:"cart",
  components:{
    NavBar,
    cartList,
    Scroll,
    bottomBar
  },
  mounted(){
    this.$refs.scroll.refresh();
  },
  computed:{
    ...mapGetters([
      'cartLength',
    ])
  }
}
</script>

<style  scoped>
.cart-list{
  position: relative;
  height : 100vh;
}
.nav-bar{
  background-color : var(--color-tint);
  color: #fff;
}
.content{
  position: absolute;
  top: 33px;
  bottom: 89px;
  left: 0;
  right: 23;
  overflow: hidden;
}
</style>
